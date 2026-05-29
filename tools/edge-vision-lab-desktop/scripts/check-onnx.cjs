const path = require("path");
const ort = require("onnxruntime-node");

async function main() {
  const modelPath = path.join(
    process.cwd(),
    "public",
    "models",
    "industrial-object-demo",
    "test-yolo.onnx"
  );

  console.log("Loading model:", modelPath);

  const session = await ort.InferenceSession.create(modelPath);

  console.log("Model loaded successfully.");
  console.log("Input names:", session.inputNames);
  console.log("Output names:", session.outputNames);
}

main().catch((err) => {
  console.error("Failed to load ONNX model.");
  console.error(err);
  process.exit(1);
});
