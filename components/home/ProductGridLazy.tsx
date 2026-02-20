'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { ProductGridSkeleton } from '@/components/products/ProductCardSkeleton'

const ProductGrid = dynamic(
  () => import('@/components/home/ProductGrid').then(mod => ({ default: mod.ProductGrid })),
  { loading: () => <ProductGridSkeleton count={8} /> }
)

export { ProductGrid }
