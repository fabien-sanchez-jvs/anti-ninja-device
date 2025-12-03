import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Star from '../components/Star';
import './StarView.css';

/**
 * Page principale - Vue de l'étoile interactive
 */
export default function StarView() {
  const navigate = useNavigate();
  const { participants, participantStates, selectParticipant, selectRandom, reset } = useStore();

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleResetClick = () => {
    reset();
  };

  const handleRandomSelect = () => {
    selectRandom();
  };

  const handleParticipantClick = (name: string) => {
    selectParticipant(name);
  };

  // Rediriger vers les paramètres si aucun participant
  if (participants.length === 0) {
    return (
      <div className="starview-container">
        <div className="starview-empty">
          <h2>Aucun participant configuré</h2>
          <p>Veuillez d'abord configurer la liste des participants</p>
          <button onClick={handleSettingsClick} className="btn-to-settings">
            ⚙️ Aller aux paramètres
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="starview-container">
      {/* Barre de navigation */}
      <div className="starview-header">
        <button
          onClick={handleSettingsClick}
          className="btn-icon btn-settings"
          aria-label="Paramètres"
          title="Paramètres"
        >
          ⚙️
        </button>

        <h1 className="starview-title">Anti Ninja Device</h1>

        <button
          onClick={handleResetClick}
          className="btn-icon btn-reset"
          aria-label="Réinitialiser"
          title="Réinitialiser la sélection"
        >
          🔄
        </button>
      </div>

      {/* Étoile interactive */}
      <div className="starview-content">
        <Star
          participants={participants}
          participantStates={participantStates}
          onParticipantClick={handleParticipantClick}
          onCenterClick={handleRandomSelect}
        />
      </div>

      {/* Instructions */}
      <div className="starview-footer">
        <div className="instructions">
          <div className="instruction-item">
            <span className="instruction-icon">🥷</span>
            <span>Cliquez au centre pour une sélection aléatoire</span>
          </div>
          <div className="instruction-item">
            <span className="instruction-icon">👆</span>
            <span>Cliquez sur un prénom pour le sélectionner manuellement</span>
          </div>
        </div>
      </div>
    </div>
  );
}
