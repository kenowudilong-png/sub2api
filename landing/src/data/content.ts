export type NavLink = {
  label: string
  href: string
}

export type HeroMetric = {
  value: number
  suffix?: string
  label: string
  detail: string
}

export type FeatureItem = {
  id: string
  symbol: string
  title: string
  description: string
  bullet: string
}

export type QuotaMonitorSignal = {
  value: string
  label: string
  detail: string
}

export type QuotaMonitorCapability = {
  capability: string
  current: string
  withMonitor: string
}

export type QuotaMonitorStep = {
  id: string
  title: string
  detail: string
}

export type QuotaMonitorContent = {
  eyebrow: string
  title: string
  summary: string
  positioning: string
  ctaLabel: string
  ctaHref: string
  note: string
  signals: QuotaMonitorSignal[]
  capabilities: QuotaMonitorCapability[]
  deploymentSteps: QuotaMonitorStep[]
  initChecklist: string[]
  securityRules: string[]
  launchChecklist: string[]
}

export type ToolItem = {
  name: string
  tag: string
  summary: string
  setupLabel: string
  snippet: string
  note: string
}

export type PricingRow = {
  model: string
  route: string
  multiplier: string
  input: string
  output: string
  official: string
  note: string
}

export type PlanTier = {
  name: string
  accent: string
  badge?: string
  price: string
  description: string
  bullets: string[]
  ctaLabel: string
  ctaHref: string
}

export type FooterGroup = {
  title: string
  links: Array<{ label: string; href: string }>
}

export const navLinks: NavLink[] = [
  { label: '首页', href: '#hero' },
  { label: '为什么选我们', href: '#features' },
  { label: '余额监控', href: '#quota-monitor' },
  { label: '快速接入', href: '#tools' },
  { label: '模型与计费', href: '#pricing' },
  { label: '方案与定价', href: '#plans' }
]

export const heroMetrics: HeroMetric[] = [
  {
    value: 5,
    suffix: '+',
    label: '可用模型族',
    detail: 'Claude · GPT · Codex · Gemini · DeepSeek'
  },
  {
    value: 3,
    label: '协议入口',
    detail: 'Anthropic · OpenAI Compatible · Gemini'
  },
  {
    value: 24,
    suffix: '/7',
    label: '余额监控',
    detail: '统一面板、自动签到、趋势告警'
  }
]

export const features: FeatureItem[] = [
  {
    id: '01',
    symbol: '⚡',
    title: '一个入口，所有工具',
    description: 'Claude Code、Codex、Gemini CLI、Cursor、Windsurf——全部指向 api.yesyeah.xyz，一条环境变量搞定。',
    bullet: '团队 onboarding 只需要发一份模板，不再逐个工具讲配置。'
  },
  {
    id: '02',
    symbol: '💰',
    title: '费用透明，每笔可查',
    description: '每一次调用都有记录——模型、token 数、耗时、成本。控制台里一目了然，不再靠口头对账。',
    bullet: '适合团队预算管理、报销归因和对外结算场景。'
  },
  {
    id: '03',
    symbol: '🎯',
    title: '计费与官方对齐',
    description: '倍率体系跟随官方定价口径，输入、输出、缓存分开计量，价格变动有据可查。',
    bullet: '不做隐性加价，不搞虚拟币混淆，充多少用多少。'
  },
  {
    id: '04',
    symbol: '🛠️',
    title: '只做开发者需要的功能',
    description: '集中资源在编码场景的模型接入与链路稳定上，不把精力浪费在用不到的功能上。',
    bullet: '多上游智能调度 + 失败自动切换 + 粘性会话，把预算花在刀刃上。'
  }
]

export const quotaMonitorContent: QuotaMonitorContent = {
  eyebrow: 'Quota Monitor 专题',
  title: '在 Sub2API 旁边挂一块余额面板，不改主链路也能把监控补齐',
  summary:
    '这不是替换网关，而是给现有运营链路补一层运维视角：统一余额、自动签到、趋势图和异常告警都交给旁挂的 Quota Monitor，Sub2API 继续负责路由、计费和 API 接入。',
  positioning:
    '适合已经跑通 `api.yesyeah.xyz`、不想动现网网关、但又需要管理员集中查看渠道状态和额度波动的场景。第一版只承接内容与运行手册，部署动作仍按独立执行链推进。',
  ctaLabel: '打开监控面板',
  ctaHref: 'https://monitor.yesyeah.xyz',
  note: '监控面板是运维入口，不替代现有 Sub2API 控制台与 API 网关。',
  signals: [
    {
      value: '01',
      label: '统一余额面板',
      detail: '把 AI 派、Dragon Code、DawCode 等渠道余额集中到一个入口里'
    },
    {
      value: '24/7',
      label: '自动刷新与签到',
      detail: '定时刷新状态、自动签到领取额度，减少人工巡检和重复登录'
    },
    {
      value: '6h-90d',
      label: '趋势与告警',
      detail: '支持余额趋势、异常波动和 Telegram 推送，方便运营排查'
    }
  ],
  capabilities: [
    {
      capability: '余额查询',
      current: '分别登录每家站点查看，口径分散',
      withMonitor: '统一面板刷新全部渠道，余额状态集中展示'
    },
    {
      capability: '自动签到',
      current: '无自动化，靠人工处理',
      withMonitor: '定时签到、记录奖励历史，适合日常巡检'
    },
    {
      capability: '余额趋势',
      current: '没有统一沉淀，只能凭感觉回忆',
      withMonitor: '按 6h / 24h / 7d / 30d / 90d 查看波动趋势'
    },
    {
      capability: '异常告警',
      current: '问题发生后才被动发现',
      withMonitor: '余额刷新、消耗异常、签到简报统一进入告警通道'
    }
  ],
  deploymentSteps: [
    {
      id: '01',
      title: '保留现有 Sub2API 路由',
      detail: '现有 `api.yesyeah.xyz`、用户 API Key、计费和分组配置全部保持原样。'
    },
    {
      id: '02',
      title: '新增 PostgreSQL + Quota Monitor',
      detail: '旁挂的 Monitor 只需要自己的数据存储和 providers 信息，不改网关主链路。'
    },
    {
      id: '03',
      title: '录入渠道与类型定义',
      detail: '按 NewAPI / Sub2API / AnyRouter 口径补 providers、认证信息和刷新策略。'
    },
    {
      id: '04',
      title: '打开自动刷新、签到与 Telegram',
      detail: '把日常运维动作收敛到固定流程，避免人工漏看余额或错过异常。'
    }
  ],
  initChecklist: [
    '创建 `monitor.yesyeah.xyz` 子域，规划反代到 `127.0.0.1:23010`',
    '准备 `postgres:16-alpine`、可选 `redis:7-alpine` 与 `quota-monitor` 容器',
    '用占位符形式维护 `.env`：数据库密码、面板管理员密码、providers 凭据',
    '启动后先确认 Web UI 是否支持手工添加端点，再决定是否直接写 `providers` 表',
    '为每个渠道补充认证信息，并验证刷新状态是否返回 `ok`'
  ],
  securityRules: [
    '保持“旁挂、不替换”，不要把 Quota Monitor 误接入现有 API 网关主链路',
    '所有 API Key、Cookie、JWT、数据库密码都只写占位符，不进仓库、不进公开日志',
    'Monitor 只暴露管理面板，不暴露上游渠道私密接口与内部凭据',
    '如果需要 Telegram 推送，先确认 bot token、chat_id 的存储位置和权限边界'
  ],
  launchChecklist: [
    '确认 `monitor.yesyeah.xyz` 能打开登录页，但不以线上可达作为本轮内容开发阻塞',
    '确认专题中已说明“Sub2API 继续负责路由与计费，Monitor 只做监控”',
    '确认部署摘要、初始化清单、安全红线、上线检查项都在 landing 中可见',
    '确认完整运行手册已写入 `sub2api/docs`，且未包含任何真实敏感信息'
  ]
}

export const tools: ToolItem[] = [
  {
    name: 'Claude Code',
    tag: 'Anthropic 协议入口',
    summary: '走 Anthropic 原生协议，适合命令行式编码、长上下文协作与 Agent 模式。',
    setupLabel: '环境变量配置',
    snippet:
      'export ANTHROPIC_BASE_URL="https://api.yesyeah.xyz/anthropic"\nexport ANTHROPIC_AUTH_TOKEN="sk-你的YesYeah-Key"\nclaude',
    note: '进入 Claude Code 后，模型由控制台侧配置的路由策略自动选择。'
  },
  {
    name: 'Codex',
    tag: 'OpenAI 兼容入口',
    summary: '走 OpenAI Compatible 入口，适合 CLI、脚本与 SDK 场景。',
    setupLabel: '环境变量配置',
    snippet:
      'export OPENAI_BASE_URL="https://api.yesyeah.xyz/v1"\nexport OPENAI_API_KEY="sk-你的YesYeah-Key"\ncodex',
    note: '同一把 Key 在 Codex 和其他 OpenAI 兼容工具间通用，无需重复配置。'
  },
  {
    name: 'Gemini CLI',
    tag: 'Gemini 协议入口',
    summary: '保留 Gemini 独立协议入口，切换时无需手工改写配置。',
    setupLabel: '环境变量配置',
    snippet:
      'export GEMINI_API_KEY="sk-你的YesYeah-Key"\nexport API_BASE="https://api.yesyeah.xyz/v1beta"\ngemini',
    note: 'Gemini 协议入口已经兼容常见 CLI 接入方式，无需额外配置。'
  },
  {
    name: 'Cursor / Windsurf',
    tag: 'IDE 设置面板',
    summary: 'IDE 统一走 OpenAI Compatible 配置，方便团队沉淀成统一接入文档。',
    setupLabel: 'IDE 设置面板填写',
    snippet:
      'Endpoint: https://api.yesyeah.xyz/v1\nProtocol: OpenAI Compatible\nAPI Key: sk-你的YesYeah-Key',
    note: 'Cursor Settings -> Models -> Override OpenAI Base URL 中填入上方 Endpoint 即可。'
  }
]

export const pricingRows: PricingRow[] = [
  {
    model: 'Claude Opus 4.6 / Sonnet 4.6',
    route: 'Anthropic',
    multiplier: '1.0x',
    input: '跟随官方输入价',
    output: '跟随官方输出价',
    official: '低至官方 15%–30%',
    note: '编码主力通道，适合 Claude Code 高频调用'
  },
  {
    model: 'GPT-4o / GPT-4.1 / Codex',
    route: 'OpenAI Compatible',
    multiplier: '1.0x',
    input: '按模型族维护',
    output: '按模型族维护',
    official: '按实际上游成本定价',
    note: '统一 OpenAI 兼容入口，Codex / Cursor / SDK 通用'
  },
  {
    model: 'Gemini 2.5 Pro / Flash',
    route: 'Gemini',
    multiplier: '1.0x',
    input: '跟随官方输入价',
    output: '跟随官方输出价',
    official: '按实际上游成本定价',
    note: '适合补充推理、长文档和辅助检索'
  },
  {
    model: '团队 / 企业专属路由',
    route: 'Custom Group',
    multiplier: '0.7x–0.85x',
    input: '按团队协议维护',
    output: '按团队协议维护',
    official: '后台公告为准',
    note: '适合包月、代理分销或定制额度方案'
  }
]

export const planTiers: PlanTier[] = [
  {
    name: '按量付费',
    accent: 'slate',
    price: '灵活充值 · 用多少算多少',
    description: '先把入口跑通、把常用模型试一遍，再根据真实调用习惯决定要不要升级。',
    bullets: ['适合个人开发者和轻度使用', '按实际 token 消耗计费', '完整控制台 + 调用日志 + 用量看板'],
    ctaLabel: '立即充值',
    ctaHref: '/login'
  },
  {
    name: '开发者 / 团队',
    accent: 'ember',
    badge: '最受欢迎',
    price: '¥59–399/月 · 包月额度',
    description: '为日常重度编码和多人协作准备更稳定的线路、更低的单价和统一的 IDE/CLI 接入模板。',
    bullets: ['包月额度，单价更低', 'quality-first 路由，满分渠道优先', '团队统一管理 Key、倍率与预算'],
    ctaLabel: '查看详情',
    ctaHref: '#tools'
  },
  {
    name: '企业定制',
    accent: 'steel',
    price: '按场景报价',
    description: '当你需要专属分组、定制路由策略、或更高的 RPM 上限时，单独定制一份交付方案。',
    bullets: ['专属渠道分组与 SLA 保障', '自定义倍率、额度与并发上限', '可对接内部系统、状态页与账单 API'],
    ctaLabel: '合作咨询',
    ctaHref: '#footer'
  }
]

export const footerGroups: FooterGroup[] = [
  {
    title: '页面导航',
    links: [
      { label: '为什么选我们', href: '#features' },
      { label: '余额监控', href: '#quota-monitor' },
      { label: '快速接入', href: '#tools' },
      { label: '模型与计费', href: '#pricing' }
    ]
  },
  {
    title: '控制台',
    links: [
      { label: '用户登录', href: '/login' },
      { label: '控制台首页', href: '/dashboard' },
      { label: '管理后台', href: '/admin' }
    ]
  },
  {
    title: '更多',
    links: [
      { label: '方案与定价', href: '#plans' },
      { label: '监控面板', href: 'https://monitor.yesyeah.xyz' },
      { label: '返回顶部', href: '#hero' }
    ]
  }
]
