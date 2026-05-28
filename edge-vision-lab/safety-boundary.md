# Safety Boundary
## 安全边界

Edge Vision Lab is a fixed-scene object detection demo for industrial vision education and portfolio presentation.

工业视觉识物实验室是用于工业视觉学习、工程作品集展示和固定场景物体识别实验的 Demo。

## Allowed Scope / 允许范围

- Desktop object recognition demo.
- Tool and equipment recognition demo.
- PLC electrical component recognition demo.
- Box or cargo recognition demo.
- Parking space occupancy demo.
- Engineering status judgement based on non-sensitive object results.
- Browser-local inference experiments with authorized models and datasets.

## Prohibited Scope / 禁止范围

- Face recognition.
- Identity recognition.
- Emotion detection.
- Personnel monitoring.
- Attendance management.
- Age, gender, expression, fatigue, pressure, or other personnel-state detection.
- License plate recognition.
- ID card, bank card, student card, or certificate recognition.
- Public crowd monitoring.
- Private-area surveillance.
- Uploading or saving real camera footage in V1.0.
- Using unauthorized models or unauthorized datasets.

## Decision Boundary / 决策边界

The current version is a portfolio demo. Recognition output is only for technical demonstration and cannot be used as the basis for production control, safety decisions, security enforcement, attendance, discipline, law enforcement, or commercial decisions.

当前版本为作品集 Demo。识别结果仅用于技术展示，不得作为生产控制、安全决策、安防、考勤、纪律管理、执法或商业决策依据。

## Before Public Release / 公开发布前

Before publishing a new release, check:

- No `.env` file.
- No API key.
- No server password.
- No database account.
- No real user submitted data.
- No real camera video.
- No test image containing faces, plates, student information, ID cards, bank cards, or private scenes.
- No unauthorized model or dataset.
- README, privacy note, and safety boundary are up to date.
