'use client'

import { useState } from 'react'
import Link from 'next/link'

const tabs = [
  { id: 'project', label: '🎬 项目' },
  { id: 'knowledge', label: '📚 知识库' },
  { id: 'workflow', label: '🗺️ 流程' },
  { id: 'openclaw', label: '🦞 OpenClaw' }
]

// 美丽新世界项目完整数据
const project = {
  name: '美丽新世界',
  type: '科幻悬疑AI预告片',
  status: '进行中',
  progress: 40,
  duration: '约50秒',
  style: '维伦纽瓦 +《湮灭》+ 真探S1',
  description: '未来能量被抽干的末日世界，四位角色揭示文明真相',
  
  // 四角色
  characters: [
    {
      name: '林深',
      age: '28岁',
      role: '观测院数据整理者',
      anchor: '左颧骨旧伤疤 · 黑框眼镜（总歪）',
      height: '178cm',
      body: '精瘦体型微驼背',
      face: '瘦长脸颧骨突出，黑眼圈',
      hair: '短乱发',
      eyes: '深褐色眼睛',
      clothes: '深灰蓝色工作服领口敞开第二颗扣子',
      accessory: '左手腕戴旧款监测手环',
      color: '#2C3E50',
      personality: '内敛、沉默、善于观察',
      role2: '表面是数据整理者，实际是"观察者"记录者',
      characterImage: '/images/beautiful-new-world/人物设计参考/林深，jimeng-2026-03-23-1969-28岁中国男性数据分析师，观测院工作，精瘦体型微驼背，瘦长脸颧骨突出，黑眼圈，短....png',
      threeViewImage: '/images/beautiful-new-world/人物三视图/林深，jimeng-2026-03-23-1703-28岁中国男性数据分析师，三视图集于一张图片， 包含正视图、侧视图、后视图， 完整全身像从....png',
      sceneImage: '/images/beautiful-new-world/人物与场景/林深 · 观测院jimeng-2026-03-23-8981-观测院数据中心全景，低矮天花板密集排列白色管道灰色线缆和黑色通风口，多块蓝光数据....png',
      sceneName: '观测院数据中心'
    },
    {
      name: '苏晚',
      age: '26岁',
      role: '文献馆纪元文字破译者',
      anchor: '右手无名指墨渍 · 左手腕红绳',
      height: '165cm',
      body: '纤细体型姿态挺拔',
      face: '鹅蛋脸清秀，眉眼清晰',
      hair: '低马尾发型垂落两侧',
      eyes: '深棕色杏仁眼',
      clothes: '米白色考古服深棕色腰带',
      accessory: '左手腕系褪色红绳',
      color: '#8B7355',
      personality: '执着、敏锐、内心坚定',
      role2: '破译纪元文献，发现文明真相的关键人物',
      characterImage: '/images/beautiful-new-world/人物设计参考/苏晚，jimeng-2026-03-23-7274-26岁中国女性破译者，文献馆工作，纤细体型姿态挺拔，鹅蛋脸眉眼清秀，深棕色杏仁眼....png',
      threeViewImage: '/images/beautiful-new-world/人物三视图/苏晚，jimeng-2026-03-23-9307-26岁中国女性破译者，三视图集于一张图片， 包含正视图、侧视图、后视图， 完整全....png',
      sceneImage: '/images/beautiful-new-world/人物与场景/苏晚 · 文献馆jimeng-2026-03-23-9676-古老文献馆内部场景，满墙木质书架堆满古籍羊皮卷和纪元文献，烛火摇曳暖琥珀色光芒营....png',
      sceneName: '文献馆'
    },
    {
      name: '陈敬言',
      age: '40岁',
      role: '管理局行动司司长',
      anchor: '右手臂"新世界"纹路疤痕',
      height: '185cm',
      body: '高瘦体型肩宽背挺',
      face: '棱角分明方下巴',
      hair: '短发近乎平头',
      eyes: '灰黑色眼睛直视前方',
      clothes: '黑色贴身夹克衫暗色长裤',
      accessory: '黑色半指手套',
      color: '#1A1A1A',
      personality: '冷酷、忠诚、铁血',
      role2: '管理局核心战力，奉命追查知情人',
      characterImage: '/images/beautiful-new-world/人物设计参考/陈敬言，jimeng-2026-03-23-8117-40 years old Chinese male, tall athletic....png',
      threeViewImage: '/images/beautiful-new-world/人物三视图/陈敬言，jimeng-2026-03-23-8954-40岁中国男性，三视图集于一张图片， 包含正视图、侧视图、后视图， 完整全身像从....png',
      sceneImage: '/images/beautiful-new-world/人物与场景/陈敬言 · 追捕jimeng-2026-03-23-5994-管理局工业走廊深处，工业金属钢板墙壁接缝笔直延伸至远景消失，低角仰视35mm镜头....png',
      sceneName: '管理局工业走廊'
    },
    {
      name: '孟清和',
      age: '67岁',
      role: '隐居老学者',
      anchor: '左眼下方老年斑 · 左手少一小指',
      height: '175cm',
      body: '瘦高体型微微佝偻',
      face: '长脸皱纹深刻',
      hair: '苍白长发垂落两侧',
      eyes: '浑浊但深邃',
      clothes: '深褐色旧袍有多处手缝补丁磨损严重',
      accessory: '左手腕缺失小指',
      color: '#3E2723',
      personality: '睿智、豁达、看透一切',
      role2: '曾经的观测院核心研究者，知晓真相却被孤立',
      characterImage: '/images/beautiful-new-world/人物设计参考/孟清和，jimeng-2026-03-23-8056-67岁中国老年学者，曾观测院核心研究者，高瘦体型微微佝偻如老树但核心稳定，长脸皱....png',
      threeViewImage: '/images/beautiful-new-world/人物三视图/孟清和，jimeng-2026-03-23-6309-67岁中国老年学者，三视图集于一张图片， 包含正视图、侧视图、后视图， 完整全....png',
      sceneImage: '/images/beautiful-new-world/人物与场景/孟清和 · 废墟jimeng-2026-03-23-7634-废弃文明遗址废墟内部，黑暗空间向外逐渐消失，平视50mm镜头黄金分割构图，苍老学....png',
      sceneName: '废弃文明遗址'
    }
  ],
  
  // 场景
  scenes: [
    {
      name: '废墟大全景',
      time: '0-5s',
      desc: '荒原/废弃建筑/灰蓝压抑天空',
      detail: '航拍俯视角度14mm超广角镜头，千年前文明遗迹，巨大荒原散落锈蚀金属与破碎混凝土，灰蓝色压抑天空低云层，散发末日废弃氛围',
      image: '/images/beautiful-new-world/场景/废墟大全景jimeng-2026-03-23-9604.png'
    },
    {
      name: '新世界装置',
      time: '5-15s',
      desc: '巨型环形结构/紫蓝脉冲光/碎屑悬浮',
      detail: '仰视角度，一团精密复杂能量体悬浮于黑暗空间，能量体形状像巨大机械环形结构，发紫蓝脉冲光芒，碎片悬浮周围散发诡异能量',
      image: '/images/beautiful-new-world/场景/新世界装置核心jimeng-2026-03-23-7410.png'
    },
    {
      name: '林深·观测院',
      time: '15-17s',
      desc: '数据中心/蓝光/压迫感',
      detail: '观测院数据中心全景，低矮天花板密集排列白色管道灰色线缆和黑色通风口，多块蓝光屏幕映照下技术人员面无表情工作',
      image: '/images/beautiful-new-world/人物与场景/林深 · 观测院jimeng-2026-03-23-8981.png'
    },
    {
      name: '苏晚·文献馆',
      time: '17-19s',
      desc: '古籍/烛光/琥珀色',
      detail: '古老文献馆内部场景，满墙木质书架堆满古籍羊皮卷和纪元文献，烛火摇曳暖琥珀色光芒营造古老神秘氛围',
      image: '/images/beautiful-new-world/人物与场景/苏晚 · 文献馆jimeng-2026-03-23-9676.png'
    },
    {
      name: '陈敬言·追捕',
      time: '19-21s',
      desc: '工业走廊/低角仰视/35mm',
      detail: '管理局工业走廊深处，工业金属钢板墙壁接缝笔直延伸至远景消失，低角仰视35mm镜头强化角色威严压迫感',
      image: '/images/beautiful-new-world/人物与场景/陈敬言 · 追捕jimeng-2026-03-23-5994.png'
    },
    {
      name: '孟清和·废墟',
      time: '21-23s',
      desc: '废弃遗址/平视50mm/黄金构图',
      detail: '废弃文明遗址废墟内部，黑暗空间向外逐渐消失，平视50mm镜头黄金分割构图，苍老学者身影渺小却核心稳定',
      image: '/images/beautiful-new-world/人物与场景/孟清和 · 废墟jimeng-2026-03-23-7634.png'
    },
    {
      name: '能量残影',
      time: '25-30s',
      desc: '苍白人形轮廓/白绿荧光/透明闪烁',
      detail: '正面视角，不完整半透明人形魂魄立于黑暗背景前，人形由青白荧光构成，边缘模糊闪烁，散发恐怖超自然气息',
      image: '/images/beautiful-new-world/场景/超自然能量残影jimeng-2026-03-23-8604.png'
    },
    {
      name: '坍缩降临',
      time: '30-35s',
      desc: '地面裂缝/紫光爆发/空间扭曲',
      detail: '俯拍视角，航拍角度镜头，城市末日灾难场景，巨大裂缝撕裂城市地面，裂缝形态自然有机，紫光从裂缝爆发，空间扭曲感',
      image: '/images/beautiful-new-world/场景/坍缩降临jimeng-2026-03-23-8781.png'
    }
  ],
  
  // 50秒结构
  structure: [
    { time: '0-5s', title: '废墟大全景', content: '荒原大全景 + 字幕"文明之后"' },
    { time: '5-15s', title: '新世界装置', content: '能量体展示 + 字幕"他们以为是答案"' },
    { time: '15-23s', title: '四人亮相', content: '林深 → 苏晚 → 陈敬言 → 孟清和' },
    { time: '23-25s', title: '过渡', content: '能量涌动' },
    { time: '25-30s', title: '能量残影', content: '超自然恐怖意象' },
    { time: '30-35s', title: '坍缩降临', content: '末日灾难场景' },
    { time: '35-42s', title: '核心矛盾', content: '字幕"每一步都被算计"' },
    { time: '42-50s', title: '终极对峙', content: '四人关系张力 + 血红标题' }
  ],
  
  // 视觉风格
  visualStyle: {
    palette: [
      { name: '主世界', color: '#4A5568', desc: '冷灰蓝，压抑沉闷' },
      { name: '装置区', color: '#6B46C1', desc: '病态紫+脉冲青，诡异能量' },
      { name: '能量残影', color: '#E8FFF0', desc: '苍白绿白+血红，恐怖' },
      { name: '记忆/过去', color: '#F6AD55', desc: '暖琥珀，温情但即将破碎' }
    ],
    lightShadow: '散射光(主世界)、体积光+边缘光(装置)、白绿荧光(残影)',
    director: '维伦纽瓦 +《湮灭》+ 真探S1'
  },
  
  // 工作流程
  workflow: [
    { phase: 1, name: 'Phase 1: 生图', status: '进行中', tasks: ['10个场景', '4个角色三视图', '角色与场景图'] },
    { phase: 2, name: 'Phase 2: 图生视频', status: '待开始', tasks: ['每镜5-10秒动态', '运镜控制'] },
    { phase: 3, name: 'Phase 3: 剪辑', status: '待开始', tasks: ['调色', 'BGM', '字幕'] }
  ]
}

// 知识库
const knowledgeBase = {
  core: [
    { id: 'five-designs', title: '五大核心设计', icon: '🎨', level: '核心',
      tags: ['视觉', '人物', '场景', '动态', '声音'],
      content: ['## 五大核心设计', '', '### 1. 视觉风格设计 = 色调 + 材质 + 光影', '• 色彩：主色/辅色/高光色（Hex码）', '• 材质：金属/磨砂/油画/实拍质感', '• 光影：光源方向/光线硬度', '', '### 2. 一致性设计 = 角色参考 + 场景底图', '• 角色：正面/侧面/背面/表情参考图', '• 场景：核心场景高分辨率底图', '', '### 3. 动态设计 = 运镜 + 动态强度 + 转场', '', '### 4. 提示词设计 = 结构 + 控制参数', '', '### 5. 声音设计 = BGM + 音效 + 配音'] 
    },
    { id: 'director-thinking', title: '导演思维', icon: '🎬', level: '核心',
      tags: ['景别', '角度', '焦段', '构图'],
      content: ['## 导演思维', '', '### 六大要素', '• 景别：远/全/中/近/特', '• 角度：仰/俯/平/荷兰角', '• 焦段：广角/人像/长焦', '• 构图：三分/对称/负空间/框架', '• 光影：体积光/冷暖对比/轮廓光', '• 动态：相机运动/物理反馈']
    },
    { id: 'prompt-design', title: '提示词设计', icon: '📝', level: '核心',
      tags: ['模块化', '参数', '负面词'],
      content: ['## 提示词设计', '', '### 模块化结构', '[基础风格模块] + [分镜内容模块] + [动态控制模块]', '', '### 控制参数', '• 模型版本、比例、负向提示']
    },
    { id: 'character-design', title: '人物设计', icon: '👤', level: '重要',
      tags: ['黄金锚点', '三视图', '一致性'],
      content: ['## 人物设计', '', '### 黄金锚点原则', '1. 独特性：让人一眼记住', '2. 一致性：全片保持一致', '3. 功能性：可强化角色性格', '', '### 设计要素', '• 外貌、黄金锚点、服装、道具']
    },
    { id: 'scene-design', title: '场景设计', icon: '🏞️', level: '重要',
      tags: ['色彩矩阵', '材质', '空间'],
      content: ['## 场景设计', '', '### 色彩矩阵（Hex码）', '• 主色调：定义整体氛围', '• 辅色调：辅助情感表达', '', '### 材质关键词', '• 金属/木头/布料/玻璃/石头']
    },
    { id: 'motion-design', title: '动态设计', icon: '🎥', level: '重要',
      tags: ['运镜', '动态强度', '转场'],
      content: ['## 动态设计', '', '### 运镜参数', '• 推近、拉远、左移、右移、上升、下降、环绕', '', '### 四级动态强度', '• 静态、微动、轻动、强动']
    },
    { id: 'tools', title: '工具对比', icon: '🛠️', level: '基础',
      tags: ['即梦', '可灵', '剪映'],
      content: ['## 工具对比', '', '### 生图', '• 即梦AI：中文友好', '• Midjourney：质量最高', '', '### 视频', '• 可灵AI：动作连贯', '• 即梦视频：本地首选', '', '### 剪辑', '• 剪映：本土化AI功能']
    }
  ]
}

function DetailModal({ title, content, onClose }: { title: string, content: string[], onClose: () => void }) {
  const renderContent = () => {
    return content.map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-6 mb-3 text-gray-800">{line.replace('## ', '')}</h2>
      if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold mt-4 mb-2 text-gray-700">{line.replace('### ', '')}</h3>
      if (line.trim() === '') return <br key={i} />
      if (line.startsWith('• ')) return <li key={i} className="ml-4 text-gray-600 list-disc my-1">{line.replace('• ', '')}</li>
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
  const [activeTab, setActiveTab] = useState('project')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedDetail, setSelectedDetail] = useState<{ title: string, content: string[] } | null>(null)
  const [activeSection, setActiveSection] = useState('overview')
  const [selectedCharacter, setSelectedCharacter] = useState(0)
  const [selectedScene, setSelectedScene] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold">🎬 {project.name}</Link>
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
          <nav className="px-4 pb-4 md:hidden grid grid-cols-4 gap-2">
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
        {/* 项目页面 */}
        {activeTab === 'project' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* 项目概览 */}
            <section className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold">{project.name}</h1>
                  <p className="text-gray-600">{project.type} · {project.duration}</p>
                </div>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {project.status} · {project.progress}%
                </span>
              </div>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div><span className="text-gray-500">风格参考：</span>{project.style}</div>
              </div>
              
              {/* 进度条 */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>总体进度</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full">
                  <div className="h-3 bg-blue-500 rounded-full transition-all" style={{ width: project.progress + '%' }}></div>
                </div>
              </div>
              
              {/* 三阶段 */}
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                {project.workflow.map((phase, i) => (
                  <div key={i} className={`p-4 rounded-lg border-2 ${phase.status === '进行中' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
                    <h3 className="font-bold">{phase.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{phase.status}</p>
                    <ul className="mt-2 text-sm text-gray-600 space-y-1">
                      {phase.tasks.map((task, j) => (
                        <li key={j}>• {task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 导航标签 */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {[
                { id: 'overview', label: '📋 概览' },
                { id: 'structure', label: '⏱️ 50秒结构' },
                { id: 'characters', label: '👤 四角色' },
                { id: 'scenes', label: '🏞️ 场景' },
                { id: 'visual', label: '🎨 视觉风格' }
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveSection(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeSection === tab.id ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 50秒结构 */}
            {activeSection === 'structure' && (
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">⏱️ 50秒预告片结构</h2>
                <div className="space-y-3">
                  {project.structure.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-20 text-sm font-medium text-blue-600">{item.time}</div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 四角色 */}
            {activeSection === 'characters' && (
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">👤 四角色设计</h2>
                
                {/* 角色选择 */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {project.characters.map((char, i) => (
                    <button key={i} onClick={() => setSelectedCharacter(i)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${selectedCharacter === i ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
                      {char.name}
                    </button>
                  ))}
                </div>
                
                {/* 角色详情 */}
                {project.characters[selectedCharacter] && (
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                        <img src={project.characters[selectedCharacter].characterImage} alt={project.characters[selectedCharacter].name}
                          className="w-full h-full object-cover" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <img src={project.characters[selectedCharacter].threeViewImage} alt="三视图"
                            className="w-full h-full object-contain" />
                        </div>
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <img src={project.characters[selectedCharacter].sceneImage} alt="场景"
                            className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">上：三视图 | 下：{project.characters[selectedCharacter].sceneName}</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{project.characters[selectedCharacter].name}</h3>
                      <p className="text-gray-600 mb-4">{project.characters[selectedCharacter].age} · {project.characters[selectedCharacter].role}</p>
                      
                      <div className="space-y-3 text-sm">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-500">🎯 黄金锚点：</span>
                          <span className="font-medium">{project.characters[selectedCharacter].anchor}</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-500">📝 角色定位：</span>
                          <span>{project.characters[selectedCharacter].role2}</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-500">💫 性格：</span>
                          <span>{project.characters[selectedCharacter].personality}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-500">身高：</span>{project.characters[selectedCharacter].height}
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-500">体型：</span>{project.characters[selectedCharacter].body}
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-500">面部：</span>{project.characters[selectedCharacter].face}
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-500">发色：</span>{project.characters[selectedCharacter].hair}
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-500">眼睛：</span>{project.characters[selectedCharacter].eyes}
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-500">服装：</span>{project.characters[selectedCharacter].clothes}
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-500">配饰：</span>{project.characters[selectedCharacter].accessory}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* 场景 */}
            {activeSection === 'scenes' && (
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">🏞️ 场景设计</h2>
                
                {/* 场景选择 */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {project.scenes.map((scene, i) => (
                    <button key={i} onClick={() => setSelectedScene(i)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${selectedScene === i ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
                      {scene.name}
                    </button>
                  ))}
                </div>
                
                {/* 场景详情 */}
                {project.scenes[selectedScene] && (
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img src={project.scenes[selectedScene].image} alt={project.scenes[selectedScene].name}
                        className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold">{project.scenes[selectedScene].name}</h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{project.scenes[selectedScene].time}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{project.scenes[selectedScene].desc}</p>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">详细描述：</h4>
                        <p className="text-sm text-gray-700">{project.scenes[selectedScene].detail}</p>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* 视觉风格 */}
            {activeSection === 'visual' && (
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">🎨 视觉风格</h2>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">色彩矩阵</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {project.visualStyle.palette.map((p, i) => (
                      <div key={i} className="text-center">
                        <div className="w-full h-20 rounded-lg mb-2 shadow-inner" style={{ backgroundColor: p.color }}></div>
                        <p className="font-medium text-sm">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">光影设计</h3>
                  <p className="text-sm text-gray-700">{project.visualStyle.lightShadow}</p>
                </div>
                
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">导演风格参考</h3>
                  <p className="text-sm text-gray-700">{project.visualStyle.director}</p>
                </div>
              </section>
            )}

            {/* 默认显示概览 */}
            {activeSection === 'overview' && (
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">📋 项目概览</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3 text-blue-600">基本信息</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• 类型：{project.type}</li>
                      <li>• 时长：{project.duration}</li>
                      <li>• 风格：{project.style}</li>
                      <li>• 进度：{project.progress}%</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3 text-blue-600">核心概念</h3>
                    <p className="text-sm text-gray-700">{project.description}</p>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {/* 知识库 */}
        {activeTab === 'knowledge' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">📚 AI视频制作知识库</h1>
              <p className="text-gray-600">点击卡片查看详情</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {knowledgeBase.core.map((item, i) => (
                <div key={i} onClick={() => setSelectedDetail({ title: item.title, content: item.content })}
                  className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${item.level === '核心' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{item.level}</span>
                  </div>
                  <h3 className="font-bold">{item.title}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.slice(0, 3).map((tag, j) => (
                      <span key={j} className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 流程 */}
        {activeTab === 'workflow' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">🗺️ AI视频制作流程</h1>
              <p className="text-gray-600">点击查看详情</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                {['初始化项目', '剧本+分镜', '五大设计', '参考图生成', '首帧生图', '图生视频', '音频/剪辑'].map((step, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">{i + 1}</div>
                    <span className="font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* OpenClaw */}
        {activeTab === 'openclaw' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">🦞 OpenClaw学习</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['初识OpenClaw', '快速开始', '深度对话', '文件与代码', '技能扩展', '自动化', '高级技巧'].map((title, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
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
            <div className="grid grid-cols-4 gap-3 mt-6">
              <a href="https://docs.openclaw.ai" target="_blank" className="bg-white rounded-xl p-4 shadow-sm text-center">
                <div className="text-2xl">📖</div>
                <h3 className="text-sm">官方文档</h3>
              </a>
              <a href="https://clawhub.com" target="_blank" className="bg-white rounded-xl p-4 shadow-sm text-center">
                <div className="text-2xl">🧩</div>
                <h3 className="text-sm">ClawHub</h3>
              </a>
              <a href="https://github.com/openclaw/openclaw" target="_blank" className="bg-white rounded-xl p-4 shadow-sm text-center">
                <div className="text-2xl">⭐</div>
                <h3 className="text-sm">GitHub</h3>
              </a>
              <a href="https://discord.com/invite/clawd" target="_blank" className="bg-white rounded-xl p-4 shadow-sm text-center">
                <div className="text-2xl">💬</div>
                <h3 className="text-sm">Discord</h3>
              </a>
            </div>
          </div>
        )}
      </main>

      {selectedDetail && <DetailModal title={selectedDetail.title} content={selectedDetail.content} onClose={() => setSelectedDetail(null)} />}

      <footer className="py-6 border-t bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>📚 本地知识库：~/Desktop/AI视频知识库/</p>
        </div>
      </footer>
    </div>
  )
}
