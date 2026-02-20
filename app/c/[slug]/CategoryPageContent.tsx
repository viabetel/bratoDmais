'use client'

import { useState } from 'react'
import { getCategoryPath } from '@/lib/utils/categories'
import { products } from '@/data/products'
import { ProductCard } from '@/components/products/ProductCard'
import { ProfessionalFilterSidebar, FiltersState } from '@/components/filters/ProfessionalFilterSidebar'
import { Grid3x3, List, Menu, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CategoryPageContentProps {
  category: any
  slug: string
}

export function CategoryPageContent({ category, slug }: CategoryPageContentProps) {
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

  const breadcrumb = getCategoryPath(slug)

  // Filter products by category
  const filteredProducts = products
    .filter((p) => filters.categories.includes(p.categorySlug))
    .filter((p) => {
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false
      if (filters.condition.length > 0 && !filters.condition.includes(p.condition)) return false
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false
      if (filters.inStock && p.stock === 0) return false
      if (filters.freeShipping && p.freeShipping !== true) return false
      if (filters.rating > 0 && p.rating < filters.rating) return false
      return true
    })

  // Sort products
  let sortedProducts = [...filteredProducts]
  switch (sortBy) {
    case 'preco-menor':
      sortedProducts.sort((a, b) => a.price - b.price)
      break
    case 'preco-maior':
      sortedProducts.sort((a, b) => b.price - a.price)
      break
    case 'populares':
      sortedProducts.sort((a, b) => b.rating - a.rating)
      break
    case 'novos':
      sortedProducts.reverse()
      break
    default:
      sortedProducts = filteredProducts
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-blue-600 hover:text-blue-700">
              Home
            </a>
            {breadcrumb.map((crumb, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">{crumb}</span>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.name}</h1>
          <p className="text-lg text-blue-100">{category.description}</p>
          <p className="text-sm text-blue-200 mt-4">{sortedProducts.length} produtos encontrados</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="hidden md:block">
            <ProfessionalFilterSidebar
              currentCategory={slug}
              onFilterChange={setFilters}
              isOpen={true}
            />
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Button
                  variant={layout === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLayout('grid')}
                  className="gap-2"
                >
                  <Grid3x3 className="w-4 h-4" />
                  Grade
                </Button>
                <Button
                  variant={layout === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLayout('list')}
                  className="gap-2"
                >
                  <List className="w-4 h-4" />
                  Lista
                </Button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="relevancia">Relevância</option>
                <option value="preco-menor">Menor Preço</option>
                <option value="preco-maior">Maior Preço</option>
                <option value="populares">Mais Populares</option>
                <option value="novos">Mais Novos</option>
              </select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilterSidebarOpen(true)}
                className="md:hidden gap-2"
              >
                <Menu className="w-4 h-4" />
                Filtros
              </Button>
            </div>

            {/* Products Grid/List */}
            {sortedProducts.length > 0 ? (
              <div
                className={
                  layout === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant={layout}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600">
                  Tente ajustar seus filtros ou explore outras categorias.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      {filterSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <ProfessionalFilterSidebar
            currentCategory={slug}
            onFilterChange={setFilters}
            isOpen={filterSidebarOpen}
            onClose={() => setFilterSidebarOpen(false)}
            isMobile={true}
          />
        </div>
      )}
    </div>
  )
}
