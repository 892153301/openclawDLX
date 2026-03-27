'use client'

import { useState, useEffect } from 'react'
import { Plus, Film, Trash2, Clock } from 'lucide-react'
import { Project } from '@/types'
import Link from 'next/link'
import { v4 as uuid } from 'uuid'

const STATUS_LABELS: Record<string, string> = {
  setup: '全局设定',
  script: '故事剧本',
  asset: '场景角色',
  storyboard: '分镜脚本',
  video: '分镜视频',
  audio: '配音对口型',
  preview: '视频预览',
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showNewForm, setShowNewForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newType, setNewType] = useState('古代传奇')
  const [newEra, setNewEra] = useState('汉代')

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(data.data || [])
    } catch (err) {
      console.error('Failed to fetch projects:', err)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreateProject() {
    if (!newTitle.trim()) return
    
    const project: Project = {
      id: uuid(),
      title: newTitle.trim(),
      type: newType,
      era: newEra,
      style: '电影级',
      synopsis: '',
      status: 'setup',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      })
      const data = await res.json()
      if (data.code === 0) {
        setProjects([data.data, ...projects])
        setShowNewForm(false)
        setNewTitle('')
        window.location.href = `/project/${data.data.id}`
      }
    } catch (err) {
      console.error('Failed to create project:', err)
    }
  }

  async function handleDeleteProject(id: string, e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!confirm('确定删除该项目？')) return
    
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      setProjects(projects.filter(p => p.id !== id))
    } catch (err) {
      console.error('Failed to delete project:', err)
    }
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-bg-border bg-bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">aigcmd 漫剧工坊</h1>
              <p className="text-xs text-text-secondary">aigcmd · AI视频创作平台</p>
            </div>
          </div>
          <button
            onClick={() => setShowNewForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            新建项目
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* New Project Form Modal */}
        {showNewForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-bg-card border border-bg-border rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-6">新建项目</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-2">项目名称</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="例如：霍去病"
                    className="input"
                    autoFocus
                    onKeyDown={e => e.key === 'Enter' && handleCreateProject()}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">类型</label>
                    <select 
                      value={newType} 
                      onChange={e => setNewType(e.target.value)}
                      className="input"
                    >
                      <option>古代传奇</option>
                      <option>武侠江湖</option>
                      <option>科幻未来</option>
                      <option>现代都市</option>
                      <option>奇幻冒险</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">时代</label>
                    <select 
                      value={newEra} 
                      onChange={e => setNewEra(e.target.value)}
                      className="input"
                    >
                      <option>汉代</option>
                      <option>唐代</option>
                      <option>宋代</option>
                      <option>明代</option>
                      <option>现代</option>
                      <option>未来</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={handleCreateProject} className="btn-primary flex-1">
                  创建项目
                </button>
                <button onClick={() => setShowNewForm(false)} className="btn-secondary">
                  取消
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Project Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <Film className="w-16 h-16 text-text-secondary mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-text-secondary mb-2">还没有项目</h3>
            <p className="text-text-secondary text-sm mb-6">创建一个新项目开始你的AI短剧创作</p>
            <button onClick={() => setShowNewForm(true)} className="btn-primary">
              创建第一个项目
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
              <Link key={project.id} href={`/project/${project.id}`}>
                <div className="card hover:border-accent-cyan/30 transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-text-primary group-hover:text-accent-cyan transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-text-secondary mt-1">
                        {project.type} · {project.era}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleDeleteProject(project.id, e)}
                      className="p-1 text-text-secondary hover:text-accent-red transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-accent-cyan/10 text-accent-cyan text-xs rounded">
                      {STATUS_LABELS[project.status] || project.status}
                    </span>
                  </div>

                  {project.synopsis && (
                    <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                      {project.synopsis}
                    </p>
                  )}

                  <div className="flex items-center gap-1 text-xs text-text-secondary">
                    <Clock className="w-3 h-3" />
                    {formatDate(project.updatedAt)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
