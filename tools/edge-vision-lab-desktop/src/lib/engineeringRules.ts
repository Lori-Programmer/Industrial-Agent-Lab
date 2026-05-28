import type { DetectedObject, EngineeringStatus, SceneType } from "../types";

const REQUIRED_PLC_DEBUG_ITEMS = [
  "PLC Module",
  "Network Cable",
  "Industrial Switch",
  "Power Adapter",
  "HMI",
  "Multimeter"
];

export function evaluateEngineeringStatus(
  objects: DetectedObject[],
  scene: SceneType = "PLC Debugging Desk"
): EngineeringStatus {
  const detectedItems = objects.map((item) => item.name);
  const missingItems = REQUIRED_PLC_DEBUG_ITEMS.filter((item) => !detectedItems.includes(item));

  return {
    scene,
    completeness: 75,
    detectedItems,
    missingItems,
    status: "Not Ready",
    displayStatus: "调试准备不完整",
    nextAction: "请先补齐电源适配器和基础测量工具，再进行 PLC 上电、网络连接和通信测试。"
  };
}
