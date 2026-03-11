// Image management API for Vercel deployment
import { NextResponse } from 'next/server'

// In-memory store for demo (would need database for production)
let images: Record<string, { name: string; path: string; uploadedAt: string }[]> = {
  days: [
    { name: 'day1-xiaomo.jpg', path: '/images/days/day1-xiaomo.jpg', uploadedAt: '2026-03-11' },
    { name: 'day2-hero.jpg', path: '/images/days/day2/day2-hero.jpg', uploadedAt: '2026-03-11' },
    { name: 'day3-hero.jpg', path: '/images/days/day3/day3-hero.jpg', uploadedAt: '2026-03-11' },
    { name: 'day4-hero.jpg', path: '/images/days/day4/day4-hero.jpg', uploadedAt: '2026-03-11' },
    { name: 'day5-hero.jpg', path: '/images/days/day5/day5-hero.jpg', uploadedAt: '2026-03-11' },
    { name: 'day6-hero.jpg', path: '/images/days/day6/day6-hero.jpg', uploadedAt: '2026-03-11' },
    { name: 'day7-hero.jpg', path: '/images/days/day7/day7-hero.jpg', uploadedAt: '2026-03-11' },
  ],
  wechat: [
    { name: 'wechat-qr.jpg', path: '/wechat-qr.jpg', uploadedAt: '2026-03-11' },
    { name: 'wechat-personal-qr.jpg', path: '/wechat-personal-qr.jpg', uploadedAt: '2026-03-11' },
  ],
  course: [
    { name: 'video-course-qr-code.jpg', path: '/video-course-qr-code.jpg', uploadedAt: '2026-03-11' },
    { name: 'video-course-qr.jpg', path: '/images/video-course-qr.jpg', uploadedAt: '2026-03-11' },
  ]
}

export async function GET() {
  return NextResponse.json({ success: true, data: images })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, category, imageName, imageData, imagePath } = body
    
    if (action === 'delete') {
      if (category && imageName) {
        images[category] = images[category].filter(img => img.name !== imageName)
        return NextResponse.json({ success: true, message: '图片已删除' })
      }
    }
    
    if (action === 'add') {
      if (category && imageName && imagePath) {
        if (!images[category]) {
          images[category] = []
        }
        images[category].push({
          name: imageName,
          path: imagePath,
          uploadedAt: new Date().toISOString().split('T')[0]
        })
        return NextResponse.json({ success: true, message: '图片已添加' })
      }
    }
    
    return NextResponse.json({ success: false, message: '无效操作' })
  } catch (error) {
    return NextResponse.json({ success: false, message: '操作失败' }, { status: 500 })
  }
}
