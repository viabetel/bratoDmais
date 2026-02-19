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
      // Filtro de busca por texto
      const matchQuery =
        query === '' ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))

      if (!matchQuery) return false

      // Filtro de categorias
      if (filters.categories.length > 0 && !filters.categories.includes(p.categorySlug)) return false
      
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
  }, [query, filters, sortBy])

  return (
    <main className="min-h-screen bg-white">

        {/* Header */}
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
            
            {/* Mobile Filter Toggle */}
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
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <ProfessionalFilterSidebar
              onFiltersChange={setFilters}
              isOpen={true}
            />
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
                  onFiltersChange={setFilters}
                  isOpen={filterSidebarOpen}
                  onClose={() => setFilterSidebarOpen(false)}
                />
              </div>
            </>
          )}

          {/* Products Section */}
          <div className="w-full flex-1 space-y-6">
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

            {/* Products Grid/List */}
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

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Busca</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {query ? `Resultados para "${query}"` : 'Todos os Produtos'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </p>
            </div>
            
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filtros
              {activeFiltersCount > 0 && (
                <span className="ml-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white border border-border rounded-xl p-5 space-y-6 sticky top-24">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Filtros</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Limpar ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Brand Filter */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Marca</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filterBrand === brand}
                        onChange={() => setFilterBrand(filterBrand === brand ? null : brand)}
                        className="w-4 h-4 rounded border-border accent-primary"
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Condition Filter */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Condição</h4>
                <div className="space-y-2">
                  {conditions.map((cond) => (
                    <label key={cond.value} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filterCondition === cond.value}
                        onChange={() => setFilterCondition(filterCondition === cond.value ? null : cond.value)}
                        className="w-4 h-4 rounded border-border accent-primary"
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {cond.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Free Shipping Filter */}
              <div>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filterFreeShipping}
                    onChange={() => setFilterFreeShipping(!filterFreeShipping)}
                    className="w-4 h-4 rounded border-border accent-primary"
                  />
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    🚚 Frete Grátis
                  </span>
                </label>
              </div>

              {/* Close button for mobile */}
              <Button
                variant="outline"
                className="w-full lg:hidden"
                onClick={() => setShowFilters(false)}
              >
                Ver {filteredProducts.length} produtos
              </Button>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 bg-white border border-border rounded-xl p-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Ordenar:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 sm:flex-none px-3 py-2 text-sm border border-border rounded-lg bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                >
                  <option value="relevancia">Relevância</option>
                  <option value="menor-preco">Menor Preço</option>
                  <option value="maior-preco">Maior Preço</option>
                  <option value="maior-desconto">Maior Desconto</option>
                  <option value="melhor-avaliacao">Melhor Avaliação</option>
                </select>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-muted-foreground mr-2 hidden sm:inline">Visualizar:</span>
                <Button
                  size="sm"
                  variant={layout === 'grid' ? 'default' : 'outline'}
                  onClick={() => setLayout('grid')}
                  className="px-3"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={layout === 'list' ? 'default' : 'outline'}
                  onClick={() => setLayout('list')}
                  className="px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Active Filters Pills */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filterBrand && (
                  <button
                    onClick={() => setFilterBrand(null)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    {filterBrand}
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                {filterCondition && (
                  <button
                    onClick={() => setFilterCondition(null)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    {conditions.find(c => c.value === filterCondition)?.label}
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                {filterFreeShipping && (
                  <button
                    onClick={() => setFilterFreeShipping(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    Frete Grátis
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white border border-border rounded-xl">
                <Search className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Tente ajustar os filtros ou buscar por outro termo
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={clearAllFilters}>
                    Limpar Filtros
                  </Button>
                  <Link href="/">
                    <Button>Voltar à Home</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div
                className={
                  layout === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <ProductCard product={product} variant={layout === 'list' ? 'list' : 'grid'} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
