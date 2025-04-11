import React, { createContext, useContext, useState, useCallback } from 'react';

const ScoreContext = createContext();

export function ScoreProvider({ children }) {
  const [score, setScore] = useState(0);

  const incrementScore = () => {
    console.log("INCREMENT SCORE CALLED - Adding 10");
    setScore(prevScore => prevScore + 10);
  };

  const resetScore = () => {
    console.log("RESET SCORE CALLED");
    setScore(0);
  };

  return (
    <ScoreContext.Provider value={{ score, incrementScore, resetScore }}>
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore() {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
} 