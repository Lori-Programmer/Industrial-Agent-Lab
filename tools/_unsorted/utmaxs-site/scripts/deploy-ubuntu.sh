#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/utmaxs}"
REPO_URL="${REPO_URL:-TODO_REPLACE_WITH_YOUR_GITHUB_REPO_URL}"
DOMAIN="${DOMAIN:-www.utmaxs.com}"

if [ "$REPO_URL" = "TODO_REPLACE_WITH_YOUR_GITHUB_REPO_URL" ]; then
  echo "Set REPO_URL first, for example:"
  echo "REPO_URL=https://github.com/your-name/utmaxs-industrial-intelligence.git bash scripts/deploy-ubuntu.sh"
  exit 1
fi

sudo apt update
sudo apt install -y git nginx

sudo mkdir -p "$APP_DIR"
sudo chown -R "$USER":"$USER" "$APP_DIR"

if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO_URL" "$APP_DIR"
else
  git -C "$APP_DIR" pull --ff-only
fi

cd "$APP_DIR"
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi
npm run build

sudo cp deploy/nginx-utmaxs.conf /etc/nginx/sites-available/utmaxs
sudo sed -i "s/www.utmaxs.com/$DOMAIN/g" /etc/nginx/sites-available/utmaxs
sudo ln -sfn /etc/nginx/sites-available/utmaxs /etc/nginx/sites-enabled/utmaxs
sudo nginx -t
sudo systemctl reload nginx

echo "Deployed to http://$DOMAIN"
