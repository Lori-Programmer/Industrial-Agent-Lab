# Edge Vision Lab Architecture

## Goal

Build a browser-local fixed-scene object detection Demo that can evolve from mock results to ONNX Runtime Web inference without changing the safety boundary.

## Modules

- `src/page.tsx`: page-level composition.
- `src/components/`: React UI blocks for hero, privacy notice, mode form, camera panel, detection results and feedback.
- `src/lib/mockDetections.ts`: mock object results for V1.
- `src/lib/engineeringRules.ts`: converts object results into engineering status.
- `src/lib/onnxSession.ts`: future ONNX Runtime Web session loader.
- `src/lib/preprocess.ts`: future video-frame preprocessing.
- `src/lib/runInference.ts`: future model invocation wrapper.
- `src/lib/postprocess.ts`: future YOLO/OpenCV output parser.

## Runtime Flow

1. User reads the privacy notice and confirms the safety boundary.
2. Camera starts only after user action.
3. V1 uses mock detection results.
4. Engineering rules convert object results into readiness judgement.
5. Feedback is routed outside the app or kept as local Demo state.

## Future ONNX Flow

1. Lazy-load ONNX Runtime Web only after the user starts recognition.
2. Capture one frame from video at a throttled rate.
3. Resize and normalize to model input shape.
4. Run local inference with `wasm` by default.
5. Parse boxes, apply confidence filtering and NMS.
6. Convert boxes back to video coordinates and draw overlays.

## Performance Rules

- Prefer 640x480 or lower for browser camera preview.
- Use 3-5 recognition cycles per second for lightweight demos.
- Avoid per-frame React state updates.
- Stop media tracks when the tool is closed or recognition stops.
