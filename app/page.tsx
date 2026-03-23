'use client'

import { useState } from 'react'
import Link from 'next/link'

// 标签页配置
const tabs = [
  { id: 'home', label: '🏠 首页' },
  { id: 'knowledge', label: '📚 知识库' },
  { id: 'workflow', label: '🗺️ 制作流程' },
  { id: 'projects', label: '🎬 项目案例' },
  { id: 'openclaw', label: '🦞 OpenClaw' }
]

// 项目数据
const projects = [
  {
    id: 'beautiful-new-world',
    name: '美丽新世界',
    type: '科幻悬疑AI预告片',
    status: '进行中',
    progress: 40,
    description: '未来能量被抽干的末日世界，四位角色揭示文明真相',
    cover: '/images/beautiful-new-world/场景/废墟大全景jimeng-2026-03-23-9604.png',
    tasks: ['Phase 1: 生图', 'Phase 2: 图生视频', 'Phase 3: 剪辑'],
    current: 'Phase 1 生图中',
    team: ['林深', '苏晚', '陈敬言', '孟清和'],
    style: '维伦纽瓦 +《湮灭》+ 真探S1'
  },
  {
    id: 'rainy-night',
    name: '雨夜肃杀',
    type: '武侠AI短片',
    status: '筹备中',
    progress: 10,
    description: '雨夜客栈，江湖恩怨，一剑封喉',
    cover: '/images/rainy-night/cover.png',
    tasks: ['剧本创作', '角色设计', '场景筹备'],
    current: '剧本创作中',
    team: ['待定'],
    style: '新武侠风格'
  }
]

// 知识库完整内容
const knowledgeBase = {
  // 核心知识
  core: [
    { id: 'five-designs', title: '五大核心设计', icon: '🎨', level: '核心',
      tags: ['视觉', '人物', '场景', '动态', '声音'],
      content: [
        '## 五大核心设计',
        '',
        '### 1. 视觉风格设计 = 色调 + 材质 + 光影',
        '• 色彩：主色/辅色/高光色（Hex码）',
        '• 材质：金属/磨砂/油画/实拍质感',
        '• 光影：光源方向/光线硬度',
        '',
        '### 2. 一致性设计 = 角色参考 + 场景底图',
        '• 角色：正面/侧面/背面/表情参考图',
        '• 场景：核心场景高分辨率底图',
        '• 目的：避免AI视频"跳戏"',
        '',
        '### 3. 动态设计 = 运镜 + 动态强度 + 转场',
        '• 运镜：推/拉/摇/移/升降/环绕',
        '• 动态：静谧/温和/狂暴',
        '• 转场：匹配剪辑/遮罩/形态变幻',
        '',
        '### 4. 提示词设计 = 结构 + 控制参数',
        '• 结构：主体+动作+环境+风格+镜头',
        '• 参数：模型/比例/负向提示/ControlNet',
        '',
        '### 5. 声音设计 = BGM + 音效 + 配音',
        '• BGM：节拍(BPM)/乐器',
        '• 音效：环境音/动作音',
        '• 配音：语速/情感/停顿'
      ]
    },
    { id: 'director-thinking', title: '导演思维', icon: '🎬', level: '核心',
      tags: ['景别', '角度', '焦段', '构图', '光影', '动态'],
      content: [
        '## 导演思维',
        '',
        '### 核心公式',
        '剧本（讲什么） → 导演思维（怎么看） → AI生成（怎么画） → 动态设计（怎么动）',
        '',
        '### 六大要素',
        '',
        '#### 景别',
        '• 远景：史诗感、孤独感',
        '• 全景：交代人物关系',
        '• 中景：交流感强',
        '• 近景：亲密感',
        '• 特写：强调、紧张感',
        '',
        '#### 角度',
        '• 平视：平等、客观',
        '• 仰视：威严、压迫',
        '• 俯视：渺小、压抑',
        '• 荷兰角：失衡、焦虑',
        '',
        '#### 焦段',
        '• 广角(14-35mm)：宽广视野',
        '• 标准(35-70mm)：自然视角',
        '• 人像(85-135mm)：压缩背景',
        '• 长焦(200mm+): 远摄、偷拍感',
        '',
        '#### 构图',
        '• 三分法：平衡自然',
        '• 对称：威严、正式',
        '• 负空间：孤独、强调',
        '• 框架：聚焦、窥视',
        '',
        '#### 光影',
        '• 散射光：压抑、沉闷',
        '• 体积光：神圣、诡异',
        '• 轮廓光：分离、神秘',
        '• 冷暖对比：冲突、复杂',
        '',
        '#### 动态',
        '• 推镜头：强调、聚焦',
        '• 拉镜头：退后、揭示',
        '• 手持：真实感、紧迫',
        '• 长镜头：沉浸感'
      ]
    },
    { id: 'prompt-design', title: '提示词设计', icon: '📝', level: '核心',
      tags: ['模块化', '参数', '负面词', '模板'],
      content: [
        '## 提示词设计',
        '',
        '### 模块化结构',
        '[基础风格模块] + [分镜内容模块] + [动态控制模块]',
        '',
        '### 基础风格模块',
        '• 定义整体视觉基调',
        '• 低饱和、泥土色、烛光（胡金铨风格）',
        '• 霓虹紫蓝、赛博质感（赛博朋克）',
        '• 低饱和、写实（文艺片）',
        '',
        '### 提示词模板',
        '[主体描述] + [服装道具] + [场景环境] + [光影] + [情绪] + [技术参数]',
        '',
        '### 控制参数',
        '• 模型版本：--v 6 / --style raw',
        '• 比例：--ar 16:9 / --ar 9:16',
        '• 负向提示：--no text,watermark,logo',
        '• 风格化：--stylize 400',
        '',
        '### 负面词库',
        '',
        '#### 通用负面',
        'distorted face, ugly, deformed, low quality, blurry',
        '',
        '#### 视频负面',
        'flickering, strobing, jittery, frame skip',
        '',
        '#### 场景负面',
        'poorly drawn, amateur, cartoon, 3d render'
      ]
    },
    { id: 'character-design', title: '人物设计', icon: '👤', level: '重要',
      tags: ['黄金锚点', '三视图', '服装', '道具', '一致性'],
      content: [
        '## 人物设计',
        '',
        '### 黄金锚点原则',
        '1. 独特性：让人一眼记住',
        '2. 一致性：全片保持一致',
        '3. 功能性：可强化角色性格或暗示命运',
        '',
        '### 设计要素',
        '• 外貌：脸型/发型/眼睛/肤色',
        '• 黄金锚点：伤疤/眼镜/配饰',
        '• 服装：身份/职业/时代感',
        '• 道具：职业道具/个人物品',
        '',
        '### 参考表',
        '• 三视图：正面/侧面/背面',
        '• 表情包：喜怒哀乐',
        '• 提示词预设：固定Seed',
        '',
        '### 一致性技巧',
        '• 固定Seed值',
        '• 使用垫图保持一致',
        '• 建立角色提示词卡片'
      ]
    },
    { id: 'scene-design', title: '场景设计', icon: '🏞️', level: '重要',
      tags: ['色彩矩阵', '材质', '空间', '氛围'],
      content: [
        '## 场景设计',
        '',
        '### 色彩矩阵（Hex码）',
        '• 主色调：定义整体氛围',
        '• 辅色调：辅助情感表达',
        '• 点缀色：视觉焦点',
        '',
        '### 材质关键词',
        '• 金属/木头/布料/玻璃/石头',
        '• 磨损状态：新/旧/锈蚀/做旧',
        '',
        '### 空间布局',
        '• 前/中/后景层次',
        '• 地面/植被/建筑/天空',
        '',
        '### 场景预设',
        '• 室内：家庭/办公/工业',
        '• 室外：城市/自然/废墟'
      ]
    },
    { id: 'light-shadow', title: '光影设计', icon: '💡', level: '重要',
      tags: ['光源', '方向', '光效', '色温'],
      content: [
        '## 光影设计',
        '',
        '### 六种光源类型',
        '• 自然光：日光/月光/火光',
        '• 人工光：灯光/霓虹/蜡烛',
        '• 散射光：阴天/柔光箱',
        '• 体积光：光柱/光束可见',
        '• 轮廓光：边缘发光/分离感',
        '• 混合光：冷暖对比',
        '',
        '### 五种光线方向',
        '• 正面光：平淡/安全',
        '• 侧光：戏剧感/明暗分界',
        '• 逆光：轮廓/剪影/神秘',
        '• 顶光：压迫/审讯',
        '• 底光：恐怖/诡异',
        '',
        '### 色温',
        '• 暖色：2700K-3500K（黄昏/室内）',
        '• 中性：4000K-5000K（自然）',
        '• 冷色：5500K以上（日光/科技）'
      ]
    },
    { id: 'motion-design', title: '动态设计', icon: '🎥', level: '重要',
      tags: ['运镜', '动态强度', '转场'],
      content: [
        '## 动态设计',
        '',
        '### 运镜参数',
        '• 推近：push forward, crane in',
        '• 拉远：pull backward, crane out',
        '• 左移：move left, pan left',
        '• 右移：move right, pan right',
        '• 上升：rise, crane up',
        '• 下降：lower, crane down',
        '• 环绕：orbit, circle around',
        '',
        '### 四级动态强度',
        '• 静态(static)：对话/抒情',
        '• 微动(subtle)：温和叙事',
        '• 轻动(light)：正常叙事',
        '• 强动(dynamic)：动作/高潮',
        '',
        '### 转场设计',
        '• 匹配剪辑：动作连贯',
        '• 遮罩转场：黑场/白场',
        '• 形态变幻：Morphing'
      ]
    },
    { id: 'audio-design', title: '声音设计', icon: '🔊', level: '重要',
      tags: ['BGM', '音效', '配音', '混音'],
      content: [
        '## 声音设计',
        '',
        '### BPM对应情绪',
        '• 60-80BPM：史诗/庄严',
        '• 80-100BPM：叙事/抒情',
        '• 100-120BPM：紧张/悬疑',
        '• 120+BPM：动作/追逐',
        '',
        '### 音效分类',
        '• 环境音：风声/水声/城市',
        '• 动作音：脚步/撞击/衣物',
        '• 物件音：门声/钟表/机械',
        '',
        '### 配音风格',
        '• 语速：快/中/慢',
        '• 情感：冷淡/激昂/低沉',
        '• 停顿：短/长/强调'
      ]
    },
    { id: 'tools', title: '工具对比', icon: '🛠️', level: '基础',
      tags: ['即梦', '可灵', 'Midjourney', 'Runway'],
      content: [
        '## 工具对比',
        '',
        '### 生图工具',
        '• Midjourney：质量最高，风格多样',
        '• 即梦AI：中文友好，本地化',
        '• DALL-E：OpenAI生态',
        '• Stable Diffusion：本地运行',
        '',
        '### 图生视频工具',
        '• 可灵AI：动作连贯性好',
        '• Runway：专业级',
        '• Luma：效果创新',
        '• 即梦视频：本地首选',
        '',
        '### 剪辑工具',
        '• 剪映：本土化/AI功能',
        '• Premiere：专业完整',
        '• DaVinci：调色强大'
      ]
    },
    { id: 'director-style', title: '导演风格', icon: '🎭', level: '进阶',
      tags: ['胡金铨', '徐克', '王家卫', '诺兰', '维伦纽瓦'],
      content: [
        '## 导演风格速查',
        '',
        '### 胡金铨',
        '关键词：低饱和、泥土色、烛光、留白、禅意',
        '色调：石绿、赭石、深褐',
        '光影：丁达尔、强明暗对比',
        '',
        '### 徐克',
        '关键词：冷蓝、飘逸、梦幻、侧逆光',
        '色调：蓝调为主',
        '光影：浪漫',
        '',
        '### 王家卫',
        '关键词：霓虹、抽帧、青橙、手持',
        '色调：青+橙',
        '光影：暧昧',
        '',
        '### 诺兰',
        '关键词：IMAX、写实、对称、极简',
        '色调：低饱和',
        '光影：自然光',
        '',
        '### 维伦纽瓦',
        '关键词：巨物、冷蓝、极简、压迫',
        '色调：冷蓝',
        '光影：巨大'
      ]
    },
    { id: 'consistency', title: '一致性指南', icon: '🔗', level: '重要',
      tags: ['Seed', '垫图', '锚点'],
      content: [
        '## 一致性指南',
        '',
        '### 变脸问题',
        '原因：没固定Seed',
        '解决：固定Seed值',
        '',
        '### 变形问题',
        '原因：动作幅度大',
        '解决：减小动作幅度',
        '',
        '### 闪烁问题',
        '原因：光线变化大',
        '解决：固定光线描述',
        '',
        '### 不连贯问题',
        '原因：首帧不衔接',
        '解决：调整首帧画面'
      ]
    }
  ],
  // 制作流程思维导图
  workflow: [
    { 
      id: 'step1', 
      name: '初始化项目', 
      icon: '📁',
      children: ['创建文件夹', '需求分析', '进度清单'],
      detail: '创建项目文件夹和进度跟踪清单'
    },
    { 
      id: 'step2', 
      name: '剧本设计', 
      icon: '✍️',
      children: ['故事结构', '角色设定', '场景规划', '情感主线'],
      detail: '确定故事结构、角色动机、场景设定',
      linked: ['director-thinking', 'character-design', 'scene-design']
    },
    { 
      id: 'step3', 
      name: '分镜脚本', 
      icon: '🎬',
      children: ['景别', '角度', '焦段', '构图', '运镜', '时长'],
      detail: '每个镜头的具体视觉规划',
      linked: ['director-thinking']
    },
    { 
      id: 'step4', 
      name: '五大设计', 
      icon: '🎨',
      children: ['视觉风格', '人物设计', '场景设计', '动态设计', '声音设计'],
      detail: '系统性设计，为生成阶段做准备',
      linked: ['five-designs', 'prompt-design']
    },
    { 
      id: 'step5', 
      name: '参考图生成', 
      icon: '🖼️',
      children: ['人物三视图', '场景概念图', '道具参考'],
      detail: '生成高质量参考图，固定Seed保持一致',
      linked: ['character-design', 'scene-design', 'consistency']
    },
    { 
      id: 'step6', 
      name: '首帧生图', 
      icon: '✨',
      children: ['静态图片', '垫图一致', '提示词优化'],
      detail: '每个镜头的首帧静态图片',
      linked: ['prompt-design', 'consistency']
    },
    { 
      id: 'step7', 
      name: '图生视频', 
      icon: '🎥',
      children: ['运镜控制', '主体动作', '环境动态'],
      detail: '将静态图片转化为动态视频',
      linked: ['motion-design', 'tools']
    },
    { 
      id: 'step8', 
      name: '音频制作', 
      icon: '🔊',
      children: ['BGM选择', '音效设计', '配音录制'],
      detail: '选择背景音乐，添加音效和配音',
      linked: ['audio-design']
    },
    { 
      id: 'step9', 
      name: '剪辑合成', 
      icon: '✂️',
      children: ['素材整理', '调色', '字幕', '导出'],
      detail: '将所有素材整合成片',
      linked: ['tools']
    }
  ]
}

// 思维导图节点组件
function MindMapNode({ node, onClick, expanded, onToggle, depth = 0 }: { 
  node: typeof knowledgeBase.workflow[0], 
  onClick: (id: string, linked?: string[]) => void,
  expanded: Set<string>,
  onToggle: (id: string) => void,
  depth?: number
}) {
  const hasChildren = node.children && node.children.length > 0
  const isExpanded = expanded.has(node.id)
  
  return (
    <div className="relative" style={{ marginLeft: depth * 20 }}>
      <div 
        className={`flex items-center gap-2 p-2 rounded-lg mb-1 cursor-pointer transition-all hover:bg-blue-50 ${depth === 0 ? 'bg-white border shadow-sm' : ''}`}
        onClick={() => {
          if (hasChildren) onToggle(node.id)
          if (node.linked) onClick(node.id, node.linked)
        }}
      >
        <span className="text-lg">{node.icon}</span>
        <span className={`font-medium ${depth === 0 ? 'text-base' : 'text-sm'}`}>{node.name}</span>
        {hasChildren && (
          <span className={`text-xs text-gray-400 ml-auto ${isExpanded ? 'rotate-90' : ''} transition-transform`}>
            ▶
          </span>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="border-l-2 border-blue-200 pl-4 ml-2">
          {node.children.map((child, i) => (
            <div key={i} className="flex items-center gap-2 p-1 text-sm text-gray-600">
              <span className="w-2 h-2 rounded-full bg-blue-300"></span>
              {child}
            </div>
          ))}
          {node.linked && (
            <button 
              onClick={(e) => { e.stopPropagation(); onClick(node.id, node.linked) }}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              📚 查看相关知识 →
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// 详情弹窗
function DetailModal({ title, content, onClose }: { 
  title: string, 
  content: string[], 
  onClose: () => void 
}) {
  const renderContent = () => {
    return content.map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-6 mb-3 text-gray-800">{line.replace('## ', '')}</h2>
      if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold mt-4 mb-2 text-gray-700">{line.replace('### ', '')}</h3>
      if (line.startsWith('#### ')) return <h4 key={i} className="text-base font-semibold mt-3 mb-2 text-gray-600">{line.replace('#### ', '')}</h4>
      if (line.trim() === '') return <br key={i} />
      if (line.startsWith('• ')) return <li key={i} className="ml-4 text-gray-600 list-disc my-1">{line.replace('• ', '')}</li>
      if (line.match(/^\d+\./)) return <li key={i} className="ml-4 text-gray-600 list-decimal my-1">{line.replace(/^\d+\.\s*/, '')}</li>
      if (!line.startsWith('#')) return <p key={i} className="text-gray-600 my-2">{line}</p>
      return null
    }).filter(Boolean)
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center p-4 overflow-auto" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-3xl w-full my-8 max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
        </div>
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedDetail, setSelectedDetail] = useState<{ title: string, content: string[] } | null>(null)
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['step1', 'step2', 'step3']))

  const toggleNode = (id: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedNodes(newExpanded)
  }

  const handleNodeClick = (nodeId: string, linked?: string[]) => {
    if (linked && linked.length > 0) {
      const firstLinked = knowledgeBase.core.find(k => k.id === linked[0])
      if (firstLinked) {
        setSelectedDetail({ title: firstLinked.title, content: firstLinked.content })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold">🎬 AI影视工坊</Link>
            <nav className="hidden md:flex items-center space-x-1">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  {tab.label}
                </button>
              ))}
            </nav>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="px-4 pb-4 md:hidden grid grid-cols-3 gap-2">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false) }}
                className={`px-3 py-2 rounded-lg text-sm font-medium text-center ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
                {tab.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main>
        {/* 首页 */}
        {activeTab === 'home' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* 项目展示 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">🎬 项目案例</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {projects.map((project, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">{project.name}</span>
                      </div>
                      <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs ${project.status === '进行中' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>进度</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: project.progress + '%' }}></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">当前：</span>{project.current}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {project.tasks.map((task, j) => (
                          <span key={j} className="px-2 py-1 bg-gray-100 rounded text-xs">{task}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 快速入口 */}
            <section className="grid md:grid-cols-3 gap-4 mb-8">
              <button onClick={() => setActiveTab('workflow')} className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 text-left hover:shadow-lg transition">
                <span className="text-3xl mb-2 block">🗺️</span>
                <h3 className="font-bold text-lg">制作流程</h3>
                <p className="text-blue-100 text-sm">思维导图式展示</p>
              </button>
              <button onClick={() => setActiveTab('knowledge')} className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 text-left hover:shadow-lg transition">
                <span className="text-3xl mb-2 block">📚</span>
                <h3 className="font-bold text-lg">知识库</h3>
                <p className="text-purple-100 text-sm">完整AI视频知识</p>
              </button>
              <button onClick={() => setActiveTab('projects')} className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 text-left hover:shadow-lg transition">
                <span className="text-3xl mb-2 block">📊</span>
                <h3 className="font-bold text-lg">进度管理</h3>
                <p className="text-green-100 text-sm">查看所有项目</p>
              </button>
            </section>

            {/* 设计原则 */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">📌 设计原则</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold mb-2">设计四原则</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>✓ 具象化 vs 模糊</li>
                    <li>✓ 统一 vs 变化</li>
                    <li>✓ 固定 vs 随机</li>
                    <li>✓ 检查 vs 生成</li>
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-bold mb-2">制作四原则</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>✓ 规划 vs 随意</li>
                    <li>✓ 设计 vs 边做边改</li>
                    <li>✓ 一致性 vs 单独好看</li>
                    <li>✓ 流程 vs 灵感</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 知识库 */}
        {activeTab === 'knowledge' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">📚 AI视频制作知识库</h1>
              <p className="text-gray-600">点击卡片查看完整内容</p>
            </div>

            {/* 标签筛选 */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">核心</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">重要</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">基础</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">进阶</span>
            </div>

            {/* 知识卡片 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {knowledgeBase.core.map((item, i) => (
                <div key={i} onClick={() => setSelectedDetail({ title: item.title, content: item.content })}
                  className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${item.level === '核心' ? 'bg-red-100 text-red-800' : item.level === '重要' ? 'bg-yellow-100 text-yellow-800' : item.level === '基础' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {item.level}
                    </span>
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map((tag, j) => (
                      <span key={j} className="px-1.5 py-0.5 bg-gray-100 rounded text-xs text-gray-600">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 工具链接 */}
            <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">🛠️ 工具资源</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-2xl mb-1">✨</p>
                  <p className="font-medium text-sm">即梦AI</p>
                  <p className="text-xs text-gray-500">生图+视频</p>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-2xl mb-1">🎬</p>
                  <p className="font-medium text-sm">可灵AI</p>
                  <p className="text-xs text-gray-500">视频生成</p>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-2xl mb-1">✂️</p>
                  <p className="font-medium text-sm">剪映Pro</p>
                  <p className="text-xs text-gray-500">剪辑合成</p>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-2xl mb-1">🎵</p>
                  <p className="font-medium text-sm">Suno</p>
                  <p className="text-xs text-gray-500">BGM生成</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 制作流程 - 思维导图 */}
        {activeTab === 'workflow' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">🗺️ AI视频制作流程</h1>
              <p className="text-gray-600">点击节点查看相关知识，点击"查看相关知识"跳转知识库</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* 流程思维导图 */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2                  className="text-lg font-bold mb-4">📋 流程导图</h2>
                <div className="space-y-2">
                  {knowledgeBase.workflow.map((node, i) => (
                    <MindMapNode 
                      key={i} 
                      node={node} 
                      onClick={handleNodeClick}
                      expanded={expandedNodes}
                      onToggle={toggleNode}
                      depth={0}
                    />
                  ))}
                </div>
              </div>

              {/* 详情面板 */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-4">📖 使用说明</h2>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>1. 点击节点展开/折叠子项</li>
                    <li>2. 点击节点查看详情说明</li>
                    <li>3. 点击"查看相关知识"跳转知识库</li>
                    <li>4. 流程节点相互关联形成网络</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-4">🔗 关联知识</h2>
                  <p className="text-sm text-gray-600 mb-3">选择流程节点后，这里显示关联的知识库内容</p>
                  <div className="flex flex-wrap gap-2">
                    {knowledgeBase.core.slice(0, 5).map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-white rounded-full text-sm">{item.icon} {item.title}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 项目案例 */}
        {activeTab === 'projects' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">🎬 项目案例</h1>
              <p className="text-gray-600">正在进行的AI视频项目</p>
            </div>

            <div className="space-y-6">
              {projects.map((project, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <div className="h-40 bg-gradient-to-r from-blue-600 to-purple-600 relative flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">{project.name}</span>
                    <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm ${project.status === '进行中' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-bold mb-2">项目信息</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li><span className="text-gray-400">类型：</span>{project.type}</li>
                          <li><span className="text-gray-400">风格：</span>{project.style}</li>
                          <li><span className="text-gray-400">描述：</span>{project.description}</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">进度</h3>
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>总体进度</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <div className="h-3 bg-gray-200 rounded-full">
                            <div className="h-3 bg-blue-500 rounded-full" style={{ width: project.progress + '%' }}></div>
                          </div>
                        </div>
                        <div className="text-sm"><span className="text-gray-400">当前阶段：</span>{project.current}</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="font-bold mb-2">任务清单</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tasks.map((task, j) => (
                          <span key={j} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{task}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="font-bold mb-2">角色</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.team.map((member, k) => (
                          <span key={k} className="px-3 py-1 bg-blue-50 rounded-full text-sm text-blue-700">{member}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OpenClaw */}
        {activeTab === 'openclaw' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">🦞 OpenClaw学习</h1>
              <p className="text-gray-600">7天掌握你的AI私人助理</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
              {['初识OpenClaw', '快速开始', '深度对话', '文件与代码', '技能扩展', '自动化', '高级技巧'].map((title, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{['👋', '🚀', '💬', '📁', '🧩', '⏰', '🎯'][i]}</span>
                    <div>
                      <span className="text-xs text-gray-500">DAY {i + 1}</span>
                      <h3 className="font-bold text-sm">{title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-4 gap-3">
              <a href="https://docs.openclaw.ai" target="_blank" className="bg-white rounded-xl p-4 shadow-sm text-center hover:bg-gray-50">
                <div className="text-2xl mb-2">📖</div>
                <h3 className="font-bold text-sm">官方文档</h3>
              </a>
              <a href="https://github.com/openclaw/openclaw" target="_blank" className="bg-white rounded-xl p-4 shadow-sm text-center hover:bg-gray-50">
                <div className="text-2xl mb-2">⭐</div>
                <h3 className="font-bold text-sm">GitHub</h3>
              </a>
              <a href="https://clawhub.com" target="_blank" className="bg-white rounded-xl p-4 shadow-sm text-center hover:bg-gray-50">
                <div className="text-2xl mb-2">🧩</div>
                <h3 className="font-bold text-sm">ClawHub</h3>
              </a>
              <a href="https://discord.com/invite/clawd" target="_blank" className="bg-white rounded-xl p-4 shadow-sm text-center hover:bg-gray-50">
                <div className="text-2xl mb-2">💬</div>
                <h3 className="font-bold text-sm">Discord</h3>
              </a>
            </div>
          </div>
        )}
      </main>

      {selectedDetail && <DetailModal title={selectedDetail.title} content={selectedDetail.content} onClose={() => setSelectedDetail(null)} />}

      <footer className="py-6 border-t bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>📚 本地知识库路径：~/Desktop/AI视频知识库/</p>
          <p className="mt-1">🔄 同步方式：Git Push 到 GitHub Pages</p>
        </div>
      </footer>
    </div>
  )
}
