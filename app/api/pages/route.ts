import { NextResponse } from 'next/server'
import { defaultPages, defaultPagesZh } from '@/lib/defaults'
import { fullCourseContent } from '@/lib/fullContent'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const lang = searchParams.get('lang')
  
  // Check if we have full content for this page
  if (lang === 'zh' && slug && slug in fullCourseContent) {
    const content = fullCourseContent[slug as keyof typeof fullCourseContent]
    return NextResponse.json({ 
      success: true, 
      data: {
        slug,
        lang,
        title: content.title,
        intro: content.intro,
        sections: JSON.stringify(content.sections),
        tasks: JSON.stringify(content.tasks),
        preview: JSON.stringify(content.preview),
        resources: '[]'
      }
    })
  }
  
  // Fallback to default content
  const pages = lang === 'zh' ? defaultPagesZh : defaultPages
  
  if (slug) {
    return NextResponse.json({ success: true, data: pages.find(p => p.slug === slug) || null })
  }
  return NextResponse.json({ success: true, data: pages })
}
