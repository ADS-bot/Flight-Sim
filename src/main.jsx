import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { ScoreProvider } from "./contexts/ScoreContext";
import { FlightDataProvider } from "./contexts/FlightDataContext";
import { GameOverProvider, useGameOver } from "./contexts/GameOverContext";
import { Overlay } from "./components/Overlay";
import { GameOverOverlay } from "./components/GameOverOverlay";
import { triggerFullReset } from "./controls";

// Wrapper component to access the game over context
function MainApp() {
  const { isGameOver } = useGameOver();

  return (
    <>
      <Overlay />

      {isGameOver && <GameOverOverlay onRestart={triggerFullReset} />}

      <Canvas shadows >
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </Canvas>

      <Loader />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ScoreProvider>
      <FlightDataProvider>
        <GameOverProvider>
          <MainApp />
        </GameOverProvider>
      </FlightDataProvider>
    </ScoreProvider>
  </React.StrictMode>
);
