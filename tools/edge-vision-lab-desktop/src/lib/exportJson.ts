import type { DetectionResult, EngineeringStatus, ExportPayload } from "../types";

export function buildExportPayload(
  result: DetectionResult,
  engineeringStatus: EngineeringStatus
): ExportPayload {
  return {
    project: "Edge Vision Lab",
    version: "v1.0",
    track: "windows-offline",
    mode: "offline-local-demo",
    privacy: {
      login: false,
      networkRequired: false,
      upload: false,
      saveImage: false,
      saveVideo: false,
      faceRecognition: false,
      identityRecognition: false,
      emotionDetection: false,
      personnelMonitoring: false,
      attendanceTracking: false,
      sensitivePersonalInfoProcessing: false
    },
    scene: result.scene,
    objects: result.objects.map((item) => ({
      name: item.name,
      count: item.count,
      confidence: item.confidence
    })),
    engineering_status: {
      scene: engineeringStatus.scene,
      completeness: engineeringStatus.completeness,
      missing_items: engineeringStatus.missingItems,
      status: engineeringStatus.status,
      next_action: "Check power supply and network connection before PLC debugging."
    },
    future_bus_event: {
      topic: "vision.detected",
      from: "desktop_vision_agent",
      target: "industrial_agent_bus"
    }
  };
}

export async function exportJson(payload: ExportPayload) {
  const jsonContent = JSON.stringify(payload, null, 2);
  const suggestedName = `edge-vision-lab-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;

  if (window.edgeVisionDesktop?.saveJsonFile) {
    return window.edgeVisionDesktop.saveJsonFile(suggestedName, jsonContent);
  }

  const blob = new Blob([jsonContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = suggestedName;
  link.click();
  URL.revokeObjectURL(url);
  return { status: "saved" as const, filePath: suggestedName };
}
