import { useState } from "react";
import type { PenaltyType } from "../types";
import "./PenaltyButton.css";

interface PenaltyButtonProps {
  participantName: string;
  currentPenalty?: PenaltyType;
  onPenaltyChange: (name: string, penalty: PenaltyType) => void;
  isVisible: boolean;
}

/**
 * Composant PenaltyButton - Bouton et menu pour appliquer des pénalités
 */
export default function PenaltyButton({
  participantName,
  currentPenalty,
  onPenaltyChange,
  isVisible,
}: PenaltyButtonProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handlePenaltyClick = (penalty: PenaltyType) => {
    onPenaltyChange(participantName, penalty);
    setShowMenu(false);
  };

  return (
    <div className={`penalty-buttons ${isVisible && "visible"}`}>
      <button
        className="penalty-btn"
        onClick={() => setShowMenu(!showMenu)}
        title="Appliquer une pénalité"
      >
        ⚠️
      </button>
      {showMenu && (
        <div className="penalty-menu">
          <button
            className="penalty-menu-item penalty-1"
            onClick={() =>
              handlePenaltyClick(
                currentPenalty === "penalty1" ? null : "penalty1",
              )
            }
          >
            {currentPenalty === "penalty1" ? "✓ " : ""}+30s
          </button>
          <button
            className="penalty-menu-item penalty-2"
            onClick={() =>
              handlePenaltyClick(
                currentPenalty === "penalty2" ? null : "penalty2",
              )
            }
          >
            {currentPenalty === "penalty2" ? "✓ " : ""}Disqualifié
          </button>
          {currentPenalty && (
            <button
              className="penalty-menu-item penalty-remove"
              onClick={() => handlePenaltyClick(null)}
            >
              Retirer
            </button>
          )}
        </div>
      )}
    </div>
  );
}
