/// <reference types="vite/client" />

interface EdgeVisionDesktopBridge {
  saveJsonFile: (
    suggestedName: string,
    jsonContent: string
  ) => Promise<{ status: "saved"; filePath: string } | { status: "cancelled" }>;
}

interface Window {
  edgeVisionDesktop?: EdgeVisionDesktopBridge;
}
