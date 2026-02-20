'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import { Product } from '@/data/products'
import { ProductCard } from '@/components/products/ProductCard'
import { getDiscountPercent, formatBRL } from '@/lib/utils/format'

interface ProductGridProps {
  title: string
  description: string
  products: Product[]
  viewMoreHref: string
  badge?: 'flash' | 'bestseller' | null
}

export function ProductGrid({
  title,
  description,
  products,
  viewMoreHref,
  badge,
}: ProductGridProps) {
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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} variant="grid" />
          ))}
        </div>
      </div>
    </section>
  )
}
