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
          gap: '12px',
        }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex',
              gap: '4px',
            }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '24px',
                textAlign: 'center',
              }}>▲</div>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '24px',
                textAlign: 'center',
              }}>▼</div>
            </div>
            <span>Speed Up/Down</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex',
              gap: '4px',
            }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '24px',
                textAlign: 'center',
              }}>◀</div>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '24px',
                textAlign: 'center',
              }}>▶</div>
            </div>
            <span>Sharp Turns</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex',
              gap: '4px',
            }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '24px',
                textAlign: 'center',
              }}>W</div>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '24px',
                textAlign: 'center',
              }}>S</div>
            </div>
            <span>Pitch Up/Down</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex',
              gap: '4px',
            }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '24px',
                textAlign: 'center',
              }}>A</div>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '24px',
                textAlign: 'center',
              }}>D</div>
            </div>
            <span>Yaw Left/Right</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              minWidth: '50px',
              textAlign: 'center',
            }}>Shift</div>
            <span>Turbo Boost</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              minWidth: '24px',
              textAlign: 'center',
            }}>R</div>
            <span>Reset Position</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              minWidth: '70px',
              textAlign: 'center',
            }}>Scroll</div>
            <span>Zoom In/Out</span>
          </li>
        </ul>
      </div>
    </div>
  );
} 