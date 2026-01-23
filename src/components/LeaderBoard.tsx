import { useState } from "react";
import { useResultsStore } from "../store/useResultsStore";
import { useStore } from "../store/useStore";
import type { PenaltyType } from "../types";
import ninjaOff from "../assets/ninja-off.svg";
import ninja from "../assets/ninja.svg";
import "./LeaderBoard.css";

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
  const [showPenaltyMenu, setShowPenaltyMenu] = useState<string | null>(null);

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

  const handlePenaltyClick = (name: string, penalty: PenaltyType) => {
    setPenalty(name, penalty);
    setShowPenaltyMenu(null);
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
                {participant.penalty === "penalty1" && (
                  <div
                    className="leaderboard-penalty-indicator leaderboard-penalty-yellow"
                    title="Pénalité +30s"
                  ></div>
                )}
                {participant.penalty === "penalty2" && (
                  <div
                    className="leaderboard-penalty-indicator leaderboard-penalty-red"
                    title="Disqualifié"
                  ></div>
                )}
                {participant.hasResult && hoveredRow === participant.name && (
                  <div className="leaderboard-penalty-buttons">
                    <button
                      className="leaderboard-penalty-btn"
                      onClick={() =>
                        setShowPenaltyMenu(
                          showPenaltyMenu === participant.name
                            ? null
                            : participant.name,
                        )
                      }
                      title="Appliquer une pénalité"
                    >
                      ⚠️
                    </button>
                    {showPenaltyMenu === participant.name && (
                      <div className="leaderboard-penalty-menu">
                        <button
                          className="leaderboard-penalty-menu-item penalty-1"
                          onClick={() =>
                            handlePenaltyClick(
                              participant.name,
                              participant.penalty === "penalty1"
                                ? null
                                : "penalty1",
                            )
                          }
                        >
                          {participant.penalty === "penalty1" ? "✓ " : ""}+30s
                        </button>
                        <button
                          className="leaderboard-penalty-menu-item penalty-2"
                          onClick={() =>
                            handlePenaltyClick(
                              participant.name,
                              participant.penalty === "penalty2"
                                ? null
                                : "penalty2",
                            )
                          }
                        >
                          {participant.penalty === "penalty2" ? "✓ " : ""}
                          Disqualifié
                        </button>
                        {participant.penalty && (
                          <button
                            className="leaderboard-penalty-menu-item penalty-remove"
                            onClick={() =>
                              handlePenaltyClick(participant.name, null)
                            }
                          >
                            Retirer
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="leaderboard-col-time">
                {participant.hasResult ? (
                  <>
                    {participant.penalty === "penalty1" ? (
                      <>
                        <span className="leaderboard-time-original">
                          {formatTime(participant.time)}
                        </span>
                        <span className="leaderboard-time-effective">
                          {" "}
                          →{" "}
                          {formatTime(
                            getEffectiveTime(
                              participant.time,
                              participant.penalty,
                            ),
                          )}
                        </span>
                      </>
                    ) : (
                      formatTime(participant.time)
                    )}
                  </>
                ) : (
                  "-"
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
