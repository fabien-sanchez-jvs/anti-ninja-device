import { useState } from "react";
import { useResultsStore } from "../store/useResultsStore";
import { useStore } from "../store/useStore";
import type { PenaltyType } from "../types";
import ninjaOff from "../assets/ninja-off.svg";
import ninja from "../assets/ninja.svg";
import PenaltyButton from "./PenaltyButton";
import PenaltyIndicator from "./PenaltyIndicator";
import TimeDisplay from "./TimeDisplay";
import "./LeaderBoard.css";

/**
 * Obtenir l'emoji de médaille selon le rang
 */
const getMedalEmoji = (rank: number): string => {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return "";
  }
};

/**
 * Composant LeaderBoard - Affiche le classement des participants
 */
export default function LeaderBoard() {
  const { getSortedResults, setPenalty } = useResultsStore();
  const { participants } = useStore();
  const results = getSortedResults();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  // Créer un Map pour accéder rapidement aux résultats par nom
  const resultsMap = new Map(results.map((r) => [r.name, r]));

  // Créer la liste complète : participants avec résultats en premier (triés), puis sans résultats
  const allParticipants = [
    ...results.map((r) => ({
      name: r.name,
      time: r.time,
      penalty: r.penalty,
      hasResult: true,
    })),
    ...participants
      .filter((name) => !resultsMap.has(name))
      .map((name) => ({
        name,
        time: 0,
        penalty: null as PenaltyType,
        hasResult: false,
      })),
  ];

  const hasNinja = allParticipants.some(
    (participant) => !participant.hasResult,
  );

  const handlePenaltyChange = (name: string, penalty: PenaltyType) => {
    setPenalty(name, penalty);
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-image">
        <img src={hasNinja ? ninja : ninjaOff} alt="Terminé" />
      </div>
      <div className="leaderboard">
        <h2 className="leaderboard-title">🏆 Classement 🏆</h2>
        <div className="leaderboard-table">
          <div className="leaderboard-header">
            <div className="leaderboard-col-rank">Rang</div>
            <div className="leaderboard-col-name">Participant</div>
            <div className="leaderboard-col-time">Temps</div>
          </div>
          {allParticipants.map((participant, index) => (
            <div
              key={participant.name}
              className={`leaderboard-row ${index < 3 && participant.hasResult ? "leaderboard-podium" : ""} ${participant.penalty === "penalty2" ? "leaderboard-disqualified" : ""}`}
              onMouseEnter={() => setHoveredRow(participant.name)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <div className="leaderboard-col-rank">
                {participant.hasResult && (
                  <>
                    <span className="leaderboard-rank-medal">
                      {getMedalEmoji(index + 1)}
                    </span>
                    <span className="leaderboard-rank-number">{index + 1}</span>
                  </>
                )}
              </div>
              <div className="leaderboard-col-name">
                <span
                  className={
                    participant.penalty === "penalty2"
                      ? "leaderboard-name-striked"
                      : ""
                  }
                >
                  {participant.name}
                </span>
                <PenaltyIndicator penalty={participant.penalty} />
                {participant.hasResult && (
                  <PenaltyButton
                    participantName={participant.name}
                    currentPenalty={participant.penalty}
                    onPenaltyChange={handlePenaltyChange}
                    isVisible={hoveredRow === participant.name}
                  />
                )}
              </div>
              <div className="leaderboard-col-time">
                <TimeDisplay
                  time={participant.time}
                  penalty={participant.penalty}
                  hasResult={participant.hasResult}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
