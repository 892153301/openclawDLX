const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'openclaw101.db');
const db = new Database(dbPath);

// 资源数据 - 来自原站抓取
const resources = [
  // 官方资源
  { title: 'OpenClaw 官方文档', description: '完整的 API 参考、配置指南和架构说明', url: 'https://docs.openclaw.ai', category: '官方资源', lang: 'EN', source: 'OpenClaw' },
  { title: 'GitHub — openclaw/openclaw', description: '源代码、Issue 跟踪和社区贡献指南 (279k+ ⭐)', url: 'https://github.com/openclaw/openclaw', category: '官方资源', lang: 'EN', source: 'GitHub' },
  { title: 'ClawHub 技能市场', description: '发现、安装和分享 AI 技能插件', url: 'https://clawhub.com', category: '官方资源', lang: 'EN', source: 'ClawHub' },
  { title: 'OpenClaw 官方文档', description: '完整的 API 参考、配置指南和架构说明', url: 'https://docs.openclaw.ai', category: '官方资源', lang: '中文', source: 'OpenClaw' },
  
  // 云平台部署
  { title: '阿里云 — 部署 OpenClaw 构建钉钉 AI 助理', description: '轻量应用服务器一键部署，可视化配置面板接入钉钉', url: 'https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw', category: '云平台部署', lang: '中文', source: '阿里云' },
  { title: '腾讯云 — OpenClaw 接入飞书保姆级教程', description: 'Lighthouse 一键部署 + 飞书机器人全流程配置', url: 'https://cloud.tencent.com/developer/article/2625073', category: '云平台部署', lang: '中文', source: '腾讯云' },
  { title: 'DigitalOcean — One-Click Deploy OpenClaw', description: 'Learn how to deploy OpenClaw using DigitalOceans 1-Click solution', url: 'https://www.digitalocean.com/community/tutorials/how-to-run-openclaw', category: '云平台部署', lang: 'EN', source: 'DigitalOcean' },
  { title: 'AWS 中国博客 — 基于 Mac 实例部署 OpenClaw', description: '亚马逊云科技 Mac 实例部署指南，深度苹果生态自动化', url: 'https://aws.amazon.com/cn/blogs/china/openclaw-deployment-aws-mac/', category: '云平台部署', lang: '中文', source: 'AWS' },
  
  // 入门部署
  { title: '⭐OpenClaw 下载安装使用 — 详细图文教程', description: '系统要求、多种安装方式对比、常见问题排查、Web/终端两种界面入门', url: 'https://apifox.com/apiskills/openclaw-installation-and-usage-guide/', category: '入门部署', lang: '中文', source: 'Apifox' },
  { title: '⭐菜鸟教程 — OpenClaw (Clawdbot) 完整教程', description: '从 git clone 到 pnpm build，含 onboard 和 gateway:watch 开发模式', url: 'https://www.runoob.com/ai-agent/openclaw-clawdbot-tutorial.html', category: '入门部署', lang: '中文', source: '菜鸟教程' },
  { title: '⭐搬主题 — 一键安装部署超详细图文教程', description: '含钉钉/飞书/微信/Web 四种集成方法，国内用户首选参考', url: 'https://www.banzhuti.com/openclaw-moltbot-clawdbot-tutorial.html', category: '入门部署', lang: '中文', source: '搬主题' },
  { title: '⭐DataCamp — OpenClaw Tutorial: Control Your PC from WhatsApp', description: 'WhatsApp 远程控制电脑实操教程，涵盖 Skill 开发与 AgentSkills 标准', url: 'https://www.datacamp.com/tutorial/moltbot-clawdbot-tutorial', category: '入门部署', lang: 'EN', source: 'DataCamp' },
  { title: '⭐freeCodeCamp — OpenClaw Full Tutorial for Beginners', description: '从被动聊天到主动 Agent 的转变，freeCodeCamp 出品的全面入门教程', url: 'https://www.freecodecamp.org/news/openclaw-full-tutorial-for-beginners/', category: '入门部署', lang: 'EN', source: 'freeCodeCamp' },
  { title: '⭐WiTechPedia — How to Install OpenClaw: Complete Step-by-Step Guide', description: 'Windows/macOS/Linux 全平台安装指南，含 npm 配置、API 设置、消息平台集成', url: 'https://www.witechpedia.com/guide/how-to-install-openclaw/', category: '入门部署', lang: 'EN', source: 'WiTechPedia' },
  { title: '⭐Zilliz — How to Install and Run OpenClaw on Mac', description: '最新 macOS 部署指南：从 Node.js 安装到 onboard 向导全流程', url: 'https://medium.com/@zilliz_learn/how-to-install-and-run-openclaw-previously-clawdbot-moltbot-on-mac-9cb6adb64eef', category: '入门部署', lang: 'EN', source: 'Medium' },
  { title: '⭐Towards Data Science — Use OpenClaw to Make a Personal AI Assistant', description: '权威数据科学媒体出品：OpenClaw 个人 AI 助手搭建完整指南', url: 'https://towardsdatascience.com/use-openclaw-to-make-a-personal-ai-assistant/', category: '入门部署', lang: 'EN', source: 'Towards Data Science' },
  { title: '⭐CSDN — OpenClaw开源汉化发行版', description: '完全汉化版 OpenClaw 部署指南，含阿里云/腾讯云/天翼云一键部署方法', url: 'https://blog.csdn.net/qq_44866828/article/details/157876493', category: '入门部署', lang: '中文', source: 'CSDN' },
  { title: '⭐Apidog — How to Update OpenClaw to Latest Version', description: '工程导向的 OpenClaw 更新指南：Docker/systemd/compose 安全更新', url: 'https://apidog.com/blog/update-openclaw/', category: '入门部署', lang: 'EN', source: 'Apidog' },
  { title: '⭐The Neuron AI — OpenClaw 设置指南', description: 'QMD 记忆后端配置、多 Agent 团队架构、新手 + 进阶用户指南', url: 'https://www.theneuron.ai/explainer-articles/openclaw-personal-ai-agent-setup-guide-an-use-cases-february-2026/', category: '入门部署', lang: 'EN', source: 'The Neuron AI' },
  { title: '⭐Raspberry Pi — 在树莓派上部署 OpenClaw', description: '官方博客教程：将树莓派变成 AI Agent 硬件', url: 'https://www.raspberrypi.com/news/turn-your-raspberry-pi-into-an-ai-agent-with-openclaw/', category: '入门部署', lang: 'EN', source: 'Raspberry Pi' },
  
  // 视频教程
  { title: 'B站 — OpenClaw 海量全玩法攻略', description: '国内网络使用 + 本地部署', url: 'https://www.bilibili.com/video/BV1kH6nBFEPq/', category: '视频教程', lang: '中文', source: 'Bilibili' },
  { title: 'B站 — 本地部署接入微信/飞书/钉钉/QQ 10分钟保姆级教程', description: '10分钟手把手教会，附完整操作文档，四大平台全覆盖', url: 'https://www.bilibili.com/video/BV1MfFAz6EnR/', category: '视频教程', lang: '中文', source: 'Bilibili' },
  { title: 'YouTube — Full OpenClaw Setup Tutorial', description: 'Complete video walkthrough for installing and configuring OpenClaw AI assistant', url: 'https://www.youtube.com/watch?v=fcZMmP5dsl4', category: '视频教程', lang: 'EN', source: 'YouTube' },
  { title: 'YouTube — OpenClaw Full Tutorial for Beginners', description: 'Comprehensive beginner course covering installation, configuration, and automation tasks', url: 'https://www.youtube.com/watch?v=n1sfrc-RjyM', category: '视频教程', lang: 'EN', source: 'YouTube' },
  { title: 'YouTube — Master OpenClaw in 30 Minutes (Peter Yang)', description: 'Calendar, documents, personalized briefings, voice reply, and memory management', url: 'https://www.youtube.com/watch?v=ji_Sd4si7jo', category: '视频教程', lang: 'EN', source: 'YouTube' },
  { title: 'YouTube — Install OpenClaw in 10 Minutes', description: 'VPS 快速部署教程，修复所有常见错误的完整指南', url: 'https://www.youtube.com/watch?v=khTA_AfJ01Y', category: '视频教程', lang: 'EN', source: 'YouTube' },
  
  // 深度文章
  { title: 'IBM Think — OpenClaw: The Viral "Space Lobster" Agent', description: 'IBM 深度分析 OpenClaw 的架构创新和垂直集成策略', url: 'https://www.ibm.com/think/news/clawdbot-ai-agent-testing-limits-vertical-integration', category: '深度文章', lang: 'EN', source: 'IBM' },
  { title: 'Scientific American — OpenClaw is an open-source AI agent', description: 'This open-source agent installs software, makes calls and runs your digital life', url: 'https://www.scientificamerican.com/article/moltbot-is-an-open-source-ai-agent-that-runs-your-computer/', category: '深度文章', lang: 'EN', source: 'Scientific American' },
  { title: '知乎 — 一文读懂 OpenClaw 分析与教程', description: '完整目录结构解析：AGENTS.md / SOUL.md / MEMORY.md / Skills 全拆解', url: 'https://zhuanlan.zhihu.com/p/2000850539936765122', category: '深度文章', lang: '中文', source: '知乎' },
  { title: 'The Hacker News — 341 个恶意 ClawHub 技能窃取用户数据', description: 'Koi Security 审计发现 ClawHavoc 供应链攻击', url: 'https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html', category: '深度文章', lang: 'EN', source: 'The Hacker News' },
  { title: 'Cisco Blogs — Personal AI Agents like OpenClaw Are a Security Nightmare', description: 'Security analysis of open-source personal AI agents', url: 'https://blogs.cisco.com/ai/personal-ai-agents-like-openclaw-are-a-security-nightmare', category: '深度文章', lang: 'EN', source: 'Cisco' },
  { title: 'Sophos — The OpenClaw Experiment Is a Warning Shot', description: '3 万+ 暴露实例，威胁者已在讨论如何武器化 Skills', url: 'https://www.sophos.com/en-us/blog/the-openclaw-experiment-is-a-warning-shot-for-enterprise-ai-security', category: '深度文章', lang: 'EN', source: 'Sophos' },
  { title: 'Fortune — Why OpenClaw Has Security Experts on Edge', description: 'OpenClaw 赋予 AI 真实自主权带来的新型安全风险', url: 'https://fortune.com/2026/02/12/openclaw-ai-agents-security-risks-beware/', category: '深度文章', lang: 'EN', source: 'Fortune' },
  { title: 'ZDNet — From Clawdbot to OpenClaw: Nightmare Fuel for Security Pros', description: '34 个安全相关 commit，一键 RCE 修复', url: 'https://www.zdnet.com/article/clawdbot-moltbot-openclaw-security-nightmare/', category: '深度文章', lang: 'EN', source: 'ZDNet' },
  { title: 'WIRED — I Loved My OpenClaw AI Agent', description: '《连线》杂志深度报道：OpenClaw 的魅力与潜在风险', url: 'https://www.wired.com/story/malevolent-ai-agent-openclaw-clawdbot/', category: '深度文章', lang: 'EN', source: 'WIRED' },
  { title: '飞书官方 — 一文完全搞懂 Clawd Bot', description: 'Gateway-Node 架构深度解析、Canvas 画布、部署方案与成本分析', url: 'https://www.feishu.cn/content/article/7602519239445974205', category: '深度文章', lang: '中文', source: '飞书' },
  { title: 'DEV Community — Unleashing OpenClaw: Ultimate Guide for Developers', description: '开发者视角深度解析：Gateway 架构、Brain 模型层、自定义 Skill 编写', url: 'https://dev.to/mechcloud_academy/unleashing-openclaw-the-ultimate-guide-to-local-ai-agents-for-developers-in-2026-3k0h', category: '深度文章', lang: 'EN', source: 'DEV Community' },
  
  // 技能开发
  { title: 'ClawHub 技能开发文档', description: '如何创建、发布和管理自定义技能', url: 'https://docs.openclaw.ai/tools/clawhub', category: '技能开发', lang: 'EN', source: 'OpenClaw Docs' },
  { title: 'Awesome OpenClaw Skills — 社区精选技能合集', description: 'VoltAgent 维护的 OpenClaw Skills 精选列表，分类清晰，持续更新', url: 'https://github.com/VoltAgent/awesome-openclaw-skills', category: '技能开发', lang: 'EN', source: 'GitHub' },
  { title: 'Reddit — Best Openclaw Skills You Should Install', description: 'Reddit 社区精选：500+ ClawHub 技能中的最佳推荐', url: 'https://www.reddit.com/r/AI_Agents/comments/1r2u356/best_openclaw_skills_you_should_install_from/', category: '技能开发', lang: 'EN', source: 'Reddit' },
  
  // 玩法与场景
  { title: '25+ Real OpenClaw Use Cases', description: '41 页免费 PDF，社区真实部署案例集', url: 'https://www.forwardfuture.ai/p/what-people-are-actually-doing-with-openclaw-25-use-cases', category: '玩法与场景', lang: 'EN', source: 'Forward Future' },
  { title: 'OpenClaw Is Going Viral — #1 Use Case and 35 Ways to Automate', description: 'TechStartups 深度报道：最热门的 35 种自动化玩法', url: 'https://techstartups.com/2026/02/12/openclaw-is-going-viral-the-1-use-case-and-35-ways-people-automate-work-and-life-with-it/', category: '玩法与场景', lang: 'EN', source: 'TechStartups' },
  { title: 'Running 10 AI Agents to Automate My Life', description: 'DEV.to 实战：8GB 内存跑 10 个 Agent', url: 'https://dev.to/linou518/running-10-ai-agents-to-automate-my-life-a-practical-guide-with-openclaw-ki7', category: '玩法与场景', lang: 'EN', source: 'DEV Community' },
  
  // 工具与插件
  { title: 'OpenClaw 汉化版 — CLI + Dashboard 全中文', description: '每小时自动同步官方仓库，含完整中文 README', url: 'https://github.com/1186258278/OpenClawChineseTranslation', category: '工具与插件', lang: '中文', source: 'GitHub' },
  { title: 'Molt Founders — OpenClaw Mega Cheatsheet 2026', description: '150+ CLI 命令速查、工作区文件、记忆系统、模型配置', url: 'https://moltfounders.com/openclaw-mega-cheatsheet', category: '工具与插件', lang: 'EN', source: 'Molt Founders' },
];

// 清空现有数据并插入新数据
db.exec('DELETE FROM resources');

const insert = db.prepare(`
  INSERT INTO resources (title, description, url, category, lang, source)
  VALUES (?, ?, ?, ?, ?, ?)
`);

let count = 0;
for (const r of resources) {
  insert.run(r.title, r.description, r.url, r.category, r.lang, r.source);
  count++;
}

console.log(`✅ 已插入 ${count} 条资源数据`);

// 输出统计
const stats = db.prepare(`
  SELECT category, lang, COUNT(*) as count 
  FROM resources 
  GROUP BY category, lang
`).all();

console.log('\n📊 分类统计:');
for (const s of stats) {
  console.log(`  ${s.category} (${s.lang}): ${s.count}`);
}

db.close();
