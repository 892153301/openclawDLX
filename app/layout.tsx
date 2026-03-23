import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AIGC 影视工坊',
  description: 'AI视频制作学习平台 | 从剧本到成片的全流程指南',
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
      </body>
    </html>
  )
}
