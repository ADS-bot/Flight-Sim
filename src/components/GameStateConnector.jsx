import React, { useRef, useEffect } from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { setGameStateRef } from '../controls';

// Component to connect the GameState to controls
export function GameStateConnector() {
  const { gameState } = useGameState();
  const gameStateRef = useRef(gameState);
  
  // Update ref when game state changes
  useEffect(() => {
    // Ensure we're passing a proper reference to the controls system
    gameStateRef.current = gameState;
    setGameStateRef(gameStateRef);
    
    // Log state changes for debugging
    console.log("Game state updated:", gameState);
    
    // If game state was reset, ensure any necessary cleanup is done
    if (gameState.hasCollided === false && gameStateRef.current.wasReset) {
      console.log("Game state was reset, performing cleanup...");
      // Additional cleanup if needed
    }
  }, [gameState]);
  
  return null;
} 