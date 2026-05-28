import { mockDetections } from "./mockDetections";

export type DetectionBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const mockBoxes: DetectionBox[] = [
  { x: 0.14, y: 0.2, width: 0.28, height: 0.32 },
  { x: 0.58, y: 0.18, width: 0.24, height: 0.18 },
  { x: 0.42, y: 0.62, width: 0.2, height: 0.2 }
];

export function postprocessDetections(rawOutputs: unknown, options: Record<string, unknown> = {}) {
  return mockDetections.map((item, index) => ({
    ...item,
    box: mockBoxes[index] || mockBoxes[0],
    source: "mock-postprocess",
    rawOutputs,
    options
  }));
}

// Future postprocess work:
// 1. Parse YOLO output tensors.
// 2. Filter by confidence threshold.
// 3. Run NMS.
// 4. Restore coordinates from 640x640 model space to video space.
