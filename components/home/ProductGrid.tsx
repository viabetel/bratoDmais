'use client'

<<<<<<< HEAD
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Clock, TrendingUp } from 'lucide-react'
import { Product } from '@/data/products'
import { ProductCard } from '@/components/products/ProductCard'
=======
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import { Product } from '@/data/products'
import { ProductCard } from '@/components/products/ProductCard'
import { getDiscountPercent, formatBRL } from '@/lib/utils/format'
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308

interface ProductGridProps {
  title: string
  description: string
  products: Product[]
  viewMoreHref: string
  badge?: 'flash' | 'bestseller' | null
  hideTitle?: boolean
<<<<<<< HEAD
  showCountdown?: boolean
}

function CountdownTimer({ endsInHours = 6 }: { endsInHours?: number }) {
  const [timeLeft, setTimeLeft] = useState({ h: endsInHours, m: 59, s: 59 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 }
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 }
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex items-center gap-1.5">
      <Clock className="w-3.5 h-3.5 text-red-400" />
      <span className="text-xs text-white/80 font-medium">Termina em:</span>
      {[pad(timeLeft.h), pad(timeLeft.m), pad(timeLeft.s)].map((unit, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="bg-white/20 text-white font-black text-sm px-1.5 py-0.5 rounded min-w-[1.8rem] text-center tabular-nums">
            {unit}
          </span>
          {i < 2 && <span className="text-white/80 font-bold text-sm">:</span>}
        </span>
      ))}
    </div>
  )
}

export function ProductGrid({
  title, description, products, viewMoreHref, badge, hideTitle = false, showCountdown = false,
}: ProductGridProps) {
  if (hideTitle) {
    return (
      <section className="py-6 md:py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
=======
}

export function ProductGrid({
  title,
  description,
  products,
  viewMoreHref,
  badge,
  hideTitle = false,
}: ProductGridProps) {
  if (hideTitle) {
    // When hideTitle is true, render only the products grid without header
    return (
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
            {products.map((product) => (
              <ProductCard key={product.id} product={product} variant="grid" />
            ))}
          </div>
<<<<<<< HEAD
          <div className="mt-6 text-center">
            <Link href={viewMoreHref}>
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg text-sm">
                Ver todos os produtos
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
=======
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
        </div>
      </section>
    )
  }

<<<<<<< HEAD
  const isFlash = badge === 'flash'

  return (
    <section className={`py-10 md:py-14 ${isFlash ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-7">
          <div>
            {badge && (
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black mb-2 ${
                isFlash ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              }`}>
                {isFlash ? <Zap className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                {isFlash ? 'OFERTA RELÂMPAGO' : 'MAIS VENDIDOS'}
              </div>
            )}
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">{title}</h2>
            <p className="text-gray-500 text-sm mt-1">{description}</p>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            {isFlash && showCountdown && (
              <div className="bg-red-500 rounded-xl px-4 py-2 flex items-center gap-3">
                <CountdownTimer endsInHours={4} />
              </div>
            )}
            <Link href={viewMoreHref} className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 group">
              Ver tudo <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
=======
  // When hideTitle is false, render with full header
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {badge === 'flash' && (
                <span className="inline-flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  <Zap className="w-3 h-3" /> OFERTA RELÂMPAGO
                </span>
              )}
              {badge === 'bestseller' && (
                <span className="inline-flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  ⭐ MAIS VENDIDOS
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-500 mt-1">{description}</p>
          </div>
          <Link
            href={viewMoreHref}
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1"
          >
            Ver tudo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
          {products.map((product) => (
            <ProductCard key={product.id} product={product} variant="grid" />
          ))}
        </div>
<<<<<<< HEAD

        <div className="mt-6 text-center">
          <Link href={viewMoreHref}>
            <button className={`inline-flex items-center gap-2 px-8 py-3 font-bold rounded-xl transition-all text-sm border-2 ${
              isFlash
                ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                : 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
            }`}>
              Ver mais {title.toLowerCase()}
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
=======
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
      </div>
    </section>
  )
}
