import React from 'react';
import { useScore } from '../contexts/ScoreContext';
import { useFlightData } from '../contexts/FlightDataContext';

export function Overlay() {
  const { score } = useScore();
  const { flightData } = useFlightData();

  console.log("[Overlay Render] Speed:", flightData.speed.toFixed(0), "Height:", flightData.height.toFixed(1));

  const displaySpeed = flightData.speed.toFixed(0);
  const displayHeight = flightData.height.toFixed(1);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
      fontFamily: 'Orbitron, sans-serif',
      color: 'rgba(255, 255, 255, 0.9)',
    }}>
      {/* Score Card (Top Right) */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: '10px 20px',
        borderRadius: '8px',
        fontSize: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'right',
      }}>
        Score: {score}
      </div>

      {/* Flight Data Card (Top Left) - NEW */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: '10px 20px',
        borderRadius: '8px',
        fontSize: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
      }}>
        <div>Speed: {displaySpeed}</div>
        <div>Height: {displayHeight} m</div>
      </div>

      {/* Controls Card (Bottom Left) */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: 'rgba(255, 255, 255, 0.9)',
        padding: '15px 25px',
        borderRadius: '8px',
        fontSize: '14px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        minWidth: '180px',
      }}>
        <h3 style={{ 
          margin: '0 0 10px 0', 
          color: '#f3d29a',
          fontSize: '16px',
          fontWeight: '600',
          paddingBottom: '5px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}>Controls</h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
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