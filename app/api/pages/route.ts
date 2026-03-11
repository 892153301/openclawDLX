import { NextResponse } from 'next/server'
import { defaultPages, defaultPagesZh } from '@/lib/defaults'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const lang = searchParams.get('lang')
  
  // For Chinese day pages, read from markdown files
  if (lang === 'zh' && slug && slug.startsWith('day-')) {
    const dayNum = slug.replace('day-', '')
    const filePath = path.join(process.cwd(), 'content', 'days', `day${dayNum}.md`)
    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContent)
      
      return NextResponse.json({ 
        success: true, 
        data: {
          slug,
          lang,
          title: data.title || `Day ${dayNum}`,
          intro: '',
          content: content, // Raw markdown content
          sections: '[]',
          tasks: '[]',
          preview: '[]',
          resources: '[]'
        }
      })
    }
  }
  
  // Fallback to default content
  const pages = lang === 'zh' ? defaultPagesZh : defaultPages
  
  if (slug) {
    return NextResponse.json({ success: true, data: pages.find(p => p.slug === slug) || null })
  }
  return NextResponse.json({ success: true, data: pages })
}
