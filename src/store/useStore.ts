import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Store, ParticipantState } from "../types";
import { useChronoStore } from "./useChronoStore";
import { useResultsStore } from "./useResultsStore";

/**
 * Store Zustand avec persistance localStorage
 * Gère l'état global de l'application "Anti Ninja Device"
 */
export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      participants: [],
      participantStates: {},
      allParticipantsDone: false,

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
              // Enregistrer le temps du participant précédent
              const chronoTime = useChronoStore.getState().chronoTime;
              useResultsStore.getState().addResult(key, chronoTime);
            }
          });
          newStates[name] = "selected";

          set({ participantStates: newStates });
          // Réinitialiser et démarrer le chronomètre
          useChronoStore.getState().resetChrono();
          useChronoStore.getState().startChrono();
        } else if (currentState === "selected") {
          // Passer de selected à done et enregistrer le temps
          const chronoTime = useChronoStore.getState().chronoTime;
          useResultsStore.getState().addResult(name, chronoTime);

          set({
            participantStates: {
              ...participantStates,
              [name]: "done",
            },
          });
        }

        // Vérifier si tous les participants sont terminés
        const allParticipantsDone = Object.values(
          get().participantStates
        ).every((state) => state === "done");
        
        // Si tous sont terminés, arrêter le chronomètre
        if (allParticipantsDone) {
          useChronoStore.getState().pauseChrono();
        }
        
        set({ allParticipantsDone });
      },

      /**
       * Sélectionner aléatoirement un participant en attente
       * Si tous sont 'done', ne fait rien (l'écran de fin sera géré par le composant)
       */
      selectRandom: () => {
        const { participants, participantStates } = get();

        // Récupérer les participants en attente
        const waiting = participants.filter(
          (name) => participantStates[name] === "waiting"
        );

        // Si plus personne en attente, enregistrer le temps du dernier participant et marquer comme terminé
        if (waiting.length === 0) {
          const newStates = { ...participantStates };
          // Enregistrer le temps du participant actuellement sélectionné (le dernier)
          Object.keys(newStates).forEach((key) => {
            if (newStates[key] === "selected") {
              newStates[key] = "done";
              const chronoTime = useChronoStore.getState().chronoTime;
              useResultsStore.getState().addResult(key, chronoTime);
            }
          });
          set({ participantStates: newStates, allParticipantsDone: true });
          useChronoStore.getState().pauseChrono();
          return;
        }

        // Remettre le participant précédemment sélectionné à 'done'
        const newStates = { ...participantStates };
        Object.keys(newStates).forEach((key) => {
          if (newStates[key] === "selected") {
            newStates[key] = "done";
            // Enregistrer le temps du participant précédent
            const chronoTime = useChronoStore.getState().chronoTime;
            useResultsStore.getState().addResult(key, chronoTime);
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

        set({ participantStates, allParticipantsDone: false });
        useChronoStore.getState().resetChrono();
        useResultsStore.getState().clearResults();
      },
    }),
    {
      name: "anti-ninja-storage", // Nom de la clé dans localStorage
    }
  )
);
