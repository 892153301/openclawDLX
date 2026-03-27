import { NextRequest, NextResponse } from 'next/server'
import { getProject, getScenes, getCharacters, saveCharacters, saveScenes, saveMaterials, getMaterials } from '@/lib/storage'
import { submitJimengTask, queryJimengTask } from '@/lib/ai'
import { v4 as uuid } from 'uuid'
import { Material } from '@/types'
import { promises as fs } from 'fs'
import fsSync from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'

const ASSETS_DIR = path.join(process.cwd(), 'assets')

async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const file = fsSync.createWriteStream(filepath)
    protocol.get(url, (response) => {
      response.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', (err) => {
      fsSync.unlink(filepath, () => {})
      reject(err)
    })
  })
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const { type, targetId, prompt } = await req.json()
    
    const project = await getProject(id)
    if (!project) {
      return NextResponse.json({ code: -1, msg: 'Project not found' }, { status: 404 })
    }

    const characters = await getCharacters(id)
    const scenes = await getScenes(id)
    const materials = await getMaterials(id)

    if (type === 'character') {
      const char = characters.find(c => c.id === targetId)
      if (!char) {
        return NextResponse.json({ code: -1, msg: 'Character not found' }, { status: 404 })
      }

      const genPrompt = prompt || `${char.name}, ${char.identity}, ${char.appearance}, ${char.clothing}, ${project.era}, ${project.type}, film quality, cinematic, 8k`
      const taskId = await submitJimengTask(genPrompt, 1024, 1024)
      
      const material: Material = {
        id: uuid(),
        type: 'character',
        name: char.name,
        url: '',
        thumbnailUrl: '',
        prompt: genPrompt,
        status: 'generating',
        metadata: { characterId: char.id, taskId },
      }
      
      const updatedMaterials = [...materials, material]
      await saveMaterials(id, updatedMaterials)
      
      return NextResponse.json({ code: 0, data: { taskId, materialId: material.id } })
    }
    
    if (type === 'scene') {
      const scene = scenes.find(s => s.sceneId === Number(targetId))
      if (!scene) {
        return NextResponse.json({ code: -1, msg: 'Scene not found' }, { status: 404 })
      }

      const genPrompt = prompt || `${scene.description}, ${scene.location}, ${scene.timeOfDay}, ${scene.weather}, ${project.era}, film quality, cinematic, 8k`
      const taskId = await submitJimengTask(genPrompt, 1024, 1024)
      
      const material: Material = {
        id: uuid(),
        type: 'scene',
        name: scene.title,
        url: '',
        thumbnailUrl: '',
        prompt: genPrompt,
        status: 'generating',
        metadata: { sceneId: scene.sceneId, taskId },
      }
      
      const updatedMaterials = [...materials, material]
      await saveMaterials(id, updatedMaterials)
      
      return NextResponse.json({ code: 0, data: { taskId, materialId: material.id } })
    }

    return NextResponse.json({ code: -1, msg: 'Invalid type' }, { status: 400 })
  } catch (err: any) {
    console.error('POST error:', err)
    return NextResponse.json({ code: -1, msg: err.message }, { status: 500 })
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const { searchParams } = new URL(req.url)
    const taskId = searchParams.get('taskId')
    const materialId = searchParams.get('materialId')

    if (!taskId || !materialId) {
      return NextResponse.json({ code: -1, msg: 'Missing params' }, { status: 400 })
    }

    const materials = await getMaterials(id)
    const material = materials.find(m => m.id === materialId)
    if (!material) {
      return NextResponse.json({ code: -1, msg: 'Material not found' }, { status: 404 })
    }

    const result = await queryJimengTask(taskId)
    
    if (result.status === 'success' && result.imageUrl) {
      const typeDir = path.join(ASSETS_DIR, id, material.type === 'character' ? 'characters' : 'scenes')
      await fs.mkdir(typeDir, { recursive: true })
      const ext = result.imageUrl.split('?')[0].endsWith('.png') ? 'png' : 'jpg'
      const filename = `${materialId}.${ext}`
      const filepath = path.join(typeDir, filename)
      
      try {
        await downloadImage(result.imageUrl, filepath)
        const updatedMaterial: Material = {
          ...material,
          status: 'done',
          url: filepath,
          thumbnailUrl: filepath,
          generatedAt: new Date().toISOString(),
        }
        const updatedMaterials = materials.map(m => m.id === materialId ? updatedMaterial : m)
        await saveMaterials(id, updatedMaterials)
        return NextResponse.json({ code: 0, data: { status: 'done', imageUrl: filepath } })
      } catch {
        return NextResponse.json({ code: 0, data: { status: 'processing' } })
      }
    } else if (result.status === 'failed') {
      const updatedMaterials = materials.map(m => m.id === materialId ? { ...m, status: 'failed' as const } : m)
      await saveMaterials(id, updatedMaterials)
      return NextResponse.json({ code: 0, data: { status: 'failed', error: result.error } })
    }
    
    return NextResponse.json({ code: 0, data: { status: 'processing' } })
  } catch (err: any) {
    console.error('GET error:', err)
    return NextResponse.json({ code: -1, msg: err.message }, { status: 500 })
  }
}
