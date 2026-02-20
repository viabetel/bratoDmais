'use client'

import { useState, useEffect, useRef } from 'react'
import { ShoppingCart, Zap, Check } from 'lucide-react'
import { formatBRL } from '@/lib/utils/format'

interface StickyBuyBarProps {
  productName: string
  price: number
  pixPrice: number
  stock: number
  onAddToCart: () => void
  onBuyNow: () => void
}

export function StickyBuyBar({ productName, price, pixPrice, stock, onAddToCart, onBuyNow }: StickyBuyBarProps) {
  const [visible, setVisible] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 400px
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCart = () => {
    onAddToCart()
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (!visible || stock === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-2xl px-4 py-3 animate-slide-up">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 truncate">{productName}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black text-gray-900">{formatBRL(price)}</span>
            <span className="text-xs text-green-600 font-bold">{formatBRL(pixPrice)} Pix</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCart}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-sm transition-all ${
              added ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            {added ? 'OK!' : 'Carrinho'}
          </button>
          <button
            onClick={onBuyNow}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm transition-all"
          >
            <Zap className="w-4 h-4" />
            Comprar
          </button>
        </div>
      </div>
    </div>
  )
}
