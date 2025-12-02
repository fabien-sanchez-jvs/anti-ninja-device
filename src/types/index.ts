/**
 * État d'un participant dans l'application
 */
export type ParticipantState = "waiting" | "selected" | "done";

/**
 * Structure du store de l'application
 */
export interface Store {
  /** Liste des prénoms des participants */
  participants: string[];

  /** État actuel de chaque participant */
  participantStates: Record<string, ParticipantState>;

  /** Définir la liste des participants */
  setParticipants: (names: string[]) => void;

  /** Sélectionner manuellement un participant */
  selectParticipant: (name: string) => void;

  /** Sélectionner aléatoirement un participant parmi ceux en attente */
  selectRandom: () => void;

  /** Réinitialiser tous les états */
  reset: () => void;
}
