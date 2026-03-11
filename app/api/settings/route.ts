import { NextResponse } from 'next/server'
import Database from 'better-sqlite3'
import path from 'path'

export async function GET() {
  const dbPath = path.join(process.cwd(), 'data', 'openclaw101.db')
  const db = new Database(dbPath)
  
  try {
    const settings = db.prepare('SELECT key, value FROM site_settings').all()
    const result: Record<string, string> = {}
    for (const s of settings as any[]) {
      result[s.key] = s.value
    }
    return NextResponse.json({ 
      success: true, 
      data: {
        site_name: result.site_name || 'OpenClaw 101',
        site_tagline: result.site_tagline || '从零开始的 AI 助手搭建指南',
        primary_color: result.primary_color || '#6366f1',
        accent_color: result.accent_color || '#8b5cf6'
      }
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) })
  } finally {
    db.close()
  }
}
