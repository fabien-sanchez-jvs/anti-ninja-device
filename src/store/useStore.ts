import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Store, ParticipantState } from "../types";
import { useChronoStore } from "./useChronoStore";

/**
 * Store Zustand avec persistance localStorage
 * Gère l'état global de l'application "Anti Ninja Device"
 */
export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      participants: [],
      participantStates: {},

      /**
       * Définir la liste des participants
       * Initialise tous les participants à l'état 'waiting'
       */
      setParticipants: (names: string[]) => {
        const participantStates: Record<string, ParticipantState> = {};
        names.forEach((name) => {
          participantStates[name] = "waiting";
        });

        set({
          participants: names,
          participantStates,
        });
      },

      /**
       * Sélectionner manuellement un participant
       * Change l'état : waiting → selected → done
       */
      selectParticipant: (name: string) => {
        const { participantStates } = get();
        const currentState = participantStates[name];

        if (currentState === "waiting") {
          // D'abord, remettre le participant précédemment sélectionné à 'done'
          const newStates = { ...participantStates };
          Object.keys(newStates).forEach((key) => {
            if (newStates[key] === "selected") {
              newStates[key] = "done";
            }
          });
          newStates[name] = "selected";

          set({ participantStates: newStates });
          // Réinitialiser et démarrer le chronomètre
          useChronoStore.getState().resetChrono();
          useChronoStore.getState().startChrono();
        } else if (currentState === "selected") {
          // Passer de selected à done
          set({
            participantStates: {
              ...participantStates,
              [name]: "done",
            },
          });
        }
        // Si déjà 'done', ne rien faire
      },

      /**
       * Sélectionner aléatoirement un participant en attente
       * Si tous sont 'done', réinitialise automatiquement
       */
      selectRandom: () => {
        const { participants, participantStates } = get();

        // Récupérer les participants en attente
        const waiting = participants.filter(
          (name) => participantStates[name] === "waiting"
        );

        // Si plus personne en attente, réinitialiser
        if (waiting.length === 0) {
          get().reset();
          // Relancer la sélection après reset
          setTimeout(() => get().selectRandom(), 100);
          return;
        }

        // Remettre le participant précédemment sélectionné à 'done'
        const newStates = { ...participantStates };
        Object.keys(newStates).forEach((key) => {
          if (newStates[key] === "selected") {
            newStates[key] = "done";
          }
        });

        // Sélection aléatoire
        const randomIndex = Math.floor(Math.random() * waiting.length);
        const selectedName = waiting[randomIndex];

        newStates[selectedName] = "selected";

        set({ participantStates: newStates });

        // Réinitialiser et démarrer le chronomètre
        useChronoStore.getState().resetChrono();
        useChronoStore.getState().startChrono();
      },

      /**
       * Réinitialiser tous les états à 'waiting'
       */
      reset: () => {
        const { participants } = get();
        const participantStates: Record<string, ParticipantState> = {};

        participants.forEach((name) => {
          participantStates[name] = "waiting";
        });

        set({ participantStates });
        useChronoStore.getState().resetChrono();
      },
    }),
    {
      name: "anti-ninja-storage", // Nom de la clé dans localStorage
    }
  )
);
