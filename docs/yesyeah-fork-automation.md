# YesYeah Fork 自动更新方案

## 目标

把更新链路改成下面这条：

`Wei-Shaw/sub2api upstream` -> `你的 fork/main` -> `你的 fork/yesyeah-theme` -> `GHCR 品牌镜像` -> `VPS 拉取镜像`

这样上游更新可以继续跟进，但 YesYeah 的 landing 和控制台 UI 不会被官方默认界面覆盖。

## 分支约定

- `main`
  - 只做 upstream 镜像同步
  - 不放 YesYeah UI 定制
- `yesyeah-theme`
  - 保留 landing、Logo、配色、文案和部署说明
  - 放 GitHub Actions 自动化文件
  - 建议设置为 fork 的默认分支

默认分支设为 `yesyeah-theme` 的原因是：GitHub 的定时 workflow 依赖默认分支，自动同步和自动构建要从这个分支稳定运行。

## 新增的自动化文件

- `.github/workflows/yesyeah-sync-upstream.yml`
  - 定时同步 upstream/main 到 fork/main
  - 自动尝试把 upstream/main 合并进 `yesyeah-theme`
  - 如遇冲突，自动创建或更新一个 GitHub Issue
- `.github/workflows/yesyeah-build-theme-image.yml`
  - 在 `yesyeah-theme` 分支变更后构建 GHCR 品牌镜像
  - 推送标签：
    - `ghcr.io/<owner>/sub2api:yesyeah-theme`
    - `ghcr.io/<owner>/sub2api:yesyeah-theme-<short_sha>`
    - `ghcr.io/<owner>/sub2api:vX.Y.Z-yesyeah-theme`（若当前提交可追溯到 upstream tag）
- `deploy/update_yesyeah_image.sh`
  - VPS 拉取新镜像、重建容器、检查健康状态
  - 更新失败时自动回滚到刚才的本地镜像标签

## GitHub 侧需要做的事

1. 创建 fork：`<your-github-user>/sub2api`
2. 把本地仓库 remotes 调整为：
   - `origin -> 你的 fork`
   - `upstream -> Wei-Shaw/sub2api`
3. 把 fork 默认分支改为 `yesyeah-theme`
4. 启用 Actions 和 Packages 权限
5. 可选地创建仓库变量：
   - `YESYEAH_UPSTREAM_REPO=Wei-Shaw/sub2api`
   - `YESYEAH_IMAGE_PLATFORMS=linux/amd64`
   - `YESYEAH_BUILD_GOPROXY=https://proxy.golang.org,direct`
   - `YESYEAH_BUILD_GOSUMDB=sum.golang.org`

这套 workflow 默认只使用 `GITHUB_TOKEN`，不要求额外配置 GHCR PAT。

如果 VPS 需要匿名拉取镜像，第一次成功推送后还要确认 GHCR 包 `sub2api` 为 public；如果暂时不公开，则在 VPS 上先执行一次 `docker login ghcr.io`。

## VPS 侧需要做的事

在 `/opt/sub2api-deploy/.env` 中加入：

```bash
SUB2API_IMAGE=ghcr.io/<fork-owner>/sub2api:yesyeah-theme
```

然后以后更新就只需要：

```bash
cd /opt/sub2api-deploy
/opt/sub2api/deploy/update_yesyeah_image.sh
```

## 推荐的“默默更新”方式

先观察 1 到 2 次人工更新稳定后，再加定时任务：

```bash
15 4 * * * /opt/sub2api/deploy/update_yesyeah_image.sh >> /var/log/sub2api-update.log 2>&1
```

这时的实际效果会是：

- GitHub Actions 夜间同步 upstream
- 无冲突时自动构建新的 `yesyeah-theme` 镜像（默认只产出 VPS 需要的 `linux/amd64`）
- VPS 凌晨定时拉取新镜像并做健康检查
- landing 保持在宿主机目录，不会被容器覆盖

## 人工兜底

如果自动合并失败：

1. 到 fork 的 `yesyeah-theme` 分支处理冲突
2. push 修复后的 `yesyeah-theme`
3. 等待 `YesYeah Build Theme Image` 重新产出镜像
4. 在 VPS 运行一次 `update_yesyeah_image.sh`
