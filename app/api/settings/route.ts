import { NextResponse } from 'next/server'
import { defaultSettings } from '@/lib/defaults'

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    data: defaultSettings
  })
}
