'use client'

import Link from 'next/link'

const skillCategories = [
  { icon: '🌐', name: 'Web & Frontend', count: 46, en: 'Web & Frontend', zh: '网页 & 前端' },
  { icon: '🤖', name: 'Coding Agents', count: 55, en: 'Coding Agents', zh: '编程 Agent' },
  { icon: '☁️', name: 'DevOps & Cloud', count: 144, en: 'DevOps & Cloud', zh: 'DevOps & 云' },
  { icon: '🔍', name: 'Search & Research', count: 148, en: 'Search & Research', zh: '搜索 & 研究' },
  { icon: '📈', name: 'Marketing & Sales', count: 94, en: 'Marketing & Sales', zh: '营销 & 销售' },
  { icon: '🧠', name: 'AI & LLMs', count: 159, en: 'AI & LLMs', zh: 'AI & 大模型' },
  { icon: '🏠', name: 'Smart Home & IoT', count: 50, en: 'Smart Home & IoT', zh: '智能家居' },
  { icon: '🗣️', name: 'Speech & Audio', count: 44, en: 'Speech & Audio', zh: '语音 & 音频' },
  { icon: '💬', name: 'Communication', count: 58, en: 'Communication', zh: '通讯集成' },
  { icon: '🏋️', name: 'Health & Fitness', count: 35, en: 'Health & Fitness', zh: '健康 & 健身' },
  { icon: '📝', name: 'Notes & PKM', count: 61, en: 'Notes & PKM', zh: '笔记 & 知识' },
  { icon: '🎮', name: 'Gaming', count: 7, en: 'Gaming', zh: '游戏' },
  { icon: '📊', name: 'Data & Analytics', count: 28, en: 'Data & Analytics', zh: '数据分析' },
  { icon: '🎨', name: 'Design & Creative', count: 32, en: 'Design & Creative', zh: '设计 & 创意' },
  { icon: '📚', name: 'Education & Learning', count: 23, en: 'Education & Learning', zh: '教育 & 学习' },
  { icon: '💰', name: 'Finance & Crypto', count: 41, en: 'Finance & Crypto', zh: '金融 & 加密' },
  { icon: '✈️', name: 'Travel & Transport', count: 18, en: 'Travel & Transport', zh: '旅游 & 出行' },
  { icon: '🍔', name: 'Food & Drink', count: 12, en: 'Food & Drink', zh: '餐饮 & 美食' },
  { icon: '👥', name: 'Social & Community', count: 29, en: 'Social & Community', zh: '社交 & 社区' },
  { icon: '📱', name: 'Mobile & Apps', count: 16, en: 'Mobile & Apps', zh: '移动 & 应用' },
  { icon: '🔐', name: 'Security & Privacy', count: 38, en: 'Security & Privacy', zh: '安全 & 隐私' },
  { icon: '📹', name: 'Video & Media', count: 45, en: 'Video & Media', zh: '视频 & 媒体' },
  { icon: '🎵', name: 'Music & Audio', count: 21, en: 'Music & Audio', zh: '音乐 & 音频' },
  { icon: '🛒', name: 'E-commerce', count: 19, en: 'E-commerce', zh: '电商' },
  { icon: '📅', name: 'Productivity', count: 67, en: 'Productivity', zh: '效率' },
  { icon: '🤝', name: 'Business & SaaS', count: 33, en: 'Business & SaaS', zh: '商业 & SaaS' },
  { icon: '🌍', name: 'News & Info', count: 22, en: 'News & Info', zh: '新闻 & 资讯' },
  { icon: '🎯', name: 'Sports & Fitness', count: 14, en: 'Sports & Fitness', zh: '运动 & 健身' },
  { icon: '🌿', name: 'Nature & Environment', count: 8, en: 'Nature & Environment', zh: '自然 & 环保' },
  { icon: '🐶', name: 'Pets & Animals', count: 11, en: 'Pets & Animals', zh: '宠物 & 动物' },
  { icon: '💼', name: 'Career & Jobs', count: 16, en: 'Career & Jobs', zh: '职业 & 工作' },
]

const featuredSkills = [
  { name: 'frontend-design', desc: 'High-quality UI development with React, Next.js, Tailwind', category: 'Web & Frontend' },
  { name: 'nextjs-expert', desc: 'Next.js application development expert', category: 'Web & Frontend' },
  { name: 'ui-audit', desc: 'Automated UI auditing and optimization', category: 'Web & Frontend' },
  { name: 'coding-agent', desc: 'Claude/Codex powered coding assistant', category: 'Coding Agents' },
  { name: 'claude-team', desc: 'Multi-agent collaboration with Claude', category: 'Coding Agents' },
  { name: 'skill-creator', desc: 'Create and manage custom skills', category: 'Coding Agents' },
  { name: 'cloudflare', desc: 'Cloudflare Workers/KV/D1 integration', category: 'DevOps & Cloud' },
  { name: 'docker-essentials', desc: 'Docker container management', category: 'DevOps & Cloud' },
  { name: 'kubernetes', desc: 'Kubernetes K8s cluster management', category: 'DevOps & Cloud' },
  { name: 'exa-plus', desc: 'Neural network search powered by Exa', category: 'Search & Research' },
  { name: 'kimi-integration', desc: 'Kimi AI integration', category: 'AI & LLMs' },
  { name: 'chatgpt-apps', desc: 'ChatGPT applications and plugins', category: 'AI & LLMs' },
  { name: 'homeassistant', desc: 'Home automation with Home Assistant', category: 'Smart Home & IoT' },
  { name: 'seo-audit', desc: 'Comprehensive SEO analysis', category: 'Marketing & Sales' },
  { name: 'social-content', desc: 'Social media content creation', category: 'Marketing & Sales' },
]

export default function SkillsPage() {
  const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.count, 0)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl">🐾 OpenClaw 101</Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <Link href="/zh" className="hover:text-primary-600">中文</Link>
              <a href="https://github.com/mengjian-github/openclaw101" target="_blank" className="hover:text-primary-600">⭐ GitHub</a>
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
                <div className="text-3xl font-bold text-primary-600">31</div>
                <div className="text-sm text-gray-500">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">159</div>
                <div className="text-sm text-gray-500">AI & LLM</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">148</div>
                <div className="text-sm text-gray-500">Research</div>
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
                <div key={i} className="p-4 border rounded-lg hover:shadow-md transition">
                  <code className="text-primary-600 font-mono">{skill.name}</code>
                  <p className="text-sm text-gray-600 mt-2">{skill.desc}</p>
                  <span className="text-xs text-gray-400 mt-2 inline-block">{skill.category}</span>
                </div>
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
                <div key={i} className="p-4 bg-white border rounded-lg hover:shadow-md transition text-center">
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <div className="font-semibold text-sm">{cat.name}</div>
                  <div className="text-primary-600 font-bold">{cat.count}</div>
                </div>
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
              <a href="https://clawhub.com" target="_blank" className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Browse All Skills →
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>OpenClaw 101 - Open Source Guide</p>
        </div>
      </footer>
    </div>
  )
}
