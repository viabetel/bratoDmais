'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { 
  Grid3x3, 
  List, 
  SlidersHorizontal, 
  X, 
  ChevronDown,
  Search,
  Package
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/ProductCard'
import { products } from '@/data/products'

export default function SearchPageContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('relevancia')
  const [filterBrand, setFilterBrand] = useState<string | null>(null)
  const [filterCondition, setFilterCondition] = useState<string | null>(null)
  const [filterFreeShipping, setFilterFreeShipping] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchQuery =
        query === '' ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))

      const matchBrand = !filterBrand || p.brand === filterBrand
      const matchCondition = !filterCondition || p.condition === filterCondition
      const matchFreeShipping = !filterFreeShipping || p.freeShipping
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1]

      return matchQuery && matchBrand && matchCondition && matchFreeShipping && matchPrice
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
  }, [query, filterBrand, filterCondition, filterFreeShipping, priceRange, sortBy])

  const brands = [...new Set(products.map((p) => p.brand))].sort()
  const conditions = [
    { value: 'novo', label: 'Novo' },
    { value: 'reembalado', label: 'Reembalado' },
    { value: 'remanufaturado', label: 'Remanufaturado' },
  ]

  const activeFiltersCount = [filterBrand, filterCondition, filterFreeShipping].filter(Boolean).length

  const clearAllFilters = () => {
    setFilterBrand(null)
    setFilterCondition(null)
    setFilterFreeShipping(false)
    setPriceRange([0, 10000])
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-6 md:py-8">
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
