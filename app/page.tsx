'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl">🐾 OpenClaw 101</Link>
            <div className="flex items-center space-x-6">
              <Link href="#what-is" className="hover:text-primary-600">Learn</Link>
              <Link href="#skills" className="hover:text-primary-600">Skills</Link>
              <Link href="#resources" className="hover:text-primary-600">Resources</Link>
              <Link href="/community" className="hover:text-primary-600">Community</Link>
              <Link href="/zh" className="hover:text-primary-600">🇨🇳 ZH</Link>
              <a href="https://github.com/openclaw/openclaw" target="_blank" className="hover:text-primary-600">⭐ GitHub</a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-gray-500 mb-4">Open Source · 379+ Tutorials Curated</p>
            <h1 className="text-5xl font-bold mb-4">Master OpenClaw in 7 Days</h1>
            <p className="text-xl text-gray-600 mb-4">Your AI assistant that actually does things</p>
            <p className="text-lg text-gray-500 mb-8">From setup to advanced automation — start your journey here</p>
            
            <div className="flex justify-center gap-4 mb-12">
              <Link href="#getting-started" className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                🚀 Start Learning →
              </Link>
              <Link href="#resources" className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                📚 Browse Resources
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-primary-600">379+</div>
                <div className="text-sm text-gray-500">Tutorials</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">7 Days</div>
                <div className="text-sm text-gray-500">Learning Path</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">279k+</div>
                <div className="text-sm text-gray-500">GitHub Stars</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">100%</div>
                <div className="text-sm text-gray-500">Open Source</div>
              </div>
            </div>
          </div>
        </section>

        {/* What is OpenClaw */}
        <section id="what-is" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">What is OpenClaw?</h2>
            <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              OpenClaw is an open-source AI assistant platform that gives you a 24/7 personal AI.
              It understands you, helps you, and executes tasks on your behalf.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold mb-2">Multi-Platform</h3>
                <p className="text-gray-600">Seamlessly connect via Telegram, Discord, WhatsApp, Signal, and more. Chat with your AI anywhere.</p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Extensible Skills</h3>
                <p className="text-gray-600">5494+ community skills, from weather queries to code generation. One-click install.</p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">Self-Hosted</h3>
                <p className="text-gray-600">Full data sovereignty. Your data stays on your server. Privacy and security in your hands.</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <a href="https://github.com/openclaw/openclaw" target="_blank" className="inline-flex items-center text-primary-600 hover:underline">
                <span className="text-2xl mr-2">⭐</span>
                279k+ Stars on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* 7 Day Learning Path */}
        <section id="getting-started" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">7-Day Learning Path</h2>
            <p className="text-center text-gray-600 mb-12">From beginner to advanced, one topic per day. Progressively master all OpenClaw capabilities.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { day: 'DAY 1', icon: '👋', title: 'Getting Started', desc: 'Learn what OpenClaw is and what it can do for you.' },
                { day: 'DAY 2', icon: '💬', title: 'Deep Conversation', desc: 'Master the art of prompting your AI assistant.' },
                { day: 'DAY 3', icon: '📁', title: 'Files & Code', desc: 'Let AI handle files, write code, and execute scripts.' },
                { day: 'DAY 4', icon: '🌐', title: 'Web Capabilities', desc: 'Search, scrape, and call APIs. Connect AI to the internet.' },
                { day: 'DAY 5', icon: '🧩', title: 'Skills', desc: 'Install community skills to extend AI capabilities.' },
                { day: 'DAY 6', icon: '⏰', title: 'Automation', desc: 'Scheduled tasks, heartbeats, and proactive推送.' },
                { day: 'DAY 7', icon: '🚀', title: 'Advanced', desc: 'Multi-agent, browser control, and device integration.' },
              ].map((item, i) => (
                <Link key={i} href={`/zh/${i+1}`} className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
                  <div className="text-sm text-gray-500 mb-1">{item.day}</div>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="text-3xl font-bold mb-4">5494+ Community Skills</h2>
              <p className="text-gray-600">Curated skills from awesome-openclaw-skills across 31 categories.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: '🌐', name: 'Web & Frontend', count: 46 },
                { icon: '🤖', name: 'Coding Agents', count: 55 },
                { icon: '☁️', name: 'DevOps & Cloud', count: 144 },
                { icon: '🔍', name: 'Search & Research', count: 148 },
                { icon: '📈', name: 'Marketing & Sales', count: 94 },
                { icon: '🧠', name: 'AI & LLMs', count: 159 },
                { icon: '🏠', name: 'Smart Home', count: 50 },
                { icon: '🗣️', name: 'Speech & Audio', count: 44 },
              ].map((cat, i) => (
                <div key={i} className="p-4 border rounded-lg text-center">
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <div className="font-semibold">{cat.name}</div>
                  <div className="text-sm text-gray-500">{cat.count}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/skills" className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                View All Skills →
              </Link>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">📚 Curated Resources</h2>
            <p className="text-center text-gray-600 mb-8">Best Tutorials & Guides - From Alibaba Cloud to DigitalOcean</p>

            {/* Security Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-center">
                <span className="mr-2">⚠️</span>
                <span><strong>Security Notice:</strong> Malicious skills found on ClawHub. Review source before installing. </span>
                <a href="https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html" target="_blank" className="text-primary-600 hover:underline ml-1">Details ↗</a>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">379+</div>
                <div className="text-sm text-gray-500">Tutorials</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">48</div>
                <div className="text-sm text-gray-500">Chinese</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">331</div>
                <div className="text-sm text-gray-500">English</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">9</div>
                <div className="text-sm text-gray-500">Categories</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              <a href="https://docs.openclaw.ai" target="_blank" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md">
                <div className="text-sm text-blue-600 mb-1">📖 Official</div>
                <h3 className="font-semibold">OpenClaw Official Docs</h3>
                <p className="text-sm text-gray-500">Complete API reference, configuration guide</p>
              </a>
              <a href="https://github.com/openclaw/openclaw" target="_blank" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md">
                <div className="text-sm text-blue-600 mb-1">📖 Official</div>
                <h3 className="font-semibold">GitHub — openclaw/openclaw</h3>
                <p className="text-sm text-gray-500">Source code, issues (279k+ ⭐)</p>
              </a>
              <a href="https://www.freecodecamp.org/news/openclaw-full-tutorial-for-beginners/" target="_blank" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md">
                <div className="text-sm text-green-600 mb-1">🏁 Getting Started</div>
                <h3 className="font-semibold">freeCodeCamp Tutorial</h3>
                <p className="text-sm text-gray-500">Complete beginner guide</p>
              </a>
              <a href="https://www.bilibili.com/video/BV1kH6nBFEPq/" target="_blank" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md">
                <div className="text-sm text-green-600 mb-1">📹 Videos</div>
                <h3 className="font-semibold">Bilibili Tutorial</h3>
                <p className="text-sm text-gray-500">Chinese video tutorials</p>
              </a>
            </div>

            <div className="text-center mt-8">
              <Link href="/resources" className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                View All Resources →
              </Link>
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
