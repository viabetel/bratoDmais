'use client'

import { useState, useMemo, use } from 'react'
import Link from 'next/link'
import { Grid3x3, List, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/ProductCard'
import { ProfessionalFilterSidebar, FiltersState } from '@/components/filters/ProfessionalFilterSidebar'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import { getCategoryBySlug } from '@/lib/utils/categories'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params)
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('relevancia')
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false)
  const [filters, setFilters] = useState<FiltersState>({
    priceMin: 0,
    priceMax: 10000,
    brands: [],
    condition: [],
    categories: [slug],
    inStock: false,
    rating: 0,
    freeShipping: false,
  })

  // Encontra a categoria
  const categoryData = getCategoryBySlug(slug)

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      // Filtro de categorias
      if (!filters.categories.includes(p.categorySlug)) return false
      
      // Filtro de marcas
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false
      
      // Filtro de condição
      if (filters.condition.length > 0 && !filters.condition.includes(p.condition)) return false
      
      // Filtro de preço
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false
      
      // Filtro de estoque
      if (filters.inStock && p.stock === 0) return false
      
      // Filtro de frete grátis
      if (filters.freeShipping && p.freeShipping !== true) return false
      
      // Filtro de avaliação
      if (filters.rating > 0 && p.rating < filters.rating) return false
      
      return true
    })

    // Ordenação
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
  }, [filters, sortBy])

  if (!categoryData) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Categoria não encontrada</h1>
          <p className="text-gray-600 text-lg mb-8">A categoria que você está procurando não existe. Confira nossas categorias principais:</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`/c/${cat.slug}`}
                className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-lg transition-all hover:scale-105 border border-blue-200"
              >
                <span className="block text-lg font-bold text-blue-600 mb-1">{cat.name}</span>
                <span className="text-xs text-gray-600">{cat.description?.slice(0, 40)}</span>
              </Link>
            ))}
          </div>
          
          <Link href="/busca">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Ver Todos os Produtos
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-semibold text-gray-900">{categoryData.name}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">{categoryData.name}</h1>
          <p className="text-gray-600 mb-4">{categoryData.description}</p>
          <p className="text-sm font-medium text-gray-500">{filteredProducts.length} produtos encontrados</p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar - Desktop + Mobile Overlay */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <ProfessionalFilterSidebar
              currentCategory={slug}
              onFiltersChange={setFilters}
              isOpen={true}
            />
          </div>

          {/* Mobile Filter Button + Products */}
          <div className="w-full flex-1">
            {/* Mobile Toolbar */}
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <Button
                onClick={() => setFilterSidebarOpen(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Menu className="w-4 h-4" />
                Filtros
              </Button>
            </div>

            {/* Mobile Filter Drawer */}
            {filterSidebarOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                  onClick={() => setFilterSidebarOpen(false)}
                />
                <div className="fixed inset-y-0 left-0 w-80 bg-white z-40 lg:hidden overflow-y-auto">
                  <ProfessionalFilterSidebar
                    currentCategory={slug}
                    onFiltersChange={setFilters}
                    isOpen={filterSidebarOpen}
                    onClose={() => setFilterSidebarOpen(false)}
                  />
                </div>
              </>
            )}

            {/* Products Section */}
            <div className="space-y-6">
              {/* Toolbar */}
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

                <div className="flex items-center gap-2">
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

              {/* Products Grid/List */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-6">Nenhum produto encontrado com os filtros selecionados</p>
                  <Button
                    onClick={() =>
                      setFilters({
                        priceMin: 0,
                        priceMax: 10000,
                        brands: [],
                        condition: [],
                        categories: [slug],
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
      </div>
    </main>
  )
}
