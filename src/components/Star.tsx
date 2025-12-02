import type { ParticipantState } from '../types';
import './Star.css';

interface StarProps {
  participants: string[];
  participantStates: Record<string, ParticipantState>;
  onParticipantClick: (name: string) => void;
  onCenterClick: () => void;
}

/**
 * Composant Star - Génère une étoile SVG avec N branches
 * Chaque branche correspond à un participant
 */
export default function Star({
  participants,
  participantStates,
  onParticipantClick,
  onCenterClick,
}: StarProps) {
  const n = participants.length;
  
  if (n === 0) {
    return (
      <div className="star-empty">
        <p>Aucun participant configuré</p>
        <p>Veuillez ajouter des participants dans les paramètres</p>
      </div>
    );
  }

  // Dimensions du SVG
  const width = 800;
  const height = 800;
  const centerX = width / 2;
  const centerY = height / 2;
  
  // Rayons de l'étoile
  const outerRadius = 320; // Rayon pour les pointes
  const innerRadius = 140; // Rayon pour les creux
  const centerRadius = 80; // Rayon du cercle central
  const textRadius = outerRadius + 40; // Position des prénoms (au-delà des pointes)

  /**
   * Générer les points de l'étoile
   */
  const generateStarPoints = (): string => {
    const points: string[] = [];
    const angleStep = (2 * Math.PI) / n;
    const startAngle = -Math.PI / 2; // Commencer en haut

    for (let i = 0; i < n; i++) {
      const angle = startAngle + i * angleStep;
      
      // Point externe (pointe)
      const outerX = centerX + outerRadius * Math.cos(angle);
      const outerY = centerY + outerRadius * Math.sin(angle);
      points.push(`${outerX},${outerY}`);
      
      // Point interne (creux) - entre deux pointes
      const innerAngle = angle + angleStep / 2;
      const innerX = centerX + innerRadius * Math.cos(innerAngle);
      const innerY = centerY + innerRadius * Math.sin(innerAngle);
      points.push(`${innerX},${innerY}`);
    }
    
    return points.join(' ');
  };

  /**
   * Calculer la position et rotation d'un prénom
   */
  const getTextPosition = (index: number) => {
    const angleStep = (2 * Math.PI) / n;
    const startAngle = -Math.PI / 2;
    const angle = startAngle + index * angleStep;
    
    const x = centerX + textRadius * Math.cos(angle);
    const y = centerY + textRadius * Math.sin(angle);
    
    // Calculer la rotation pour que le texte soit lisible
    let rotation = (angle * 180) / Math.PI + 90;
    
    // Ajuster la rotation pour éviter le texte à l'envers
    if (rotation > 90 && rotation < 270) {
      rotation += 180;
    }
    
    return { x, y, rotation };
  };

  /**
   * Obtenir la classe CSS selon l'état du participant
   */
  const getParticipantClass = (name: string): string => {
    const state = participantStates[name];
    return `participant-label ${state}`;
  };

  /**
   * Obtenir la couleur de la branche selon l'état
   */
  const getBranchColor = (index: number): string => {
    const name = participants[index];
    const state = participantStates[name];
    
    switch (state) {
      case 'selected':
        return '#4caf50'; // Vert
      case 'done':
        return '#9e9e9e'; // Gris
      default:
        return '#667eea'; // Violet (attente)
    }
  };

  return (
    <div className="star-container">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="star-svg"
      >
        {/* L'étoile principale */}
        <polygon
          points={generateStarPoints()}
          className="star-polygon"
          fill="url(#starGradient)"
          stroke="#fff"
          strokeWidth="4"
        />

        {/* Dégradé pour l'étoile */}
        <defs>
          <radialGradient id="starGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#764ba2" />
            <stop offset="100%" stopColor="#667eea" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Lignes des branches colorées selon l'état */}
        {participants.map((_, index) => {
          const angleStep = (2 * Math.PI) / n;
          const startAngle = -Math.PI / 2;
          const angle = startAngle + index * angleStep;
          const x = centerX + outerRadius * Math.cos(angle);
          const y = centerY + outerRadius * Math.sin(angle);
          
          return (
            <line
              key={`branch-${index}`}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke={getBranchColor(index)}
              strokeWidth="6"
              className="star-branch"
            />
          );
        })}

        {/* Cercle central cliquable */}
        <circle
          cx={centerX}
          cy={centerY}
          r={centerRadius}
          className="star-center"
          onClick={onCenterClick}
          fill="#fff"
          stroke="#667eea"
          strokeWidth="4"
        />

        {/* Icône dans le cercle central */}
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="central"
          className="center-icon"
          onClick={onCenterClick}
        >
          🎯
        </text>

        {/* Prénoms aux extrémités des branches */}
        {participants.map((name, index) => {
          const { x, y, rotation } = getTextPosition(index);
          
          return (
            <g key={`participant-${index}`}>
              {/* Zone cliquable invisible plus grande */}
              <circle
                cx={x}
                cy={y}
                r="40"
                fill="transparent"
                onClick={() => onParticipantClick(name)}
                className="participant-click-zone"
              />
              
              {/* Texte du prénom */}
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                transform={`rotate(${rotation}, ${x}, ${y})`}
                className={getParticipantClass(name)}
                onClick={() => onParticipantClick(name)}
              >
                {name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
