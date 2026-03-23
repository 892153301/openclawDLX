'use client'

import { useState } from 'react'
import Link from 'next/link'

const beautifulNewWorld = {
  title: '美丽新世界',
  subtitle: 'AI视频预告片项目',
  characters: [
    { name: '林深', age: '28岁', role: '观测院数据整理者', anchor: '左颧骨旧伤疤 · 黑框眼镜', color: '#2C3E50',
      characterImage: '/images/beautiful-new-world/人物设计参考/林深，jimeng-2026-03-23-1969-28岁中国男性数据分析师，观测院工作，精瘦体型微驼背，瘦长脸颧骨突出，黑眼圈，短....png',
      threeViewImage: '/images/beautiful-new-world/人物三视图/林深，jimeng-2026-03-23-1703-28岁中国男性数据分析师，三视图集于一张图片， 包含正视图、侧视图、后视图， 完整全身像从....png',
      sceneImage: '/images/beautiful-new-world/人物与场景/林深 · 观测院jimeng-2026-03-23-8981-观测院数据中心全景，低矮天花板密集排列白色管道灰色线缆和黑色通风口，多块蓝光数据....png',
      sceneName: '观测院数据中心' },
    { name: '苏晚', age: '26岁', role: '文献馆破译者', anchor: '右手无名指墨渍 · 左手腕红绳', color: '#8B7355',
      characterImage: '/images/beautiful-new-world/人物设计参考/苏晚，jimeng-2026-03-23-7274-26岁中国女性破译者，文献馆工作，纤细体型姿态挺拔，鹅蛋脸眉眼清秀，深棕色杏仁眼....png',
      threeViewImage: '/images/beautiful-new-world/人物三视图/苏晚，jimeng-2026-03-23-9307-26岁中国女性破译者，三视图集于一张图片， 包含正视图、侧视图、后视图， 完整全....png',
      sceneImage: '/images/beautiful-new-world/人物与场景/苏晚 · 文献馆jimeng-2026-03-23-9676-古老文献馆内部场景，满墙木质书架堆满古籍羊皮卷和纪元文献，烛火摇曳暖琥珀色光芒营....png',
      sceneName: '文献馆' },
    { name: '陈敬言', age: '40岁', role: '管理局行动司司长', anchor: '右手臂"新世界"纹路疤痕', color: '#1A1A1A',
      characterImage: '/images/beautiful-new-world/人物设计参考/陈敬言，jimeng-2026-03-23-8117-40 years old Chinese male, tall athletic....png',
      threeViewImage: '/images/beautiful-new-world/人物三视图/陈敬言，jimeng-2026-03-23-8954-40岁中国男性，三视图集于一张图片， 包含正视图、侧视图、后视图， 完整全身像从....png',
      sceneImage: '/images/beautiful-new-world/人物与场景/陈敬言 · 追捕jimeng-2026-03-23-5994-管理局工业走廊深处，工业金属钢板墙壁接缝笔直延伸至远景消失，低角仰视35mm镜头....png',
      sceneName: '管理局工业走廊' },
    { name: '孟清和', age: '67岁', role: '隐居老学者', anchor: '左眼老年斑 · 左手少一小指', color: '#3E2723',
      characterImage: '/images/beautiful-new-world/人物设计参考/孟清和，jimeng-2026-03-23-8056-67岁中国老年学者，曾观测院核心研究者，高瘦体型微微佝偻如老树但核心稳定，长脸皱....png',
      threeViewImage: '/images/beautiful-new-world/人物三视图/孟清和，jimeng-2026-03-23-6309-67岁中国老年学者，三视图集于一张图片， 包含正视图、侧视图、后视图， 完整全身....png',
      sceneImage: '/images/beautiful-new-world/人物与场景/孟清和 · 废墟jimeng-2026-03-23-7634-废弃文明遗址废墟内部，黑暗空间向外逐渐消失，平视50mm镜头黄金分割构图，苍老学....png',
      sceneName: '废弃文明遗址' }
  ],
  sceneImages: [
    { src: '/images/beautiful-new-world/场景/废墟大全景jimeng-2026-03-23-9604-电影级末日废墟大全景，航拍俯视角度14mm超广角，千年前文明遗迹，巨大荒原散落锈....png', name: '废墟大全景', time: '0-5s' },
    { src: '/images/beautiful-new-world/场景/新世界装置核心jimeng-2026-03-23-7410-新世界装置核心全景，仰视角度，一团精密复杂的能力体悬浮于黑暗空间中，能量体的形状....png', name: '新世界装置', time: '5-15s' },
    { src: '/images/beautiful-new-world/场景/超自然能量残影jimeng-2026-03-23-8604-超自然能量残影恐怖景象，正面视角，不完整的半透明人形魂魄立于黑暗背景前，人形由青....png', name: '能量残影', time: '25-30s' },
    { src: '/images/beautiful-new-world/场景/坍缩降临jimeng-2026-03-23-8781-坍缩降临俯拍视角，航拍角度镜头，城市末日灾难场景，巨大裂缝撕裂城市地面裂缝形态自....png', name: '坍缩降临', time: '30-35s' }
  ],
  colorPalette: [
    { name: '主世界', color: '#4A5568', desc: '冷灰蓝' },
    { name: '装置区', color: '#6B46C1', desc: '病态紫' },
    { name: '能量残影', color: '#E8FFF0', desc: '苍白绿白' },
    { name: '记忆/过去', color: '#F6AD55', desc: '暖琥珀' }
  ]
}

const projectMaterials = [
  { name: '项目任务书', file: '/materials/美丽新世界_项目任务书.txt', size: '5KB', type: 'txt' },
  { name: '风格提案', file: '/materials/美丽新世界_风格提案.txt', size: '14KB', type: 'txt' },
  { name: '角色设计', file: '/materials/美丽新世界_角色设计_丰富版.md', size: '18KB', type: 'md' },
  { name: '场景设计', file: '/materials/美丽新世界_场景设计_丰富版.md', size: '37KB', type: 'md' },
  { name: '三视图提示词', file: '/materials/美丽新世界_三视图提示词_标准模板.md', size: '6KB', type: 'md' }
]

const tabs = [
  { id: 'ai-projects', label: '🎬 AI视频项目' },
  { id: 'director-thinking', label: '🎯 导演思维' },
  { id: 'workflow', label: '📋 制作流程' },
  { id: 'knowledge', label: '📚 知识库' },
  { id: 'openclaw', label: '🦞 OpenClaw' }
]

const directorThinking = [
  { title: '景别控制', desc: '远/全/中/近/特五种景别的情绪表达力', level: '基础' },
  { title: '角度运用', desc: '仰/俯/平/荷兰角的空间心理暗示', level: '基础' },
  { title: '焦段选择', desc: '广角/人像/长焦的视觉叙事', level: '进阶' },
  { title: '构图法则', desc: '三分/对称/负空间/框架的视觉引导', level: '进阶' },
  { title: '光影逻辑', desc: '体积光/冷暖对比/轮廓光的氛围塑造', level: '核心' },
  { title: '动态设计', desc: '相机运动/物理反馈/叙事动作', level: '核心' }
]

const workflow = [
  { step: 1, name: '剧本设计', desc: '确定故事结构、情感节奏、核心主题', icon: '📝' },
  { step: 2, name: '视觉风格', desc: '确定色调、光影、构图、情绪基调', icon: '🎨' },
  { step: 3, name: '角色设计', desc: '角色外观、黄金锚点、服装道具', icon: '👤' },
  { step: 4, name: '分镜脚本', desc: '场景拆分、运镜设计、动态描述', icon: '🎬' },
  { step: 5, name: '生图阶段', desc: '即梦AI生图、多版本备选、Seed固定', icon: '✨' },
  { step: 6, name: '图生视频', desc: '即梦AI视频、运镜控制、动作设计', icon: '🎥' },
  { step: 7, name: '剪辑合成', desc: '剪映Pro剪辑、调色、BGM、字幕', icon: '✂️' }
]

const knowledgeBase = [
  { title: '即梦AI使用指南', desc: '生图4.0、图生视频3.0完整教程' },
  { title: '可灵AI完全指南', desc: '可灵AI视频生成技巧与提示词' },
  { title: 'AI视频提示词设计', desc: '模块化提示词、参数调试、负面词' },
  { title: '分镜脚本标准模板', desc: '10场景分镜标准化格式' },
  { title: '导演思维公式', desc: '视点叙事、环境压抑、时间停滞等公式' },
  { title: '声音设计指南', desc: 'BGM选择、音效、旁白配音' }
]

const openclawDays = [
  { day: 1, title: '初识 OpenClaw', icon: '👋', excerpt: 'AI助手和聊天机器人的本质区别' },
  { day: 2, title: '深度对话', icon: '💬', excerpt: '掌握与AI沟通的艺术' },
  { day: 3, title: '文件与代码', icon: '📁', excerpt: '让AI处理文件、写代码、执行脚本' },
  { day: 4, title: '网络能力', icon: '🌐', excerpt: '搜索、爬取、调用API' },
  { day: 5, title: '技能扩展', icon: '🧩', excerpt: '安装社区技能扩展AI能力' },
  { day: 6, title: '自动化', icon: '⏰', excerpt: '定时任务、心跳、主动推送' },
  { day: 7, title: '高级技巧', icon: '🚀', excerpt: '多Agent、浏览器控制、设备集成' }
]

function ImageModal({ src, alt, onClose }: { src: string, alt: string, onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-10 right-0 text-white text-lg hover:text-gray-300">✕ 关闭</button>
        <img src={src} alt={alt} className="w-full h-auto rounded-lg" />
        <div className="mt-4 flex justify-center">
          <a href={src} download={alt + '.png'} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            ⬇️ 下载图片
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('ai-projects')
  const [expandedSection, setExpandedSection] = useState('characters')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string } | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white border-b sticky top-0 z-40 lg:hidden">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">🎬 AI影视工坊</Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg hover:bg-gray-100 text-xl">{mobileMenuOpen ? '✕' : '☰'}</button>
        </div>
        {mobileMenuOpen && (
          <nav className="px-4 pb-4 grid grid-cols-3 gap-2">
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
            <Link href="/" className="text-2xl font-bold">🎬 AI影视工坊</Link>
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
        {activeTab === 'ai-projects' && <AIProjectsSection expandedSection={expandedSection} setExpandedSection={setExpandedSection} onImageClick={(src, alt) => setSelectedImage({ src, alt })} />}
        {activeTab === 'director-thinking' && <DirectorThinkingSection />}
        {activeTab === 'workflow' && <WorkflowSection />}
        {activeTab === 'knowledge' && <KnowledgeSection />}
        {activeTab === 'openclaw' && <OpenClawSection />}
      </main>

      {selectedImage && <ImageModal src={selectedImage.src} alt={selectedImage.alt} onClose={() => setSelectedImage(null)} />}

      <footer className="py-6 border-t bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>AI影视工坊 - OpenClaw大龙虾</p>
        </div>
      </footer>
    </div>
  )
}

function AIProjectsSection({ expandedSection, setExpandedSection, onImageClick }: { expandedSection: string, setExpandedSection: (s: string) => void, onImageClick: (src: string, alt: string) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{beautifulNewWorld.title}</h1>
        <p className="text-gray-600 text-sm md:text-base">{beautifulNewWorld.subtitle}</p>
      </div>

      <div className="mb-6 overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex gap-2 whitespace-nowrap">
          <button onClick={() => setExpandedSection('characters')} className={`px-4 py-2 rounded-lg text-sm font-medium flex-shrink-0 ${expandedSection === 'characters' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>👤 参考图</button>
          <button onClick={() => setExpandedSection('threeview')} className={`px-4 py-2 rounded-lg text-sm font-medium flex-shrink-0 ${expandedSection === 'threeview' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>🔲 三视图</button>
          <button onClick={() => setExpandedSection('character-scene')} className={`px-4 py-2 rounded-lg text-sm font-medium flex-shrink-0 ${expandedSection === 'character-scene' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>🎭 人物场景</button>
          <button onClick={() => setExpandedSection('scenes')} className={`px-4 py-2 rounded-lg text-sm font-medium flex-shrink-0 ${expandedSection === 'scenes' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>🏞️ 场景</button>
          <button onClick={() => setExpandedSection('mission')} className={`px-4 py-2 rounded-lg text-sm font-medium flex-shrink-0 ${expandedSection === 'mission' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>📄 任务书</button>
          <button onClick={() => setExpandedSection('materials')} className={`px-4 py-2 rounded-lg text-sm font-medium flex-shrink-0 ${expandedSection === 'materials' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>📥 资料</button>
        </div>
      </div>

      {expandedSection === 'characters' && (
        <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4">👤 人物设计参考图</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {beautifulNewWorld.characters.map((char, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <div className="aspect-square bg-gray-100 cursor-pointer relative group" onClick={() => onImageClick(char.characterImage, char.name + '_参考图')}>
                  <img src={char.characterImage} alt={char.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition text-2xl">🔍</span>
                  </div>
                </div>
                <div className="p-2 md:p-3">
                  <h3 className="font-bold text-sm md:text-base">{char.name}</h3>
                  <p className="text-xs text-gray-500">{char.age}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {expandedSection === 'threeview' && (
        <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4">🔲 人物三视图</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {beautifulNewWorld.characters.map((char, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <div className="aspect-video bg-gray-100 cursor-pointer relative group" onClick={() => onImageClick(char.threeViewImage, char.name + '_三视图')}>
                  <img src={char.threeViewImage} alt={char.name + '三视图'} className="w-full h-full object-contain" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition text-xl">🔍 + ⬇️</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold">{char.name}</h3>
                  <p className="text-sm text-gray-500">{char.age} · {char.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {expandedSection === 'character-scene' && (
        <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4">🎭 人物与场景设计</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {beautifulNewWorld.characters.map((char, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <div className="aspect-video bg-gray-100 cursor-pointer relative group" onClick={() => onImageClick(char.sceneImage, char.name + '_' + char.sceneName)}>
                  <img src={char.sceneImage} alt={char.name + char.sceneName} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition text-xl">🔍</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold">{char.name} · {char.sceneName}</h3>
                  <p className="text-sm text-gray-500">{char.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {expandedSection === 'scenes' && (
        <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4">🏞️ 场景设计</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {beautifulNewWorld.sceneImages.map((scene, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <div className="aspect-video bg-gray-100 cursor-pointer relative group" onClick={() => onImageClick(scene.src, scene.name)}>
                  <img src={scene.src} alt={scene.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition text-xl">🔍</span>
                  </div>
                </div>
                <div className="p-2">
                  <p className="font-medium text-sm">{scene.name}</p>
                  <p className="text-xs text-gray-500">{scene.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="font-bold mb-3">🎨 视觉色调板</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {beautifulNewWorld.colorPalette.map((palette, i) => (
                <div key={i} className="text-center">
                  <div className="w-full h-16 md:h-20 rounded-lg mb-2 shadow-inner" style={{ backgroundColor: palette.color }} />
                  <p className="font-medium text-sm">{palette.name}</p>
                  <p className="text-xs text-gray-500">{palette.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {expandedSection === 'mission' && (
        <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4">📄 项目任务书</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold mb-2">项目概述</h3>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li><strong>作品名：</strong>美丽新世界</li>
                <li><strong>类型：</strong>科幻悬疑AI预告片 · 约50秒</li>
                <li><strong>参考风格：</strong>维伦纽瓦 +《湮灭》+ 真探S1</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold mb-2">工作流程</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white rounded-lg p-3"><h4 className="font-bold text-sm">Phase 1 — 生图</h4><p className="text-xs text-gray-600">即梦AI · 10场景 + 4角色三视图</p></div>
                <div className="bg-white rounded-lg p-3"><h4 className="font-bold text-sm">Phase 2 — 图生视频</h4><p className="text-xs text-gray-600">即梦AI · 每镜5-10秒动态</p></div>
                <div className="bg-white rounded-lg p-3"><h4 className="font-bold text-sm">Phase 3 — 剪辑</h4><p className="text-xs text-gray-600">剪映Pro · 调色/BGM/字幕</p></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {expandedSection === 'materials' && (
        <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4">📥 项目资料下载</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projectMaterials.map((material, i) => (
              <a key={i} href={material.file} download className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{material.type === 'md' ? '📝' : '📄'}</span>
                  <div>
                    <h3 className="font-medium">{material.name}</h3>
                    <p className="text-sm text-gray-500">{material.size}</p>
                  </div>
                </div>
                <span className="text-blue-600 text-xl">⬇️</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function DirectorThinkingSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">🎯 导演思维与学习计划</h1>
        <p className="text-gray-600">掌握视觉叙事的核心能力</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {directorThinking.map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${item.level === '核心' ? 'bg-red-100 text-red-800' : item.level === '进阶' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{item.level}</span>
            <h3 className="text-lg font-bold mt-3 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function WorkflowSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">📋 AI视频制作流程</h1>
        <p className="text-gray-600">从概念到成品的7步法则</p>
      </div>
      <div className="space-y-4">
        {workflow.map((item, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
            <div className="flex-1 bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-gray-500">Step {item.step}</span>
                <h3 className="text-lg font-bold">{item.name}</h3>
              </div>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function KnowledgeSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">📚 AI知识库</h1>
        <p className="text-gray-600">本地AI视频制作相关知识</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {knowledgeBase.map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition cursor-pointer">
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
            <span className="text-blue-600 text-sm mt-3 inline-block">查看详情 →</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function OpenClawSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">🦞 OpenClaw学习与资料</h1>
        <p className="text-gray-600">7天掌握你的AI私人助理</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {openclawDays.map((item) => (
          <div key={item.day} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <span className="text-xs text-gray-500">DAY {item.day}</span>
                <h3 className="font-bold text-sm">{item.title}</h3>
              </div>
            </div>
            <p className="text-gray-600 text-xs">{item.excerpt}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
  )
}
