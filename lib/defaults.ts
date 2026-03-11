// Default site settings for Vercel deployment (when database is not available)
export const defaultSettings = {
  site_name: 'OpenClaw 101',
  site_tagline: '从零开始的 AI 助手搭建指南',
  primary_color: '#6366f1',
  accent_color: '#8b5cf6'
}

// Default resources for Vercel deployment
export const defaultResources = [
  { id: 1, title: 'OpenClaw 官方文档', description: '完整的 API 参考', url: 'https://docs.openclaw.ai', category: '官方资源', lang: '中文', source: 'OpenClaw', starred: 1 },
  { id: 2, title: 'GitHub 仓库', description: '源代码 (279k+ ⭐)', url: 'https://github.com/openclaw/openclaw', category: '官方资源', lang: 'EN', source: 'GitHub', starred: 1 },
  { id: 3, title: 'ClawHub 技能市场', description: '发现和安装 AI 技能插件', url: 'https://clawhub.com', category: '官方资源', lang: 'EN', source: 'ClawHub', starred: 1 },
  { id: 4, title: '阿里云部署教程', description: '轻量应用服务器一键部署', url: 'https://help.aliyun.com', category: '云平台部署', lang: '中文', source: '阿里云', starred: 1 },
  { id: 5, title: '腾讯云部署教程', description: 'Lighthouse 一键部署', url: 'https://cloud.tencent.com', category: '云平台部署', lang: '中文', source: '腾讯云', starred: 1 },
  { id: 6, title: 'DigitalOcean', description: '一键部署', url: 'https://www.digitalocean.com', category: '云平台部署', lang: 'EN', source: 'DigitalOcean', starred: 0 },
  { id: 7, title: '安装使用教程', description: '系统要求、安装方式对比', url: 'https://apifox.com', category: '入门部署', lang: '中文', source: 'Apifox', starred: 1 },
  { id: 8, title: '菜鸟教程', description: '从 git clone 到 pnpm build', url: 'https://www.runoob.com', category: '入门部署', lang: '中文', source: '菜鸟教程', starred: 1 },
  { id: 9, title: 'DataCamp Tutorial', description: 'WhatsApp 远程控制教程', url: 'https://www.datacamp.com', category: '入门部署', lang: 'EN', source: 'DataCamp', starred: 1 },
  { id: 10, title: 'freeCodeCamp', description: '从被动聊天到主动 Agent', url: 'https://www.freecodecamp.org', category: '入门部署', lang: 'EN', source: 'freeCodeCamp', starred: 1 },
  { id: 11, title: '飞书接入', description: '飞书机器人配置', url: 'https://www.feishu.cn', category: '平台接入', lang: '中文', source: '飞书', starred: 1 },
  { id: 12, title: '钉钉接入', description: '钉钉机器人配置', url: 'https://www.dingtalk.com', category: '平台接入', lang: '中文', source: '钉钉', starred: 1 },
  { id: 13, title: 'Telegram Bot', description: 'Bot 完整配置', url: 'https://core.telegram.org', category: '平台接入', lang: 'EN', source: 'Telegram', starred: 0 },
  { id: 14, title: 'B站教程', description: '本地部署接入四平台', url: 'https://www.bilibili.com', category: '视频教程', lang: '中文', source: 'Bilibili', starred: 1 },
  { id: 15, title: 'YouTube 教程', description: 'Full Setup Tutorial', url: 'https://www.youtube.com', category: '视频教程', lang: 'EN', source: 'YouTube', starred: 0 },
  { id: 16, title: 'IBM Think', description: '深度分析架构创新', url: 'https://www.ibm.com', category: '深度文章', lang: 'EN', source: 'IBM', starred: 0 },
  { id: 17, title: '知乎', description: '一文读懂 OpenClaw', url: 'https://zhuanlan.zhihu.com', category: '深度文章', lang: '中文', source: '知乎', starred: 0 },
  { id: 18, title: 'ClawHub 技能开发', description: '如何创建、发布和管理技能', url: 'https://docs.openclaw.ai', category: '技能开发', lang: 'EN', source: 'OpenClaw Docs', starred: 1 },
  { id: 19, title: 'Mega Cheatsheet', description: '150+ CLI 命令速查', url: 'https://moltfounders.com', category: '工具与插件', lang: 'EN', source: 'Molt Founders', starred: 0 },
  { id: 20, title: 'Forward Future', description: '25+ Use Cases', url: 'https://www.forwardfuture.ai', category: '玩法与场景', lang: 'EN', source: 'Forward Future', starred: 0 },
]

// Default pages for Vercel deployment
export const defaultPages = [
  { slug: 'day-1', lang: 'zh', title: '初识 OpenClaw' },
  { slug: 'day-2', lang: 'zh', title: '10分钟搭建助手' },
  { slug: 'day-3', lang: 'zh', title: '给助手一个灵魂' },
  { slug: 'day-4', lang: 'zh', title: '接入数字生活' },
  { slug: 'day-5', lang: 'zh', title: '解锁技能树' },
  { slug: 'day-6', lang: 'zh', title: '让助手主动工作' },
  { slug: 'day-7', lang: 'zh', title: '进阶玩法' },
]
