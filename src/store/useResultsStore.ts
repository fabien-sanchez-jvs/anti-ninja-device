import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ResultsStore } from "../types";

/**
 * Store Zustand pour les résultats des participants
 * Gère les temps de participation et le classement
 */
export const useResultsStore = create<ResultsStore>()(
  persist(
    (set, get) => ({
      results: [],

      /**
       * Ajouter un résultat pour un participant
       */
      addResult: (name: string, time: number) => {
        const { results } = get();

        // Vérifier si le participant a déjà un résultat
        const existingIndex = results.findIndex((r) => r.name === name);

        if (existingIndex >= 0) {
          // Mettre à jour le résultat existant
          const newResults = [...results];
          newResults[existingIndex] = {
            name,
            time,
            timestamp: Date.now(),
            penalty: null,
          };
          set({ results: newResults });
        } else {
          // Ajouter un nouveau résultat
          set({
            results: [
              ...results,
              {
                name,
                time,
                timestamp: Date.now(),
                penalty: null,
              },
            ],
          });
        }
      },

      /**
       * Appliquer une pénalité à un participant
       */
      setPenalty: (name: string, penalty) => {
        const { results } = get();
        const existingIndex = results.findIndex((r) => r.name === name);

        if (existingIndex >= 0) {
          const newResults = [...results];
          newResults[existingIndex] = {
            ...newResults[existingIndex],
            penalty,
          };
          set({ results: newResults });
        }
      },

      /**
       * Obtenir les résultats triés par temps (du plus rapide au plus lent)
       * Les participants avec penalty2 sont classés à la fin
       * Les participants avec penalty1 ont 30 secondes ajoutées à leur temps pour le tri
       */
      getSortedResults: () => {
        const { results } = get();
        return [...results].sort((a, b) => {
          // Les disqualifiés (penalty2) vont à la fin
          if (a.penalty === "penalty2" && b.penalty !== "penalty2") return 1;
          if (b.penalty === "penalty2" && a.penalty !== "penalty2") return -1;

          // Si les deux sont disqualifiés, trier par temps
          if (a.penalty === "penalty2" && b.penalty === "penalty2") {
            return a.time - b.time;
          }

          // Sinon, comparer les temps en ajoutant 30s pour penalty1
          const aTime = a.penalty === "penalty1" ? a.time + 30 : a.time;
          const bTime = b.penalty === "penalty1" ? b.time + 30 : b.time;
          return aTime - bTime;
        });
      },

      /**
       * Réinitialiser tous les résultats
       */
      clearResults: () => {
        set({ results: [] });
      },
    }),
    {
      name: "anti-ninja-results-storage", // Nom de la clé dans localStorage
    },
  ),
);
