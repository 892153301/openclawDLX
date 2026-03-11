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
          sections: typeof pageData.sections === 'string' ? JSON.parse(pageData.sections) : pageData.sections,
          tasks: typeof pageData.tasks === 'string' ? JSON.parse(pageData.tasks) : pageData.tasks,
          preview: typeof pageData.preview === 'string' ? JSON.parse(pageData.preview) : pageData.preview,
          resources: typeof pageData.resources === 'string' ? JSON.parse(pageData.resources) : pageData.resources,
        })
      } else {
        setError('页面未找到')
      }
    } catch (err) {
      setError('加载失败')
    } finally {
      setLoading(false)
    }
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
                OpenClaw 101
              </span>
            </Link>
            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/zh" className="text-slate-600 hover:text-indigo-600 transition-colors">首页</Link>
              <Link href="/zh/skills" className="text-slate-600 hover:text-indigo-600 transition-colors">技能</Link>
              <Link href="/zh/resources" className="text-slate-600 hover:text-indigo-600 transition-colors">资源</Link>
              <Link href="/admin" className="text-slate-600 hover:text-indigo-600 transition-colors">管理</Link>
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
          <p>© 2026 OpenClaw 101. 从零开始的 AI 助手搭建指南。</p>
        </div>
      </footer>
    </div>
  )
}
