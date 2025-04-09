import React, { createContext, useContext, useState, useCallback } from 'react';

const FlightDataContext = createContext();

export function FlightDataProvider({ children }) {
  const [flightData, setFlightData] = useState({ speed: 0, height: 0 });

  // Use useCallback to memoize the update function
  const updateFlightData = useCallback((data) => {
    setFlightData(prevData => ({ ...prevData, ...data }));
  }, []);

  return (
    <FlightDataContext.Provider value={{ flightData, updateFlightData }}>
      {children}
    </FlightDataContext.Provider>
  );
}

export function useFlightData() {
  const context = useContext(FlightDataContext);
  if (!context) {
    throw new Error('useFlightData must be used within a FlightDataProvider');
  }
  return context;
} 