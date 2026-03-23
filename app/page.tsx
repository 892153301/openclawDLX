'use client'

import { useState } from 'react'
import Link from 'next/link'

const tabs = [
  { id: 'knowledge', label: '📚 知识库' },
  { id: 'workflow', label: '📋 制作流程' },
  { id: 'projects', label: '🎬 项目案例' },
  { id: 'openclaw', label: '🦞 OpenClaw' }
]

// 知识库核心内容
const knowledgeBase = {
  core: [
    { id: 'five-designs', title: '五大核心设计', icon: '🎨', level: '核心',
      summary: '视觉风格/人物/场景/动态/声音',
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
      summary: '景别/角度/焦段/构图/光影/动态',
      content: [
        '## 导演思维',
        '',
        '### 核心公式',
        '剧本（讲什么） → 导演思维（怎么看） → AI生成（怎么画） → 动态设计（怎么动）',
        '',
        '### 六大要素',
        '• 景别：远/全/中/近/特 - 控制情绪表达',
        '• 角度：仰/俯/平/荷兰角 - 空间心理暗示',
        '• 焦段：广角/人像/长焦 - 视觉叙事',
        '• 构图：三分/对称/负空间/框架 - 视觉引导',
        '• 光影：体积光/冷暖对比/轮廓光 - 氛围塑造',
        '• 动态：相机运动/物理反馈/叙事动作 - 视觉节奏',
        '',
        '### 导演风格速查',
        '• 胡金铨：低饱和、泥土色、烛光、留白、禅意',
        '• 徐克：冷蓝、飘逸、梦幻、侧逆光',
        '• 王家卫：霓虹、抽帧、青橙、手持',
        '• 诺兰：IMAX、写实、对称、极简',
        '• 维伦纽瓦：巨物、冷蓝、极简、压迫'
      ]
    },
    { id: 'prompt-design', title: '提示词设计', icon: '📝', level: '核心',
      summary: '模块化/参数/负面词库/模板',
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
        '### 控制参数',
        '• 模型版本：--v 6 / --style raw',
        '• 比例：--ar 16:9 / --ar 9:16',
        '• 负向提示：--no text,watermark,logo',
        '• 风格化：--stylize 400',
        '',
        '### 负面词库',
        '通用：distorted face, ugly, deformed, low quality, blurry',
        '视频：flickering, strobing, jittery, frame skip',
        '场景：poorly drawn, amateur, cartoon, 3d render'
      ]
    },
    { id: 'character-design', title: '人物设计', icon: '👤', level: '重要',
      summary: '黄金锚点/三视图/服装/道具',
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
        '• 提示词预设：固定Seed'
      ]
    },
    { id: 'scene-design', title: '场景设计', icon: '🏞️', level: '重要',
      summary: '色彩矩阵/材质/空间/氛围',
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
      summary: '光源类型/光线方向/光效/色温',
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
      summary: '运镜参数/动态强度/转场',
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
      summary: 'BGM/音效/配音/混音',
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
      summary: '即梦/可灵/Midjourney/Runway',
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
    { id: 'qa', title: '常见问题', icon: '❓', level: '基础',
      summary: '变脸/变形/闪烁/不连贯',
      content: [
        '## 常见问题速查',
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
  resources: [
    { name: '提示词模板库', path: '/knowledge/prompts', icon: '📋' },
    { name: '色彩Hex码库', path: '/knowledge/colors', icon: '🎨' },
    { name: '运镜参数表', path: '/knowledge/camera', icon: '📷' },
    { name: '导演风格参考', path: '/knowledge/directors', icon: '🎬' }
  ]
}

// 制作流程
const workflowSteps = [
  { step: 1, name: '初始化项目', icon: '📁', time: '完成',
    content: ['## 初始化项目', '', '• 创建项目文件夹', '• ~/Desktop/AI视频项目/[剧本名]/', '• 创建进度清单文件', '• 梳理项目需求和目标'] },
  { step: 2, name: '剧本 + 分镜', icon: '✍️', time: '完成',
    content: ['## 剧本 + 分镜脚本（同步）', '', '【剧本检查】', '• 故事完整：有开头、发展、结尾', '• 角色明确：主角/配角的性格、动机', '• 场景设定：时间、地点、氛围', '• 情感主线：核心情感/主题', '', '【分镜脚本】', '• 景别：远/全/中/近/特', '• 角度：仰/俯/平/荷兰角', '• 焦段：14mm/35mm/85mm', '• 人物：外形+服装+动作+表情', '• 场景：环境+道具', '• 光线：光源+方向+效果', '• 色调：主色(Hex)+辅色(Hex)', '• 构图：三分/对称/负空间/框架', '• 动态：运镜+动作+物理反馈', '• 时长：X秒', '• 音效：背景音/动作音/对白'] },
  { step: 3, name: '五大核心设计', icon: '🎨', time: '完成',
    content: ['## 设计（五大核心设计）', '', '【五大设计】', '1. 视觉风格：色调/光影/质感', '2. 人物设计：三视图+道具', '3. 场景设计：底图+道具', '4. 动态设计：运镜/动作', '5. 声音设计：BGM/音效/配音', '', '【导演思维】', '• 讲什么？ → 剧本', '• 怎么看？ → 镜头选择', '• 怎么动？ → 动态设计', '', '【分镜与设计互相检查】', '• 设计与分镜同步思考', '• 互相检查、互相优化'] },
  { step: 4, name: '参考图生成', icon: '🖼️', time: '完成',
    content: ['## 参考图生成', '', '• 人物三视图（正面/侧面/背面）', '• 必要场景参考图', '• 必要道具参考图', '• 使用Seed保持一致性'] },
  { step: 5, name: '首帧图片生成', icon: '✨', time: '完成',
    content: ['## 首帧图片生成', '', '• 每个镜头1张首帧图片（静态）', '• 用参考图垫图保持一致性', '• 提示词：静态描述 + 力量感', '• 可有动态暗示但无运镜方向'] },
  { step: 6, name: '图生视频', icon: '🎬', time: '完成',
    content: ['## 图生视频', '', '• 每个镜头1个视频片段', '• 上传首帧图片 + 动作提示词', '• 运镜 + 主体动作 + 环境动态'] },
  { step: 7, name: '音频/剪辑', icon: '🎵', time: '完成',
    content: ['## 音频/剪辑', '', '• BGM选择 + 音效设计 + 配音', '• 剪辑合成 + 调色 + 导出'] }
]

// OpenClaw 7天课程
const openclawDays = [
  { day: 1, title: '初识 OpenClaw', icon: '👋',
    content: ['## 初识 OpenClaw', '', '### AI助手 vs 聊天机器人', '传统聊天机器人：被动响应、无法记忆上下文、无法执行任务', '', 'OpenClaw AI助手：主动执行、记忆学习、文件操控、自动化流程', '', '### OpenClaw能做什么', '• 邮件管理和摘要', '• 日程和会议管理', '• 代码编写和调试', '• 网络搜索和数据分析', '• 文档处理和写作', '• 定时任务和提醒', '• 网页浏览和表单填写'] },
  { day: 2, title: '快速开始', icon: '🚀',
    content: ['## 快速开始', '', '### 环境选择', '• 云服务器(推荐)：24小时在线', '• Mac Mini/旧电脑：零成本本地', '• 当前电脑：试玩体验', '', '### 一键安装', 'curl -fsSL https://openclaw.ai/install.sh | bash'] },
  { day: 3, title: '深度对话', icon: '💬',
    content: ['## 深度对话', '', '### Prompt编写技巧', '1. 明确任务', '2. 提供背景', '3. 指定格式', '4. 约束条件'] },
  { day: 4, title: '文件与代码', icon: '📁',
    content: ['## 文件与代码', '', '### 文件操作', '• 读取和分析', '• 创建和编辑', '• 批量处理', '', '### 代码能力', '• 编写/Debug/审查'] },
  { day: 5, title: '技能扩展', icon: '🧩',
    content: ['## 技能扩展', '', '### ClawHub技能市场', '• 5494+ 社区技能', '• 31个分类', '• 一键安装', '', '### 常用技能', '• 编程/数据/图像/自动化'] },
  { day: 6, title: '自动化', icon: '⏰',
    content: ['## 自动化', '', '### 定时任务', '• 每日新闻摘要', '• 定期数据备份', '• 定时提醒', '', '### 心跳机制', '• 监控重要变化', '• 主动提醒用户'] },
  { day: 7, title: '高级技巧', icon: '🚀',
    content: ['## 高级技巧', '', '### 多Agent协作', '• 分工合作', '• 任务拆解', '', '### 浏览器控制', '• 自动浏览/表单填写/数据采集'] }
]

function DetailModal({ title, content, onClose }: { title: string, content: string[], onClose: () => void }) {
  const renderContent = () => {
    return content.map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-6 mb-3 text-gray-800">{line.replace('## ', '')}</h2>
      if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold mt-4 mb-2 text-gray-700">{line.replace('### ', '')}</h3>
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
  const [activeTab, setActiveTab] = useState('knowledge')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedDetail, setSelectedDetail] = useState<{ title: string, content: string[] } | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white border-b sticky top-0 z-40 lg:hidden">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">📚 AI视频知识库</Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg hover:bg-gray-100 text-xl">{mobileMenuOpen ? '✕' : '☰'}</button>
        </div>
        {mobileMenuOpen && (
          <nav className="px-4 pb-4 grid grid-cols-2 gap-2">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false) }}
                className={`px-3 py-2 rounded-lg text-sm font-medium text-center ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {tab.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Desktop Header */}
      <header className="bg-white border-b sticky top-0 z-50 hidden lg:block">
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold">📚 AI视频知识库</Link>
            <div className="flex items-center space-x-1">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main>
        {activeTab === 'knowledge' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">🎨 AI视频制作知识库</h1>
              <p className="text-gray-600">五大核心设计 · 导演思维 · 提示词工程 · 完整制作流程</p>
            </div>

            {/* 核心知识卡片 */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 text-blue-600">⭐ 核心知识（点击查看详情）</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {knowledgeBase.core.map((item, i) => (
                  <div key={i} onClick={() => setSelectedDetail({ title: item.title, content: item.content })}
                    className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${item.level === '核心' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{item.level}</span>
                    </div>
                    <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 资源链接 */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">🛠️ 资源工具</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {knowledgeBase.resources.map((item, i) => (
                  <div key={i} className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="font-medium text-sm mt-1">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 设计原则 */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">📌 设计原则</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-bold mb-2">设计四原则</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>✓ 具象化 vs 模糊</li>
                    <li>✓ 统一 vs 变化</li>
                    <li>✓ 固定 vs 随机</li>
                    <li>✓ 检查 vs 生成</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-bold mb-2">制作四原则</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>✓ 规划 vs 随意</li>
                    <li>✓ 设计 vs 边做边改</li>
                    <li>✓ 一致性 vs 单独好看</li>
                    <li>✓ 流程 vs 灵感</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workflow' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">📋 AI视频制作完整流程</h1>
              <p className="text-gray-600">7步从概念到成品</p>
            </div>

            <div className="space-y-4">
              {workflowSteps.map((item, i) => (
                <div key={i} onClick={() => setSelectedDetail({ title: 'Step ' + item.step + ': ' + item.name, content: item.content })}
                  className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-500">Step {item.step}</span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">{item.time}</span>
                      </div>
                      <h3 className="text-lg font-bold">{item.name}</h3>
                    </div>
                    <span className="text-blue-600">点击查看详情 →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">🎬 项目案例</h1>
              <p className="text-gray-600">正在整理中...</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-gray-500">项目案例模块正在开发中</p>
              <p className="text-sm text-gray-400 mt-2">未来将展示完整项目制作案例</p>
            </div>
          </div>
        )}

        {activeTab === 'openclaw' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">🦞 OpenClaw学习</h1>
              <p className="text-gray-600">7天掌握你的AI私人助理</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
              {openclawDays.map((item) => (
                <div key={item.day} onClick={() => setSelectedDetail({ title: 'DAY ' + item.day + ': ' + item.title, content: item.content })}
                  className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <span className="text-xs text-gray-500">DAY {item.day}</span>
                      <h3 className="font-bold text-sm">{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">🧩 技能库推荐</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-2xl mb-1">🌐</p>
                  <p className="font-medium text-sm">网络搜索</p>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-2xl mb-1">📧</p>
                  <p className="font-medium text-sm">邮件管理</p>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-2xl mb-1">📁</p>
                  <p className="font-medium text-sm">文件处理</p>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-2xl mb-1">⏰</p>
                  <p className="font-medium text-sm">定时任务</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
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
          <p>AI视频知识库 · 本地知识库同步</p>
        </div>
      </footer>
    </div>
  )
}
