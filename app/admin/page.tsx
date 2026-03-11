'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Setting {
  key: string
  value: string
}

interface Page {
  id: number
  slug: string
  lang: string
  title: string
  updated_at: string
}

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

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('settings')
  const [settings, setSettings] = useState<Setting[]>([])
  const [pages, setPages] = useState<Page[]>([])
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  
  // Settings form
  const [siteName, setSiteName] = useState('')
  const [siteTagline, setSiteTagline] = useState('')
  const [primaryColor, setPrimaryColor] = useState('#6366f1')
  const [accentColor, setAccentColor] = useState('#8b5cf6')
  
  // Resource form
  const [showResourceForm, setShowResourceForm] = useState(false)
  const [newResource, setNewResource] = useState({
    title: '', description: '', url: '', category: '入门部署', lang: '中文', source: ''
  })
  
  // Page editing
  const [editingPage, setEditingPage] = useState<Page | null>(null)
  const [pageContent, setPageContent] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [settingsRes, pagesRes, resourcesRes] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/pages?lang=zh'),
        fetch('/api/resources')
      ])
      
      const settingsData = await settingsRes.json()
      const pagesData = await pagesRes.json()
      const resourcesData = await resourcesRes.json()
      
      if (settingsData.success) {
        setSettings(Object.entries(settingsData.data).map(([key, value]) => ({ key, value: value as string })))
        setSiteName(settingsData.data.site_name || '')
        setSiteTagline(settingsData.data.site_tagline || '')
        setPrimaryColor(settingsData.data.primary_color || '#6366f1')
        setAccentColor(settingsData.data.accent_color || '#8b5cf6')
      }
      
      if (pagesData.success) setPages(pagesData.data)
      if (resourcesData.success) setResources(resourcesData.data)
    } catch (error) {
      console.error('Failed to load:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site_name: siteName,
          site_tagline: siteTagline,
          primary_color: primaryColor,
          accent_color: accentColor
        })
      })
      const data = await res.json()
      if (data.success) {
        alert('✅ 网站设置已保存！')
        loadData()
      }
    } catch (error) {
      alert('保存失败')
    }
  }

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResource)
      })
      const data = await res.json()
      if (data.success) {
        alert('添加成功！')
        setShowResourceForm(false)
        setNewResource({ title: '', description: '', url: '', category: '入门部署', lang: '中文', source: '' })
        loadData()
      }
    } catch (error) {
      alert('添加失败')
    }
  }

  const handleDeleteResource = async (id: number) => {
    if (!confirm('确定删除？')) return
    try {
      await fetch(`/api/resources?id=${id}`, { method: 'DELETE' })
      alert('删除成功')
      loadData()
    } catch (error) {
      alert('删除失败')
    }
  }

  const stats = {
    totalResources: resources.length,
    zhResources: resources.filter(r => r.lang === '中文').length,
    enResources: resources.filter(r => r.lang === 'EN').length,
    totalPages: pages.length,
    settingsCount: settings.length
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">加载中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              🐾 {siteName || 'OpenClaw 101'}
            </Link>
            <span className="text-gray-500">|</span>
            <span className="text-lg font-semibold text-gray-700">管理后台</span>
          </div>
          <Link href="/" className="text-primary-600 hover:underline flex items-center gap-2">
            ← 返回网站
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-indigo-600">{stats.totalResources}</div>
            <div className="text-sm text-gray-500">资源总数</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-green-600">{stats.zhResources}</div>
            <div className="text-sm text-gray-500">中文资源</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-blue-600">{stats.enResources}</div>
            <div className="text-sm text-gray-500">英文资源</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-purple-600">{stats.totalPages}</div>
            <div className="text-sm text-gray-500">课程页面</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-orange-600">{stats.settingsCount}</div>
            <div className="text-sm text-gray-500">网站配置</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b">
          {[
            { id: 'settings', label: '🏠 站点设置', icon: '🏠' },
            { id: 'pages', label: '📄 页面管理', icon: '📄' },
            { id: 'resources', label: '📚 资源管理', icon: '📚' },
            { id: 'images', label: '🖼️ 图片管理', icon: '🖼️' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-white border-t border-x border-gray-200 text-indigo-600 -mb-px'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-lg rounded-tr-lg shadow-sm border p-6">
          
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">⚙️ 站点设置</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    网站名称
                  </label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={e => setSiteName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="OpenClaw 101"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    网站标语
                  </label>
                  <input
                    type="text"
                    value={siteTagline}
                    onChange={e => setSiteTagline(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="从零开始的 AI 助手搭建指南"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    主色调
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={e => setPrimaryColor(e.target.value)}
                      className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={e => setPrimaryColor(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    强调色
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={e => setAccentColor(e.target.value)}
                      className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={e => setAccentColor(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={saveSettings}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                >
                  💾 保存设置
                </button>
                <button
                  onClick={loadData}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  🔄 刷新
                </button>
              </div>

              {/* Preview */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-medium text-gray-500 mb-4">预览效果</h3>
                <div 
                  className="p-6 rounded-xl"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)` }}
                >
                  <h4 className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {siteName || '网站名称'}
                  </h4>
                  <p className="text-gray-600 mt-2">{siteTagline || '网站标语'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Pages Tab */}
          {activeTab === 'pages' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📄 页面管理</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pages.map(page => (
                  <div key={page.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg text-gray-800">{page.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">/{page.slug}</p>
                    <div className="flex gap-2 mt-4">
                      <a 
                        href={`/zh/${page.slug.replace('day-', 'day/')}`}
                        target="_blank"
                        className="text-sm text-indigo-600 hover:underline"
                      >
                        查看 →
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800">💡 提示</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  页面内容已从数据库加载。要编辑页面内容，请切换到对应课程页面进行预览。
                  当前版本已完整导入原站7天课程内容。
                </p>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">📚 资源管理</h2>
                <button
                  onClick={() => setShowResourceForm(!showResourceForm)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {showResourceForm ? '取消' : '+ 添加资源'}
                </button>
              </div>

              {showResourceForm && (
                <form onSubmit={handleAddResource} className="bg-gray-50 p-6 rounded-xl space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">标题 *</label>
                      <input
                        type="text"
                        required
                        value={newResource.title}
                        onChange={e => setNewResource({...newResource, title: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">来源</label>
                      <input
                        type="text"
                        value={newResource.source}
                        onChange={e => setNewResource({...newResource, source: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">描述</label>
                    <input
                      type="text"
                      value={newResource.description}
                      onChange={e => setNewResource({...newResource, description: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">链接 *</label>
                    <input
                      type="url"
                      required
                      value={newResource.url}
                      onChange={e => setNewResource({...newResource, url: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">分类</label>
                      <select
                        value={newResource.category}
                        onChange={e => setNewResource({...newResource, category: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg"
                      >
                        <option>入门部署</option>
                        <option>云平台部署</option>
                        <option>官方资源</option>
                        <option>视频教程</option>
                        <option>深度文章</option>
                        <option>技能开发</option>
                        <option>玩法与场景</option>
                        <option>平台接入</option>
                        <option>工具与插件</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">语言</label>
                      <select
                        value={newResource.lang}
                        onChange={e => setNewResource({...newResource, lang: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg"
                      >
                        <option>中文</option>
                        <option>EN</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    添加资源
                  </button>
                </form>
              )}

              {/* Resource List */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">标题</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">分类</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">语言</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">来源</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {resources.map(resource => (
                      <tr key={resource.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.id}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{resource.title}</div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">{resource.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100">
                            {resource.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            resource.lang === '中文' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {resource.lang}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.source}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <a href={resource.url} target="_blank" className="text-indigo-600 hover:text-indigo-900 mr-3">查看</a>
                          <button 
                            onClick={() => handleDeleteResource(resource.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            删除
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Images Tab */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">🖼️ 图片管理</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                <div className="text-6xl mb-4">📁</div>
                <h3 className="text-lg font-medium text-gray-800">上传图片</h3>
                <p className="text-gray-500 mt-2">拖拽文件到此处，或点击选择</p>
                <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  选择文件
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800">💡 功能开发中</h4>
                <p className="text-sm text-blue-700 mt-1">
                  图片管理功能即将推出，支持上传、裁剪、压缩等功能。
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
