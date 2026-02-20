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
  hideTitle?: boolean
}

export function ProductGrid({
  title,
  description,
  products,
  viewMoreHref,
  badge,
  hideTitle = false,
}: ProductGridProps & { hideTitle?: boolean }) {
  if (hideTitle) {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          </div>
          <Link
            href={viewMoreHref}
            className="text-blue-600 hover:text-blue-700 font-semibold text-xs md:text-sm flex items-center gap-1 flex-shrink-0"
          >
            Ver tudo <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} variant="grid" />
          ))}
        </div>
      </div>
    </section>
  )
  }
}
