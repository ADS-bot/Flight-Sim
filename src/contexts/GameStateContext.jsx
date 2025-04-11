import React, { createContext, useContext, useState, useCallback } from 'react';

const GameStateContext = createContext();

export function GameStateProvider({ children }) {
  const [gameState, setGameState] = useState({
    isGameOver: false,
    hasCollided: false,
    collisionPoint: null,
    wasReset: false,
    timestamp: Date.now()
  });

  // Method to handle collision
  const setCollision = useCallback((collisionPoint) => {
    console.log("Collision detected at:", collisionPoint);
    setGameState(prevState => ({
      ...prevState,
      isGameOver: true,
      hasCollided: true,
      collisionPoint,
      wasReset: false,
      timestamp: Date.now()
    }));
  }, []);

  // Method to reset game after collision
  const resetGame = useCallback(() => {
    console.log("Resetting game state");
    setGameState({
      isGameOver: false,
      hasCollided: false,
      collisionPoint: null,
      wasReset: true,
      timestamp: Date.now()
    });
  }, []);

  return (
    <GameStateContext.Provider value={{ gameState, setCollision, resetGame }}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
} 