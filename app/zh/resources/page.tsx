'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Resource {
  id: number
  title: string
  description: string
  url: string
  category: string
  lang: string
  source: string
  starred: number
}

const categoryInfo: Record<string, { icon: string; name: string; nameEn: string }> = {
  '官方资源': { icon: '📖', name: '官方资源', nameEn: 'Official' },
  '云平台部署': { icon: '☁️', name: '云平台部署', nameEn: 'Cloud Deploy' },
  '入门部署': { icon: '🏁', name: '入门部署', nameEn: 'Getting Started' },
  '平台接入': { icon: '📱', name: '平台接入', nameEn: 'Platform Integration' },
  '视频教程': { icon: '📹', name: '视频教程', nameEn: 'Videos' },
  '深度文章': { icon: '🔬', name: '深度文章', nameEn: 'Deep Dives' },
  '技能开发': { icon: '🧩', name: '技能开发', nameEn: 'Skills Dev' },
  '玩法与场景': { icon: '💡', name: '玩法与场景', nameEn: 'Use Cases' },
  '工具与插件': { icon: '🔧', name: '工具与插件', nameEn: 'Tools' },
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterLang, setFilterLang] = useState<string>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  useEffect(() => {
    fetch('/api/resources')
      .then(res => res.json())
      .then(data => {
        if (data.success) setResources(data.data)
      })
      .finally(() => setLoading(false))
  }, [])

  const filtered = resources.filter(r => {
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && 
        !r.description.toLowerCase().includes(search.toLowerCase())) return false
    if (filterLang !== 'all' && r.lang !== filterLang) return false
    if (filterCategory !== 'all' && r.category !== filterCategory) return false
    return true
  })

  // Group by category
  const grouped = filtered.reduce((acc, r) => {
    if (!acc[r.category]) acc[r.category] = []
    acc[r.category].push(r)
    return acc
  }, {} as Record<string, Resource[]>)

  const stats = {
    total: resources.length,
    filtered: filtered.length,
    zh: resources.filter(r => r.lang === '中文').length,
    en: resources.filter(r => r.lang === 'EN').length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/zh" className="text-2xl">🐾 OpenClaw 101</Link>
            <div className="flex items-center space-x-6">
              <Link href="/zh" className="hover:text-primary-600">首页</Link>
              <Link href="/zh/skills" className="hover:text-primary-600">技能</Link>
              <Link href="/zh/resources" className="text-primary-600 font-medium">资源</Link>
              <Link href="/" className="hover:text-primary-600">🇺🇸 EN</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">📚 全网资源聚合</h1>
        <p className="text-center text-gray-600 mb-8">从阿里云、腾讯云到 DigitalOcean，从 B站到 Codecademy —— 一站式获取 OpenClaw 最佳教程</p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-primary-600">{stats.total}+</div>
            <div className="text-sm text-gray-500">篇教程</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-green-600">{stats.zh}</div>
            <div className="text-sm text-gray-500">中文资源</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-blue-600">{stats.en}</div>
            <div className="text-sm text-gray-500">英文资源</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-purple-600">{Object.keys(categoryInfo).length}</div>
            <div className="text-sm text-gray-500">大分类</div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <strong>安全提醒：</strong>
              <span className="text-gray-600"> 近期发现有恶意 Skills 通过 ClawHub 分发，窃取用户数据。安装第三方 Skill 前请务必检查源码，优先使用官方或社区审核的 Skills。</span>
              <a href="https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html" target="_blank" className="text-primary-600 hover:underline ml-1">详情 ↗</a>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="搜索资源..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <select
            value={filterLang}
            onChange={e => setFilterLang(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">全部语言</option>
            <option value="中文">中文</option>
            <option value="EN">English</option>
          </select>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">全部分类</option>
            {Object.entries(categoryInfo).map(([key, info]) => (
              <option key={key} value={key}>{info.icon} {info.name}</option>
            ))}
          </select>
        </div>

        {/* Category Sections */}
        {loading ? (
          <div className="text-center py-12">加载中...</div>
        ) : filterCategory !== 'all' ? (
          // Single category view
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{categoryInfo[filterCategory]?.icon}</span>
              <h2 className="text-2xl font-bold">{filterCategory}</h2>
              <span className="text-gray-500">({grouped[filterCategory]?.length || 0} 篇)</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {grouped[filterCategory]?.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  className="p-4 bg-white border rounded-lg hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      resource.lang === '中文' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {resource.lang}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-1">{resource.title}</h3>
                  <p className="text-sm text-gray-500">{resource.description}</p>
                  <p className="text-xs text-gray-400 mt-2">{resource.source} 打开 →</p>
                </a>
              ))}
            </div>
          </div>
        ) : (
          // All categories view
          <div className="space-y-12">
            {Object.entries(categoryInfo).map(([catName, info]) => {
              const catResources = grouped[catName] || []
              if (catResources.length === 0) return null
              return (
                <section key={catName}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{info.icon}</span>
                    <h2 className="text-2xl font-bold">{info.name}</h2>
                    <span className="text-gray-500">({catResources.length} 篇)</span>
                    {catName === '入门部署' && <span className="text-xs text-gray-400 ml-2">来自 OpenClaw 团队的第一手资料</span>}
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catResources.slice(0, 9).map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        className="p-4 bg-white border rounded-lg hover:shadow-md transition group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            resource.lang === '中文' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {resource.lang}
                          </span>
                          {resource.starred === 1 && <span className="text-yellow-500">⭐</span>}
                        </div>
                        <h3 className="font-semibold mb-1 group-hover:text-primary-600">{resource.title}</h3>
                        <p className="text-sm text-gray-500">{resource.description}</p>
                        <p className="text-xs text-gray-400 mt-2">{resource.source} 打开 →</p>
                      </a>
                    ))}
                  </div>
                  {catResources.length > 9 && (
                    <div className="mt-4 text-center">
                      <button 
                        onClick={() => setFilterCategory(catName)}
                        className="text-primary-600 hover:underline"
                      >
                        查看全部 {catResources.length} 篇 →
                      </button>
                    </div>
                  )}
                </section>
              )
            })}
          </div>
        )}
      </main>

      <footer className="py-8 border-t mt-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>OpenClaw 101 - 开源免费学习指南</p>
        </div>
      </footer>
    </div>
  )
}
