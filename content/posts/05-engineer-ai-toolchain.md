---
title: "工程师 AI 工具链"
date: 2026-05-22
description: "工具不是能力，工具产出才是能力。每天追一个新工具容易焦虑，每周深用一个工具、每月沉淀一个作品才有效。"
tags: AI工具链,工程库,学习计划
---

## 个人网站、工程库与工具学习计划

供大学生阅读 | 经验分类总结

> 文档编号：05

工具不是能力，工具产出才是能力。每天追一个新工具容易焦虑，每周深用一个工具、每月沉淀一个作品才有效。

## 一、AI 如何帮助工程师

| 层级 | 工具/能力 | 能帮什么 |
| --- | --- | --- |
| 资料层 | ChatGPT、Perplexity、NotebookLM、Elicit | 查资料、读论文、整理项目笔记。 |
| 代码层 | Cursor、GitHub Copilot、Codex、Claude Code | 写仿真、重构代码、解释报错、生成 README。 |
| 工业层 | TIA Portal、Factory I/O、Node-RED、MQTT、Wireshark | PLC 调试、虚拟仿真、数据流、通信诊断。 |
| 仿真/RL 层 | Gymnasium、PettingZoo、Stable-Baselines3、RLlib | 构建可训练环境，做 RL/MARL 实验。 |
| 产品化层 | GitHub、个人网站、Bilibili、Notion/飞书 | 展示作品、导流、沉淀资料包和服务。 |

## 二、你的行业工具地图

PLC 控制：TIA Portal、STEP 7、WinCC。产出 I/O 表、SCL 代码、HMI 画面。

工业仿真：Factory I/O、Python 仿真、MATLAB/Simulink。产出虚拟调试截图和实验数据。

通信诊断：MQTT Explorer、Mosquitto、UaExpert、Wireshark。产出消息截图、抓包分析。

数据可视化：Node-RED、InfluxDB、Grafana。产出状态看板、指标曲线。

MARL：Gymnasium、PettingZoo、RLlib。产出自定义环境、训练脚本、对比报告。

开发部署：Git、GitHub、Codex、服务器、Nginx、宝塔。产出工程库和个人网站。

## 三、每天学一个新工具是否合理

不完全合理。更好的计划是：每天接触一个工具概念，每周深用一个工具，每月沉淀一个可展示作品。工具必须绑定主线，否则就是噪音。

| 周期 | 做法 | 验收 |
| --- | --- | --- |
| 每天 | 用工具解决一个小问题 | 一个截图/命令/代码片段。 |
| 每周 | 深用一个工具完成小项目 | 一个可运行 Demo。 |
| 每月 | 把工具写进作品集或资料包 | README、教程、案例。 |

## 四、个人网站第一版定位

网站第一版不做复杂后台，不做数据库。它的定位是“路线导航 + 作品集 + 产品落地页 + 账号导流器”。

| 页面 | 内容 |
| --- | --- |
| 首页 | 路线分类树状图：PLC、通信、仿真、调度、RL/MARL、产品化。 |
| 关于网站 | 说明网站定位、为什么做、长期方向和核心原则。 |
| 产品/服务 | 资料包、训练包、诊断服务，并导流 Bilibili/GitHub。 |
| 作品集 | 西门子杯、电梯仿真、MARL 环境草案、工程资产库。 |
| 文章/博客 | 工业路线、PLC、通信、Python 仿真、MARL、AI 工具。 |
| 联系方式 | Bilibili、GitHub、邮箱、微信、表单 UI。 |
| 后台管理 | 第一版只做静态 UI，占位未来路线/产品/文章管理。 |

## 五、工程库命名与简介

Industrial Agent Lab / 工业智能体工程库

中文简介：工业智能体工程库是一个面向智能制造与工业边缘智能方向的个人工程资产库，围绕 PLC 控制、工业通信、Python 仿真、多智能体调度、MARL 强化学习、安全兜底和工程产品化，持续沉淀代码、文档、实验数据、项目复盘和作品集材料。

English: Industrial Agent Lab is a personal engineering asset repository focused on PLC control, industrial communication, Python simulation, multi-agent scheduling, MARL, safety constraints, and industrial AI productization.

## 六、60 分钟最小执行

选一个工具，例如 MQTT Explorer。

做一个最小实验：发布 elevator/01/state 消息。

截图保存，命名为 MQTT_电梯状态消息实验_01.png。

写 5 行说明：工具解决什么问题、怎么用、下次在哪里复用。
