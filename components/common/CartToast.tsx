'use client'

import { useEffect, useState, useRef } from 'react'
import { ShoppingCart, Check, ArrowRight, X } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cartStore'

/**
 * Global cart toast — shows every time an item is added to cart.
 * Mounted once in layout. Listens to cart changes via zustand.
 */
export function CartToast() {
  const items = useCartStore((state) => state.items)
  const totalItems = useCartStore((state) => state.getTotalItems())

  const [visible, setVisible] = useState(false)
  const [lastItem, setLastItem] = useState<{ name: string; image: string } | null>(null)
  const prevCountRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const prevCount = prevCountRef.current
    const currentCount = totalItems

    // Only fire if total increased (item added)
    if (currentCount > prevCount && items.length > 0) {
      const newest = items[items.length - 1]
      setLastItem({ name: newest.name, image: newest.image })
      setVisible(true)

      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setVisible(false), 4000)
    }

    prevCountRef.current = currentCount
  }, [totalItems])

  if (!visible || !lastItem) return null

  return (
    <div
      className={`fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-4 z-[60] w-[calc(100%-2rem)] sm:w-80 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 p-4">
          {/* Check icon */}
          <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Check className="w-5 h-5 text-white" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 font-medium">Adicionado ao carrinho!</p>
            <p className="text-sm font-bold truncate">{lastItem.name}</p>
          </div>

          {/* Close */}
          <button
            onClick={() => setVisible(false)}
            className="text-gray-500 hover:text-white transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* CTA footer */}
        <div className="border-t border-white/10 px-4 py-2.5 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            <span className="font-bold text-white">{totalItems}</span> {totalItems === 1 ? 'item' : 'itens'} no carrinho
          </span>
          <Link
            href="/carrinho"
            onClick={() => setVisible(false)}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Ver carrinho
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
