import { useEffect } from 'react';
import { useChronoStore } from '../store/useChronoStore';
import './Chronometer.css';

/**
 * Composant Chronomètre - Style réveil années 80
 * Affiche le temps écoulé en format MM:SS
 */
export default function Chronometer() {
  const { chronoTime, chronoRunning, incrementChrono, alarmTime } = useChronoStore();

  // Gestion du timer
  useEffect(() => {
    if (!chronoRunning) return;

    const interval = setInterval(() => {
      incrementChrono();
    }, 1000);

    return () => clearInterval(interval);
  }, [chronoRunning, incrementChrono]);

  // Formatage du temps en MM:SS
  const minutes = Math.floor(chronoTime / 60);
  const seconds = chronoTime % 60;
  
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  // Détection du dépassement de l'alarme
  const isAlarmExceeded = alarmTime > 0 && chronoTime >= alarmTime;

  return (
    <div className={`chronometer ${isAlarmExceeded ? 'alarm-exceeded' : ''}`}>
      <div className="chronometer-display">
        <span className="chronometer-digit">{formattedMinutes}</span>
        <span className="chronometer-separator">:</span>
        <span className="chronometer-digit">{formattedSeconds}</span>
      </div>
    </div>
  );
}
