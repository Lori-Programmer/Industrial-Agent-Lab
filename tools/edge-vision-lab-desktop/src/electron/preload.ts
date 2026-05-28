import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("edgeVisionDesktop", {
  saveJsonFile: (suggestedName: string, jsonContent: string) =>
    ipcRenderer.invoke("edge-vision:save-json", suggestedName, jsonContent)
});
