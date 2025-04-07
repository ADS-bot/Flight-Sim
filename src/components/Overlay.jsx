import React from 'react';
import { useScore } from '../contexts/ScoreContext';

export function Overlay() {
  const { score } = useScore();

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none', // Allow clicks to pass through to the canvas
      zIndex: 1,
    }}>
      {/* Score Card */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '10px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        Score: {score}
      </div>

      {/* Controls Card */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '20px 30px',
        borderRadius: '10px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        minWidth: '200px',
      }}>
        <h3 style={{ 
          margin: '0 0 15px 0', 
          color: '#f3d29a',
          fontSize: '18px',
          fontWeight: 'bold',
        }}>Controls</h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <li style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#f3d29a' }}>W/S</span>
            <span>Pitch Up/Down</span>
          </li>
          <li style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#f3d29a' }}>A/D</span>
            <span>Yaw Left/Right</span>
          </li>
          <li style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#f3d29a' }}>Shift</span>
            <span>Turbo Boost</span>
          </li>
          <li style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#f3d29a' }}>R</span>
            <span>Reset Position</span>
          </li>
          <li style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#f3d29a' }}>Scroll</span>
            <span>Zoom In/Out</span>
          </li>
        </ul>
      </div>
    </div>
  );
} 