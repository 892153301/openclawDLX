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
}

const categories = [
  { id: '官方资源', name: 'Official', icon: '📖' },
  { id: '云平台部署', name: 'Cloud Deploy', icon: '☁️' },
  { id: '入门部署', name: 'Getting Started', icon: '🏁' },
  { id: '视频教程', name: 'Videos', icon: '📹' },
  { id: '深度文章', name: 'Deep Dives', icon: '🔬' },
  { id: '技能开发', name: 'Skills', icon: '🧩' },
  { id: '玩法与场景', name: 'Use Cases', icon: '💡' },
  { id: '工具与插件', name: 'Tools', icon: '🔧' },
]

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

  const stats = {
    total: resources.length,
    filtered: filtered.length,
    zh: resources.filter(r => r.lang === '中文').length,
    en: resources.filter(r => r.lang === 'EN').length,
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl">🐾 OpenClaw大龙虾</Link>
            <div className="flex items-center space-x-6">
              <Link href="/zh" className="hover:text-primary-600">中文</Link>
              <a href="https://github.com/mengjian-github/openclaw大龙虾" target="_blank" className="hover:text-primary-600">⭐ GitHub</a>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">📚 Curated Resources</h1>
        <p className="text-center text-gray-600 mb-8">Best Tutorials & Guides - From Alibaba Cloud to DigitalOcean</p>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4 mb-8 max-w-3xl mx-auto">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-primary-600">{stats.total}+</div>
            <div className="text-sm text-gray-500">Tutorials</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">{stats.zh}</div>
            <div className="text-sm text-gray-500">Chinese</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">{stats.en}</div>
            <div className="text-sm text-gray-500">English</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">{categories.length}</div>
            <div className="text-sm text-gray-500">Categories</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-orange-600">{stats.filtered}</div>
            <div className="text-sm text-gray-500">Results</div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <strong>Security Notice:</strong>
              <span className="text-gray-600"> Malicious skills found on ClawHub. Review source before installing.</span>
              <a href="https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html" target="_blank" className="text-primary-600 hover:underline ml-1">Details ↗</a>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search resources..."
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
            <option value="all">All Languages</option>
            <option value="中文">中文 Chinese</option>
            <option value="EN">English</option>
          </select>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
            ))}
          </select>
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No resources found</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((resource) => (
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
                  <span className="text-xs text-gray-400">{resource.source}</span>
                </div>
                <h3 className="font-semibold mb-1">{resource.title}</h3>
                <p className="text-sm text-gray-500">{resource.description}</p>
                <div className="mt-2">
                  <span className="text-xs text-gray-400">{resource.category}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      <footer className="py-8 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>OpenClaw大龙虾 - Open Source Guide</p>
        </div>
      </footer>
    </div>
  )
}
