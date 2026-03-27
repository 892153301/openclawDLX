import { NextRequest, NextResponse } from 'next/server'
import { listProjects, saveProject, getProject } from '@/lib/storage'
import { Project } from '@/types'

export async function GET() {
  try {
    const projects = await listProjects()
    return NextResponse.json({ code: 0, data: projects })
  } catch (err) {
    console.error('GET /api/projects error:', err)
    return NextResponse.json({ code: -1, msg: 'Failed to list projects' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const project: Project = await req.json()
    if (!project.id || !project.title) {
      return NextResponse.json({ code: -1, msg: 'Invalid project data' }, { status: 400 })
    }
    await saveProject(project)
    return NextResponse.json({ code: 0, data: project })
  } catch (err) {
    console.error('POST /api/projects error:', err)
    return NextResponse.json({ code: -1, msg: 'Failed to create project' }, { status: 500 })
  }
}
