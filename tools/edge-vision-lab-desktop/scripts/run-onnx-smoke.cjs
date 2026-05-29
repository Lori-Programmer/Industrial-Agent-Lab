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

  const session = await ort.InferenceSession.create(modelPath);

  const inputName = session.inputNames[0];
  const outputNames = session.outputNames;

  console.log("Model loaded.");
  console.log("Input name:", inputName);
  console.log("Output names:", outputNames);

  const inputShape = [1, 3, 640, 640];
  const inputSize = inputShape.reduce((a, b) => a * b, 1);

  const inputData = new Float32Array(inputSize);
  const inputTensor = new ort.Tensor("float32", inputData, inputShape);

  const feeds = {};
  feeds[inputName] = inputTensor;

  const results = await session.run(feeds);

  console.log("Inference run success.");
  for (const name of Object.keys(results)) {
    const output = results[name];
    console.log("Output:", name);
    console.log("Dims:", output.dims);
    console.log("Type:", output.type);
    console.log("First 10 values:", Array.from(output.data.slice(0, 10)));
  }
}

main().catch((err) => {
  console.error("ONNX inference smoke test failed.");
  console.error(err);
  process.exit(1);
});
