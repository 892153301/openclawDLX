const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'openclaw101.db');
const fs = require('fs');

// 确保目录存在
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const db = new Database(dbPath);

// 创建资源表
db.exec(`
  CREATE TABLE IF NOT EXISTS resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    category TEXT,
    lang TEXT DEFAULT 'EN',
    source TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// 创建技能表
db.exec(`
  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    stars INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// 插入示例资源数据
const existingResources = db.prepare('SELECT COUNT(*) as count FROM resources').get();
if (existingResources.count === 0) {
  const insertResource = db.prepare(`
    INSERT INTO resources (title, description, url, category, lang, source)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const resources = [
    ['OpenClaw 官方文档', '完整的 API 参考、配置指南和架构说明', 'https://docs.openclaw.ai', '官方资源', 'EN', 'OpenClaw'],
    ['GitHub — openclaw/openclaw', '源代码、Issue 跟踪和社区贡献指南', 'https://github.com/openclaw/openclaw', '官方资源', 'EN', 'GitHub'],
    ['ClawHub 技能市场', '发现、安装和分享 AI 技能插件', 'https://clawhub.com', '官方资源', 'EN', 'ClawHub'],
    ['阿里云 — 部署 OpenClaw 构建钉钉 AI 助理', '轻量应用服务器一键部署', 'https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw', '云平台部署', '中文', '阿里云'],
    ['腾讯云 — OpenClaw 接入飞书保姆级教程', 'Lighthouse 一键部署 + 飞书机器人', 'https://cloud.tencent.com/developer/article/2625073', '云平台部署', '中文', '腾讯云'],
    ['B站 — OpenClaw 海量全玩法攻略', '国内网络使用 + 本地部署', 'https://www.bilibili.com/video/BV1kH6nBFEPq/', '视频教程', '中文', 'Bilibili'],
  ];

  for (const r of resources) {
    insertResource.run(...r);
  }
  
  console.log('数据库初始化完成！');
} else {
  console.log('数据库已存在，跳过初始化。');
}

module.exports = db;
