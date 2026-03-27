'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Play, AlertCircle, FileText, Users, Mountain, Clapperboard, Video, Mic, CheckCircle, Loader2 } from 'lucide-react'

type StepNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7

interface Project {
  id: string
  title: string
  type: string
  era: string
  style: string
  status: string
  synopsis?: string
}

function Badge({ children, variant }: { children: React.ReactNode; variant?: string }) {
  const colors = {
    default: 'bg-bg-border text-text-primary',
    primary: 'bg-accent-cyan/20 text-accent-cyan',
    secondary: 'bg-bg-primary text-text-secondary',
  }
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[variant as keyof typeof colors] || colors.default}`}>
      {children}
    </span>
  )
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [characters, setCharacters] = useState<any[]>([])
  const [scenes, setScenes] = useState<any[]>([])
  const [storyboard, setStoryboard] = useState<any>(null)
  const [materials, setMaterials] = useState<any[]>([])
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [currentStep, setCurrentStep] = useState<StepNumber>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [moreMenu, setMoreMenu] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [previewVideo, setPreviewVideo] = useState<string | null>(null)
  const [audioConfig, setAudioConfig] = useState({ voice: 'male-deep', speed: 1.0, hasAudio: false, audioUrl: '' })
  const [scriptText, setScriptText] = useState('')
  const [parseStatus, setParseStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  
  // Step 5 视频生成配置
  const [videoConfig, setVideoConfig] = useState({
    aspectRatio: '16:9',
    scriptType: 'drama', // drama | talking-head
    modelStrategy: 'economy', // economy | quality
    creationMode: 'image-to-video', // image-to-video | multi-param
    storyboardMode: 'nine-grid', // single | nine-grid
    style: 'realistic-movie',
    styleLibraryExpanded: true,
  })
  
  // Step 3 标签页状态
  const [assetTab, setAssetTab] = useState<'scene' | 'character' | 'props'>('scene')
  
  // 从场景中提取所有道具
  const allProps = scenes.flatMap((s: any) => s.props || []).filter((p: string, i: number, arr: string[]) => arr.indexOf(p) === i)
  
  // Step 4 视图切换状态
  const [storyboardView, setStoryboardView] = useState<'list' | 'card'>('list')
  
  // Step 4 编辑状态
  const [editingShot, setEditingShot] = useState<number | null>(null)
  const [editScript, setEditScript] = useState('')
  const [editingShotData, setEditingShotData] = useState<any>(null)
  const [previewVideo7, setPreviewVideo7] = useState<string | null>(null)
  const videoRef7 = useRef<HTMLVideoElement>(null)

  // Step 3 编辑弹窗状态
  const [editingScene, setEditingScene] = useState<any>(null)
  const [editingCharacter, setEditingCharacter] = useState<any>(null)
  const [sceneEditForm, setSceneEditForm] = useState({ title: '', location: '', timeOfDay: '', weather: '', description: '' })
  const [charEditForm, setCharEditForm] = useState({ name: '', identity: '', appearance: '', personality: '' })
  const [generatingSingle, setGeneratingSingle] = useState<string | null>(null)
  
  const aspectRatios = [
    { value: '16:9', label: '16:9', desc: '横版视频' },
    { value: '9:16', label: '9:16', desc: '竖版短视频' },
    { value: '4:3', label: '4:3', desc: '经典比例' },
    { value: '3:4', label: '3:4', desc: '竖版图文' },
    { value: '1:1', label: '1:1', desc: '方形' },
    { value: '21:9', label: '21:9', desc: '超宽屏' },
  ]
  
  const allStyles = [
    // 纳米精选风格库
    { value: '3d-fantasy', label: '3D玄幻', category: '3D' },
    { value: '3d-american', label: '3D美式', category: '3D' },
    { value: '3d-q-version', label: '3DQ版', category: '3D' },
    { value: '2d-animation', label: '2D动画', category: '2D' },
    { value: '2d-movie', label: '2D电影', category: '2D' },
    { value: 'realistic-movie', label: '真人电影', category: '真人' },
    { value: 'realistic-ancient', label: '真人古装', category: '真人' },
    { value: '2d-fantasy-animation', label: '2D奇幻动画', category: '2D' },
    { value: '2d-retro-animation', label: '2D复古动画', category: '2D' },
    { value: '2d-american-animation', label: '2D美式动画', category: '2D' },
    { value: '2d-ghibli', label: '2D吉卜力动画', category: '2D' },
    { value: '2d-retro-girl', label: '2D复古少女', category: '2D' },
    { value: '2d-korean-animation', label: '2D韩式动画', category: '2D' },
    { value: '2d热血-animation', label: '2D热血动画', category: '2D' },
    { value: '2d-bird-sanm', label: '2D鸟三明', category: '2D' },
    { value: '2d-doraemon', label: '2D哆小啦', category: '2D' },
    { value: '2d-fujimot', label: '2D藤本木', category: '2D' },
    { value: '2d-spirit-city', label: '2D灵怪都市', category: '2D' },
    { value: '2d-jojo', label: '2D乔乔风', category: '2D' },
    { value: '2d-detective', label: '2D日式侦探', category: '2D' },
    { value: '2d-basketball', label: '2D篮球高手', category: '2D' },
    { value: '2d-tezuka', label: '2D手冢治虫', category: '2D' },
    { value: '2d-death-god', label: '2D死亡之神', category: '2D' },
    { value: '2d-thick-line', label: '2D粗线条', category: '2D' },
    { value: '3d-realistic', label: '3D写实', category: '3D' },
    { value: '3d-blocky', label: '3D块面', category: '3D' },
    { value: '3d-block-world', label: '3D方块世界', category: '3D' },
    { value: '3d-game', label: '3D手游', category: '3D' },
    { value: '3d-render-2d', label: '3D渲染2D', category: '3D' },
    { value: 'japanese-3d-render', label: '日式3D渲染2D', category: '3D' },
    { value: 'stop-motion', label: '定格动画', category: '定格' },
    { value: 'stop-motion-figurine', label: '手办定格动画', category: '定格' },
    { value: 'stop-motion-clay', label: '粘土定格动画', category: '定格' },
    { value: 'stop-motion-blocks', label: '积木定格动画', category: '定格' },
    { value: 'stop-motion-plush', label: '毛绒定格动画', category: '定格' },
    { value: '2d-rubber-tube', label: '2D橡皮管动画', category: '2D' },
    { value: '2d-q-version', label: '2DQ版', category: '2D' },
    { value: '2d-pixel', label: '2D像素', category: '2D' },
    { value: '2d-gongbi', label: '2D工笔风', category: '2D' },
    { value: '2d-simple-line', label: '2D简笔画', category: '2D' },
    { value: 'realistic-retro-hk', label: '真人复古港片', category: '真人' },
    { value: 'realistic-retro-wuxia', label: '真人复古武侠', category: '真人' },
    { value: 'realistic-light-halo', label: '真实光晕', category: '真人' },
    { value: '2d-watercolor', label: '2D水彩', category: '2D' },
    { value: '2d-simple-lines', label: '2D简单线条', category: '2D' },
    { value: '2d-american-comic', label: '2D美式漫画', category: '2D' },
    { value: '2d-shoujo-comic', label: '2D少女漫画', category: '2D' },
    { value: '2d-horror', label: '2D诡异惊悚', category: '2D' },
  ]

  useEffect(() => {
    if (id) loadProject()
  }, [id])

  async function loadProject() {
    try {
      const res = await fetch(`/api/projects/${id}`)
      const data = await res.json()
      if (data.code === 0) {
        setProject(data.data.project)
        setCharacters(data.data.characters || [])
        setScenes(data.data.scenes || [])
        setStoryboard(data.data.storyboard)
        setMaterials(data.data.materials || [])
        setSelectedProject(data.data)
        const stepMap: Record<string, StepNumber> = {
          setup: 1, script: 2, asset: 3, storyboard: 4, video: 5, audio: 6, preview: 7
        }
        setCurrentStep(stepMap[data.data.project?.status] || 1)
      }
    } catch (err) {
      console.error('Failed to load project:', err)
    }
  }

  async function handleGenerateStoryboard() {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/projects/${id}/generate-storyboard`, { method: 'POST' })
      const data = await res.json()
      if (data.code === 0) {
        setStoryboard(data.data)
        setCurrentStep(4)
      } else {
        setError(data.msg || '分镜生成失败')
      }
    } catch (err) {
      setError('分镜生成失败')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGenerateOneVideo(shotIndex: number) {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/projects/${id}/generate-videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shotIndex })
      })
      const data = await res.json()
      if (data.code === 0) loadProject()
    } catch (err) {
      setError('视频生成失败')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGenerateAllVideos() {
    if (!storyboard?.shots?.length) return
    setIsLoading(true)
    for (let i = 0; i < storyboard.shots.length; i++) {
      if (storyboard.shots[i].videoStatus === 'done') continue
      await fetch(`/api/projects/${id}/generate-videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shotIndex: i })
      })
    }
    loadProject()
    setIsLoading(false)
  }

  async function handleGenerateAudio() {
    setIsLoading(true)
    try {
      const allDialogues = storyboard?.shots?.map((s: any) => s.sound?.dialogue || '').filter(Boolean).join(' ') || ''
      const res = await fetch(`/api/projects/${id}/generate-audio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: allDialogues, voice: audioConfig.voice, speed: audioConfig.speed })
      })
      const data = await res.json()
      if (data.code === 0) {
        setAudioConfig(prev => ({ ...prev, hasAudio: true, audioUrl: data.data.audioUrl }))
      }
    } catch (err) {
      setError('配音生成失败')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'in_progress': return 'primary'
      case 'pending': return 'secondary'
      default: return 'secondary'
    }
  }

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'setup': return '未开始'
      case 'script': return '编写剧本'
      case 'asset': return '生成资产'
      case 'storyboard': return '生成分镜'
      case 'video': return '生成视频'
      case 'audio': return '生成配音'
      case 'preview': return '待导出'
      case 'completed': return '已完成'
      default: return status || '未知'
    }
  }

  const completedSteps: StepNumber[] = project?.status === 'setup' ? [] : [1]
  if (['script', 'asset', 'storyboard', 'video', 'audio', 'preview', 'completed'].includes(project?.status || '')) completedSteps.push(2)
  if (['asset', 'storyboard', 'video', 'audio', 'preview', 'completed'].includes(project?.status || '')) completedSteps.push(3)
  if (['storyboard', 'video', 'audio', 'preview', 'completed'].includes(project?.status || '')) completedSteps.push(4)
  if (['video', 'audio', 'preview', 'completed'].includes(project?.status || '')) completedSteps.push(5)
  if (['audio', 'preview', 'completed'].includes(project?.status || '')) completedSteps.push(6)
  if (['preview', 'completed'].includes(project?.status || '')) completedSteps.push(7)

  if (!id) return <div className="p-8 text-center">无效的项目ID</div>
  if (!project) return <div className="p-8 text-center">加载中...</div>

  // 步骤定义
  const steps = [
    { num: 1, label: '全局设定', key: 'setup' },
    { num: 2, label: '故事剧本', key: 'script' },
    { num: 3, label: '场景角色道具', key: 'asset' },
    { num: 4, label: '分镜脚本', key: 'storyboard' },
    { num: 5, label: '分镜视频', key: 'video' },
    { num: 6, label: '配音对口型', key: 'audio' },
    { num: 7, label: '视频预览', key: 'preview' },
  ]

  const getStepStatus = (stepNum: number): 'completed' | 'current' | 'waiting' => {
    if (stepNum < currentStep) return 'completed'
    if (stepNum === currentStep) return 'current'
    return 'waiting'
  }

  return (
    <div className="min-h-screen flex">
      {/* 左侧边栏 */}
      <aside className="w-56 bg-[#1a1a2e] border-r border-[#2d2d44] flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-[#2d2d44]">
          <h1 className="text-lg font-bold text-white">AIGCMD 影视工坊</h1>
        </div>

        {/* 步骤列表 */}
        <nav className="flex-1 p-2">
          {steps.map(step => {
            const status = getStepStatus(step.num)
            return (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num as StepNumber)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                  status === 'current'
                    ? 'bg-[#3d3d5c] text-white'
                    : status === 'completed'
                    ? 'text-[#4ade80]'
                    : 'text-[#888] hover:bg-[#2d2d44]'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                  status === 'completed' ? 'bg-[#4ade80] text-[#1a1a2e]' : status === 'current' ? 'bg-[#22d3ee] text-[#1a1a2e]' : 'bg-[#2d2d44]'
                }`}>
                  {status === 'completed' ? '✓' : step.num}
                </span>
                <span className="text-sm">{step.label}</span>
              </button>
            )
          })}
        </nav>

        {/* 底部操作 */}
        <div className="p-3 border-t border-[#2d2d44]">
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#22d3ee] text-[#1a1a2e] rounded-lg text-sm font-medium">
            <span>分享创作</span>
          </button>
          <div className="mt-2 text-center text-xs text-[#666]">
            剩余积分: 0
          </div>
        </div>
      </aside>

      {/* 右侧主内容 */}
      <main className="flex-1 flex flex-col">
        {/* 顶部栏 */}
        <header className="h-14 bg-[#1a1a2e] border-b border-[#2d2d44] flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/')} className="text-[#888] hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-white">{project.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={async () => {
                try {
                  await fetch(`/api/projects/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      title: project.title,
                      synopsis: project.synopsis,
                      type: project.type,
                      era: project.era,
                      style: project.style,
                      videoConfig: videoConfig
                    })
                  })
                  await fetch(`/api/projects/${id}/scenes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ scenes })
                  })
                  await fetch(`/api/projects/${id}/characters`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ characters })
                  })
                  await fetch(`/api/projects/${id}/storyboard`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ storyboard })
                  })
                  alert('保存成功！')
                } catch (err) {
                  alert('保存失败')
                }
              }}
              className="px-4 py-1.5 border border-[#3d3d5c] text-[#888] rounded-lg text-sm font-medium hover:bg-[#2d2d44]"
            >
              保存
            </button>
            <button 
              onClick={() => setCurrentStep(Math.min(currentStep + 1, 7) as StepNumber)}
              className="px-4 py-1.5 bg-[#22d3ee] text-[#1a1a2e] rounded-lg text-sm font-medium"
            >
              下一步
            </button>
          </div>
        </header>

        {/* 内容区域 */}
        <div className="flex-1 bg-[#16162a] p-6 overflow-auto">

        {currentStep === 1 && (
          <div className="flex gap-6">
            {/* 左侧配置面板 */}
            <div className="flex-1 space-y-6">
              {/* 画面比例 */}
              <div className="card">
                <label className="block text-sm font-medium mb-3">选择画面比例</label>
                <div className="grid grid-cols-6 gap-2">
                  {aspectRatios.map(ratio => (
                    <button
                      key={ratio.value}
                      onClick={() => setVideoConfig(p => ({ ...p, aspectRatio: ratio.value }))}
                      className={`p-2 rounded-lg border text-center transition-colors ${
                        videoConfig.aspectRatio === ratio.value
                          ? 'border-[#22d3ee] bg-[#22d3ee]/10 text-[#22d3ee]'
                          : 'border-[#3d3d5c] bg-[#1e1e3f] text-[#888] hover:border-[#22d3ee]/50'
                      }`}
                    >
                      <div className="font-medium text-sm">{ratio.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 剧本类型 */}
              <div className="card">
                <label className="block text-sm font-medium mb-3">选择剧本类型</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setVideoConfig(p => ({ ...p, scriptType: 'drama' }))}
                    className={`flex-1 p-2 rounded-lg border text-center transition-colors ${
                      videoConfig.scriptType === 'drama'
                        ? 'border-[#22d3ee] bg-[#22d3ee]/10 text-[#22d3ee]'
                        : 'border-[#3d3d5c] bg-[#1e1e3f] text-[#888] hover:border-[#22d3ee]/50'
                    }`}
                  >
                    剧情演绎
                  </button>
                  <button
                    onClick={() => setVideoConfig(p => ({ ...p, scriptType: 'talking-head' }))}
                    className={`flex-1 p-2 rounded-lg border text-center transition-colors ${
                      videoConfig.scriptType === 'talking-head'
                        ? 'border-[#22d3ee] bg-[#22d3ee]/10 text-[#22d3ee]'
                        : 'border-[#3d3d5c] bg-[#1e1e3f] text-[#888] hover:border-[#22d3ee]/50'
                    }`}
                  >
                    真人解说漫
                  </button>
                </div>
              </div>

              {/* 模型策略 */}
              <div className="card">
                <label className="block text-sm font-medium mb-3">选择模型策略</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setVideoConfig(p => ({ ...p, modelStrategy: 'economy' }))}
                    className={`flex-1 p-2 rounded-lg border text-center transition-colors ${
                      videoConfig.modelStrategy === 'economy'
                        ? 'border-[#4ade80] bg-[#4ade80]/10 text-[#4ade80]'
                        : 'border-[#3d3d5c] bg-[#1e1e3f] text-[#888] hover:border-[#4ade80]/50'
                    }`}
                  >
                    省钱优先
                  </button>
                  <button
                    onClick={() => setVideoConfig(p => ({ ...p, modelStrategy: 'quality' }))}
                    className={`flex-1 p-2 rounded-lg border text-center transition-colors ${
                      videoConfig.modelStrategy === 'quality'
                        ? 'border-[#a855f7] bg-[#a855f7]/10 text-[#a855f7]'
                        : 'border-[#3d3d5c] bg-[#1e1e3f] text-[#888] hover:border-[#a855f7]/50'
                    }`}
                  >
                    画质优先
                  </button>
                </div>
              </div>

              {/* 创作模式 */}
              <div className="card">
                <label className="block text-sm font-medium mb-3">选择创作模式</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setVideoConfig(p => ({ ...p, creationMode: 'image-to-video' }))}
                    className={`flex-1 p-2 rounded-lg border text-center transition-colors ${
                      videoConfig.creationMode === 'image-to-video'
                        ? 'border-[#22d3ee] bg-[#22d3ee]/10 text-[#22d3ee]'
                        : 'border-[#3d3d5c] bg-[#1e1e3f] text-[#888] hover:border-[#22d3ee]/50'
                    }`}
                  >
                    图生视频
                  </button>
                  <button
                    onClick={() => setVideoConfig(p => ({ ...p, creationMode: 'multi-param' }))}
                    className={`flex-1 p-2 rounded-lg border text-center transition-colors ${
                      videoConfig.creationMode === 'multi-param'
                        ? 'border-[#22d3ee] bg-[#22d3ee]/10 text-[#22d3ee]'
                        : 'border-[#3d3d5c] bg-[#1e1e3f] text-[#888] hover:border-[#22d3ee]/50'
                    }`}
                  >
                    多参生视频-通用版
                  </button>
                </div>
              </div>

              {/* 分镜图生成模式 */}
              <div className="card">
                <label className="block text-sm font-medium mb-3">选择分镜图生成模式</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setVideoConfig(p => ({ ...p, storyboardMode: 'single' }))}
                    className={`flex-1 p-2 rounded-lg border text-center transition-colors ${
                      videoConfig.storyboardMode === 'single'
                        ? 'border-[#22d3ee] bg-[#22d3ee]/10 text-[#22d3ee]'
                        : 'border-[#3d3d5c] bg-[#1e1e3f] text-[#888] hover:border-[#22d3ee]/50'
                    }`}
                  >
                    自动生成单张分镜图
                  </button>
                  <button
                    onClick={() => setVideoConfig(p => ({ ...p, storyboardMode: 'nine-grid' }))}
                    className={`flex-1 p-2 rounded-lg border text-center transition-colors ${
                      videoConfig.storyboardMode === 'nine-grid'
                        ? 'border-[#22d3ee] bg-[#22d3ee]/10 text-[#22d3ee]'
                        : 'border-[#3d3d5c] bg-[#1e1e3f] text-[#888] hover:border-[#22d3ee]/50'
                    }`}
                  >
                    自动生成九宫格机位分镜图
                  </button>
                </div>
              </div>

              {/* 画面风格库 */}
              <div className="card">
                <label className="block text-sm font-medium mb-3">选择画面风格</label>
                
                {/* 已选风格 */}
                <div className="mb-4 p-3 bg-[#1e1e3f] rounded-lg">
                  <div className="text-xs text-[#666] mb-2">已选风格</div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#22d3ee]/20 text-[#22d3ee] rounded-full text-sm">
                      {allStyles.find(s => s.value === videoConfig.style)?.label || '真人电影'}
                    </span>
                  </div>
                </div>

                {/* 我的风格库 */}
                <div className="mb-4">
                  <div className="text-xs text-[#666] mb-2">我的风格库</div>
                  <button className="w-full p-2 border border-dashed border-[#3d3d5c] rounded-lg text-[#666] text-sm hover:border-[#22d3ee]/50">
                    + 添加风格
                  </button>
                </div>

                {/* 纳米精选风格库 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#666]">纳米精选风格库</span>
                    <button 
                      onClick={() => setVideoConfig(p => ({ ...p, styleLibraryExpanded: !p.styleLibraryExpanded }))}
                      className="text-xs text-[#22d3ee]"
                    >
                      {videoConfig.styleLibraryExpanded ? '收起' : '展开'}
                    </button>
                  </div>
                  {videoConfig.styleLibraryExpanded && (
                    <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
                      {allStyles.map(style => (
                        <button
                          key={style.value}
                          onClick={() => setVideoConfig(p => ({ ...p, style: style.value }))}
                          className={`p-2 rounded border text-xs text-center transition-colors ${
                            videoConfig.style === style.value
                              ? 'border-[#22d3ee] bg-[#22d3ee]/10 text-[#22d3ee]'
                              : 'border-[#3d3d5c] bg-[#1e1e3f] text-[#888] hover:border-[#22d3ee]/50'
                          }`}
                        >
                          {style.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 右侧项目信息 */}
            <div className="w-80 space-y-4">
              {/* 封面图 */}
              <div className="card">
                <div className="aspect-video bg-[#1e1e3f] rounded-lg border-2 border-dashed border-[#3d3d5c] flex flex-col items-center justify-center cursor-pointer hover:border-[#22d3ee] transition-colors">
                  <div className="text-4xl mb-2">🎬</div>
                  <div className="text-[#666] text-sm">点击上传封面图</div>
                </div>
              </div>

              {/* 项目名称 */}
              <div className="card">
                <label className="block text-sm text-[#888] mb-2">项目名称</label>
                <input 
                  type="text" 
                  value={project.title}
                  onChange={(e) => setProject(p => p ? { ...p, title: e.target.value } : p)}
                  className="w-full px-4 py-2.5 bg-[#1e1e3f] border border-[#3d3d5c] rounded-lg text-white"
                  placeholder="输入项目名称"
                />
              </div>

              {/* 保存按钮 */}
              <button 
                onClick={async () => {
                  try {
                    const res = await fetch(`/api/projects/${id}`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        title: project.title,
                        type: project.type,
                        era: project.era,
                        style: project.style,
                        videoConfig: videoConfig
                      })
                    })
                    const data = await res.json()
                    if (data.code === 0) {
                      alert('保存成功！')
                    } else {
                      alert('保存失败：' + data.msg)
                    }
                  } catch (err) {
                    alert('保存失败')
                  }
                }}
                className="w-full py-3 bg-[#22d3ee] text-[#1a1a2e] rounded-lg font-medium"
              >
                保存全局设定
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Script Parser Card */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent-cyan" />
                  剧本解析
                </h2>
                {characters.length > 0 && (
                  <span className="text-xs text-accent-green flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> 已解析 {characters.length} 个角色 · {scenes.length} 个场景
                  </span>
                )}
              </div>
              
              {characters.length === 0 ? (
                <div className="space-y-4">
                  <p className="text-sm text-text-secondary">
                    输入你的剧本故事，AI将自动拆解角色、场景和道具
                  </p>
                  <textarea
                    value={scriptText}
                    onChange={e => setScriptText(e.target.value)}
                    placeholder={`粘贴或输入剧本内容...\n\n例如：\n漠北草原，黄沙漫天。霍去病率八百精骑，趁匈奴主力忙于劫掠之际，绕道敌后百里，突然发起进攻。汉军如神兵天降，匈奴措手不及，溃不成军。霍去病身先士卒，手持长枪，冲入敌阵...`}
                    className="input h-64 font-mono text-sm resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">
                      {scriptText.length} 字 {scriptText.length < 50 ? '（至少50字）' : '✓'}
                    </span>
                    <button
                      onClick={async () => {
                        if (scriptText.trim().length < 50) return
                        setParseStatus('loading')
                        setError(null)
                        try {
                          const res = await fetch(`/api/projects/${id}/parse-script`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ scriptText: scriptText.trim() })
                          })
                          const data = await res.json()
                          if (data.code === 0) {
                            setCharacters(data.data.characters)
                            setScenes(data.data.scenes)
                            setProject(p => p ? { ...p, synopsis: data.data.storySummary } : p)
                            setParseStatus('done')
                          } else {
                            setError(data.msg || '解析失败')
                            setParseStatus('error')
                          }
                        } catch (err) {
                          setError('网络错误，请重试')
                          setParseStatus('error')
                        }
                      }}
                      disabled={parseStatus === 'loading' || scriptText.trim().length < 50}
                      className="btn-primary flex items-center gap-2"
                    >
                      {parseStatus === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                      {parseStatus === 'loading' ? '解析中...' : '🤖 AI解析剧本'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 bg-accent-green/10 border border-accent-green/20 rounded-lg">
                    <p className="text-sm text-accent-green">剧本已解析完成</p>
                    {project?.synopsis && (
                      <p className="text-xs text-text-secondary mt-1">{project.synopsis}</p>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setCharacters([]); setScenes([]); setParseStatus('idle') }}
                      className="btn-secondary text-sm"
                    >
                      重新解析
                    </button>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="mt-3 p-3 bg-accent-red/10 border border-accent-red/20 rounded-lg">
                  <p className="text-sm text-accent-red">{error}</p>
                </div>
              )}
            </div>

            {/* Characters Preview */}
            {characters.length > 0 && (
              <div className="card">
                <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent-purple" />
                  角色列表 ({characters.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {characters.map(char => (
                    <div key={char.id} className="p-4 bg-bg-primary rounded-lg border border-bg-border hover:border-accent-purple/30 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-purple/30 to-accent-cyan/30 flex items-center justify-center text-lg">
                          {char.gender === 'male' ? '♂' : char.gender === 'female' ? '♀' : '?'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{char.name}</div>
                          <div className="text-xs text-text-secondary truncate">{char.identity}</div>
                          {char.appearance && (
                            <div className="text-xs text-text-secondary mt-1 line-clamp-2">{char.appearance}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scenes Preview */}
            {scenes.length > 0 && (
              <div className="card">
                <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                  <Mountain className="w-4 h-4 text-accent-cyan" />
                  场景列表 ({scenes.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {scenes.map(scene => (
                    <div key={scene.sceneId} className="p-4 bg-bg-primary rounded-lg border border-bg-border hover:border-accent-cyan/30 transition-colors">
                      <div className="font-medium mb-1">{scene.title}</div>
                      <div className="text-xs text-text-secondary">
                        <span>{scene.location}</span> · <span>{scene.timeOfDay}</span> · <span>{scene.weather}</span>
                      </div>
                      {scene.description && (
                        <div className="text-xs text-text-secondary mt-2 line-clamp-2">{scene.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setCurrentStep(1)} className="btn-secondary">上一步</button>
              <button onClick={() => setCurrentStep(3)} className="btn-primary" disabled={characters.length === 0}>
                下一步 {characters.length > 0 && '→'}
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex gap-6">
            {/* 左侧：场景/角色/道具标签页 */}
            <div className="flex-1 space-y-4">
              {/* 标签切换 */}
              <div className="flex gap-2 mb-4">
                <button 
                  onClick={() => setAssetTab('scene')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${assetTab === 'scene' ? 'bg-[#22d3ee] text-[#1a1a2e]' : 'bg-[#1e1e3f] text-[#888] hover:bg-[#2d2d44]'}`}
                >
                  场景
                </button>
                <button 
                  onClick={() => setAssetTab('character')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${assetTab === 'character' ? 'bg-[#22d3ee] text-[#1a1a2e]' : 'bg-[#1e1e3f] text-[#888] hover:bg-[#2d2d44]'}`}
                >
                  角色
                </button>
                <button 
                  onClick={() => setAssetTab('props')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${assetTab === 'props' ? 'bg-[#22d3ee] text-[#1a1a2e]' : 'bg-[#1e1e3f] text-[#888] hover:bg-[#2d2d44]'}`}
                >
                  道具
                </button>
              </div>

              {/* 根据标签显示不同内容 */}
              {assetTab === 'scene' && (
              <>
              {/* 场景内容 */}
              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-[#666]">场景数：{scenes.length} 项</div>
                  {scenes.length > 0 && (
                    <button 
                      onClick={async () => {
                        for (const scene of scenes) {
                          await fetch(`/api/projects/${id}/generate-assets`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ type: 'scene', targetId: scene.sceneId, prompt: scene.description })
                          })
                        }
                        await loadProject()
                        alert('批量生成完成')
                      }}
                      className="px-2 py-1 bg-[#22d3ee] text-[#1a1a2e] rounded text-xs"
                    >
                      批量生成
                    </button>
                  )}
                </div>
                
                {/* 场景卡片列表 */}
                {scenes.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {scenes.map((scene: any, idx: number) => {
                      const sceneMaterials = materials.filter((m: any) => m.metadata?.sceneId === scene.sceneId)
                      const doneMaterial = sceneMaterials.find((m: any) => m.status === 'done')
                      return (
                        <div key={scene.sceneId} className="relative p-3 bg-[#1e1e3f] rounded-lg border border-[#3d3d5c]">
                          <div className="aspect-video bg-[#2d2d44] rounded mb-2 flex items-center justify-center overflow-hidden">
                            {doneMaterial ? (
                              <img src={doneMaterial.url} alt={scene.title} className="w-full h-full object-cover" />
                            ) : (
                              <Mountain className="w-8 h-8 text-[#666]" />
                            )}
                          </div>
                          {/* 场景更多菜单 */}
                          <div className="absolute top-2 right-2">
                            <button onClick={() => setMoreMenu(moreMenu === `scene-${scene.sceneId}` ? null : `scene-${scene.sceneId}`)} className="p-1 rounded hover:bg-[#3d3d5c] text-[#666]">⋮</button>
                            {moreMenu === `scene-${scene.sceneId}` && (
                              <div className="absolute right-0 top-6 bg-[#2d2d44] rounded shadow-lg py-1 z-10 w-24 text-xs">
                                <button onClick={() => { setEditingScene(scene); setSceneEditForm({ title: scene.title || '', location: scene.location || '', timeOfDay: scene.timeOfDay || '', weather: scene.weather || '', description: scene.description || '' }); setMoreMenu(null) }} className="w-full px-2 py-1 text-left hover:bg-[#3d3d5c]">修改设定</button>
                                <button onClick={() => { const newScene = {...scene, sceneId: Date.now()}; setScenes([...scenes, newScene]); setMoreMenu(null) }} className="w-full px-2 py-1 text-left hover:bg-[#3d3d5c]">复制</button>
                                <button onClick={() => { setScenes(scenes.filter((_: any, i: number) => i !== idx)); setMoreMenu(null) }} className="w-full px-2 py-1 text-left hover:bg-[#3d3d5c] text-red-400">删除</button>
                              </div>
                            )}
                          </div>

                          <div className="text-sm font-medium mb-1">{scene.title}</div>
                          <div className="text-xs text-[#666] mb-2">{scene.location} · {scene.timeOfDay}</div>
                          <button
                            onClick={async () => {
                              if (!scene.description) { alert('请先修改设定添加场景描述'); return }
                              setGeneratingSingle(`scene-${scene.sceneId}`)
                              try {
                                await fetch(`/api/projects/${id}/generate-assets`, {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ type: 'scene', targetId: scene.sceneId, prompt: scene.description })
                                })
                                await loadProject()
                              } catch (err) { alert('生成失败') }
                              finally { setGeneratingSingle(null) }
                            }}
                            disabled={generatingSingle === `scene-${scene.sceneId}`}
                            className="w-full py-1 bg-[#22d3ee]/10 text-[#22d3ee] rounded text-xs hover:bg-[#22d3ee]/20 disabled:opacity-50"
                          >
                            {generatingSingle === `scene-${scene.sceneId}` ? '生成中...' : doneMaterial ? '重新生成' : '生成图片'}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <button 
                    onClick={async () => {
                      if (!project.synopsis) { alert('请先在步骤2中输入剧本'); return }
                      setIsLoading(true)
                      try {
                        const res = await fetch(`/api/projects/${id}/parse-script`, {
                          method: 'POST', headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ scriptText: project.synopsis })
                        })
                        const data = await res.json()
                        if (data.code === 0) { setScenes(data.data.scenes); setCharacters(data.data.characters); await loadProject() }
                        else { alert('提取失败：' + data.msg) }
                      } catch (err) { alert('提取失败') }
                      finally { setIsLoading(false) }
                    }}
                    disabled={isLoading}
                    className="w-full p-4 border-2 border-dashed border-[#3d3d5c] rounded-lg text-[#666] hover:border-[#22d3ee] hover:text-[#22d3ee] transition-colors disabled:opacity-50"
                  >
                    {isLoading ? '提取中...' : '点击此按钮，系统将帮您智能提取场景'}
                  </button>
                )}
              </div>
              
              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-[#666]">角色数：{characters.length} 项</div>
                  {characters.length > 0 && (
                    <button 
                      onClick={async () => {
                        for (const char of characters) {
                          await fetch(`/api/projects/${id}/generate-assets`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ type: 'character', targetId: char.id, prompt: char.appearance || char.name })
                          })
                        }
                        await loadProject()
                        alert('批量生成完成')
                      }}
                      className="px-2 py-1 bg-[#a855f7] text-white rounded text-xs"
                    >
                      批量生成
                    </button>
                  )}
                </div>
                
                {/* 角色卡片列表 */}
                {characters.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {characters.map((char: any, idx: number) => {
                      const charMaterials = materials.filter((m: any) => m.metadata?.characterId === char.id)
                      const doneMaterial = charMaterials.find((m: any) => m.status === 'done')
                      return (
                        <div key={char.id} className="relative p-3 bg-[#1e1e3f] rounded-lg border border-[#3d3d5c]">
                          <div className="aspect-video bg-[#2d2d44] rounded mb-2 flex items-center justify-center overflow-hidden">
                            {doneMaterial ? (
                              <img src={doneMaterial.url} alt={char.name} className="w-full h-full object-cover" />
                            ) : (
                              <Users className="w-8 h-8 text-[#666]" />
                            )}
                          </div>
                          <div className="text-sm font-medium mb-1">{char.name}</div>
                          <div className="text-xs text-[#666] mb-2">{char.identity}</div>
                          {/* 角色更多菜单 */}
                          <div className="absolute top-2 right-2">
                            <button onClick={() => setMoreMenu(moreMenu === `char-${char.id}` ? null : `char-${char.id}`)} className="p-1 rounded hover:bg-[#3d3d5c] text-[#666]">⋮</button>
                            {moreMenu === `char-${char.id}` && (
                              <div className="absolute right-0 top-6 bg-[#2d2d44] rounded shadow-lg py-1 z-10 w-24 text-xs">
                                <button onClick={() => { setEditingCharacter(char); setCharEditForm({ name: char.name || '', identity: char.identity || '', appearance: char.appearance || '', personality: char.personality || '' }); setMoreMenu(null) }} className="w-full px-2 py-1 text-left hover:bg-[#3d3d5c]">修改设定</button>
                                <button onClick={() => { const newChar = {...char, id: Date.now()}; setCharacters([...characters, newChar]); setMoreMenu(null) }} className="w-full px-2 py-1 text-left hover:bg-[#3d3d5c]">复制</button>
                                <button onClick={() => { setCharacters(characters.filter((_: any, i: number) => i !== idx)); setMoreMenu(null) }} className="w-full px-2 py-1 text-left hover:bg-[#3d3d5c] text-red-400">删除</button>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={async () => {
                              if (!char.appearance && !char.name) { alert('请先修改设定添加角色外貌描述'); return }
                              setGeneratingSingle(`char-${char.id}`)
                              try {
                                await fetch(`/api/projects/${id}/generate-assets`, {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ type: 'character', targetId: char.id, prompt: char.appearance || char.name })
                                })
                                await loadProject()
                              } catch (err) { alert('生成失败') }
                              finally { setGeneratingSingle(null) }
                            }}
                            disabled={generatingSingle === `char-${char.id}`}
                            className="w-full py-1 bg-[#a855f7]/10 text-[#a855f7] rounded text-xs hover:bg-[#a855f7]/20 disabled:opacity-50"
                          >
                            {generatingSingle === `char-${char.id}` ? '生成中...' : doneMaterial ? '重新生成' : '生成图片'}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                <button 
                  onClick={async () => {
                    if (!project.synopsis) {
                      alert('请先在步骤2中输入剧本')
                      return
                    }
                    setIsLoading(true)
                    try {
                      const res = await fetch(`/api/projects/${id}/parse-script`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ scriptText: project.synopsis })
                      })
                      const data = await res.json()
                      if (data.code === 0) {
                        setScenes(data.data.scenes)
                        setCharacters(data.data.characters)
                        await loadProject()
                      } else {
                        alert('提取失败：' + data.msg)
                      }
                    } catch (err) {
                      alert('提取失败')
                    } finally {
                      setIsLoading(false)
                    }
                  }}
                  disabled={isLoading}
                  className="w-full p-4 border-2 border-dashed border-[#3d3d5c] rounded-lg text-[#666] hover:border-[#22d3ee] hover:text-[#22d3ee] transition-colors disabled:opacity-50"
                >
                  {isLoading ? '提取中...' : '点击此按钮，系统将帮您智能提取角色'}
                </button>
                )}
              </div>
              </>
              )}

              {/* 道具内容 */}
              {assetTab === 'props' && (
              <>
              <div className="card">
                <div className="text-sm text-[#666] mb-2">道具数：{allProps.length} 项</div>
                {allProps.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2">
                    {allProps.map((prop: string, idx: number) => (
                      <div key={idx} className="p-3 bg-[#1e1e3f] rounded-lg text-center text-sm">
                        {prop}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-[#666] text-sm">
                    暂无道具，请先解析剧本
                  </div>
                )}
              </div>
              </>
              )}
            </div>

            {/* 右侧：预览 */}
            <div className="w-80 space-y-3">
              <div className="text-sm font-medium">预览</div>
              {assetTab === 'scene' && scenes.length > 0 && scenes.map(scene => (
                <div key={scene.sceneId} className="p-3 bg-[#1e1e3f] rounded-lg">
                  <div className="aspect-video bg-[#2d2d44] rounded mb-2 flex items-center justify-center">
                    <Mountain className="w-6 h-6 text-[#666]" />
                  </div>
                  <div className="text-sm">{scene.title}</div>
                </div>
              ))}
              {assetTab === 'character' && characters.length > 0 && characters.map(char => (
                <div key={char.id} className="p-3 bg-[#1e1e3f] rounded-lg">
                  <div className="aspect-video bg-[#2d2d44] rounded mb-2 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#666]" />
                  </div>
                  <div className="text-sm">{char.name}</div>
                </div>
              ))}
              {assetTab === 'props' && allProps.length > 0 && allProps.map((prop: string, idx: number) => (
                <div key={idx} className="p-3 bg-[#1e1e3f] rounded-lg text-sm">
                  🎬 {prop}
                </div>
              ))}
              {((assetTab === 'scene' && scenes.length === 0) || 
                (assetTab === 'character' && characters.length === 0) || 
                (assetTab === 'props' && allProps.length === 0)) && (
                <div className="text-center py-8 text-[#666] text-sm">
                  暂无内容，请先提取
                </div>
              )}
            </div>
          </div>
        )}

        {false && characters.length === 0 && scenes.length === 0 && (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-accent-cyan" />
                  资产生成
                </h2>
                <p className="text-sm text-text-secondary">
                  为角色和场景生成AI参考图
                </p>
              </div>

              {characters.length === 0 && scenes.length === 0 ? (
                <div className="text-center py-8 text-text-secondary">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>请先在步骤2中解析剧本</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Characters with Generate Button */}
                  {characters.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-text-secondary mb-3">角色资产</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {characters.map(char => {
                          const charMaterials = materials.filter(m => m.metadata?.characterId === char.id)
                          const doneMaterial = charMaterials.find(m => m.status === 'done')
                          const generatingMaterial = charMaterials.find(m => m.status === 'generating')
                          return (
                            <div key={char.id} className="p-4 bg-bg-primary rounded-lg border border-bg-border">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center text-sm">
                                  {char.gender === 'male' ? '♂' : char.gender === 'female' ? '♀' : '?'}
                                </div>
                                <div>
                                  <div className="font-medium text-sm">{char.name}</div>
                                  <div className="text-xs text-text-secondary">{char.identity}</div>
                                </div>
                              </div>
                              {doneMaterial ? (
                                <div className="mt-2 rounded-lg overflow-hidden bg-bg-border">
                                  <img src={`/${doneMaterial.url}`} alt={char.name} className="w-full h-32 object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                                </div>
                              ) : generatingMaterial ? (
                                <div className="mt-2 flex items-center gap-2 text-xs text-accent-cyan">
                                  <Loader2 className="w-3 h-3 animate-spin" /> 生成中...
                                </div>
                              ) : (
                                <button
                                  onClick={async () => {
                                    setIsLoading(true)
                                    try {
                                      await fetch(`/api/projects/${id}/generate-assets`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ type: 'character', targetId: char.id })
                                      })
                                      await loadProject()
                                    } finally {
                                      setIsLoading(false)
                                    }
                                  }}
                                  disabled={isLoading}
                                  className="mt-2 w-full py-1.5 text-xs bg-accent-purple/20 text-accent-purple rounded hover:bg-accent-purple/30 transition-colors"
                                >
                                  生成角色图
                                </button>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Scenes with Generate Button */}
                  {scenes.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-text-secondary mb-3">场景资产</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {scenes.map(scene => {
                          const sceneMaterials = materials.filter(m => m.metadata?.sceneId === scene.sceneId)
                          const doneMaterial = sceneMaterials.find(m => m.status === 'done')
                          const generatingMaterial = sceneMaterials.find(m => m.status === 'generating')
                          return (
                            <div key={scene.sceneId} className="p-4 bg-bg-primary rounded-lg border border-bg-border">
                              <div className="mb-2">
                                <div className="font-medium text-sm">{scene.title}</div>
                                <div className="text-xs text-text-secondary">{scene.location} · {scene.timeOfDay}</div>
                              </div>
                              {doneMaterial ? (
                                <div className="mt-2 rounded-lg overflow-hidden bg-bg-border">
                                  <img src={`/${doneMaterial.url}`} alt={scene.title} className="w-full h-32 object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                                </div>
                              ) : generatingMaterial ? (
                                <div className="mt-2 flex items-center gap-2 text-xs text-accent-cyan">
                                  <Loader2 className="w-3 h-3 animate-spin" /> 生成中...
                                </div>
                              ) : (
                                <button
                                  onClick={async () => {
                                    setIsLoading(true)
                                    try {
                                      await fetch(`/api/projects/${id}/generate-assets`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ type: 'scene', targetId: scene.sceneId })
                                      })
                                      await loadProject()
                                    } finally {
                                      setIsLoading(false)
                                    }
                                  }}
                                  disabled={isLoading}
                                  className="mt-2 w-full py-1.5 text-xs bg-accent-cyan/20 text-accent-cyan rounded hover:bg-accent-cyan/30 transition-colors"
                                >
                                  生成场景图
                                </button>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setCurrentStep(2)} className="btn-secondary">上一步</button>
              <button onClick={() => setCurrentStep(4)} className="btn-primary">下一步</button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="flex gap-6">
            {/* 左侧：分镜列表 */}
            <div className="flex-1 space-y-4">
              {/* 视图切换 */}
              <div className="flex gap-2 mb-4">
                <button 
                  onClick={() => setStoryboardView('list')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${storyboardView === 'list' ? 'bg-[#22d3ee] text-[#1a1a2e]' : 'bg-[#1e1e3f] text-[#888] hover:bg-[#2d2d44]'}`}
                >
                  列表
                </button>
                <button 
                  onClick={() => setStoryboardView('card')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${storyboardView === 'card' ? 'bg-[#22d3ee] text-[#1a1a2e]' : 'bg-[#1e1e3f] text-[#888] hover:bg-[#2d2d44]'}`}
                >
                  卡片
                </button>
              </div>

              {/* 分镜进度 */}
              <div className="text-sm text-[#666] mb-4">
                分镜完成进度：{storyboard?.shots?.filter((s: any) => s.videoStatus === 'done').length || 0}/{storyboard?.shots?.length || 0}
              </div>

              {/* 分镜列表/卡片视图 */}
              {storyboard?.shots?.length > 0 && storyboardView === 'list' && (
                <div className="space-y-3">
                  {storyboard.shots.map((shot: any, idx: number) => (
                    <div key={shot.shotId} className="relative p-4 bg-[#1e1e3f] rounded-lg border border-[#3d3d5c]">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">分镜{String(shot.shotId).padStart(2, '0')}</span>
                          <span className="text-[#666] text-sm">{shot.shotType}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setEditingShot(idx); setEditScript(shot.description || ''); setEditingShotData(shot) }}
                            className="px-3 py-1 bg-[#2d2d44] text-[#888] rounded text-xs hover:bg-[#3d3d5c]"
                          >
                            修改分镜脚本
                          </button>
                          <label className="px-3 py-1 bg-[#2d2d44] text-[#888] rounded text-xs hover:bg-[#3d3d5c] cursor-pointer">
                            编辑分镜图
                            <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (!file) return
                              const formData = new FormData()
                              formData.append('file', file)
                              try {
                                const res = await fetch(`/api/upload`, { method: 'POST', body: formData })
                                const data = await res.json()
                                if (data.url) {
                                  const newShots = [...storyboard.shots]
                                  newShots[idx] = {...newShots[idx], thumbnailUrl: data.url}
                                  setStoryboard({...storyboard, shots: newShots})
                                }
                              } catch (err) { alert('上传失败') }
                            }} />
                          </label>
                          <button onClick={() => setMoreMenu(moreMenu === `shot-${shot.shotId}` ? null : `shot-${shot.shotId}`)} className="px-3 py-1 bg-[#2d2d44] text-[#888] rounded text-xs hover:bg-[#3d3d5c]">更多</button>
                          {moreMenu === `shot-${shot.shotId}` && (
                            <div className="absolute right-4 top-16 bg-[#2d2d44] rounded shadow-lg py-1 z-10 w-24 text-xs">
                              <button onClick={() => { setEditingShot(idx); setEditScript(shot.aiPrompt || shot.description || ''); setEditingShotData(shot); setMoreMenu(null) }} className="w-full px-2 py-1 text-left hover:bg-[#3d3d5c]">修改提示词</button>
                              <button onClick={() => { const newShot = {...shot, shotId: Date.now()}; setStoryboard({...storyboard, shots: [...storyboard.shots, newShot]}); setMoreMenu(null) }} className="w-full px-2 py-1 text-left hover:bg-[#3d3d5c]">复制</button>
                              <button onClick={() => { setStoryboard({...storyboard, shots: storyboard.shots.filter((_: any, i: number) => i !== idx)}); setMoreMenu(null) }} className="w-full px-2 py-1 text-left hover:bg-[#3d3d5c] text-red-400">删除</button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* 分镜图 */}
                      <div className="mb-3">
                        <div className="text-xs text-[#666] mb-1">分镜图：</div>
                        <label className="aspect-video bg-[#2d2d44] rounded flex items-center justify-center cursor-pointer hover:bg-[#3d3d5c]">
                          {shot.thumbnailUrl ? (
                            <img src={shot.thumbnailUrl} alt="分镜图" className="w-full h-full object-cover rounded" />
                          ) : (
                            <span className="text-[#666] text-sm">点击上传分镜图</span>
                          )}
                          <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (!file) return
                            const formData = new FormData()
                            formData.append('file', file)
                            try {
                              const res = await fetch(`/api/upload`, { method: 'POST', body: formData })
                              const data = await res.json()
                              if (data.url) {
                                const newShots = [...storyboard.shots]
                                newShots[idx] = {...newShots[idx], thumbnailUrl: data.url}
                                setStoryboard({...storyboard, shots: newShots})
                              }
                            } catch (err) { alert('上传失败') }
                          }} />
                        </label>
                      </div>
                      
                      {/* 参考信息 */}
                      <div className="mb-3">
                        <div className="text-xs text-[#666] mb-1">参考信息：</div>
                        <div className="text-sm text-[#888] line-clamp-2">{shot.description}</div>
                      </div>
                      
                      {/* 分镜脚本 */}
                      <div>
                        <div className="text-xs text-[#666] mb-1">AI提示词：</div>
                        <div className="text-sm text-[#888] line-clamp-2">{shot.aiPrompt || '暂无'}</div>
                      </div>
                      {/* 更多菜单 */}
                      <button onClick={() => setMoreMenu(moreMenu === `shot-${shot.shotId}` ? null : `shot-${shot.shotId}`)} className="absolute top-4 right-4 px-2 py-1 bg-[#2d2d44] text-[#888] rounded text-xs">更多</button>
                      {moreMenu === `shot-${shot.shotId}` && (
                        <div className="absolute right-4 top-10 bg-[#2d2d44] rounded shadow-lg py-1 z-10 w-20 text-xs">
                          <button onClick={() => { alert("修改提示词"); setMoreMenu(null) }} className="w-full px-2 py-1 text-left hover:bg-[#3d3d5c]">修改提示词</button>
                          <button onClick={() => { const newShot = {...shot, shotId: Date.now()}; setStoryboard({...storyboard, shots: [...storyboard.shots, newShot]}); setMoreMenu(null) }} className="w-full px-2 py-1 text-left hover:bg-[#3d3d5c]">复制</button>
                          <button onClick={() => { setStoryboard({...storyboard, shots: storyboard.shots.filter((_: any, i: number) => i !== idx)}); setMoreMenu(null) }} className="w-full px-2 py-1 text-left hover:bg-[#3d3d5c] text-red-400">删除</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 卡片视图 */}
              {storyboard?.shots?.length > 0 && storyboardView === 'card' && (
                <div className="grid grid-cols-3 gap-3">
                  {storyboard.shots.map((shot: any, idx: number) => (
                    <div key={shot.shotId} className="relative p-3 bg-[#1e1e3f] rounded-lg border border-[#3d3d5c]">
                      <div className="aspect-video bg-[#2d2d44] rounded mb-2 flex items-center justify-center overflow-hidden">
                        {shot.thumbnailUrl ? <img src={shot.thumbnailUrl} alt="分镜图" className="w-full h-full object-cover" /> : <Clapperboard className="w-8 h-8 text-[#666]" />}
                      </div>
                      <div className="text-sm font-medium mb-1">分镜{String(shot.shotId).padStart(2, '0')}</div>
                      <div className="text-xs text-[#666] mb-2">{shot.shotType}</div>
                      <div className="flex gap-1">
                        <button onClick={() => { setEditingShot(idx); setEditScript(shot.description || '') }} className="flex-1 px-2 py-1 bg-[#2d2d44] text-[#888] rounded text-xs">脚本</button>
                        <button onClick={() => setMoreMenu(moreMenu === `shotc-${shot.shotId}` ? null : `shotc-${shot.shotId}`)} className="px-2 py-1 bg-[#2d2d44] text-[#888] rounded text-xs">⋮</button>
                      </div>
                      {moreMenu === `shotc-${shot.shotId}` && (
                        <div className="absolute right-2 top-20 bg-[#2d2d44] rounded shadow-lg py-1 z-10 w-20 text-xs">
                          <button onClick={() => { alert("修改提示词"); setMoreMenu(null) }} className="w-full px-2 py-1 text-left hover:bg-[#3d3d5c]">修改提示词</button>
                          <button onClick={() => { const newShot = {...shot, shotId: Date.now()}; setStoryboard({...storyboard, shots: [...storyboard.shots, newShot]}); setMoreMenu(null) }} className="w-full px-2 py-1 text-left hover:bg-[#3d3d5c]">复制</button>
                          <button onClick={() => { setStoryboard({...storyboard, shots: storyboard.shots.filter((_: any, i: number) => i !== idx)}); setMoreMenu(null) }} className="w-full px-2 py-1 text-left hover:bg-[#3d3d5c] text-red-400">删除</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 空状态 */}
              {!storyboard?.shots?.length && (
                <div className="text-center py-8">
                  <p className="text-[#666] mb-4">暂无分镜脚本</p>
                  <button onClick={handleGenerateStoryboard} disabled={isLoading} className="px-6 py-2 bg-[#22d3ee] text-[#1a1a2e] rounded-lg font-medium">
                    {isLoading ? '生成中...' : 'AI生成分镜'}
                  </button>
                </div>
              )}
            </div>

            {/* 右侧：预览 */}
            <div className="w-80 space-y-3">
              <div className="text-sm font-medium">预览</div>
              {storyboard?.shots?.map((shot: any) => (
                <div key={shot.shotId} className="p-2 bg-[#1e1e3f] rounded-lg">
                  <div className="aspect-video bg-[#2d2d44] rounded mb-2 flex items-center justify-center">
                    <Clapperboard className="w-6 h-6 text-[#666]" />
                  </div>
                  <div className="text-xs">分镜{String(shot.shotId).padStart(2, '0')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="flex gap-6">
            {/* 左侧：视频列表 */}
            <div className="flex-1 space-y-4">
              {/* 批量生成按钮 */}
              <button 
                onClick={handleGenerateAllVideos} 
                disabled={isLoading || !storyboard?.shots?.length} 
                className="w-full py-3 bg-[#22d3ee] text-[#1a1a2e] rounded-lg font-medium flex items-center justify-center gap-2"
              >
                {isLoading ? '生成中...' : '批量生成'}
              </button>

              {/* 视频列表 */}
              {storyboard?.shots?.map((shot: any, idx: number) => (
                <div key={shot.shotId} className="p-4 bg-[#1e1e3f] rounded-lg border border-[#3d3d5c]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">分镜{String(shot.shotId).padStart(2, '0')}</span>
                      <span className="text-[#666] text-sm">{shot.shotType}</span>
                    </div>
                    <div className="text-xs">
                      {shot.videoStatus === 'done' ? (
                        <span className="text-[#4ade80]">✓ 已完成</span>
                      ) : shot.videoStatus === 'generating' ? (
                        <span className="text-[#22d3ee]">生成中</span>
                      ) : (
                        <span className="text-[#666]">等待</span>
                      )}
                    </div>
                  </div>
                  <div className="aspect-video bg-[#2d2d44] rounded mb-3 flex items-center justify-center">
                    {shot.videoStatus === 'done' ? (
                      <Video className="w-8 h-8 text-[#4ade80]" />
                    ) : shot.videoStatus === 'generating' ? (
                      <Loader2 className="w-8 h-8 text-[#22d3ee] animate-spin" />
                    ) : (
                      <Video className="w-8 h-8 text-[#666]" />
                    )}
                  </div>
                  <div className="text-sm text-[#888] mb-3 line-clamp-2">{shot.description}</div>
                  {shot.videoStatus === 'done' && (
                      <div className="flex gap-2">
                        <button onClick={() => { setPreviewVideo(shot.videoUrl); setShowPreview(true) }} className="flex-1 py-2 bg-[#22d3ee]/10 text-[#22d3ee] rounded-lg text-sm hover:bg-[#22d3ee]/20">预览</button>
                        <button onClick={() => { const newShots = [...storyboard.shots]; newShots[idx] = {...newShots[idx], videoStatus: 'pending', videoUrl: null}; setStoryboard({...storyboard, shots: newShots}) }} className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm hover:bg-red-500/20">删除</button>
                      </div>
                    )}
                    {shot.videoStatus !== 'done' && shot.videoStatus !== 'generating' && (
                    <div className="flex gap-2">
                      <button onClick={() => handleGenerateOneVideo(idx)} disabled={isLoading} className="flex-1 py-2 bg-[#22d3ee]/10 text-[#22d3ee] rounded-lg text-sm hover:bg-[#22d3ee]/20">生成视频</button>
                      <button onClick={() => { const newShots = storyboard.shots.filter((_: any, i: number) => i !== idx); setStoryboard({...storyboard, shots: newShots}) }} className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm hover:bg-red-500/20">删除</button>
                    </div>
                    )}
                  </div>
              ))}
              <button onClick={() => { if(confirm("确定删除所有视频?")) { setStoryboard({...storyboard, shots: storyboard.shots.map((s: any) => ({...s, videoStatus: 'pending', videoUrl: null}))}) }}} className="w-full py-2 border border-red-500 text-red-400 rounded-lg text-sm hover:bg-red-500/10">全部删除</button>
              {(!storyboard?.shots || storyboard.shots.length === 0) && (
                <div className="text-center py-12 text-[#666]">
                  暂无分镜，请先在步骤4生成分镜
                </div>
              )}
            </div>

            {/* 右侧：预览 */}
            <div className="w-80 space-y-3">
              <div className="text-sm font-medium">预览</div>
              {storyboard?.shots?.map((shot: any) => (
                <div key={shot.shotId} className="p-2 bg-[#1e1e3f] rounded-lg">
                  <div className="aspect-video bg-[#2d2d44] rounded mb-2 flex items-center justify-center">
                    {shot.videoStatus === 'done' ? (
                      <Video className="w-6 h-6 text-[#4ade80]" />
                    ) : (
                      <Video className="w-6 h-6 text-[#666]" />
                    )}
                  </div>
                  <div className="text-xs">分镜{String(shot.shotId).padStart(2, '0')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {false && (
          <div className="flex gap-6">
            {/* 左侧配置面板 */}
            <div className="flex-1 space-y-6">
              {/* 画面比例 */}
              <div className="card">
                <label className="block text-sm font-medium mb-3">选择画面比例</label>
                <div className="grid grid-cols-6 gap-2">
                  {aspectRatios.map(ratio => (
                    <button
                      key={ratio.value}
                      onClick={() => setVideoConfig(p => ({ ...p, aspectRatio: ratio.value }))}
                      className={`p-2 rounded-lg border text-center transition-colors ${
                        videoConfig.aspectRatio === ratio.value
                          ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                          : 'border-bg-border bg-bg-primary text-text-secondary hover:border-accent-cyan/50'
                      }`}
                    >
                      <div className="font-medium text-sm">{ratio.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 创作模式 */}
              <div className="card">
                <label className="block text-sm font-medium mb-3">选择创作模式</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setVideoConfig(p => ({ ...p, creationMode: 'image-to-video' }))}
                    className={`flex-1 p-2 rounded-lg border text-center transition-colors ${
                      videoConfig.creationMode === 'image-to-video'
                        ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                        : 'border-bg-border bg-bg-primary text-text-secondary hover:border-accent-cyan/50'
                    }`}
                  >
                    图生视频
                  </button>
                  <button
                    onClick={() => setVideoConfig(p => ({ ...p, creationMode: 'multi-param' }))}
                    className={`flex-1 p-2 rounded-lg border text-center transition-colors ${
                      videoConfig.creationMode === 'multi-param'
                        ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                        : 'border-bg-border bg-bg-primary text-text-secondary hover:border-accent-cyan/50'
                    }`}
                  >
                    多参生视频-通用版
                  </button>
                </div>
              </div>

              {/* 分镜图生成模式 */}
              <div className="card">
                <label className="block text-sm font-medium mb-3">选择分镜图生成模式</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setVideoConfig(p => ({ ...p, storyboardMode: 'single' }))}
                    className={`flex-1 p-2 rounded-lg border text-center transition-colors ${
                      videoConfig.storyboardMode === 'single'
                        ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                        : 'border-bg-border bg-bg-primary text-text-secondary hover:border-accent-cyan/50'
                    }`}
                  >
                    自动生成单张分镜图
                  </button>
                  <button
                    onClick={() => setVideoConfig(p => ({ ...p, storyboardMode: 'nine-grid' }))}
                    className={`flex-1 p-2 rounded-lg border text-center transition-colors ${
                      videoConfig.storyboardMode === 'nine-grid'
                        ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                        : 'border-bg-border bg-bg-primary text-text-secondary hover:border-accent-cyan/50'
                    }`}
                  >
                    自动生成九宫格机位分镜图
                  </button>
                </div>
              </div>

              {/* 画面风格库 */}
              <div className="card">
                <label className="block text-sm font-medium mb-3">选择画面风格</label>
                
                {/* 已选风格 */}
                <div className="mb-4 p-3 bg-bg-primary rounded-lg">
                  <div className="text-xs text-text-secondary mb-2">已选风格</div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-accent-cyan/20 text-accent-cyan rounded-full text-sm">
                      {allStyles.find(s => s.value === videoConfig.style)?.label || '真人电影'}
                    </span>
                  </div>
                </div>

                {/* 我的风格库 */}
                <div className="mb-4">
                  <div className="text-xs text-text-secondary mb-2">我的风格库</div>
                  <button className="w-full p-2 border border-dashed border-bg-border rounded-lg text-text-secondary text-sm hover:border-accent-cyan/50">
                    + 添加风格
                  </button>
                </div>

                {/* 纳米精选风格库 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-text-secondary">纳米精选风格库</span>
                    <button 
                      onClick={() => setVideoConfig(p => ({ ...p, styleLibraryExpanded: !p.styleLibraryExpanded }))}
                      className="text-xs text-accent-cyan"
                    >
                      {videoConfig.styleLibraryExpanded ? '收起' : '展开'}
                    </button>
                  </div>
                  {videoConfig.styleLibraryExpanded && (
                    <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                      {allStyles.map(style => (
                        <button
                          key={style.value}
                          onClick={() => setVideoConfig(p => ({ ...p, style: style.value }))}
                          className={`p-2 rounded border text-xs text-center transition-colors ${
                            videoConfig.style === style.value
                              ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                              : 'border-bg-border bg-bg-primary text-text-secondary hover:border-accent-cyan/50'
                          }`}
                        >
                          {style.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setCurrentStep(4)} className="btn-secondary">上一步</button>
                <button onClick={() => setCurrentStep(6)} className="btn-primary">下一步</button>
              </div>
            </div>

            {/* 右侧分镜预览 */}
            <div className="w-80 space-y-4">
              <div className="card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">分镜预览</span>
                  <span className="text-xs text-text-secondary">{storyboard?.shots?.length || 0} 个镜头</span>
                </div>
                <div className="space-y-2">
                  {storyboard?.shots?.map((shot: any, idx: number) => (
                    <div key={shot.shotId} className="p-2 bg-bg-primary rounded-lg">
                      <div className="aspect-video bg-bg-border rounded mb-2 flex items-center justify-center">
                        <Video className="w-6 h-6 text-text-secondary opacity-30" />
                      </div>
                      <div className="text-xs font-medium">分镜{String(shot.shotId).padStart(2, '0')}</div>
                      <div className="text-xs text-text-secondary truncate">{shot.description?.slice(0, 20)}...</div>
                    </div>
                  ))}
                  {(!storyboard?.shots || storyboard.shots.length === 0) && (
                    <div className="text-center py-8 text-text-secondary text-sm">
                      暂无分镜，请先在步骤4生成分镜
                    </div>
                  )}
                </div>
              </div>

              {/* 生成按钮 */}
              <button 
                onClick={handleGenerateAllVideos} 
                disabled={isLoading || !storyboard?.shots?.length} 
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                {isLoading ? '生成中...' : '批量生成'}
              </button>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="flex gap-6">
            {/* 左侧：配音配置 */}
            <div className="flex-1 space-y-6">
              <div className="card">
                <label className="block text-sm font-medium mb-4">配音音色</label>
                <div className="grid grid-cols-3 gap-3">
                  {['官方客服（女）', '官方客服（男）', '旁白女', '旁白男', '年轻女声', '年轻男声', '儿童', '老人'].map(voice => (
                    <button
                      key={voice}
                      onClick={() => setAudioConfig(p => ({ ...p, voice }))}
                      className={`p-3 rounded-lg border text-center text-sm transition-colors ${
                        audioConfig.voice === voice
                          ? 'border-[#22d3ee] bg-[#22d3ee]/10 text-[#22d3ee]'
                          : 'border-[#3d3d5c] bg-[#1e1e3f] text-[#888] hover:border-[#22d3ee]/50'
                      }`}
                    >
                      {voice}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleGenerateAudio} disabled={isLoading} className="w-full py-3 bg-[#22d3ee] text-[#1a1a2e] rounded-lg font-medium">
                {isLoading ? '生成中...' : '生成配音'}
              </button>
            </div>

            {/* 右侧：预览 */}
            <div className="w-80">
              <div className="card">
                <div className="text-sm font-medium mb-4">预览</div>
                {audioConfig.hasAudio ? (
                  <div className="p-4 bg-[#4ade80]/10 rounded-lg text-[#4ade80] text-center">
                    ✓ 配音已生成
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#666]">
                    暂无配音
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentStep === 7 && (
          <div className="flex gap-6">
            {/* 左侧：大视频播放器 */}
            <div className="flex-1">
              <div className="card">
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-[#666]">
                    <Play className="w-16 h-16 mx-auto mb-3 opacity-30" />
                    <p>视频预览区域</p>
                  </div>
                </div>
                
                {/* 导出按钮 */}
                <button className="w-full py-3 bg-[#22d3ee] text-[#1a1a2e] rounded-lg font-medium mb-4">
                  导出视频
                </button>
              </div>
            </div>

            {/* 右侧：导出选项 */}
            <div className="w-80 space-y-4">
              <div className="card">
                <div className="text-sm font-medium mb-4">导出选项</div>
                <div className="space-y-3">
                  <button className="w-full p-4 bg-[#1e1e3f] rounded-lg border border-[#3d3d5c] flex items-center justify-between hover:border-[#22d3ee]">
                    <div className="flex items-center gap-3">
                      <Video className="w-5 h-5 text-[#888]" />
                      <span>MP4</span>
                    </div>
                    <span className="text-[#666]">→</span>
                  </button>
                  <button className="w-full p-4 bg-[#1e1e3f] rounded-lg border border-[#3d3d5c] flex items-center justify-between hover:border-[#22d3ee]">
                    <div className="flex items-center gap-3">
                      <Play className="w-5 h-5 text-[#888]" />
                      <span>GIF</span>
                    </div>
                    <span className="text-[#666]">→</span>
                  </button>
                  <button className="w-full p-4 bg-[#1e1e3f] rounded-lg border border-[#3d3d5c] flex items-center justify-between hover:border-[#22d3ee]">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#888]" />
                      <span>分段</span>
                    </div>
                    <span className="text-[#666]">→</span>
                  </button>
                  <button className="w-full p-4 bg-[#1e1e3f] rounded-lg border border-[#3d3d5c] flex items-center justify-between hover:border-[#22d3ee]">
                    <div className="flex items-center gap-3">
                      <Mic className="w-5 h-5 text-[#888]" />
                      <span>音频</span>
                    </div>
                    <span className="text-[#666]">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {false && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent-cyan" />
                视频预览与导出
              </h2>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-bg-primary rounded-lg text-center">
                  <div className="text-2xl font-bold">{storyboard?.shots?.length || 0}</div>
                  <div className="text-sm text-text-secondary">分镜</div>
                </div>
                <div className="p-4 bg-bg-primary rounded-lg text-center">
                  <div className="text-2xl font-bold text-accent-green">
                    {storyboard?.shots?.filter((s: any) => s.videoStatus === 'done').length || 0}
                  </div>
                  <div className="text-sm text-text-secondary">视频</div>
                </div>
                <div className="p-4 bg-bg-primary rounded-lg text-center">
                  <div className="text-2xl font-bold">{audioConfig.hasAudio ? '✓' : '○'}</div>
                  <div className="text-sm text-text-secondary">配音</div>
                </div>
                <div className="p-4 bg-bg-primary rounded-lg text-center">
                  <div className="text-2xl font-bold">-</div>
                  <div className="text-sm text-text-secondary">时长</div>
                </div>
              </div>
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-6">
                <div className="text-center text-text-secondary">
                  <Clapperboard className="w-16 h-16 mx-auto mb-3 opacity-30" />
                  <p>视频预览区域</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <button className="btn-secondary flex flex-col items-center gap-2 py-4">
                  <Video className="w-6 h-6" />
                  <span>MP4</span>
                </button>
                <button className="btn-secondary flex flex-col items-center gap-2 py-4">
                  <Play className="w-6 h-6" />
                  <span>GIF</span>
                </button>
                <button className="btn-secondary flex flex-col items-center gap-2 py-4">
                  <FileText className="w-6 h-6" />
                  <span>分段</span>
                </button>
                <button className="btn-secondary flex flex-col items-center gap-2 py-4">
                  <span className="text-2xl">🎵</span>
                  <span>音频</span>
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setCurrentStep(6)} className="btn-secondary">上一步</button>
              <button className="btn-primary">📥 导出视频</button>
            </div>
          </div>
        )}
        
        {/* 视频预览弹窗 */}
        {showPreview && previewVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setShowPreview(false)}>
            <div className="max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
              <video src={previewVideo} controls className="w-full rounded-lg" />
              <button onClick={() => setShowPreview(false)} className="mt-4 w-full py-2 bg-white text-black rounded-lg">关闭</button>
            </div>
          </div>
        )}

        {/* 场景编辑弹窗 */}
        {editingScene && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setEditingScene(null)}>
            <div className="bg-[#1e1e3f] rounded-xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-medium mb-4">修改场景设定</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-[#888] mb-1">场景名称</label>
                  <input value={sceneEditForm.title} onChange={e => setSceneEditForm({...sceneEditForm, title: e.target.value})} className="w-full bg-[#2d2d44] border border-[#3d3d5c] rounded-lg px-3 py-2 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#888] mb-1">地点</label>
                    <input value={sceneEditForm.location} onChange={e => setSceneEditForm({...sceneEditForm, location: e.target.value})} className="w-full bg-[#2d2d44] border border-[#3d3d5c] rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#888] mb-1">时间段</label>
                    <select value={sceneEditForm.timeOfDay} onChange={e => setSceneEditForm({...sceneEditForm, timeOfDay: e.target.value})} className="w-full bg-[#2d2d44] border border-[#3d3d5c] rounded-lg px-3 py-2 text-sm">
                      <option value="">请选择</option>
                      <option value="黎明">黎明</option>
                      <option value="清晨">清晨</option>
                      <option value="上午">上午</option>
                      <option value="正午">正午</option>
                      <option value="下午">下午</option>
                      <option value="黄昏">黄昏</option>
                      <option value="夜晚">夜晚</option>
                      <option value="深夜">深夜</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#888] mb-1">天气</label>
                  <select value={sceneEditForm.weather} onChange={e => setSceneEditForm({...sceneEditForm, weather: e.target.value})} className="w-full bg-[#2d2d44] border border-[#3d3d5c] rounded-lg px-3 py-2 text-sm">
                    <option value="">请选择</option>
                    <option value="晴朗">晴朗</option>
                    <option value="多云">多云</option>
                    <option value="阴天">阴天</option>
                    <option value="雨天">雨天</option>
                    <option value="雪天">雪天</option>
                    <option value="雾天">雾天</option>
                    <option value="沙尘">沙尘</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#888] mb-1">场景描述（用于生成图片）</label>
                  <textarea value={sceneEditForm.description} onChange={e => setSceneEditForm({...sceneEditForm, description: e.target.value})} rows={3} className="w-full bg-[#2d2d44] border border-[#3d3d5c] rounded-lg px-3 py-2 text-sm resize-none" placeholder="描述场景细节、光影、氛围..." />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => {
                  const updated = scenes.map((s: any) => s.sceneId === editingScene.sceneId ? { ...s, ...sceneEditForm } : s)
                  setScenes(updated)
                  setEditingScene(null)
                }} className="flex-1 py-2 bg-[#22d3ee] text-[#1a1a2e] rounded-lg text-sm font-medium hover:bg-[#22d3ee]/80">保存</button>
                <button onClick={() => setEditingScene(null)} className="flex-1 py-2 bg-[#2d2d44] text-[#888] rounded-lg text-sm hover:bg-[#3d3d5c]">取消</button>
              </div>
            </div>
          </div>
        )}

        {/* 分镜脚本编辑弹窗 */}
        {editingShot !== null && storyboard?.shots?.[editingShot] && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setEditingShot(null)}>
            <div className="bg-[#1e1e3f] rounded-xl p-6 w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-medium mb-4">
                修改分镜 {String(storyboard.shots[editingShot].shotId).padStart(2, '0')} 脚本
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-[#888] mb-1">分镜类型</label>
                  <select
                    value={editingShotData?.shotType || storyboard.shots[editingShot].shotType || ''}
                    onChange={e => setEditingShotData({...editingShotData, shotType: e.target.value})}
                    className="w-full bg-[#2d2d44] border border-[#3d3d5c] rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="开场建立">开场建立</option>
                    <option value="过肩对峙">过肩对峙</option>
                    <option value="正打">正打</option>
                    <option value="反打">反打</option>
                    <option value="特写">特写</option>
                    <option value="拔刀">拔刀</option>
                    <option value="挥砍">挥砍</option>
                    <option value="刀剑相交">刀剑相交</option>
                    <option value="马步对峙">马步对峙</option>
                    <option value="呼吸特写">呼吸特写</option>
                    <option value="移动">移动</option>
                    <option value="宿命结尾">宿命结尾</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#888] mb-1">分镜描述 / AI提示词</label>
                  <textarea
                    value={editScript}
                    onChange={e => setEditScript(e.target.value)}
                    rows={5}
                    className="w-full bg-[#2d2d44] border border-[#3d3d5c] rounded-lg px-3 py-2 text-sm resize-none"
                    placeholder="描述这个分镜的画面内容、角色动作、镜头运动..."
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => {
                  if (editingShot === null) return
                  const newShots = [...storyboard.shots]
                  newShots[editingShot] = {
                    ...newShots[editingShot],
                    description: editScript,
                    shotType: editingShotData?.shotType || newShots[editingShot].shotType,
                    aiPrompt: editScript,
                  }
                  setStoryboard({...storyboard, shots: newShots})
                  setEditingShot(null)
                }} className="flex-1 py-2 bg-[#22d3ee] text-[#1a1a2e] rounded-lg text-sm font-medium hover:bg-[#22d3ee]/80">保存</button>
                <button onClick={() => setEditingShot(null)} className="flex-1 py-2 bg-[#2d2d44] text-[#888] rounded-lg text-sm hover:bg-[#3d3d5c]">取消</button>
              </div>
            </div>
          </div>
        )}

        {/* 角色编辑弹窗 */}
        {editingCharacter && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setEditingCharacter(null)}>
            <div className="bg-[#1e1e3f] rounded-xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-medium mb-4">修改角色设定</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-[#888] mb-1">角色姓名</label>
                  <input value={charEditForm.name} onChange={e => setCharEditForm({...charEditForm, name: e.target.value})} className="w-full bg-[#2d2d44] border border-[#3d3d5c] rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-[#888] mb-1">身份</label>
                  <input value={charEditForm.identity} onChange={e => setCharEditForm({...charEditForm, identity: e.target.value})} className="w-full bg-[#2d2d44] border border-[#3d3d5c] rounded-lg px-3 py-2 text-sm" placeholder="如：江湖剑客、落魄书生" />
                </div>
                <div>
                  <label className="block text-xs text-[#888] mb-1">外貌描述（用于生成图片）</label>
                  <textarea value={charEditForm.appearance} onChange={e => setCharEditForm({...charEditForm, appearance: e.target.value})} rows={3} className="w-full bg-[#2d2d44] border border-[#3d3d5c] rounded-lg px-3 py-2 text-sm resize-none" placeholder="描述外貌特征、服装、武器..." />
                </div>
                <div>
                  <label className="block text-xs text-[#888] mb-1">性格</label>
                  <input value={charEditForm.personality} onChange={e => setCharEditForm({...charEditForm, personality: e.target.value})} className="w-full bg-[#2d2d44] border border-[#3d3d5c] rounded-lg px-3 py-2 text-sm" placeholder="如：冷峻沉默、心思缜密" />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => {
                  const updated = characters.map((c: any) => c.id === editingCharacter.id ? { ...c, ...charEditForm } : c)
                  setCharacters(updated)
                  setEditingCharacter(null)
                }} className="flex-1 py-2 bg-[#a855f7] text-white rounded-lg text-sm font-medium hover:bg-[#a855f7]/80">保存</button>
                <button onClick={() => setEditingCharacter(null)} className="flex-1 py-2 bg-[#2d2d44] text-[#888] rounded-lg text-sm hover:bg-[#3d3d5c]">取消</button>
              </div>
            </div>
          </div>
        )}
        </div>
      </main>
    </div>
  )
}
