'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// Simple admin credentials
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'openclaw2026'

// Image categories
const IMAGE_CATEGORIES = [
  { id: 'days', label: '📅 课程封面', path: '/images/days/', subPath: '' },
  { id: 'day2', label: '📅 Day 2 详细图', path: '/images/days/day2/', subPath: 'day2/' },
  { id: 'wechat', label: '💬 微信二维码', path: '/', subPath: '' },
  { id: 'course', label: '📺 视频课程', path: '/', subPath: '' },
]

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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="admin"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
  const [activeTab, setActiveTab] = useState('images')
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  
  // Image management state
  const [imageCategories, setImageCategories] = useState(IMAGE_CATEGORIES)
  const [selectedCategory, setSelectedCategory] = useState('days')
  const [uploadStatus, setUploadStatus] = useState('')
  const [images, setImages] = useState<Record<string, { name: string; path: string; uploadedAt: string }[]>>({})
  
  // Form states
  const [siteName, setSiteName] = useState('')
  const [siteTagline, setSiteTagline] = useState('')
  const [primaryColor, setPrimaryColor] = useState('#6366f1')
  const [accentColor, setAccentColor] = useState('#8b5cf6')
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadData()
    loadImages()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const settingsRes = await fetch('/api/settings')
      const settingsData = await settingsRes.json()
      if (settingsData.success) {
        setSettings(settingsData.data)
        setSiteName(settingsData.data.site_name || '')
        setSiteTagline(settingsData.data.site_tagline || '')
        setPrimaryColor(settingsData.data.primary_color || '#6366f1')
        setAccentColor(settingsData.data.accent_color || '#8b5cf6')
      }
    } catch (error) {
      console.error('Failed to load:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadImages = async () => {
    try {
      const res = await fetch('/api/images')
      const data = await res.json()
      if (data.success) {
        setImages(data.data)
      }
    } catch (error) {
      console.error('Failed to load images:', error)
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

  const handleDeleteImage = async (category: string, imageName: string) => {
    if (!confirm(`确定要删除 ${imageName} 吗？`)) return
    
    try {
      const res = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          category,
          imageName
        })
      })
      const data = await res.json()
      if (data.success) {
        alert('✅ 图片已删除')
        loadImages()
      }
    } catch (error) {
      alert('删除失败')
    }
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setUploadStatus('上传中...')
    
    // For Vercel, we'd need a storage solution. For now, show instructions
    const category = selectedCategory
    const imagePath = IMAGE_CATEGORIES.find(c => c.id === category)?.path || '/'
    
    try {
      const res = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add',
          category,
          imageName: file.name,
          imagePath: imagePath + file.name
        })
      })
      const data = await res.json()
      if (data.success) {
        setUploadStatus('✅ 图片已添加到列表！请通过 GitHub 上传实际图片文件')
        loadImages()
      } else {
        setUploadStatus('❌ 上传失败')
      }
    } catch (error) {
      setUploadStatus('❌ 上传失败')
    }
    
    setTimeout(() => setUploadStatus(''), 3000)
  }

  const getCurrentCategoryImages = () => {
    return images[selectedCategory] || []
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
          <Link href="/" className="text-indigo-600 hover:underline flex items-center gap-2">
            ← 返回网站
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6 border-b">
          {[
            { id: 'images', label: '🖼️ 图片管理' },
            { id: 'settings', label: '⚙️ 站点设置' },
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

          {activeTab === 'images' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">🖼️ 图片管理</h2>
              
              {/* Category Tabs */}
              <div className="flex gap-2 flex-wrap mb-6">
                {IMAGE_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Upload Section */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">📁</div>
                  <p className="text-gray-600 mb-2">点击选择图片或拖拽到此处</p>
                  <p className="text-sm text-gray-400 mb-4">支持 JPG, PNG, GIF 格式</p>
                  <input 
                    type="file" 
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleUploadImage}
                    className="hidden"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    选择图片
                  </button>
                  {uploadStatus && (
                    <p className={`mt-4 ${uploadStatus.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                      {uploadStatus}
                    </p>
                  )}
                </div>
              </div>

              {/* Images Grid */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {IMAGE_CATEGORIES.find(c => c.id === selectedCategory)?.label} ({getCurrentCategoryImages().length}张)
                </h3>
                
                {getCurrentCategoryImages().length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    暂无图片
                  </div>
                ) : (
                  <div className="grid md:grid-cols-4 gap-4">
                    {getCurrentCategoryImages().map((img, idx) => (
                      <div key={idx} className="border rounded-lg overflow-hidden group">
                        <div className="relative h-40 bg-gray-100">
                          <img 
                            src={img.path} 
                            alt={img.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50%" x="50%" text-anchor="middle" dy=".3em">📷</text></svg>'
                            }}
                          />
                          <button
                            onClick={() => handleDeleteImage(selectedCategory, img.name)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                        <div className="p-2">
                          <p className="text-sm font-medium truncate">{img.name}</p>
                          <p className="text-xs text-gray-500">{img.uploadedAt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Path Info */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">📍 当前分类路径</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                  <p>路径前缀: {IMAGE_CATEGORIES.find(c => c.id === selectedCategory)?.path}</p>
                  <p className="text-gray-500 mt-2">提示: 图片需要通过 GitHub 上传到 public 目录</p>
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
