// ==================== Prompt Templates ====================

export const SCRIPT_PARSE_SYSTEM = `你是一个专业的短剧剧本结构化分析师。

你的任务是将输入的剧本拆解成结构化的场景和角色信息。

【拆解原则】
1. 场景划分标准：
   - 时间或地点变化 = 新场景
   - 情绪重大转折 = 新场景
   - 角色大规模进出 = 新场景
   
2. 角色提取标准：
   - 有名字的角色单独提取
   - 无名字但有明确特征的角色归为群演（如"匈奴骑兵"）
   - 主角必须有详细描述，配角可以简略

3. 道具提取标准：
   - 影响剧情的关键物品必须提取
   - 重复出现的道具标记"重要"

【输出格式】
严格按以下JSON格式输出，不要添加任何解释，不要用markdown代码块：

{
  "story_summary": "一句话概括整个故事",
  "total_duration": 预估总时长（秒）,
  "scenes": [
    {
      "scene_id": 1,
      "title": "场景标题（如：漠北草原·晨曦）",
      "description": "场景画面描述（用于生成场景图）",
      "location": "地点",
      "time_of_day": "拂晓/清晨/正午/黄昏/夜晚",
      "weather": "晴/雨/雪/雾",
      "mood": "史诗/紧张/温馨/悬疑",
      "characters": [
        {
          "name": "角色名",
          "role": "主角/配角/群演",
          "description": "外貌服装描述",
          "emotion": "当前情绪",
          "action": "主要动作"
        }
      ],
      "props": ["关键道具1", "关键道具2"],
      "narrative_beat": "这一场在讲什么（承上启下）"
    }
  ],
  "characters": [
    {
      "name": "角色名",
      "age": 年龄,
      "gender": "male/female",
      "identity": "身份",
      "appearance": "外貌描述",
      "clothing": "服装描述",
      "personality": "性格特点",
      "appears_in_scenes": [1, 3, 5]
    }
  ],
  "props": [
    {
      "name": "道具名",
      "description": "外观描述",
      "importance": "重要/普通",
      "appears_in_scenes": [1, 2]
    }
  ]
}`

export const STORYBOARD_SYSTEM = `你是一个专业的影视分镜导演。

你的任务是将场景信息转化为具体的分镜表。

【分镜基本规则】
1. 每个分镜时长：5-10秒
2. 总时长控制在60-120秒（适合短视频）
3. 开头用 Establishing Shot 建立场景
4. 结尾留有余韵，不要太满
5. 关键情感/动作时刻用特写或POV

【景别选择指南】
- establishing (大全景): 开头/结尾，建立氛围
- wide (远景): 展示环境全貌
- medium (中景): 对话/日常动作
- closeup (特写): 强调表情/细节
- extreme-closeup (大特写): 情感爆发/关键物品
- pov (主观视角): 增强沉浸感
- insert (插入镜头): 强调某个物品/细节

【运镜指南】
- static (固定): 稳重、严肃对话
- push-in (推进): 情绪加深、聚焦注意
- pull-out (拉远): 揭示环境、情绪释放
- pan (横移): 展示空间、跟拍动作
- orbit (环绕): 强调角色、营造张力
- handheld (手持): 纪实感、紧张感

【转场选择】
- cut (硬切): 快节奏、干净利落
- dissolve (叠化): 时间流逝、梦境感
- fade (淡入淡出): 段落分隔
- whip-pan (甩镜): 快速转场、强调动感

【输出格式】
严格按以下JSON格式输出，不要添加任何解释，不要用markdown代码块：

{
  "shots": [
    {
      "shot_id": 1,
      "scene_id": 1,
      "shot_type": "establishing/wide/medium/closeup/pov/insert",
      "description": "具体的画面描述（用于AI生成视频）",
      "camera": {
        "shot": "景别名称",
        "angle": "平视/仰视/俯视/荷兰角",
        "movement": "固定/推进/拉远/横移/环绕/手持",
        "lens": "广角/标准/长焦",
        "duration": 8,
        "focus_point": "焦点位置描述"
      },
      "lighting": {
        "type": "自然光/人工光/混合",
        "direction": "顺光/侧光/逆光",
        "mood": "明亮/昏暗/对比强烈/柔和"
      },
      "sound": {
        "dialogue": "对白文本（无对白则写null）",
        "sfx": "音效（如马蹄声、刀剑声、雨声）",
        "ambience": "环境音（如风声、人群嘈杂）",
        "music_cue": "音乐提示（如渐入的紧张弦乐）"
      },
      "character_refs": ["角色1", "角色2"],
      "props_in_shot": ["道具1"],
      "mood": "史诗/紧张/温馨/悬疑",
      "narrative_function": "这个镜头在叙事中的作用",
      "transition_to_next": "cut/dissolve/fade/whip-pan",
      "ai_prompt": "专门给AI看的视频生成提示词（英文，描述具体动作和画面）"
    }
  ],
  "total_duration": 90,
  "aspect_ratio": "16:9"
}`

// ==================== MiniMax LLM ====================

interface MiniMaxConfig {
  apiKey: string
  baseUrl?: string
}

export async function minimaxChat(
  prompt: string,
  systemPrompt: string,
  config: MiniMaxConfig
): Promise<string> {
  const { apiKey, baseUrl = 'https://api.minimax.chat/v1' } = config
  
  const response = await fetch(`${baseUrl}/text/chatcompletion_v2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'MiniMax-Text-01',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 8192,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`MiniMax API error: ${response.status} - ${error}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || ''
}

// ==================== 即梦AI (Jimeng) ====================

export interface JimengTaskResult {
  taskId: string
  imageUrl?: string
  status: 'pending' | 'processing' | 'success' | 'failed'
  error?: string
}

export async function submitJimengTask(
  prompt: string,
  width: number = 1024,
  height: number = 1024
): Promise<string> {
  // 调用现有的Python脚本
  const { execSync } = await import('child_process')
  
  const result = execSync(
    `python3 -c "
import sys
sys.path.insert(0, '${process.cwd().replace(/'/g, "\\'")}')
from lib.jimeng_wrapper import submit_task
import json
result = submit_task('${prompt.replace(/'/g, "\\'")}', ${width}, ${height})
print(json.dumps(result))
"`,
    { encoding: 'utf-8', timeout: 30000 }
  )
  
  const data = JSON.parse(result)
  // jimeng_api returns code: 10000 for success
  if (!data?.data?.task_id && !data?.task_id) {
    throw new Error(`Jimeng API error: ${result}`)
  }
  
  return data?.data?.task_id || data?.task_id
}

export async function queryJimengTask(taskId: string): Promise<JimengTaskResult> {
  const { execSync } = await import('child_process')
  
  const result = execSync(
    `python3 -c "
import sys
sys.path.insert(0, '${process.cwd().replace(/'/g, "\\'")}')
from lib.jimeng_wrapper import query_task
import json
result = query_task('${taskId}')
print(json.dumps(result))
"`,
    { encoding: 'utf-8', timeout: 30000 }
  )
  
  const data = JSON.parse(result)
  
  // jimeng_api returns code: 10000 for success
  const status = data?.data?.task_status || data?.task_status
  if (status === 'finish') {
    return {
      taskId,
      status: 'success',
      imageUrl: data?.data?.image_urls?.[0] || data?.data?.result?.image_url
    }
  } else if (status === 'failed') {
    return { taskId, status: 'failed', error: data?.data?.description }
  }
  
  return { taskId, status: 'processing' }
}

// ==================== 可灵AI (Kling) ====================

export interface KlingConfig {
  accessKey: string
  secretKey: string
}

export async function submitKlingTask(
  imageUrl: string,
  prompt: string,
  duration: number = 5,
  config: KlingConfig
): Promise<string> {
  const { accessKey, secretKey } = config
  
  const { execSync } = await import('child_process')
  
  const result = execSync(
    `python3 -c "
import sys
sys.path.insert(0, '${process.cwd().replace(/'/g, "\\'")}')
from lib.kling_wrapper import submit_video_task
import json
result = submit_video_task(
  '${imageUrl.replace(/'/g, "\\'")}',
  '${prompt.replace(/'/g, "\\'")}',
  ${duration},
  '${accessKey}',
  '${secretKey}'
)
print(json.dumps(result))
"`,
    { encoding: 'utf-8', timeout: 30000 }
  )
  
  const data = JSON.parse(result)
  if (data.code !== 0 && data?.task_id === undefined) {
    throw new Error(`Kling API error: ${result}`)
  }
  
  return data?.task_id || data?.data?.task_id
}

export async function queryKlingTask(
  taskId: string,
  config: KlingConfig
): Promise<{ status: 'pending' | 'processing' | 'success' | 'failed', videoUrl?: string, error?: string }> {
  const { accessKey, secretKey } = config
  
  const { execSync } = await import('child_process')
  
  const result = execSync(
    `python3 -c "
import sys
sys.path.insert(0, '${process.cwd().replace(/'/g, "\\'")}')
from lib.kling_wrapper import query_video_task
import json
result = query_video_task(
  '${taskId}',
  '${accessKey}',
  '${secretKey}'
)
print(json.dumps(result))
"`,
    { encoding: 'utf-8', timeout: 30000 }
  )
  
  const data = JSON.parse(result)
  
  if (data?.status === 'completed') {
    return { status: 'success', videoUrl: data?.video_url || data?.data?.video_url }
  } else if (data?.status === 'failed') {
    return { status: 'failed', error: data?.message || 'Unknown error' }
  }
  
  return { status: 'processing' }
}
