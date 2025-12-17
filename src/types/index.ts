/**
 * État d'un participant dans l'application
 */
export type ParticipantState = "waiting" | "selected" | "done";

/**
 * Structure du store du chronomètre
 */
export interface ChronoStore {
  /** Temps écoulé du chronomètre en secondes */
  chronoTime: number;

  /** État du chronomètre */
  chronoRunning: boolean;

  /** Temps d'alarme en secondes (0 = pas d'alarme) */
  alarmTime: number;

  /** Démarrer le chronomètre */
  startChrono: () => void;

  /** Mettre en pause le chronomètre */
  pauseChrono: () => void;

  /** Réinitialiser le chronomètre */
  resetChrono: () => void;

  /** Incrémenter le temps du chronomètre */
  incrementChrono: () => void;

  /** Définir le temps d'alarme */
  setAlarmTime: (seconds: number) => void;
}

/**
 * Structure du store de l'application
 */
export interface Store {
  /** Liste des prénoms des participants */
  participants: string[];

  /** État actuel de chaque participant */
  participantStates: Record<string, ParticipantState>;

  /** Indique si tous les participants sont terminés */
  allParticipantsDone: boolean;

  /** Définir la liste des participants */
  setParticipants: (names: string[]) => void;

  /** Sélectionner manuellement un participant */
  selectParticipant: (name: string) => void;

  /** Sélectionner aléatoirement un participant parmi ceux en attente */
  selectRandom: () => void;

  /** Réinitialiser tous les états */
  reset: () => void;
}
