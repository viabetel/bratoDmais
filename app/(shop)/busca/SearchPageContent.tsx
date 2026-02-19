'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { 
  Grid3x3, 
  List, 
  Menu,
  Package
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/ProductCard'
import { ProfessionalFilterSidebar, FiltersState } from '@/components/filters/ProfessionalFilterSidebar'
import { products } from '@/data/products'

export default function SearchPageContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('relevancia')
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false)
  const [filters, setFilters] = useState<FiltersState>({
    priceMin: 0,
    priceMax: 10000,
    brands: [],
    condition: [],
    categories: [],
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
        p.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))

      if (!matchQuery) return false

      if (filters.categories.length > 0 && !filters.categories.includes(p.categorySlug)) return false
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false
      if (filters.condition.length > 0 && !filters.condition.includes(p.condition)) return false
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
          const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100
          const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100
          return discountB - discountA
        })
      case 'melhor-avaliacao':
        return result.sort((a, b) => b.rating - a.rating)
      default:
        return result
    }
  }, [query, filters, sortBy])

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Busca</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900">
                {query ? `Resultados para "${query}"` : 'Todos os Produtos'}
              </h1>
              <p className="text-gray-600 mt-2">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </p>
            </div>
            
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setFilterSidebarOpen(!filterSidebarOpen)}
            >
              <Menu className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="hidden lg:block w-72 flex-shrink-0">
            <ProfessionalFilterSidebar
              onFiltersChange={setFilters}
              isOpen={true}
            />
          </div>

          {filterSidebarOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                onClick={() => setFilterSidebarOpen(false)}
              />
              <div className="fixed inset-y-0 left-0 w-80 bg-white z-40 lg:hidden overflow-y-auto">
                <ProfessionalFilterSidebar
                  onFiltersChange={setFilters}
                  isOpen={filterSidebarOpen}
                  onClose={() => setFilterSidebarOpen(false)}
                />
              </div>
            </>
          )}

          <div className="w-full flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-200 gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-gray-600 whitespace-nowrap">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white flex-1 sm:flex-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevancia">Relevância</option>
                  <option value="menor-preco">Menor Preço</option>
                  <option value="maior-preco">Maior Preço</option>
                  <option value="maior-desconto">Maior Desconto</option>
                  <option value="melhor-avaliacao">Melhor Avaliação</option>
                </select>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <Button
                  size="sm"
                  variant={layout === 'grid' ? 'default' : 'outline'}
                  onClick={() => setLayout('grid')}
                  className="px-2"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={layout === 'list' ? 'default' : 'outline'}
                  onClick={() => setLayout('list')}
                  className="px-2"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-6 text-lg">
                  {query 
                    ? `Nenhum produto encontrado para "${query}"`
                    : 'Nenhum produto encontrado'
                  }
                </p>
                <Button
                  onClick={() =>
                    setFilters({
                      priceMin: 0,
                      priceMax: 10000,
                      brands: [],
                      condition: [],
                      categories: [],
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
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                    : 'space-y-4'
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
