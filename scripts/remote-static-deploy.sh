#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/var/www/utmaxs
BUILD_DIR=/tmp/utmaxs-build-$(date +%Y%m%d%H%M%S)
ARCHIVE=/tmp/utmaxs-site.tar.gz
DOMAIN=www.utmaxs.com

echo "== versions =="
node -v
npm -v
nginx -v

echo "== build =="
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"
tar -xzf "$ARCHIVE" -C "$BUILD_DIR"
cd "$BUILD_DIR"
npm config set registry https://registry.npmmirror.com
npm install
npm run build

echo "== publish static files =="
mkdir -p "$APP_DIR"
if [ -d "$APP_DIR/out" ]; then
  mv "$APP_DIR/out" "$APP_DIR/out.bak.$(date +%Y%m%d%H%M%S)"
fi
mkdir -p "$APP_DIR/out"
cp -a "$BUILD_DIR/out/." "$APP_DIR/out/"

cp "$BUILD_DIR/deploy/nginx-utmaxs.conf" /etc/nginx/sites-available/utmaxs
ln -sfn /etc/nginx/sites-available/utmaxs /etc/nginx/sites-enabled/utmaxs
nginx -t
systemctl reload nginx || systemctl start nginx

echo "== verify =="
curl -I -H "Host: $DOMAIN" http://127.0.0.1/ | head -n 5
curl -I "http://$DOMAIN/" | head -n 5

rm -rf "$BUILD_DIR"
echo "DEPLOY_OK $DOMAIN"
