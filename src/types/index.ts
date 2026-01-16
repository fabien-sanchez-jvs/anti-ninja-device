/**
 * État d'un participant dans l'application
 */
export type ParticipantState = "waiting" | "selected" | "done";

/**
 * Résultat d'un participant avec son temps de participation
 */
export interface ParticipantResult {
  name: string;
  time: number; // Temps en secondes
  timestamp: number; // Date de fin
}

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

  ninja: string | null;

  /** Définir la liste des participants */
  setParticipants: (names: string[]) => void;

  /** Sélectionner manuellement un participant */
  selectParticipant: (name: string) => void;

  /** Sélectionner aléatoirement un participant parmi ceux en attente */
  selectRandom: () => void;

  /** Réinitialiser tous les états */
  reset: () => void;
}

/**
 * Structure du store des résultats
 */
export interface ResultsStore {
  /** Résultats de la session en cours */
  results: ParticipantResult[];

  /** Ajouter un résultat */
  addResult: (name: string, time: number) => void;

  /** Obtenir les résultats triés par temps (du plus rapide au plus lent) */
  getSortedResults: () => ParticipantResult[];

  /** Réinitialiser les résultats */
  clearResults: () => void;
}
