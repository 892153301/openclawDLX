import { NextRequest, NextResponse } from 'next/server'
import { getProject, saveProject, saveScenes, saveCharacters } from '@/lib/storage'
import { minimaxChat, SCRIPT_PARSE_SYSTEM } from '@/lib/ai'
import { config } from '@/lib/config'
import { v4 as uuid } from 'uuid'
import { Scene, Character, CharacterRef } from '@/types'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const { scriptText } = await req.json()
    
    if (!scriptText || scriptText.trim().length < 50) {
      return NextResponse.json({ 
        code: -1, 
        msg: '剧本内容太少，请输入更详细的故事内容（至少50字）' 
      }, { status: 400 })
    }

    const project = await getProject(id)
    if (!project) {
      return NextResponse.json({ code: -1, msg: 'Project not found' }, { status: 404 })
    }

    // 调用MiniMax进行剧本拆解
    const apiKey = config.minimax.apiKey
    if (!apiKey) {
      return NextResponse.json({ 
        code: -1, 
        msg: 'MINIMAX_API_KEY not configured' 
      }, { status: 500 })
    }

    const result = await minimaxChat(
      `请分析以下剧本，生成结构化的场景和角色信息：\n\n${scriptText}`,
      SCRIPT_PARSE_SYSTEM,
      { apiKey }
    )

    // 解析JSON结果
    let parseResult
    try {
      // 尝试清理可能的markdown代码块
      const cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      parseResult = JSON.parse(cleaned)
    } catch (e) {
      console.error('Failed to parse LLM result:', result)
      return NextResponse.json({ 
        code: -1, 
        msg: '剧本解析失败，AI返回格式异常，请重试或调整剧本内容' 
      }, { status: 500 })
    }

    // 转换为Scene和Character
    const scenes: Scene[] = (parseResult.scenes || []).map((s: any) => ({
      sceneId: s.scene_id || s.sceneId || 1,
      title: s.title || '',
      description: s.description || '',
      location: s.location || '',
      timeOfDay: s.time_of_day || s.timeOfDay || '白天',
      weather: s.weather || '晴',
      mood: s.mood || '普通',
      characters: (s.characters || []).map((c: any, i: number): CharacterRef => ({
        id: uuid(),
        name: c.name || `角色${i + 1}`,
        role: c.role === '主角' ? 'main' : c.role === '配角' ? 'supporting' : 'extra',
        description: c.description || '',
        emotion: c.emotion || '',
        action: c.action || '',
      })),
      props: s.props || [],
      narrativeBeat: s.narrative_beat || s.narrativeBeat || '',
      materials: [],
    }))

    const characters: Character[] = (parseResult.characters || []).map((c: any) => ({
      id: uuid(),
      name: c.name || '',
      age: c.age,
      gender: c.gender === 'male' ? 'male' : c.gender === 'female' ? 'female' : undefined,
      identity: c.identity || '',
      appearance: c.appearance || '',
      clothing: c.clothing || '',
      personality: c.personality || '',
      materials: [],
      appearsInScenes: c.appears_in_scenes || c.appearsInScenes || [],
    }))

    // 保存结果
    await saveScenes(id, scenes)
    await saveCharacters(id, characters)

    // 更新项目状态
    const updatedProject = { 
      ...project, 
      synopsis: parseResult.story_summary || parseResult.storySummary || scriptText.slice(0, 200),
      status: 'script' as const,
      updatedAt: new Date().toISOString()
    }
    await saveProject(updatedProject)

    return NextResponse.json({
      code: 0,
      data: {
        scenes,
        characters,
        storySummary: parseResult.story_summary || parseResult.storySummary || '',
        totalDuration: parseResult.total_duration || parseResult.totalDuration || 90,
      }
    })
  } catch (err: any) {
    console.error('POST /api/projects/[id]/parse-script error:', err)
    return NextResponse.json({ 
      code: -1, 
      msg: err.message || '剧本拆解失败' 
    }, { status: 500 })
  }
}
