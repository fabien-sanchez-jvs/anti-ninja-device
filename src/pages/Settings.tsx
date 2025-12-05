import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import './Settings.css';

/**
 * Page de paramètres pour gérer la liste des participants
 */
export default function Settings() {
  const navigate = useNavigate();
  const { participants, setParticipants, alarmTime, setAlarmTime } = useStore();
  const [localParticipants, setLocalParticipants] = useState<string[]>(
    participants.length > 0 ? participants : ['']
  );
  const [error, setError] = useState<string>('');
  const [alarmInput, setAlarmInput] = useState<string>(() => {
    if (alarmTime === 0) return '';
    const minutes = Math.floor(alarmTime / 60);
    const seconds = alarmTime % 60;
    return minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : alarmTime.toString();
  });

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

    // Parser l'alarme
    let alarmSeconds = 0;
    if (alarmInput.trim()) {
      if (alarmInput.includes(':')) {
        // Format min:sec
        const parts = alarmInput.split(':');
        if (parts.length === 2) {
          const minutes = parseInt(parts[0], 10);
          const seconds = parseInt(parts[1], 10);
          if (!isNaN(minutes) && !isNaN(seconds) && seconds >= 0 && seconds < 60) {
            alarmSeconds = minutes * 60 + seconds;
          } else {
            setError('Format d\'alarme invalide (MM:SS)');
            return;
          }
        } else {
          setError('Format d\'alarme invalide (MM:SS ou secondes)');
          return;
        }
      } else {
        // Format secondes uniquement
        const seconds = parseInt(alarmInput, 10);
        if (!isNaN(seconds) && seconds >= 0) {
          alarmSeconds = seconds;
        } else {
          setError('Format d\'alarme invalide (nombre de secondes)');
          return;
        }
      }
    }

    setError('');
    setParticipants(filteredNames);
    setAlarmTime(alarmSeconds);
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

        <div className="alarm-section">
          <h2>⏰ Alarme</h2>
          <p className="alarm-description">
            Définir une alarme (optionnel). Format : MM:SS ou secondes uniquement
          </p>
          <input
            type="text"
            value={alarmInput}
            onChange={(e) => setAlarmInput(e.target.value)}
            placeholder="Ex: 2:30 ou 150"
            className="alarm-input"
          />
          <p className="alarm-hint">
            Exemples : "2:30" pour 2 min 30 sec, ou "90" pour 90 secondes
          </p>
        </div>

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
