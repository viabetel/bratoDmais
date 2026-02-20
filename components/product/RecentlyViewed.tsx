'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { products, type Product } from '@/data/products'
import { formatCurrency, calcPixPrice } from '@/lib/config'
import { resolveProductImage } from '@/lib/utils/images'

const STORAGE_KEY = 'bdp_recently_viewed'
const MAX_ITEMS = 6

export function useRecentlyViewed() {
  const getIds = (): string[] => {
    if (typeof window === 'undefined') return []
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  }

  const addProduct = (productId: string) => {
    if (typeof window === 'undefined') return
    try {
      const ids = getIds().filter((id) => id !== productId)
      ids.unshift(productId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.slice(0, MAX_ITEMS)))
    } catch {}
  }

  return { getIds, addProduct }
}

interface RecentlyViewedProps {
  excludeId?: string
}

export function RecentlyViewed({ excludeId }: RecentlyViewedProps) {
  const [viewedProducts, setViewedProducts] = useState<Product[]>([])

  useEffect(() => {
    try {
      const ids: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      const viewed = ids
        .filter((id) => id !== excludeId)
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean) as Product[]
      setViewedProducts(viewed.slice(0, 4))
    } catch {}
  }, [excludeId])

  if (viewedProducts.length === 0) return null

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-gray-400" />
        <h2 className="text-lg font-bold text-gray-900">Vistos Recentemente</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {viewedProducts.map((product) => {
          const pixPrice = calcPixPrice(product.price)
          return (
            <Link
              key={product.id}
              href={`/p/${product.slug}`}
              className="group bg-white rounded-xl border border-gray-100 p-3 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 mb-2">
                <img
                  src={resolveProductImage(product.images, product.categorySlug, 'sm')}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-gray-700 font-medium line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                {product.name}
              </p>
              <p className="text-sm font-black text-gray-900">{formatCurrency(product.price)}</p>
              <p className="text-xs text-green-600 font-semibold">{formatCurrency(pixPrice)} Pix</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// Hook to register a product view on mount
export function useRegisterView(productId: string) {
  const { addProduct } = useRecentlyViewed()
  useEffect(() => {
    if (productId) addProduct(productId)
  }, [productId])
}
