import type { PenaltyType } from "../types";
import "./TimeDisplay.css";

interface TimeDisplayProps {
  time: number;
  penalty?: PenaltyType;
  hasResult: boolean;
}

/**
 * Formater un temps en secondes vers un format MM:SS
 */
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

/**
 * Calculer le temps effectif d'un participant (temps + pénalités)
 */
const getEffectiveTime = (time: number, penalty?: PenaltyType): number => {
  if (penalty === "penalty1") {
    return time + 30; // Ajoute 30 secondes
  }
  return time;
};

/**
 * Composant TimeDisplay - Affiche le temps d'un participant avec pénalités
 */
export default function TimeDisplay({
  time,
  penalty,
  hasResult,
}: TimeDisplayProps) {
  if (!hasResult) {
    return <span>-</span>;
  }

  if (penalty === "penalty1") {
    return (
      <span className="time-effective">
        {formatTime(getEffectiveTime(time, penalty))}
      </span>
    );
  }

  return <span>{formatTime(time)}</span>;
}
