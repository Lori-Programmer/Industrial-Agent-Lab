export interface PreprocessResult {
  width: 640;
  height: 640;
  channels: 3;
  shape: [1, 3, 640, 640];
  data: Float32Array;
}

export function preprocessVideoFrame(_video: HTMLVideoElement): PreprocessResult {
  // Future implementation:
  // 1. Draw one video frame to an offscreen canvas.
  // 2. Resize to 640x640.
  // 3. Convert RGBA pixels to RGB float32.
  // 4. Normalize and return shape [1, 3, 640, 640].
  return {
    width: 640,
    height: 640,
    channels: 3,
    shape: [1, 3, 640, 640],
    data: new Float32Array(1 * 3 * 640 * 640)
  };
}
