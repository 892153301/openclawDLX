'use client'

import { useState } from 'react'
import Link from 'next/link'

// 导入旧版7天课程内容
import DayContent from './day-content'

// 美丽新世界项目内容
const beautifulNewWorld = {
  title: '美丽新世界',
  subtitle: 'AI视频预告片项目',
  description: '科幻悬疑风格，约50秒预告片，维伦纽瓦+湮灭+真探S1风格',
  characters: [
    {
      name: '林深',
      age: '28岁',
      role: '观测院数据整理者',
      anchor: '左颧骨旧伤疤 · 黑框眼镜（总歪）',
      description: '精瘦体型，瘦长脸颧骨突出，黑眼圈，短乱发，深褐色眼睛',
      color: '#2C3E50'
    },
    {
      name: '苏晚',
      age: '26岁',
      role: '文献馆纪元文字破译者',
      anchor: '右手无名指墨水渍 · 左手腕红绳',
      description: '纤细体型，鹅蛋脸清秀，眉眼清晰，低马尾发型垂落两侧',
      color: '#8B7355'
    },
    {
      name: '陈敬言',
      age: '40岁',
      role: '管理局行动司司长',
      anchor: '右手臂"新世界"纹路疤痕',
      description: '高瘦体型肩宽背挺，棱角分明方下巴，灰黑色眼睛直视前方',
      color: '#1A1A1A'
    },
    {
      name: '孟清和',
      age: '67岁',
      role: '隐居老学者',
      anchor: '左眼下方老年斑 · 左手少一小指',
      description: '瘦高体型微微佝偻，长脸皱纹深刻，苍白长发垂落两侧',
      color: '#3E2723'
    }
  ],
  scenes: [
    { name: '废墟大全景', time: '0-5s', desc: '荒原/废弃建筑/灰蓝压抑天空' },
    { name: '新世界装置', time: '5-15s', desc: '巨型环形结构/紫蓝脉冲光/碎屑悬浮' },
    { name: '林深·观测院', time: '15-17s', desc: '数据中心/蓝光屏幕/背影伏案' },
    { name: '苏晚·文献馆', time: '17-19s', desc: '泛黄古籍/琥珀台灯/专注破译' },
    { name: '陈敬言·追捕', time: '19-21s', desc: '工业走廊/低角仰拍/暗红袖标' },
    { name: '孟清和·废墟', time: '21-23s', desc: '废墟空间/蜡烛微光/兜帽身影' },
    { name: '能量残影', time: '25-30s', desc: '苍白人形轮廓/白绿荧光/透明闪烁' },
    { name: '坍缩降临', time: '30-35s', desc: '地面裂缝/紫光爆发/空间扭曲' },
    { name: '四人对峙', time: '35-42s', desc: '废弃穹顶/光影分割/对立站位' },
    { name: '标题落版', time: '42-50s', desc: '黑暗背景/血红色标题"美丽新世界"' }
  ],
  colorPalette: [
    { name: '主世界', color: '#4A5568', desc: '冷灰蓝，压抑沉闷' },
    { name: '装置区', color: '#6B46C1', desc: '病态紫+脉冲青，诡异能量' },
    { name: '能量残影', color: '#E8FFF0', desc: '苍白绿白+血红，恐怖' },
    { name: '记忆/过去', color: '#F6AD55', desc: '暖琥珀，温情但即将破碎' }
  ]
}

const tabs = [
  { id: 'ai-projects', label: '🎬 AI视频项目', icon: '🎬' },
  { id: 'director-thinking', label: '🎯 导演思维与学习计划', icon: '🎯' },
  { id: 'workflow', label: '📋 AI视频制作流程', icon: '📋' },
  { id: 'knowledge', label: '📚 AI知识库', icon: '📚' },
  { id: 'openclaw', label: '🦞 OpenClaw学习与资料', icon: '🦞' }
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
  { title: '即梦AI使用指南', desc: '生图4.0、图生视频3.0完整教程', path: '/knowledge/jimeng' },
  { title: '可灵AI完全指南', desc: '可灵AI视频生成技巧与提示词', path: '/knowledge/kling' },
  { title: 'AI视频提示词设计', desc: '模块化提示词、参数调试、负面词', path: '/knowledge/prompt' },
  { title: '分镜脚本标准模板', desc: '10场景分镜标准化格式', path: '/knowledge/storyboard' },
  { title: '导演思维公式', desc: '视点叙事、环境压抑、时间停滞等公式', path: '/knowledge/director' },
  { title: '声音设计指南', desc: 'BGM选择、音效、旁白配音', path: '/knowledge/audio' }
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('ai-projects')
  const [expandedSection, setExpandedSection] = useState<string | null>('characters')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold">🎬 AI影视工坊</Link>
            <div className="flex items-center space-x-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* AI视频项目 Tab */}
        {activeTab === 'ai-projects' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* 项目标题 */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-2">{beautifulNewWorld.title}</h1>
              <p className="text-xl text-gray-600">{beautifulNewWorld.subtitle}</p>
              <p className="text-gray-500 mt-2">{beautifulNewWorld.description}</p>
            </div>

            {/* 快捷导航 */}
            <div className="flex justify-center gap-4 mb-8 flex-wrap">
              <button 
                onClick={() => setExpandedSection('characters')}
                className={`px-6 py-3 rounded-lg font-medium ${
                  expandedSection === 'characters' ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-50'
                }`}
              >
                👤 人物设计参考图
              </button>
              <button 
                onClick={() => setExpandedSection('threeview')}
                className={`px-6 py-3 rounded-lg font-medium ${
                  expandedSection === 'threeview' ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-50'
                }`}
              >
                🔲 人物三视图
              </button>
              <button 
                onClick={() => setExpandedSection('character-scene')}
                className={`px-6 py-3 rounded-lg font-medium ${
                  expandedSection === 'character-scene' ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-50'
                }`}
              >
                🎭 人物与场景
              </button>
              <button 
                onClick={() => setExpandedSection('scenes')}
                className={`px-6 py-3 rounded-lg font-medium ${
                  expandedSection === 'scenes' ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-50'
                }`}
              >
                🏞️ 场景设计
              </button>
              <button 
                onClick={() => setExpandedSection('mission')}
                className={`px-6 py-3 rounded-lg font-medium ${
                  expandedSection === 'mission' ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-50'
                }`}
              >
                📄 任务书
              </button>
            </div>

            {/* 人物设计参考图 */}
            {expandedSection === 'characters' && (
              <section className="bg-white rounded-xl p-8 shadow-sm mb-8">
                <h2 className="text-2xl font-bold mb-6">👤 人物设计参考图</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {beautifulNewWorld.characters.map((char, i) => (
                    <div key={i} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div 
                        className="aspect-square rounded-lg mb-4 flex items-center justify-center text-white text-6xl"
                        style={{ backgroundColor: char.color }}
                      >
                        {char.name[0]}
                      </div>
                      <h3 className="font-bold text-lg">{char.name}</h3>
                      <p className="text-sm text-gray-500">{char.age} · {char.role}</p>
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-xs text-gray-400">黄金锚点</p>
                        <p className="text-sm">{char.anchor}</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-400">外貌特征</p>
                        <p className="text-sm">{char.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 人物三视图 */}
            {expandedSection === 'threeview' && (
              <section className="bg-white rounded-xl p-8 shadow-sm mb-8">
                <h2 className="text-2xl font-bold mb-6">🔲 人物三视图提示词</h2>
                <div className="space-y-6">
                  {beautifulNewWorld.characters.map((char, i) => (
                    <div key={i} className="border rounded-lg p-6">
                      <h3 className="font-bold text-lg mb-4">{char.name} - 三视图提示词</h3>
                      <div className="bg-gray-50 rounded-lg p-4 text-sm font-mono">
                        <p className="text-gray-600 mb-2">// {char.name}（{char.age}{char.role}）</p>
                        <p className="text-gray-800">
                          三视图集于一张图片，包含正视图、侧视图、后视图，
                          完整全身像从头顶到脚底，
                          {char.description}，
                          {char.anchor.split('·').map((a, j) => (
                            <span key={j}> {a.trim()}</span>
                          ))}，
                          纯白色背景，电影感，8k
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    💡 <strong>使用说明：</strong>复制提示词到即梦AI，使用图片4.0模型，比例3:2，质量4K生成。
                  </p>
                </div>
              </section>
            )}

            {/* 人物与场景 */}
            {expandedSection === 'character-scene' && (
              <section className="bg-white rounded-xl p-8 shadow-sm mb-8">
                <h2 className="text-2xl font-bold mb-6">🎭 人物与场景设计</h2>
                <div className="space-y-6">
                  {beautifulNewWorld.characters.map((char, i) => (
                    <div key={i} className="border rounded-lg overflow-hidden">
                      <div 
                        className="p-4 text-white"
                        style={{ backgroundColor: char.color }}
                      >
                        <h3 className="font-bold text-lg">{char.name} · {char.role}</h3>
                      </div>
                      <div className="p-4 grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">场景{i + 3}</p>
                          <p className="font-medium">{beautifulNewWorld.scenes[i + 2]?.name || '待定'}</p>
                          <p className="text-sm text-gray-600">{beautifulNewWorld.scenes[i + 2]?.desc}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">提示词要点</p>
                          <p className="text-sm">
                            {i === 0 && '观测院数据中心全景，蓝光数据终端屏幕，低角度侧后跟拍，背影偏左三分法构图，冷青屏幕光补光'}
                            {i === 1 && '古老文献馆，满墙木质书架，烛火摇曳暖琥珀色光芒，中景侧45度角度专注工作侧颜'}
                            {i === 2 && '管理局工业走廊，工业金属钢板墙壁，低角仰视35mm镜头，对称构图产生压迫感'}
                            {i === 3 && '废弃文明遗址废墟内部，黑暗空间逐渐消失，平视50mm镜头黄金分割构图，蜡烛微光摇曳'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 场景设计 */}
            {expandedSection === 'scenes' && (
              <section className="bg-white rounded-xl p-8 shadow-sm mb-8">
                <h2 className="text-2xl font-bold mb-6">🏞️ 场景设计（10场景）</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {beautifulNewWorld.scenes.map((scene, i) => (
                    <div key={i} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">#{i + 1}</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {scene.time}
                        </span>
                      </div>
                      <h3 className="font-bold">{scene.name}</h3>
                      <p className="text-sm text-gray-600 mt-2">{scene.desc}</p>
                    </div>
                  ))}
                </div>

                {/* 色调板 */}
                <div className="mt-8">
                  <h3 className="font-bold text-lg mb-4">🎨 视觉色调板</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {beautifulNewWorld.colorPalette.map((palette, i) => (
                      <div key={i} className="text-center">
                        <div 
                          className="w-full h-20 rounded-lg mb-2 shadow-inner"
                          style={{ backgroundColor: palette.color }}
                        />
                        <p className="font-medium">{palette.name}</p>
                        <p className="text-xs text-gray-500">{palette.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 任务书 */}
            {expandedSection === 'mission' && (
              <section className="bg-white rounded-xl p-8 shadow-sm mb-8">
                <h2 className="text-2xl font-bold mb-6">📄 项目任务书</h2>
                <div className="prose max-w-none">
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-bold mb-2">一、项目概述</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li><strong>作品名：</strong>美丽新世界</li>
                      <li><strong>类型：</strong>科幻悬疑AI预告片</li>
                      <li><strong>时长：</strong>约50秒</li>
                      <li><strong>核心概念：</strong>未来能量被抽干的末日世界，"新世界"装置抽取本世界未来生态势能</li>
                      <li><strong>参考风格：</strong>维伦纽瓦 +《湮灭》+ 真探S1</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-bold mb-2">二、预告片结构（50秒）</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-4">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs whitespace-nowrap">0-5s</span>
                        <p>冷开场：废墟大全景 + 低沉环境音 + 字幕"文明之后"</p>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs whitespace-nowrap">5-15s</span>
                        <p>新世界装置：巨物特写 + 脉冲光 + 字幕"他们以为是答案"</p>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs whitespace-nowrap">15-25s</span>
                        <p>四人快速亮相（每人一镜）</p>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs whitespace-nowrap">25-35s</span>
                        <p>坍缩降临：残影涌动 + 世界扭曲 + 剪辑加速</p>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs whitespace-nowrap">35-42s</span>
                        <p>核心矛盾：两条线索交叉剪辑 + 字幕"每一步都被算计"</p>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs whitespace-nowrap">42-50s</span>
                        <p>终极画面：新世界全貌 vs 四人对峙 + 血红色标题</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-bold mb-2">三、工作流程</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-bold mb-2">Phase 1 — 生图</h4>
                        <p className="text-sm text-gray-600">即梦AI · 10场景 + 4角色三视图</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-bold mb-2">Phase 2 — 图生视频</h4>
                        <p className="text-sm text-gray-600">即梦AI · 每镜5-10秒动态</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-bold mb-2">Phase 3 — 剪辑</h4>
                        <p className="text-sm text-gray-600">剪映Pro · 调色/BGM/字幕</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-2">⚠️ 待执行事项</h3>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      <li>即梦AI账号状态确认</li>
                      <li>剪映Pro版本确认</li>
                      <li>各场景生图优先级排序</li>
                      <li>Phase 1启动：生成10场景 + 4角色三视图</li>
                    </ul>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {/* 导演思维与学习计划 Tab */}
        {activeTab === 'director-thinking' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-2">🎯 导演思维与学习计划</h1>
              <p className="text-xl text-gray-600">掌握视觉叙事的核心能力</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {directorThinking.map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.level === '核心' ? 'bg-red-100 text-red-800' :
                      item.level === '进阶' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">📚 学习路径建议</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-bold">基础夯实（1-2周）</h3>
                    <p className="text-gray-600">景别、角度、焦段、构图四要素的专项练习</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-bold">进阶整合（2-4周）</h3>
                    <p className="text-gray-600">光影逻辑与动态设计，建立个人风格</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-bold">实战应用（持续）</h3>
                    <p className="text-gray-600">完整项目制作，从剧本到成片的全流程</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI视频制作流程 Tab */}
        {activeTab === 'workflow' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-2">📋 AI视频制作流程</h1>
              <p className="text-xl text-gray-600">从概念到成品的7步法则</p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden lg:block" />
              
              <div className="space-y-8">
                {workflow.map((item, i) => (
                  <div key={i} className={`flex items-center gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl">
                            {item.icon}
                          </span>
                          <div>
                            <span className="text-sm text-gray-500">Step {item.step}</span>
                            <h3 className="text-xl font-bold">{item.name}</h3>
                          </div>
                        </div>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                    <div className="hidden lg:block w-4 h-4 rounded-full bg-blue-600 border-4 border-blue-100 z-10" />
                    <div className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI知识库 Tab */}
        {activeTab === 'knowledge' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-2">📚 AI知识库</h1>
              <p className="text-xl text-gray-600">本地AI视频制作相关知识</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {knowledgeBase.map((item, i) => (
                <Link 
                  key={i} 
                  href={item.path}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                  <span className="text-blue-600 text-sm mt-4 inline-block">查看详情 →</span>
                </Link>
              ))}
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-4">🔥 核心工具</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>即梦AI</span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">生图4.0 + 视频3.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>可灵AI</span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">视频生成</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>剪映Pro</span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">剪辑合成</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-4">💡 提示词技巧</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>• 首帧质量决定70%效果</li>
                  <li>• 一次只做一个动作</li>
                  <li>• 预留运动空间</li>
                  <li>• 固定Seed保持一致性</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* OpenClaw学习与资料 Tab */}
        {activeTab === 'openclaw' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-2">🦞 OpenClaw学习与资料</h1>
              <p className="text-xl text-gray-600">7天掌握你的AI私人助理</p>
            </div>

            <DayContent />
          </div>
        )}
      </main>

      <footer className="py-8 border-t bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>AI影视工坊 - OpenClaw大龙虾</p>
        </div>
      </footer>
    </div>
  )
}
