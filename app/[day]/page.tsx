'use client'

import Link from 'next/link'

const courseContent: Record<string, {
  title: string
  icon: string
  desc: string
  content: string[]
  resources: { title: string; url: string }[]
}> = {
  '1': {
    title: 'Getting Started',
    icon: '👋',
    desc: 'Learn what OpenClaw is and what it can do for you.',
    content: [
      'What is an AI Personal Assistant? Difference from chatbots',
      'OpenClaw Core Concepts: Gateway, Node, Skills, Memory',
      'OpenClaw vs Other AI Agents: Unique Advantages',
      'Why Self-Hosted? Data Privacy & Security',
      'What Can OpenClaw Do? Real Use Cases',
      'Pre-installation: Environment Requirements',
      'First Configuration: The onboard Process',
    ],
    resources: [
      { title: 'Official Documentation', url: 'https://docs.openclaw.ai' },
      { title: 'GitHub Repository', url: 'https://github.com/openclaw/openclaw' },
      { title: '7-Day Guide - Feishu Wiki', url: 'https://my.feishu.cn/wiki/YkWgwqSchi9xW3kEuZscAm0lnFf' },
    ]
  },
  '2': {
    title: 'Deep Conversation',
    icon: '💬',
    desc: 'Master the art of prompting your AI assistant.',
    content: [
      'Prompt Engineering Basics: Writing Effective Prompts',
      'Context Management: Memory & History',
      'System Prompts: SOUL.md & AGENTS.md',
      'Multi-turn Conversation: Making AI Remember',
      'Error Handling & Retry Strategies',
      'Voice Conversation: TTS & STT Integration',
      'Practice: Create a Personalized AI Assistant',
    ],
    resources: [
      { title: 'Memory System', url: 'https://docs.openclaw.ai/docs/concepts/memory' },
      { title: 'Prompt Engineering', url: 'https://docs.openclaw.ai/docs/prompts' },
    ]
  },
  '3': {
    title: 'Files & Code',
    icon: '📁',
    desc: 'Let AI handle files, write code, and execute scripts.',
    content: [
      'File System Access: Read, Write, Edit Files',
      'Code Execution: Safe Sandbox & Script Running',
      'Git Operations: Repository Management',
      'Terminal/Shell Command Execution',
      'File Processing: Batch Rename, Text Processing',
      'Code Generation: AI Writes Code for You',
      'Practice: Let AI Organize Your Project',
    ],
    resources: [
      { title: 'File Operations', url: 'https://github.com/openclaw/skills' },
      { title: 'Terminal Skill', url: 'https://github.com/openclaw/skills/tree/main/skills/terminal' },
    ]
  },
  '4': {
    title: 'Web Capabilities',
    icon: '🌐',
    desc: 'Search, scrape, and call APIs. Connect AI to the internet.',
    content: [
      'Web Search: Giving AI Search Ability',
      'Web Scraping: Extracting Information',
      'API Calls: Connecting External Services',
      'Webhooks: Receiving External Events',
      'Browser Automation: Playwright Integration',
      'Practice: Create a News Summary Assistant',
    ],
    resources: [
      { title: 'Web Search Skill', url: 'https://github.com/openclaw/skills/tree/main/skills/web-search' },
      { title: 'Browser Control', url: 'https://docs.openclaw.ai/docs/tools/browser' },
    ]
  },
  '5': {
    title: 'Skills',
    icon: '🧩',
    desc: 'Install community skills to extend AI capabilities.',
    content: [
      'What are Skills? How Skills Work',
      'Exploring ClawHub: Skill Marketplace',
      'Installing & Managing Skills',
      'Creating Custom Skills: Writing SKILL.md',
      'Sharing & Publishing Skills',
      'Popular Skills Recommendations',
      'Practice: Install and Configure a Useful Skill',
    ],
    resources: [
      { title: 'ClawHub Marketplace', url: 'https://clawhub.com' },
      { title: 'Awesome OpenClaw Skills', url: 'https://github.com/VoltAgent/awesome-openclaw-skills' },
      { title: 'Skill Development Docs', url: 'https://docs.openclaw.ai/tools/clawhub' },
    ]
  },
  '6': {
    title: 'Automation',
    icon: '⏰',
    desc: 'Scheduled tasks, heartbeats, and proactive推送.',
    content: [
      'Heartbeat: Understanding the Mechanism',
      'Scheduled Tasks: Crons & Scheduling',
      'Proactive Push:主动发送 Messages',
      'Designing Automated Workflows',
      'Monitoring & Alert Setup',
      'Practice: Create a Daily Briefing Assistant',
    ],
    resources: [
      { title: 'Heartbeat Configuration', url: 'https://docs.openclaw.ai/docs/concepts/heartbeat' },
      { title: 'Cron Jobs', url: 'https://docs.openclaw.ai/docs/concepts/crons' },
    ]
  },
  '7': {
    title: 'Advanced',
    icon: '🚀',
    desc: 'Multi-agent, browser control, and device integration.',
    content: [
      'Multi-Agent Collaboration: Agent Communication',
      'Deep Browser Control: Web Automation',
      'Device Integration: IoT & Smart Home',
      'Custom Model Configuration',
      'Security Hardening & Best Practices',
      'Deploying to Production',
      'Practice: Build Your Ultimate AI Assistant',
    ],
    resources: [
      { title: 'Multi-Agent Setup', url: 'https://docs.openclaw.ai/docs/concepts/agents' },
      { title: 'Security Hardening', url: 'https://docs.openclaw.ai/docs/ops/security' },
      { title: 'Deployment Docs', url: 'https://docs.openclaw.ai/docs/deployment' },
    ]
  },
}

export default function CoursePage({ params }: { params: { day: string } }) {
  const day = courseContent[params.day]

  if (!day) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Course not found</div>
      </div>
    )
  }

  const dayNum = parseInt(params.day)

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <nav className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">🐾 OpenClaw 101</Link>
          <Link href="/" className="text-primary-600 hover:underline">← Back to Home</Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">DAY {dayNum}</span>
            <span className="text-4xl">{day.icon}</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">{day.title}</h1>
          <p className="text-xl text-gray-600">{day.desc}</p>
        </div>

        <div className="space-y-8">
          <div className="bg-white border rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">📚 Learning Content</h2>
            <ul className="space-y-4">
              {day.content.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                  <span className="text-gray-700 pt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">🔗 Related Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {day.resources.map((res, i) => (
                <a key={i} href={res.url} target="_blank" className="flex items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition">
                  <span className="text-primary-600">↗</span>
                  <span className="text-gray-700">{res.title}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">💡 Practice Tips</h2>
            <p className="text-gray-700">
              Each chapter comes with hands-on exercises. We recommend completing them in order. 
              Get help from <a href="https://github.com/openclaw/openclaw/discussions" target="_blank" className="text-primary-600 hover:underline mx-1">GitHub Discussions</a> 
              or <a href="https://discord.gg/openclaw" target="_blank" className="text-primary-600 hover:underline mx-1">Discord</a> if you encounter problems.
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-between">
          {dayNum > 1 ? (
            <Link href={`/${dayNum - 1}`} className="flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-50">
              ← {courseContent[String(dayNum - 1)]?.title}
            </Link>
          ) : <div />}
          
          {dayNum < 7 ? (
            <Link href={`/${dayNum + 1}`} className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              {courseContent[String(dayNum + 1)]?.title} →
            </Link>
          ) : (
            <Link href="/resources" className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
              View Resources →
            </Link>
          )}
        </div>
      </main>

      <footer className="py-8 border-t mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500">
          <p>OpenClaw 101 - Open Source Guide</p>
        </div>
      </footer>
    </div>
  )
}
