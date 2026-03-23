'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ============================================================
// 项目数据
// ============================================================

const PROJECTS = [
  {
    id: 'beautiful-new-world',
    title: '美丽新世界',
    tagline: '文明之后，他们以为是答案',
    type: '科幻悬疑AI预告片',
    duration: '约50秒',
    style: '维伦纽瓦 +《湮灭》+ 真探S1',
    status: 'Phase 1/3 进行中',
    plot: '未来，能量被抽干的地球上，残存的人类在"新世界"装置中寻找救赎。观测院数据整理者林深、文献馆破译者苏晚、管理局司长陈敬言、隐居老学者孟清和——四个人的命运在一座废墟中交汇，揭示出一个被掩埋的真相：装置不是答案，而是文明的终结。',
    accentColor: '#6B46C1',
    coverImage: '/images/beautiful-new-world/场景/scene-03.png',
    images: [
      {
        name: '新世界装置核心',
        category: '场景',
        time: '5-15s',
        desc: '仰视角度，一团精密复杂能量体悬浮于黑暗空间，能量体形状像巨大机械环形结构，发紫蓝脉冲光芒，碎片悬浮周围散发诡异能量。维伦纽瓦式散射光营造宗教感与压迫感。',
        src: '/images/beautiful-new-world/场景/scene-03.png',
        filename: '新世界装置核心.png'
      },
      {
        name: '废墟大全景',
        category: '场景',
        time: '0-5s',
        desc: '航拍俯视角度14mm超广角镜头，千年前文明遗迹，巨大荒原散落锈蚀金属与破碎混凝土，灰蓝色压抑天空低云层，散发末日废弃氛围。奠定全片基调。',
        src: '/images/beautiful-new-world/场景/scene-02.png',
        filename: '废墟大全景.png'
      },
      {
        name: '坍缩降临',
        category: '场景',
        time: '30-35s',
        desc: '俯拍视角，航拍角度镜头，城市末日灾难场景，巨大裂缝撕裂城市地面，裂缝形态自然有机，紫光从裂缝爆发，空间扭曲感。高潮场景。',
        src: '/images/beautiful-new-world/场景/scene-01.png',
        filename: '坍缩降临.png'
      },
      {
        name: '超自然能量残影',
        category: '场景',
        time: '25-30s',
        desc: '正面视角，不完整半透明人形魂魄立于黑暗背景前，人形由青白荧光构成，边缘模糊闪烁，散发恐怖超自然气息。恐怖意象核心场景。',
        src: '/images/beautiful-new-world/场景/scene-04.png',
        filename: '超自然能量残影.png'
      },
      {
        name: '林深 · 观测院',
        category: '人物场景',
        time: '15-17s',
        desc: '观测院数据中心全景，低矮天花板密集排列白色管道灰色线缆和黑色通风口，多块蓝光屏幕映照下技术人员面无表情工作。林深的工作日常，冷调压抑。',
        src: '/images/beautiful-new-world/人物与场景/scene-char-01.png',
        filename: '林深_观测院.png'
      },
      {
        name: '苏晚 · 文献馆',
        category: '人物场景',
        time: '17-19s',
        desc: '古老文献馆内部场景，满墙木质书架堆满古籍羊皮卷和纪元文献，烛火摇曳暖琥珀色光芒营造古老神秘氛围。苏晚的破译空间，对比冷调数据世界。',
        src: '/images/beautiful-new-world/人物与场景/scene-char-02.png',
        filename: '苏晚_文献馆.png'
      },
      {
        name: '陈敬言 · 追捕',
        category: '人物场景',
        time: '19-21s',
        desc: '管理局工业走廊深处，工业金属钢板墙壁接缝笔直延伸至远景消失，低角仰视35mm镜头强化角色威严压迫感。陈敬言追踪猎物的经典一幕。',
        src: '/images/beautiful-new-world/人物与场景/scene-char-03.png',
        filename: '陈敬言_追捕.png'
      },
      {
        name: '孟清和 · 废墟',
        category: '人物场景',
        time: '21-23s',
        desc: '废弃文明遗址废墟内部，黑暗空间向外逐渐消失，平视50mm镜头黄金分割构图，苍老学者身影渺小却核心稳定。揭示真相的关键人物。',
        src: '/images/beautiful-new-world/人物与场景/scene-char-04.png',
        filename: '孟清和_废墟.png'
      },
      {
        name: '林深 · 角色定妆',
        category: '角色',
        desc: '28岁中国男性数据分析师，观测院工作，精瘦体型微驼背，瘦长脸颧骨突出，黑眼圈，短乱发。黄金锚点：左颧骨旧伤疤 + 黑框眼镜（总歪）。内敛沉默，善于观察。',
        src: '/images/beautiful-new-world/人物设计参考/char-02.png',
        filename: '林深_角色.png'
      },
      {
        name: '苏晚 · 角色定妆',
        category: '角色',
        desc: '26岁中国女性破译者，文献馆工作，纤细体型姿态挺拔，鹅蛋脸眉眼清秀，深棕色杏仁眼，低马尾发型垂落两侧。黄金锚点：右手无名指墨渍 + 左手腕红绳。执着敏锐，内心坚定。',
        src: '/images/beautiful-new-world/人物设计参考/char-03.png',
        filename: '苏晚_角色.png'
      },
      {
        name: '陈敬言 · 角色定妆',
        category: '角色',
        desc: '40岁中国男性，管理局行动司司长，高瘦体型肩宽背挺，棱角分明方下巴，短发近乎平头，灰黑色眼睛直视前方。黄金锚点：右手臂"新世界"纹路疤痕。冷酷忠诚，铁血执行力。',
        src: '/images/beautiful-new-world/人物设计参考/char-04.png',
        filename: '陈敬言_角色.png'
      },
      {
        name: '孟清和 · 角色定妆',
        category: '角色',
        desc: '67岁中国老年学者，曾观测院核心研究者，高瘦体型微微佝偻如老树但核心稳定，长脸皱纹深刻，苍白长发垂落两侧。黄金锚点：左眼下方老年斑 + 左手腕缺失小指。睿智豁达，知晓真相却被孤立。',
        src: '/images/beautiful-new-world/人物设计参考/char-01.png',
        filename: '孟清和_角色.png'
      },
      {
        name: '林深 · 三视图',
        category: '角色三视图',
        desc: '林深正面/侧面/背面三视图，包含完整全身像。精瘦体型微驼背，短乱发，黑眼圈，深灰蓝色工作服领口敞开第二颗扣子，左手腕戴旧款监测手环。',
        src: '/images/beautiful-new-world/人物三视图/char-view-02.png',
        filename: '林深_三视图.png'
      },
      {
        name: '苏晚 · 三视图',
        category: '角色三视图',
        desc: '苏晚正面/侧面/背面三视图，包含完整全身像。纤细体型姿态挺拔，鹅蛋脸清秀，米白色考古服深棕色腰带，左手腕系褪色红绳。',
        src: '/images/beautiful-new-world/人物三视图/char-view-03.png',
        filename: '苏晚_三视图.png'
      },
      {
        name: '陈敬言 · 三视图',
        category: '角色三视图',
        desc: '陈敬言正面/侧面/背面三视图，包含完整全身像。高瘦体型肩宽背挺，棱角分明方下巴，黑色贴身夹克衫暗色长裤，黑色半指手套。',
        src: '/images/beautiful-new-world/人物三视图/char-view-04.png',
        filename: '陈敬言_三视图.png'
      },
      {
        name: '孟清和 · 三视图',
        category: '角色三视图',
        desc: '孟清和正面/侧面/背面三视图，包含完整全身像。瘦高体型微微佝偻，苍白长发垂落两侧，深褐色旧袍有多处手缝补丁磨损严重。',
        src: '/images/beautiful-new-world/人物三视图/char-view-01.png',
        filename: '孟清和_三视图.png'
      },
    ]
  },
  {
    id: 'rainy-night-vengeance',
    title: '雨夜肃杀',
    tagline: '江湖就该是快意恩仇',
    type: '武侠AI预告片',
    duration: '待定',
    style: '胡金铨 + 徐克 +《绣春刀》',
    status: '策划中',
    plot: '雨夜，刀光一闪，恩怨终结。这不仅是一部武侠预告片，而是一次对"江湖"本质的叩问——当义气与生存冲突，当情与法不可兼得，雨夜中的每一次抉择，都是对灵魂的审判。画面将呈现：雨打芭蕉的南方意境、刀锋擦过的冷光、檐下躲雨的沉默对峙。',
    accentColor: '#1e3a5f',
    coverImage: null,
    images: []
  }
]

// ============================================================
// 图片预览弹窗组件
// ============================================================
function ImageModal({ 
  image, 
  onClose 
}: { 
  image: typeof PROJECTS[0]['images'][0] | null
  onClose: () => void 
}) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!image) return null

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = image.src
    link.download = image.filename || 'image.png'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
            {image.category}
          </span>
          <h2 className="text-white font-medium">{image.name}</h2>
          {image.time && (
            <span className="text-white/50 text-sm">{image.time}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition"
          >
            <span>⬇</span>
            <span>下载</span>
          </button>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-white text-xl transition"
          >
            ✕
          </button>
        </div>
      </div>

      {/* 图片区域 */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <img 
          src={image.src} 
          alt={image.name}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          style={{ maxHeight: 'calc(100vh - 160px)' }}
        />
      </div>

      {/* 底部描述 */}
      <div className="px-6 py-4 bg-black/50 backdrop-blur-sm">
        <p className="text-white/80 text-sm leading-relaxed max-w-4xl mx-auto">
          {image.desc}
        </p>
      </div>
    </div>
  )
}

// ============================================================
// 瀑布流图片卡片组件
// ============================================================
function ImageCard({ 
  image, 
  onClick 
}: { 
  image: typeof PROJECTS[0]['images'][0]
  onClick: () => void
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div 
      className="group relative break-inside-avoid mb-4 cursor-pointer"
      onClick={onClick}
    >
      {/* 图片容器 */}
      <div className="relative overflow-hidden rounded-xl bg-gray-100"
        style={{ aspectRatio: image.category === '角色三视图' ? '16/9' : '3/4' }}
      >
        {!loaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        )}
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <span className="text-3xl mb-2">🖼️</span>
            <span className="text-xs">图片加载失败</span>
          </div>
        ) : (
          <img 
            src={image.src} 
            alt={image.name}
            className={`w-full h-full object-cover transition duration-500 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        )}
        
        {/* 悬浮遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
          <div className="transform translate-y-2 group-hover:translate-y-0 transition duration-300">
            <span className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur rounded text-xs text-white mb-1">
              {image.category}
            </span>
            <h3 className="text-white font-medium text-sm">{image.name}</h3>
            {image.time && (
              <p className="text-white/60 text-xs mt-1">{image.time}</p>
            )}
            <p className="text-white/80 text-xs mt-2 line-clamp-3 leading-relaxed">
              {image.desc}
            </p>
          </div>
        </div>

        {/* 放大图标 */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
          <span className="text-sm">⤢</span>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// 项目板块组件
// ============================================================
function ProjectSection({ project }: { project: typeof PROJECTS[0] }) {
  const [selectedImage, setSelectedImage] = useState<typeof PROJECTS[0]['images'][0] | null>(null)
  const [activeFilter, setActiveFilter] = useState('全部')

  const categories = ['全部', ...Array.from(new Set(project.images.map(img => img.category)))]
  
  const filteredImages = activeFilter === '全部' 
    ? project.images 
    : project.images.filter(img => img.category === activeFilter)

  const hasImages = project.images.length > 0

  return (
    <section 
      id={project.id}
      style={{ scrollMarginTop: '100px' }}
    >
      {/* 项目头部 */}
      <div className="mb-8">
        {/* 项目标题区 */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {/* 小标签 + 标题 */}
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-xl font-medium text-gray-900">{project.title}</h2>
              <span 
                className="px-2 py-0.5 rounded text-xs font-medium"
                style={{ 
                  backgroundColor: project.accentColor + '20', 
                  color: project.accentColor 
                }}
              >
                {project.status}
              </span>
            </div>
            
            {/* 剧情简介 - 核心展示 */}
            <p className="text-gray-600 text-sm leading-relaxed max-w-3xl mb-4">
              {project.plot}
            </p>
            
            {/* 元信息 */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
              <span>🎬 {project.type}</span>
              <span>⏱️ {project.duration}</span>
              <span>🎨 {project.style}</span>
            </div>
          </div>
        </div>

        {/* 封面大图 */}
        {project.coverImage ? (
          <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden relative mb-6 cursor-pointer group"
            onClick={() => {
              const coverImg = project.images.find(img => img.src === project.coverImage)
              if (coverImg) setSelectedImage(coverImg)
            }}
          >
            <img 
              src={project.coverImage} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
              <div className="p-6 w-full">
                <p className="text-white/90 text-lg font-light italic mb-2">"{project.tagline}"</p>
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <span>点击查看大图</span>
                  <span>·</span>
                  <span>{project.images.length} 张图片</span>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
              ⤢
            </div>
          </div>
        ) : (
          /* 无封面时显示占位 + 项目信息 */
          <div className="w-full rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center mb-6 overflow-hidden"
            style={{ minHeight: '200px', backgroundColor: project.accentColor + '08' }}
          >
            <div className="text-center py-12 px-8">
              <div className="text-5xl mb-4">🎬</div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">{project.title}</h3>
              <p className="text-gray-500 text-sm italic mb-4">"{project.tagline}"</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs"
                style={{ backgroundColor: project.accentColor + '20', color: project.accentColor }}
              >
                {project.status}
              </div>
            </div>
          </div>
        )}

        {/* 筛选标签 */}
        {hasImages && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                  activeFilter === cat 
                    ? 'text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={activeFilter === cat ? { backgroundColor: project.accentColor } : {}}
              >
                {cat}
                <span className="ml-1 opacity-70">
                  {cat === '全部' ? project.images.length : project.images.filter(i => i.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* 瀑布流画廊 */}
        {hasImages && (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {filteredImages.map((image, idx) => (
              <ImageCard 
                key={`${image.name}-${idx}`}
                image={image}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 图片预览弹窗 */}
      <ImageModal 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </section>
  )
}

// ============================================================
// 首页主组件
// ============================================================
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('beautiful-new-world')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
      
      // 检测当前可见区域
      const offsets = PROJECTS.map(p => {
        const el = document.getElementById(p.id)
        return el ? el.getBoundingClientRect().top : Infinity
      })
      for (let i = offsets.length - 1; i >= 0; i--) {
        if (offsets[i] < 200) {
          setActiveSection(PROJECTS[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToProject = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== 顶栏 ========== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/80 backdrop-blur-sm border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎬</span>
            <span className="text-lg font-bold text-gray-900">AIGC 影视工坊</span>
          </div>
          
          {/* 项目快速跳转 */}
          <nav className="flex items-center gap-1">
            {PROJECTS.map(project => (
              <button
                key={project.id}
                onClick={() => scrollToProject(project.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeSection === project.id 
                    ? 'text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={activeSection === project.id ? { backgroundColor: project.accentColor } : {}}
              >
                {project.title}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ========== 主内容 ========== */}
      <main className="pt-16">
        {/* 页面标题 */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">项目案例</h1>
            <p className="text-gray-400 text-sm">点击图片查看大图并下载 · 悬浮显示详细描述</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {PROJECTS.map(project => (
            <ProjectSection key={project.id} project={project} />
          ))}
        </div>
      </main>

      {/* ========== 页脚 ========== */}
      <footer className="border-t bg-white mt-8">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span>🎬</span>
              <span>AIGC 影视工坊 · AI视频制作学习平台</span>
            </div>
            <div className="flex gap-6">
              <a href="https://docs.openclaw.ai" target="_blank" className="hover:text-gray-600 transition">📖 文档</a>
              <a href="https://clawhub.com" target="_blank" className="hover:text-gray-600 transition">🧩 技能</a>
              <a href="https://github.com/openclaw/openclaw" target="_blank" className="hover:text-gray-600 transition">⭐ GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
