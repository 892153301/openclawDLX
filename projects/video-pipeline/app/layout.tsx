import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'aigcmd 漫剧工坊 | aigcmd',
  description: 'AI视频创作平台 - 从剧本到视频的自动化流水线',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="min-h-screen bg-bg-primary">
        {children}
      </body>
    </html>
  )
}
