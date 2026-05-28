#!/usr/bin/env bash
set -euo pipefail

conf=/www/server/panel/vhost/nginx/utmaxs.com.conf
ts=$(date +%Y%m%d%H%M%S)
cp "$conf" "$conf.certbak.$ts"

sed -i \
  -e 's#/www/server/panel/vhost/cert/utmaxs.com/fullchain.pem#/www/server/panel/vhost/cert/www.utmaxs.com/fullchain.pem#' \
  -e 's#/www/server/panel/vhost/cert/utmaxs.com/privkey.pem#/www/server/panel/vhost/cert/www.utmaxs.com/privkey.pem#' \
  "$conf"

/www/server/nginx/sbin/nginx -t -c /www/server/nginx/conf/nginx.conf
/www/server/nginx/sbin/nginx -s reload -c /www/server/nginx/conf/nginx.conf
