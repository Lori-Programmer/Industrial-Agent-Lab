export interface OnnxSessionState {
  status: "mock-fallback" | "ready";
  modelPath?: string;
  reason?: string;
}

export async function loadOnnxSession(modelPath?: string): Promise<OnnxSessionState> {
  if (!modelPath) {
    return {
      status: "mock-fallback",
      reason: "V1 does not bundle a model file to avoid model authorization risk."
    };
  }

  try {
    // Future path:
    // 1. Validate local model path selected by the user.
    // 2. Load onnxruntime-node or a local inference adapter.
    // 3. Keep inference fully offline.
    return {
      status: "mock-fallback",
      modelPath,
      reason: "ONNX runtime adapter is reserved for a later version."
    };
  } catch (error) {
    return {
      status: "mock-fallback",
      modelPath,
      reason: error instanceof Error ? error.message : "Unknown ONNX loading failure."
    };
  }
}
