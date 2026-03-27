import { NextRequest, NextResponse } from 'next/server'
import { saveScenes, getScenes } from '@/lib/storage'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const { scenes } = await req.json()
    await saveScenes(id, scenes)
    return NextResponse.json({ code: 0 })
  } catch (err) {
    console.error('POST /api/projects/[id]/scenes error:', err)
    return NextResponse.json({ code: -1, msg: 'Failed to save scenes' }, { status: 500 })
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const scenes = await getScenes(params.id)
    return NextResponse.json({ code: 0, data: scenes })
  } catch (err) {
    return NextResponse.json({ code: -1, msg: 'Failed to get scenes' }, { status: 500 })
  }
}
