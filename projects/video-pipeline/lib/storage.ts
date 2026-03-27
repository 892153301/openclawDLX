import { promises as fs } from 'fs'
import path from 'path'
import { Project, Scene, Character, Shot, Storyboard, Material } from '@/types'

const DATA_DIR = path.join(process.cwd(), 'data', 'projects')
const ASSETS_DIR = path.join(process.cwd(), 'assets')

// Ensure directory exists
async function ensureDir(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch {}
}

// ==================== Project ====================

export async function listProjects(): Promise<Project[]> {
  await ensureDir(DATA_DIR)
  const entries = await fs.readdir(DATA_DIR, { withFileTypes: true })
  const dirs = entries.filter(e => e.isDirectory())
  
  const projects: Project[] = []
  for (const dir of dirs) {
    try {
      const projectPath = path.join(DATA_DIR, dir.name, 'project.json')
      const content = await fs.readFile(projectPath, 'utf-8')
      projects.push(JSON.parse(content))
    } catch {
      // skip invalid project dirs
    }
  }
  
  return projects.sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )
}

export async function getProject(id: string): Promise<Project | null> {
  try {
    const content = await fs.readFile(
      path.join(DATA_DIR, id, 'project.json'), 
      'utf-8'
    )
    return JSON.parse(content)
  } catch {
    return null
  }
}

export async function saveProject(project: Project): Promise<void> {
  const dir = path.join(DATA_DIR, project.id)
  await ensureDir(dir)
  await fs.writeFile(
    path.join(dir, 'project.json'),
    JSON.stringify(project, null, 2),
    'utf-8'
  )
}

export async function deleteProject(id: string): Promise<void> {
  try {
    await fs.rm(path.join(DATA_DIR, id), { recursive: true })
    await fs.rm(path.join(ASSETS_DIR, id), { recursive: true })
  } catch {}
}

// ==================== Scenes ====================

export async function getScenes(projectId: string): Promise<Scene[]> {
  try {
    const content = await fs.readFile(
      path.join(DATA_DIR, projectId, 'scenes.json'),
      'utf-8'
    )
    return JSON.parse(content)
  } catch {
    return []
  }
}

export async function saveScenes(projectId: string, scenes: Scene[]): Promise<void> {
  const dir = path.join(DATA_DIR, projectId)
  await ensureDir(dir)
  await fs.writeFile(
    path.join(dir, 'scenes.json'),
    JSON.stringify(scenes, null, 2),
    'utf-8'
  )
}

// ==================== Characters ====================

export async function getCharacters(projectId: string): Promise<Character[]> {
  try {
    const content = await fs.readFile(
      path.join(DATA_DIR, projectId, 'characters.json'),
      'utf-8'
    )
    return JSON.parse(content)
  } catch {
    return []
  }
}

export async function saveCharacters(projectId: string, characters: Character[]): Promise<void> {
  const dir = path.join(DATA_DIR, projectId)
  await ensureDir(dir)
  await fs.writeFile(
    path.join(dir, 'characters.json'),
    JSON.stringify(characters, null, 2),
    'utf-8'
  )
}

// ==================== Storyboard ====================

export async function getStoryboard(projectId: string): Promise<Storyboard | null> {
  try {
    const content = await fs.readFile(
      path.join(DATA_DIR, projectId, 'storyboard.json'),
      'utf-8'
    )
    return JSON.parse(content)
  } catch {
    return null
  }
}

export async function saveStoryboard(projectId: string, storyboard: Storyboard): Promise<void> {
  const dir = path.join(DATA_DIR, projectId)
  await ensureDir(dir)
  await fs.writeFile(
    path.join(dir, 'storyboard.json'),
    JSON.stringify(storyboard, null, 2),
    'utf-8'
  )
}

// ==================== Materials ====================

export async function getMaterials(projectId: string): Promise<Material[]> {
  try {
    const content = await fs.readFile(
      path.join(DATA_DIR, projectId, 'materials.json'),
      'utf-8'
    )
    return JSON.parse(content)
  } catch {
    return []
  }
}

export async function saveMaterials(projectId: string, materials: Material[]): Promise<void> {
  const dir = path.join(DATA_DIR, projectId)
  await ensureDir(dir)
  await fs.writeFile(
    path.join(dir, 'materials.json'),
    JSON.stringify(materials, null, 2),
    'utf-8'
  )
}

export async function saveMaterialFile(
  projectId: string, 
  type: 'characters' | 'scenes' | 'videos',
  filename: string,
  buffer: Buffer
): Promise<string> {
  const dir = path.join(ASSETS_DIR, projectId, type)
  await ensureDir(dir)
  const filepath = path.join(dir, filename)
  await fs.writeFile(filepath, buffer)
  return filepath
}

export function getMaterialPath(projectId: string, type: string, filename: string): string {
  return path.join(ASSETS_DIR, projectId, type, filename)
}

// ==================== Utils ====================

export function getProjectDir(projectId: string): string {
  return path.join(DATA_DIR, projectId)
}

export function getAssetsDir(projectId: string): string {
  return path.join(ASSETS_DIR, projectId)
}
