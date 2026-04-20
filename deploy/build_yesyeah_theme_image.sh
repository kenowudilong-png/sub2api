#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

IMAGE_REPO="${IMAGE_REPO:-sub2api}"
IMAGE_TAG="${IMAGE_TAG:-yesyeah-theme}"
DOCKERFILE="${DOCKERFILE:-${REPO_ROOT}/deploy/Dockerfile}"
GOPROXY="${GOPROXY:-https://goproxy.cn,direct}"
GOSUMDB="${GOSUMDB:-sum.golang.google.cn}"

resolve_version() {
  local version
  version="$(git -C "${REPO_ROOT}" tag --merged HEAD --sort=-v:refname 'v*' | head -n1 || true)"
  version="${version#v}"
  if [[ -z "${version}" ]]; then
    version="$(tr -d '\r\n' < "${REPO_ROOT}/backend/cmd/server/VERSION" 2>/dev/null || true)"
  fi
  printf '%s' "${version}"
}

VERSION="${VERSION:-$(resolve_version)}"
COMMIT="${COMMIT:-$(git -C "${REPO_ROOT}" rev-parse HEAD)}"
BUILD_DATE="${BUILD_DATE:-$(date -u +%Y-%m-%dT%H:%M:%SZ)}"

docker build \
  --build-arg VERSION="${VERSION}" \
  --build-arg COMMIT="${COMMIT}" \
  --build-arg DATE="${BUILD_DATE}" \
  --build-arg GOPROXY="${GOPROXY}" \
  --build-arg GOSUMDB="${GOSUMDB}" \
  -f "${DOCKERFILE}" \
  -t "${IMAGE_REPO}:${IMAGE_TAG}" \
  "${REPO_ROOT}"

printf '\nBuilt image: %s:%s\n' "${IMAGE_REPO}" "${IMAGE_TAG}"
if [[ -n "${VERSION}" ]]; then
  printf 'Embedded version: %s\n' "${VERSION}"
fi
printf 'Recommended restart command:\n'
printf '  docker compose -f /opt/sub2api-deploy/docker-compose.local.yml up -d sub2api\n'
