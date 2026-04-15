#!/usr/bin/env bash
# 本地构建镜像的快速脚本，避免在命令行反复输入构建参数。

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

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

docker build -t sub2api:latest \
    --build-arg VERSION="${VERSION}" \
    --build-arg COMMIT="${COMMIT}" \
    --build-arg DATE="${BUILD_DATE}" \
    --build-arg GOPROXY=https://goproxy.cn,direct \
    --build-arg GOSUMDB=sum.golang.google.cn \
    -f "${REPO_ROOT}/Dockerfile" \
    "${REPO_ROOT}"
