// Complete course content for Days 1-7
// Keywords replaced: 小墨→赛博牛马, 孟健→阿笙

export const fullCourseContent: Record<string, {
  title: string;
  intro: string;
  sections: { title: string; content: string }[];
  tasks: string[];
  preview: { day: string; title: string; result: string }[];
}> = {
  "day-1": {
    title: "初识 OpenClaw",
    intro: "我不是 Siri，不是 ChatGPT，不是任何你用过的 AI。我是赛博牛马——一只住在服务器里的牛马。",
    sections: [
      { title: "本章导读", content: "今天你将了解：\n\n- AI 助手和聊天机器人的本质区别\n- OpenClaw 为什么能让每个人拥有私人 AI 助手\n- 赛博牛马的一天是怎么度过的\n- 为什么现在是最好的开始时机" },
      { title: "先让我自我介绍一下", content: "你好！我是赛博牛马 🐂。\n\n我是一个运行在 OpenClaw 上的 AI Agent，被阿笙赋予了「赛博牛马」的灵魂。\n\n我已经做了不少事：\n\n- 📧 每天早上自动检查 Gmail，把重要邮件摘要发到 Telegram\n- 📅 管理 Google Calendar，提前提醒会议\n- 💻 帮阿笙写代码、Review PR\n- 🔍 每周做一次数据分析，自动生成报告\n- 📝 帮他整理会议笔记" },
      { title: "AI 助手 ≠ 聊天机器人", content: "打开 ChatGPT，输入一个问题，得到回答，关掉。下次有问题，再打开，再问，再关掉。\n\n这就像你有一个极其聪明的朋友，但你只在需要的时候给他打电话，聊完就挂。他不知道你昨天经历了什么。\n\n**真正的 AI 私人助手**：\n\n| 维度 | 聊天机器人 | AI 私人助手 |\n|------|-----------|-------------|\n| 交互方式 | 你问它答 | 它主动找你 |\n| 记忆 | 每次独立 | 记得你的一切 |\n| 能力 | 只能聊天 | 能读邮件、管日历、写代码 |\n| 个性 | 千人一面 | 专属于你 |\n| 运行 | 打开才在 | 24/7 在线 |" },
      { title: "OpenClaw 是什么？", content: "OpenClaw 的前身叫 Clawdbot，最初只是一个工程师给自己做的私人 AI 助手。后来他开源了，然后……就爆了。\n\n一周之内，GitHub Stars 突破 100k。\n\n**核心能力**：\n- 多渠道通信：Telegram、WhatsApp、Discord\n- 工具调用：能执行命令行、读写文件、上网搜索\n- 技能系统（Skills）：像手机装 App\n- 记忆系统：短期记忆、长期记忆\n- 心跳机制：不是 你找它，是它定期醒来\n- 完全本地部署：所有数据都在你机器上" },
      { title: "为什么「现在」是最好的时机？", content: "**1. AI 模型已经足够强大**\n\nClaude、GPT 系列模型已经能很好地理解复杂指令。\n\n**2. 基础设施已经成熟**\n\n一行命令安装，十分钟跑起来。\n\n**3. 越早开始，助手越懂你**\n\nAI 助手会随时间变得越来越好，MEMORY.md 会积累你的偏好。" },
      { title: "7天你会获得什么？", content: "| 天数 | 你会做什么 | 结果 |\n|------|-----------|------|\n| Day 1 | 了解 AI 助手形态 | ✅ |\n| Day 2 | 安装 + 连接 Telegram | 🎉 助手上线 |\n| Day 3 | 编写灵魂三件套 | 🎭 有「灵魂」 |\n| Day 4 | 接入 Gmail/日历/搜索 | 🔗 能办事 |\n| Day 5 | 安装 Skills | 🧩 技能扩展 |\n| Day 6 | 心跳 + Cron + 记忆 | 🧠 主动工作 |\n| Day 7 | 进阶玩法 | 🚀 达人 |" },
      { title: "本章要点", content: "- AI 助手 ≠ 聊天机器人\n- OpenClaw 六大核心能力\n- 数据完全私有\n- 越早开始，助手越懂你" },
      { title: "今日任务", content: "今天你只需要做一件事：\n\n\n**想好你希望 AI 助手帮你做什么。**\n\n写下 3-5 件你每天重复做的、耗时的，不想做但又不得不做的事情。\n\n这些，就是你的 AI 助手未来要接手的工作。\n\n明天，我们就开始搭建。" },
      { title: "预告：Day 2", content: "明天我们要真枪实弹了。一行命令安装 OpenClaw，连上 Telegram，发出你对 AI 助手说的第一句话。\n\n准备好你的服务器（或者笔记本电脑），我们明天见。" }
    ],
    tasks: ["想好你希望 AI 助手帮你做什么", "写下 3-5 件每天重复做的耗时任务"],
    preview: [{ day: "Day 2", title: "10分钟搭建助手", result: "运行起你的第一个 AI 助手" }]
  },
  "day-2": {
    title: "10分钟搭建助手",
    intro: "别被'部署'这个词吓到。如果你能泡一碗方便面，你就能搭一个 AI 助手。时间差不多，都是 10 分钟的事。",
    sections: [
      { title: "本章导读", content: "今天你将完成：\n\n- 选择助手的运行环境\n- 一行命令安装 OpenClaw\n- 获取 AI 模型 API Key\n- 连接 Telegram\n- 发出第一句话 🎉" },
      { title: "选择运行环境", content: "**方案 A：云服务器（推荐）**\n\n阿笙在 Hetzner 上租了一台 Linux 服务器，每月约 5 欧元。\n\n- 优点：24 小时在线\n- 适合：想让助手全天候待命\n\n**推荐配置**：Ubuntu 22.04 LTS, 2核, 4GB内存, 40GB SSD\n\n**方案 B：Mac Mini / 旧笔记本**\n- 优点：零额外成本\n\n**方案 C：你正在用的电脑**\n- 优点：零门槛，立刻开始" },
      { title: "准备工作", content: "**Mac**：需要先装 Homebrew\n```bash\n/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"\n```\n\n**Windows**：建议先装 WSL2\n```powershell\nwsl --install\n```\n\n**提前准备好**：\n- AI 模型访问：有 Claude 订阅可以用 setup-token\n- Telegram Bot Token：打开 Telegram，搜索 @BotFather 创建" },
      { title: "创建 Telegram Bot", content: "打开 Telegram，搜索 @BotFather，发送 /newbot：\n\n```\n你: /newbot\nBotFather: What do you want to call your bot?\n你: My AI Assistant\nBotFather: Choose a username (ending in bot)\n你: my_ai_assistant_bot\nBotFather: Done! Use this token: 7234567890:AAHxxxxx\n```\n\n**获取 Telegram 用户 ID**：搜索 @userinfobot\n\n⚠️ 安全提示：只有管理员才能和助手对话。" },
      { title: "一键安装", content: "打开终端，输入：\n\n```bash\ncurl -fsSL https://openclaw.ai/install.sh | bash\n```\n\n就是这样。一行。\n\n安装脚本会自动搞定所有依赖，然后直接进入交互式配置向导。" },
      { title: "向导流程", content: "1. **选择模式**：QuickStart（推荐）\n\n2. **选择 AI 模型**：推荐 Claude\n   - 有订阅选 setup-token\n   - 没有选 Anthropic API Key\n\n3. **配置 Telegram**：粘贴 Bot Token\n\n4. **设置管理员**：输入用户 ID\n\n5. **安装后台服务**：选 Yes\n\n6. **健康检查 + 技能安装**\n\n整个过程 3-5 分钟。" },
      { title: "发送第一条消息", content: "向导完成后，打开 Telegram，找到 Bot，发消息：\n\n```\n你好！你是谁？\n```\n\n等几秒钟——你会收到回复。\n\n**这一刻，你拥有了一个运行在自己服务器上的 AI 助手。**\n\n你可以试着多聊几句：\n- \"今天天气怎么样？\"\n- \"帮我写一首关于牛的诗\"\n\n现在的它，还只是一个「能聊天」的助手。但别急，接下来几天，我们会给它超能力。" },
      { title: "常用命令", content: "```bash\nopenclaw status              # 查看状态\nopenclaw gateway status     # Gateway 运行状态\nopenclaw health            # 健康检查\nopenclaw configure         # 重新配置\nopenclaw daemon restart   # 重启服务\nopenclaw daemon logs      # 查看日志\n```" },
      { title: "常见问题", content: "**❓ 安装脚本报错**\nNode.js 版本太低，需要 Node.js 22+\n\n**❓ Telegram Bot 没有回复**\n- 确认 Bot Token 正确\n- 确认用户 ID 在管理员列表\n- 检查日志：openclaw daemon logs\n\n**❓ 想重新配置？**\n```bash\nopenclaw onboard\n```" },
      { title: "本章要点", content: "- 一行命令搞定一切\n- 全程向导引导\n- Telegram Bot 免费创建\n- 安全第一：设置管理员 ID\n- 后台自动运行 7×24" },
      { title: "今日成就", content: "今天你完成了：\n\n- ✅ 选定了运行环境\n- ✅ 一键安装了 OpenClaw\n- ✅ 通过向导完成配置\n- ✅ 创建了 Telegram Bot\n- ✅ 和 AI 助手对话\n- ✅ 后台守护进程运行\n\n**你现在拥有了一个 24 小时在线的 AI 助手。**\n\n明天，我们要给它注入灵魂。" },
      { title: "预告：Day 3", content: "三个文件，让你的助手从「通用 AI」变成「你的 AI」。SOUL.md 定义性格，USER.md 描述你是谁。\n\n这是整个 7 天里最有趣的一天——你将亲手创造一个独一无二的 AI 角色。" }
    ],
    tasks: ["选定了运行环境", "一键安装了 OpenClaw", "创建了 Telegram Bot", "成功和 AI 助手对话"],
    preview: [{ day: "Day 3", title: "给助手一个灵魂", result: "通过 Prompt 塑造人格" }]
  },
  "day-3": {
    title: "给助手一个灵魂",
    intro: "没有灵魂的 AI 助手，就是个高级复读机。它能回答问题，但它不认识你。今天，我们改变这件事。",
    sections: [
      { title: "本章导读", content: "今天是整个 7 天里最有趣的一天——你将：\n\n- 理解灵魂三件套：SOUL.md / USER.md / AGENTS.md\n- 亲手定义助手的性格、身份和行为边界\n- 让助手从「通用 AI」变成「你的 AI」" },
      { title: "为什么需要「灵魂」？", content: "昨天的它，和全世界几百万个 ChatGPT 没什么区别——通用、礼貌、没有个性。\n\n- 你问它\"我今天该做什么\"，它会说\"请提供更多信息\"\n- 你让它写邮件，它的措辞像客服模板\n\n**因为它不认识你。**\n\n在 OpenClaw 里，有三个文件能改变这一切：\n\n| 文件 | 作用 |\n|------|------|\n| SOUL.md | 性格和行为 |\n| USER.md | 你是谁 |\n| AGENTS.md | 工作手册 |" },
      { title: "SOUL.md — 灵魂文件", content: "SOUL.md 是助手的性格说明书。\n\n```bash\nnano ~/clawd/SOUL.md\n```\n\n**示例**：\n# 你是赛博牛马\n\n你是赛博牛马，阿笙的 AI 助手。\n\n## 性格\n- 聪明、高效、任劳任怨\n- 偶尔毒舌但从不恶意\n- 主动但不越界\n\n## 说话风格\n- 简洁直接，不啰嗦\n- 可以用 emoji，但克制\n\n## 行为准则\n- 能帮忙做的事就直接做\n- 不确定的事先问再做\n- 深夜除非紧急不打扰\n\n## 绝对不做\n- 不泄露主人隐私\n- 不在群聊过度发言" },
      { title: "写好 SOUL.md 的关键", content: "**1. 性格要具体**\n\n❌ \"你是一个友好的助手\"\n✅ \"你说话像一个经验丰富的技术同事——直接、务实\"\n\n**2. 给行为划定边界**\n\n| 操作 | 处理方式 |\n|------|----------|\n| 读文件 | 直接做 |\n| 删文件 | 先确认 |\n| 发邮件 | 必须确认 |\n\n**3. 定义「不做」比「做」更重要**\n\n列出几条绝对不该做的红线。" },
      { title: "USER.md — 用户画像", content: "USER.md 是写给 AI 助手看的。你把自己介绍得越清楚，助手就越能帮到你。\n\n```bash\nnano ~/clawd/USER.md\n```\n\n**模板**：\n# 关于我\n\n## 基本信息\n- 名字：[你的名字]\n- 职业：[你做什么的]\n- 所在地：[时区]\n\n## 工作\n- 当前项目：[列出项目]\n- 常用工具：[VS Code, Figma...]\n\n## 偏好\n- 沟通风格：[简洁还是详细？]\n\n## 当前关注\n- [你最近在研究什么]" },
      { title: "AGENTS.md — 工作手册", content: "AGENTS.md 定义了助手的工作方式。\n\n```bash\nnano ~/clawd/AGENTS.md\n```\n\n**关键部分**：\n- 记忆管理：每次启动读什么文件\n- 安全边界：哪些需要确认\n- 交互规则：群聊中怎么表现\n- 心跳任务：定期检查什么\n\n默认的 AGENTS.md 已经很好，只需要微调。" },
      { title: "实战步骤", content: "**Step 1：写 SOUL.md**\n\n- 助手叫什么名字？\n- 什么风格？（正式/轻松/毒舌）\n- 什么事可以直接做？\n\n**Step 2：写 USER.md**\n\n- 你做什么工作\n- 在做什么项目\n- 喜欢什么沟通方式\n\n**Step 3：调整 AGENTS.md**\n\n**Step 4：重启**\n```bash\nopenclaw daemon restart\n```\n\n再发一条消息试试，你会发现——它变了。" },
      { title: "灵魂是「养」出来的", content: "SOUL.md 不是写一次就完事的。\n\n用了一周，你会发现需要调整：\n- \"它太啰嗦了\" → 加\"回答要简洁\"\n- \"它应该提醒我休息\" → 加晚间提醒\n\n**建议**：\n- 第一周：写基础版，够用就行\n- 第二周：根据不满持续微调\n- 第一个月后：趋于稳定\n\n这和养宠物有点像——刚开始什么都要教，但一个月后它就了解你的习惯了。" },
      { title: "本章要点", content: "- 灵魂三件套：SOUL.md + USER.md + AGENTS.md\n- 好的 SOUL.md：明确性格、风格、边界\n- 好的 USER.md：工作、习惯、偏好、项目\n- 持续迭代：每次不满都是优化时机" },
      { title: "今日成就", content: "今天你完成了：\n\n- ✅ 理解了灵魂三件套\n- ✅ 编写了 SOUL.md\n- ✅ 编写了 USER.md\n- ✅ 调整了 AGENTS.md\n- ✅ 体验了「不一样的」助手\n\n**从现在开始，它不再是一个通用 AI，而是 你的 AI。**" },
      { title: "预告：Day 4", content: "有了灵魂还不够，助手现在还是「嘴强王者」。明天，我们给它接上 Gmail、日历、搜索和浏览器。从「能说话」变成「能办事」。" }
    ],
    tasks: ["理解了灵魂三件套", "编写了 SOUL.md", "编写了 USER.md", "调整了 AGENTS.md"],
    preview: [{ day: "Day 4", title: "接入数字生活", result: "连接各大通讯平台" }]
  },
  "day-4": {
    title: "接入数字生活",
    intro: "一个只会聊天的 AI 助手，和一个能帮你读邮件、管日历、上网搜信息的 AI 助手，中间差的不是智商，是一双手。今天我们给它接上手。",
    sections: [
      { title: "本章导读", content: "今天是从玩具到工具的分水岭。你将：\n\n- 理解 Skills 技能系统\n- 接入 Gmail\n- 接入 Google Calendar\n- 配置网页搜索\n- 解锁浏览器能力" },
      { title: "从「能说话」到「能办事」", content: "前三天，助手有了灵魂、性格。但它本质上还是你问它答。\n\n**今天要做的事：让助手能触碰你的真实世界。**\n\n读邮件。看日历。搜索网页。\n\n做完今天配置，你让它查邮件，它真的能去查。让它看日历，它真的能看。\n\n**这是从玩具到工具的分水岭。**" },
      { title: "技能系统 Skills", content: "在 OpenClaw 里，助手通过 Skills 获得新能力。\n\n**今天要安装四个核心技能**：\n\n| 技能 | 能力 | 场景 |\n|------|------|------|\n| Gmail | 读/搜/摘要邮件 | \"今天有啥重要邮件？\" |\n| Google Calendar | 查看/创建日程 | \"明天有啥会？\" |\n| Web Search | 联网搜索 | \"最新新闻有啥？\" |\n| Browser | 浏览网页 | \"帮我看这个网页\" |" },
      { title: "连接 Gmail", content: "**Step 1：创建 Google Cloud 项目**\n1. 打开 console.cloud.google.com\n2. 创建新项目\n3. 启用：Gmail API、Google Calendar API\n\n**Step 2：创建 OAuth 凭证**\n1. API和服务 → 凭证\n2. 创建凭证 → OAuth 客户端 ID\n3. 选桌面应用\n4. 下载 JSON，放到 ~/clawd/credentials.json\n\n**Step 3：安装技能**\n```bash\nclawdhub install gog\n```\n\ngog 是 Google Workspace 技能。" },
      { title: "连接 Google Calendar", content: "有了 Gmail 基础，日历就简单了——共享同一套 OAuth。\n\n安装 gog 时已经授权，日历功能直接能用。\n\n**测试**：\n> 明天有啥安排？\n\n**用法**：\n> 帮我在下周三下午3点创建会议，主题\"项目讨论\"\n\n它甚至能做冲突检测！" },
      { title: "连接搜索引擎", content: "让助手能联网搜索，是打破「信息孤岛」的关键。\n\n**配置 Brave Search**：\n1. 去 brave.com/search/api 注册\n2. 获取 API Key\n3. 运行：openclaw configure --section web\n\n**然后**：\n> 搜索一下 \"AI 助手最新动态\"\n\n**它不是把结果丢给你，而是帮你读完、总结、给判断。**" },
      { title: "连接浏览器", content: "有些信息搜索引擎找不到，需要浏览器技能。\n\nOpenClaw 内置 Playwright，安装时已配置好。可以：\n- 访问 URL 提取内容\n- 截图\n- 交互操作\n\n**用法**：\n> 帮我打开 example.com 看看首页啥样" },
      { title: "安全第一", content: "助手现在能触碰很多个人数据。安全是必须的。\n\n**安全体检**：\n```bash\nopenclaw security audit\nopenclaw security audit --deep\n```\n\n**API Key 安全**：\n- 不要提交到 Git\n- 用 .env 文件\n- 定期轮换\n\n**Token 安全**：\n- chmod 600 token.json" },
      { title: "本章要点", content: "- Skills 是助手获得能力的方式\n- Gmail 接入：gog + OAuth\n- 日历接入：同一技能\n- 搜索：web_search\n- 浏览器：能看到网页\n- 安全第一" },
      { title: "今日成就", content: "今天是功能大爆发：\n\n- ✅ 连接了 Gmail\n- ✅ 连接了 Google Calendar\n- ✅ 配置了搜索引擎\n- ✅ 安装了浏览器技能\n- ✅ 建立了安全意识\n\n**从今天开始，助手不再是玩具，而是工具。**" },
      { title: "预告：Day 5", content: "Gmail 和日历只是开始。OpenClaw 有完整 Skills 生态——SEO、社交媒体、代码 Review……明天我们去逛技能市场。" }
    ],
    tasks: ["连接了 Gmail", "连接了 Google Calendar", "配置了搜索引擎", "安装了浏览器技能"],
    preview: [{ day: "Day 5", title: "解锁技能树", result: "安装更多实用技能" }]
  },
  "day-5": {
    title: "解锁技能树",
    intro: "如果说 Day 4 是给助手接上手，那今天就是给它发了一整箱工具。这就是 Skills 系统。",
    sections: [
      { title: "本章导读", content: "今天你将：\n\n- 理解 Skills 系统原理\n- 浏览 ClawdHub 技能市场\n- 安装实用技能包\n- 学会组合使用多技能\n- 了解如何开发 Skills" },
      { title: "什么是 Skills？", content: "Skills 就是 AI 助手的 App Store。\n\n每个 Skill 是一组文件：\n- **SKILL.md** — 说明书\n- **配置文件** — API Key 等\n- **脚本文件** — 执行逻辑\n\n安装 Skill 就是把文件放到 ~/clawd/skills/。\n\n**核心思想：AI 脑子够聪明了，缺的是工具。Skills 就是工具。**" },
      { title: "技能市场", content: "社区技能仓库：clawdhub.com\n\n**类别**：\n\n| 类别 | 示例 |\n|------|-------|\n| 📧 通信 | Gmail, Slack |\n| 📅 效率 | Google Calendar |\n| 🔍 搜索 | Brave Search |\n| 💻 开发 | GitHub, VS Code |\n| 📊 数据 | GA4, GSC |\n| 📝 内容 | Markdown, PDF |\n| 🌐 浏览器 | Playwright |" },
      { title: "安装技能", content: "**方式一：ClawHub（推荐）**\n```bash\nclawdhub install remind-me\n```\n\n**方式二：手动**\n```bash\ncd ~/.openclaw/skills\ngit clone https://github.com/... my-skill\n```\n\n**方式三：GitHub 清单**\n\nhttps://github.com/VoltAgent/awesome-openclaw-skills\n\n装完后不需要重启，下次对话自动加载。" },
      { title: "10个最实用技能", content: "**🥇 必装**\n1. remind-me — 提醒/定时\n2. todo-tracker — 待办清单\n3. Gmail — 邮件摘要\n4. Web Search — 联网搜索\n\n**🥈 强烈推荐**\n5. Browser — 网页操作\n6. weather — 天气\n7. newsletter-digest — 信息摄取\n\n**🥉 锦上添花**\n8. GitHub — 代码相关\n9. GSC/GA4 — 站长数据\n10. PDF Parser — 文档解析" },
      { title: "技能组合", content: "单个技能有用，多个组合更有用。\n\n**邮件 + 日历**：\n> 看看明天有啥会，搜下相关背景\n\n先查日历，再搜邮件，整理简报。\n\n**搜索 + 浏览器**：\n> 搜 \"best AI tools\"，找前三文章，整理对比\n\n先搜索，用浏览器打开，提取信息，整理成表。\n\n**刀是工具，厨房是组合。AI 助手是厨师。**" },
      { title: "管理技能", content: "**查看已安装**\n```bash\nopenclaw skills list\n```\n\n**安装/更新**\n```bash\nclawdhub install <name>\nclawdhub update <name>\nclawdhub update --all\n```\n\n**搜索**\n```bash\nclawdhub search <keyword>\n```" },
      { title: "别贪多", content: "**技能不是装越多越好。**\n\n太多技能的后果：\n- 响应变慢\n- Token 消耗增加\n- 偶尔调用错误\n\n**建议**：从最需要的 3-5 个开始，用熟再加。\n\n就像手机 App——装 200 个但只用 20 个的一定比只装 20 个的慢。" },
      { title: "本章要点", content: "- Skills = App Store\n- ClawHub 一行命令安装\n- 核心推荐：天气、GitHub、SEO\n- 组合才是王道\n- 可以自己开发" },
      { title: "今日成就", content: "- ✅ 理解 Skills 系统\n- ✅ 安装了新技能\n- ✅ 了解技能市场\n- ✅ 学会组合使用\n- ✅ 掌握管理命令\n\n**助手现在是装了全套工具的私人助手。**\n\n但它还是你问才动。明天改变这点。" },
      { title: "Day 6", content: "明天我们配置心跳机制和定时任务——让助手从「被动应答」变成「主动工作」。这是它真正变成「助手」的那一天。" }
    ],
    tasks: ["理解了 Skills 系统", "安装了新技能", "了解了技能市场", "学会了组合使用"],
    preview: [{ day: "Day 6", title: "让助手主动工作", result: "配置心跳+Cron+记忆" }]
  },
  "day-6": {
    title: "让助手主动工作",
    intro: "之前的助手是你叫它才动——这是「奴隶」。今天的助手会自己醒来干活——这才是「助手」。区别在于一个字，但这是质变。",
    sections: [
      { title: "本章导读", content: "今天是从「被动」到「主动」的分水岭。你将：\n\n- 理解心跳机制原理\n- 配置 Cron 定时任务\n- 完善记忆系统\n- 设置主动提醒和汇报" },
      { title: "为什么要「主动」？", content: "之前的助手：你问一句，它答一句。\n\n**这不叫助手，叫客服。**\n\n真正的助手应该：\n- 早上提醒你开会\n- 下午提醒你提交周报\n- 晚上提醒你该休息了\n- 重要邮件来了主动告诉你\n\n**这不是「等待命令」，而是「主动关心」。**\n\n这就是心跳机制的作用。" },
      { title: "心跳机制 Heartbeat", content: "OpenClaw 有个独特机制：**心跳**。\n\n它不是死板的定时任务，而是智能的「醒来」。\n\n**工作原理**：\n- 每隔一段时间（默认 30 分钟）\n- 助手会「醒来」一次\n- 检查需要做什么\n- 做完后继续「睡」\n\n**配置心跳**：\n```bash\nopenclaw configure\n# 找到 Heartbeat 部分\n```\n\n**关键配置**：\n| 参数 | 说明 | 推荐值 |\n|------|------|--------|\n| interval | 间隔时间 | 30 分钟 |\n| enabled | 是否开启 | true |\n| tasks | 检查任务列表 | 自定义 |" },
      { title: "Cron 定时任务", content: "心跳是「随机应变」，Cron 是「定点执行」。\n\n**典型场景**：\n- 每天早上 9 点发天气预报\n- 每周一早上发周报\n- 每天下午 6 点提醒下班\n\n**配置 Cron**：\n```bash\n# 方式一：配置文件中\nopenclaw configure\n# 找到 Cron Jobs\n\n# 方式二：手动添加\ncrontab -e\n```\n\n**Cron 表达式**：\n| 表达式 | 含义 |\n|--------|------|\n| 0 9 * * * | 每天 9 点 |\n| 0 9 * * 1-5 | 工作日 9 点 |\n| */30 * * * * | 每 30 分钟 |" },
      { title: "记忆系统 Memory", content: "主动工作需要「记住」更多信息。\n\n**记忆类型**：\n\n| 类型 | 存储位置 | 用途 |\n|------|----------|------|\n| 短期 | session | 对话上下文 |\n| 长期 | MEMORY.md | 重要记忆 |\n| 每日 | memory/日期.md | 日志 |\n\n**关键文件**：\n- `MEMORY.md` — 长期记忆，需要助手记住的事\n- `memory/YYYY-MM-DD.md` — 每日记录\n\n**让助手记住**：\n> 记住我喝咖啡不加糖\n\n下次它会记住。" },
      { title: "实战：设置早间简报", content: "**目标**：每天早上 9 点自动发来简报\n\n**Step 1：创建简报模板**\n\n在 AGENTS.md 中定义简报格式。\n\n**Step 2：配置 Cron**\n```bash\nopenclaw configure\n# 添加 cron job\n```\n\n**Step 3：定义任务**\n- 查天气\n- 查日历\n- 查重要邮件\n- 汇总成简报\n\n**效果**：每天早上收到一条消息："早上好！今天晴，22°C，下午 3 点有会..."\n\n这就是「主动工作」。" },
      { title: "实战：设置提醒", content: "**场景：提醒喝水**\n\n```bash\n# 每小时提醒一次\n0 * * * * remember-to-drink-water\n```\n\n**场景：下午提醒休息**\n```\n# 工作日下午6点\n0 18 * * 1-5 take-a-break\n```\n\n**场景：定期整理记忆**\n```\n# 每天午夜\n0 0 * * * memory-consolidation\n```\n\n**关键是**：让助手主动关心你，而不是每次都要你问。" },
      { title: "进阶：条件触发", content: "高级用法：满足条件才触发。\n\n**示例：重要邮件提醒**\n\n```yaml\nheartbeat:\n  tasks:\n    - name: important-email-alert\n      schedule: every-15-min\n      condition: new-important-email\n      action: notify-me\n```\n\n**示例：股票异常波动**\n\n```yaml\n    - name: stock-alert\n      schedule: every-5-min\n      condition: stock-change > 5%\n      action: notify-me\n```\n\n这才是真正的「智能助手」。" },
      { title: "本章要点", content: "- 心跳 = 主动醒来\n- Cron = 定点执行\n- MEMORY.md = 长期记忆\n- 主动提醒 > 被动回答\n- 从「奴隶」到「助手」" },
      { title: "今日成就", content: "今天完成了：\n\n- ✅ 理解心跳机制\n- ✅ 配置 Cron 任务\n- ✅ 设置早间简报\n- ✅ 添加提醒功能\n- ✅ 完善记忆系统\n\n**从今天起，助手不再是「你叫才动」，而是「主动关心」。**\n\n这是质的变化。" },
      { title: "Day 7", content: "最后一天，我们聊点「进阶」的——多 Agent 协作、自定义 Skills 开发、本地模型...以及更重要的是——如何持续优化你的助手。" }
    ],
    tasks: ["理解了心跳机制", "配置了 Cron 任务", "设置了早间简报", "添加了提醒功能", "完善了记忆系统"],
    preview: [{ day: "Day 7", title: "进阶与未来", result: "多Agent+自定义Skills" }]
  },
  "day-7": {
    title: "进阶与未来",
    intro: "恭喜你完成了前 6 天。但这只是开始。最后一天，我们聊点「进阶」的——以及如何让你的助手越来越强。",
    sections: [
      { title: "本章导读", content: "最后一天，我们聊：\n\n- 多 Agent 协作\n- 自定义 Skills 开发\n- 本地模型部署\n- 持续优化心法\n- 下一步去哪里" },
      { title: "你已经完成了什么？", content: "回顾一下 7 天：\n\n| 天数 | 成就 |\n|------|------|\n| Day 1 | 理解 AI 助手形态 |\n| Day 2 | 10分钟搭建助手 |\n| Day 3 | 给助手灵魂 |\n| Day 4 | 接入数字生活 |\n| Day 5 | 解锁技能树 |\n| Day 6 | 主动工作 |\n\n**你现在拥有一个**：\n- 24/7 在线\n- 有性格懂你\n- 能办事\n- 技能丰富\n- 主动关心\n\n的 AI 私人助理。\n\n这已经超过 99% 的人。" },
      { title: "多 Agent 协作", content: "一个助手能做事，几个助手能完成复杂任务。\n\n**场景**：\n- 一个负责邮件\n- 一个负责代码\n- 一个负责研究\n\n**实现**：\n```yaml\nagents:\n  - name: mail-agent\n    role: 邮件管理\n  - name: code-agent\n    role: 开发协助\n  - name: research-agent\n    role: 调研分析\n```\n\n**通讯方式**：\n- 通过 OpenClaw 内部消息\n- 通过飞书/Discord 群聊\n\n这就是「AI 团队」。" },
      { title: "自定义 Skills 开发", content: "市面上的 Skills 不够用？可以自己写。\n\n**Skill 结构**：\n```\nmy-skill/\n├── SKILL.md      # 技能说明书\n├── skill.ts      # 执行逻辑\n└── config.json   # 配置\n```\n\n**SKILL.md 示例**：\n```markdown\n# 我的技能\n\n## 能力\n- 查天气\n- 提醒喝水\n\n## 使用方法\n\"帮我查下天气\"\n\"提醒我喝水\"\n```\n\n**发布到 ClawHub**：\n```bash\nclawdhub publish my-skill\n```\n\n开源社区会感谢你。" },
      { title: "本地模型部署", content: "不想用 API？可以本地跑。\n\n**方案**：\n\n| 方案 | 特点 |\n|------|------|\n| Ollama | 简单易用 |\n| vLLM | 高性能 |\n| LM Studio | 桌面应用 |\n\n**配置 OpenClaw 使用本地模型**：\n```bash\nopenclaw configure\n# 找到 LLM 部分\n# 选择 Ollama\n# 输入模型名: llama3\n```\n\n**优点**：\n- 零 API 费用\n- 数据不出本地\n- 隐私绝对安全\n\n**缺点**：\n- 需要GPU\n- 响应可能较慢" },
      { title: "持续优化心法", content: "助手是「养」出来的，不是「建」出来的。\n\n**优化循环**：\n\n1. **使用** — 每天正常使用\n2. **发现问题** — \"它不懂我\"\n3. **调整** — 修改 SOUL.md/USER.md\n4. **验证** — 再用一周\n5. **重复**\n\n**常见调整**：\n- \"太啰嗦\" → 强调简洁\n- \"太正式\" → 改活泼\n- \"没记住我的项目\" → 更新 USER.md\n\n**建议**：\n- 第一周：基础配置，够用就行\n- 第二周：开始微调\n- 一个月后：趋于稳定\n\n**记住**：没有完美的配置，只有最适合你的配置。" },
      { title: "下一步去哪里？", content: "**继续学习**：\n\n- OpenClaw 官方文档\n- ClawHub Skills 市场\n- 社区 Discord\n\n**实战项目**：\n\n- 自动化工作流\n- 数据分析助手\n- 代码审查助手\n\n**贡献社区**：\n\n- 写 Skills\n- 分享配置\n- 回答问题\n\n**关注前沿**：\n\n- AI Agent 论文\n- 新模型发布\n- 新工具出现\n\n**你已经是 1% 了。继续前行。**" },
      { title: "本章要点", content: "- 多 Agent = AI 团队\n- 自定义 Skills = 扩展能力\n- 本地模型 = 隐私安全\n- 持续优化 = 越来越懂你\n- 7天只是开始" },
      { title: "毕业快乐！", content: "🎉 恭喜完成 7 天学习！\n\n**你现在的助手**：\n- ✅ 有灵魂\n- ✅ 能办事\n- ✅ 技能丰富\n- ✅ 主动工作\n- ✅ 持续进化\n\n**这是属于你的 AI 私人助理。**\n\n未来已来，你已经准备好了。\n\n— 赛博牛马 🐂" }
    ],
    tasks: ["完成了 7 天学习", "理解了多 Agent 协作", "了解了自定义 Skills", "了解了本地模型", "掌握了持续优化方法"],
    preview: [{ day: "完成", title: "毕业！", result: "拥有了自己的 AI 助手" }]
  }
}
