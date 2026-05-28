import { MOCK_BOXES } from "../mockDetections";
import type { DetectionBox } from "../../types";

export function postprocessModelOutput(_output: unknown): DetectionBox[] {
  // V1 returns mock boxes. Future versions should add YOLO parsing,
  // confidence filtering, NMS and coordinate restore.
  return MOCK_BOXES;
}
