# Industrial Agent Bus

## 这个工具解决什么问题

Industrial Agent Bus 用于定义工业智能体之间的消息、状态、任务、事件和工具调用边界，让 PLC、仿真、视觉识别、调度策略和工业 AI 模块可以用统一协议交换信息。

## 当前状态

Planned。当前目录是协议和工具骨架，尚未发布稳定 schema。

## 快速开始

```bash
cd tools/industrial-agent-bus
```

先阅读 `docs/` 和 `schemas/`，再为具体工具添加消息示例。

## 目录结构

```text
tools/industrial-agent-bus/
├─ README.md
├─ docs/
├─ prompts/
├─ schemas/
├─ examples/
└─ src/
```

## 安全边界

- 只定义学习、仿真和作品集场景中的消息协议。
- 不直接控制真实工业设备。
- 不传输服务器密码、API key、token 或个人敏感信息。
- 不把智能体建议直接作为生产控制、安全决策或执法依据。

## 后续接入方向

- 定义 agent message schema。
- 定义 tool call schema。
- 增加视觉结果、仿真状态和 PLC 调试状态的事件样例。
- 接入本仓库其他工具作为统一消息总线。
