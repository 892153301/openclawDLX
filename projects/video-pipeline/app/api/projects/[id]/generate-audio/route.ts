import { NextRequest, NextResponse } from 'next/server'
import { getProject, saveProject } from '@/lib/storage'
import path from 'path'
import fsSync from 'fs'

// 模拟TTS生成
async function generateTTS(text: string, voice: string, projectId: string): Promise<string> {
  // 实际项目中需要调用TTS API（如Azure, Google, 阿里云等）
  // 这里返回模拟路径
  const audioDir = path.join(process.cwd(), 'public/assets', projectId, 'audio')
  fsSync.mkdirSync(audioDir, { recursive: true })
  
  const filename = `narration-${Date.now()}.mp3`
  // 实际生成时需要写入真实的音频文件
  // 这里创建空文件作为占位符
  const filepath = path.join(audioDir, filename)
  // fsSync.writeFileSync(filepath, Buffer.alloc(1000)) // 空文件占位
  
  return `/assets/${projectId}/audio/${filename}`
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const { text, voice, speed = 1.0 } = await req.json()
    
    const project = await getProject(id)
    if (!project) {
      return NextResponse.json({ code: -1, msg: 'Project not found' }, { status: 404 })
    }

    // 生成配音
    const audioUrl = await generateTTS(text, voice, id)

    return NextResponse.json({ 
      code: 0, 
      data: { 
        audioUrl,
        duration: text.length * 0.3, // 估算时长
        voice,
        speed
      } 
    })
  } catch (err: any) {
    console.error('POST /api/projects/[id]/generate-audio error:', err)
    return NextResponse.json({ code: -1, msg: err.message }, { status: 500 })
  }
}

// 获取配音状态
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const project = await getProject(id)
    
    if (!project) {
      return NextResponse.json({ code: -1, msg: 'Project not found' }, { status: 404 })
    }

    // 返回配音配置（实际应该存储在项目配置中）
    return NextResponse.json({ 
      code: 0, 
      data: { 
        hasAudio: false,
        audioUrl: null,
        voice: 'male-deep',
        speed: 1.0
      } 
    })
  } catch (err: any) {
    console.error('GET /api/projects/[id]/generate-audio error:', err)
    return NextResponse.json({ code: -1, msg: err.message }, { status: 500 })
  }
}