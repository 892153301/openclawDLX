import { NextResponse } from 'next/server'
import { defaultPages, defaultPagesZh } from '@/lib/defaults'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const lang = searchParams.get('lang')
  
  const pages = lang === 'zh' ? defaultPagesZh : defaultPages
  
  if (slug) {
    return NextResponse.json({ success: true, data: pages.find(p => p.slug === slug) || null })
  }
  return NextResponse.json({ success: true, data: pages })
}
