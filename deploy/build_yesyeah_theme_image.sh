#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

IMAGE_REPO="${IMAGE_REPO:-sub2api}"
IMAGE_TAG="${IMAGE_TAG:-yesyeah-theme}"
DOCKERFILE="${DOCKERFILE:-${REPO_ROOT}/deploy/Dockerfile}"
GOPROXY="${GOPROXY:-https://goproxy.cn,direct}"
GOSUMDB="${GOSUMDB:-sum.golang.google.cn}"

docker build \
  --build-arg GOPROXY="${GOPROXY}" \
  --build-arg GOSUMDB="${GOSUMDB}" \
  -f "${DOCKERFILE}" \
  -t "${IMAGE_REPO}:${IMAGE_TAG}" \
  "${REPO_ROOT}"

printf '\nBuilt image: %s:%s\n' "${IMAGE_REPO}" "${IMAGE_TAG}"
printf 'Recommended restart command:\n'
printf '  docker compose -f /opt/sub2api-deploy/docker-compose.local.yml up -d --build sub2api\n'
