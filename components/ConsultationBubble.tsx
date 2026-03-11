'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function ConsultationBubble() {
  const [isVisible, setIsVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-bounce"
        >
          <span className="text-xl">💬</span>
          <span className="font-medium">付费咨询</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
            {/* Close Button */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl z-10"
            >
              ×
            </button>

            <div className="flex">
              {/* Left Side - Options */}
              <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">付费咨询</h2>
                
                <div className="space-y-3">
                  {/* 1 Hour */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-gray-800">1小时·问题解答</h3>
                        <p className="text-xs text-gray-500">基础咨询</p>
                      </div>
                      <div className="text-xl font-bold text-orange-500">¥199</div>
                    </div>
                  </div>

                  {/* 3 Hours */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-orange-300">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-gray-800">3小时·远程指导确保跑通</h3>
                        <p className="text-xs text-gray-500">深度咨询</p>
                      </div>
                      <div className="text-xl font-bold text-orange-500">¥459</div>
                    </div>
                  </div>

                  {/* Enterprise */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-gray-800">企业定制</h3>
                        <p className="text-xs text-gray-500">联系详谈</p>
                      </div>
                      <div className="text-xl font-bold text-gray-800">不变</div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 p-3 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    添加我备注：OpenClaw
                  </p>
                </div>
              </div>

              {/* Right Side - QR Code */}
              <div className="w-48 bg-white p-4 flex flex-col items-center justify-center border-l">
                <div className="w-40 h-40 rounded-lg overflow-hidden">
                  <img src="/wechat-consult.jpg" alt="微信二维码" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
