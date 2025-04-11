import React from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { useScore } from '../contexts/ScoreContext';
import { planePosition, resetPlaneVectors } from '../Airplane';
import { resetControlStates } from '../controls';

export function GameOverCard() {
  const { gameState, resetGame } = useGameState();
  const { score, resetScore } = useScore();
  
  if (!gameState.isGameOver) return null;
  
  const handleRestart = () => {
    // Reset all game systems in the correct order
    
    // 1. Reset the plane vectors first
    resetPlaneVectors();
    
    // 2. Reset all control states
    resetControlStates();
    
    // 3. Reset score
    resetScore();
    
    // 4. Finally reset game state to trigger re-render
    resetGame();
    
    console.log("Game fully reset");
  };
  
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(11, 20, 38, 0.85)',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 100px rgba(255, 0, 0, 0.2)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      textAlign: 'center',
      color: 'white',
      fontFamily: '"Montserrat", "Orbitron", sans-serif',
      zIndex: 1000,
      minWidth: '350px',
      pointerEvents: 'auto', // Important to make buttons clickable
      animation: 'fadeIn 0.5s ease-out'
    }}>
      <div style={{
        position: 'absolute',
        top: '-60px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '120px',
        height: '120px',
        borderRadius: '60px',
        backgroundColor: 'rgba(255, 59, 59, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 30px rgba(255, 0, 0, 0.5)',
        border: '6px solid rgba(255, 255, 255, 0.3)',
      }}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z" fill="white"/>
          <path d="M12 14a1 1 0 0 1-1-1V8a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1zM12 17a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill="white"/>
        </svg>
      </div>
      
      <h2 style={{
        margin: '50px 0 30px 0',
        fontSize: '38px',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #ff4545 0%, #ff9b45 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '0.05em'
      }}>
        GAME OVER
      </h2>
      
      <div style={{
        margin: '30px 0',
        fontSize: '18px',
        lineHeight: '1.5',
        opacity: '0.85'
      }}>
        <p style={{marginBottom: '25px'}}>Your aircraft has crashed!</p>
        <div style={{ 
          margin: '30px auto',
          padding: '15px 0',
          fontSize: '28px',
          fontWeight: '600',
          color: 'white',
          background: 'linear-gradient(to right, rgba(0,0,0,0.3), rgba(255,255,255,0.1), rgba(0,0,0,0.3))',
          borderRadius: '8px',
          maxWidth: '220px'
        }}>
          {score} <span style={{fontSize: '18px', opacity: '0.6'}}>POINTS</span>
        </div>
      </div>
      
      <button 
        onClick={handleRestart}
        style={{
          backgroundColor: '#3a7cee',
          color: 'white',
          border: 'none',
          padding: '16px 30px',
          borderRadius: '30px',
          fontSize: '18px',
          fontWeight: '600',
          letterSpacing: '0.5px',
          fontFamily: '"Montserrat", "Orbitron", sans-serif',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(58, 124, 238, 0.5)',
          background: 'linear-gradient(135deg, #3a7cee 0%, #6490f7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          margin: '0 auto'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-3px)';
          e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.4), 0 0 20px rgba(58, 124, 238, 0.6)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(58, 124, 238, 0.5)';
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.65 6.35a7.95 7.95 0 0 0-11.3 0 8 8 0 0 0 0 11.3 7.95 7.95 0 0 0 11.3 0 8 8 0 0 0 0-11.3zm-1.4 9.9a6 6 0 0 1-8.4 0 5.93 5.93 0 0 1 0-8.4 6 6 0 0 1 8.4 0 5.93 5.93 0 0 1 0 8.4z" fill="white"/>
          <path d="M12.5 8.6v3.9l3.1 1.85.75-1.23-2.35-1.4V8.6h-1.5z" fill="white"/>
        </svg>
        TRY AGAIN
      </button>
      
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, -60%); }
            to { opacity: 1; transform: translate(-50%, -50%); }
          }
        `}
      </style>
    </div>
  );
} 