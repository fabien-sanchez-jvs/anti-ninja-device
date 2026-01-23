import { useResultsStore } from '../store/useResultsStore';
import { useStore } from '../store/useStore';
import ninjaOff from '../assets/ninja-off.svg';
import ninja from "../assets/ninja.svg";
import './LeaderBoard.css';

/**
 * Formater un temps en secondes vers un format MM:SS
 */
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Obtenir l'emoji de médaille selon le rang
 */
const getMedalEmoji = (rank: number): string => {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return '';
  }
};

/**
 * Composant LeaderBoard - Affiche le classement des participants
 */
export default function LeaderBoard() {
  const { getSortedResults } = useResultsStore();
  const { participants } = useStore();
  const results = getSortedResults();
  
  // Créer un Map pour accéder rapidement aux résultats par nom
  const resultsMap = new Map(results.map(r => [r.name, r]));
  
  // Créer la liste complète : participants avec résultats en premier (triés), puis sans résultats
  const allParticipants = [
    ...results.map(r => ({ name: r.name, time: r.time, hasResult: true })),
    ...participants
      .filter(name => !resultsMap.has(name))
      .map(name => ({ name, time: 0, hasResult: false }))
  ];

  const hasNinja = allParticipants.some(participant => !participant.hasResult);

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
              className={`leaderboard-row ${index < 3 && participant.hasResult ? 'leaderboard-podium' : ''}`}
            >
              <div className="leaderboard-col-rank">
                {participant.hasResult && (
                  <>
                    <span className="leaderboard-rank-medal">{getMedalEmoji(index + 1)}</span>
                    <span className="leaderboard-rank-number">{index + 1}</span>
                  </>
                )}
              </div>
              <div className="leaderboard-col-name">{participant.name}</div>
              <div className="leaderboard-col-time">
                {participant.hasResult ? formatTime(participant.time) : '-'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
