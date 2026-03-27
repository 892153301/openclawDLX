import { NextRequest, NextResponse } from 'next/server'
import { queryJimengTask, queryKlingTask } from '@/lib/ai'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url)
    const taskId = params.id
    const type = searchParams.get('type') || 'jimeng' // jimeng or kling
    
    let result
    if (type === 'kling') {
      result = await queryKlingTask(taskId, {
        accessKey: process.env.KLING_ACCESS_KEY || '',
        secretKey: process.env.KLING_SECRET_KEY || '',
      })
    } else {
      result = await queryJimengTask(taskId)
    }
    
    return NextResponse.json({ code: 0, data: result })
  } catch (err: any) {
    console.error('GET /api/task/[id] error:', err)
    return NextResponse.json({ code: -1, msg: err.message }, { status: 500 })
  }
}
