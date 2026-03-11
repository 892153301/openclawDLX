'use client'

import Link from 'next/link'

const skillCategories = [
  { icon: '🤖', name: 'Coding Agents & IDEs', count: 1222, slug: 'coding-agents-ides', en: 'Coding Agents & IDEs', zh: '编程 Agent' },
  { icon: '🌐', name: 'Web & Frontend', count: 938, slug: 'web-frontend-development', en: 'Web & Frontend Development', zh: '网页 & 前端' },
  { icon: '🔍', name: 'Search & Research', count: 350, slug: 'search-research', en: 'Search & Research', zh: '搜索 & 研究' },
  { icon: '☁️', name: 'DevOps & Cloud', count: 409, slug: 'devops-cloud', en: 'DevOps & Cloud', zh: 'DevOps & 云' },
  { icon: '🖥️', name: 'Browser & Automation', count: 335, slug: 'browser-automation', en: 'Browser & Automation', zh: '浏览器 & 自动化' },
  { icon: '📹', name: 'Image & Video', count: 169, slug: 'image-video-generation', en: 'Image & Video Generation', zh: '图像 & 视频' },
  { icon: '💬', name: 'Communication', count: 149, slug: 'communication', en: 'Communication', zh: '通讯集成' },
  { icon: '📅', name: 'Calendar & Scheduling', count: 65, slug: 'calendar-scheduling', en: 'Calendar & Scheduling', zh: '日历 & 日程' },
  { icon: '📝', name: 'PDF & Documents', count: 111, slug: 'pdf-documents', en: 'PDF & Documents', zh: 'PDF & 文档' },
  { icon: '🛒', name: 'Shopping & E-commerce', count: 55, slug: 'shopping-e-commerce', en: 'Shopping & E-commerce', zh: '电商' },
  { icon: '✈️', name: 'Transportation', count: 109, slug: 'transportation', en: 'Transportation', zh: '出行' },
  { icon: '🧠', name: 'AI & LLMs', count: 197, slug: 'ai-llms', en: 'AI & LLMs', zh: 'AI & 大模型' },
  { icon: '📈', name: 'Productivity', count: 206, slug: 'productivity-tasks', en: 'Productivity & Tasks', zh: '效率' },
  { icon: '📚', name: 'Notes & PKM', count: 71, slug: 'notes-pkm', en: 'Notes & PKM', zh: '笔记 & 知识' },
  { icon: '💰', name: 'Finance', count: 21, slug: 'finance', en: 'Finance', zh: '金融' },
  { icon: '🏠', name: 'Smart Home', count: 43, slug: 'smart-home-iot', en: 'Smart Home & IoT', zh: '智能家居' },
  { icon: '🎮', name: 'Gaming', count: 36, slug: 'gaming', en: 'Gaming', zh: '游戏' },
  { icon: '🏋️', name: 'Health & Fitness', count: 88, slug: 'health-fitness', en: 'Health & Fitness', zh: '健康 & 健身' },
  { icon: '🔐', name: 'Security', count: 54, slug: 'security-passwords', en: 'Security & Passwords', zh: '安全' },
  { icon: '🐙', name: 'Git & GitHub', count: 170, slug: 'git-github', en: 'Git & GitHub', zh: 'Git & GitHub' },
  { icon: '🎵', name: 'Media & Streaming', count: 85, slug: 'media-streaming', en: 'Media & Streaming', zh: '媒体 & 直播' },
  { icon: '🖥️', name: 'CLI Utilities', count: 186, slug: 'cli-utilities', en: 'CLI Utilities', zh: '命令行工具' },
]

const featuredSkills = [
  { name: 'academic-research', desc: 'Search academic papers using OpenAlex API', category: 'Search & Research' },
  { name: 'homeassistant', desc: 'Home automation with Home Assistant', category: 'Smart Home' },
  { name: 'seo-audit', desc: 'Comprehensive SEO analysis', category: 'Marketing & Sales' },
  { name: 'social-content', desc: 'Social media content creation', category: 'Marketing & Sales' },
  { name: 'excalidraw', desc: 'Create hand-drawn style diagrams', category: 'Design & Creative' },
  { name: 'weather', desc: 'Get weather forecasts and conditions', category: 'Productivity' },
  { name: 'gmail', desc: 'Read, search and summarize emails', category: 'Communication' },
  { name: 'google-calendar', desc: 'Manage Google Calendar events', category: 'Calendar & Scheduling' },
  { name: 'youtube-transcript', desc: 'Get YouTube video transcripts', category: 'Media & Streaming' },
  { name: 'pdf-parser', desc: 'Extract text from PDF documents', category: 'PDF & Documents' },
  { name: 'image-ocr', desc: 'Extract text from images using OCR', category: 'Image & Video' },
  { name: 'rss-reader', desc: 'Read and summarize RSS feeds', category: 'Productivity' },
]

export default function SkillsPage() {
  const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.count, 0)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl">🐾 OpenClaw大龙虾</Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <Link href="/zh" className="hover:text-primary-600">中文</Link>
              <Link href="/community" className="hover:text-primary-600">Community</Link>
              <a href="https://github.com/openclaw/openclaw" target="_blank" className="hover:text-primary-600">⭐ GitHub</a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h1 className="text-4xl font-bold mb-4">5494+ Community Skills</h1>
            <p className="text-xl text-gray-600 mb-8">
              Curated skills from awesome-openclaw-skills across 31 categories.
              Install with one command to extend your AI assistant.
            </p>
            
            <div className="p-4 bg-gray-900 rounded-lg inline-block mb-8">
              <code className="text-green-400">npx clawhub@latest install &lt;skill-name&gt;</code>
            </div>

            <div className="grid grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-primary-600">{totalSkills}+</div>
                <div className="text-sm text-gray-500">Total Skills</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">22</div>
                <div className="text-sm text-gray-500">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">197</div>
                <div className="text-sm text-gray-500">AI & LLM</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">1222</div>
                <div className="text-sm text-gray-500">Coding Agents</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Skills */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8">Featured Skills</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {featuredSkills.map((skill, i) => (
                <a 
                  key={i} 
                  href={`https://clawhub.ai/skill/${skill.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border rounded-lg hover:shadow-md transition block"
                >
                  <code className="text-primary-600 font-mono">{skill.name}</code>
                  <p className="text-sm text-gray-600 mt-2">{skill.desc}</p>
                  <span className="text-xs text-gray-400 mt-2 inline-block">{skill.category}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* All Categories */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8">All Categories</h2>
            <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-4">
              {skillCategories.map((cat, i) => (
                <a 
                  key={i} 
                  href={`https://clawhub.ai/skill/${cat.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white border rounded-lg hover:shadow-md transition text-center block"
                >
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <div className="font-semibold text-sm">{cat.name}</div>
                  <div className="text-primary-600 font-bold">{cat.count}</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CLI Usage */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Install Any Skill</h2>
            <p className="text-gray-600 mb-6">
              Use ClawHub CLI to quickly install skills from the community
            </p>
            <div className="bg-gray-900 p-6 rounded-lg">
              <code className="text-green-400 text-lg">npx clawhub@latest install seo-audit</code>
            </div>
            <div className="mt-6">
              <a href="https://clawhub.ai" target="_blank" className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Browse All Skills →
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>OpenClaw大龙虾 - Open Source Guide</p>
        </div>
      </footer>
    </div>
  )
}
