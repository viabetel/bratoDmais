'use client'

import { Truck, CheckCircle, Package } from 'lucide-react'
import { siteConfig, formatCurrency } from '@/lib/config'

interface ShippingProgressBarProps {
  cartTotal: number
}

export function ShippingProgressBar({ cartTotal }: ShippingProgressBarProps) {
  const threshold = siteConfig.shipping.freeShippingMinimum
  const remaining = Math.max(0, threshold - cartTotal)
  const progress = Math.min(100, (cartTotal / threshold) * 100)
  const isFree = cartTotal >= threshold

  if (isFree) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-3">
        <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-green-700">Parabéns! Você ganhou frete grátis! 🎉</p>
          <p className="text-xs text-green-600">Sua compra já qualifica para entrega gratuita</p>
        </div>
        <Truck className="w-6 h-6 text-green-500 ml-auto flex-shrink-0" />
      </div>
    )
  }

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-semibold text-blue-700">
            Falta <span className="text-blue-900 font-black">{formatCurrency(remaining)}</span> para frete grátis!
          </span>
        </div>
        <Truck className="w-4 h-4 text-blue-400" />
      </div>

      {/* Progress bar */}
      <div className="relative h-2.5 bg-blue-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
        {/* Animated shine */}
        <div
          className="absolute inset-0 h-full rounded-full opacity-30 animate-pulse"
          style={{
            background: `linear-gradient(90deg, transparent ${progress - 10}%, white ${progress}%, transparent ${progress + 5}%)`,
          }}
        />
      </div>

      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] text-blue-400">R$ 0</span>
        <span className="text-[10px] text-blue-500 font-semibold">
          {Math.round(progress)}% — Frete grátis acima de {formatCurrency(threshold)}
        </span>
      </div>
    </div>
  )
}
