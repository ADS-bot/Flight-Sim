import { useScore } from './contexts/ScoreContext';
import { Matrix4 } from 'three';

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

export let controls = {};
export let resetScoreFunction = null;

export function setResetScoreFunction(fn) {
  resetScoreFunction = fn;
}

window.addEventListener("keydown", (e) => {
  controls[e.key.toLowerCase()] = true;
  if (e.key.toLowerCase() === 'r' && resetScoreFunction) {
    resetScoreFunction();
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
  if (controls["w"]) {
    pitchVelocity -= 0.0025;
  }

  if (controls["s"]) {
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
  if (controls["arrowup"]) {
    planeSpeed = Math.min(planeSpeed + 0.001, 0.1);
  }

  if (controls["arrowdown"]) {
    planeSpeed = Math.max(planeSpeed - 0.001, 0.002);
  }

  // Reset controls (R)
  if (controls["r"]) {
    jawVelocity = 0;
    pitchVelocity = 0;
    turnVelocity = 0;
    turbo = 0;
    planeSpeed = 0.006;
    x.set(1, 0, 0);
    y.set(0, 1, 0);
    z.set(0, 0, 1);
    planePosition.set(0, 9, 21);
    if (resetScoreFunction) {
        resetScoreFunction();
    }
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