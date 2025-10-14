#!/usr/bin/env bash
set -euo pipefail

if [ ! -f ./.env ]; then
  echo ".env file not found! Please create one with the necessary variables."
  exit 1
fi

echo "Loading environment variables from .env file..."
source ./.env

echo "Environment variables loaded:"
echo $SSH_HOST_IP
echo $SSH_USER
echo $SSH_KEY_PATH

# ==== CONFIG ====
SSH_HOST="${SSH_HOST_IP}"
SSH_USER="${SSH_USER}"
SSH_KEY="${SSH_KEY_PATH}"

REMOTE_BASE_DIR="/home/${SSH_USER}/web"
LOCAL_APP_DIR="$(pwd)"

chmod 400 "${SSH_KEY}" 2>/dev/null || true


# ==== SYNC CODE (rsync) ====
echo "==> Rsync code to ${SSH_USER}@${SSH_HOST}:${REMOTE_BASE_DIR}"
rsync -az --delete \
  --exclude ".git" \
  --exclude "node_modules" \
  --exclude ".DS_Store" \
  --exclude "secrets" \
  -e "ssh -i ${SSH_KEY}" \
  "${LOCAL_APP_DIR}/" "${SSH_USER}@${SSH_HOST}:${REMOTE_BASE_DIR}/"

# ==== REMOTE BUILD & RUN ====
echo "==> Build & up on server"
ssh -i "${SSH_KEY}" "${SSH_USER}@${SSH_HOST}" bash <<'EOF'
  set -euo pipefail
  APP_DIR="$HOME/web"

  mkdir -p "$APP_DIR"
  cd "$APP_DIR"

  echo "---- docker-compose.yml ----"
  sed -n '1,160p' docker-compose.yml || true
  echo "----------------------------"

  # Build/Up
  docker compose build --pull
  docker compose up -d --remove-orphans

  echo "==> Containers"
  docker compose ps

  echo "==> Health check"
  docker compose exec -T web sh -lc 'netstat -tln | grep :3000 || true'
EOF

echo "✅ Deploy success! http://${SSH_HOST}:80/"