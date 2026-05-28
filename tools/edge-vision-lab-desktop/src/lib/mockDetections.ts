import type { DetectionBox, DetectionResult, DetectedObject, InferenceMode, SceneType } from "../types";

export const INDUSTRIAL_OBJECTS = [
  "PLC Module",
  "Network Cable",
  "Industrial Switch",
  "HMI",
  "Button",
  "Indicator Light",
  "Multimeter",
  "Tool",
  "Elevator Door State",
  "Parking Space State"
] as const;

export const MOCK_OBJECTS: DetectedObject[] = [
  { name: "PLC Module", displayName: "PLC 模块", count: 1, confidence: 0.86 },
  { name: "Network Cable", displayName: "网线", count: 2, confidence: 0.91 },
  { name: "Industrial Switch", displayName: "工业交换机", count: 1, confidence: 0.88 },
  { name: "Mouse", displayName: "鼠标", count: 1, confidence: 0.94 }
];

export const MOCK_BOXES: DetectionBox[] = [
  { id: "plc", label: "PLC Module", confidence: 0.86, x: 0.14, y: 0.18, width: 0.26, height: 0.3 },
  { id: "cable-a", label: "Network Cable", confidence: 0.91, x: 0.47, y: 0.16, width: 0.2, height: 0.18 },
  { id: "switch", label: "Industrial Switch", confidence: 0.88, x: 0.62, y: 0.42, width: 0.24, height: 0.22 },
  { id: "mouse", label: "Mouse", confidence: 0.94, x: 0.22, y: 0.58, width: 0.19, height: 0.2 }
];

export function createMockDetectionResult(
  scene: SceneType = "PLC Debugging Desk",
  mode: InferenceMode = "offline-mock"
): DetectionResult {
  return {
    scene,
    mode,
    detectedAt: new Date().toISOString(),
    objects: MOCK_OBJECTS,
    boxes: MOCK_BOXES
  };
}
