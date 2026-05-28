# Edge Vision Lab

## 工业视觉识物实验室

Edge Vision Lab 是一个固定场景工业视觉识物 Demo，用于展示浏览器摄像头、边缘 AI、物体检测和工程状态判断之间的连接。

## 这个工具解决什么问题

普通视觉 Demo 往往只回答“这是什么”。Edge Vision Lab 进一步回答“这在工程现场意味着什么”，例如 PLC 调试桌面是否缺少交换机、电源适配器或必要连接。

适用场景：

- 工业视觉作品集展示。
- 浏览器本地摄像头识物实验。
- PLC 调试桌面、工具设备、纸箱货物、车位状态等固定场景 Demo。
- 后续接入 ONNX Runtime Web、YOLO/OpenCV 和工业标签库。

## 当前状态

V1 scaffold。当前目录保留正式 GitHub 下载版的 TypeScript 组件、mock 数据、ONNX 接入占位和安全文档。

历史网站体验版仍保存在 `../_unsorted/utmaxs-site/`，后续可以继续抽取到本工具内形成独立可运行版本。

## 快速开始

```bash
cd tools/edge-vision-lab
npm install
npm run check
```

当前 `src/` 是可抽取到 Next.js/React 项目的工具源码 scaffold，不默认上传、不保存视频或图片。

## 目录结构

```text
tools/edge-vision-lab/
├─ README.md
├─ src/
├─ public/
├─ docs/
│  ├─ architecture.md
│  ├─ user-guide.md
│  ├─ safety.md
│  ├─ privacy-note.md
│  └─ public-release-checklist.md
├─ prompts/
│  └─ architecture.prompt.md
├─ examples/
├─ screenshots/
└─ package.json
```

## 安全边界

- 仅用于固定场景物体识别实验。
- 不做人脸识别、身份识别、情绪识别、人员监控或考勤管理。
- 不识别年龄、性别、表情、疲劳、压力等人员状态。
- 不识别车牌、身份证、银行卡、学生证等敏感信息。
- 摄像头画面默认仅在用户本地浏览器中处理。
- 第一版不上传、不保存视频或图片。
- 不使用未授权模型或未授权数据集。

详细说明见 [docs/safety.md](./docs/safety.md) 和 [docs/privacy-note.md](./docs/privacy-note.md)。

## 后续接入方向

- V1.0：前端页面 + 摄像头 + mock 数据。
- V1.1：浏览器本地识物 scaffold。
- V1.2：ONNX Runtime Web 接入。
- V1.3：工业标签库。
- V2.0：4060 台式机训练工业模型并导出 ONNX。
- V2.1：网站加载工业 ONNX 模型进行本地推理。
- V3.0：4060 边缘实时识物高性能演示版。

## 不应上传到公开仓库的内容

- `.env`
- API Key
- 服务器密码
- 数据库账号
- 真实用户提交数据
- 真实摄像头录像
- 包含人脸、车牌、学生信息、证件或隐私区域的测试图片
- 未授权模型或未授权数据集
