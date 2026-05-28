let cachedSessionPromise: Promise<{ ort: typeof import("onnxruntime-web"); session: import("onnxruntime-web").InferenceSession }> | null = null;

export async function createOnnxSession(modelPath = "/models/yolo-demo.onnx") {
  if (!cachedSessionPromise) {
    cachedSessionPromise = import("onnxruntime-web").then(async (ort) => {
      const session = await ort.InferenceSession.create(modelPath, {
        executionProviders: ["wasm"]
        // Future option after browser support verification: ["webgpu", "wasm"]
      });

      return { ort, session };
    });
  }

  return cachedSessionPromise;
}

export function resetOnnxSessionCache() {
  cachedSessionPromise = null;
}
