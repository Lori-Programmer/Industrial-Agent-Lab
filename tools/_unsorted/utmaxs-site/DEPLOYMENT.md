# 部署说明

本项目第一版是纯前端静态站点，不需要数据库、登录、支付或 PM2。

## Vercel

1. 把项目推送到 GitHub。
2. 在 Vercel 导入仓库。
3. Framework Preset 选择 `Next.js`。
4. Build Command 使用 `npm run build`。
5. 绑定域名 `www.utmaxs.com`。
6. 按 Vercel 提示添加 DNS 记录。

## Ubuntu + Nginx

服务器条件：

- Ubuntu
- Nginx 已安装
- Node.js 与 npm 已安装
- Git 可通过脚本自动安装

部署命令：

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

域名 DNS：

- `www.utmaxs.com` 添加 A 记录，指向服务器公网 IP。
- `utmaxs.com` 可添加 A 记录，指向同一服务器。

HTTPS 推荐：

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d www.utmaxs.com -d utmaxs.com
```

## 无 GitHub，直接上传压缩包

本地已可生成 `utmaxs-site.tar.gz`，也可以用下面方式部署：

```bash
scp -P 22 utmaxs-site.tar.gz ubuntu@43.143.107.200:/tmp/utmaxs-site.tar.gz
ssh -p 22 ubuntu@43.143.107.200
```

进入服务器后执行：

```bash
sudo apt update
sudo apt install -y git nginx
sudo mkdir -p /var/www/utmaxs
sudo chown -R "$USER":"$USER" /var/www/utmaxs
tar -xzf /tmp/utmaxs-site.tar.gz -C /var/www/utmaxs
cd /var/www/utmaxs
npm install
npm run build
sudo cp deploy/nginx-utmaxs.conf /etc/nginx/sites-available/utmaxs
sudo ln -sfn /etc/nginx/sites-available/utmaxs /etc/nginx/sites-enabled/utmaxs
sudo nginx -t
sudo systemctl reload nginx
```

Windows 本地也可以直接执行项目里的脚本：

```powershell
.\scripts\upload-and-deploy.ps1 -User ubuntu
```

如果服务器只允许 root 登录：

```powershell
.\scripts\upload-and-deploy.ps1 -User root
```

## 我实际帮你部署还需要

- 服务器公网 IP：`43.143.107.200`
- SSH 用户名：目前按 `ubuntu` 处理
- SSH 端口：`22`
- SSH 密钥或临时密码
- GitHub 仓库地址，或允许我在服务器上用压缩包方式上传
- `www.utmaxs.com` DNS 已确认指向 `43.143.107.200`
