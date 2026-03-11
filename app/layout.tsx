import type { Metadata } from 'next'
import './globals.css'
import ConsultationBubble from '@/components/ConsultationBubble'

export const metadata: Metadata = {
  title: 'OpenClaw大龙虾 - 7天掌握你的AI私人助理',
  description: '从零开始，7天掌握你的 AI 私人助理 | The open-source guide to building your AI assistant with OpenClaw',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="min-h-screen bg-white">
        {children}
        <ConsultationBubble />
      </body>
    </html>
  )
}
