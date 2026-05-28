import { buildEngineeringStatus } from "@/lib/edge-vision-lab/engineeringRules";

export function buildDetectionExport(scene, detections) {
  const engineering = buildEngineeringStatus(detections, scene);
  return {
    project: "Edge Vision Lab",
    scene: "PLC Debugging Desk",
    mode: "browser-local-demo",
    privacy: {
      upload: false,
      saveVideo: false,
      faceRecognition: false,
      identityRecognition: false,
      emotionDetection: false,
      personnelMonitoring: false
    },
    objects: detections.map((item) => ({
      name: item.englishName,
      count: item.count,
      confidence: item.confidence
    })),
    engineering_status: {
      scene: "PLC Debugging Desk",
      completeness: engineering.completeness,
      missing_items: ["Switch", "Power Adapter"],
      status: "Not Ready",
      next_action: "Check power supply and network connection before PLC debugging."
    }
  };
}
