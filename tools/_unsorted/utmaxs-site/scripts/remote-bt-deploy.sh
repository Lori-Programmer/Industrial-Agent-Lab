#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/var/www/utmaxs
BUILD_DIR=/tmp/utmaxs-build-$(date +%Y%m%d%H%M%S)
ARCHIVE=/tmp/utmaxs-site.tar.gz
NGINX_BIN=/www/server/nginx/sbin/nginx
NGINX_CONF=/www/server/nginx/conf/nginx.conf

echo "== versions =="
node -v
npm -v

echo "== build =="
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"
tar -xzf "$ARCHIVE" -C "$BUILD_DIR"
cd "$BUILD_DIR"
npm config set registry https://registry.npmmirror.com
npm install
npm run build

echo "== publish =="
mkdir -p "$APP_DIR"
if [ -d "$APP_DIR/out" ]; then
  mv "$APP_DIR/out" "$APP_DIR/out.bak.$(date +%Y%m%d%H%M%S)"
fi
mkdir -p "$APP_DIR/out"
cp -a "$BUILD_DIR/out/." "$APP_DIR/out/"

"$NGINX_BIN" -t -c "$NGINX_CONF"
"$NGINX_BIN" -s reload -c "$NGINX_CONF"

rm -rf "$BUILD_DIR"
rm -f "$ARCHIVE" /tmp/remote-bt-deploy.sh

echo "DEPLOY_OK"
