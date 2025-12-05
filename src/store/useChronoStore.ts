import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChronoStore } from "../types";

/**
 * Store Zustand pour le chronomètre et l'alarme
 * Gère le temps écoulé et les alertes
 */
export const useChronoStore = create<ChronoStore>()(
  persist(
    (set, get) => ({
      chronoTime: 0,
      chronoRunning: false,
      alarmTime: 0,

      /**
       * Démarrer le chronomètre
       */
      startChrono: () => {
        set({ chronoRunning: true });
      },

      /**
       * Mettre en pause le chronomètre
       */
      pauseChrono: () => {
        set({ chronoRunning: false });
      },

      /**
       * Réinitialiser le chronomètre
       */
      resetChrono: () => {
        set({ chronoTime: 0, chronoRunning: false });
      },

      /**
       * Incrémenter le temps du chronomètre
       */
      incrementChrono: () => {
        const { chronoRunning, chronoTime } = get();
        if (chronoRunning) {
          set({ chronoTime: chronoTime + 1 });
        }
      },

      /**
       * Définir le temps d'alarme
       */
      setAlarmTime: (seconds: number) => {
        set({ alarmTime: seconds });
      },
    }),
    {
      name: "anti-ninja-chrono-storage", // Nom de la clé dans localStorage
    }
  )
);
