import { create } from 'zustand'
import { Project, Scene, Character, Shot, Storyboard, Material, StepNumber } from '@/types'

interface PipelineState {
  // Current project
  project: Project | null
  scenes: Scene[]
  characters: Character[]
  storyboard: Storyboard | null
  materials: Material[]
  
  // UI state
  currentStep: StepNumber
  isLoading: boolean
  error: string | null
  
  // Actions
  setProject: (project: Project | null) => void
  setScenes: (scenes: Scene[]) => void
  setCharacters: (characters: Character[]) => void
  setStoryboard: (storyboard: Storyboard | null) => void
  setMaterials: (materials: Material[]) => void
  setCurrentStep: (step: StepNumber) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Project CRUD
  updateProject: (updates: Partial<Project>) => void
  updateScene: (sceneId: number, updates: Partial<Scene>) => void
  updateCharacter: (charId: string, updates: Partial<Character>) => void
  updateShot: (shotId: number, updates: Partial<Shot>) => void
  updateMaterial: (materialId: string, updates: Partial<Material>) => void
  
  // Reset
  reset: () => void
}

const initialState = {
  project: null,
  scenes: [],
  characters: [],
  storyboard: null,
  materials: [],
  currentStep: 1 as StepNumber,
  isLoading: false,
  error: null,
}

export const usePipelineStore = create<PipelineState>((set) => ({
  ...initialState,
  
  setProject: (project) => set({ project }),
  setScenes: (scenes) => set({ scenes }),
  setCharacters: (characters) => set({ characters }),
  setStoryboard: (storyboard) => set({ storyboard }),
  setMaterials: (materials) => set({ materials }),
  setCurrentStep: (currentStep) => set({ currentStep }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  updateProject: (updates) => set((state) => ({
    project: state.project ? { ...state.project, ...updates } : null
  })),
  
  updateScene: (sceneId, updates) => set((state) => ({
    scenes: state.scenes.map(s => 
      s.sceneId === sceneId ? { ...s, ...updates } : s
    )
  })),
  
  updateCharacter: (charId, updates) => set((state) => ({
    characters: state.characters.map(c => 
      c.id === charId ? { ...c, ...updates } : c
    )
  })),
  
  updateShot: (shotId, updates) => set((state) => ({
    storyboard: state.storyboard ? {
      ...state.storyboard,
      shots: state.storyboard.shots.map(s => 
        s.shotId === shotId ? { ...s, ...updates } : s
      )
    } : null
  })),
  
  updateMaterial: (materialId, updates) => set((state) => ({
    materials: state.materials.map(m => 
      m.id === materialId ? { ...m, ...updates } : m
    )
  })),
  
  reset: () => set(initialState),
}))
