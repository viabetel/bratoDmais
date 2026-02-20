'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
<<<<<<< HEAD
import { Grid3x3, List, SlidersHorizontal, Package, Zap, ArrowUpDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/ProductCard'
import { ProfessionalFilterSidebar, FiltersState } from '@/components/filters/ProfessionalFilterSidebar'
import { ActiveFilterChips } from '@/components/filters/ActiveFilterChips'
=======
import { Grid3x3, List, SlidersHorizontal, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/ProductCard'
import {
  ProfessionalFilterSidebar,
  FiltersState,
} from '@/components/filters/ProfessionalFilterSidebar'
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
import { products } from '@/data/products'
import { getServicesByCategory } from '@/data/services'

const SORT_OPTIONS = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'menor-preco', label: 'Menor Preço' },
  { value: 'maior-preco', label: 'Maior Preço' },
  { value: 'maior-desconto', label: 'Maior Desconto' },
  { value: 'melhor-avaliacao', label: 'Melhor Avaliação' },
]

export default function SearchPageContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const categoria = searchParams.get('categoria') || ''
<<<<<<< HEAD
  const serviceParam = searchParams.get('service') || ''
  const maxPriceParam = searchParams.get('maxPrice')
  const sortParam = searchParams.get('sort')

  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sortBy, setSortBy] = useState(() => {
    if (sortParam === 'discount') return 'maior-desconto'
    if (sortParam === 'rating') return 'melhor-avaliacao'
    return 'relevancia'
  })

  const [filters, setFilters] = useState<FiltersState>({
    priceMin: 0,
    priceMax: maxPriceParam ? parseInt(maxPriceParam) : 10000,
=======
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('relevancia')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [filters, setFilters] = useState<FiltersState>({
    priceMin: 0,
    priceMax: 10000,
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
    brands: [],
    condition: [],
    categories: categoria ? [categoria] : [],
    inStock: false,
    rating: 0,
    freeShipping: false,
<<<<<<< HEAD
    serviceTypes: serviceParam ? [serviceParam] : [],
=======
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
  })

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      // Text search
      const matchQuery =
        query === '' ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))

      if (!matchQuery) return false
<<<<<<< HEAD
      if (filters.categories.length > 0 && !filters.categories.includes(p.categorySlug)) return false
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false
      if (filters.condition.length > 0 && !filters.condition.includes(p.condition)) return false
=======
      if (filters.categories.length > 0 && !filters.categories.includes(p.categorySlug))
        return false
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false
      if (filters.condition.length > 0 && !filters.condition.includes(p.condition))
        return false
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false
      if (filters.inStock && p.stock === 0) return false
      if (filters.freeShipping && p.freeShipping !== true) return false
      if (filters.rating > 0 && p.rating < filters.rating) return false
<<<<<<< HEAD

      // Service type filter — keep products that have at least one requested service
      if (filters.serviceTypes.length > 0) {
        const productServices = getServicesByCategory(p.categorySlug)
        const productServiceTypes = productServices.map(s => s.type)
        const hasService = filters.serviceTypes.some(st => productServiceTypes.includes(st as any))
        if (!hasService) return false
      }

=======
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
      return true
    })

    switch (sortBy) {
      case 'maior-preco': return result.sort((a, b) => b.price - a.price)
      case 'menor-preco': return result.sort((a, b) => a.price - b.price)
      case 'maior-desconto':
        return result.sort((a, b) => {
          const dA = ((a.originalPrice - a.price) / a.originalPrice) * 100
          const dB = ((b.originalPrice - b.price) / b.originalPrice) * 100
          return dB - dA
        })
      case 'melhor-avaliacao': return result.sort((a, b) => b.rating - a.rating)
      default: return result
    }
  }, [query, filters, sortBy])
<<<<<<< HEAD

  const clearFilters = () => {
    setFilters({
      priceMin: 0, priceMax: 10000, brands: [], condition: [],
      categories: categoria ? [categoria] : [], inStock: false,
      rating: 0, freeShipping: false, serviceTypes: [],
    })
  }
=======
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308

  const removeBrand = (brand: string) => setFilters(f => ({ ...f, brands: f.brands.filter(b => b !== brand) }))
  const removeCondition = (cond: string) => setFilters(f => ({ ...f, condition: f.condition.filter(c => c !== cond) }))
  const removeService = (svc: string) => setFilters(f => ({ ...f, serviceTypes: (f.serviceTypes ?? []).filter(s => s !== svc) }))
  const clearPrice = () => setFilters(f => ({ ...f, priceMin: 0, priceMax: 10000 }))
  const toggleInStock = () => setFilters(f => ({ ...f, inStock: !f.inStock }))
  const toggleFreeShipping = () => setFilters(f => ({ ...f, freeShipping: !f.freeShipping }))
  const clearRating = () => setFilters(f => ({ ...f, rating: 0 }))

  const hasActiveFilters = filters.brands.length > 0 || filters.condition.length > 0 ||
    (filters.serviceTypes?.length ?? 0) > 0 || filters.inStock || filters.freeShipping ||
    filters.rating > 0 || filters.priceMin > 0 || filters.priceMax < 10000

  return (
    <main className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb + Title */}
        <div className="mb-6">
<<<<<<< HEAD
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            {categoria ? (
              <>
                <Link href={`/c/${categoria}`} className="hover:text-blue-600 transition-colors capitalize">{categoria.replace(/-/g, ' ')}</Link>
                <span>/</span>
              </>
            ) : null}
            <span className="text-gray-800 font-medium">Busca</span>
          </div>

          <div className="flex flex-wrap items-start gap-3 justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {query ? (
                  <>Resultados para <span className="text-blue-600">"{query}"</span></>
                ) : categoria ? (
                  <span className="capitalize">{categoria.replace(/-/g, ' ')}</span>
                ) : (
                  'Todos os Produtos'
                )}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                <strong className="text-gray-900">{filteredProducts.length}</strong> produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="ml-2 text-red-500 hover:text-red-700 font-medium inline-flex items-center gap-1">
                    <X className="w-3 h-3" />Limpar filtros
                  </button>
                )}
              </p>
            </div>

            {/* Quick sort chips on mobile */}
            <div className="flex flex-wrap gap-2 md:hidden">
              {SORT_OPTIONS.slice(1, 4).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-all ${
                    sortBy === opt.value
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
=======
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Busca</span>
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
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

<<<<<<< HEAD
        {/* Sidebar + Content */}
        <div className="flex gap-5 items-start">
          {/* Desktop Sidebar */}
          <ProfessionalFilterSidebar currentCategory={categoria} onFilterChange={setFilters} isOpen={true} />

          {/* Mobile Sidebar */}
          <ProfessionalFilterSidebar currentCategory={categoria} onFilterChange={setFilters} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
=======
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
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
<<<<<<< HEAD
            <div className="flex items-center justify-between gap-3 mb-4 bg-white rounded-xl border border-gray-200/80 px-3 py-2.5 shadow-sm">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="lg:hidden h-8 px-2.5 text-xs" onClick={() => setMobileOpen(true)}>
                  <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
                  Filtros
                  {hasActiveFilters && <span className="ml-1 w-4 h-4 bg-blue-600 text-white text-[10px] rounded-full flex items-center justify-center">!</span>}
                </Button>
                <div className="hidden md:flex items-center gap-2">
                  <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500">Ordenar:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                  >
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400 mr-1 hidden sm:block">{filteredProducts.length} itens</span>
                <button
                  onClick={() => setLayout('grid')}
                  className={`p-1.5 rounded-md transition-colors ${layout === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
=======
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
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
                >
                  <Grid3x3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setLayout('list')}
<<<<<<< HEAD
                  className={`p-1.5 rounded-md transition-colors ${layout === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
=======
                  className={`p-1.5 rounded-md transition-colors ${
                    layout === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

<<<<<<< HEAD
            {/* Active Filter Chips */}
            {hasActiveFilters && (
              <ActiveFilterChips
                filters={filters}
                onRemoveBrand={removeBrand}
                onRemoveCondition={removeCondition}
                onRemoveService={removeService}
                onClearPrice={clearPrice}
                onToggleInStock={toggleInStock}
                onToggleFreeShipping={toggleFreeShipping}
                onClearRating={clearRating}
                onClearAll={clearFilters}
              />
            )}

            {/* Products Grid / Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200/80 overflow-hidden">
                <div className="text-center py-12 px-6">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-9 h-9 text-gray-200" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">Nenhum produto encontrado</h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                    {query
                      ? `Não encontramos produtos para "${query}". Verifique a ortografia ou tente termos diferentes.`
                      : 'Tente ajustar os filtros para ver mais produtos.'}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        Limpar todos os filtros
                      </button>
                    )}
                    <Link href="/busca" className="bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors">
                      Ver todos os produtos
                    </Link>
                  </div>
                </div>
                {/* Suggest popular categories */}
                <div className="border-t border-gray-100 px-6 py-5 bg-gray-50">
                  <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Talvez você se interesse por</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: '🛒 Ofertas do Dia', href: '/busca?sort=discount' },
                      { label: '❄️ Geladeiras', href: '/c/geladeiras' },
                      { label: '📺 TVs', href: '/c/tvs' },
                      { label: '💻 Notebooks', href: '/c/notebooks' },
                      { label: '📱 Smartphones', href: '/c/smartphones' },
                      { label: '🌬️ Ar Condicionado', href: '/c/climatizacao' },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full hover:border-blue-300 hover:text-blue-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className={layout === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3' : 'space-y-3'}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} variant={layout === 'list' ? 'list' : 'grid'} />
=======
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
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
