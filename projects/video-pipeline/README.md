# 纳米流水线 (Nano Pipeline)

> AI短剧创作平台 — 从剧本到视频的自动化流水线

## 快速启动

```bash
cd ~/video-pipeline

# 安装依赖（如需要）
npm install

# 启动开发服务器
npm run dev
# 访问 http://localhost:3001
```

## 配置 API Key

在终端设置环境变量：

```bash
# MiniMax LLM（剧本拆解 + 分镜生成）
export MINIMAX_API_KEY="your_minimax_key"

# 即梦AI（文生图）
# 使用 ~/.openclaw/workspace/jimeng_api.py 中的内置凭证
# 或设置：
export JIMENG_ACCESS_KEY="your_key"
export JIMENG_SECRET_KEY="your_secret"

# 可灵AI（图生视频）
export KLING_ACCESS_KEY="your_key"
export KLING_SECRET_KEY="your_secret"
```

## 功能

- [x] 7步工作流界面（深色科技风）
- [x] 项目管理（创建/编辑/删除）
- [x] 剧本输入 + AI智能拆解（MiniMax）
- [x] 场景/角色数据结构化
- [x] 分镜脚本AI生成
- [x] 即梦AI资产生成
- [x] 本地JSON文件存储
- [ ] 视频生成队列UI
- [ ] 步骤⑤⑥⑦完整功能

## 7步流水线

```
① 全局设定 → 项目配置
② 故事剧本 → AI拆解场景/角色/道具
③ 场景角色 → 资产生成（角色卡/场景图）
④ 分镜脚本 → AI生成分镜JSON
⑤ 分镜视频 → AI图生视频
⑥ 配音对口型 → TTS配音 + 唇音同步
⑦ 视频预览 → 最终合成
```

## 技术栈

| 模块 | 技术 |
|------|------|
| 前端 | Next.js 14 + TypeScript + TailwindCSS |
| 状态 | Zustand |
| LLM | MiniMax Chat API |
| 图生图 | 即梦AI (火山引擎) |
| 图生视频 | 可灵AI |
| 存储 | 本地JSON文件 |

## 项目结构

```
video-pipeline/
├── app/
│   ├── api/              # API路由
│   │   ├── projects/     # 项目CRUD
│   │   ├── generate/     # AI生成
│   │   └── task/        # 任务状态
│   └── project/[id]/    # 项目详情页
├── components/           # React组件
├── lib/
│   ├── ai.ts            # AI调用封装
│   ├── storage.ts        # 文件存储
│   ├── config.ts        # 配置
│   ├── jimeng_wrapper.py # 即梦API
│   └── kling_wrapper.py # 可灵API
├── store/               # Zustand状态
├── types/              # TypeScript类型
└── data/                # 项目数据（本地）
```

## 本地数据位置

```
~/video-pipeline/data/projects/     # 项目JSON
~/video-pipeline/assets/           # 生成的图片/视频
```

## 下一步

1. 完成步骤③的资产生成UI（角色/场景图生图）
2. 完成步骤⑤视频生成队列
3. 对接即梦AI视频生成API
4. 添加配音和对口型功能
5. 添加微信通知（任务完成推送）
