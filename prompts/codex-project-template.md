# Codex Project Template

## 目标

把需求整理成一个独立工具目录，放到 `tools/<tool-name>/`。

## 必备结构

```text
tools/<tool-name>/
├─ README.md
├─ src/
├─ public/
├─ docs/
├─ prompts/
└─ examples/
```

## README 必写

- 这个工具解决什么问题
- 当前状态
- 快速开始
- 目录结构
- 安全边界
- 后续接入方向

## 验收

- 没有 `.env`、密钥、token、服务器密码。
- 没有 `node_modules`、构建输出或真实用户数据。
- prompt 和 docs 能让别人 10 秒内理解用途。
