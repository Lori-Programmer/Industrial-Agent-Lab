import { app, BrowserWindow, dialog, ipcMain, session } from "electron";
import fs from "node:fs/promises";
import path from "node:path";

const isDev = Boolean(process.env.VITE_DEV_SERVER_URL);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 980,
    minHeight: 680,
    title: "Edge Vision Lab Desktop",
    backgroundColor: "#071015",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWindow.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  mainWindow.webContents.on("will-navigate", (event, targetUrl) => {
    const allowedDevUrl = process.env.VITE_DEV_SERVER_URL ?? "";
    if (targetUrl.startsWith("file://")) return;
    if (allowedDevUrl && targetUrl.startsWith(allowedDevUrl)) return;
    event.preventDefault();
  });

  if (isDev && process.env.VITE_DEV_SERVER_URL) {
    void mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    void mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((_webContents, permission, callback) => {
    callback(permission === "media");
  });

  ipcMain.handle(
    "edge-vision:save-json",
    async (_event, suggestedName: string, jsonContent: string) => {
      const result = await dialog.showSaveDialog({
        title: "导出识别结果 JSON",
        defaultPath: suggestedName,
        filters: [{ name: "JSON", extensions: ["json"] }]
      });

      if (result.canceled || !result.filePath) {
        return { status: "cancelled" as const };
      }

      await fs.writeFile(result.filePath, jsonContent, "utf8");
      return { status: "saved" as const, filePath: result.filePath };
    }
  );

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
