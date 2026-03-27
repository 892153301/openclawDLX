import { NextRequest, NextResponse } from 'next/server'
import { getProject, saveProject, getScenes, getCharacters, saveStoryboard } from '@/lib/storage'
import { minimaxChat, STORYBOARD_SYSTEM } from '@/lib/ai'
import { config } from '@/lib/config'
import { v4 as uuid } from 'uuid'
import { Storyboard, Shot } from '@/types'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const project = await getProject(id)
    if (!project) {
      return NextResponse.json({ code: -1, msg: 'Project not found' }, { status: 404 })
    }

    const scenes = await getScenes(id)
    const characters = await getCharacters(id)
    
    if (scenes.length === 0) {
      return NextResponse.json({ code: -1, msg: '请先完成剧本拆解' }, { status: 400 })
    }

    const apiKey = config.minimax.apiKey
    if (!apiKey) {
      return NextResponse.json({ code: -1, msg: 'MINIMAX_API_KEY not configured' }, { status: 500 })
    }

    // 构建Prompt
    const scenesInfo = scenes.map(s => `
【场景${s.sceneId}: ${s.title}】
地点: ${s.location}
时间: ${s.timeOfDay} ${s.weather}
情绪: ${s.mood}
描述: ${s.description}
出场角色: ${s.characters.map(c => `${c.name}(${c.role})`).join(', ')}
道具: ${s.props.join(', ')}
`).join('\n')

    const charsInfo = characters.map(c => `
${c.name}:
- 身份: ${c.identity}
- 外貌: ${c.appearance}
- 服装: ${c.clothing}
`).join('\n')

    const userPrompt = `
请为以下剧本生成分镜表：

【项目信息】
- 类型: ${project.type}
- 时代: ${project.era}
- 风格: ${project.style}

【场景列表】
${scenesInfo}

【角色列表】
${charsInfo}

请严格按照分镜格式生成，确保总时长在60-120秒之间。
`

    const result = await minimaxChat(userPrompt, STORYBOARD_SYSTEM, { apiKey })

    // 解析JSON结果
    let parseResult
    try {
      const cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      parseResult = JSON.parse(cleaned)
    } catch (e) {
      console.error('Failed to parse storyboard result:', result)
      return NextResponse.json({ 
        code: -1, 
        msg: '分镜脚本生成失败，AI返回格式异常' 
      }, { status: 500 })
    }

    // 构建Storyboard
    const shots: Shot[] = (parseResult.shots || []).map((s: any) => ({
      shotId: s.shot_id || s.shotId || 1,
      sceneId: s.scene_id || s.sceneId || 1,
      shotType: s.shot_type || s.shotType || 'medium',
      description: s.description || '',
      camera: {
        shot: s.camera?.shot || '中景',
        angle: s.camera?.angle || '平视',
        movement: s.camera?.movement || '固定',
        lens: s.camera?.lens || '标准',
        duration: s.camera?.duration || 8,
        focusPoint: s.camera?.focus_point || s.camera?.focusPoint || '',
      },
      lighting: {
        type: s.lighting?.type || '自然光',
        direction: s.lighting?.direction || '侧光',
        mood: s.lighting?.mood || '普通',
      },
      sound: {
        dialogue: s.sound?.dialogue || null,
        sfx: s.sound?.sfx || null,
        ambience: s.sound?.ambience || null,
        musicCue: s.sound?.music_cue || null,
      },
      characterRefs: s.character_refs || [],
      sceneRef: s.scene_ref || undefined,
      propsInShot: s.props_in_shot || [],
      mood: s.mood || '普通',
      narrativeFunction: s.narrative_function || s.narrativeFunction || '',
      transition: s.transition_to_next || s.transitionToNext || 'cut',
      aiPrompt: s.ai_prompt || s.aiPrompt || s.description || '',
      videoStatus: 'pending',
      videoUrl: null,
      firstFrameUrl: null,
      lastFrameUrl: null,
      thumbnailUrl: null,
    }))

    const storyboard: Storyboard = {
      projectId: id,
      totalDuration: parseResult.total_duration || parseResult.totalDuration || shots.reduce((acc, s) => acc + s.camera.duration, 0),
      aspectRatio: parseResult.aspect_ratio || parseResult.aspectRatio || '16:9',
      shots,
      characterRefs: {},
      sceneRefs: {},
    }

    // 补充角色引用
    characters.forEach(c => {
      storyboard.characterRefs[c.id] = {
        name: c.name,
        emotionRefs: {},
      }
    })

    // 保存分镜
    await saveStoryboard(id, storyboard)

    // 更新项目状态
    await saveProject({
      ...project,
      status: 'storyboard',
      updatedAt: new Date().toISOString()
    })

    return NextResponse.json({ code: 0, data: storyboard })
  } catch (err: any) {
    console.error('POST /api/projects/[id]/generate-storyboard error:', err)
    return NextResponse.json({ code: -1, msg: err.message || '分镜生成失败' }, { status: 500 })
  }
}
