'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface Section {
  title: string
  content: string
}

interface PageData {
  id: number
  slug: string
  title: string
  intro: string
  sections: Section[]
  tasks: string[]
  preview: { day: string; title: string; result: string }[]
  resources: { title: string; url: string }[]
}

export default function DayPage() {
  const params = useParams()
  const day = params.id as string
  const [page, setPage] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (day) {
      loadPage()
    }
  }, [day])

  const loadPage = async () => {
    try {
      const slug = `day-${day}`
      const res = await fetch(`/api/pages?slug=${slug}&lang=zh`)
      const data = await res.json()
      
      if (data.success && data.data) {
        const pageData = data.data
        setPage({
          ...pageData,
          sections: typeof pageData.sections === 'string' ? JSON.parse(pageData.sections) : (pageData.sections || []),
          tasks: typeof pageData.tasks === 'string' ? JSON.parse(pageData.tasks) : (pageData.tasks || []),
          preview: typeof pageData.preview === 'string' ? JSON.parse(pageData.preview) : (pageData.preview || []),
          resources: typeof pageData.resources === 'string' ? JSON.parse(pageData.resources) : (pageData.resources || []),
        })
      } else {
        // Fallback content for Vercel
        setPage({
          id: parseInt(day),
          slug: `day-${day}`,
          title: getDefaultTitle(day),
          intro: getDefaultIntro(day),
          sections: getDefaultSections(day),
          tasks: getDefaultTasks(day),
          preview: getDefaultPreview(day),
          resources: []
        })
      }
    } catch (err) {
      setError('加载失败')
    } finally {
      setLoading(false)
    }
  }

  // Fallback functions for Vercel deployment
  const getDefaultTitle = (d: string) => {
    const titles: Record<string, string> = {
      '1': '初识 OpenClaw', '2': '10分钟搭建助手', '3': '给助手一个灵魂',
      '4': '接入数字生活', '5': '解锁技能树', '6': '让助手主动工作', '7': '进阶玩法'
    }
    return titles[d] || 'OpenClaw 教程'
  }

  const getDefaultIntro = (d: string) => {
    const intros: Record<string, string> = {
      '1': '了解 OpenClaw 是什么，它能为你做什么。',
      '2': '手把手教你搭建自己的 AI 助手。',
      '3': '通过配置 System Prompt 赋予助手人格和记忆。',
      '4': '将助手连接到各大平台：飞书、钉钉、Telegram 等。',
      '5': '安装社区技能，让助手具备各种超能力。',
      '6': '设置定时任务和心跳，让助手主动为你工作。',
      '7': '深入了解高级功能：多代理、浏览器控制等。'
    }
    return intros[d] || ''
  }

  const getDefaultSections = (d: string) => {
    const sections: Record<string, {title: string, content: string}[]> = {
      '1': [
        { title: '什么是 OpenClaw？', content: 'OpenClaw 是一个开源的 AI 助手框架，可以帮你搭建属于自己的 AI 助手。它支持多种平台接入，包括飞书、钉钉、Telegram、Discord 等。\n\n核心特点：\n• 24/7 在线，随时响应\n• 支持多平台接入\n• 可扩展的技能系统\n• 完全自托管，数据隐私安全' },
        { title: '为什么选择 OpenClaw？', content: '与 ChatGPT、Claude 等在线 AI 不同，OpenClaw 运行在你自己的服务器上：\n\n✓ 数据完全可控\n✓ 可自定义功能\n✓ 支持自动化任务\n✓ 集成到你的工作流' }
      ],
      '2': [
        { title: '环境准备', content: '在开始之前，你需要准备：\n\n1. Node.js 18+ \n2. pnpm（推荐）或 npm\n3. 一台服务器（本地电脑、云服务器均可）' },
        { title: '安装步骤', content: '1. 克隆仓库\n   git clone https://github.com/openclaw/openclaw.git\n\n2. 安装依赖\n   cd openclaw\n   pnpm install\n\n3. 启动服务\n   pnpm start\n\n4. 访问 http://localhost:8080' }
      ],
      '3': [
        { title: 'System Prompt 是什么？', content: 'System Prompt 是给 AI 助手的「灵魂设定」，决定了它的性格、说话方式、专业领域等。' },
        { title: '如何配置？', content: '在配置文件中修改 system_prompt 字段：\n\nconst systemPrompt = `\n你是一个乐于助人的 AI 助手...\n`\n\n详见官方文档配置章节。' }
      ],
      '4': [
        { title: '支持的平台', content: 'OpenClaw 支持多种平台：\n\n• 飞书\n• 钉钉\n• Telegram\n• Discord\n• WhatsApp\n• Signal\n• Slack\n• Web' },
        { title: '接入配置', content: '每个平台的接入方式略有不同，详见各平台的配置教程。' }
      ],
      '5': [
        { title: '技能系统', content: 'OpenClaw 的技能系统让它变得强大无比。从天气查询到代码生成，从图片识别到自动化任务，几乎无所不能。' },
        { title: '安装技能', content: '访问 ClawHub 技能市场，一键安装社区技能。' }
      ],
      '6': [
        { title: '定时任务', content: '让 AI 助手在特定时间执行任务，如每日汇报、提醒等。' },
        { title: '心跳机制', content: '心跳（Heartbeat）让 AI 可以主动检查和推送信息。' }
      ],
      '7': [
        { title: '高级功能', content: '深入探索 OpenClaw 的高级功能：\n\n• 多代理协作\n• 浏览器自动化控制\n• 设备集成\n• 自定义技能开发' },
        { title: '下一步', content: '恭喜完成 7 天学习！现在你可以：\n\n1. 部署到云服务器\n2. 接入更多平台\n3. 开发自己的技能\n4. 参与社区贡献' }
      ]
    }
    return sections[d] || []
  }

  const getDefaultTasks = (d: string) => {
    const tasks: Record<string, string[]> = {
      '1': ['了解 OpenClaw 核心概念', '阅读官方文档'],
      '2': ['完成本地安装', '启动服务并访问'],
      '3': ['编写自己的 System Prompt', '测试助手响应'],
      '4': ['选择一个平台完成接入', '发送消息测试'],
      '5': ['安装 3 个以上技能', '测试技能功能'],
      '6': ['设置一个定时任务', '配置心跳推送'],
      '7': ['部署到云服务器', '分享你的成果']
    }
    return tasks[d] || []
  }

  const getDefaultPreview = (d: string) => {
    const previews: Record<string, {day: string, title: string, result: string}[]> = {
      '1': [{ day: 'Day 2', title: '10分钟搭建助手', result: '运行起你的第一个 AI 助手' }],
      '2': [{ day: 'Day 3', title: '给助手一个灵魂', result: '通过 Prompt 塑造人格' }],
      '3': [{ day: 'Day 4', title: '接入数字生活', result: '连接各大通讯平台' }],
      '4': [{ day: 'Day 5', title: '解锁技能树', result: '安装超能力插件' }],
      '5': [{ day: 'Day 6', title: '让助手主动工作', result: '设置自动化任务' }],
      '6': [{ day: 'Day 7', title: '进阶玩法', result: '探索高级功能' }],
      '7': [{ day: '🎉', title: '恭喜毕业！', result: '你已掌握 OpenClaw' }]
    }
    return previews[d] || []
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-xl text-gray-600">加载中...</div>
        </div>
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-xl text-red-500">{error || '页面不存在'}</div>
      </div>
    )
  }

  const dayNum = parseInt(day)
  const prevDay = dayNum > 1 ? dayNum - 1 : null
  const nextDay = dayNum < 7 ? dayNum + 1 : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/zh" className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                OpenClaw大龙虾
              </span>
            </Link>
            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/zh" className="text-slate-600 hover:text-indigo-600 transition-colors">首页</Link>
              <Link href="/zh/skills" className="text-slate-600 hover:text-indigo-600 transition-colors">技能</Link>
              <Link href="/zh/resources" className="text-slate-600 hover:text-indigo-600 transition-colors">资源</Link>
              <Link href="/community" className="text-slate-600 hover:text-indigo-600 transition-colors">社区</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Day Badge */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700">
            Day {day}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-6 mb-4">
            {page.title}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {page.intro.replace(/"/g, '')}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {page.sections?.map((section, index) => (
            <section 
              key={index} 
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 text-sm font-bold">
                    {index + 1}
                  </span>
                  {section.title}
                </h2>
                <div className="prose prose-lg max-w-none text-slate-700 leading-loose whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Tasks */}
        {page.tasks && page.tasks.length > 0 && (
          <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mt-10 border border-amber-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              📋 今日任务
            </h2>
            <ul className="space-y-4">
              {page.tasks.map((task, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-slate-700 text-lg">{task}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Preview */}
        {page.preview && page.preview.length > 0 && (
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mt-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              🔮 明天预告
            </h2>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
              <div className="flex items-center gap-4">
                <span className="text-4xl">→</span>
                <div>
                  <div className="text-sm text-indigo-600 font-medium">{page.preview[0].day}</div>
                  <div className="text-xl font-semibold text-slate-800">{page.preview[0].title}</div>
                  <div className="text-slate-600">{page.preview[0].result}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Resources */}
        {page.resources && page.resources.length > 0 && (
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mt-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              📚 相关资源
            </h2>
            <div className="grid gap-3">
              {page.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 hover:bg-indigo-50 transition-colors group"
                >
                  <span className="text-indigo-600 group-hover:text-indigo-700">🔗</span>
                  <span className="text-slate-700 group-hover:text-indigo-700 font-medium">{resource.title}</span>
                  <span className="ml-auto text-slate-400 group-hover:text-indigo-500">→</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-slate-200">
          {prevDay ? (
            <Link
              href={`/zh/day/${prevDay}`}
              className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
            >
              ← Day {prevDay}
            </Link>
          ) : (
            <div />
          )}
          {nextDay ? (
            <Link
              href={`/zh/day/${nextDay}`}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Day {nextDay} →
            </Link>
          ) : (
            <Link
              href="/zh"
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              返回首页 →
            </Link>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          <p>© 2026 OpenClaw大龙虾. 从零开始的 AI 助手搭建指南。</p>
        </div>
      </footer>
    </div>
  )
}
