# aigcmd 漫剧工坊 — AI短剧创作平台

> 从剧本到视频的AI流水线，AI视频工作流
> 技术栈: Next.js 14 + MiniMax LLM + 即梦AI + 可灵AI

---

## 1. Concept & Vision

一个本地运行的AI短剧创作平台，将「剧本文本」自动拆解为「场景+角色+道具」，再生成「分镜脚本」，最终输出「AI视频片段」。目标是让创作者专注于创意，其余全部自动化。

**核心理念：** 结构化 + 自动化 + 可干预
- AI做脏活（拆解、生成、连接）
- 人在关键节点做决策（选图、调整Prompt）

---

## 2. 设计语言

### 视觉风格
- 深色科技感，接近纳米P的界面风格
- 主色调：#1a1a2e (深蓝黑) + #00d4ff (科技青) + #6c46c1 (紫色点缀)

### 配色
```
背景主色:    #0f0f1a
卡片背景:    #1a1a2e  
边框:       #2a2a4e
主色调:     #00d4ff (科技青)
次要色:     #6c46c1 (紫色)
成功:       #00c48c
警告:       #ff9500
错误:       #ff4757
文字主色:   #ffffff
文字次要:   #8b8ba7
```

### 字体
- 中文: "PingFang SC", "Microsoft YaHei"
- 英文: "SF Mono", "JetBrains Mono"

---

## 3. 7步工作流

```
步骤1: 全局设定
  → 项目名称/类型/时代/风格

步骤2: 故事剧本
  → 粘贴/输入原始剧本，AI自动拆解

步骤3: 场景角色道具
  → AI生成角色卡、场景图、道具图
  
步骤4: 分镜脚本
  → AI生成分镜JSON，可手动编辑

步骤5: 分镜视频
  → AI图生视频，按顺序处理每个分镜

步骤6: 配音对口型
  → TTS配音生成（预留接口）

步骤7: 视频预览
  → 最终视频预览/导出
```

### 步骤指示器
- 顶部横向进度条
- 每个步骤显示: 序号 + 名称 + 状态(未开始/进行中/完成)
- 当前步骤高亮，已完成步骤打勾

---

## 4. 数据模型

### Project (项目)
```typescript
interface Project {
  id: string
  title: string
  type: string           // 如 "古代英雄传奇"
  era: string            // 如 "汉代"
  style: string          // 如 "电影级"
  synopsis: string       // 故事梗概
  status: 'setup' | 'script' | 'asset' | 'storyboard' | 'video' | 'audio' | 'preview'
  createdAt: string
  updatedAt: string
}
```

### Scene (场景)
```typescript
interface Scene {
  sceneId: number
  title: string
  description: string
  location: string
  timeOfDay: string       // 拂晓/清晨/正午/黄昏/夜晚
  weather: string
  mood: string
  characters: CharacterRef[]
  props: string[]
  narrativeBeat: string
  materials: Material[]
}
```

### Character (角色)
```typescript
interface Character {
  id: string
  name: string
  age: number
  gender: 'male' | 'female'
  identity: string
  appearance: string
  clothing: string
  personality: string
  materials: Material[]    // 角色参考图
  appearsInScenes: number[]
}
```

### Material (资产)
```typescript
interface Material {
  id: string
  type: 'character' | 'scene' | 'prop'
  name: string
  url: string              // 本地文件路径
  thumbnailUrl: string
  prompt: string           // 生成时的Prompt
  status: 'pending' | 'generating' | 'done' | 'failed'
  metadata: Record<string, any>
}
```

### Shot (分镜)
```typescript
interface Shot {
  shotId: number
  sceneId: number
  shotType: 'establishing' | 'wide' | 'medium' | 'closeup' | 'extreme-closeup' | 'pov' | 'insert'
  description: string
  camera: {
    shot: string
    angle: string
    movement: string
    lens: string
    duration: number
    focusPoint: string
  }
  lighting: {
    type: string
    direction: string
    mood: string
  }
  sound: {
    dialogue: string | null
    sfx: string | null
    ambience: string | null
    musicCue: string | null
  }
  characterRefs: string[]    // 角色Material IDs
  sceneRef: string          // 场景Material ID
  propsInShot: string[]
  mood: string
  narrativeFunction: string
  transition: 'cut' | 'dissolve' | 'fade' | 'whip-pan'
  aiPrompt: string
  videoStatus: 'pending' | 'generating' | 'done' | 'failed'
  videoUrl: string | null
  firstFrameUrl: string | null
  lastFrameUrl: string | null
  thumbnailUrl: string | null
}
```

---

## 5. 页面结构

### 布局
- 左侧: 项目列表 + 步骤导航 (固定侧边栏)
- 中间: 主工作区 (内容随步骤变化)
- 右侧: 资产预览面板 (可选)

### 页面

#### / (首页)
- 项目列表
- 新建项目按钮

#### /project/[id] (项目详情)
- 步骤进度条
- 当前步骤的主工作区

#### /project/[id]/step/[1-7] (各步骤)
- Step 1: 全局设定表单
- Step 2: 剧本输入 + AI拆解
- Step 3: 角色/场景/道具资产管理
- Step 4: 分镜脚本编辑器
- Step 5: 视频生成队列
- Step 6: 配音设置
- Step 7: 视频预览

---

## 6. 核心功能

### 6.1 剧本AI拆解
- 输入: 剧本文本 (纯文本)
- 处理: 调用MiniMax LLM，按剧本拆解Prompt分析
- 输出: 结构化JSON (scenes[], characters[], props[])
- 可干预: 用户可以修改/确认后再下一步

### 6.2 资产生成
- 对每个角色: 调用即梦AI生成参考图
- 对每个场景: 调用即梦AI生成场景图
- 存储: 本地文件系统 ($PROJECT/assets/)
- 展示: 网格卡片，支持预览/替换

### 6.3 分镜脚本生成
- 输入: 场景+角色+资产
- 处理: 调用MiniMax LLM，按分镜Prompt生成分镜JSON
- 输出: shots[] 数组
- 可干预: 表格形式，支持手动编辑

### 6.4 视频生成
- 模式1 (单图): 即梦图生视频
- 模式2 (首尾帧): 可灵AI首尾帧视频
- 处理: 顺序处理每个分镜，自动提取尾帧
- 队列: 显示进度，支持暂停/重试

### 6.5 视频预览
- 使用HTML5 video标签
- 按分镜顺序播放
- 下载最终视频

---

## 7. API 设计

### 端点

```
POST /api/project/create          创建项目
GET  /api/project/:id             获取项目
PUT  /api/project/:id             更新项目
DEL  /api/project/:id             删除项目

POST /api/project/:id/parse-script     AI拆解剧本
POST /api/project/:id/generate-assets AI生成资产
POST /api/project/:id/generate-storyboard AI生成分镜
POST /api/project/:id/generate-videos  AI生成视频

POST /api/generate/image          即梦AI生图
POST /api/generate/video          可灵AI生视频
POST /api/generate/tts            TTS配音

GET  /api/task/:id/status         查询任务状态
```

### 存储结构
```
~/video-pipeline/
├── data/
│   └── projects/
│       ├── project-uuid-1/
│       │   ├── project.json
│       │   ├── scenes.json
│       │   ├── characters.json
│       │   └── shots.json
│       └── project-uuid-2/
│           └── ...
└── assets/
    ├── project-uuid-1/
    │   ├── characters/
    │   │   └── char-001.png
    │   ├── scenes/
    │   │   └── scene-001.png
    │   └── videos/
    │       └── shot-001.mp4
    └── project-uuid-2/
        └── ...
```

---

## 8. 技术实现

### 前端
- Next.js 14 App Router
- TypeScript
- Zustand (状态管理)
- Tailwind CSS
- Lucide React (图标)

### 后端
- Next.js API Routes
- Python子进程调用 (jimeng_api.py, 可灵API)
- 本地JSON文件存储

### AI集成
- **MiniMax**: 剧本拆解 + 分镜生成
- **即梦AI**: 图生图 (通过现有jimeng_api.py)
- **可灵AI**: 图生视频 (通过可灵API)

### 关键依赖
```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "typescript": "5.x",
    "zustand": "4.x",
    "tailwindcss": "3.x",
    "lucide-react": "0.x",
    "uuid": "9.x"
  }
}
```

---

## 9. 优先级

### Phase 1: MVP (核心流程)
- [ ] 项目管理 (CRUD)
- [ ] 剧本输入 + AI拆解
- [ ] 角色/场景资产管理 (图生图)
- [ ] 分镜JSON展示 (手动编辑)
- [ ] 视频生成 (单图模式)

### Phase 2: 增强
- [ ] 首尾帧视频生成
- [ ] 批量生成
- [ ] 回溯修改
- [ ] 项目导入/导出

### Phase 3: 完整流水线
- [ ] TTS配音
- [ ] 唇音同步
- [ ] 自动剪辑预览
