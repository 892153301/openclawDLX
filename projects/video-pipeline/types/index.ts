// ==================== Core Types ====================

export type ProjectStatus = 
  | 'setup' 
  | 'script' 
  | 'asset' 
  | 'storyboard' 
  | 'video' 
  | 'audio' 
  | 'preview'

export type StepNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface Project {
  id: string
  title: string
  type: string
  era: string
  style: string
  synopsis: string
  status: ProjectStatus
  createdAt: string
  updatedAt: string
}

// ==================== Scene & Character ====================

export interface Character {
  id: string
  name: string
  age?: number
  gender?: 'male' | 'female'
  identity: string
  appearance: string
  clothing: string
  personality?: string
  materials: Material[]
  appearsInScenes: number[]
}

export interface Scene {
  sceneId: number
  title: string
  description: string
  location: string
  timeOfDay: string
  weather?: string
  mood: string
  characters: CharacterRef[]
  props: string[]
  narrativeBeat: string
  materials: Material[]
}

export interface CharacterRef {
  id: string
  name: string
  role: 'main' | 'supporting' | 'extra'
  description: string
  emotion?: string
  action?: string
}

// ==================== Material ====================

export type MaterialType = 'character' | 'scene' | 'prop'
export type MaterialStatus = 'pending' | 'generating' | 'done' | 'failed'

export interface Material {
  id: string
  type: MaterialType
  name: string
  url: string
  thumbnailUrl: string
  prompt: string
  status: MaterialStatus
  metadata: Record<string, any>
  generatedAt?: string
}

// ==================== Shot ====================

export type ShotType = 
  | 'establishing' 
  | 'wide' 
  | 'medium' 
  | 'closeup' 
  | 'extreme-closeup' 
  | 'pov' 
  | 'insert'

export type TransitionType = 'cut' | 'dissolve' | 'fade' | 'whip-pan'
export type VideoStatus = 'pending' | 'generating' | 'done' | 'failed'

export interface Shot {
  shotId: number
  sceneId: number
  shotType: ShotType
  description: string
  camera: {
    shot: string
    angle: string
    movement: string
    lens: string
    duration: number
    focusPoint?: string
  }
  lighting: {
    type: string
    direction: string
    mood: string
  }
  sound: {
    dialogue: string | null
    sfx: string | null
    ambience: string | null
    musicCue: string | null
  }
  characterRefs: string[]
  sceneRef?: string
  propsInShot: string[]
  mood: string
  narrativeFunction: string
  transition: TransitionType
  aiPrompt: string
  videoStatus: VideoStatus
  videoUrl: string | null
  firstFrameUrl: string | null
  lastFrameUrl: string | null
  thumbnailUrl: string | null
}

// ==================== Storyboard ====================

export interface Storyboard {
  projectId: string
  totalDuration: number
  aspectRatio: string
  shots: Shot[]
  characterRefs: Record<string, {
    name: string
    threeViewUrl?: string
    emotionRefs: Record<string, string>
  }>
  sceneRefs: Record<string, {
    name: string
    timeVariants: Record<string, string>
  }>
}

// ==================== API ====================

export interface ApiResponse<T = any> {
  code: number
  data?: T
  msg?: string
}

export interface TaskResult {
  taskId: string
  status: 'pending' | 'processing' | 'success' | 'failed'
  progress?: number
  result?: any
  error?: string
}

// ==================== Parse Result ====================

export interface ParseScriptResult {
  storySummary: string
  totalDuration: number
  scenes: Scene[]
  characters: Character[]
  props: Array<{
    name: string
    description: string
    importance: 'important' | 'normal'
    appearsInScenes: number[]
  }>
}
