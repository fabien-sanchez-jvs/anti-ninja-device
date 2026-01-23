import type { PenaltyType } from "../types";
import "./PenaltyIndicator.css";

interface PenaltyIndicatorProps {
  penalty?: PenaltyType;
}

/**
 * Composant PenaltyIndicator - Affiche l'indicateur visuel de pénalité
 */
export default function PenaltyIndicator({ penalty }: PenaltyIndicatorProps) {
  if (!penalty) return null;

  return (
    <>
      {penalty === "penalty1" && (
        <div
          className="penalty-indicator penalty-yellow"
          title="Pénalité +30s"
        ></div>
      )}
      {penalty === "penalty2" && (
        <div
          className="penalty-indicator penalty-red"
          title="Disqualifié"
        ></div>
      )}
    </>
  );
}
