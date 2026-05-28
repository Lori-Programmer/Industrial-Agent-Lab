import { createOnnxSession } from "./onnxSession";
import { postprocessDetections } from "./postprocess";
import { preprocessVideoFrame } from "./preprocess";

export async function runInference(video: HTMLVideoElement) {
  const { ort, session } = await createOnnxSession();
  const input = preprocessVideoFrame(video);
  const inputName = session.inputNames[0];
  const feeds = {
    [inputName]: new ort.Tensor("float32", input.data, input.dims)
  };
  const outputs = await session.run(feeds);

  return postprocessDetections(outputs);
}
