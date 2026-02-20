'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Plus, Check, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products, type Product } from '@/data/products'
import { useCartStore } from '@/lib/store/cartStore'
import { formatCurrency, calcPixPrice } from '@/lib/config'
import { resolveProductImage } from '@/lib/utils/images'

interface ComprJuntoProps {
  mainProduct: Product
}

export function ComprJunto({ mainProduct }: ComprJuntoProps) {
  // Find complementary products (different category or accessories)
  const complementary = products
    .filter(
      (p) =>
        p.id !== mainProduct.id &&
        (p.categorySlug === mainProduct.categorySlug ||
          p.tags.some((t) => mainProduct.tags.includes(t))) &&
        p.price < mainProduct.price * 0.6
    )
    .slice(0, 2)

  const [selected, setSelected] = useState<Set<string>>(
    new Set([mainProduct.id, ...complementary.map((p) => p.id)])
  )
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  if (complementary.length === 0) return null

  const allItems = [mainProduct, ...complementary]
  const selectedItems = allItems.filter((p) => selected.has(p.id))
  const totalPrice = selectedItems.reduce((sum, p) => sum + p.price, 0)
  const totalPix = calcPixPrice(totalPrice)
  const bundleSavings = totalPrice * 0.05 // 5% bundle discount shown

  const handleToggle = (id: string) => {
    if (id === mainProduct.id) return // Can't deselect main product
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleAddAll = () => {
    selectedItems.forEach((p) => {
      addItem({
        productId: p.id,
        name: p.name,
        price: p.price,
        quantity: 1,
        image: resolveProductImage(p.images, p.categorySlug, 'sm'),
      })
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 3000)
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-amber-100 p-5 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🛒</span>
        <h3 className="font-bold text-gray-900">Compre Junto e Economize</h3>
        <span className="ml-auto bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
          Kit popular
        </span>
      </div>

      {/* Products in bundle */}
      <div className="flex items-center gap-3 flex-wrap mb-4">
        {allItems.map((product, index) => {
          const isSelected = selected.has(product.id)
          const isMain = product.id === mainProduct.id
          return (
            <div key={product.id} className="flex items-center gap-2">
              {index > 0 && <Plus className="w-4 h-4 text-gray-400 flex-shrink-0" />}
              <div
                onClick={() => handleToggle(product.id)}
                className={`relative flex flex-col items-center gap-1 cursor-pointer group ${
                  isMain ? 'cursor-default' : ''
                }`}
              >
                <div
                  className={`w-20 h-20 rounded-xl border-2 overflow-hidden transition-all ${
                    isSelected
                      ? 'border-blue-400 shadow-md shadow-blue-100'
                      : 'border-gray-200 opacity-50'
                  }`}
                >
                  <img
                    src={resolveProductImage(product.images, product.categorySlug, 'sm')}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {isMain && (
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-center text-gray-600 max-w-[80px] line-clamp-2 leading-tight">
                  {product.name.split(' ').slice(0, 3).join(' ')}
                </p>
                <span className="text-xs font-bold text-blue-600">{formatCurrency(product.price)}</span>
                {!isMain && (
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                      isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bundle total */}
      <div className="bg-amber-50 rounded-xl p-3 mb-3 flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="text-xs text-gray-500">
            {selectedItems.length} ite{selectedItems.length !== 1 ? 'ns' : 'm'} selecionado{selectedItems.length !== 1 ? 's' : ''}
          </p>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-lg font-black text-gray-900">{formatCurrency(totalPrice)}</span>
            <span className="text-sm text-green-600 font-bold">
              {formatCurrency(totalPix)} no Pix
            </span>
          </div>
        </div>
        <Button
          onClick={handleAddAll}
          disabled={selectedItems.length === 0 || added}
          className={`text-sm font-bold px-4 py-2 transition-all ${
            added
              ? 'bg-green-500 hover:bg-green-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {added ? (
            <><Check className="w-4 h-4 mr-1.5" />Adicionados!</>
          ) : (
            <><ShoppingCart className="w-4 h-4 mr-1.5" />Adicionar Kit</>
          )}
        </Button>
      </div>
    </div>
  )
}
