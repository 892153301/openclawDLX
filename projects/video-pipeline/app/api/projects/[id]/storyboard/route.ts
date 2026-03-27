import { NextRequest, NextResponse } from 'next/server'
import { saveStoryboard, getStoryboard } from '@/lib/storage'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const { storyboard } = await req.json()
    await saveStoryboard(id, storyboard)
    return NextResponse.json({ code: 0 })
  } catch (err) {
    console.error('POST /api/projects/[id]/storyboard error:', err)
    return NextResponse.json({ code: -1, msg: 'Failed to save storyboard' }, { status: 500 })
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const storyboard = await getStoryboard(params.id)
    return NextResponse.json({ code: 0, data: storyboard })
  } catch (err) {
    return NextResponse.json({ code: -1, msg: 'Failed to get storyboard' }, { status: 500 })
  }
}
