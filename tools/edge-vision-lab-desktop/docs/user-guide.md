# User Guide

## 启动

```bash
cd tools/edge-vision-lab-desktop
npm install
npm run electron
```

打包安装版：

```bash
npm run dist
```

安装版和便携版输出到 `release/`，该目录不提交到 GitHub。

输出示例：

- `Edge-Vision-Lab-Desktop-Setup-1.0.0-Windows-x64.exe`
- `Edge-Vision-Lab-Desktop-Portable-1.0.0-Windows-x64.exe`

当前安装包未做代码签名，不自动发布 release。正式公开分发前应补充代码签名、病毒误报测试和 release 校验信息。

## 使用流程

1. 阅读隐私与安全边界。
2. 勾选确认框。
3. 选择摄像头设备。
4. 点击“开启摄像头”。
5. 点击“开始识别”。
6. 查看 mock 检测框、识别结果和工程状态判断。
7. 点击“停止识别”。
8. 点击“停止摄像头”确认摄像头指示灯关闭。
9. 点击“导出 JSON”并主动选择保存位置。

## 摄像头测试

- 未勾选隐私确认时，开启摄像头按钮不可用。
- 开启摄像头后应显示实时画面。
- 点击停止摄像头后，视频流应清空，摄像头指示灯应关闭。
- 切换摄像头前应用会释放旧摄像头资源。
- 关闭窗口前应用会尝试释放摄像头资源。
- 高分辨率 `1280x720` 和 `15 FPS` 只建议在电脑性能足够时开启。

## JSON 导出

JSON 只包含结构化识别结果、工程状态和未来 Industrial Agent Bus 事件占位，不包含图片或视频。
