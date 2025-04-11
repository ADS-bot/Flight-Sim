import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { ScoreProvider } from "./contexts/ScoreContext";
import { FlightDataProvider } from "./contexts/FlightDataContext";
import { Overlay } from "./components/Overlay";
import { GameStateProvider } from "./contexts/GameStateContext";
import { GameStateConnector } from "./components/GameStateConnector";

function AppWithProviders() {
  return (
    <ScoreProvider>
      <FlightDataProvider>
        <GameStateProvider>
          <GameStateConnector />
          <Overlay />
          
          <Canvas shadows>
            <Suspense fallback={null}>
              <App />
            </Suspense>
          </Canvas>
          
          <Loader />
        </GameStateProvider>
      </FlightDataProvider>
    </ScoreProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWithProviders />
  </React.StrictMode>
);
