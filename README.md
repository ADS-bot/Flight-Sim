# Flight Sim ✈️

A 3D airplane flying simulation built with React Three Fiber (R3F) and Three.js. Fly through a tiled landscape, collect targets, and try to get the highest score!

## Features

*   **Smooth Airplane Controls:** Realistic flight dynamics with pitch, yaw, and sharp turning controls.
*   **Variable Speed & Turbo:** Control your speed with arrow keys and activate a turbo boost with Shift.
*   **Tiled Landscape:** An infinitely repeating landscape created by tiling a base scene model efficiently using InstancedMesh.
*   **Scoring System:** Fly through rings (targets) scattered across the landscape to increase your score.
*   **Interactive Camera:** Smooth camera following the plane, with user interaction via OrbitControls (mouse drag to rotate, scroll to zoom).
*   **UI Overlay:** Displays the current score and a handy controls reference card.
*   **Visual Effects:** Includes motion blur (based on turbo speed) and color grading using react-postprocessing.
*   **Performance Optimizations:** Uses instancing for landscape tiles and optimized settings for shadows and reflections.

## Technologies Used

*   [React](https://reactjs.org/)
*   [Three.js](https://threejs.org/)
*   [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) (R3F)
*   [React Three Drei](https://github.com/pmndrs/drei) (Helpers for R3F)
*   [React Postprocessing](https://github.com/pmndrs/react-postprocessing)
*   [Vite](https://vitejs.dev/) (Build Tool)
*   [gltfjsx](https://github.com/pmndrs/gltfjsx) (GLTF to JSX converter)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application should now be running on `http://localhost:5173` (or another port if 5173 is busy).

## Controls

*   **W / S:** Increase / Decrease Speed
*   **A / D:** Yaw Left / Right
*   **Left / Right Arrows:** Sharp Turn Left / Right
*   **Up / Down Arrows:** Pitch Up / Down
*   **Shift:** Turbo Boost
*   **R:** Reset Plane Position & Speed, Reset Score
*   **Mouse Drag (Left Button):** Orbit camera around the plane (when camera is not auto-following)
*   **Mouse Scroll:** Zoom In / Out

## Notes

*   The landscape is currently a 3x3 grid (minus corners) for performance reasons. This can be adjusted in `src/Landscape.jsx` (`GRID_SIZE`, `SKIP_CORNERS`).
*   Targets are distributed across the active landscape tiles. The number of targets per tile can be adjusted in `src/Targets.jsx` (`TARGETS_PER_TILE`).
*   Performance settings (shadow resolution, reflection quality) can be tweaked in `src/App.jsx` and `src/Landscape.jsx`. 
