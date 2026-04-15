#!/usr/bin/env bash

set -euo pipefail

DEPLOY_DIR="${DEPLOY_DIR:-/opt/sub2api-deploy}"
COMPOSE_FILE="${COMPOSE_FILE:-${DEPLOY_DIR}/docker-compose.local.yml}"
SERVICE_NAME="${SERVICE_NAME:-sub2api}"
LOCAL_HEALTH_URL="${LOCAL_HEALTH_URL:-http://127.0.0.1:8080/health}"
PUBLIC_ROOT_URL="${PUBLIC_ROOT_URL:-https://api.yesyeah.xyz/}"
PUBLIC_LOGIN_URL="${PUBLIC_LOGIN_URL:-https://api.yesyeah.xyz/login}"
WAIT_SECONDS="${WAIT_SECONDS:-180}"

if [[ -f "${DEPLOY_DIR}/.env" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "${DEPLOY_DIR}/.env"
  set +a
fi

if [[ -z "${SUB2API_IMAGE:-}" ]]; then
  echo "SUB2API_IMAGE is not set. Define it in ${DEPLOY_DIR}/.env before running this script."
  exit 1
fi

PREVIOUS_IMAGE_ID="$(docker inspect --format '{{.Image}}' "${SERVICE_NAME}" 2>/dev/null || true)"
ROLLBACK_TAG=""

if [[ -n "${PREVIOUS_IMAGE_ID}" ]]; then
  ROLLBACK_TAG="sub2api:rollback-$(date +%Y%m%d-%H%M%S)"
  docker image tag "${PREVIOUS_IMAGE_ID}" "${ROLLBACK_TAG}"
  echo "Saved rollback image as ${ROLLBACK_TAG}"
fi

echo "Pulling ${SUB2API_IMAGE}"
docker compose -f "${COMPOSE_FILE}" pull "${SERVICE_NAME}"

echo "Recreating ${SERVICE_NAME}"
docker compose -f "${COMPOSE_FILE}" up -d "${SERVICE_NAME}"

deadline=$((SECONDS + WAIT_SECONDS))

while (( SECONDS < deadline )); do
  health_status="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "${SERVICE_NAME}" 2>/dev/null || true)"
  if [[ "${health_status}" == "healthy" || "${health_status}" == "running" ]]; then
    if curl -fsS "${LOCAL_HEALTH_URL}" >/dev/null \
      && curl -kfsS -o /dev/null "${PUBLIC_ROOT_URL}" \
      && curl -kfsS -o /dev/null "${PUBLIC_LOGIN_URL}"; then
      echo "Update succeeded with image ${SUB2API_IMAGE}"
      exit 0
    fi
  fi
  sleep 5
done

echo "Update validation failed."

if [[ -n "${ROLLBACK_TAG}" ]]; then
  echo "Rolling back to ${ROLLBACK_TAG}"
  SUB2API_IMAGE="${ROLLBACK_TAG}" docker compose -f "${COMPOSE_FILE}" up -d "${SERVICE_NAME}"
fi

exit 1
