import Link from 'next/link'

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            社区
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            加入 OpenClaw 大龙虾社区，与志同道合的开发者一起成长
          </p>
        </div>
      </section>

      {/* WeChat Groups */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            交流群
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* WeChat Group */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 text-center">
              <div className="w-48 h-48 mx-auto mb-4 bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
                <img src="/wechat-qr.jpg" alt="微信群" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">微信群</h3>
              <p className="text-green-700 mb-4">扫码加入官方微信群</p>
            </div>

            {/* Douyin Group */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 text-center">
              <div className="w-48 h-48 mx-auto mb-4 bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
                <img src="/douyin-qr.jpg" alt="抖音群" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-purple-800 mb-2">抖音交流群</h3>
              <p className="text-purple-700 mb-4">扫码加入抖音粉丝群</p>
            </div>
          </div>
        </div>
      </section>

      {/* Discord */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Discord 社区
          </h2>
          
          <a 
            href="https://discord.com/invite/clawd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            <span className="text-2xl">💬</span>
            加入 Discord 社区
          </a>
          
          <p className="text-gray-500 mt-4">
            与全球开发者交流，参与讨论
          </p>
        </div>
      </section>

      {/* GitHub */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            GitHub
          </h2>
          
          <a 
            href="https://github.com/openclaw/openclaw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
          >
            <span className="text-2xl">⭐</span>
            Star us on GitHub
          </a>
          
          <p className="text-gray-500 mt-4">
            欢迎提交 Issue 和 PR，一起完善 OpenClaw
          </p>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
          >
            ← 返回首页
          </Link>
        </div>
      </section>
    </div>
  )
}
