'use client'

import { useState, useMemo, use } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Grid3x3, List, SlidersHorizontal, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/ProductCard'
import { ServiceCard } from '@/components/services/ServiceCard'
import { ServicesSummary } from '@/components/services/ServicesSummary'
import {
  ProfessionalFilterSidebar,
  FiltersState,
} from '@/components/filters/ProfessionalFilterSidebar'
import { ServiceModeSelector, type ServiceMode } from '@/components/services/ServiceModeSelector'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import { getServicesByType } from '@/data/services'
import { getCategoryBySlug, getSubcategorySlugs } from '@/lib/utils/categories'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get mode from URL or default to 'buy'
  const modeParam = searchParams.get('mode') as ServiceMode | null
  const [mode, setMode] = useState<ServiceMode>(modeParam || 'buy')
  
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('relevancia')
  const [mobileOpen, setMobileOpen] = useState(false)
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

  const handleModeChange = (newMode: ServiceMode) => {
    setMode(newMode)
    // Update URL with mode query param
    const params = new URLSearchParams(searchParams)
    params.set('mode', newMode)
    router.push(`?${params.toString()}`)
  }

  const categoryData = getCategoryBySlug(slug)
  const applicableSubcategorySlugs = getSubcategorySlugs(slug)

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      // If viewing a parent category, check if product's category is in its subcategories
      // If viewing a leaf category, check exact match
      if (!applicableSubcategorySlugs.includes(p.categorySlug)) return false
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
          const dA = ((a.originalPrice - a.price) / a.originalPrice) * 100
          const dB = ((b.originalPrice - b.price) / b.originalPrice) * 100
          return dB - dA
        })
      case 'melhor-avaliacao':
        return result.sort((a, b) => b.rating - a.rating)
      default:
        return result
    }
  }, [filters, sortBy, applicableSubcategorySlugs])

  if (!categoryData) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Categoria não encontrada</h1>
          <p className="text-sm text-gray-600 mb-6">Confira nossas categorias:</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`/c/${cat.slug}`}
                className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100"
              >
                <span className="text-sm font-semibold text-blue-700">{cat.name}</span>
              </Link>
            ))}
          </div>
          <Link href="/busca">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              Ver Todos os Produtos
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb + Title */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{categoryData.name}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{categoryData.name}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {categoryData.description} - {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Layout: Sidebar + Content */}
        <div className="flex gap-6 items-start">
          {/* Desktop Sidebar */}
          <ProfessionalFilterSidebar
            currentCategory={slug}
            onFilterChange={setFilters}
            isOpen={true}
          />

          {/* Mobile Sidebar */}
          <ProfessionalFilterSidebar
            currentCategory={slug}
            onFilterChange={setFilters}
            isOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Service Mode Selector */}
            <div className="mb-4 flex justify-center">
              <ServiceModeSelector currentMode={mode} onModeChange={handleModeChange} />
            </div>

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

            {/* Products/Services Grid */}
            {mode === 'buy' ? (
              // PRODUTOS MODE
              filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200/80">
                  <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-4">
                    Nenhum produto encontrado com os filtros selecionados
                  </p>
                  <Button
                    size="sm"
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
                      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'
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
              )
            ) : (
              // SERVIÇOS MODE (Rental/Maintenance)
              (() => {
                const applicableServices = mode === 'rent'
                  ? getServicesByType('rental')
                  : getServicesByType('maintenance')

                return applicableServices.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-xl border border-gray-200/80">
                    <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-4">
                      Nenhum serviço de {mode === 'rent' ? 'aluguel' : 'manutenção'} disponível nesta categoria
                    </p>
                    <Button
                      size="sm"
                      onClick={() => setMode('buy')}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Voltar para Produtos
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {applicableServices.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        isRental={mode === 'rent'}
                      />
                    ))}
                  </div>
                )
              })()
            )}
          </div>
        </div>
      </div>
      
      {/* Services Summary Floating Panel */}
      <ServicesSummary />
    </main>
  )
}
