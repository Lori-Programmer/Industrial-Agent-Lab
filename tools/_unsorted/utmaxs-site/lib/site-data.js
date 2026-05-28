export const routeTracks = [
  {
    id: "plc",
    badge: "PLC",
    level: "基础到工程",
    title: "PLC 工程路线",
    description: "从电气基础、IO 表、梯形图、状态机到产线联调，形成能演示的控制项目。",
    steps: ["低压电器与 IO", "梯形图 / ST", "手自动与报警", "运动控制", "产线联调", "项目文档输出"]
  },
  {
    id: "communication",
    badge: "COMM",
    level: "工程链路",
    title: "工业通信路线",
    description: "围绕现场总线、协议采集、上位机和数据看板，建立从设备到软件的数据链路。",
    steps: ["RS485 / Ethernet", "Modbus / OPC UA", "Profinet / EtherCAT", "MQTT", "抓包调试", "数据入库"]
  },
  {
    id: "simulation",
    badge: "SIM",
    level: "虚拟调试",
    title: "仿真与数字孪生路线",
    description: "用模型验证流程、节拍和信号映射，在真实设备前先完成可视化推演。",
    steps: ["设备建模", "产线节拍", "虚拟 IO", "PLC 联调", "3D 可视化", "仿真报告"]
  },
  {
    id: "multi-agent",
    badge: "AGENT",
    level: "算法到场景",
    title: "多智能体路线",
    description: "把复杂产线、AGV、工位和任务拆成可协同决策的智能体系统。",
    steps: ["状态建模", "任务分配", "协作机制", "冲突消解", "调度评估", "可解释展示"]
  },
  {
    id: "marl",
    badge: "MARL",
    level: "论文到复现",
    title: "MARL 强化学习路线",
    description: "从 Gym 环境、奖励函数到多智能体训练，把论文复现转成工程演示。",
    steps: ["环境封装", "奖励设计", "集中训练", "分散执行", "实验记录", "结果复盘"]
  },
  {
    id: "industrial-ai",
    badge: "AI",
    level: "工业智能",
    title: "工业 AI 路线",
    description: "覆盖视觉检测、预测维护、知识库、RAG 和智能运维，连接工程数据与 AI 应用。",
    steps: ["数据采集", "视觉检测", "时序预测", "知识库", "RAG 助手", "运维闭环"]
  },
  {
    id: "productization",
    badge: "PROD",
    level: "产品化",
    title: "产品化路线",
    description: "把脚本、模板和演示项目打磨成能交付、能维护、能传播的工具产品。",
    steps: ["需求定义", "MVP", "文档模板", "演示视频", "开源发布", "私域交付"]
  }
];

export const products = [
  {
    type: "路线说明",
    title: "自动化工程路线样张",
    description: "用于快速了解 PLC、通信、仿真、MARL 与工业 AI 的学习路径和项目输出方式；完整资料通过私域沟通发送。",
    action: "联系获取",
    href: "/contact"
  },
  {
    type: "开源项目",
    title: "Industrial-Agent-Lab",
    description: "沉淀通信测试、数据采集、仿真辅助、多智能体和 MARL 实验项目，当前网站只展示外部项目入口。",
    action: "前往 GitHub",
    href: "https://github.com/Lori-Programmer/Industrial-Agent-Lab"
  },
  {
    type: "视频内容",
    title: "Bilibili 路线讲解",
    description: "用视频讲路线拆解、项目演示和工具使用，适合先看一遍整体工程路径。",
    action: "前往 Bilibili",
    href: "https://space.bilibili.com/614708521/lists"
  },
  {
    type: "定制服务",
    title: "自动化开源工具定制",
    description: "围绕 PLC 通信、上位机采集、项目模板、仿真流程和工业 AI 小工具做轻量定制。",
    action: "联系定制",
    href: "/contact"
  },
  {
    type: "私人辅导",
    title: "大学生项目/竞赛/毕设辅导",
    description: "面向机械、自动化、智能制造学生，帮助选题、拆路线、做作品集和准备展示材料。",
    action: "咨询辅导",
    href: "/contact"
  },
  {
    type: "长期方向",
    title: "工业智能库会员资料",
    description: "TODO：未来可扩展为资料订阅或社群权益；第一版暂不做支付和用户登录。",
    action: "查看规划",
    href: "/about"
  }
];

export const projects = [
  {
    domain: "工业视觉",
    status: "站内 Demo",
    title: "Edge Vision Lab 工业视觉识物实验室",
    description: "基于网页摄像头的固定场景物体识别 Demo，展示边缘 AI、工业视觉和工程状态判断能力。",
    evidence: ["浏览器摄像头", "Mock 检测框", "工程状态判断"],
    href: "/edge-vision-lab"
  },
  {
    domain: "PLC",
    status: "GitHub 仓库入口",
    title: "小型分拣产线 PLC 控制模板",
    description: "包含 IO 表、状态机、报警、手自动模式、复位流程和调试记录，适合课程设计和作品集展示。",
    evidence: ["IO 表", "状态机", "调试清单"],
    href: "https://github.com/Lori-Programmer/Industrial-Agent-Lab"
  },
  {
    domain: "通信",
    status: "GitHub 仓库入口",
    title: "Modbus / OPC UA 数据采集工具",
    description: "用于寄存器读取、变量映射、异常定位和数据导出，把协议学习转成可使用的小工具。",
    evidence: ["协议映射", "采集日志", "异常定位"],
    href: "https://github.com/Lori-Programmer/Industrial-Agent-Lab"
  },
  {
    domain: "仿真",
    status: "Bilibili 演示入口",
    title: "虚拟调试与数字孪生演示场景",
    description: "用产线模型先验证流程和节拍，再接入虚拟 IO 或 PLC 信号进行联调演示。",
    evidence: ["3D 场景", "节拍报告", "联调视频"],
    href: "https://space.bilibili.com/614708521/lists"
  },
  {
    domain: "MARL",
    status: "GitHub 仓库入口",
    title: "多 AGV 调度强化学习实验模板",
    description: "把多智能体强化学习环境封装成可训练、可复现、可解释的制造调度实验。",
    evidence: ["Gym 环境", "奖励函数", "实验曲线"],
    href: "https://github.com/Lori-Programmer/Industrial-Agent-Lab"
  }
];

export const channels = [
  {
    name: "Bilibili",
    href: "https://space.bilibili.com/614708521/lists",
    description: "路线讲解、项目演示、工具教程和学习记录的视频入口。"
  },
  {
    name: "GitHub",
    href: "https://github.com/Lori-Programmer/Industrial-Agent-Lab",
    description: "Industrial-Agent-Lab：开源工具、工业智能模板和项目代码入口。"
  },
  {
    name: "微信私域",
    href: "/contact",
    description: "微信号：vx-Carloslyq，用于定制工具、私人辅导和项目合作。"
  },
  {
    name: "问题提交",
    href: "https://github.com/Lori-Programmer/Industrial-Agent-Lab/issues",
    description: "通过 GitHub Issues 提交问题、建议和工具需求，不在本站收集表单数据。"
  }
];
