const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'openclaw101.db');
const db = new Database(dbPath);

// 清空现有数据
db.exec('DELETE FROM resources');

// 完整资源数据 - 目标379+
const resources = [
  // 官方资源
  { title: 'OpenClaw 官方文档', description: '完整的 API 参考、配置指南和架构说明', url: 'https://docs.openclaw.ai', category: '官方资源', lang: 'EN', source: 'OpenClaw' },
  { title: 'GitHub — openclaw/openclaw', description: '源代码、Issue 跟踪和社区贡献指南 (279k+ ⭐)', url: 'https://github.com/openclaw/openclaw', category: '官方资源', lang: 'EN', source: 'GitHub' },
  { title: 'ClawHub 技能市场', description: '发现、安装和分享 AI 技能插件', url: 'https://clawhub.com', category: '官方资源', lang: 'EN', source: 'ClawHub' },
  { title: 'OpenClaw 官方文档', description: '完整的 API 参考、配置指南和架构说明', url: 'https://docs.openclaw.ai', category: '官方资源', lang: '中文', source: 'OpenClaw' },
  { title: 'The Verge — OpenClaw 新闻汇总', description: '全面跟踪 AI 助理动态', url: 'https://www.theverge.com/news/872091/openclaw-moltbot-clawdbot-ai-agent-news', category: '官方资源', lang: 'EN', source: 'The Verge' },
  { title: 'TechCrunch — OpenClaw 创始人加入 OpenAI', description: '创始人 Peter Steinberger 加入 OpenAI', url: 'https://techcrunch.com/2026/02/15/openclaw-creator-peter-steinberger-joins-openai/', category: '官方资源', lang: 'EN', source: 'TechCrunch' },
  { title: 'OpenClaw 官方博客', description: '版本更新，功能介绍和最佳实践', url: 'https://buttondown.com/openclaw-newsletter/', category: '官方资源', lang: 'EN', source: 'OpenClaw' },
  { title: 'OpenClaw 7天入门指南 — 飞书知识库', description: '从认识到进阶的系统化学习路径', url: 'https://my.feishu.cn/wiki/YkWgwqSchi9xW3kEuZscAm0lnFf', category: '官方资源', lang: '中文', source: 'OpenClaw 101' },
  
  // 云平台部署
  { title: '阿里云 — 部署 OpenClaw 构建钉钉 AI 助理', description: '轻量应用服务器一键部署', url: 'https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw', category: '云平台部署', lang: '中文', source: '阿里云' },
  { title: '腾讯云 — OpenClaw 接入飞书保姆级教程', description: 'Lighthouse 一键部署 + 飞书机器人', url: 'https://cloud.tencent.com/developer/article/2625073', category: '云平台部署', lang: '中文', source: '腾讯云' },
  { title: 'DigitalOcean — One-Click Deploy OpenClaw', description: 'DigitalOcean 一键部署', url: 'https://www.digitalocean.com/community/tutorials/how-to-run-openclaw', category: '云平台部署', lang: 'EN', source: 'DigitalOcean' },
  { title: 'AWS 中国博客 — 基于 Mac 实例部署 OpenClaw', description: '亚马逊云科技 Mac 实例部署', url: 'https://aws.amazon.com/cn/blogs/china/openclaw-deployment-aws-mac/', category: '云平台部署', lang: '中文', source: 'AWS' },
  { title: 'Hostinger — Install OpenClaw on VPS', description: 'Hostinger 一键 Docker 部署', url: 'https://www.hostinger.com/support/how-to-install-openclaw-on-hostinger-vps/', category: '云平台部署', lang: 'EN', source: 'Hostinger' },
  { title: 'AMD Developer Cloud — OpenClaw + vLLM', description: 'MI300X 192GB GPU 免费运行', url: 'https://www.amd.com/en/developer/resources/technical-articles/2026/openclaw-with-vllm-running-for-free-on-amd-developer-cloud-.html', category: '云平台部署', lang: 'EN', source: 'AMD' },
  { title: 'Vercel — OpenClaw 集成指南', description: 'Vercel AI Gateway 集成', url: 'https://vercel.com/docs/ai-gateway/chat-platforms/openclaw', category: '云平台部署', lang: 'EN', source: 'Vercel' },
  { title: 'Railway — OpenClaw 部署', description: 'Railway 平台一键部署', url: 'https://railway.app/template/openclaw', category: '云平台部署', lang: 'EN', source: 'Railway' },
  
  // 入门部署 - 主要资源
  { title: 'OpenClaw 下载安装使用 — 详细图文教程', description: '系统要求、多种安装方式对比', url: 'https://apifox.com/apiskills/openclaw-installation-and-usage-guide/', category: '入门部署', lang: '中文', source: 'Apifox' },
  { title: '菜鸟教程 — OpenClaw 完整教程', description: '从 git clone 到 pnpm build', url: 'https://www.runoob.com/ai-agent/openclaw-clawdbot-tutorial.html', category: '入门部署', lang: '中文', source: '菜鸟教程' },
  { title: '搬主题 — 一键安装部署教程', description: '含钉钉/飞书/微信/Web四种集成', url: 'https://www.banzhuti.com/openclaw-moltbot-clawdbot-tutorial.html', category: '入门部署', lang: '中文', source: '搬主题' },
  { title: 'DataCamp — OpenClaw Tutorial', description: 'WhatsApp 远程控制电脑教程', url: 'https://www.datacamp.com/tutorial/moltbot-clawdbot-tutorial', category: '入门部署', lang: 'EN', source: 'DataCamp' },
  { title: 'freeCodeCamp — OpenClaw Full Tutorial', description: '从被动聊天到主动 Agent', url: 'https://www.freecodecamp.org/news/openclaw-full-tutorial-for-beginners/', category: '入门部署', lang: 'EN', source: 'freeCodeCamp' },
  { title: 'WiTechPedia — Complete Step-by-Step Guide', description: 'Windows/macOS/Linux 全平台', url: 'https://www.witechpedia.com/guide/how-to-install-openclaw/', category: '入门部署', lang: 'EN', source: 'WiTechPedia' },
  { title: 'Zilliz — Install OpenClaw on Mac', description: 'macOS 部署指南', url: 'https://medium.com/@zilliz_learn/how-to-install-and-run-openclaw-previously-clawdbot-moltbot-on-mac-9cb6adb64eef', category: '入门部署', lang: 'EN', source: 'Medium' },
  { title: 'Towards Data Science — Personal AI Assistant', description: '权威数据科学媒体出品', url: 'https://towardsdatascience.com/use-openclaw-to-make-a-personal-ai-assistant/', category: '入门部署', lang: 'EN', source: 'TDS' },
  { title: 'CSDN — OpenClaw开源汉化发行版', description: '完全汉化版部署指南', url: 'https://blog.csdn.net/qq_44866828/article/details/157876493', category: '入门部署', lang: '中文', source: 'CSDN' },
  { title: 'Apidog — How to Update OpenClaw', description: '工程导向的更新指南', url: 'https://apidog.com/blog/update-openclaw/', category: '入门部署', lang: 'EN', source: 'Apidog' },
  { title: 'The Neuron AI — OpenClaw 设置指南', description: 'QMD 记忆后端配置', url: 'https://www.theneuron.ai/explainer-articles/openclaw-personal-ai-agent-setup-guide-an-use-cases-february-2026/', category: '入门部署', lang: 'EN', source: 'The Neuron AI' },
  { title: 'Raspberry Pi — 部署 OpenClaw', description: '将树莓派变成 AI Agent', url: 'https://www.raspberrypi.com/news/turn-your-raspberry-pi-into-an-ai-agent-with-openclaw/', category: '入门部署', lang: 'EN', source: 'Raspberry Pi' },
  { title: '博客园 — 安装 OpenClaw 对接飞书', description: 'Windows 系统保姆级教程', url: 'https://www.cnblogs.com/catchadmin/p/19556552', category: '入门部署', lang: '中文', source: '博客园' },
  { title: '知乎 — 2026年OpenClaw新手部署教程', description: '阿里云生态下超详细部署', url: 'https://zhuanlan.zhihu.com/p/2004189250392974456', category: '入门部署', lang: '中文', source: '知乎' },
  { title: '掘金 — OpenClaw 安装教程', description: '完整记录，含架构理解', url: 'https://juejin.cn/post/7600752623068102666', category: '入门部署', lang: '中文', source: '掘金' },
  { title: 'DEV Community — OpenClaw Setup Guide', description: 'Jetson/Mac Mini/Raspberry Pi', url: 'https://dev.to/yankoaleksandrov/openclaw-setup-guide-from-zero-to-ai-assistant-in-10-minutes-1md', category: '入门部署', lang: 'EN', source: 'DEV' },
  { title: 'DEV Community — Running 10 AI Agents', description: '8GB 内存跑 10 个 Agent', url: 'https://dev.to/linou518/running-10-ai-agents-to-automate-my-life-a-practical-guide-with-openclaw-ki7', category: '入门部署', lang: 'EN', source: 'DEV' },
  { title: 'DEV Community — Unleashing OpenClaw', description: 'Gateway 架构、Brain 模型层', url: 'https://dev.to/mechcloud_academy/unleashing-openclaw-the-ultimate-guide-to-local-ai-agents-for-developers-in-2026-3k0h', category: '入门部署', lang: 'EN', source: 'DEV' },
  { title: 'DEV Community — What is OpenClaw AI', description: '实用开发者指南', url: 'https://dev.to/laracopilot/what-is-openclaw-ai-in-2026-a-practical-guide-for-developers-25hj', category: '入门部署', lang: 'EN', source: 'DEV' },
  { title: 'Medium — Mastering OpenClaw', description: '自定义 Skills，安全加固', url: 'https://medium.com/@vignarajj/mastering-openclaw-your-ultimate-guide-to-setting-up-a-personal-ai-assistant-in-2026-266d8c8e66fb', category: '入门部署', lang: 'EN', source: 'Medium' },
  { title: 'Medium — What is OpenClaw 2026', description: '社区成长视角入门', url: 'https://medium.com/@gemQueenx/what-is-openclaw-open-source-ai-agent-in-2026-setup-features-8e020db20e5e', category: '入门部署', lang: 'EN', source: 'Medium' },
  { title: 'Medium — Install & Secure Your Bot', description: '安全优先的设置指南', url: 'https://medium.com/@proflead/openclaw-tutorial-how-to-install-secure-your-personal-ai-bot-0dde8dc71624', category: '入门部署', lang: 'EN', source: 'Medium' },
  { title: 'Open-Claw.org — Ultimate Guide 2026', description: 'Docker 和 Node.js 部署', url: 'https://open-claw.org/posts/openclaw-deploy', category: '入门部署', lang: 'EN', source: 'Open-Claw.org' },
  { title: 'Substack — Complete Guide', description: '从基础到高级用法', url: 'https://sidsaladi.substack.com/p/openclawmoltbotclawdbot-101-the-complete', category: '入门部署', lang: 'EN', source: 'Substack' },
  { title: 'Julian Goldie — Workflow Automation', description: '消除 80% 日常繁琐工作', url: 'https://juliangoldie.com/openclaw-workflow-automation/', category: '入门部署', lang: 'EN', source: 'Julian Goldie' },
  { title: 'Foxes Sell Faster — Complete Tutorial', description: '零命令行基础教程', url: 'https://www.foxessellfaster.com/blog/openclaw-setup-guide-how-i-built-my-own-ai-agent-complete-2026-tutorial/', category: '入门部署', lang: 'EN', source: 'Foxes Sell Faster' },
  { title: 'NRI Globe — Ultimate 2026 Guide', description: '安装配置、自动化技巧', url: 'https://nriglobe.com/tech-news/how-to-use-openclaw-personal-ai-assistant-2026/', category: '入门部署', lang: 'EN', source: 'NRI Globe' },
  { title: 'heyuan110.com — 超详细上手教程', description: '小白友好 + 老鸟技巧', url: 'https://www.heyuan110.com/posts/ai/2026-02-12-openclaw-usage-tutorial/', category: '入门部署', lang: '中文', source: 'heyuan110' },
  { title: 'CSDN — 251000字完整实战教程', description: '16章正文 + 4个附录 + 66个案例', url: 'https://blog.csdn.net/2301_81108348/article/details/158356909', category: '入门部署', lang: '中文', source: 'CSDN' },
  { title: 'Reddit — Ultimate Setup Guide', description: 'Reddit 社区指南', url: 'https://www.reddit.com/r/clawdbot/comments/1rkcwt4/the_ultimate_openclaw_setup_guide_stepbystep/', category: '入门部署', lang: 'EN', source: 'Reddit' },
  { title: 'PromptLayer — Step-by-Step Guide', description: 'Agentic AI 追踪团队出品', url: 'https://blog.promptlayer.com/how-to-install-openclaw-step-by-step-guide-formerly-clawdbot-moltbot/', category: '入门部署', lang: 'EN', source: 'PromptLayer' },
  { title: 'AIML API — Installation to First Chat', description: '安装、模型设置、Telegram连接', url: 'https://aimlapi.com/blog/openclaw-tutorial-installation-to-first-chat-setup', category: '入门部署', lang: 'EN', source: 'AIML API' },
  { title: 'Robo Rhythms — Beginner Friendly Guide', description: '常见陷阱如上下文丢失', url: 'https://www.roborhythms.com/openclaw-beginner-friendly-guide/', category: '入门部署', lang: 'EN', source: 'Robo Rhythms' },
  { title: 'Clawctl Blog — OpenClaw + 本地 LLM', description: '零 API 费用，三种本地方案', url: 'https://clawctl.com/blog/openclaw-local-llm-complete-guide', category: '入门部署', lang: 'EN', source: 'Clawctl' },
  { title: 'AlphaTechFinance — 完整 2026 指南', description: '本地 AI Agent、安装、用例与安全', url: 'https://alphatechfinance.com/productivity-app/openclaw-ai-agent-2026-guide/', category: '入门部署', lang: 'EN', source: 'AlphaTechFinance' },
  { title: 'Adven Boost — 10 Steps to Set Up', description: 'Structured 10-step playbook', url: 'https://advenboost.com/en/openclaw-setup-10-steps-guide/', category: '入门部署', lang: 'EN', source: 'Adven Boost' },
  { title: 'Adven Boost — Zero to First Chat', description: '10 分钟快速入门', url: 'https://advenboost.com/en/openclaw-setup-fast-tutorial/', category: '入门部署', lang: 'EN', source: 'Adven Boost' },
  { title: 'BoostedHost — Install OpenClaw', description: 'Plain language guide', url: 'https://boostedhost.com/blog/en/how-to-install-openclaw-get-started-guide/', category: '入门部署', lang: 'EN', source: 'BoostedHost' },
  { title: 'Creator Economy — Master in 30 Minutes', description: '5 real use cases', url: 'https://creatoreconomy.so/p/master-openclaw-in-30-minutes-full-tutorial', category: '入门部署', lang: 'EN', source: 'Creator Economy' },
  { title: 'Turing College — The AI Assistant', description: '三大核心能力解析', url: 'https://www.turingcollege.com/blog/openclaw', category: '入门部署', lang: 'EN', source: 'Turing College' },
  { title: 'Contabo — Self-Hosted Guide', description: 'VPS 托管指南', url: 'https://contabo.com/blog/what-is-openclaw-self-hosted-ai-agent-guide/', category: '入门部署', lang: 'EN', source: 'Contabo' },
  { title: 'SitePoint — Set Up on Mac Mini', description: 'Mac Mini 本地部署', url: 'https://www.sitepoint.com/how-to-set-up-openclaw-on-a-mac-mini/', category: '入门部署', lang: 'EN', source: 'SitePoint' },
  { title: 'SitePoint — Production Guide', description: '30 天自托管经验', url: 'https://www.sitepoint.com/openclaw-production-lessons-4-weeks-self-hosted-ai/', category: '入门部署', lang: 'EN', source: 'SitePoint' },
  { title: 'Latenode — What is OpenClaw', description: '100+ 技能可用', url: 'https://latenode.com/blog/ai/ai-agents/what-is-openclaw', category: '入门部署', lang: 'EN', source: 'Latenode' },
  { title: 'The Register — OpenAI Grabs OpenClaw', description: 'Altman 确认加入', url: 'https://www.theregister.com/2026/02/16/open_ai_grabs_openclaw', category: '入门部署', lang: 'EN', source: 'The Register' },
  { title: 'Reuters — OpenClaw 创始人加入 OpenAI', description: '项目转为基金会', url: 'https://www.reuters.com/business/openclaw-founder-steinberger-joins-openai-open-source-bot-becomes-foundation-2026-02-15/', category: '入门部署', lang: 'EN', source: 'Reuters' },
  { title: 'CNET — OpenAI Strikes Deal', description: 'Lex Fridman 播客后 Zuckerberg 与 Altman 均抛出 offer', url: 'https://www.cnet.com/tech/services-and-software/openai-strikes-deal-with-openclaw-founder/', category: '入门部署', lang: 'EN', source: 'CNET' },
  { title: 'Archive.is — OpenClaw 2026.2.12', description: '修复 40+ 安全问题', url: 'https://archive.is/YqEtG', category: '入门部署', lang: 'EN', source: 'Archive.is' },
  { title: 'WIRED — I Loved My OpenClaw', description: '深度报道：魅力与风险', url: 'https://www.wired.com/story/malevolent-ai-agent-openclaw-clawdbot/', category: '入门部署', lang: 'EN', source: 'WIRED' },
  { title: 'Fortune — Why OpenClaw Has Security Experts on Edge', description: '新型安全风险', url: 'https://fortune.com/2026/02/12/openclaw-ai-agents-security-risks-beware/', category: '入门部署', lang: 'EN', source: 'Fortune' },
  { title: 'ZDNet — From Clawdbot to OpenClaw', description: '34 个安全相关 commit', url: 'https://www.zdnet.com/article/clawdbot-moltbot-openclaw-security-nightmare/', category: '入门部署', lang: 'EN', source: 'ZDNet' },
  { title: 'Om.co — Sam Attention Back', description: '分析加入 OpenAI 深层意义', url: 'https://om.co/2026/02/16/sam-claws-attention-back-openai/', category: '入门部署', lang: 'EN', source: 'Om.co' },
  { title: 'Hacker News — OpenClaw joins OpenAI', description: '社区讨论', url: 'https://news.ycombinator.com/item?id=47027907', category: '入门部署', lang: 'EN', source: 'Hacker News' },
  { title: 'Conscia — The OpenClaw Security Crisis', description: '824 个恶意技能', url: 'https://conscia.com/blog/the-openclaw-security-crisis/', category: '入门部署', lang: 'EN', source: 'Conscia' },
  { title: 'Kaspersky — OpenClaw Found Unsafe', description: '近千个无认证公开实例', url: 'https://www.kaspersky.com/blog/openclaw-vulnerabilities-exposed/55263/', category: '入门部署', lang: 'EN', source: 'Kaspersky' },
  { title: 'xCloud — 7 OpenClaw Security Best Practices', description: 'CVE 防护、恶意软件防范', url: 'https://xcloud.host/openclaw-security-best-practices', category: '入门部署', lang: 'EN', source: 'xCloud' },
  { title: 'AIMaker — How to Harden Security', description: '三层安全加固指南', url: 'https://aimaker.substack.com/p/openclaw-security-hardening-guide', category: '入门部署', lang: 'EN', source: 'AIMaker' },
  { title: 'Skywork AI — Workflows & Risks', description: '安全优先的蓝图', url: 'https://skywork.ai/blog/ai-agent/clawdbot-openclaw-ai-workflows/', category: '入门部署', lang: 'EN', source: 'Skywork AI' },
  { title: 'CyberSecurity News — OpenClaw v2026.2.6', description: '支持 Opus 4.6、GPT-5.3-Codex', url: 'https://cybersecuritynews.com/openclaw-v2026-2-6-released/', category: '入门部署', lang: 'EN', source: 'CyberSecurity News' },
  { title: 'Snyk — SKILL.md to Shell Access', description: '恶意 SKILL.md 文件获取 shell', url: 'https://snyk.io/articles/skill-md-shell-access/', category: '入门部署', lang: 'EN', source: 'Snyk' },
  { title: 'Snyk — Inside the Malicious Campaign', description: '反向 Shell 完整攻击链', url: 'https://snyk.io/articles/clawdhub-malicious-campaign-ai-agent-skills/', category: '入门部署', lang: 'EN', source: 'Snyk' },
  { title: 'CrowdStrike — Security Teams Need to Know', description: '风险面与防护建议', url: 'https://www.crowdstrike.com/en-us/blog/what-security-teams-need-to-know-about-openclaw-ai-super-agent/', category: '入门部署', lang: 'EN', source: 'CrowdStrike' },
  { title: 'Northeastern University — Privacy Nightmare', description: '隐私风险学术分析', url: 'https://news.northeastern.edu/2026/02/10/open-claw-ai-assistant/', category: '入门部署', lang: 'EN', source: 'NEU' },
  { title: 'Habr — Dont Launch Your Bot', description: '俄罗斯安全社区指南', url: 'https://habr.com/en/articles/992720/', category: '入门部署', lang: 'EN', source: 'Habr' },
  { title: 'moltpet — AI 宠物', description: '社区维护的 AI 宠物技能', url: 'https://github.com/openclaw/skills/tree/main/skills/moltpet', category: '入门部署', lang: 'EN', source: 'GitHub' },
  { title: 'Forward Future — 25+ Real Use Cases', description: '41 页 PDF，真实案例集', url: 'https://www.forwardfuture.ai/p/what-people-are-actually-doing-with-openclaw-25-use-cases', category: '玩法与场景', lang: 'EN', source: 'Forward Future' },
  { title: 'TechStartups — 35 Ways to Automate', description: '最热门的 35 种自动化玩法', url: 'https://techstartups.com/2026/02/12/openclaw-is-going-viral-the-1-use-case-and-35-ways-people-automate-work-and-life-with-it/', category: '玩法与场景', lang: 'EN', source: 'TechStartups' },

  // 视频教程
  { title: 'B站 — OpenClaw 海量全玩法攻略', description: '国内网络使用 + 本地部署', url: 'https://www.bilibili.com/video/BV1kH6nBFEPq/', category: '视频教程', lang: '中文', source: 'Bilibili' },
  { title: 'B站 — 本地部署接入四平台教程', description: '10分钟保姆级', url: 'https://www.bilibili.com/video/BV1MfFAz6EnR/', category: '视频教程', lang: '中文', source: 'Bilibili' },
  { title: 'B站 — 超详细最强AI部署教程', description: '2026 年最新版', url: 'https://www.bilibili.com/video/BV1fMfZBuEMj/', category: '视频教程', lang: '中文', source: 'Bilibili' },
  { title: 'YouTube — Full Setup Tutorial', description: 'Complete video walkthrough', url: 'https://www.youtube.com/watch?v=fcZMmP5dsl4', category: '视频教程', lang: 'EN', source: 'YouTube' },
  { title: 'YouTube — Tutorial for Beginners', description: 'Comprehensive course', url: 'https://www.youtube.com/watch?v=n1sfrc-RjyM', category: '视频教程', lang: 'EN', source: 'YouTube' },
  { title: 'YouTube — Master in 30 Minutes', description: 'Peter Yang 5 real use cases', url: 'https://www.youtube.com/watch?v=ji_Sd4si7jo', category: '视频教程', lang: 'EN', source: 'YouTube' },
  { title: 'YouTube — Install in 10 Minutes', description: 'VPS 快速部署', url: 'https://www.youtube.com/watch?v=khTA_AfJ01Y', category: '视频教程', lang: 'EN', source: 'YouTube' },
  { title: 'YouTube — Lex Fridman Podcast', description: '3 小时深度专访', url: 'https://www.youtube.com/watch?v=YFjfBk8HI5o', category: '视频教程', lang: 'EN', source: 'YouTube' },
  { title: 'YouTube — Secure Setup Guide', description: '安全安装和配置', url: 'https://www.youtube.com/watch?v=J8sBdV4kwU8', category: '视频教程', lang: 'EN', source: 'YouTube' },
  { title: 'YouTube — Kimi Claw 教程', description: '浏览器内运行 OpenClaw', url: 'https://www.youtube.com/watch?v=72voj6uefLY', category: '视频教程', lang: 'EN', source: 'YouTube' },
  { title: 'YouTube — Tech With Tim', description: '技能、语音、记忆系统', url: 'https://www.youtube.com/watch?v=vte-fDoZczE', category: '视频教程', lang: 'EN', source: 'YouTube' },
  { title: 'YouTube — Matt Berman Use Cases', description: '真正实用的场景', url: 'https://www.youtube.com/watch?v=Q7r--i9lLck', category: '视频教程', lang: 'EN', source: 'YouTube' },

  // 技能开发
  { title: 'ClawHub 技能开发文档', description: '如何创建、发布和管理自定义技能', url: 'https://docs.openclaw.ai/tools/clawhub', category: '技能开发', lang: 'EN', source: 'OpenClaw Docs' },
  { title: 'Awesome OpenClaw Skills', description: '社区精选技能合集', url: 'https://github.com/VoltAgent/awesome-openclaw-skills', category: '技能开发', lang: 'EN', source: 'GitHub' },
  { title: 'Reddit — Best OpenClaw Skills', description: '500+ 技能最佳推荐', url: 'https://www.reddit.com/r/AI_Agents/comments/1r2u356/best_openclaw_skills_you_should_install_from/', category: '技能开发', lang: 'EN', source: 'Reddit' },
  { title: 'OpenClaw Mega Cheatsheet 2026', description: '150+ CLI 命令速查', url: 'https://moltfounders.com/openclaw-mega-cheatsheet', category: '技能开发', lang: 'EN', source: 'Molt Founders' },
  { title: 'OpenClaw 汉化版', description: 'CLI + Dashboard 全中文', url: 'https://github.com/1186258278/OpenClawChineseTranslation', category: '工具与插件', lang: '中文', source: 'GitHub' },
  { title: '飞书官方 — 一文完全搞懂 Clawd Bot', description: 'Gateway-Node 架构解析', url: 'https://www.feishu.cn/content/article/7602519239445974205', category: '深度文章', lang: '中文', source: '飞书' },
  { title: 'IBM Think — OpenClaw: The Viral Agent', description: 'IBM 深度分析架构创新', url: 'https://www.ibm.com/think/news/clawdbot-ai-agent-testing-limits-vertical-integration', category: '深度文章', lang: 'EN', source: 'IBM' },
  { title: 'Scientific American — OpenClaw is an open-source AI agent', description: '重新定义数字助手', url: 'https://www.scientificamerican.com/article/moltbot-is-an-open-source-ai-agent-that-runs-your-computer/', category: '深度文章', lang: 'EN', source: 'Scientific American' },
  { title: 'The Hacker News — 341 Malicious Skills', description: '恶意技能窃取数据', url: 'https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html', category: '深度文章', lang: 'EN', source: 'The Hacker News' },
  { title: 'The Hacker News — VirusTotal Integration', description: '集成病毒扫描', url: 'https://thehackernews.com/2026/02/openclaw-integrates-virustotal-scanning.html', category: '深度文章', lang: 'EN', source: 'The Hacker News' },
  { title: 'Cisco — Security Nightmare', description: '安全分析', url: 'https://blogs.cisco.com/ai/personal-ai-agents-like-openclaw-are-a-security-nightmare', category: '深度文章', lang: 'EN', source: 'Cisco' },
  { title: 'Sophos — Warning Shot', description: '3 万+ 暴露实例', url: 'https://www.sophos.com/en-us/blog/the-openclaw-experiment-is-a-warning-shot-for-enterprise-ai-security', category: '深度文章', lang: 'EN', source: 'Sophos' },
  { title: 'Adversa AI — Security 101', description: 'CVE、供应链风险', url: 'https://adversa.ai/blog/openclaw-security-101-vulnerabilities-hardening-2026/', category: '深度文章', lang: 'EN', source: 'Adversa AI' },
];

// 插入数据
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

// 统计
const stats = db.prepare(`
  SELECT category, lang, COUNT(*) as count 
  FROM resources 
  GROUP BY category, lang
`).all();

console.log('\n📊 分类统计:');
for (const s of stats) {
  console.log(`  ${s.category} (${s.lang}): ${s.count}`);
}

const total = db.prepare('SELECT COUNT(*) as total FROM resources').get();
console.log(`\n总计: ${total.total} 条`);

db.close();
