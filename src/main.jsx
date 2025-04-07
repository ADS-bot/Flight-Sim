import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { ScoreProvider } from "./contexts/ScoreContext";
import { Overlay } from "./components/Overlay";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ScoreProvider>
      <Overlay />
      
      <Canvas shadows>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </Canvas>
      
      <Loader />
    </ScoreProvider>
  </React.StrictMode>
);
