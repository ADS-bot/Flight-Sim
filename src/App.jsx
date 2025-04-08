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

  const initialCameraPosition = [0, 3.5, 9];

  return (
    <>
      <SphereEnv />
      <Environment background={false} files={"assets/textures/envmap.hdr"} />

      <PerspectiveCamera makeDefault position={initialCameraPosition} fov={40} />

      <OrbitControls 
        ref={orbitControlsRef} 
        target={[0, 3, 0]} 
        onStart={() => setIsUserInteracting(true)}
        onEnd={() => setIsUserInteracting(false)}
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        mouseButtons={{
          LEFT: 1,    // Rotate
          MIDDLE: 2,  // Zoom
          RIGHT: 0    // Disabled
        }}
      />

      <Landscape />
      <Airplane orbitControlsRef={orbitControlsRef} isUserInteracting={isUserInteracting} />
      <Targets />

      <directionalLight
        castShadow
        color={"#f3d29a"}
        intensity={2}
        position={[10, 5, 4]}
        shadow-bias={-0.0005}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.01}
        shadow-camera-far={20}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-left={-6.2}
        shadow-camera-right={6.4}
      />

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
