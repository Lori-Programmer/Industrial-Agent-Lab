# Edge Vision Lab Desktop Architecture

## Overview

Edge Vision Lab Desktop is an Electron + React + TypeScript Windows offline app. It keeps camera handling in the renderer process and uses the Electron main process only for local window creation and user-triggered JSON file saving.

## Runtime Modules

- `src/electron/main.ts`: creates the desktop window, blocks new windows, grants camera permission and handles JSON save dialog.
- `src/electron/preload.ts`: exposes a narrow `saveJsonFile` bridge.
- `src/App.tsx`: privacy confirmation, camera UI, settings, results and engineering status.
- `src/lib/cameraController.ts`: camera device listing, start, attach and stop helpers.
- `src/lib/detectionLoop.ts`: requestAnimationFrame loop with FPS throttling.
- `src/lib/mockDetections.ts`: V1 mock industrial objects and boxes.
- `src/lib/engineeringRules.ts`: PLC debugging desk readiness judgment.
- `src/lib/exportJson.ts`: privacy-safe JSON export payload.
- `src/lib/onnx/`: placeholders for future offline ONNX inference.

## Camera Lifecycle

1. User confirms the privacy boundary.
2. User starts the camera.
3. Existing stream is stopped before a new stream starts.
4. Detection loop starts only after camera is on.
5. Stop recognition cancels the detection loop.
6. Stop camera stops all media tracks and clears `video.srcObject`.
7. App unload attempts to release camera resources.
8. Camera sessions auto-stop after 10 minutes to avoid long device occupation.

## Performance Rules

- Default resolution: 640x480.
- Default frame rate request: 15 FPS, max 20.
- Optional high resolution: 1280x720.
- Camera frame rate request: 15 FPS by default, up to 30 FPS for high-resolution devices.
- Detection frequency: 3, 5, 10 or 15 FPS.
- No per-frame React state update.
- Detection boxes are drawn on a lightweight canvas overlay.
- Future ONNX inference must be throttled and must fallback to mock on failure.

## Offline Boundary

The app does not call cloud APIs, does not include auto-update, does not upload camera frames, and does not save images or videos.
