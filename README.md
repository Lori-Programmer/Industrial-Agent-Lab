# Industrial-Agent-Lab

工业智能工具资产库。这里不是单一网站源码仓库，而是面向 PLC、工业通信、仿真、多智能体、MARL、工业 AI 和工程产品化的 monorepo 工具库。

## 工具索引

| 工具 | 状态 | 解决的问题 |
| --- | --- | --- |
| [Edge Vision Lab](./tools/edge-vision-lab/README.md) | V1 scaffold | 固定场景工业视觉识物、边缘 AI 和工程状态判断 Demo |
| [Elevator Dispatch Simulator](./tools/elevator-dispatch-simulator/README.md) | Planned | 电梯群控、调度策略、强化学习和仿真教学 |
| [Industrial Agent Bus](./tools/industrial-agent-bus/README.md) | Planned | 工业智能体之间的消息、状态、任务和事件协议 |
| [_unsorted](./tools/_unsorted/README.md) | Holding area | 暂未拆分到具体工具的历史网站源码和部署资产 |

## 目录结构

```text
Industrial-Agent-Lab/
├─ tools/      # 每个工具独立 README、docs、prompts、examples、src
├─ docs/       # 仓库级路线、索引和工程规则
└─ prompts/    # 通用工程提示词和安全边界模板
```

## 使用方式

1. 先看 [项目索引](./docs/project-index.md) 选择工具。
2. 进入对应 `tools/<tool-name>/` 目录。
3. 阅读该工具的 `README.md`、`docs/` 和 `prompts/`。
4. 本地运行前先检查该工具的安全边界和依赖说明。

## 安全边界

本仓库不应提交 `.env`、API Key、服务器密码、数据库账号、真实用户数据、真实摄像头录像、包含人脸/车牌/学生信息的测试图片、未授权模型或未授权数据集。

涉及摄像头、视觉识别、智能体决策或自动化控制的工具，默认只用于学习、仿真、作品集和固定场景实验，不作为生产控制、安防、考勤、执法或商业决策依据。

## 文档入口

- [路线图](./docs/roadmap.md)
- [项目索引](./docs/project-index.md)
- [工程规则](./docs/engineering-rules.md)
- [全局工程提示词](./prompts/global-engineering-prompt.md)
- [Codex 项目模板](./prompts/codex-project-template.md)
- [安全边界提示词](./prompts/safety-boundary-prompt.md)
