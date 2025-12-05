import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import './Chronometer.css';

/**
 * Composant Chronomètre - Style réveil années 80
 * Affiche le temps écoulé en format MM:SS
 */
export default function Chronometer() {
  const { chronoTime, chronoRunning, incrementChrono } = useStore();

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

  return (
    <div className="chronometer">
      <div className="chronometer-display">
        <span className="chronometer-digit">{formattedMinutes}</span>
        <span className="chronometer-separator">:</span>
        <span className="chronometer-digit">{formattedSeconds}</span>
      </div>
    </div>
  );
}
