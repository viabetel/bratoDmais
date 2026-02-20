'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, BarChart2, ArrowRight } from 'lucide-react'
import { useCompareStore } from '@/lib/store/compareStore'
import { Button } from '@/components/ui/button'

export function CompareBar() {
  const items = useCompareStore((s) => s.items)
  const removeItem = useCompareStore((s) => s.removeItem)
  const clearAll = useCompareStore((s) => s.clearAll)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(items.length > 0)
  }, [items.length])

  if (!visible || items.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="container mx-auto px-4 pb-4 flex justify-center pointer-events-auto">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl shadow-black/20 px-4 py-3 flex items-center gap-4 flex-wrap max-w-2xl w-full">
          <div className="flex items-center gap-2 flex-shrink-0">
            <BarChart2 className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-gray-900">Comparar ({items.length}/4)</span>
          </div>

          {/* Compare slots */}
          <div className="flex gap-2 flex-1 flex-wrap">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-2 py-1"
              >
                <span className="text-xs text-blue-700 font-medium max-w-[100px] truncate">
                  {item.name.split(' ').slice(0, 2).join(' ')}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-blue-400 hover:text-blue-600 flex-shrink-0"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {/* Empty slots */}
            {Array.from({ length: Math.max(0, 2 - items.length) }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="flex items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded-lg px-3 py-1"
              >
                <span className="text-xs text-gray-400">+ produto</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 flex-shrink-0">
            {items.length >= 2 && (
              <Link href="/comparar">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold h-8">
                  Comparar
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            )}
            <button
              onClick={clearAll}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
