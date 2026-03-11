'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface SiteSettings {
  site_name: string
  site_tagline: string
  primary_color: string
  accent_color: string
}

export default function ChineseHome() {
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: 'OpenClaw大龙虾',
    site_tagline: '从零开始的 AI 助手搭建指南',
    primary_color: '#6366f1',
    accent_color: '#8b5cf6'
  })

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSettings(data.data)
        }
      })
  }, [])

  const skillCategories = [
    { icon: '🤖', name: '编程 Agent', count: 1222, slug: 'coding-agents-ides' },
    { icon: '🌐', name: '网页 & 前端', count: 938, slug: 'web-frontend-development' },
    { icon: '🔍', name: '搜索 & 研究', count: 350, slug: 'search-research' },
    { icon: '☁️', name: 'DevOps & 云', count: 409, slug: 'devops-cloud' },
    { icon: '🖥️', name: '浏览器 & 自动化', count: 335, slug: 'browser-automation' },
    { icon: '📹', name: '图像 & 视频', count: 169, slug: 'image-video-generation' },
    { icon: '💬', name: '通讯集成', count: 149, slug: 'communication' },
    { icon: '📅', name: '日历 & 日程', count: 65, slug: 'calendar-scheduling' },
    { icon: '📝', name: 'PDF & 文档', count: 111, slug: 'pdf-documents' },
    { icon: '🛒', name: '电商', count: 55, slug: 'shopping-e-commerce' },
    { icon: '✈️', name: '出行', count: 109, slug: 'transportation' },
    { icon: '🧠', name: 'AI & 大模型', count: 197, slug: 'ai-llms' },
  ]

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(to bottom, ${settings.primary_color}10, white)` }}>
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/zh" className="text-2xl font-bold" style={{ color: settings.primary_color }}>
              🐾 {settings.site_name}
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="#what-is" className="hover:opacity-80" style={{ color: settings.primary_color }}>学习</Link>
              <a href="/zh#skills" className="hover:opacity-80" style={{ color: settings.primary_color }}>技能</a>
              <Link href="#resources" className="hover:opacity-80" style={{ color: settings.primary_color }}>资源</Link>
              <Link href="/community" className="hover:opacity-80" style={{ color: settings.primary_color }}>社区</Link>
              <Link href="/" className="hover:opacity-80">🇺🇸 EN</Link>
              <a href="https://github.com/openclaw/openclaw" target="_blank" className="hover:opacity-80">⭐ GitHub</a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="py-20" style={{ background: `linear-gradient(to bottom, ${settings.primary_color}10, white)` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-gray-500 mb-4">开源免费 · 收录 379+ 篇教程资源</p>
            <h1 className="text-5xl font-bold mb-4" style={{ color: settings.primary_color }}>{settings.site_name}</h1>
            <p className="text-2xl text-gray-600 mb-4">{settings.site_tagline}</p>
            <p className="text-lg text-gray-500 mb-8">The open-source guide to building your AI assistant with OpenClaw</p>
            
            <div className="flex justify-center gap-4 mb-12">
              <Link href="#getting-started" className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition" style={{ background: settings.primary_color }}>
                🚀 开始学习 →
              </Link>
              <Link href="#resources" className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                📚 浏览资源
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div>
                <div className="text-3xl font-bold" style={{ color: settings.primary_color }}>379+</div>
                <div className="text-sm text-gray-500">教程收录</div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: settings.primary_color }}>7 天</div>
                <div className="text-sm text-gray-500">学习路径</div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: settings.primary_color }}>279k+</div>
                <div className="text-sm text-gray-500">GitHub Stars</div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: settings.primary_color }}>5494+</div>
                <div className="text-sm text-gray-500">社区技能</div>
              </div>
            </div>
          </div>
        </section>

        {/* What is OpenClaw */}
        <section id="what-is" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">什么是 OpenClaw？</h2>
            <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              OpenClaw 是一个开源 AI 助理平台，让你拥有一个 24/7 在线的私人 AI 助理。
              它能理解你、帮助你、为你执行任务。
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold mb-2">全平台接入</h3>
                <p className="text-gray-600">Telegram、Discord、WhatsApp、Signal 等多平台无缝连接，随时随地与你的AI助理对话。</p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">技能扩展</h3>
                <p className="text-gray-600">5494+ 社区技能，从天气查询到代码生成，一键安装即用。</p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">数据自主</h3>
                <p className="text-gray-600">完全自托管，数据存储在你自己的服务器上，隐私和安全尽在掌握。</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <a href="https://github.com/openclaw/openclaw" target="_blank" className="inline-flex items-center hover:opacity-80" style={{ color: settings.primary_color }}>
                <span className="text-2xl mr-2">⭐</span>
                279k+ Stars on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* 7 Day Learning Path */}
        <section id="getting-started" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">7天学习路径</h2>
            <p className="text-center text-gray-600 mb-12">从入门到进阶，每天一个主题，循序渐进掌握 OpenClaw 的全部能力。</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { day: 'DAY 1', icon: '👋', title: '初识 OpenClaw', desc: '了解 AI 私人助理的真正含义，以及 OpenClaw 能为你做什么。', link: '/zh/day/1' },
                { day: 'DAY 2', icon: '💬', title: '10分钟搭建助手', desc: '一行命令安装，连上 Telegram，发出第一条消息。', link: '/zh/day/2' },
                { day: 'DAY 3', icon: '📁', title: '给助手一个灵魂', desc: '编写 SOUL.md/USER.md/IDENTITY.md。', link: '/zh/day/3' },
                { day: 'DAY 4', icon: '🌐', title: '接入数字生活', desc: 'Gmail、日历、搜索、浏览器。', link: '/zh/day/4' },
                { day: 'DAY 5', icon: '🧩', title: '解锁技能树', desc: '安装 Skills 技能包。', link: '/zh/day/5' },
                { day: 'DAY 6', icon: '⏰', title: '让助手主动工作', desc: '心跳机制 + Cron 定时任务。', link: '/zh/day/6' },
                { day: 'DAY 7', icon: '🚀', title: '进阶玩法', desc: '自定义 Skill、多设备协作。', link: '/zh/day/7' },
              ].map((item, i) => (
                <Link key={i} href={item.link} className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition border-t-4" style={{ borderTopColor: settings.primary_color }}>
                  <div className="text-sm text-gray-500 mb-1">{item.day}</div>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="text-3xl font-bold mb-4">精选技能推荐</h2>
              <p className="text-gray-600">来自 awesome-openclaw-skills 的精选技能，涵盖 31 个分类。一键安装，即刻增强你的 AI 助理能力。</p>
            </div>

            <div className="flex justify-center gap-16 mb-12">
              <div className="text-center">
                <div className="text-5xl font-bold" style={{ color: settings.primary_color }}>5494+</div>
                <div className="text-lg text-gray-600">总技能数</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold" style={{ color: settings.primary_color }}>22</div>
                <div className="text-lg text-gray-600">分类数</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {skillCategories.map((cat, i) => (
                <a 
                  key={i} 
                  href={`https://clawhub.ai/skill/${cat.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border rounded-lg hover:shadow-md transition bg-white block"
                >
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <div className="font-semibold">{cat.name}</div>
                  <div className="text-sm text-gray-500">{cat.count}</div>
                </a>
              ))}
            </div>

            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-center mb-4">一键安装任意技能</h3>
              <p className="text-center text-gray-600 mb-4">使用 ClawHub CLI 快速安装</p>
              <div className="bg-slate-900 rounded-xl p-6 text-center">
                <p className="font-mono text-lg text-green-400">npx clawhub@latest install &lt;skill-name&gt;</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a href="https://clawhub.com" target="_blank" className="inline-block px-6 py-3 text-white rounded-lg hover:opacity-90 transition" style={{ background: settings.primary_color }}>
                访问 ClawHub →
              </a>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">📚 精选收录</h2>
            <p className="text-center text-gray-600 mb-4">全网优质资源聚合</p>
            
            <div className="grid grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: settings.primary_color }}>379+</div>
                <div className="text-sm text-gray-500">篇教程</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: settings.primary_color }}>48</div>
                <div className="text-sm text-gray-500">中文资源</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: settings.primary_color }}>331</div>
                <div className="text-sm text-gray-500">英文资源</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: settings.primary_color }}>9</div>
                <div className="text-sm text-gray-500">大分类</div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/zh/resources" className="inline-block px-6 py-3 text-white rounded-lg hover:opacity-90 transition" style={{ background: settings.primary_color }}>
                查看全部资源 →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>© 2026 {settings.site_name} - 开源免费学习指南</p>
        </div>
      </footer>
    </div>
  )
}
