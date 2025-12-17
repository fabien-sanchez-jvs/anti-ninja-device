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
              },
            ],
          });
        }
      },

      /**
       * Obtenir les résultats triés par temps (du plus rapide au plus lent)
       */
      getSortedResults: () => {
        const { results } = get();
        return [...results].sort((a, b) => a.time - b.time);
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
    }
  )
);
