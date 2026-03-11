import { NextResponse } from 'next/server'
import { defaultResources } from '@/lib/defaults'

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    data: defaultResources,
    total: defaultResources.length
  })
}
