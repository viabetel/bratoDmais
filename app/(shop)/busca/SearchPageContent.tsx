'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Grid3x3, List, SlidersHorizontal, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/ProductCard'
import {
  ProfessionalFilterSidebar,
  FiltersState,
} from '@/components/filters/ProfessionalFilterSidebar'
import { products } from '@/data/products'

export default function SearchPageContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const categoria = searchParams.get('categoria') || ''
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('relevancia')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [filters, setFilters] = useState<FiltersState>({
    priceMin: 0,
    priceMax: 10000,
    brands: [],
    condition: [],
    categories: categoria ? [categoria] : [],
    inStock: false,
    rating: 0,
    freeShipping: false,
  })

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchQuery =
        query === '' ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))

      if (!matchQuery) return false
      if (filters.categories.length > 0 && !filters.categories.includes(p.categorySlug))
        return false
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false
      if (filters.condition.length > 0 && !filters.condition.includes(p.condition))
        return false
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false
      if (filters.inStock && p.stock === 0) return false
      if (filters.freeShipping && p.freeShipping !== true) return false
      if (filters.rating > 0 && p.rating < filters.rating) return false
      return true
    })

    switch (sortBy) {
      case 'maior-preco':
        return result.sort((a, b) => b.price - a.price)
      case 'menor-preco':
        return result.sort((a, b) => a.price - b.price)
      case 'maior-desconto':
        return result.sort((a, b) => {
          const dA = ((a.originalPrice - a.price) / a.originalPrice) * 100
          const dB = ((b.originalPrice - b.price) / b.originalPrice) * 100
          return dB - dA
        })
      case 'melhor-avaliacao':
        return result.sort((a, b) => b.rating - a.rating)
      default:
        return result
    }
  }, [query, filters, sortBy])

  return (
    <main className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb + Title */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Busca</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {query ? (
              <>
                {'Resultados para '}
                <span className="text-blue-600">{`"${query}"`}</span>
              </>
            ) : (
              'Todos os Produtos'
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Layout: Sidebar + Content side by side */}
        <div className="flex gap-6 items-start">
          {/* Desktop Sidebar */}
          <ProfessionalFilterSidebar
            currentCategory={categoria}
            onFilterChange={setFilters}
            isOpen={true}
          />

          {/* Mobile Sidebar */}
          <ProfessionalFilterSidebar
            currentCategory={categoria}
            onFilterChange={setFilters}
            isOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6 bg-white rounded-xl border border-gray-200/80 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setMobileOpen(true)}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
                  Filtros
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 hidden sm:inline">Ordenar:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option value="relevancia">Relevância</option>
                    <option value="menor-preco">Menor Preço</option>
                    <option value="maior-preco">Maior Preço</option>
                    <option value="maior-desconto">Maior Desconto</option>
                    <option value="melhor-avaliacao">Melhor Avaliação</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setLayout('grid')}
                  className={`p-1.5 rounded-md transition-colors ${
                    layout === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid3x3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setLayout('list')}
                  className={`p-1.5 rounded-md transition-colors ${
                    layout === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200/80">
                <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 mb-4 text-sm">
                  {query
                    ? `Nenhum produto encontrado para "${query}"`
                    : 'Nenhum produto encontrado com os filtros selecionados'}
                </p>
                <Button
                  size="sm"
                  onClick={() =>
                    setFilters({
                      priceMin: 0,
                      priceMax: 10000,
                      brands: [],
                      condition: [],
                      categories: categoria ? [categoria] : [],
                      inStock: false,
                      rating: 0,
                      freeShipping: false,
                    })
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Limpar Filtros
                </Button>
              </div>
            ) : (
              <div
                className={
                  layout === 'grid'
                    ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'
                    : 'space-y-3'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant={layout === 'list' ? 'list' : 'grid'}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
