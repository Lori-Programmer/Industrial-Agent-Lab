export type InferenceMode = "offline-mock" | "offline-onnx";
export type RuntimeMode = "offline-local-demo";
export type ResolutionKey = "320x240" | "640x480";
export type SceneType =
  | "PLC Debugging Desk"
  | "Tools And Devices"
  | "Elevator Door State"
  | "Parking Space State";

export interface DetectionBox {
  id: string;
  label: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DetectedObject {
  name: string;
  displayName: string;
  count: number;
  confidence: number;
}

export interface DetectionResult {
  scene: SceneType;
  mode: InferenceMode;
  detectedAt: string;
  objects: DetectedObject[];
  boxes: DetectionBox[];
}

export interface EngineeringStatus {
  scene: SceneType;
  completeness: number;
  detectedItems: string[];
  missingItems: string[];
  status: "Ready" | "Not Ready";
  displayStatus: string;
  nextAction: string;
}

export interface ExportPayload {
  project: "Edge Vision Lab";
  version: "v1.0";
  track: "windows-offline";
  mode: RuntimeMode;
  privacy: {
    login: false;
    networkRequired: false;
    upload: false;
    saveImage: false;
    saveVideo: false;
    faceRecognition: false;
    identityRecognition: false;
    emotionDetection: false;
    personnelMonitoring: false;
    attendanceTracking: false;
    sensitivePersonalInfoProcessing: false;
  };
  scene: SceneType;
  objects: Array<{
    name: string;
    count: number;
    confidence: number;
  }>;
  engineering_status: {
    scene: SceneType;
    completeness: number;
    missing_items: string[];
    status: "Ready" | "Not Ready";
    next_action: string;
  };
  future_bus_event: {
    topic: "vision.detected";
    from: "desktop_vision_agent";
    target: "industrial_agent_bus";
  };
}
