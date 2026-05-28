import { spawn } from "node:child_process";

const isWindows = process.platform === "win32";
const command = isWindows ? "cmd" : "sh";
const args = isWindows ? ["/c", "vite --host 127.0.0.1"] : ["-lc", "vite --host 127.0.0.1"];

const vite = spawn(command, args, {
  stdio: "inherit",
  shell: false,
  env: process.env
});

async function waitForDevServer() {
  const started = Date.now();
  while (Date.now() - started < 30000) {
    try {
      const response = await fetch("http://127.0.0.1:5173");
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error("Vite dev server did not start within 30 seconds.");
}

try {
  await waitForDevServer();
  const electronCommand = isWindows ? "cmd" : "sh";
  const electronArgs = isWindows
    ? ["/c", "electron dist-electron/main.js"]
    : ["-lc", "electron dist-electron/main.js"];
  const electron = spawn(electronCommand, electronArgs, {
    stdio: "inherit",
    shell: false,
    env: {
      ...process.env,
      VITE_DEV_SERVER_URL: "http://127.0.0.1:5173"
    }
  });

  electron.on("exit", (code) => {
    vite.kill();
    process.exit(code ?? 0);
  });
} catch (error) {
  vite.kill();
  console.error(error);
  process.exit(1);
}
