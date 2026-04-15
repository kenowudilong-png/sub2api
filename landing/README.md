# YesYeah Landing

独立导航页工程，面向 `api.yesyeah.xyz` 根路径。

## 本地开发

```bash
cd landing
pnpm install
pnpm dev
```

默认开发端口为 `4174`。

## 生产构建

```bash
cd landing
pnpm build
```

构建产物输出到 `landing/dist`，静态资源目录为 `landing-assets/`，用于避免和 Sub2API 控制台当前的 `/assets/*` 产物冲突。

## 内容约定

- 主入口在 `src/App.vue`
- 版块组件位于 `src/sections/`
- 可复制代码块、数字动画和滚动显隐位于 `src/components/`
- 首版文案和占位数据集中在 `src/data/content.ts`

## 部署建议

- 站点根路径 `/` 指向 landing 静态目录
- `/login`、`/dashboard`、`/admin/*`、`/assets/*` 继续交给当前 Sub2API
- API 路径 `/api/*`、`/v1/*`、`/v1beta/*`、`/responses/*`、`/antigravity/*` 保持不变
- landing 产物建议发布到容器外的 `/var/www/yesyeah-landing`，这样后续更新 Sub2API 镜像时不会把首页覆盖掉
- 控制台换肤源码建议固定保留在 `yesyeah-theme` 分支；如果要跟进上游版本，先合并到该分支，再重建品牌版镜像

分流示例见 [yesyeah-landing.nginx.conf.example](/Users/a/Documents/api中转/sub2api/deploy/yesyeah-landing.nginx.conf.example)。
更新流程说明见 [yesyeah-theme-update.md](/Users/a/Documents/api中转/sub2api/docs/yesyeah-theme-update.md)。
