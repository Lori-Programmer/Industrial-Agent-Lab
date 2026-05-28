# Edge Vision Lab Desktop

## 工业视觉识物实验室 Windows 版

一个用于固定工业场景物体识别的 Windows 离线桌面工具，使用本地 ONNX 推理预留结构，第一版使用 mock 数据。不登录、不联网、不上传、不保存摄像头内容，不做人脸识别、身份识别、情绪识别、人员监控或考勤管理。

## 技术选择

当前选择 Electron + React + TypeScript。

原因：Tauri 是更轻的优先方案，但当前环境未检测到 `cargo` / `rustc`，无法完成 Tauri 构建链路。Electron 不依赖 Rust，更适合先把 Windows 离线版桌面体验、摄像头释放、JSON 导出和 ONNX 预留结构做出来。

## 这个工具解决什么问题

Edge Vision Lab Desktop 用于固定工业场景物体识别和工程状态判断。它不只展示“识别到什么物体”，还判断“这些物体在工程调试现场意味着什么”。

第一版固定识别对象：

- PLC 模块
- 网线
- 工业交换机
- HMI
- 按钮
- 指示灯
- 万用表
- 工具
- 电梯门状态
- 车位状态

## 当前状态

V1 scaffold。当前版本可以作为 Windows 离线桌面工具源码运行，第一版识别结果为 mock 数据，已预留本地 ONNX 推理结构。

未内置真实模型，避免模型授权风险。不提交未授权 ONNX 模型文件。

## 快速开始

```bash
cd tools/edge-vision-lab-desktop
npm install
npm run dev
```

打开 Electron 窗口：

```bash
npm run electron
```

如果提示 `Electron failed to install correctly`，说明 Electron 二进制下载不完整。Windows PowerShell 中执行：

```powershell
Remove-Item -Recurse -Force .\node_modules\electron
npm install
```

如果网络下载 Electron 较慢，可以临时使用镜像：

```powershell
$env:ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
Remove-Item -Recurse -Force .\node_modules\electron
npm install
```

构建前端和 Electron 主进程：

```bash
npm run build
```

打包 Windows 便携版：

```bash
npm run dist
```

中国网络环境下推荐：

```bash
npm run dist:cn
```

打包后会在 `release/` 目录生成：

- Windows 安装版：带桌面快捷方式、开始菜单快捷方式和应用图标。
- Windows 便携版：无需安装，直接运行。

`release/` 不提交到 GitHub，不自动发布 release。

当前配置为了兼容普通权限 Windows 环境，设置了 `signAndEditExecutable: false`，可以稳定生成未签名安装包。正式发布时，如果需要把图标完整写入 Windows EXE 资源，请开启 Windows 开发者模式或用管理员 PowerShell 打包，然后移除 `electron-builder.yml` 中的 `signAndEditExecutable: false`。

## 目录结构

```text
tools/edge-vision-lab-desktop/
├─ README.md
├─ package.json
├─ electron-builder.yml
├─ assets/
│  └─ icon.ico
├─ docs/
├─ prompts/
├─ public/
│  └─ models/
└─ src/
   ├─ electron/
   ├─ lib/
   │  ├─ mockDetections.ts
   │  ├─ engineeringRules.ts
   │  ├─ exportJson.ts
   │  ├─ cameraController.ts
   │  ├─ detectionLoop.ts
   │  └─ onnx/
   ├─ App.tsx
   └─ main.tsx
```

## 安全边界

- Windows 离线工具。
- 不登录。
- 不需要账号系统。
- 不需要联网。
- 不调用云 API。
- 不上传图片或视频。
- 不保存摄像头内容。
- 不做人脸识别。
- 不做身份识别。
- 不做情绪识别。
- 不做人员监控。
- 不做考勤管理。
- 不识别车牌、证件、学生信息或其他敏感个人信息。
- 识别结果仅用于技术展示和工程学习，不作为生产控制、安防、执法、考勤或商业决策依据。

## JSON 导出

点击界面中的“导出 JSON”。应用只导出结构化识别结果和工程状态，不导出图片或视频。文件保存位置由用户主动选择，不自动保存摄像头内容。

## ONNX 本地推理预留

当前文件：

- `src/lib/onnx/onnxSession.ts`
- `src/lib/onnx/preprocess.ts`
- `src/lib/onnx/postprocess.ts`
- `src/lib/onnx/runInference.ts`

后续接入方向：

1. 用户手动选择本地授权 ONNX 模型。
2. `onnxSession.ts` 加载本地模型路径。
3. `preprocess.ts` 将摄像头帧 resize 到 640x640 并转为 float32 tensor。
4. `runInference.ts` 执行本地推理。
5. `postprocess.ts` 做 YOLO 输出解析、置信度过滤、NMS 和坐标还原。
6. 模型加载失败时 fallback 到 mock demo。

正式 AI 识别需要准备的材料见 [docs/model-requirements.md](./docs/model-requirements.md)。

## Industrial Agent Bus 预留

导出的 JSON 已包含：

```json
{
  "future_bus_event": {
    "topic": "vision.detected",
    "from": "desktop_vision_agent",
    "target": "industrial_agent_bus"
  }
}
```

后续可以把识别结果封装为本仓库 `tools/industrial-agent-bus/` 的事件消息。

## 打包限制

- 不自动上传 release。
- 不自动发布安装包。
- 不接入自动更新。
- 不接入遥测统计。
- 不收集设备信息。
- 不接入账号系统。
- 不接入云 API。

## 摄像头释放策略

- 开启新摄像头前先释放旧 stream。
- 点击“停止识别”会停止检测循环。
- 点击“停止摄像头”会停止检测循环、调用 `track.stop()` 并清空 `video.srcObject`。
- 关闭窗口前会尝试释放摄像头资源。
- 摄像头开启后默认 10 分钟自动停止，避免长时间占用设备。

## 性能档位

- 分辨率：320x240、640x480、1280x720。
- 识别频率：3 FPS、5 FPS、10 FPS、15 FPS。
- 默认仍使用 640x480 和 5 FPS，适合普通电脑低风险演示。
- 1280x720 与 15 FPS 更吃 CPU/GPU，只建议在本机性能足够、真实 ONNX 模型较小的情况下使用。
