import { NextResponse } from 'next/server'
import Database from 'better-sqlite3'
import path from 'path'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const lang = searchParams.get('lang') || 'zh'
  
  const dbPath = path.join(process.cwd(), 'data', 'openclaw101.db')
  const db = new Database(dbPath)
  
  try {
    if (slug) {
      const page = db.prepare('SELECT * FROM pages WHERE slug = ? AND lang = ?').get(slug, lang)
      if (!page) {
        return NextResponse.json({ success: false, error: 'Page not found' })
      }
      return NextResponse.json({ success: true, data: page })
    } else {
      const pages = db.prepare('SELECT slug, lang, title, updated_at FROM pages WHERE lang = ? ORDER BY slug').all(lang)
      return NextResponse.json({ success: true, data: pages })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) })
  } finally {
    db.close()
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  const { slug, lang, title, intro, sections, tasks, preview, resources } = body
  
  const dbPath = path.join(process.cwd(), 'data', 'openclaw101.db')
  const db = new Database(dbPath)
  
  try {
    const stmt = db.prepare(`
      INSERT INTO pages (slug, lang, title, intro, sections, tasks, preview, resources)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(slug, lang) DO UPDATE SET
        title = excluded.title,
        intro = excluded.intro,
        sections = excluded.sections,
        tasks = excluded.tasks,
        preview = excluded.preview,
        resources = excluded.resources,
        updated_at = CURRENT_TIMESTAMP
    `)
    
    stmt.run(slug, lang, title, intro, JSON.stringify(sections), JSON.stringify(tasks), JSON.stringify(preview), JSON.stringify(resources))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) })
  } finally {
    db.close()
  }
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...fields } = body
  
  const dbPath = path.join(process.cwd(), 'data', 'openclaw101.db')
  const db = new Database(dbPath)
  
  try {
    const keys = Object.keys(fields)
    const updates = keys.map(k => k + ' = ?').join(', ')
    const values = [...Object.values(fields), id]
    
    db.prepare('UPDATE pages SET ' + updates + ', updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(...values)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) })
  } finally {
    db.close()
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json({ success: false, error: 'ID required' })
  }
  
  const dbPath = path.join(process.cwd(), 'data', 'openclaw101.db')
  const db = new Database(dbPath)
  
  try {
    db.prepare('DELETE FROM pages WHERE id = ?').run(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) })
  } finally {
    db.close()
  }
}
