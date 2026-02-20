'use client'

import Link from 'next/link'
import { ArrowLeft, Trash2, ShoppingCart } from 'lucide-react'
import { useCompareStore } from '@/lib/store/compareStore'
import { products } from '@/data/products'
import { formatBRL } from '@/lib/utils/format'

export function ComparePageClient() {
  const items = useCompareStore((state) => state.items)
  const removeItem = useCompareStore((state) => state.removeItem)
  const clearAll = useCompareStore((state) => state.clearAll)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Nenhum Produto Selecionado</h1>
            <p className="text-gray-600 mb-8">Adicione produtos à comparação para ver as diferenças</p>
            <Link href="/busca">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg">
                Continuar Comprando
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const getProductDetails = (productId: string) => {
    return products.find(p => p.id === productId)
  }

  const specs = [
    'Marca',
    'Preço',
    'Preço Original',
    'Desconto',
    'Avaliação',
    'Estoque',
    'Condição',
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Comparar Produtos</h1>
          <button
            onClick={clearAll}
            className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Limpar Tudo
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left font-bold text-gray-900 bg-gray-50 sticky left-0 z-10 w-40">
                  Especificações
                </th>
                {items.map((item) => (
                  <th key={item.id} className="px-6 py-4 text-center font-bold text-gray-900 bg-gray-50 min-w-40">
                    <div className="flex flex-col items-center gap-2">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                      <p className="text-sm line-clamp-2">{item.name}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 text-xs font-semibold"
                      >
                        Remover
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map((spec, idx) => (
                <tr key={spec} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50 sticky left-0 z-10 w-40 border-r">
                    {spec}
                  </td>
                  {items.map((item) => {
                    const product = getProductDetails(item.id)
                    if (!product) return <td key={item.id} className="px-6 py-4 text-center">-</td>

                    let value = '-'
                    switch (spec) {
                      case 'Marca':
                        value = product.brand
                        break
                      case 'Preço':
                        value = formatBRL(product.price)
                        break
                      case 'Preço Original':
                        value = formatBRL(product.originalPrice)
                        break
                      case 'Desconto':
                        const discount = Math.round(
                          ((product.originalPrice - product.price) / product.originalPrice) * 100
                        )
                        value = `${discount}%`
                        break
                      case 'Avaliação':
                        value = `${product.rating}★ (${product.reviews})`
                        break
                      case 'Estoque':
                        value = product.stock > 0 ? `${product.stock} un.` : 'Esgotado'
                        break
                      case 'Condição':
                        value = product.condition === 'novo' ? 'Novo' : 'Seminovo'
                        break
                    }

                    return (
                      <td key={item.id} className="px-6 py-4 text-center text-sm">
                        {value}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-center text-gray-700 mb-4 font-semibold">Pronto para comprar?</p>
          <div className="flex gap-4 justify-center flex-wrap">
            {items.map((item) => (
              <Link key={item.id} href={`/p/${item.slug || item.id}`}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-all flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Comprar {item.brand}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
