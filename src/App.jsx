import React, { useRef, useState, useEffect } from "react";
import { PerspectiveCamera, Environment, OrbitControls } from "@react-three/drei";
import { EffectComposer, HueSaturation } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Landscape } from "./Landscape";
import { SphereEnv } from "./SphereEnv";
import { Airplane } from "./Airplane";
import { Targets } from "./Targets";
import { MotionBlur } from "./MotionBlur";
import { useScore } from "./contexts/ScoreContext";
import { setResetScoreFunction } from "./controls";

function App() {
  const orbitControlsRef = useRef();
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const { resetScore } = useScore();

  useEffect(() => {
    setResetScoreFunction(resetScore);
  }, [resetScore]);

  // Camera position adjusted for the smaller grid
  const initialCameraPosition = [0, 8, 15];

  return (
    <>
      <SphereEnv />
      <Environment background={false} files={"assets/textures/envmap.hdr"} />

      <PerspectiveCamera makeDefault position={initialCameraPosition} fov={50} />

      <OrbitControls 
        ref={orbitControlsRef} 
        target={[0, 3, 0]} 
        onStart={() => setIsUserInteracting(true)}
        onEnd={() => setIsUserInteracting(false)}
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        mouseButtons={{
          LEFT: 0,    // Rotate
          MIDDLE: 1,  // Zoom
          RIGHT: 0    // Disabled
        }}
        touches={{
          ONE: 1,     // Rotate
          TWO: 2      // Zoom
        }}
      />

      <Landscape />
      <Airplane orbitControlsRef={orbitControlsRef} isUserInteracting={isUserInteracting} />
      <Targets />

      {/* Optimized lighting for better performance */}
      <directionalLight
        castShadow
        color={"#f3d29a"}
        intensity={2}
        position={[10, 15, 10]}
        shadow-bias={-0.0005}
        shadow-mapSize-width={512}  // Reduced for better performance
        shadow-mapSize-height={512}
        shadow-camera-near={0.01}
        shadow-camera-far={40}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-camera-left={-15}
        shadow-camera-right={15}
      />

      {/* Ambient light with slightly increased intensity to compensate for fewer shadows */}
      <ambientLight intensity={0.3} color="#f3d29a" />

      <EffectComposer>
        <MotionBlur />
        <HueSaturation
          blendFunction={BlendFunction.NORMAL}
          hue={-0.15}
          saturation={0.1}
        />
      </EffectComposer>
    </>
  );
}

export default App;
