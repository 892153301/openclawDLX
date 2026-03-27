'use client'

import { StepNumber } from '@/types'

const STEPS = [
  { step: 1 as StepNumber, label: '全局设定', icon: '⚙️' },
  { step: 2 as StepNumber, label: '故事剧本', icon: '📜' },
  { step: 3 as StepNumber, label: '场景角色', icon: '🎭' },
  { step: 4 as StepNumber, label: '分镜脚本', icon: '🎬' },
  { step: 5 as StepNumber, label: '分镜视频', icon: '🎥' },
  { step: 6 as StepNumber, label: '配音对口型', icon: '🎙️' },
  { step: 7 as StepNumber, label: '视频预览', icon: '✅' },
]

interface StepIndicatorProps {
  currentStep: StepNumber
  completedSteps: StepNumber[]
  onStepClick: (step: StepNumber) => void
}

export function StepIndicator({ currentStep, completedSteps, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-bg-card rounded-xl">
      {STEPS.map(({ step, label, icon }, index) => {
        const isCompleted = completedSteps.includes(step)
        const isActive = step === currentStep
        const isClickable = step <= currentStep || isCompleted
        
        return (
          <div key={step} className="flex items-center">
            <button
              onClick={() => isClickable && onStepClick(step)}
              disabled={!isClickable}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                transition-all duration-200 min-w-[100px]
                ${isActive 
                  ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40 shadow-lg shadow-accent-cyan/10' 
                  : isCompleted
                    ? 'text-accent-green bg-accent-green/10 hover:bg-accent-green/20'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-border cursor-pointer'
                }
              `}
            >
              <span>{isCompleted ? '✓' : index + 1}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
            {index < STEPS.length - 1 && (
              <div className={`w-4 h-px mx-1 ${isCompleted ? 'bg-accent-green' : 'bg-bg-border'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export { STEPS }
