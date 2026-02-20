'use client'

import Link from 'next/link'
import { useCompareStore } from '@/lib/store/compareStore'
import { ArrowRight } from 'lucide-react'

export function CompareBar() {
  const count = useCompareStore((state) => state.count())

  if (count === 0) return null

  return (
    <div className="fixed bottom-6 right-6 bg-white shadow-2xl rounded-lg p-4 border border-gray-200 z-40 max-w-xs">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-gray-900">Produtos para Comparar</span>
        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">{count}</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Você selecionou {count} produto{count > 1 ? 's' : ''}</p>
      <Link href="/comparar" className="w-full">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all">
          Comparar <ArrowRight className="w-4 h-4" />
        </button>
      </Link>
    </div>
  )
}
