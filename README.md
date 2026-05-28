# UTMAXS-尤迈 工业智能库

面向机械、自动化、智能制造方向学生与从业者的个人工程路线网站。网站定位是“工业智能库”，展示 PLC、工业通信、仿真、多智能体、MARL、工业 AI 和产品化路线。

## 技术栈

- Next.js App Router
- React
- Tailwind CSS
- Markdown 博客
- 静态导出，适合 Vercel 或 Ubuntu + Nginx

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

## 构建

```bash
npm run build
```

当前 `next.config.mjs` 使用 `output: "export"`，构建后会生成 `out/` 静态目录。

## 内容维护

- 路线、产品、作品集、账号入口：`lib/site-data.js`
- Markdown 博客：`content/posts/*.md`
- 首屏图片：`public/images/industrial-lab-hero.webp`
- 工业视觉识物实验室：`app/edge-vision-lab/page.jsx`、`components/edge-vision-lab/`、`lib/edge-vision-lab/`

Bilibili、GitHub、邮箱和微信入口已经替换为当前公开联系方式；其他待补充内容继续用 `TODO` 标记，例如真实作品截图、工具 release 和正式资料包。

## 页面

- `/` 首页
- `/routes` 路线分类
- `/about` 关于网站
- `/services` 产品/服务
- `/portfolio` 作品集
- `/edge-vision-lab` 工业视觉识物实验室
- `/blog` 文章/博客
- `/contact` 联系方式
- `/admin` 后台管理占位页

## 合规与隐私边界

`/edge-vision-lab` 第一版仅作为个人工程作品集 Demo，用于固定场景物体识别实验。它不做人脸识别、身份识别、情绪识别、人员监控或考勤管理，不识别年龄、性别、表情、疲劳、压力等人员状态，也不识别车牌、身份证、银行卡、学生证等敏感信息。

摄像头画面默认只在用户本地浏览器中处理，第一版不上传、不保存视频或图片。请勿将摄像头对准他人、隐私区域或公共人群场景。本项目不是开放式 AI 聊天服务，也不是生成式 AI 内容平台。

公开仓库中不要提交 `.env`、API Key、服务器密码、数据库账号、真实用户提交数据、真实摄像头录像、包含人脸/车牌/学生信息的测试图片，以及未授权模型或未授权数据集。

## Edge Vision Lab 发布版本

- 网站体验版：只从作品集进入 `/edge-vision-lab`，保留摄像头基本内核，用户主动开启后使用低分辨率本地预览，优先 256x192、5-8 fps，12 秒后自动停止摄像头，不跑连续检测循环、不加载 ONNX、不上传、不保存视频或图片，反馈改为邮箱。为降低手机端卡顿，页面移除了大面积 `backdrop-blur`、强模糊光效和 canvas 像素绘制。
- GitHub 本地运行版：文档和抽取结构位于 `edge-vision-lab/`，包含 `README.md`、`privacy-note.md`、`safety-boundary.md`、`public-release-checklist.md`、`AGENTS.md` 和独立 `.gitignore`，后续承载完整 ONNX / YOLO 本地运行版本。

## 部署到 Vercel

1. 推送到 GitHub。
2. 在 Vercel 新建项目并导入仓库。
3. Framework Preset 选择 `Next.js`。
4. Build Command 使用 `npm run build`。
5. Output Directory 保持 Vercel 默认即可。
6. 在 Vercel Domains 中绑定 `www.utmaxs.com`。

## 部署到 Ubuntu + Nginx

服务器已有 Nginx 和 Node.js 时，推荐部署静态导出目录，不需要 PM2。

```bash
sudo apt update
sudo apt install -y git nginx
git clone TODO_REPLACE_WITH_YOUR_GITHUB_REPO_URL /var/www/utmaxs
cd /var/www/utmaxs
npm install
npm run build
sudo cp deploy/nginx-utmaxs.conf /etc/nginx/sites-available/utmaxs
sudo ln -sfn /etc/nginx/sites-available/utmaxs /etc/nginx/sites-enabled/utmaxs
sudo nginx -t
sudo systemctl reload nginx
```

域名 `www.utmaxs.com` 需要把 DNS A 记录指向服务器公网 IP。

也可以直接上传本地压缩包，详细步骤见 [DEPLOYMENT.md](./DEPLOYMENT.md)。

## 还需要你补充

- GitHub 仓库地址
- Bilibili 主页地址：https://space.bilibili.com/614708521/lists
- GitHub 仓库地址：https://github.com/Lori-Programmer/Industrial-Agent-Lab
- 邮箱：machinelori82@gmail.com
- 微信：vx-Carloslyq
- 服务器公网 IP
- SSH 登录方式：用户名、端口、密钥或临时密码
- 域名 DNS 是否已经指向服务器
- 是否需要 HTTPS 证书，推荐使用 Certbot
