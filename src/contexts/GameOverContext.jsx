import React, { createContext, useContext, useState, useCallback } from 'react';

const GameOverContext = createContext();

export function GameOverProvider({ children }) {
  const [isGameOver, setIsGameOver] = useState(false);

  const setGameOver = useCallback((state) => {
    setIsGameOver(state);
  }, []);

  const restartGame = useCallback(() => {
    setIsGameOver(false);
    // Add any other necessary state resets here if they aren't handled elsewhere
    // For example, explicitly resetting score might be needed depending on how 'R' is handled
    // resetScoreFunction(); // Assuming resetScoreFunction is accessible or passed here
  }, []); // Add dependencies like resetScoreFunction if needed

  return (
    <GameOverContext.Provider value={{ isGameOver, setGameOver, restartGame }}>
      {children}
    </GameOverContext.Provider>
  );
}

export function useGameOver() {
  const context = useContext(GameOverContext);
  if (!context) {
    throw new Error('useGameOver must be used within a GameOverProvider');
  }
  return context;
} 