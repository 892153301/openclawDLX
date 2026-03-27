import { NextRequest, NextResponse } from 'next/server'
import { saveCharacters, getCharacters } from '@/lib/storage'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const { characters } = await req.json()
    await saveCharacters(id, characters)
    return NextResponse.json({ code: 0 })
  } catch (err) {
    console.error('POST /api/projects/[id]/characters error:', err)
    return NextResponse.json({ code: -1, msg: 'Failed to save characters' }, { status: 500 })
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const characters = await getCharacters(params.id)
    return NextResponse.json({ code: 0, data: characters })
  } catch (err) {
    return NextResponse.json({ code: -1, msg: 'Failed to get characters' }, { status: 500 })
  }
}
