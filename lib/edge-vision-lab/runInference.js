import { createOnnxSession } from "@/lib/edge-vision-lab/onnxSession";
import { postprocessDetections } from "@/lib/edge-vision-lab/postprocess";
import { preprocessVideoFrame } from "@/lib/edge-vision-lab/preprocess";

export async function runInference(video) {
  const { ort, session } = await createOnnxSession();
  const input = preprocessVideoFrame(video);
  const inputName = session.inputNames[0];
  const feeds = {
    [inputName]: new ort.Tensor("float32", input.data, input.dims)
  };
  const outputs = await session.run(feeds);

  return postprocessDetections(outputs);
}
