# Edge Vision Lab
## 工业视觉识物实验室

Edge Vision Lab is a browser-local fixed-scene object detection demo for industrial vision, edge AI, and engineering portfolio presentation.

工业视觉识物实验室是一个基于浏览器的固定场景物体识别 Demo，用于展示工业视觉、边缘 AI 和工程状态判断能力。第一版只做作品集展示与 mock 数据，不上传、不保存图片或视频，不接入后端、数据库或真实 AI 模型。

This project does not perform face recognition, identity recognition, emotion detection, personnel monitoring, attendance management, or sensitive personal information processing.

本项目不做人脸识别、身份识别、情绪识别、人员监控或考勤管理，不处理车牌、证件、学生信息等敏感个人信息。

## Two Release Tracks / 两个发布版本

### 1. Website Experience Version / 网站体验版

Purpose: portfolio display, smooth experience, low risk.

用途：放在 UTMAXS-尤迈个人工程网站中，用于作品集展示，重点是流畅、轻量、低风险。

- Keeps the essential browser camera core.
- Camera is only opened after user confirmation.
- Camera preview prefers 256x192 and caps frame rate around 5-8 fps.
- Camera automatically stops after 12 seconds on the website version.
- No continuous inference loop on the website version.
- Mock detection result is generated on demand.
- Mock detection boxes use a lightweight overlay in the website version.
- Heavy backdrop blur, large glow effects, and pixel-level canvas drawing are removed from the website version.
- Website version does not load ONNX Runtime Web.
- Stopping camera calls `track.stop()` and clears `video.srcObject`.
- Switching camera stops the old stream before requesting a new `facingMode`.
- Feedback is handled by email, not stored by the website.
- No upload, no video/image saving.

### 2. GitHub Local Run Version / GitHub 本地运行版

Purpose: public local-run project scaffold with clear safety boundaries.

用途：用于公开仓库中的本地运行、学习和二次开发。正式发布前必须通过 `public-release-checklist.md`。

Target repository:

```text
https://github.com/Lori-Programmer/Industrial-Agent-Lab
```

## Project Goals / 项目目标

- Connect browser camera, object detection, edge AI, and industrial scene understanding.
- Demonstrate the difference between "what object is this" and "what does this mean in an engineering workflow".
- Provide a safe, non-sensitive portfolio demo before real model integration.

- 连接网页摄像头、物体检测、边缘 AI 和工业现场感知。
- 不只识别“这是什么”，还进一步判断“这在工程现场意味着什么”。
- 在接入真实模型前，先提供安全、低风险、无敏感数据的作品集 Demo。

## Features / 功能列表

- Lightweight browser camera preview with `navigator.mediaDevices.getUserMedia`.
- Privacy confirmation before camera start.
- Stop camera button that stops media tracks and clears video stream.
- Front/rear camera switching with `facingMode`.
- Canvas-based mock detection boxes.
- No continuous detection loop in the website version.
- Mock recognition results: PLC module, network cable, mouse.
- Engineering status judgement for PLC debugging desk.
- JSON export for the current mock result.
- Email feedback entry.
- ONNX Runtime Web integration placeholders.

## Privacy And Safety Boundaries / 隐私与安全边界

1. This tool is only for fixed-scene object detection experiments.
2. It does not perform face recognition.
3. It does not perform identity recognition.
4. It does not perform emotion detection.
5. It does not perform personnel monitoring.
6. It does not perform attendance management.
7. It does not identify age, gender, expression, fatigue, pressure, or other personnel states.
8. It does not identify license plates, ID cards, bank cards, student cards, or other sensitive information.
9. Camera frames are processed in the user's local browser by default.
10. V1.0 does not upload or save videos or images.
11. Do not point the camera at other people, private areas, public crowds, plates, documents, student information, or other sensitive information.
12. This is not an open-ended AI chat service or a generative AI content platform.

## Tech Stack / 技术栈

- Next.js
- React
- TypeScript scaffold
- Tailwind CSS
- Browser Camera
- `getUserMedia`
- Canvas overlay
- Object Detection mock pipeline
- Edge AI planning
- ONNX Runtime Web, lazy-loaded for future integration
- YOLO / OpenCV, future integration

## Local Run / 本地运行

The live website implementation is integrated into the UTMAXS main site:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000/edge-vision-lab/
```

Build:

```bash
npm run build
```

## Future ONNX Runtime Web Plan / 后续 ONNX 接入路线

- V1.0: front-end page + camera + mock data.
- V1.1: browser-local object detection scaffold.
- V1.2: ONNX Runtime Web integration.
- V1.3: industrial label library.
- V2.0: train industrial model on an RTX 4060 desktop and export ONNX.
- V2.1: load industrial ONNX model in browser for local inference.
- V3.0: high-performance 4060 edge real-time object detection demo.

Implementation placeholders:

- `src/lib/onnxSession.ts`: lazy-load `/models/yolo-demo.onnx`, default provider `["wasm"]`, reserve `["webgpu", "wasm"]`.
- `src/lib/preprocess.ts`: capture a video frame, resize to 640x640, convert to float32 tensor shape `[1, 3, 640, 640]`.
- `src/lib/runInference.ts`: use `session.inputNames[0]` and call `session.run()`.
- `src/lib/postprocess.ts`: V1 returns mock boxes; future YOLO parsing, confidence filtering, NMS, coordinate restore.
- `src/components/DetectionCanvas.tsx`: canvas overlay for mock and future real detection boxes.

## Do Not Upload / 不应上传到公开仓库的内容

- `.env`
- API Key
- Server passwords
- Database accounts
- Real user submitted data
- Real camera videos
- Test images containing faces, license plates, student information, ID cards, bank cards, or private scenes
- Unauthorized models or datasets

## Current Implementation Location / 当前实现位置

The UTMAXS site uses the Next.js App Router under `app/`, so the live page is integrated here:

- Page entry: `app/edge-vision-lab/page.jsx`
- Website components: `components/edge-vision-lab/`
- Website logic: `lib/edge-vision-lab/`

The `edge-vision-lab/src/` directory is kept as the formal GitHub release scaffold for future extraction.
