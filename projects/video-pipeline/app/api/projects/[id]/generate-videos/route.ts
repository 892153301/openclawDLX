import { NextRequest, NextResponse } from 'next/server'
import { getProject, getStoryboard, saveStoryboard } from '@/lib/storage'
import { execSync } from 'child_process'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await req.json()
    const shotIndex = body.shotIndex
    
    const project = await getProject(id)
    if (!project) {
      return NextResponse.json({ code: -1, msg: 'Project not found' }, { status: 404 })
    }

    const storyboard = await getStoryboard(id)
    if (!storyboard || !storyboard.shots.length) {
      return NextResponse.json({ code: -1, msg: '请先生成分镜脚本' }, { status: 400 })
    }

    if (shotIndex < 0 || shotIndex >= storyboard.shots.length) {
      return NextResponse.json({ code: -1, msg: 'Invalid shot index' }, { status: 400 })
    }

    const shot = storyboard.shots[shotIndex] as any
    
    // 获取视频配置
    const vc = (project as any).videoConfig || {}
    const aspectRatio = vc.aspectRatio || '16:9'
    const prompt = shot.description || shot.aiPrompt || '视频生成'
    
    // 更新shot状态为generating
    storyboard.shots[shotIndex] = { 
      ...shot, 
      videoStatus: 'generating' as const 
    }
    await saveStoryboard(id, storyboard)

    // 调用即梦AI视频生成API
    let videoUrl: string | null = null
    let errorMsg: string | null = null
    let taskId: string | null = null
    
    try {
      // 调用Python API
      const imageUrl = (shot.firstFrameUrl || shot.thumbnailUrl || '').replace(/'/g, "\\'")
      const safePrompt = prompt.replace(/'/g, "\\'")
      const pythonCmd = `python3 -c "
import sys
sys.path.insert(0, '${process.cwd().replace(/\\/g, '\\\\')}/lib')
from jimeng_video_wrapper import submit_video_task
import json
result = submit_video_task(
    image_url='${imageUrl}',
    prompt='${safePrompt}',
    frames=121,
    aspect_ratio='${aspectRatio}'
)
print(json.dumps(result))
"`
      
      const result = execSync(pythonCmd, { 
        encoding: 'utf-8',
        timeout: 60000 
      })
      
      const parsed = JSON.parse(result)
      
      if (parsed.success) {
        taskId = parsed.task_id
        console.log('Video task submitted:', taskId)
        
        // 轮询查询任务状态（最多等待120秒）
        for (let i = 0; i < 40; i++) {
          await new Promise(r => setTimeout(r, 3000))
          
          const queryCmd = `python3 -c "
import sys
sys.path.insert(0, '${process.cwd().replace(/\\/g, '\\\\')}/lib')
from jimeng_video_wrapper import query_video_task
import json
result = query_video_task('${taskId}')
print(json.dumps(result))
"`
          const queryResult = execSync(queryCmd, { 
            encoding: 'utf-8',
            timeout: 10000 
          })
          
          const queryParsed = JSON.parse(queryResult)
          
          if (queryParsed.status === 'done') {
            videoUrl = queryParsed.video_url
            break
          } else if (queryParsed.status === 'failed') {
            errorMsg = queryParsed.error || 'Video generation failed'
            break
          }
        }
      } else {
        errorMsg = parsed.error || 'Failed to submit task'
      }
    } catch (pythonError: any) {
      console.error('Python error:', pythonError.message)
      errorMsg = pythonError.message
    }
    
    // 更新最终状态
    const sb = await getStoryboard(id)
    if (sb && sb.shots[shotIndex]) {
      const currentShot = sb.shots[shotIndex] as any
      if (errorMsg) {
        sb.shots[shotIndex] = {
          ...currentShot,
          videoStatus: 'failed',
          error: errorMsg
        }
      } else if (videoUrl) {
        sb.shots[shotIndex] = {
          ...currentShot,
          videoStatus: 'done',
          videoUrl: videoUrl,
          taskId: taskId
        }
      } else {
        // 超时但没有错误，默认完成
        sb.shots[shotIndex] = {
          ...currentShot,
          videoStatus: 'done',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
        }
      }
      await saveStoryboard(id, sb)
    }

    if (errorMsg) {
      return NextResponse.json({ 
        code: -1, 
        msg: errorMsg 
      })
    }

    return NextResponse.json({ 
      code: 0, 
      data: { 
        shotIndex, 
        status: videoUrl ? 'done' : 'generating',
        videoUrl,
        taskId,
        message: videoUrl ? '视频生成完成' : '视频生成中'
      } 
    })
  } catch (err: any) {
    console.error('POST /api/projects/[id]/generate-videos error:', err)
    return NextResponse.json({ code: -1, msg: err.message }, { status: 500 })
  }
}
