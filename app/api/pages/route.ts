import { NextResponse } from 'next/server'
import { defaultPages } from '@/lib/defaults'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  
  if (slug) {
    return NextResponse.json({ success: true, data: defaultPages.find(p => p.slug === slug) || null })
  }
  return NextResponse.json({ success: true, data: defaultPages })
}
