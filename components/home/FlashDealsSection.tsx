'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Zap, ArrowRight, ShoppingCart, Check } from 'lucide-react'
import { products } from '@/data/products'
import { useCartStore } from '@/lib/store/cartStore'
import { formatCurrency, calcPixPrice } from '@/lib/config'
import { resolveProductImage } from '@/lib/utils/images'

function useCountdown(targetHour: number) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 })

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const target = new Date()
      target.setHours(targetHour, 0, 0, 0)
      if (target <= now) target.setDate(target.getDate() + 1)
      const diff = target.getTime() - now.getTime()
      setTimeLeft({
        h: Math.floor(diff / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1_000),
      })
    }
    update()
    const id = setInterval(update, 1_000)
    return () => clearInterval(id)
  }, [targetHour])

  return timeLeft
}

const PAD = (n: number) => String(n).padStart(2, '0')

// Pick high-discount products as flash deals
const flashDeals = products
  .filter((p) => p.originalPrice > 0)
  .sort((a, b) => {
    const dA = ((a.originalPrice - a.price) / a.originalPrice) * 100
    const dB = ((b.originalPrice - b.price) / b.originalPrice) * 100
    return dB - dA
  })
  .slice(0, 5)

export function FlashDealsSection() {
  const time = useCountdown(23) // ends at 23:00
  const addItem = useCartStore((s) => s.addItem)
  const [added, setAdded] = useState<Set<string>>(new Set())

  const handleAdd = (product: (typeof flashDeals)[0], e: React.MouseEvent) => {
    e.preventDefault()
    const img = resolveProductImage(product.images, product.categorySlug, 'sm')
    addItem({ productId: product.id, name: product.name, price: product.price, quantity: 1, image: img })
    setAdded((prev) => new Set([...prev, product.id]))
    setTimeout(() => setAdded((prev) => { const next = new Set(prev); next.delete(product.id); return next }), 2500)
  }

  return (
    <section className="py-10 bg-gradient-to-br from-red-600 via-red-500 to-orange-500">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Ofertas Relâmpago</h2>
              <p className="text-red-100 text-sm">Preços por tempo limitado</p>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-white/80 text-sm font-medium mr-1">Termina em:</span>
            {[time.h, time.m, time.s].map((val, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="bg-black/30 text-white font-black text-xl min-w-[42px] text-center py-1.5 px-2 rounded-lg tabular-nums">
                  {PAD(val)}
                </span>
                {i < 2 && <span className="text-white/60 font-black text-xl">:</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Products horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {flashDeals.map((product) => {
            const pix = calcPixPrice(product.price)
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            const img = resolveProductImage(product.images, product.categorySlug, 'md')
            const isAdded = added.has(product.id)
            const stock = product.stock
            const stockPct = Math.min(90, Math.max(10, 100 - (stock / 20) * 100))

            return (
              <Link
                key={product.id}
                href={`/p/${product.slug}`}
                className="flex-shrink-0 w-48 bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative aspect-square bg-gray-50">
                  <img
                    src={img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-full">
                    -{discount}%
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-[11px] font-bold text-blue-600 uppercase mb-1">{product.brand}</p>
                  <p className="text-xs text-gray-700 font-medium line-clamp-2 leading-tight mb-2 h-8">
                    {product.name}
                  </p>

                  <p className="text-[10px] text-gray-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </p>
                  <p className="text-base font-black text-gray-900">{formatCurrency(product.price)}</p>
                  <p className="text-[11px] text-green-600 font-semibold mb-2">{formatCurrency(pix)} Pix</p>

                  {/* Stock bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-[10px] text-gray-400 mb-0.5">
                      <span>Estoque</span>
                      <span>{stock > 0 ? `${stock} restantes` : 'Esgotado'}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${stockPct > 70 ? 'bg-red-500' : 'bg-orange-400'}`}
                        style={{ width: `${stockPct}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleAdd(product, e)}
                    disabled={stock === 0 || isAdded}
                    className={`w-full text-xs font-bold py-1.5 rounded-lg transition-all ${
                      isAdded
                        ? 'bg-green-500 text-white'
                        : stock === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <><Check className="w-3 h-3 inline mr-1" />Adicionado!</>
                    ) : stock === 0 ? (
                      'Esgotado'
                    ) : (
                      <><ShoppingCart className="w-3 h-3 inline mr-1" />Adicionar</>
                    )}
                  </button>
                </div>
              </Link>
            )
          })}

          {/* See all card */}
          <Link
            href="/busca?sort=discount"
            className="flex-shrink-0 w-40 bg-white/10 border-2 border-dashed border-white/40 rounded-2xl flex flex-col items-center justify-center gap-3 p-4 hover:bg-white/20 transition-colors group"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <p className="text-white font-bold text-sm text-center leading-tight">Ver todas as ofertas</p>
          </Link>
        </div>
      </div>
    </section>
  )
}
