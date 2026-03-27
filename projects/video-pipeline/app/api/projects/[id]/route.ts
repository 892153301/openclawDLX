import { NextRequest, NextResponse } from 'next/server'
import { getProject, saveProject, deleteProject, getScenes, saveScenes, getCharacters, saveCharacters, getStoryboard, saveStoryboard, getMaterials, saveMaterials } from '@/lib/storage'

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
    const scenes = await getScenes(id)
    const characters = await getCharacters(id)
    const storyboard = await getStoryboard(id)
    const materials = await getMaterials(id)
    
    return NextResponse.json({
      code: 0,
      data: { project, scenes, characters, storyboard, materials }
    })
  } catch (err) {
    console.error('GET /api/projects/[id] error:', err)
    return NextResponse.json({ code: -1, msg: 'Failed to get project' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const updates = await req.json()
    const project = await getProject(id)
    if (!project) {
      return NextResponse.json({ code: -1, msg: 'Project not found' }, { status: 404 })
    }
    const updated = { ...project, ...updates, updatedAt: new Date().toISOString() }
    await saveProject(updated)
    return NextResponse.json({ code: 0, data: updated })
  } catch (err) {
    console.error('PUT /api/projects/[id] error:', err)
    return NextResponse.json({ code: -1, msg: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteProject(params.id)
    return NextResponse.json({ code: 0 })
  } catch (err) {
    console.error('DELETE /api/projects/[id] error:', err)
    return NextResponse.json({ code: -1, msg: 'Failed to delete project' }, { status: 500 })
  }
}
