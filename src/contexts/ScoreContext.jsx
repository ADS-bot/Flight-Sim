import React, { createContext, useContext, useState } from 'react';

const ScoreContext = createContext();

export function ScoreProvider({ children }) {
  const [score, setScore] = useState(0);

  const incrementScore = () => {
    setScore(prevScore => prevScore + 10);
  };

  const resetScore = () => {
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