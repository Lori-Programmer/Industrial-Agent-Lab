# Formal AI Recognition Requirements

## 你需要提供什么

要从 mock 识别升级到正式本地 AI 识别，需要准备以下材料。

## 1. 授权明确的模型

- ONNX 模型文件，例如 `yolo-industrial.onnx`。
- 模型来源说明：自训练、开源模型或商业授权模型。
- 模型许可证或授权记录。
- 输入尺寸，例如 640x640。
- 输出格式说明，例如 YOLO boxes、classes、confidence。

不要提交未授权模型文件到 GitHub。模型建议由用户本地选择或放在本机 `models/` 目录，公开仓库只保留 `.gitkeep`。

## 2. 工业类别标签表

至少包含：

- `PLC Module`
- `Network Cable`
- `Industrial Switch`
- `HMI`
- `Button`
- `Indicator Light`
- `Multimeter`
- `Tool`
- `Elevator Door State`
- `Parking Space State`

每个类别建议补充：

- 中文名
- 英文名
- 是否敏感
- 是否允许公开演示
- 工程含义
- 缺失时的工程建议

## 3. 非敏感训练/测试数据

可以使用：

- 自己拍摄的工业物体图片。
- 不包含人脸、车牌、证件、学生信息、住址、聊天记录、账号后台的桌面/设备照片。
- 授权明确的数据集。

不要使用：

- 公共人群场景。
- 包含他人面部或身份信息的图片。
- 车牌、身份证、银行卡、学生证等敏感信息。
- 未授权数据集。

## 4. 标注文件

推荐 YOLO 格式或 COCO 格式：

- 图片路径。
- 类别 ID。
- 边界框坐标。
- 类别名称映射。
- 数据集切分：train / val / test。

## 5. 推理参数

需要确定：

- 输入尺寸：默认 640x640。
- 置信度阈值：例如 0.35。
- NMS 阈值：例如 0.45。
- 最大检测数量。
- CPU / GPU / DirectML / ONNX Runtime execution provider。

## 6. 验收标准

正式 AI 识别接入前，至少满足：

- `npm run build` 通过。
- 模型加载失败能 fallback 到 mock。
- 摄像头开启、停止、切换正常。
- 不上传图片或视频。
- 不自动保存摄像头内容。
- JSON 只导出结构化结果。
- 不做人脸识别、身份识别、情绪识别、人员监控或考勤管理。

## 7. 后续代码接入点

- `src/lib/onnx/onnxSession.ts`：加载本地 ONNX 模型。
- `src/lib/onnx/preprocess.ts`：摄像头帧 resize 到 640x640 并转 float32 tensor。
- `src/lib/onnx/runInference.ts`：执行本地推理。
- `src/lib/onnx/postprocess.ts`：解析模型输出、过滤置信度、NMS、坐标还原。
- `src/lib/engineeringRules.ts`：把检测结果转换成工程状态判断。

## 建议的第一批真实识别目标

先从低风险、固定场景、非人员相关物体开始：

- PLC 模块
- 工业交换机
- 网线
- HMI
- 按钮
- 指示灯
- 万用表

不要第一版就做开放场景识别、人员状态识别或公共区域识别。
