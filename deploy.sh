#!/bin/bash
set -e

REMOTE_USER="${DEPLOY_USER:-root}"
REMOTE_HOST="${DEPLOY_HOST:?Error: DEPLOY_HOST is not set}"
REMOTE_PATH="/var/www/meguhome"
NGINX_CONF_SRC="./nginx.conf"
NGINX_CONF_DEST="/etc/nginx/sites-available/meguim.com"

echo "Building..."
npm run build

echo "Uploading dist to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"
rsync -avz --delete dist/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"

echo "Uploading nginx config..."
scp "$NGINX_CONF_SRC" "$REMOTE_USER@$REMOTE_HOST:$NGINX_CONF_DEST"

echo "Reloading nginx..."
ssh "$REMOTE_USER@$REMOTE_HOST" "nginx -t && systemctl reload nginx"

echo "Deploy complete."
