import { useState, useMemo, useEffect } from "react";
import { Quaternion, TorusGeometry, Vector3 } from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Airplane";
import { useScore } from "./contexts/ScoreContext";
import { GRID_SIZE, SKIP_CORNERS } from "./Landscape";

function randomPoint(scale) {
  return new Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  ).multiply(scale || new Vector3(1, 1, 1));
}

const TARGET_RAD = 0.125;
const TARGETS_PER_TILE = 10; // Reduced from 25 to 5 targets per tile for better performance

export function Targets() {
  const { incrementScore } = useScore();
  const [landscapeSize, setLandscapeSize] = useState(null);
  
  // Get the landscape size from the window object (set by the Landscape component)
  useEffect(() => {
    const checkSize = () => {
      if (window.LANDSCAPE_SIZE) {
        setLandscapeSize(window.LANDSCAPE_SIZE);
      } else {
        // If not available yet, check again after a short delay
        setTimeout(checkSize, 100);
      }
    };
    checkSize();
  }, []);
  
  // Create targets distributed across grid tiles
  const [targets, setTargets] = useState(() => {
    // Use a default size initially, will be updated when landscapeSize is available
    const defaultSize = { x: 10, y: 5, z: 10 };
    return createTargets(defaultSize);
  });
  
  // Update targets when landscape size is available
  useEffect(() => {
    if (landscapeSize) {
      setTargets(createTargets(landscapeSize));
    }
  }, [landscapeSize]);
  
  // Function to create targets distributed across the grid
  function createTargets(size) {
    const arr = [];
    const halfGrid = Math.floor(GRID_SIZE / 2);
    
    // Loop through the same grid pattern as in Landscape.jsx
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let z = 0; z < GRID_SIZE; z++) {
        // Skip corners like in Landscape.jsx for consistency
        if (SKIP_CORNERS && (x === 0 && z === 0 || x === 2 && z === 2 || 
            x === 0 && z === 2 || x === 2 && z === 0)) {
          continue;
        }
        
        // Calculate the tile offset using actual landscape size
        const tileOffsetX = (x - halfGrid) * size.x;
        const tileOffsetZ = (z - halfGrid) * size.z;
        
        // Create targets for this tile
        for (let i = 0; i < TARGETS_PER_TILE; i++) {
          arr.push({
            center: randomPoint(new Vector3(4, 1, 4))
              .add(new Vector3(tileOffsetX, 2 + Math.random() * 2, tileOffsetZ)),
            direction: randomPoint().normalize(),
            hit: false,
            id: `${x}-${z}-${i}`, // Include grid position in ID
            gridPos: { x, z } // Track which grid this target belongs to
          });
        }
      }
    }
    
    return arr;
  }

  const geometry = useMemo(() => {
    let geo;
    targets.filter(t => !t.hit).forEach((target) => {
      const torusGeo = new TorusGeometry(TARGET_RAD, 0.02, 8, 25);
      torusGeo.applyQuaternion(
        new Quaternion().setFromUnitVectors(
          new Vector3(0, 0, 1),
          target.direction
        )
      );
      torusGeo.translate(target.center.x, target.center.y, target.center.z);

      if (!geo) geo = torusGeo;
      else geo = mergeBufferGeometries([geo, torusGeo]);
    });

    return geo || null;
  }, [targets]);

  useFrame(() => {
    let scoreNeedsUpdate = false;
    const newTargets = targets.map(target => {
      if (target.hit) return target;

      const v = planePosition.clone().sub(target.center);
      const dist = target.direction.dot(v);
      const projected = planePosition
        .clone()
        .sub(target.direction.clone().multiplyScalar(dist));

      const hitDist = projected.distanceTo(target.center);
      if (hitDist < TARGET_RAD && Math.abs(dist) < 0.2) {
        incrementScore();
        scoreNeedsUpdate = true;
        return { ...target, hit: true };
      }
      return target;
    });

    if (scoreNeedsUpdate) {
      setTargets(newTargets);
    }
  });

  if (!geometry) return null;

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial roughness={0.5} metalness={0.5} color="#ffdc5e" emissive="#ff8a00" emissiveIntensity={0.2} />
    </mesh>
  );
}
