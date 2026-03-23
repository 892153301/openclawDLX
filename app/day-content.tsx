'use client'

import { useState } from 'react'
import Link from 'next/link'

const days = [
  { 
    day: 1, 
    title: '初识 OpenClaw', 
    icon: '👋',
    emoji: '🐾',
    excerpt: 'AI 助手和聊天机器人的本质区别',
    keyPoints: ['AI助手 vs 聊天机器人', '赛博牛马的一天', '为什么现在是最好的开始时机']
  },
  { 
    day: 2, 
    title: '深度对话', 
    icon: '💬',
    emoji: '💬',
    excerpt: '掌握与AI沟通的艺术',
    keyPoints: ['Prompt编写技巧', '上下文管理', '多轮对话策略']
  },
  { 
    day: 3, 
    title: '文件与代码', 
    icon: '📁',
    emoji: '📁',
    excerpt: '让AI处理文件、写代码、执行脚本',
    keyPoints: ['文件操作', '代码编写', '脚本执行']
  },
  { 
    day: 4, 
    title: '网络能力', 
    icon: '🌐',
    emoji: '🌐',
    excerpt: '搜索、爬取、调用API',
    keyPoints: ['网络搜索', 'API调用', '数据处理']
  },
  { 
    day: 5, 
    title: '技能扩展', 
    icon: '🧩',
    emoji: '🧩',
    excerpt: '安装社区技能扩展AI能力',
    keyPoints: ['社区技能', '一键安装', '能力扩展']
  },
  { 
    day: 6, 
    title: '自动化', 
    icon: '⏰',
    emoji: '⏰',
    excerpt: '定时任务、心跳、主动推送',
    keyPoints: ['定时任务', '心跳机制', '主动提醒']
  },
  { 
    day: 7, 
    title: '高级技巧', 
    icon: '🚀',
    emoji: '🚀',
    excerpt: '多Agent、浏览器控制、设备集成',
    keyPoints: ['多Agent协作', '浏览器自动化', '设备集成']
  }
]

export default function DayContent() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  return (
    <div>
      {/* 7天学习路径 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">7天学习路径</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {days.map((item) => (
            <button
              key={item.day}
              onClick={() => setSelectedDay(selectedDay === item.day ? null : item.day)}
              className={`text-left p-6 rounded-xl border transition ${
                selectedDay === item.day 
                  ? 'bg-blue-50 border-blue-300 shadow-md' 
                  : 'bg-white hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <span className="text-sm text-gray-500">DAY {item.day}</span>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{item.excerpt}</p>
              {selectedDay === item.day && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium mb-2">核心要点：</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {item.keyPoints.map((point, i) => (
                      <li key={i}>• {point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* 快捷链接 */}
      <section className="bg-white rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">📚 学习资源</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="https://docs.openclaw.ai" target="_blank" className="p-4 border rounded-lg hover:bg-gray-50">
            <div className="text-2xl mb-2">📖</div>
            <h3 className="font-bold">官方文档</h3>
            <p className="text-sm text-gray-500">OpenClaw完整文档</p>
          </a>
          <a href="https://github.com/openclaw/openclaw" target="_blank" className="p-4 border rounded-lg hover:bg-gray-50">
            <div className="text-2xl mb-2">⭐</div>
            <h3 className="font-bold">GitHub</h3>
            <p className="text-sm text-gray-500">279k+ Stars</p>
          </a>
          <a href="https://clawhub.com" target="_blank" className="p-4 border rounded-lg hover:bg-gray-50">
            <div className="text-2xl mb-2">🧩</div>
            <h3 className="font-bold">ClawHub</h3>
            <p className="text-sm text-gray-500">5494+ 社区技能</p>
          </a>
          <a href="https://discord.com/invite/clawd" target="_blank" className="p-4 border rounded-lg hover:bg-gray-50">
            <div className="text-2xl mb-2">💬</div>
            <h3 className="font-bold">Discord</h3>
            <p className="text-sm text-gray-500">社区交流</p>
          </a>
        </div>
      </section>

      {/* 课程内容详情 */}
      {selectedDay && (
        <section className="mt-8 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">DAY {selectedDay}: {days[selectedDay - 1].title}</h2>
            <Link 
              href={`/zh/${selectedDay}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              查看完整内容 →
            </Link>
          </div>
          
          <div className="prose max-w-none">
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-lg text-gray-700">
                {selectedDay === 1 && '"我不是 Siri，不是 ChatGPT，不是任何你用过的 AI。我是赛博牛马——一只住在服务器里的牛马，而我能帮你做的事，可能会让你重新定义\'助手\'这个词。"'}
                {selectedDay === 2 && '与AI对话不仅仅是问答，而是一场协作。好的Prompt能让AI真正理解你的意图，超越简单的指令执行。'}
                {selectedDay === 3 && '文件是AI处理信息的重要载体。从文档分析到代码编写，AI可以成为你的高效助手。'}
                {selectedDay === 4 && 'AI的网络能力让它成为连接世界的桥梁。从实时搜索到API调用，信息触手可及。'}
                {selectedDay === 5 && '技能是AI能力的延伸。5494+社区技能让AI可以帮你做几乎任何事情。'}
                {selectedDay === 6 && '自动化是AI最强大的能力之一。定时任务和心跳让AI可以主动为你工作。'}
                {selectedDay === 7 && '高级技巧让你充分发挥AI的潜力。多Agent协作和浏览器控制打开新世界的大门。'}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
