import type { ResolutionKey } from "../types";

const RESOLUTION_MAP: Record<ResolutionKey, { width: number; height: number }> = {
  "320x240": { width: 320, height: 240 },
  "640x480": { width: 640, height: 480 },
  "1280x720": { width: 1280, height: 720 }
};

export async function listCameraDevices() {
  if (!navigator.mediaDevices?.enumerateDevices) return [];
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === "videoinput");
}

export async function startCameraStream(options: {
  deviceId?: string;
  resolution: ResolutionKey;
}): Promise<MediaStream> {
  const size = RESOLUTION_MAP[options.resolution];

  return navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: options.deviceId ? { exact: options.deviceId } : undefined,
      width: { ideal: size.width },
      height: { ideal: size.height },
      frameRate: { ideal: options.resolution === "1280x720" ? 24 : 15, max: 30 }
    },
    audio: false
  });
}

export async function attachCameraStream(video: HTMLVideoElement, stream: MediaStream) {
  video.srcObject = stream;
  await video.play();
}

export function stopCameraStream(stream: MediaStream | null, video?: HTMLVideoElement | null) {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }

  if (video) {
    video.pause();
    video.srcObject = null;
  }
}
