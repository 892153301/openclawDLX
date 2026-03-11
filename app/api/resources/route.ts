import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'openclaw101.db');

export async function GET() {
  try {
    const db = new Database(dbPath);
    
    const resources = db.prepare(`
      SELECT id, title, description, url, category, lang, source, created_at
      FROM resources
      ORDER BY id DESC
    `).all();
    
    db.close();
    
    return NextResponse.json({
      success: true,
      data: resources,
      total: resources.length
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch resources'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, url, category, lang, source } = body;
    
    if (!title || !url) {
      return NextResponse.json({
        success: false,
        error: 'Title and URL are required'
      }, { status: 400 });
    }
    
    const db = new Database(dbPath);
    
    const result = db.prepare(`
      INSERT INTO resources (title, description, url, category, lang, source)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(title, description || '', url, category || '其他', lang || 'EN', source || '');
    
    db.close();
    
    return NextResponse.json({
      success: true,
      data: { id: result.lastInsertRowid }
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create resource'
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ID is required'
      }, { status: 400 });
    }
    
    const db = new Database(dbPath);
    
    db.prepare('DELETE FROM resources WHERE id = ?').run(id);
    
    db.close();
    
    return NextResponse.json({
      success: true,
      message: 'Resource deleted'
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete resource'
    }, { status: 500 });
  }
}
