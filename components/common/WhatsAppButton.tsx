'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Show after 3 seconds
    const timer = setTimeout(() => setVisible(true), 3000)
    // Show tooltip after 5 seconds
    const tooltipTimer = setTimeout(() => {
      if (!dismissed) setShowTooltip(true)
    }, 5000)
    // Auto-hide tooltip after 8 seconds
    const hideTooltip = setTimeout(() => setShowTooltip(false), 8000)

    return () => {
      clearTimeout(timer)
      clearTimeout(tooltipTimer)
      clearTimeout(hideTooltip)
    }
  }, [dismissed])

  if (!visible) return null

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    'Olá! Vim do site e gostaria de mais informações.'
  )}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip bubble */}
      {showTooltip && !dismissed && (
        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 max-w-[200px] animate-slide-up">
          <button
            onClick={() => { setShowTooltip(false); setDismissed(true) }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 text-white rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-sm font-semibold text-gray-800">Precisa de ajuda?</p>
          <p className="text-xs text-gray-500 mt-1">Fale conosco pelo WhatsApp agora!</p>
          {/* Arrow */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45" />
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-16 h-16 bg-[#25D366] hover:bg-[#20bd5a] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Falar pelo WhatsApp"
        onClick={() => setShowTooltip(false)}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <MessageCircle className="w-8 h-8 text-white relative z-10" />
      </a>
    </div>
  )
}
