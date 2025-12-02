import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import './Settings.css';

/**
 * Page de paramètres pour gérer la liste des participants
 */
export default function Settings() {
  const navigate = useNavigate();
  const { participants, setParticipants } = useStore();
  const [localParticipants, setLocalParticipants] = useState<string[]>(
    participants.length > 0 ? participants : ['']
  );
  const [error, setError] = useState<string>('');

  const handleAddParticipant = () => {
    setLocalParticipants([...localParticipants, '']);
  };

  const handleRemoveParticipant = (index: number) => {
    const newList = localParticipants.filter((_, i) => i !== index);
    setLocalParticipants(newList.length > 0 ? newList : ['']);
  };

  const handleParticipantChange = (index: number, value: string) => {
    const newList = [...localParticipants];
    newList[index] = value;
    setLocalParticipants(newList);
  };

  const handleSave = () => {
    // Filtrer les prénoms vides et supprimer les espaces
    const filteredNames = localParticipants
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    // Validation : minimum 3 prénoms
    if (filteredNames.length < 3) {
      setError('Minimum 3 prénoms requis');
      return;
    }

    // Vérifier les doublons
    const uniqueNames = new Set(filteredNames);
    if (uniqueNames.size !== filteredNames.length) {
      setError('Les prénoms doivent être uniques');
      return;
    }

    setError('');
    setParticipants(filteredNames);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="settings-container">
      <div className="settings-content">
        <h1>⚙️ Paramètres</h1>
        <p className="settings-description">
          Configurez la liste des participants (minimum 3 prénoms requis)
        </p>

        <div className="participants-list">
          {localParticipants.map((name, index) => (
            <div key={index} className="participant-row">
              <input
                type="text"
                value={name}
                onChange={(e) => handleParticipantChange(index, e.target.value)}
                placeholder={`Prénom ${index + 1}`}
                className="participant-input"
              />
              {localParticipants.length > 1 && (
                <button
                  onClick={() => handleRemoveParticipant(index)}
                  className="btn-remove"
                  aria-label="Supprimer"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <button onClick={handleAddParticipant} className="btn-add">
          + Ajouter un prénom
        </button>

        {error && <div className="error-message">{error}</div>}

        <div className="actions">
          <button onClick={handleCancel} className="btn-cancel">
            Annuler
          </button>
          <button onClick={handleSave} className="btn-save">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
