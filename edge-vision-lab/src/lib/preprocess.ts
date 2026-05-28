export type PreprocessedFrame = {
  data: Float32Array;
  dims: [1, 3, number, number];
};

export function preprocessVideoFrame(video: HTMLVideoElement, size = 640): PreprocessedFrame {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    throw new Error("Canvas 2D context is not available.");
  }

  ctx.drawImage(video, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);
  const tensorData = new Float32Array(1 * 3 * size * size);
  const planeSize = size * size;

  for (let i = 0; i < planeSize; i += 1) {
    const pixelIndex = i * 4;
    tensorData[i] = data[pixelIndex] / 255;
    tensorData[planeSize + i] = data[pixelIndex + 1] / 255;
    tensorData[planeSize * 2 + i] = data[pixelIndex + 2] / 255;
  }

  return {
    data: tensorData,
    dims: [1, 3, size, size]
  };
}
