# Engineering Rules

## Repository Rules

- 每个工具独立维护 `README.md`、`docs/`、`prompts/`、`examples/` 和 `src/`。
- 总 README 只做导航，不堆复杂代码和长篇实现细节。
- 不确定归属的源码先放入 `tools/_unsorted/`，并在 README 说明来源和后续归位方向。

## Safety Rules

- 不提交 `.env`、API Key、服务器密码、数据库账号、token 或私钥。
- 不提交 `node_modules`、`dist`、`build`、`.next`、`out` 等构建输出。
- 不提交真实用户数据、真实摄像头录像、包含人脸/车牌/学生信息的测试图片。
- 不使用未授权模型或未授权数据集。

## Product Rules

- 第一版优先做作品集 Demo、教学样例和工程模板。
- 涉及摄像头或自动化控制时，默认本地处理、最小数据、明确免责声明。
- 工具输出只能作为学习和技术展示，不能直接作为生产、安全、考勤或执法决策依据。
