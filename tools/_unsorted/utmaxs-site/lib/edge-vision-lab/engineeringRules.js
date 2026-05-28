export function buildEngineeringStatus(detections, selectedScene) {
  if (detections.length === 0) {
    return {
      scene: selectedScene === "PLC 电气元件" ? "PLC 调试桌面" : selectedScene,
      completeness: 0,
      detected: [],
      missingItems: ["PLC 模块", "网线", "交换机", "电源适配器"],
      status: "未开始识别",
      nextAction: "请先确认隐私与安全边界并开始识别。"
    };
  }

  return {
    scene: selectedScene === "PLC 电气元件" ? "PLC 调试桌面" : selectedScene,
    completeness: 75,
    detected: detections.map((item) => item.name),
    missingItems: ["交换机", "电源适配器"],
    status: "调试准备不完整",
    nextAction: "请先补齐交换机和电源适配器，再进行 PLC 上电和网络连接测试。"
  };
}
