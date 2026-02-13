'use client'

import { Suspense } from 'react'
import { Grid3x3, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/ProductCard'
import { products } from '@/data/products'
import Link from 'next/link'
import SearchPageContent from './SearchPageContent'

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchPageContent />
    </Suspense>
  )
}

function SearchPageSkeleton() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center">
        <div className="h-8 bg-muted rounded w-48 mx-auto mb-4"></div>
        <div className="h-4 bg-muted rounded w-64 mx-auto"></div>
      </div>
    </main>
  )
}
