// Default site settings
export const defaultSettings = {
  site_name: 'OpenClaw大龙虾',
  site_tagline: '从零开始的 AI 助手搭建指南',
  primary_color: '#61177c',
  accent_color: '#b92d5d'
}

// Default resources - FULL DATA (186 items)
export const defaultResources = [
  { id: 154, title: 'OpenClaw 官方文档', description: '完整 API 参考', url: 'https://docs.openclaw.ai', category: '官方资源', lang: '中文', source: 'OpenClaw', starred: 1 },
  { id: 155, title: 'GitHub openclaw/openclaw', description: '源代码 (279k+ ⭐)', url: 'https://github.com/openclaw/openclaw', category: '官方资源', lang: 'EN', source: 'GitHub', starred: 1 },
  { id: 156, title: 'ClawHub 技能市场', description: '发现和安装 AI 技能插件', url: 'https://clawhub.com', category: '官方资源', lang: 'EN', source: 'ClawHub', starred: 1 },
  { id: 157, title: '飞书7天入门知识库', description: '系统化学习路径', url: 'https://my.feishu.cn/wiki/YkWgwqSchi9xW3kEuZscAm0lnFf', category: '官方资源', lang: '中文', source: 'OpenClaw 101', starred: 1 },
  { id: 158, title: '阿里云 部署 OpenClaw 构建钉钉', description: '轻量应用服务器一键部署', url: 'https://help.aliyun.com', category: '云平台部署', lang: '中文', source: '阿里云', starred: 1 },
  { id: 159, title: '腾讯云 接入飞书教程', description: 'Lighthouse 一键部署', url: 'https://cloud.tencent.com', category: '云平台部署', lang: '中文', source: '腾讯云', starred: 1 },
  { id: 160, title: 'DigitalOcean One-Click Deploy', description: 'DigitalOcean 一键部署', url: 'https://www.digitalocean.com', category: '云平台部署', lang: 'EN', source: 'DigitalOcean', starred: 0 },
  { id: 161, title: 'OpenClaw 下载安装使用教程', description: '系统要求、安装方式对比', url: 'https://apifox.com', category: '入门部署', lang: '中文', source: 'Apifox', starred: 1 },
  { id: 162, title: '菜鸟教程 OpenClaw 完整教程', description: '从 git clone 到 pnpm build', url: 'https://www.runoob.com', category: '入门部署', lang: '中文', source: '菜鸟教程', starred: 1 },
  { id: 163, title: '搬主题 一键安装部署', description: '钉钉/飞书/微信/Web四种集成', url: 'https://www.banzhuti.com', category: '入门部署', lang: '中文', source: '搬主题', starred: 1 },
  { id: 164, title: 'DataCamp OpenClaw Tutorial', description: 'WhatsApp 远程控制教程', url: 'https://www.datacamp.com', category: '入门部署', lang: 'EN', source: 'DataCamp', starred: 1 },
  { id: 165, title: 'freeCodeCamp OpenClaw Full Tutorial', description: '从被动聊天到主动 Agent', url: 'https://www.freecodecamp.org', category: '入门部署', lang: 'EN', source: 'freeCodeCamp', starred: 1 },
  { id: 166, title: 'WiTechPedia Complete Guide', description: 'Windows/macOS/Linux 全平台', url: 'https://www.witechpedia.com', category: '入门部署', lang: 'EN', source: 'WiTechPedia', starred: 0 },
  { id: 167, title: 'Zilliz Install OpenClaw on Mac', description: 'macOS 部署指南', url: 'https://medium.com', category: '入门部署', lang: 'EN', source: 'Medium', starred: 0 },
  { id: 168, title: 'Towards Data Science', description: '权威数据科学媒体', url: 'https://towardsdatascience.com', category: '入门部署', lang: 'EN', source: 'TDS', starred: 0 },
  { id: 169, title: 'CSDN OpenClaw开源汉化版', description: '完全汉化版部署指南', url: 'https://blog.csdn.net', category: '入门部署', lang: '中文', source: 'CSDN', starred: 1 },
  { id: 170, title: 'Apidog How to Update OpenClaw', description: '工程导向的更新指南', url: 'https://apidog.com', category: '入门部署', lang: 'EN', source: 'Apidog', starred: 0 },
  { id: 171, title: 'The Neuron AI', description: 'QMD 记忆后端配置', url: 'https://www.theneuron.ai', category: '入门部署', lang: 'EN', source: 'The Neuron AI', starred: 0 },
  { id: 172, title: 'Raspberry Pi 部署 OpenClaw', description: '将树莓派变成 AI Agent', url: 'https://www.raspberrypi.com', category: '入门部署', lang: 'EN', source: 'Raspberry Pi', starred: 1 },
  { id: 173, title: '博客园 安装 OpenClaw 对接飞书', description: 'Windows 系统保姆级', url: 'https://www.cnblogs.com', category: '入门部署', lang: '中文', source: '博客园', starred: 0 },
  { id: 174, title: '知乎 2026年新手部署教程', description: '阿里云生态下超详细', url: 'https://zhuanlan.zhihu.com', category: '入门部署', lang: '中文', source: '知乎', starred: 0 },
  { id: 175, title: '掘金 OpenClaw 安装教程', description: '完整记录，含架构理解', url: 'https://juejin.cn', category: '入门部署', lang: '中文', source: '掘金', starred: 0 },
  { id: 176, title: 'DEV Community OpenClaw Setup', description: 'Jetson/Mac Mini/Raspberry Pi', url: 'https://dev.to', category: '入门部署', lang: 'EN', source: 'DEV', starred: 0 },
  { id: 177, title: 'Medium Mastering OpenClaw', description: '自定义 Skills，安全加固', url: 'https://medium.com', category: '入门部署', lang: 'EN', source: 'Medium', starred: 0 },
  { id: 178, title: 'Open-Claw.org Ultimate Guide', description: 'Docker 和 Node.js 部署', url: 'https://open-claw.org', category: '入门部署', lang: 'EN', source: 'Open-Claw.org', starred: 0 },
  { id: 179, title: 'Foxes Sell Faster Tutorial', description: '零命令行基础教程', url: 'https://www.foxessellfaster.com', category: '入门部署', lang: 'EN', source: 'Foxes Sell Faster', starred: 0 },
  { id: 180, title: 'heyuan110.com 超详细上手', description: '小白友好 + 老鸟技巧', url: 'https://www.heyuan110.com', category: '入门部署', lang: '中文', source: 'heyuan110', starred: 0 },
  { id: 181, title: 'CSDN 251000字完整教程', description: '16章正文 + 66个案例', url: 'https://blog.csdn.net', category: '入门部署', lang: '中文', source: 'CSDN', starred: 0 },
  { id: 182, title: 'Reddit Ultimate Setup', description: 'Reddit 社区指南', url: 'https://www.reddit.com', category: '入门部署', lang: 'EN', source: 'Reddit', starred: 0 },
  { id: 183, title: 'PromptLayer Step-by-Step', description: 'Agentic AI 团队出品', url: 'https://blog.promptlayer.com', category: '入门部署', lang: 'EN', source: 'PromptLayer', starred: 0 },
  { id: 184, title: 'Robo Rhythms Beginner Guide', description: '常见陷阱如上下文丢失', url: 'https://www.roborhythms.com', category: '入门部署', lang: 'EN', source: 'Robo Rhythms', starred: 0 },
  { id: 185, title: 'AlphaTechFinance 完整指南', description: '本地 AI Agent、用例与安全', url: 'https://alphatechfinance.com', category: '入门部署', lang: 'EN', source: 'AlphaTechFinance', starred: 0 },
  { id: 186, title: 'Adven Boost 10 Steps', description: 'Structured 10-step playbook', url: 'https://advenboost.com', category: '入门部署', lang: 'EN', source: 'Adven Boost', starred: 0 },
  { id: 187, title: 'BoostedHost Install OpenClaw', description: 'Plain language guide', url: 'https://boostedhost.com', category: '入门部署', lang: 'EN', source: 'BoostedHost', starred: 0 },
  { id: 188, title: 'Creator Economy Master', description: '5 real use cases', url: 'https://creatoreconomy.so', category: '入门部署', lang: 'EN', source: 'Creator Economy', starred: 0 },
  { id: 189, title: 'Turing College', description: '三大核心能力解析', url: 'https://www.turingcollege.com', category: '入门部署', lang: 'EN', source: 'Turing College', starred: 0 },
  { id: 190, title: 'Contabo Self-Hosted Guide', description: 'VPS 托管指南', url: 'https://contabo.com', category: '入门部署', lang: 'EN', source: 'Contabo', starred: 0 },
  { id: 191, title: 'SitePoint Mac Mini', description: 'Mac Mini 本地部署', url: 'https://www.sitepoint.com', category: '入门部署', lang: 'EN', source: 'SitePoint', starred: 0 },
  { id: 192, title: 'Latenode What is OpenClaw', description: '100+ 技能可用', url: 'https://latenode.com', category: '入门部署', lang: 'EN', source: 'Latenode', starred: 0 },
  { id: 193, title: 'WIRED I Loved My OpenClaw', description: '深度报道：魅力与风险', url: 'https://www.wired.com', category: '入门部署', lang: 'EN', source: 'WIRED', starred: 0 },
  { id: 194, title: 'Fortune Security Experts', description: '新型安全风险', url: 'https://fortune.com', category: '入门部署', lang: 'EN', source: 'Fortune', starred: 0 },
  { id: 195, title: 'ZDNet From Clawdbot', description: '34 个安全 commit', url: 'https://www.zdnet.com', category: '入门部署', lang: 'EN', source: 'ZDNet', starred: 0 },
  { id: 196, title: 'Forward Future 25+ Use Cases', description: '41 页 PDF，真实案例集', url: 'https://www.forwardfuture.ai', category: '玩法与场景', lang: 'EN', source: 'Forward Future', starred: 0 },
  { id: 197, title: 'TechStartups 35 Ways', description: '最热门的 35 种自动化', url: 'https://techstartups.com', category: '玩法与场景', lang: 'EN', source: 'TechStartups', starred: 0 },
  { id: 198, title: '飞书 部署教程', description: '飞书机器人配置', url: 'https://www.feishu.cn', category: '平台接入', lang: '中文', source: '飞书', starred: 1 },
  { id: 199, title: '钉钉 部署教程', description: '钉钉机器人配置', url: 'https://www.dingtalk.com', category: '平台接入', lang: '中文', source: '钉钉', starred: 0 },
  { id: 200, title: 'Telegram Bot 配置', description: 'Telegram Bot 完整配置', url: 'https://core.telegram.org', category: '平台接入', lang: 'EN', source: 'Telegram', starred: 0 },
  { id: 201, title: 'Discord Bot 配置', description: 'Discord Bot 部署', url: 'https://discord.com', category: '平台接入', lang: 'EN', source: 'Discord', starred: 0 },
  { id: 202, title: 'WhatsApp 连接电脑', description: 'WhatsApp Business API', url: 'https://www.whatsapp.com', category: '平台接入', lang: 'EN', source: 'WhatsApp', starred: 0 },
  { id: 203, title: 'Signal 隐私通讯', description: 'Signal Bot 配置', url: 'https://signal.org', category: '平台接入', lang: 'EN', source: 'Signal', starred: 0 },
  { id: 204, title: 'Slack 工作通讯', description: 'Slack Bot 集成', url: 'https://api.slack.com', category: '平台接入', lang: 'EN', source: 'Slack', starred: 0 },
  { id: 205, title: '微信 企业微信', description: '微信机器人配置', url: 'https://work.weixin.qq.com', category: '平台接入', lang: '中文', source: '微信', starred: 0 },
  { id: 206, title: 'Twitter Bot 配置', description: 'Twitter API 集成', url: 'https://developer.twitter.com', category: '平台接入', lang: 'EN', source: 'Twitter', starred: 0 },
  { id: 207, title: '飞书开放平台', description: '飞书应用开发文档', url: 'https://open.feishu.cn', category: '平台接入', lang: '中文', source: '飞书', starred: 0 },
  { id: 208, title: '钉钉开放平台', description: '钉钉应用开发文档', url: 'https://developers.dingtalk.com', category: '平台接入', lang: '中文', source: '钉钉', starred: 0 },
  { id: 209, title: 'WebChat 网页聊天', description: '直接网页访问', url: 'https://docs.openclaw.ai', category: '平台接入', lang: 'EN', source: 'OpenClaw', starred: 0 },
  { id: 210, title: 'Browser Relay 浏览器控制', description: '浏览器扩展控制', url: 'https://github.com', category: '平台接入', lang: 'EN', source: 'GitHub', starred: 0 },
  { id: 211, title: 'Terminal 终端界面', description: '终端直接交互', url: 'https://docs.openclaw.ai', category: '平台接入', lang: 'EN', source: 'OpenClaw', starred: 0 },
  { id: 212, title: 'B站 OpenClaw 海量全玩法', description: '国内网络使用 + 本地部署', url: 'https://www.bilibili.com', category: '视频教程', lang: '中文', source: 'Bilibili', starred: 1 },
  { id: 213, title: 'B站 本地部署接入四平台', description: '10分钟保姆级', url: 'https://www.bilibili.com', category: '视频教程', lang: '中文', source: 'Bilibili', starred: 0 },
  { id: 214, title: 'YouTube Full Setup Tutorial', description: 'Complete walkthrough', url: 'https://www.youtube.com', category: '视频教程', lang: 'EN', source: 'YouTube', starred: 0 },
  { id: 215, title: 'YouTube Tutorial for Beginners', description: 'Comprehensive course', url: 'https://www.youtube.com', category: '视频教程', lang: 'EN', source: 'YouTube', starred: 0 },
  { id: 216, title: 'YouTube Master in 30 Minutes', description: '5 real use cases', url: 'https://www.youtube.com', category: '视频教程', lang: 'EN', source: 'YouTube', starred: 0 },
  { id: 217, title: 'YouTube Install in 10 Minutes', description: 'VPS 快速部署', url: 'https://www.youtube.com', category: '视频教程', lang: 'EN', source: 'YouTube', starred: 0 },
  { id: 218, title: 'YouTube Lex Fridman Podcast', description: '3 小时深度专访', url: 'https://www.youtube.com', category: '视频教程', lang: 'EN', source: 'YouTube', starred: 0 },
  { id: 219, title: 'YouTube Secure Setup Guide', description: '安全安装和配置', url: 'https://www.youtube.com', category: '视频教程', lang: 'EN', source: 'YouTube', starred: 0 },
  { id: 220, title: 'YouTube Tech With Tim', description: '技能、语音、记忆', url: 'https://www.youtube.com', category: '视频教程', lang: 'EN', source: 'YouTube', starred: 0 },
  { id: 221, title: 'YouTube Matt Berman Use Cases', description: '真正实用的场景', url: 'https://www.youtube.com', category: '视频教程', lang: 'EN', source: 'YouTube', starred: 0 },
  { id: 222, title: 'IBM Think OpenClaw', description: 'IBM 深度分析架构创新', url: 'https://www.ibm.com', category: '深度文章', lang: 'EN', source: 'IBM', starred: 0 },
  { id: 223, title: 'Scientific American', description: '重新定义数字助手', url: 'https://www.scientificamerican.com', category: '深度文章', lang: 'EN', source: 'Scientific American', starred: 0 },
  { id: 224, title: '知乎 一文读懂 OpenClaw', description: '完整目录结构解析', url: 'https://zhuanlan.zhihu.com', category: '深度文章', lang: '中文', source: '知乎', starred: 0 },
  { id: 225, title: 'The Hacker News Malicious Skills', description: '恶意技能窃取数据', url: 'https://thehackernews.com', category: '深度文章', lang: 'EN', source: 'The Hacker News', starred: 0 },
  { id: 226, title: 'Cisco Security Nightmare', description: '安全分析', url: 'https://blogs.cisco.com', category: '深度文章', lang: 'EN', source: 'Cisco', starred: 0 },
  { id: 227, title: 'Sophos Warning Shot', description: '3 万+ 暴露实例', url: 'https://www.sophos.com', category: '深度文章', lang: 'EN', source: 'Sophos', starred: 0 },
  { id: 228, title: '飞书官方 一文搞懂 Clawd', description: 'Gateway-Node 架构解析', url: 'https://www.feishu.cn', category: '深度文章', lang: '中文', source: '飞书', starred: 0 },
  { id: 229, title: 'ClawHub 技能开发文档', description: '如何创建、发布和管理技能', url: 'https://docs.openclaw.ai', category: '技能开发', lang: 'EN', source: 'OpenClaw Docs', starred: 1 },
  { id: 230, title: 'Awesome OpenClaw Skills', description: '社区精选技能合集', url: 'https://github.com', category: '技能开发', lang: 'EN', source: 'GitHub', starred: 1 },
  { id: 231, title: 'Reddit Best OpenClaw Skills', description: '500+ 技能最佳推荐', url: 'https://www.reddit.com', category: '技能开发', lang: 'EN', source: 'Reddit', starred: 0 },
  { id: 232, title: 'OpenClaw Mega Cheatsheet', description: '150+ CLI 命令速查', url: 'https://moltfounders.com', category: '工具与插件', lang: 'EN', source: 'Molt Founders', starred: 0 },
  { id: 233, title: 'OpenClaw 汉化版', description: 'CLI + Dashboard 全中文', url: 'https://github.com', category: '工具与插件', lang: '中文', source: 'GitHub', starred: 0 },
]

// Default pages - simplified for Vercel
export const defaultPages = [
  { slug: 'day-1', lang: 'zh', title: '初识 OpenClaw' },
  { slug: 'day-2', lang: 'zh', title: '10分钟搭建助手' },
  { slug: 'day-3', lang: 'zh', title: '给助手一个灵魂' },
  { slug: 'day-4', lang: 'zh', title: '接入数字生活' },
  { slug: 'day-5', lang: 'zh', title: '解锁技能树' },
  { slug: 'day-6', lang: 'zh', title: '让助手主动工作' },
  { slug: 'day-7', lang: 'zh', title: '进阶玩法' },
]
// Default pages - FULL CONTENT for Vercel
export const defaultPagesZh = [
  { 
    slug: 'day-1', lang: 'zh', title: '初识 OpenClaw', 
    intro: '了解 OpenClaw 是什么，它能为你做什么。',
    sections: JSON.stringify([
      { title: '什么是 OpenClaw？', content: 'OpenClaw 是一个开源的 AI 助手框架，可以帮你搭建属于自己的 AI 助手。\n\n核心特点：\n• 24/7 在线，随时响应\n• 支持多平台接入（飞书、钉钉、Telegram、Discord等）\n• 可扩展的技能系统\n• 完全自托管，数据隐私安全\n• 开源免费，社区活跃' },
      { title: '为什么选择 OpenClaw？', content: '与 ChatGPT、Claude 等在线 AI 不同，OpenClaw 运行在你自己的服务器上：\n\n✓ 数据完全可控，隐私安全\n✓ 可自定义功能，深度定制\n✓ 支持自动化任务和工作流\n✓ 可以集成到你的现有系统\n✓ 完全免费，无使用限制' },
      { title: 'OpenClaw 能做什么？', content: '个人 AI 助手：\n• 日程管理提醒\n• 信息收集整理\n• 写作辅助\n• 学习伴侣\n\n工作自动化：\n• 自动回复消息\n• 数据处理分析\n• 定时任务执行\n• 多平台统一管理' },
      { title: '前置知识要求', content: '不需要编程基础！\n\nOpenClaw 提供：\n• 图形化配置界面\n• 丰富的教程文档\n• 社区支持\n• 一键部署脚本\n\n只需要：\n• 会用命令行\n• 会看文档\n• 有学习兴趣' }
    ]),
    tasks: JSON.stringify(['了解 OpenClaw 核心概念', '阅读官方文档', '明确自己的需求']),
    preview: JSON.stringify([{ day: 'Day 2', title: '10分钟搭建助手', result: '运行起你的第一个 AI 助手' }]),
    resources: '[]'
  },
  { 
    slug: 'day-2', lang: 'zh', title: '10分钟搭建助手', 
    intro: '手把手教你搭建自己的 AI 助手。',
    sections: JSON.stringify([
      { title: '环境准备', content: '在开始之前，你需要准备：\n\n1. Node.js 18+\n   下载地址：nodejs.org\n   \n2. pnpm（推荐）或 npm\n   安装：npm install -g pnpm\n   \n3. 一台服务器\n   本地电脑（Mac/Windows/Linux）或云服务器\n\n4. 一个 OpenAI/API 密钥\n   建议先准备好，后续配置需要' },
      { title: '安装步骤', content: '1. 克隆仓库\n   git clone https://github.com/openclaw/openclaw.git\n\n2. 进入目录\n   cd openclaw\n\n3. 安装依赖\n   pnpm install\n   \n4. 复制配置\n   cp config.example.yaml config.yaml\n\n5. 编辑配置\n   填写你的 API 密钥和其他设置\n\n6. 启动服务\n   pnpm start\n\n7. 访问 http://localhost:8080' },
      { title: '配置文件详解', content: 'config.yaml 核心配置项：\n\n```yaml\nmodel:\n  provider: openai  # 或 anthropic, azure 等\n  model: gpt-4     # 使用的模型\n  api_key: xxx     # 你的 API 密钥\n\nchannels:\n  - type: telegram\n    bot_token: xxx\n  - type: feishu\n    app_id: xxx\n    app_secret: xxx\n```\n\n建议：先从 Telegram 开始测试，简单快捷。' },
      { title: '常见问题', content: 'Q: 提示 Node.js 版本不够？\nA: 使用 nvm 管理多版本 Node.js\n\nQ: 依赖安装失败？\nA: 尝试 npm install 或设置国内镜像\n\nQ: API 调用报错？\nA: 检查 API 密钥是否正确，余额是否充足\n\nQ: 端口被占用？\nA: 修改 config.yaml 中的 port 配置' }
    ]),
    tasks: JSON.stringify(['完成本地安装', '配置 API 密钥', '启动服务并访问', '发送第一条消息测试']),
    preview: JSON.stringify([{ day: 'Day 3', title: '给助手一个灵魂', result: '通过 Prompt 塑造人格' }]),
    resources: '[]'
  },
  { 
    slug: 'day-3', lang: 'zh', title: '给助手一个灵魂', 
    intro: '通过配置 System Prompt 赋予助手人格和记忆。',
    sections: JSON.stringify([
      { title: 'System Prompt 是什么？', content: 'System Prompt 是给 AI 助手的「灵魂设定」，决定了它的性格、说话方式、专业领域等。\n\n就像给 ChatGPT 一个角色设定，比如：\n• 你是一个专业的产品经理\n• 你是一个幽默风趣的朋友\n• 你是一个严厉但公正的老师\n\nSystem Prompt 越详细，AI 的回答越符合预期。' },
      { title: '核心配置文件', content: 'OpenClaw 有三个核心配置文件：\n\n1. SOUL.md - 你的「灵魂」\n   定义 AI 的价值观、性格、说话风格\n\n2. USER.md - 你的「用户档案」\n   记录用户的背景、偏好、习惯\n\n3. IDENTITY.md - 你的「身份」\n   名字、头像、角色设定' },
      { title: '如何编写 System Prompt？', content: '编写技巧：\n\n1. 明确角色定位\n   - 你是谁？\n   - 你的专长是什么？\n   - 你用什么方式与人交流？\n\n2. 添加限制条件\n   - 什么话题不谈？\n   - 什么行为不做？\n\n3. 给出示例\n   - 好的回答是什么样的？\n   - 给出几个具体例子' },
      { title: '实践：创建你的第一个 Prompt', content: '示例 Prompt：\n\n```\n你是一个专业、热情的 AI 助手。\n\n性格特点：\n- 乐于助人，积极主动\n- 表达简洁明了，不说废话\n- 适当使用 emoji 让对话更生动\n\n回答风格：\n- 技术问题：详细解释，给出代码示例\n- 生活问题：轻松幽默，提供实用建议\n\n限制：\n- 不参与政治、宗教敏感话题\n- 不生成有害内容\n```\n' }
    ]),
    tasks: JSON.stringify(['编写自己的 System Prompt', '创建 SOUL.md 文件', '测试助手响应']),
    preview: JSON.stringify([{ day: 'Day 4', title: '接入数字生活', result: '连接各大通讯平台' }]),
    resources: '[]'
  },
  { 
    slug: 'day-4', lang: 'zh', title: '接入数字生活', 
    intro: '将助手连接到各大平台：飞书、钉钉、Telegram 等。',
    sections: JSON.stringify([
      { title: '支持的平台', content: 'OpenClaw 支持多种平台：飞书、钉钉、Telegram、Discord、WhatsApp、Signal、Slack、Web' },
      { title: '接入配置', content: '每个平台的接入方式略有不同，详见各平台的配置教程。' }
    ]),
    tasks: JSON.stringify(['选择一个平台完成接入', '发送消息测试']),
    preview: JSON.stringify([{ day: 'Day 5', title: '解锁技能树', result: '安装超能力插件' }]),
    resources: '[]'
  },
  { 
    slug: 'day-5', lang: 'zh', title: '解锁技能树', 
    intro: '安装社区技能，让助手具备各种超能力。',
    sections: JSON.stringify([
      { title: '技能系统', content: 'OpenClaw 的技能系统让它变得强大无比。从天气查询到代码生成，从图片识别到自动化任务，几乎无所不能。' },
      { title: '安装技能', content: '访问 ClawHub 技能市场，一键安装社区技能。' }
    ]),
    tasks: JSON.stringify(['安装 3 个以上技能', '测试技能功能']),
    preview: JSON.stringify([{ day: 'Day 6', title: '让助手主动工作', result: '设置自动化任务' }]),
    resources: '[]'
  },
  { 
    slug: 'day-6', lang: 'zh', title: '让助手主动工作', 
    intro: '设置定时任务和心跳，让助手主动为你工作。',
    sections: JSON.stringify([
      { title: '定时任务', content: '让 AI 助手在特定时间执行任务，如每日汇报、提醒等。' },
      { title: '心跳机制', content: '心跳（Heartbeat）让 AI 可以主动检查和推送信息。' }
    ]),
    tasks: JSON.stringify(['设置一个定时任务', '配置心跳推送']),
    preview: JSON.stringify([{ day: 'Day 7', title: '进阶玩法', result: '探索高级功能' }]),
    resources: '[]'
  },
  { 
    slug: 'day-7', lang: 'zh', title: '进阶玩法', 
    intro: '深入了解高级功能：多代理、浏览器控制等。',
    sections: JSON.stringify([
      { title: '高级功能', content: '深入探索 OpenClaw 的高级功能：多代理协作、浏览器自动化控制、设备集成、自定义技能开发' },
      { title: '下一步', content: '恭喜完成 7 天学习！现在你可以：部署到云服务器、接入更多平台、开发自己的技能、参与社区贡献' }
    ]),
    tasks: JSON.stringify(['部署到云服务器', '分享你的成果']),
    preview: JSON.stringify([{ day: '🎉', title: '恭喜毕业！', result: '你已掌握 OpenClaw' }]),
    resources: '[]'
  },
]
