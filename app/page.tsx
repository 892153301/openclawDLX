'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

// ============================================================
// ScrollLockProvider - 防止弹窗时背景滚动
// ============================================================
function ScrollLockProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const original = document.body.style.overflow
    return () => {
      document.body.style.overflow = original
    }
  }, [])
  return <>{children}</>
}

// ============================================================
// 项目数据
// ============================================================

const PROJECTS = [
  {
    id: 'rainy-night-decision',
    title: '雨夜决',
    tagline: '十年恩怨，一夜了结',
    type: '武侠AI预告片',
    duration: '约90秒',
    style: '徐克 +《绣春刀》',
    status: 'Phase 1 完成',
    plot: '雨夜死巷，两名剑客十年恩怨，一夜了结。黑衣与白漓，师出同门却分道扬镳，今夜以剑对话。十二回合，从试探到同归于尽，每一剑都是十年的积怨，每一滴血都是无法挽回的过去。白漓重伤站起，灯笼熄灭，两具身影倒在积水中，血水交融，随雨流散。',
    accentColor: '#1a2a4a',
    images: [
      {
        name: '雨夜死巷 · 鸟瞰',
        category: '场景',
        time: '开场',
        desc: '暴雨如注的深夜死巷，鸟瞰角度，青石板路面被雨水覆盖形成镜面反射，巷道两侧砖墙斑驳湿漉漉，巷口灯笼摇晃橙光在雨幕中扩散如血晕。',
        src: '/images/rainy-night-decision/scene-01.png',
        filename: '雨夜死巷_鸟瞰.png'
      },
      {
        name: '双雄对峙',
        category: '场景',
        time: '对峙',
        desc: '白漓与黑衣在灯笼微光下对峙：白漓立于巷口（面朝巷尾），黑衣立于巷尾（面朝巷口），相距十步，剑尖触地，两人倒影在积水中对称。',
        src: '/images/rainy-night-decision/scene-02.png',
        filename: '双雄对峙.png'
      },
      {
        name: '雨夜死巷 · 多视角',
        category: '场景',
        time: '中段',
        desc: '暴雨如注的深夜死巷，多个视角，青石板路面被雨水覆盖形成镜面反射，巷道两侧砖墙斑驳湿漉漉，巷中灯笼摇晃发光。',
        src: '/images/rainy-night-decision/scene-03.png',
        filename: '雨夜死巷_多视角.png'
      },
      {
        name: '小镇全景',
        category: '场景',
        time: '远景',
        desc: '鸟瞰俯视，中国古城小镇，深夜，暴雨如注，远处天空乌云密布，画面近处小巷狭长，灯笼橙光若隐若现。',
        src: '/images/rainy-night-decision/scene-04.png',
        filename: '小镇全景.png'
      },
      // 人物设计
      {
        name: '白漓 · 三视图',
        category: '人物设计',
        time: '',
        desc: '白漓角色正面/侧面/背面三视图，包含完整全身像。白色长袍（湿贴），赤足，发髻高束，右手腕缠黑布条。面容清秀，眼神沧桑。',
        src: '/images/rainy-night-decision/人物设计/白漓三视图.png',
        filename: '白漓三视图.png'
      },
      {
        name: '黑衣 · 三视图',
        category: '人物设计',
        time: '',
        desc: '黑衣角色正面/侧面/背面三视图，包含完整全身像。黑色夜行衣（被雨水浸透贴腿），斗笠遮面，右眉尾有旧疤（3cm，色淡）。面容冷峻，鹰钩鼻。',
        src: '/images/rainy-night-decision/人物设计/黑衣三视图.png',
        filename: '黑衣三视图.png'
      },
      {
        name: '对峙 · 白漓正面',
        category: '人物设计',
        time: '',
        desc: '暴雨如注的深夜死巷，白衣男子持剑对峙，白色长袍湿贴身体，右手腕缠黑布条，佩剑窄长寒铁红绳剑柄。面容清秀，眼神冷漠。',
        src: '/images/rainy-night-decision/人物设计/对峙正面白漓.png',
        filename: '对峙正面白漓.png'
      },
      {
        name: '白漓 · 佩剑',
        category: '人物设计',
        time: '',
        desc: '白漓佩剑：纯白背景，中国单手剑，剑身修长约80cm，抛光钢材质，银白光色，笔直，红绳剑柄。',
        src: '/images/rainy-night-decision/人物设计/白漓佩剑.png',
        filename: '白漓佩剑.png'
      },
      {
        name: '黑衣 · 佩剑',
        category: '人物设计',
        time: '',
        desc: '黑衣佩剑：纯白背景，中国单手剑，剑身宽厚，暗色抛光钢材质，古铜护手，师父遗物。',
        src: '/images/rainy-night-decision/人物设计/黑衣佩剑.png',
        filename: '黑衣佩剑.png'
      },
      // 场景细节
      {
        name: '小巷 · 鸟瞰视角1',
        category: '场景',
        time: '',
        desc: '暴雨如注的深夜死巷，鸟瞰角度，青石板路面被雨水覆盖形成镜面反射，巷道两侧砖墙斑驳湿漉漉。',
        src: '/images/rainy-night-decision/场景/小巷鸟瞰1.png',
        filename: '小巷鸟瞰1.png'
      },
      {
        name: '小巷 · 鸟瞰视角2',
        category: '场景',
        time: '',
        desc: '暴雨如注的深夜死巷，鸟瞰角度，青石板路面被雨水覆盖形成镜面反射，巷道两侧砖墙斑驳湿漉漉，灯笼橙光在雨幕中扩散。',
        src: '/images/rainy-night-decision/场景/小巷鸟瞰2.png',
        filename: '小巷鸟瞰2.png'
      },
      {
        name: '小巷 · 多视角',
        category: '场景',
        time: '',
        desc: '暴雨如注的深夜死巷，多个视角，青石板路面被雨水覆盖，巷道两侧砖墙斑驳湿漉漉，巷中灯笼摇晃发光。',
        src: '/images/rainy-night-decision/场景/小巷多视角.png',
        filename: '小巷多视角.png'
      },
    ],
    videos: [
      { name: '建立镜头', category: '视频', desc: '暴雨如注的深夜死巷，鸟瞰角度，砖墙湿漉漉反光，青石板积水如镜面倒映灯笼，两道人影各据一端，巷口灯笼摇晃橙光在雨幕中扩散。', src: '/videos/rainy-night-decision/shot-01-establishing.mp4', thumb: '/videos/rainy-night-decision/shot-01-establishing.mp4' },
      { name: '双雄对峙', category: '视频', desc: '白漓与黑衣在灯笼微光下对峙：白漓立于巷口，黑衣立于巷尾，相距十步，剑尖触地，两人倒影在积水中对称。', src: '/videos/rainy-night-decision/shot-02-both-characters.mp4', thumb: '/videos/rainy-night-decision/shot-02-both-characters.mp4' },
      { name: '白漓拔剑', category: '视频', desc: '白漓右手快速拔出佩剑：窄长寒铁剑身，红绳剑柄，银白光芒在雨中闪烁，剑尖直指前方。', src: '/videos/rainy-night-decision/shot-03-baili-draw.mp4', thumb: '/videos/rainy-night-decision/shot-03-baili-draw.mp4' },
      { name: '黑衣手部特写', category: '视频', desc: '黑衣右手握剑特写：黑色磨砂剑柄，粗壮手指，虎口老茧，右腕旧疤可见，剑身宽厚古铜护手，水滴沿剑身下淌。', src: '/videos/rainy-night-decision/shot-04-heiye-hand.mp4', thumb: '/videos/rainy-night-decision/shot-04-heiye-hand.mp4' },
      { name: '黑衣斗笠特写', category: '视频', desc: '黑衣斗笠特写：黑色斗笠正面居中，竹篾编结，深黑底沿，两根黑绳绕过下巴系紧。斗笠完好无破损（初始状态）。', src: '/videos/rainy-night-decision/shot-05-heiye-closeup.mp4', thumb: '/videos/rainy-night-decision/shot-05-heiye-closeup.mp4' },
      { name: '终局', category: '视频', desc: '终局斗笠碎片：斗笠割裂的裂片浸在右墙根积水中，竹篾散开，被雨水冲刷，血从裂口渗出在水中扩散成红色丝线。', src: '/videos/rainy-night-decision/shot-06-ending.mp4', thumb: '/videos/rainy-night-decision/shot-06-ending.mp4' },
    ]
  },
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
        name: '林深 · 观测院工作',
        category: '人物场景',
        time: '15-17s',
        desc: '观测院数据中心全景，低矮天花板密集排列白色管道灰色线缆和黑色通风口，多块蓝光屏幕映照下技术人员面无表情工作。林深的工作日常，冷调压抑。',
        src: '/images/beautiful-new-world/人物设计参考/char-02.png',
        filename: '林深_角色.png'
      },
      {
        name: '苏晚 · 文献馆破译',
        category: '人物场景',
        time: '17-19s',
        desc: '古老文献馆内部场景，满墙木质书架堆满古籍羊皮卷和纪元文献，烛火摇曳暖琥珀色光芒营造古老神秘氛围。苏晚的破译空间，对比冷调数据世界。',
        src: '/images/beautiful-new-world/人物设计参考/char-03.png',
        filename: '苏晚_角色.png'
      },
      {
        name: '陈敬言 · 管理局走廊',
        category: '人物场景',
        time: '19-21s',
        desc: '管理局工业走廊深处，工业金属钢板墙壁接缝笔直延伸至远景消失，低角仰视35mm镜头强化角色威严压迫感。陈敬言追踪猎物的经典一幕。',
        src: '/images/beautiful-new-world/人物设计参考/char-04.png',
        filename: '陈敬言_角色.png'
      },
      {
        name: '孟清和 · 废墟隐居',
        category: '人物场景',
        time: '21-23s',
        desc: '废弃文明遗址废墟内部，黑暗空间向外逐渐消失，平视50mm镜头黄金分割构图，苍老学者身影渺小却核心稳定。揭示真相的关键人物。',
        src: '/images/beautiful-new-world/人物设计参考/char-01.png',
        filename: '孟清和_角色.png'
      },
      {
        name: '林深 · 三视图',
        category: '角色图鉴',
        desc: '林深正面/侧面/背面三视图，包含完整全身像。精瘦体型微驼背，短乱发，黑眼圈，深灰蓝色工作服领口敞开第二颗扣子，左手腕戴旧款监测手环。黄金锚点：左颧骨旧伤疤 + 黑框眼镜（总歪）。',
        src: '/images/beautiful-new-world/人物三视图/char-view-02.png',
        filename: '林深_三视图.png'
      },
      {
        name: '苏晚 · 三视图',
        category: '角色图鉴',
        desc: '苏晚正面/侧面/背面三视图，包含完整全身像。纤细体型姿态挺拔，鹅蛋脸清秀，米白色考古服深棕色腰带，左手腕系褪色红绳。黄金锚点：右手无名指墨渍 + 左手腕红绳。',
        src: '/images/beautiful-new-world/人物三视图/char-view-03.png',
        filename: '苏晚_三视图.png'
      },
      {
        name: '陈敬言 · 三视图',
        category: '角色图鉴',
        desc: '陈敬言正面/侧面/背面三视图，包含完整全身像。高瘦体型肩宽背挺，棱角分明方下巴，黑色贴身夹克衫暗色长裤，黑色半指手套。黄金锚点：右手臂"新世界"纹路疤痕。',
        src: '/images/beautiful-new-world/人物三视图/char-view-04.png',
        filename: '陈敬言_三视图.png'
      },
      {
        name: '孟清和 · 三视图',
        category: '角色图鉴',
        desc: '孟清和正面/侧面/背面三视图，包含完整全身像。瘦高体型微微佝偻，苍白长发垂落两侧，深褐色旧袍有多处手缝补丁磨损严重。黄金锚点：左眼下方老年斑 + 左手腕缺失小指。',
        src: '/images/beautiful-new-world/人物三视图/char-view-01.png',
        filename: '孟清和_三视图.png'
      },
    ]
  },

]

type ImageItem = typeof PROJECTS[0]['images'][0]
type VideoItem = { name: string; category: string; desc: string; src: string; thumb: string }

// ============================================================
// 图片预览弹窗组件（支持左右切换）
// ============================================================
function ImageModal({ 
  image, 
  allImages,
  onClose,
  onPrev,
  onNext,
}: { 
  image: ImageItem | null
  allImages: ImageItem[]
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null)

  const currentIndex = allImages.findIndex(img => img.src === image?.src)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < allImages.length - 1

  // 锁定背景滚动
  useEffect(() => {
    if (!image) return
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = scrollBarWidth + 'px'
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [image])

  // ESC + 方向键导航
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!image) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [image, hasPrev, hasNext, onClose, onPrev, onNext])

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
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
            {image.category}
          </span>
          <h2 className="text-white font-medium">{image.name}</h2>
          {image.time && (
            <span className="text-white/50 text-sm">{image.time}</span>
          )}
          <span className="text-white/40 text-xs ml-2">
            {currentIndex + 1} / {allImages.length}
          </span>
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

      {/* 左右箭头 */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur rounded-full flex items-center justify-center text-white text-2xl transition"
        >
          ‹
        </button>
      )}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur rounded-full flex items-center justify-center text-white text-2xl transition"
        >
          ›
        </button>
      )}

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

      {/* 底部缩略图条 */}
      <div className="px-6 pb-4 bg-black/30 flex gap-2 overflow-x-auto justify-center">
        {allImages.map((img, idx) => (
          <button
            key={img.src}
            onClick={(e) => { e.stopPropagation(); 
              const diff = idx - currentIndex
              if (diff > 0) for (let i = 0; i < diff; i++) onNext()
              else for (let i = 0; i < -diff; i++) onPrev()
            }}
            className={`w-12 h-12 flex-shrink-0 rounded overflow-hidden border-2 transition ${
              idx === currentIndex ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'
            }`}
          >
            <img src={img.src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// 视频播放器弹窗组件
// ============================================================
function VideoModal({
  video,
  allVideos,
  onClose,
  onPrev,
  onNext,
}: {
  video: VideoItem | null
  allVideos: VideoItem[]
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const currentIndex = allVideos.findIndex(v => v.src === video?.src)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < allVideos.length - 1

  useEffect(() => {
    if (!video) return
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = scrollBarWidth + 'px'
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [video])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!video) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [video, hasPrev, hasNext, onClose, onPrev, onNext])

  if (!video) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">🎬 视频</span>
          <h2 className="text-white font-medium">{video.name}</h2>
          <span className="text-white/40 text-xs ml-2">{currentIndex + 1} / {allVideos.length}</span>
        </div>
        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-white text-xl transition">✕</button>
      </div>

      {/* 左右箭头 */}
      {hasPrev && (
        <button onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur rounded-full flex items-center justify-center text-white text-2xl transition">
          ‹
        </button>
      )}
      {hasNext && (
        <button onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur rounded-full flex items-center justify-center text-white text-2xl transition">
          ›
        </button>
      )}

      {/* 视频播放器 */}
      <div className="flex-1 flex items-center justify-center p-8">
        <video
          ref={videoRef}
          src={video.src}
          controls
          autoPlay
          className="max-w-full max-h-full rounded-lg shadow-2xl"
          style={{ maxHeight: 'calc(100vh - 160px)' }}
        />
      </div>

      {/* 底部描述 */}
      <div className="px-6 py-4 bg-black/50 backdrop-blur-sm">
        <p className="text-white/80 text-sm leading-relaxed max-w-4xl mx-auto">{video.desc}</p>
      </div>
    </div>
  )
}

// ============================================================
// 视频卡片组件
// ============================================================
function VideoCard({
  video,
  onClick
}: {
  video: VideoItem
  onClick: () => void
}) {
  const [thumbLoaded, setThumbLoaded] = useState(false)

  return (
    <div
      className="group relative break-inside-avoid mb-4 cursor-pointer rounded-xl overflow-hidden"
      onClick={onClick}
    >
      <div className="relative" style={{ aspectRatio: '16/9' }}>
        {!thumbLoaded && (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-500 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={video.thumb}
          alt={video.name}
          className={`w-full h-full object-cover transition duration-500 group-hover:scale-105 ${thumbLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setThumbLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225"><rect fill="%23222" width="400" height="225"/><text x="50%" y="50%" dy=".3em" fill="%23666" text-anchor="middle" font-size="48">🎬</text></svg>'
            setThumbLoaded(true)
          }}
        />
        {/* 播放按钮 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-full flex items-center justify-center group-hover:bg-white/30 transition">
            <span className="text-white text-2xl ml-1">▶</span>
          </div>
        </div>
        {/* 分类标签 */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 bg-black/50 backdrop-blur rounded text-xs text-white">{video.category}</span>
        </div>
      </div>
      <div className="p-3 bg-gray-900">
        <h3 className="text-white font-medium text-sm">{video.name}</h3>
        <p className="text-gray-400 text-xs mt-1 line-clamp-2 leading-relaxed">{video.desc}</p>
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
  image: ImageItem
  onClick: () => void
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div 
      className="group relative break-inside-avoid mb-4 cursor-pointer"
      onClick={onClick}
    >
      <div 
        className="relative overflow-hidden rounded-xl bg-gray-100"
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
            <span className="text-xs">加载失败</span>
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

        <div className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
          <span className="text-sm">⤢</span>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// 封面轮播组件
// ============================================================
function CoverCarousel({ project }: { project: typeof PROJECTS[0] }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [hovered, setHovered] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const images = project.images

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % images.length)
    }, 3500)
  }, [images.length])

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    startTimer()
    return () => stopTimer()
  }, [startTimer, stopTimer])

  const pause = () => setHovered(true)
  const resume = () => {
    setHovered(false)
    startTimer()
  }

  if (images.length === 0) {
    return (
      <div className="w-full rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center mb-6 overflow-hidden"
        style={{ minHeight: '240px', backgroundColor: project.accentColor + '08' }}
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
    )
  }

  const currentImage = images[currentIdx]

  return (
    <div 
      className="w-full h-72 md:h-96 rounded-2xl overflow-hidden relative mb-6 group"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* 轮播图片 */}
      {images.map((img, idx) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-700 ${idx === currentIdx ? 'opacity-100' : 'opacity-0'}`}
        >
          <img 
            src={img.src} 
            alt={img.name}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* 底部: tagline + 指示点 */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-white/80 text-sm font-light italic mb-4">"{project.tagline}"</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/50 text-xs">
            <span>{images.length} 张图片</span>
            <span>·</span>
            <span>悬停暂停</span>
          </div>
          
          {/* 指示点 */}
          <div className="flex items-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentIdx ? 'bg-white w-5' : 'bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// 项目板块组件
// ============================================================
function ProjectSection({ project }: { project: typeof PROJECTS[0] }) {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const [activeFilter, setActiveFilter] = useState('全部')
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images')

  const categories = ['全部', ...Array.from(new Set(project.images.map(img => img.category)))]
  
  const filteredImages = activeFilter === '全部' 
    ? project.images 
    : project.images.filter(img => img.category === activeFilter)

  const hasImages = project.images.length > 0
  const hasVideos = (project.videos?.length ?? 0) > 0

  const handleImageClick = (image: ImageItem) => setSelectedImage(image)

  const handlePrev = () => {
    const idx = project.images.findIndex(img => img.src === selectedImage?.src)
    if (idx > 0) setSelectedImage(project.images[idx - 1])
  }

  const handleNext = () => {
    const idx = project.images.findIndex(img => img.src === selectedImage?.src)
    if (idx < project.images.length - 1) setSelectedImage(project.images[idx + 1])
  }

  const handleVideoClick = (video: VideoItem) => setSelectedVideo(video)
  const handleVideoPrev = () => {
    if (!project.videos) return
    const idx = project.videos.findIndex(v => v.src === selectedVideo?.src)
    if (idx > 0) setSelectedVideo(project.videos[idx - 1])
  }
  const handleVideoNext = () => {
    if (!project.videos) return
    const idx = project.videos.findIndex(v => v.src === selectedVideo?.src)
    if (idx < project.videos.length - 1) setSelectedVideo(project.videos[idx + 1])
  }

  return (
    <section id={project.id} style={{ scrollMarginTop: '100px' }}>
      <div className="mb-12">
        {/* 标题区 - 左侧竖线装饰 */}
        <div className="relative mb-6 pl-6">
          {/* 左侧装饰竖线 */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
            style={{ backgroundColor: project.accentColor }}
          />
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {project.title}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-3xl mb-3">
            {project.plot}
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <span>🎬 {project.type}</span>
            <span>⏱️ {project.duration}</span>
            <span>🎨 {project.style}</span>
          </div>
        </div>

        {/* 封面轮播 */}
        <CoverCarousel project={project} />

        {/* 图片/视频 切换标签 */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('images')}
            className={`px-5 py-2 rounded-lg font-medium text-sm transition ${
              activeTab === 'images' ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={activeTab === 'images' ? { backgroundColor: project.accentColor } : {}}
          >
            🖼️ 图片图鉴 {hasImages && `(${project.images.length})`}
          </button>
          {hasVideos && (
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-5 py-2 rounded-lg font-medium text-sm transition ${
                activeTab === 'videos' ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={activeTab === 'videos' ? { backgroundColor: project.accentColor } : {}}
            >
              🎬 视频图鉴 ({project.videos?.length ?? 0})
            </button>
          )}
        </div>

        {/* 图片筛选标签 */}
        {hasImages && activeTab === 'images' && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                  activeFilter === cat ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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

        {/* 瀑布流 */}
        {hasImages && activeTab === 'images' && (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {filteredImages.map((image, idx) => (
              <ImageCard
                key={`${image.name}-${idx}`}
                image={image}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        )}

        {/* 视频网格 */}
        {hasVideos && activeTab === 'videos' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {(project.videos ?? []).map((video, idx) => (
              <VideoCard
                key={`${video.name}-${idx}`}
                video={video}
                onClick={() => handleVideoClick(video)}
              />
            ))}
          </div>
        )}
      </div>

      <ImageModal
        image={selectedImage}
        allImages={project.images}
        onClose={() => setSelectedImage(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <VideoModal
        video={selectedVideo}
        allVideos={project.videos || []}
        onClose={() => setSelectedVideo(null)}
        onPrev={handleVideoPrev}
        onNext={handleVideoNext}
      />
    </section>
  )
}

// ============================================================
// 首页主组件
// ============================================================
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('rainy-night-decision')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <ScrollLockProvider>
    <div className="min-h-screen bg-gray-50">
      {/* 顶栏 */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/80 backdrop-blur-sm border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎬</span>
            <span className="text-lg font-bold text-gray-900">AIGC 影视工坊</span>
          </div>
          <nav className="flex items-center gap-1">
            {PROJECTS.map(project => (
              <button
                key={project.id}
                onClick={() => scrollToProject(project.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeSection === project.id ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={activeSection === project.id ? { backgroundColor: project.accentColor } : {}}
              >
                {project.title}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {PROJECTS.map(project => (
            <ProjectSection key={project.id} project={project} />
          ))}
        </div>
      </main>

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
    </ScrollLockProvider>
  )
}
