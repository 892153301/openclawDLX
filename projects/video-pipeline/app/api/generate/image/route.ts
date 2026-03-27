import { NextRequest, NextResponse } from 'next/server'
import { submitJimengTask, queryJimengTask } from '@/lib/ai'

export async function POST(req: NextRequest) {
  try {
    const { prompt, projectId, type, name, width = 1024, height = 1024 } = await req.json()
    
    if (!prompt) {
      return NextResponse.json({ code: -1, msg: 'Prompt is required' }, { status: 400 })
    }

    const taskId = await submitJimengTask(prompt, width, height)
    
    return NextResponse.json({ 
      code: 0, 
      data: { taskId, status: 'pending' } 
    })
  } catch (err: any) {
    console.error('POST /api/generate/image error:', err)
    return NextResponse.json({ code: -1, msg: err.message }, { status: 500 })
  }
}
