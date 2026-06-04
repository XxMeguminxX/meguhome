#!/bin/bash
set -e

REMOTE_USER="${DEPLOY_USER:-root}"
REMOTE_HOST="${DEPLOY_HOST:?Error: DEPLOY_HOST is not set}"
REMOTE_PATH="/var/www/mihome"

echo "Building..."
npm run build

echo "Uploading to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"
rsync -avz --delete dist/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"

echo "Deploy complete."
