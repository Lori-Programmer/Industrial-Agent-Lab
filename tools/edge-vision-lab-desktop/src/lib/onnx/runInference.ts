import { createMockDetectionResult } from "../mockDetections";
import type { DetectionResult, InferenceMode, SceneType } from "../../types";

export async function runInference(options: {
  scene: SceneType;
  mode: InferenceMode;
  video?: HTMLVideoElement | null;
  modelPath?: string;
}): Promise<DetectionResult> {
  if (options.mode === "offline-onnx") {
    // Future implementation:
    // 1. loadOnnxSession(options.modelPath)
    // 2. preprocessVideoFrame(options.video)
    // 3. session.run()
    // 4. postprocessModelOutput()
    // 5. fallback to mock result if model loading or inference fails
  }

  return createMockDetectionResult(options.scene, options.mode === "offline-onnx" ? "offline-onnx" : "offline-mock");
}
