'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Simple admin credentials - change these!
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'openclaw2026'

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

// Login Component
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLogin()
    } else {
      setError('用户名或密码错误')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🔐</div>
          <h1 className="text-2xl font-bold text-gray-800">管理后台登录</h1>
          <p className="text-gray-500 mt-2">请输入账户信息</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="admin"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
          >
            登录
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-indigo-600">← 返回首页</Link>
        </div>
      </div>
    </div>
  )
}

// Main Admin Content
function AdminContent() {
  const [activeTab, setActiveTab] = useState('settings')
  const [settings, setSettings] = useState<Setting[]>([])
  const [pages, setPages] = useState<Page[]>([])
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  
  const [siteName, setSiteName] = useState('')
  const [siteTagline, setSiteTagline] = useState('')
  const [primaryColor, setPrimaryColor] = useState('#6366f1')
  const [accentColor, setAccentColor] = useState('#8b5cf6')
  
  const [showResourceForm, setShowResourceForm] = useState(false)
  const [newResource, setNewResource] = useState({
    title: '', description: '', url: '', category: '入门部署', lang: '中文', source: ''
  })

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

        <div className="flex gap-2 mb-6 border-b">
          {[
            { id: 'settings', label: '🏠 站点设置' },
            { id: 'pages', label: '📄 页面管理' },
            { id: 'resources', label: '📚 资源管理' },
            { id: 'images', label: '🖼️ 图片管理' },
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

        <div className="bg-white rounded-b-lg rounded-tr-lg shadow-sm border p-6">
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">⚙️ 站点设置</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">网站名称</label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={e => setSiteName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">网站标语</label>
                  <input
                    type="text"
                    value={siteTagline}
                    onChange={e => setSiteTagline(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">主色调</label>
                  <div className="flex gap-3">
                    <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-16 h-10" />
                    <input type="text" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">强调色</label>
                  <div className="flex gap-3">
                    <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="w-16 h-10" />
                    <input type="text" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg" />
                  </div>
                </div>
              </div>

              <button onClick={saveSettings} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                💾 保存设置
              </button>
            </div>
          )}

          {activeTab === 'pages' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📄 页面管理</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pages.map(page => (
                  <div key={page.id} className="border rounded-xl p-4">
                    <h3 className="font-semibold text-lg">{page.title}</h3>
                    <p className="text-sm text-gray-500">/{page.slug}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">📚 资源管理</h2>
                <button onClick={() => setShowResourceForm(!showResourceForm)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                  {showResourceForm ? '取消' : '+ 添加资源'}
                </button>
              </div>

              {showResourceForm && (
                <form onSubmit={handleAddResource} className="bg-gray-50 p-6 rounded-xl space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" placeholder="标题 *" required value={newResource.title} onChange={e => setNewResource({...newResource, title: e.target.value})} className="px-3 py-2 border rounded-lg" />
                    <input type="text" placeholder="来源" value={newResource.source} onChange={e => setNewResource({...newResource, source: e.target.value})} className="px-3 py-2 border rounded-lg" />
                  </div>
                  <input type="text" placeholder="描述" value={newResource.description} onChange={e => setNewResource({...newResource, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                  <input type="url" placeholder="链接 *" required value={newResource.url} onChange={e => setNewResource({...newResource, url: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                  <div className="grid grid-cols-3 gap-4">
                    <select value={newResource.category} onChange={e => setNewResource({...newResource, category: e.target.value})} className="px-3 py-2 border rounded-lg">
                      <option>入门部署</option><option>云平台部署</option><option>官方资源</option>
                      <option>视频教程</option><option>深度文章</option><option>技能开发</option>
                    </select>
                    <select value={newResource.lang} onChange={e => setNewResource({...newResource, lang: e.target.value})} className="px-3 py-2 border rounded-lg">
                      <option>中文</option><option>EN</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg">添加资源</button>
                </form>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">标题</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">分类</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">语言</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {resources.map(resource => (
                      <tr key={resource.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.id}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{resource.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs rounded-full bg-gray-100">{resource.category}</span></td>
                        <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 text-xs rounded-full ${resource.lang === '中文' ? 'bg-green-100' : 'bg-blue-100'}`}>{resource.lang}</span></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button onClick={() => handleDeleteResource(resource.id)} className="text-red-600 hover:text-red-900">删除</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">🖼️ 图片管理</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl">
                  <div className="text-3xl mb-2">📅</div>
                  <div className="text-2xl font-bold text-green-600">课程封面</div>
                  <div className="text-sm text-green-700">/images/days/</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl">
                  <div className="text-3xl mb-2">💬</div>
                  <div className="text-2xl font-bold text-blue-600">微信群</div>
                  <div className="text-sm text-blue-700">wechat-qr.jpg</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl">
                  <div className="text-3xl mb-2">👤</div>
                  <div className="text-2xl font-bold text-purple-600">个人号</div>
                  <div className="text-sm text-purple-700">wechat-personal-qr.jpg</div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">📅 课程封面图片</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  {[1,2,3,4,5,6,7].map(day => (
                    <div key={day} className="border rounded-lg overflow-hidden">
                      <img 
                        src={`/images/days/day${day}-xiaomo.jpg`} 
                        alt={`Day ${day}`}
                        className="w-full h-32 object-cover"
                        onError={(e) => {e.currentTarget.style.display='none'}}
                      />
                      <div className="p-2 text-center text-sm">Day {day}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">💬 微信二维码</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <img src="/wechat-qr.jpg" alt="微信群" className="w-48 h-48 object-contain mx-auto" />
                    <div className="text-center mt-2 text-sm text-gray-600">微信群</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <img src="/wechat-personal-qr.jpg" alt="个人号" className="w-48 h-48 object-contain mx-auto" />
                    <div className="text-center mt-2 text-sm text-gray-600">个人号</div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 text-red-600">⚠️ 图片路径说明</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-sm font-mono">
                  <p>课程封面: /images/days/day1-xiaomo.jpg</p>
                  <p>微信群: /wechat-qr.jpg</p>
                  <p>个人号: /wechat-personal-qr.jpg</p>
                  <p>视频课程: /video-course-qr-code.jpg</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if already logged in (sessionStorage)
    const loggedIn = sessionStorage.getItem('adminLoggedIn')
    if (loggedIn) setIsLoggedIn(true)
  }, [])

  const handleLogin = () => {
    sessionStorage.setItem('adminLoggedIn', 'true')
    setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return <AdminContent />
}
