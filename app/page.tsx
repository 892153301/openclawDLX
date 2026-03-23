'use client'

import { useState } from 'react'
import Link from 'next/link'

const beautifulNewWorld = {
  title: '美丽新世界',
  subtitle: 'AI视频预告片项目',
  characters: [
    { name: '林深', age: '28岁', role: '观测院数据整理者', anchor: '左颧骨旧伤疤 · 黑框眼镜（总歪）', color: '#2C3E50', height: '178cm', body: '精瘦体型微驼背', face: '瘦长脸颧骨突出，黑眼圈', hair: '短乱发', eyes: '深褐色眼睛', clothes: '深灰蓝色工作服领口敞开第二颗扣子', accessory: '左手腕戴旧款监测手环', characterImage: '/images/beautiful-new-world/人物设计参考/林深，jimeng-2026-03-23-1969-28岁中国男性数据分析师，观测院工作，精瘦体型微驼背，瘦长脸颧骨突出，黑眼圈，短....png', threeViewImage: '/images/beautiful-new-world/人物三视图/林深，jimeng-2026-03-23-1703-28岁中国男性数据分析师，三视图集于一张图片， 包含正视图、侧视图、后视图， 完整全身像从....png', sceneImage: '/images/beautiful-new-world/人物与场景/林深 · 观测院jimeng-2026-03-23-8981-观测院数据中心全景，低矮天花板密集排列白色管道灰色线缆和黑色通风口，多块蓝光数据....png', sceneName: '观测院数据中心' },
    { name: '苏晚', age: '26岁', role: '文献馆纪元文字破译者', anchor: '右手无名指墨渍 · 左手腕红绳', color: '#8B7355', height: '165cm', body: '纤细体型姿态挺拔', face: '鹅蛋脸清秀，眉眼清晰', hair: '低马尾发型垂落两侧', eyes: '深棕色杏仁眼', clothes: '米白色考古服深棕色腰带', accessory: '左手腕系褪色红绳', characterImage: '/images/beautiful-new-world/人物设计参考/苏晚，jimeng-2026-03-23-7274-26岁中国女性破译者，文献馆工作，纤细体型姿态挺拔，鹅蛋脸眉眼清秀，深棕色杏仁眼....png', threeViewImage: '/images/beautiful-new-world/人物三视图/苏晚，jimeng-2026-03-23-9307-26岁中国女性破译者，三视图集于一张图片， 包含正视图、侧视图、后视图， 完整全....png', sceneImage: '/images/beautiful-new-world/人物与场景/苏晚 · 文献馆jimeng-2026-03-23-9676-古老文献馆内部场景，满墙木质书架堆满古籍羊皮卷和纪元文献，烛火摇曳暖琥珀色光芒营....png', sceneName: '文献馆' },
    { name: '陈敬言', age: '40岁', role: '管理局行动司司长', anchor: '右手臂"新世界"纹路疤痕', color: '#1A1A1A', height: '185cm', body: '高瘦体型肩宽背挺', face: '棱角分明方下巴', hair: '短发近乎平头', eyes: '灰黑色眼睛直视前方', clothes: '黑色贴身夹克衫暗色长裤', accessory: '黑色半指手套', characterImage: '/images/beautiful-new-world/人物设计参考/陈敬言，jimeng-2026-03-23-8117-40 years old Chinese male, tall athletic....png', threeViewImage: '/images/beautiful-new-world/人物三视图/陈敬言，jimeng-2026-03-23-8954-40岁中国男性，三视图集于一张图片， 包含正视图、侧视图、后视图， 完整全身像从....png', sceneImage: '/images/beautiful-new-world/人物与场景/陈敬言 · 追捕jimeng-2026-03-23-5994-管理局工业走廊深处，工业金属钢板墙壁接缝笔直延伸至远景消失，低角仰视35mm镜头....png', sceneName: '管理局工业走廊' },
    { name: '孟清和', age: '67岁', role: '隐居老学者', anchor: '左眼下方老年斑 · 左手少一小指', color: '#3E2723', height: '175cm', body: '瘦高体型微微佝偻', face: '长脸皱纹深刻', hair: '苍白长发垂落两侧', eyes: '浑浊但深邃', clothes: '深褐色旧袍有多处手缝补丁磨损严重', accessory: '左手腕缺失小指', characterImage: '/images/beautiful-new-world/人物设计参考/孟清和，jimeng-2026-03-23-8056-67岁中国老年学者，曾观测院核心研究者，高瘦体型微微佝偻如老树但核心稳定，长脸皱....png', threeViewImage: '/images/beautiful-new-world/人物三视图/孟清和，jimeng-2026-03-23-6309-67岁中国老年学者，三视图集于一张图片， 包含正视图、侧视图、后视图， 完整全身....png', sceneImage: '/images/beautiful-new-world/人物与场景/孟清和 · 废墟jimeng-2026-03-23-7634-废弃文明遗址废墟内部，黑暗空间向外逐渐消失，平视50mm镜头黄金分割构图，苍老学....png', sceneName: '废弃文明遗址' }
  ],
  sceneImages: [
    { src: '/images/beautiful-new-world/场景/废墟大全景jimeng-2026-03-23-9604-电影级末日废墟大全景，航拍俯视角度14mm超广角，千年前文明遗迹，巨大荒原散落锈....png', name: '废墟大全景', time: '0-5s', desc: '荒原/废弃建筑/灰蓝压抑天空', detail: '航拍俯视角度14mm超广角镜头，千年前文明遗迹，巨大荒原散落锈蚀金属与破碎混凝土，灰蓝色压抑天空低云层，散发末日废弃氛围' },
    { src: '/images/beautiful-new-world/场景/新世界装置核心jimeng-2026-03-23-7410-新世界装置核心全景，仰视角度，一团精密复杂的能力体悬浮于黑暗空间中，能量体的形状....png', name: '新世界装置', time: '5-15s', desc: '巨型环形结构/紫蓝脉冲光/碎屑悬浮', detail: '仰视角度，一团精密复杂能量体悬浮于黑暗空间，能量体形状像巨大机械环形结构，发紫蓝脉冲光芒，碎片悬浮周围散发诡异能量' },
    { src: '/images/beautiful-new-world/场景/超自然能量残影jimeng-2026-03-23-8604-超自然能量残影恐怖景象，正面视角，不完整的半透明人形魂魄立于黑暗背景前，人形由青....png', name: '能量残影', time: '25-30s', desc: '苍白人形轮廓/白绿荧光/透明闪烁', detail: '正面视角，不完整半透明人形魂魄立于黑暗背景前，人形由青白荧光构成，边缘模糊闪烁，散发恐怖超自然气息' },
    { src: '/images/beautiful-new-world/场景/坍缩降临jimeng-2026-03-23-8781-坍缩降临俯拍视角，航拍角度镜头，城市末日灾难场景，巨大裂缝撕裂城市地面裂缝形态自....png', name: '坍缩降临', time: '30-35s', desc: '地面裂缝/紫光爆发/空间扭曲', detail: '俯拍视角，航拍角度镜头，城市末日灾难场景，巨大裂缝撕裂城市地面，裂缝形态自然有机，紫光从裂缝爆发，空间扭曲感' }
  ],
  colorPalette: [
    { name: '主世界', color: '#4A5568', desc: '冷灰蓝，压抑沉闷' },
    { name: '装置区', color: '#6B46C1', desc: '病态紫+脉冲青，诡异能量' },
    { name: '能量残影', color: '#E8FFF0', desc: '苍白绿白+血红，恐怖' },
    { name: '记忆/过去', color: '#F6AD55', desc: '暖琥珀，温情但即将破碎' }
  ]
}

const directorThinking = [
  { title: '景别控制', level: '基础', icon: '🎬', summary: '远/全/中/近/特五种景别的情绪表达力',
    content: ['## 景别控制', '景别是指摄影机与被摄体之间的距离变化所形成的画面范围。不同景别传达不同情绪和信息。', '', '### 五大景别', '• 远景：很远距离，史诗感、孤独感，适合大场景开场', '• 全景：全身入镜，交代人物关系和完整场景', '• 中景：膝盖以上，交流感强，适合对话互动', '• 近景：胸口以上，亲密感，适合情感表达', '• 特写：脸部/局部细节，强调、紧张感', '', '### 实战技巧', '• 建立镜头感：先拍远景交代环境，再逐步推进', '• 情绪递进：用景别变化配合情节发展', '• 特写力量：关键时刻的特写能产生强烈情感冲击'] },
  { title: '角度运用', level: '基础', icon: '📐', summary: '仰/俯/平/荷兰角的空间心理暗示',
    content: ['## 角度运用', '摄像机角度直接影响观众对角色的感知和情感反应。', '', '### 四种基础角度', '• 平视：平等、客观，表现真实和平等关系', '• 仰视：威严、压迫，传达力量、支配、恐惧', '• 俯视：渺小、脆弱，表现无力、压抑、宿命感', '• 荷兰角：失衡、焦虑，营造不安、混乱、紧张', '', '### 导演思维', '• 仰拍角色：赋予权力和威严', '• 俯拍角色：表现脆弱或无助', '• 荷兰角：营造心理不安或危机感', '• 平视配合剧情：表现角色冷静或平等对峙'] },
  { title: '焦段选择', level: '进阶', icon: '🔭', summary: '广角/人像/长焦的视觉叙事',
    content: ['## 焦段选择', '焦段决定视野范围和透视关系，是视觉叙事的核心工具。', '', '### 焦段分类', '• 广角(14-35mm)：宽广视野，强化透视、夸张边缘', '• 标准(35-70mm)：自然视角，无扭曲，最接近人眼', '• 人像(85-135mm)：压缩背景、柔化，适合突出主体', '• 长焦(200mm+): 远摄、偷拍感、强烈压缩空间', '', '### 导演思维', '• 广角镜头：展现环境、夸大空间、人物显得渺小', '• 长焦镜头：压缩纵深、隔离主体、偷拍感', '• 50mm：最接近人眼视角，有"电影感"', '• 35mm：环境人像，交代背景的同时突出人物'] },
  { title: '构图法则', level: '进阶', icon: '🖼️', summary: '三分/对称/负空间/框架的视觉引导',
    content: ['## 构图法则', '构图是引导观众视线、传达情绪的关键。', '', '### 经典构图法', '• 三分法：将主体放在三分点，平衡自然，适合大多数场景', '• 对称构图：威严、正式，适合建筑、仪式感场景', '• 负空间：孤独、强调，适合情绪表达和留白', '• 框架构图：聚焦、窥视，适合紧张感和层次感', '', '### 导演思维', '• 黄金分割：将主体放在三分点或黄金螺旋', '• 留白技巧：表达孤独、期待或强调主体', '• 框架使用：门窗等元素构图，增加画面层次'] },
  { title: '光影逻辑', level: '核心', icon: '💡', summary: '体积光/冷暖对比/轮廓光的氛围塑造',
    content: ['## 光影逻辑', '光影是氛围的灵魂，决定画面的情绪基调。', '', '### 光影类型', '• 散射光：柔和、无方向，压抑、沉闷氛围', '• 体积光：光柱、光束可见，神圣、诡异感', '• 轮廓光：边缘发光，分离、神秘感', '• 冷暖对比：蓝橙并存，冲突、复杂情绪', '', '### 导演思维', '• 体积光：用烟雾等介质让光线可见', '• 单光源：戏剧感、电影感标配', '• 冷暖对比：表现内心冲突或时间对比', '• 顶光：压迫、不自然感，用于审讯或压迫场景'] },
  { title: '动态设计', level: '核心', icon: '🎥', summary: '相机运动/物理反馈/叙事动作',
    content: ['## 动态设计', '运动是视觉叙事的动态元素，包括角色运动和摄影机运动。', '', '### 摄影机运动', '• 推轨(Dolly)：接近或远离，强调或退后', '• 摇镜(Pan)：水平旋转，跟拍或交代环境', '• 升降(Crane)：上下运动，大全景或史诗感', '• 手持(Handheld)：晃动，真实感、紧张感', '• 稳定器(Gimbal)：平滑跟随，流畅跟拍', '', '### 导演思维', '• 推镜头：强调、聚焦、接近角色内心', '• 拉镜头：退后、揭示、陌生化效果', '• 手持镜头：真实感、紧迫感、纪录风格', '• 长镜头：连续性、沉浸感、复杂调度能力'] }
]

const workflow = [
  { step: 1, name: '剧本设计', desc: '确定故事结构、情感节奏、核心主题', icon: '📝',
    content: ['## 剧本设计', '剧本是AI视频的基石，决定一切。', '', '### 核心要素', '1. 故事结构：三幕式/五幕式/非线性叙事', '2. 情感节奏：张弛有度，留白与高潮交替', '3. 核心主题：你想表达什么？探索什么？', '', '### 50秒预告片结构', '• 0-5s：开场钩子，吸引注意力', '• 5-15s：设定展示，世界观铺陈', '• 15-25s：角色亮相，建立人物', '• 25-35s：冲突升级，节奏加快', '• 35-42s：高潮铺垫，制造期待', '• 42-50s：标题落版，收尾留悬念'] },
  { step: 2, name: '视觉风格', desc: '确定色调、光影、构图、情绪基调', icon: '🎨',
    content: ['## 视觉风格', '视觉风格是作品的"气质"，需要提前确定。', '', '### 风格参考来源', '1. 导演作品：维伦纽瓦、诺兰、塔导、大卫芬奇', '2. 电影类型：科幻、悬疑、文艺、动作、恐怖', '3. 艺术风格：新黑色、蒸汽朋克、赛博朋克、废土', '', '### 视觉风格板', '• 主色调：冷灰蓝/赛博紫/暖琥珀/低饱和', '• 光影：散射光/体积光/霓虹/自然光', '• 构图：黄金分割/对称/极简/框架', '• 情绪：压抑/紧张/神秘/史诗/文艺'] },
  { step: 3, name: '角色设计', desc: '角色外观、黄金锚点、服装道具', icon: '👤',
    content: ['## 角色设计', '角色是故事的核心，需要精心设计。', '', '### 角色设计要素', '• 外貌特征：体型、脸型、五官、肤色', '• 黄金锚点：独特辨识点（伤疤、眼镜、配饰）', '• 服装：身份、职业、时代感', '• 道具：职业道具、个人物品', '• 光影配合：如何打光强化角色性格', '', '### 黄金锚点原则', '1. 独特性：让人一眼记住', '2. 一致性：全片保持一致', '3. 功能性：可强化角色性格或暗示命运'] },
  { step: 4, name: '分镜脚本', desc: '场景拆分、运镜设计、动态描述', icon: '🎬',
    content: ['## 分镜脚本', '分镜是将剧本转化为具体画面的桥梁。', '', '### 分镜要点', '• 画面优先：想象最终画面效果', '• 动静态结合：静中有动，动中有静', '• 节奏控制：快慢镜头交替', '• 声音预判：考虑BGM和音效配合', '', '### 分镜检查清单', '✓ 每个场景有明确叙事目的', '✓ 景别变化有逻辑', '✓ 运镜与情绪匹配', '✓ 时长分配合理', '✓ 首帧可生成'] },
  { step: 5, name: '生图阶段', desc: '即梦AI生图、多版本备选、Seed固定', icon: '✨',
    content: ['## 生图阶段', '使用即梦AI生成高质量参考图。', '', '### 即梦AI使用流程', '1. 选择模型：图片4.0（质量最高）', '2. 设置比例：3:2（全身）/ 16:9（场景）', '3. 设置质量：4K', '4. 输入提示词：结构化描述', '5. 生成多版：每场景3-5个版本', '', '### 提示词结构', '[主体描述] + [服装道具] + [场景环境] + [光影] + [情绪] + [技术参数]', '', '### 生图技巧', '• 首帧质量：决定70%效果', '• 固定Seed：保持角色/场景一致性', '• 垫图：用参考图保持风格统一'] },
  { step: 6, name: '图生视频', desc: '即梦AI视频、运镜控制、动作设计', icon: '🎥',
    content: ['## 图生视频', '将静态图片转化为动态视频片段。', '', '### 即梦AI视频模型', '• 视频3.0 Fast：5秒，生成速度快', '• 视频3.0 Pro：5秒，质量更高', '', '### 运镜关键词', '• 推进：push forward, crane in', '• 拉远：pull backward, crane out', '• 左移：move left, pan left', '• 右移：move right, pan right', '• 环绕：orbit, circle around', '', '### 动作设计原则', '1. 一次一个动作：避免复杂动作组合', '2. 预留空间：主体不要贴边', '3. 方向一致：考虑运动连贯性'] },
  { step: 7, name: '剪辑合成', desc: '剪映Pro剪辑、调色、BGM、字幕', icon: '✂️',
    content: ['## 剪辑合成', '最后一步，将所有素材整合成片。', '', '### 剪辑流程', '1. 素材整理：分类、命名、备份', '2. 粗剪：按分镜顺序排列', '3. 精剪：调整节奏、剪切点', '4. 调色：统一色调，强化风格', '5. 音效：BGM、环境音、动效', '6. 字幕：标题、对话、字幕条', '', '### 调色方向', '• 科幻悬疑：冷蓝紫，维伦纽瓦风格', '• 赛博朋克：霓虹色，Blade Runner风格', '• 文艺复古：暖黄褪色，塔导风格'] }
]

const knowledgeBase = [
  { title: '即梦AI使用指南', icon: '✨', summary: '生图4.0、图生视频3.0完整教程',
    content: ['## 即梦AI使用指南', '', '### 图片生成', '• 模型选择：图片4.0（质量最高）', '• 比例：3:2（全身）/ 16:9（场景）', '• 质量：4K（最高质量）', '', '### 提示词技巧', '[主体描述] + [服装道具] + [场景环境] + [光影] + [情绪] + [技术参数]', '', '### 视频生成', '• 视频3.0 Fast：5秒，快速', '• 视频3.0 Pro：5秒，高质量', '', '### 运镜控制', '输入运镜关键词控制相机运动', '常用：推进、拉远、左移、右移、环绕'] },
  { title: '可灵AI完全指南', icon: '🎬', summary: '可灵AI视频生成技巧与提示词',
    content: ['## 可灵AI使用指南', '', '### 核心特点', '• 擅长自然场景和人物动作', '• 动作连贯性较好', '• 支持运镜控制', '', '### 提示词结构', '[场景描述] + [主体动作] + [运镜] + [氛围]', '', '### 最佳实践', '1. 描述要具体清晰', '2. 预留运动空间', '3. 控制动作幅度', '4. 注意首帧质量'] },
  { title: 'AI视频提示词设计', icon: '📝', summary: '模块化提示词、参数调试、负面词',
    content: ['## AI视频提示词设计', '', '### 模块化结构', '[基础风格模块] + [分镜内容模块] + [动态控制模块]', '', '### 基础风格模块', '定义整体视觉基调', '• 低饱和、泥土色、烛光（胡金铨风格）', '• 霓虹紫蓝、赛博质感（赛博朋克）', '', '### 动态控制模块', '• 相机运动方式', '• 主体动作', '• 节奏和情绪', '', '### 参数调试', '• Seed：固定随机种子保持一致', '• CFG：控制提示词执行力度'] },
  { title: '分镜脚本标准模板', icon: '🎞️', summary: '10场景分镜标准化格式',
    content: ['## 分镜脚本标准模板', '', '### 标准格式', '【场景序号】场景名称', '时间：[开始-结束]', '景别：', '角度：', '运镜：', '主体：', '场景：', '光影：', '动作：', '备注：', '', '### 分镜检查清单', '✓ 每个场景有明确目的', '✓ 景别变化有逻辑', '✓ 运镜与情绪匹配', '✓ 时长分配合理', '✓ 首帧可生成'] },
  { title: '导演思维公式', icon: '🎯', summary: '视点叙事、环境压抑、时间停滞等公式',
    content: ['## 导演思维公式', '', '### 视点叙事公式', 'POV + 前景 → 窥视感', '主观镜头 + 框架前景 → 观众成为角色', '', '### 环境压抑公式', '远景 + 高俯角 → 渺小感', '大全景俯拍 + 空旷环境 → 角色显得渺小无力', '', '### 时间停滞公式', '微距 + 细节 → 静态爆发力', '特写聚焦细节 + 慢动作 → 强调关键时刻', '', '### 更多公式', '• 紧张感：近景 + 浅景深 + 手持', '• 孤独感：远景 + 负空间 + 慢移', '• 神秘感：低光 + 轮廓光 + 烟雾', '• 史诗感：全景 + 升格 + 交响乐'] },
  { title: '声音设计指南', icon: '🔊', summary: 'BGM选择、音效、旁白配音',
    content: ['## 声音设计指南', '', '### BGM选择原则', '1. 情绪匹配：与画面情绪一致', '2. 节奏配合：快慢镜头配不同节奏', '3. 留白处理：非高潮处可用纯氛围音', '', '### 音乐风格参考', '• 史诗：管弦乐、合唱，大场面、历史', '• 悬疑：电子氛围、弦乐，推理、惊悚', '• 科幻：电子合成器，科幻、未来', '• 文艺：原声吉他、钢琴，文艺、抒情', '', '### 旁白/配音', '• 控制时长（50秒预告通常无对话）', '• 字幕配合视觉节奏', '• 留白让画面说话'] }
]

const openclawDays = [
  { day: 1, title: '初识 OpenClaw', icon: '👋', excerpt: 'AI助手和聊天机器人的本质区别',
    content: ['## 初识 OpenClaw', '', '### AI助手 vs 聊天机器人', '传统聊天机器人：被动响应问答、无法记忆上下文、无法执行实际任务', '', 'OpenClaw AI助手：主动执行任务、记忆和学习能力、可操控文件和代码、可自动化工作流程', '', '### OpenClaw能做什么', '• 邮件管理和摘要', '• 日程和会议管理', '• 代码编写和调试', '• 网络搜索和数据分析', '• 文档处理和写作', '• 定时任务和提醒', '• 网页浏览和表单填写'] },
  { day: 2, title: '快速开始', icon: '🚀', excerpt: '10分钟搭建你的AI助手',
    content: ['## 快速开始', '', '### 环境选择', '• 云服务器(推荐)：24小时在线，Hetzner/AWS', '• Mac Mini/旧电脑：零成本，完全本地', '• 当前电脑：试玩体验，关机就没', '', '### 安装步骤', '1. 打开终端，运行安装命令', '2. 配置AI模型(Claude/GPT)', '3. 连接Telegram Bot', '4. 设置管理员ID', '5. 安装后台守护进程', '', '### 一键安装命令', 'curl -fsSL https://openclaw.ai/install.sh | bash'] },
  { day: 3, title: '深度对话', icon: '💬', excerpt: '掌握与AI沟通的艺术',
    content: ['## 深度对话', '', '### Prompt编写技巧', '1. 明确任务：一句话说明要什么', '2. 提供背景：让AI理解上下文', '3. 指定格式：JSON/Markdown/列表等', '4. 约束条件：限制范围或排除项', '', '### 上下文管理', '• 利用多轮对话传递信息', '• 重要信息主动提醒AI记忆', '• 复杂任务分步骤执行'] },
  { day: 4, title: '文件与代码', icon: '📁', excerpt: '让AI处理文件，写代码、执行脚本',
    content: ['## 文件与代码', '', '### 文件操作', '• 读取和分析文件内容', '• 创建和编辑文件', '• 批量处理多个文件', '• 保持文件结构和格式', '', '### 代码能力', '• 编写新代码', '• Debug和修复', '• 代码审查', '• 执行脚本'] },
  { day: 5, title: '技能扩展', icon: '🧩', excerpt: '安装社区技能扩展AI能力',
    content: ['## 技能扩展', '', '### ClawHub技能市场', '• 5494+ 社区技能', '• 31个分类', '• 一键安装', '', '### 常用技能分类', '• 编程：代码生成、调试', '• 数据：Excel、数据库', '• 图像：OCR、设计', '• 自动化：定时任务、工作流'] },
  { day: 6, title: '自动化', icon: '⏰', excerpt: '定时任务、心跳、主动推送',
    content: ['## 自动化', '', '### 定时任务', '设置在特定时间自动执行的任务', '• 每日新闻摘要', '• 定期数据备份', '• 定时提醒', '', '### 心跳机制', '• 监控重要信息变化', '• 主动提醒用户', '• 周期性任务检查'] },
  { day: 7, title: '高级技巧', icon: '🚀', excerpt: '多Agent、浏览器控制、设备集成',
    content: ['## 高级技巧', '', '### 多Agent协作', '• 多个AI Agent分工合作', '• 复杂任务拆解执行', '• 子Agent专门化', '', '### 浏览器控制', '• 自动网页浏览', '• 表单填写', '• 数据采集', '', '### 安全注意事项', '• 谨慎处理敏感操作', '• 确认后再执行外部操作', '• 定期检查权限设置'] }
]

const tabs = [
  { id: 'ai-projects', label: '🎬 AI视频项目' },
  { id: 'director-thinking', label: '🎯 导演思维' },
  { id: 'workflow', label: '📋 制作流程' },
  { id: 'knowledge', label: '📚 知识库' },
  { id: 'openclaw', label: '🦞 OpenClaw' }
]

function ImageModal({ src, alt, onClose }: { src: string, alt: string, onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-2 right-2 text-white text-lg hover:text-gray-300 bg-black/50 rounded-full w-10 h-10 z-10">✕</button>
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

function DetailModal({ title, content, onClose }: { title: string, content: string[], onClose: () => void }) {
  const renderContent = () => {
    return content.map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-6 mb-3 text-gray-800">{line.replace('## ', '')}</h2>
      if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold mt-4 mb-2 text-gray-700">{line.replace('### ', '')}</h3>
      if (line.trim() === '') return <br key={i} />
      if (line.startsWith('• ')) return <li key={i} className="ml-4 text-gray-600 list-disc my-1">{line.replace('• ', '')}</li>
      if (line.match(/^\d+\./)) return <li key={i} className="ml-4 text-gray-600 list-decimal my-1">{line.replace(/^\d+\.\s*/, '')}</li>
      if (line.startsWith('✓ ')) return <li key={i} className="ml-4 text-gray-600 list-disc my-1">{line}</li>
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
  const [activeTab, setActiveTab] = useState('ai-projects')
  const [expandedSection, setExpandedSection] = useState('characters')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string } | null>(null)
  const [selectedDetail, setSelectedDetail] = useState<{ title: string, content: string[] } | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
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
        {activeTab === 'director-thinking' && <DirectorThinkingSection onDetailClick={(title, content) => setSelectedDetail({ title, content })} />}
        {activeTab === 'workflow' && <WorkflowSection onDetailClick={(title, content) => setSelectedDetail({ title, content })} />}
        {activeTab === 'knowledge' && <KnowledgeSection onDetailClick={(title, content) => setSelectedDetail({ title, content })} />}
        {activeTab === 'openclaw' && <OpenClawSection onDetailClick={(title, content) => setSelectedDetail({ title, content })} />}
      </main>

      {selectedImage && <ImageModal src={selectedImage.src} alt={selectedImage.alt} onClose={() => setSelectedImage(null)} />}
      {selectedDetail && <DetailModal title={selectedDetail.title} content={selectedDetail.content} onClose={() => setSelectedDetail(null)} />}

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
        </div>
      </div>

      {expandedSection === 'characters' && (
        <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4">👤 人物设计参考图</h2>
          <p className="text-sm text-gray-500 mb-4">点击图片查看大图，了解详细角色设定</p>
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
                  <p className="text-xs text-gray-500">{char.age} · {char.role}</p>
                  <p className="text-xs text-gray-400 mt-1 hidden md:block">身高{char.height} · {char.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {expandedSection === 'threeview' && (
        <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4">🔲 人物三视图</h2>
          <p className="text-sm text-gray-500 mb-4">正视图/侧视图/后视图三视角一致设计</p>
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
                  <div className="mt-2 text-xs text-gray-600">
                    <p><span className="text-gray-400">黄金锚点：</span>{char.anchor}</p>
                    <p className="hidden md:block"><span className="text-gray-400">服装：</span>{char.clothes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {expandedSection === 'character-scene' && (
        <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4">🎭 人物与场景设计</h2>
          <p className="text-sm text-gray-500 mb-4">角色在其专属场景中的视觉呈现</p>
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
          <p className="text-sm text-gray-500 mb-4">10个核心场景，已生成4个场景图</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
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
                  <p className="text-xs text-gray-400 mt-1 hidden md:block">{scene.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
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
                <li><strong>核心概念：</strong>未来能量被抽干的末日世界</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold mb-2">四角色设计</h3>
              <div className="grid grid-cols-2 gap-2">
                {beautifulNewWorld.characters.map((char, i) => (
                  <div key={i} className="text-sm">
                    <span className="font-medium">{char.name}</span> - {char.anchor}
                  </div>
                ))}
              </div>
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
    </div>
  )
}

function DirectorThinkingSection({ onDetailClick }: { onDetailClick: (title: string, content: string[]) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">🎯 导演思维与学习计划</h1>
        <p className="text-gray-600">掌握视觉叙事的核心能力 · 点击卡片查看详情</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {directorThinking.map((item, i) => (
          <div key={i} onClick={() => onDetailClick(item.title, item.content)}
            className="bg-white rounded-xl p-4 md:p-6 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{item.icon}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.level === '核心' ? 'bg-red-100 text-red-800' : item.level === '进阶' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{item.level}</span>
            </div>
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.summary}</p>
            <div className="mt-3 text-blue-600 text-sm">点击查看详情 →</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function WorkflowSection({ onDetailClick }: { onDetailClick: (title: string, content: string[]) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">📋 AI视频制作流程</h1>
        <p className="text-gray-600">从概念到成品的7步法则 · 点击查看详情</p>
      </div>
      <div className="space-y-4">
        {workflow.map((item, i) => (
          <div key={i} onClick={() => onDetailClick(item.name, item.content)}
            className="flex items-start gap-4 cursor-pointer hover:scale-[1.01] transition">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
            <div className="flex-1 bg-white rounded-xl p-4 shadow-sm hover:shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-gray-500">Step {item.step}</span>
                <h3 className="text-lg font-bold">{item.name}</h3>
              </div>
              <p className="text-gray-600 text-sm">{item.desc}</p>
              <div className="mt-2 text-blue-600 text-sm">点击查看详情 →</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function KnowledgeSection({ onDetailClick }: { onDetailClick: (title: string, content: string[]) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">📚 AI知识库</h1>
        <p className="text-gray-600">AI视频制作专业教程 · 点击查看详情</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {knowledgeBase.map((item, i) => (
          <div key={i} onClick={() => onDetailClick(item.title, item.content)}
            className="bg-white rounded-xl p-4 md:p-6 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{item.icon}</span>
            </div>
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.summary}</p>
            <div className="mt-3 text-blue-600 text-sm">点击查看详情 →</div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">🔥 核心工具</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between"><span>即梦AI</span><span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">生图4.0 + 视频3.0</span></div>
            <div className="flex items-center justify-between"><span>可灵AI</span><span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">视频生成</span></div>
            <div className="flex items-center justify-between"><span>剪映Pro</span><span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">剪辑合成</span></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">💡 提示词技巧</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>• 首帧质量决定70%效果</li>
            <li>• 一次只做一个动作</li>
            <li>• 预留运动空间</li>
            <li>• 固定Seed保持一致性</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function OpenClawSection({ onDetailClick }: { onDetailClick: (title: string, content: string[]) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">🦞 OpenClaw学习与资料</h1>
        <p className="text-gray-600">7天掌握你的AI私人助理 · 点击卡片查看详情</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {openclawDays.map((item) => (
          <div key={item.day} onClick={() => onDetailClick('DAY ' + item.day + ': ' + item.title, item.content)}
            className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <span className="text-xs text-gray-500">DAY {item.day}</span>
                <h3 className="font-bold text-sm">{item.title}</h3>
              </div>
            </div>
            <p className="text-gray-600 text-xs">{item.excerpt}</p>
            <div className="mt-2 text-blue-600 text-xs">点击查看详情 →</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">🧩 技能库推荐</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="border rounded-lg p-3 text-center">
            <p className="text-2xl mb-1">🌐</p>
            <p className="font-medium text-sm">网络搜索</p>
            <p className="text-xs text-gray-500">实时信息获取</p>
          </div>
          <div className="border rounded-lg p-3 text-center">
            <p className="text-2xl mb-1">📧</p>
            <p className="font-medium text-sm">邮件管理</p>
            <p className="text-xs text-gray-500">Gmail/日历</p>
          </div>
          <div className="border rounded-lg p-3 text-center">
            <p className="text-2xl mb-1">📁</p>
            <p className="font-medium text-sm">文件处理</p>
            <p className="text-xs text-gray-500">读写编辑</p>
          </div>
          <div className="border rounded-lg p-3 text-center">
            <p className="text-2xl mb-1">⏰</p>
            <p className="font-medium text-sm">定时任务</p>
            <p className="text-xs text-gray-500">自动化</p>
          </div>
        </div>
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
