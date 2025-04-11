import React from 'react';
import { useScore } from '../contexts/ScoreContext'; // Import useScore

export function GameOverOverlay({ onRestart }) {
  const { score } = useScore(); // Get the score

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      // Use a more translucent background with blur
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      backdropFilter: 'blur(8px)',
      zIndex: 10, 
      color: '#fff',
      fontFamily: '"Orbitron", sans-serif',
    }}>
      <h1 style={{
        fontSize: '4rem',
        marginBottom: '1rem',
        textShadow: '0 0 10px #ff0000, 0 0 20px #ff0000',
      }}>
        GAME OVER
      </h1>
      {/* Display the final score */}
      <p style={{
        fontSize: '2rem',
        marginBottom: '2rem',
        textShadow: '0 0 5px #ffffff, 0 0 10px #ffffff',
      }}>
        Final Score: {score}
      </p>
      <button 
        onClick={onRestart}
        style={{
          padding: '15px 30px',
          fontSize: '1.5rem',
          fontFamily: '"Orbitron", sans-serif',
          color: '#fff',
          backgroundColor: 'rgba(255, 0, 0, 0.6)',
          border: '2px solid #ff0000',
          borderRadius: '8px',
          cursor: 'pointer',
          textTransform: 'uppercase',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 0 5px #ff0000, 0 0 15px #ff0000 inset',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
          e.target.style.boxShadow = '0 0 10px #ff0000, 0 0 25px #ff0000, 0 0 15px #ff0000 inset';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.6)';
          e.target.style.boxShadow = '0 0 5px #ff0000, 0 0 15px #ff0000 inset';
        }}
      >
        Restart
      </button>
    </div>
  );
} 