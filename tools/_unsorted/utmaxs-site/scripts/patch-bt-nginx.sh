#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=/var/www/utmaxs/out
VHOST_DIR=/www/server/panel/vhost/nginx
NGINX_BIN=/www/server/nginx/sbin/nginx
NGINX_CONF=/www/server/nginx/conf/nginx.conf

for name in www.utmaxs.com utmaxs.com; do
  conf="$VHOST_DIR/$name.conf"
  if [ ! -f "$conf" ]; then
    echo "missing vhost config: $conf"
    continue
  fi

  cp "$conf" "$conf.bak.$(date +%Y%m%d%H%M%S)"
  sed -i -E "s#root /www/wwwroot/[^;]+;#root $ROOT_DIR;#" "$conf"

  if ! grep -q "UTMAXS-STATIC-START" "$conf"; then
    python3 - "$conf" <<'PY'
from pathlib import Path
import sys

path = Path(sys.argv[1])
text = path.read_text()
block = """    #UTMAXS-STATIC-START
    location / {
        try_files $uri $uri/ /index.html;
    }
    #UTMAXS-STATIC-END
"""
marker = "    access_log  /www/wwwlogs/"
idx = text.find(marker)
if idx == -1:
    raise SystemExit(f"access_log marker not found in {path}")
text = text[:idx] + block + text[idx:]
path.write_text(text)
PY
  fi
done

"$NGINX_BIN" -t -c "$NGINX_CONF"
"$NGINX_BIN" -s reload -c "$NGINX_CONF"
