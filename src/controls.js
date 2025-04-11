import { useScore } from './contexts/ScoreContext';
import { Matrix4, Vector3 } from 'three';

// Define shared vectors and position here
export const x = new Vector3(1, 0, 0);
export const y = new Vector3(0, 1, 0);
export const z = new Vector3(0, 0, 1);
export const planePosition = new Vector3(0, 3, 15);

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

export let controls = {};
export let resetScoreFunction = null;

export function setResetScoreFunction(fn) {
  resetScoreFunction = fn;
}

// Function to perform a full game reset
export function triggerFullReset() {
  console.log("Triggering full reset from controls...");
  jawVelocity = 0;
  pitchVelocity = 0;
  turnVelocity = 0;
  turbo = 0;
  planeSpeed = 0.006;
  x.set(1, 0, 0);
  y.set(0, 1, 0);
  z.set(0, 0, 1);
  planePosition.set(0, 3, 15);
  
  if (resetScoreFunction) {
    resetScoreFunction();
  }
}

window.addEventListener("keydown", (e) => {
  controls[e.key.toLowerCase()] = true;
  // Use the new reset function for 'r' key
  if (e.key.toLowerCase() === 'r') {
    triggerFullReset();
  }
});

window.addEventListener("keyup", (e) => {
  controls[e.key.toLowerCase()] = false;
});

let maxVelocity = 0.04;
let jawVelocity = 0;
let pitchVelocity = 0;
let turnVelocity = 0;
let planeSpeed = 0.006;
export let turbo = 0;

// Export function to get current plane speed
export function getPlaneSpeed() {
  return planeSpeed;
}

export function updatePlaneAxis(x, y, z, planePosition, camera) {
  jawVelocity *= 0.95;
  pitchVelocity *= 0.95;
  turnVelocity *= 0.95;

  if (Math.abs(jawVelocity) > maxVelocity) 
    jawVelocity = Math.sign(jawVelocity) * maxVelocity;

  if (Math.abs(pitchVelocity) > maxVelocity) 
    pitchVelocity = Math.sign(pitchVelocity) * maxVelocity;

  if (Math.abs(turnVelocity) > maxVelocity)
    turnVelocity = Math.sign(turnVelocity) * maxVelocity;

  // Yaw controls (A/D)
  if (controls["a"]) {
    jawVelocity += 0.0025;
  }

  if (controls["d"]) {
    jawVelocity -= 0.0025;
  }

  // Pitch controls (W/S)
  if (controls["arrowdown"]) {
    pitchVelocity -= 0.0025;
  }

  if (controls["arrowup"]) {
    pitchVelocity += 0.0025;
  }

  // Sharp turn controls (Left/Right Arrows)
  if (controls["arrowleft"]) {
    turnVelocity += 0.0025;
  }

  if (controls["arrowright"]) {
    turnVelocity -= 0.0025;
  }

  // Speed controls (Up/Down Arrows)
  if (controls["w"]) {
    planeSpeed = Math.min(planeSpeed + 0.001, 0.1);
  }

  if (controls["s"]) {
    planeSpeed = Math.max(planeSpeed - 0.001, 0.002);
  }

  // Apply direct turning rotation
  const turnMatrix = new Matrix4().makeRotationY(turnVelocity);
  x.applyMatrix4(turnMatrix);
  y.applyMatrix4(turnMatrix);
  z.applyMatrix4(turnMatrix);

  // Apply regular yaw and pitch rotations
  x.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(z, jawVelocity);

  y.applyAxisAngle(x, pitchVelocity);
  z.applyAxisAngle(x, pitchVelocity);

  x.normalize();
  y.normalize();
  z.normalize();

  // plane position & velocity
  if (controls.shift) {
    turbo += 0.025;
  } else {
    turbo *= 0.95;
  }
  turbo = Math.min(Math.max(turbo, 0), 1);

  let turboSpeed = easeOutQuad(turbo) * 0.02;

  camera.fov = 45 + turboSpeed * 900;
  camera.updateProjectionMatrix();

  planePosition.add(z.clone().multiplyScalar(-planeSpeed - turboSpeed));
}