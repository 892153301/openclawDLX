'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface PageData {
  slug: string
  title: string
  content: string
}

const DAYS = [1, 2, 3, 4, 5, 6, 7]

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
        setPage(data.data)
      } else {
        setError('页面未找到')
      }
    } catch (err) {
      setError('加载失败')
    } finally {
      setLoading(false)
    }
  }

  const dayNum = parseInt(day)
  const prevDay = dayNum > 1 ? dayNum - 1 : null
  const nextDay = dayNum < 7 ? dayNum + 1 : null

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">页面未找到</h1>
          <Link href="/zh" className="text-indigo-600 hover:underline">返回首页</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/zh" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span>←</span>
            <span>返回首页</span>
          </Link>
          <div className="text-sm text-gray-500">
            第 {day} / 7 天
          </div>
        </div>
      </header>
      
      {/* Progress bar */}
      <div className="h-1 bg-gray-800">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${(dayNum / 7) * 100}%` }}
        />
      </div>
      
      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({children}) => <h1 className="text-4xl font-bold mb-6 text-white">{children}</h1>,
              h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-white border-b border-gray-700 pb-2">{children}</h2>,
              h3: ({children}) => <h3 className="text-xl font-bold mt-6 mb-3 text-white">{children}</h3>,
              p: ({children}) => <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>,
              ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-2">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-300 space-y-2">{children}</ol>,
              li: ({children}) => <li className="text-gray-300">{children}</li>,
              blockquote: ({children}) => <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 my-6 text-xl text-gray-200 italic bg-gray-800/50 rounded-r">{children}</blockquote>,
              code: ({children, className}) => {
                if (className) {
                  return <code className={`${className} bg-gray-800 px-2 py-1 rounded text-sm`}>{children}</code>
                }
                return <code className="bg-gray-800 px-2 py-1 rounded text-sm text-purple-400">{children}</code>
              },
              pre: ({children}) => <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
              table: ({children}) => <div className="overflow-x-auto mb-6"><table className="min-w-full border border-gray-700">{children}</table></div>,
              thead: ({children}) => <thead className="bg-gray-800">{children}</thead>,
              th: ({children}) => <th className="border border-gray-700 px-4 py-2 text-left text-white">{children}</th>,
              td: ({children}) => <td className="border border-gray-700 px-4 py-2 text-gray-300">{children}</td>,
              a: ({children, href}) => <a href={href} className="text-indigo-400 hover:underline">{children}</a>,
              strong: ({children}) => <strong className="text-white font-bold">{children}</strong>,
              em: ({children}) => <em className="text-gray-300 italic">{children}</em>,
              img: ({src, alt}) => <img src={src} alt={alt} className="max-w-full h-auto rounded-lg my-4" />,
            }}
          >
            {page.content}
          </ReactMarkdown>
        </article>
      </main>
      
      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-8 border-t border-gray-800">
        <div className="flex justify-between">
          {prevDay ? (
            <Link href={`/zh/day/${prevDay}`} className="flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition">
              <span>←</span>
              <span>上一天</span>
            </Link>
          ) : <div />}
          
          {nextDay ? (
            <Link href={`/zh/day/${nextDay}`} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              <span>下一天</span>
              <span>→</span>
            </Link>
          ) : (
            <Link href="/zh" className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              <span>返回首页</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
