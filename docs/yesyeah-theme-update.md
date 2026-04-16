# YesYeah 主题版更新说明

这套改造分成两部分：

1. `landing/` 独立构建后发布到 `/var/www/yesyeah-landing`
2. 控制台换肤保留在 `yesyeah-theme` 分支，并从该分支构建自定义镜像

这样做的目的，是把“首页 landing”和“控制台主题”都从官方默认产物里拆出来，避免后续升级时被直接覆盖。

如果后续要走 fork 自动同步方案，补充说明见 [yesyeah-fork-automation.md](/Users/a/Documents/api中转/sub2api/docs/yesyeah-fork-automation.md)。

## 哪些内容不会被覆盖

- `/var/www/yesyeah-landing` 下的首页静态文件
- Nginx 对 `/`、`/landing-assets/*`、`/login`、`/dashboard`、`/admin/*` 的分流配置

只要不主动删除这些文件或改回 Nginx 配置，单纯更新 Sub2API 容器不会覆盖 landing。

## 哪些内容可能被覆盖

- `frontend/` 下的控制台换肤源码
- 如果直接切回官方镜像 `weishaw/sub2api:latest`，控制台会恢复默认 UI

所以后续升级不能只做 `docker compose pull`，而是要继续从 `yesyeah-theme` 分支重建。

## 推荐升级流程

```bash
cd /opt/sub2api
git checkout yesyeah-theme
git fetch origin
git merge origin/main

./deploy/build_yesyeah_theme_image.sh

cd /opt/sub2api-deploy
docker compose -f docker-compose.local.yml up -d --build sub2api
```

## 如果合并上游时出现冲突

- 优先保留 `landing/` 目录
- 优先保留 `frontend/` 中 YesYeah 品牌色、Logo、标题和布局样式相关改动
- 合并完成后，必须重新执行一次镜像构建与页面回归验证

## 最低回归检查

```bash
curl -I https://api.yesyeah.xyz/
curl -I https://api.yesyeah.xyz/login
curl -I https://api.yesyeah.xyz/landing-assets/index-Ci8CtHED.css
```

如果首页正常、登录页正常、静态资源返回 `200`，说明 landing 分流和控制台入口仍然可用。
