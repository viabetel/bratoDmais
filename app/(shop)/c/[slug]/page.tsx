'use client'

import { useState, useMemo, use, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Grid3x3, List, SlidersHorizontal, Package, ArrowRight, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/ProductCard'
import { ServiceCard } from '@/components/services/ServiceCard'
import { ServicesSummary } from '@/components/services/ServicesSummary'
import {
  ProfessionalFilterSidebar,
  FiltersState,
} from '@/components/filters/ProfessionalFilterSidebar'
import { ActiveFilterChips } from '@/components/filters/ActiveFilterChips'
import { ServiceModeSelector, type ServiceMode } from '@/components/services/ServiceModeSelector'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import { getServicesByType, getServicesByCategory } from '@/data/services'
import { getCategoryBySlug, getSubcategorySlugs } from '@/lib/utils/categories'

// Category hero config: gradient + description
const CATEGORY_HERO: Record<string, { gradient: string; emoji: string; headline: string }> = {
  'eletrodomesticos': { gradient: 'from-blue-600 to-blue-800', emoji: '🏠', headline: 'Tudo para equipar sua casa' },
  'geladeiras': { gradient: 'from-cyan-500 to-blue-700', emoji: '❄️', headline: 'Conserve melhor com tecnologia Frost Free' },
  'fogoes': { gradient: 'from-orange-500 to-red-700', emoji: '🔥', headline: 'Cozinhe com precisão e potência' },
  'microondas': { gradient: 'from-purple-600 to-purple-800', emoji: '⚡', headline: 'Praticidade em cada uso' },
  'maquinas-lavar': { gradient: 'from-indigo-500 to-blue-700', emoji: '🌊', headline: 'Lavagem eficiente e econômica' },
  'climatizacao': { gradient: 'from-cyan-400 to-blue-600', emoji: '💨', headline: 'Conforto térmico o ano todo' },
  'tvs': { gradient: 'from-gray-700 to-gray-900', emoji: '📺', headline: 'Imagem e som de cinema em casa' },
  'notebooks': { gradient: 'from-indigo-600 to-purple-700', emoji: '💻', headline: 'Performance para trabalho e estudo' },
  'smartphones': { gradient: 'from-rose-500 to-pink-700', emoji: '📱', headline: 'Conectividade na palma da mão' },
  'eletronicos': { gradient: 'from-violet-600 to-purple-800', emoji: '⚙️', headline: 'Tecnologia de ponta' },
  'utilidades': { gradient: 'from-green-500 to-emerald-700', emoji: '🌿', headline: 'Utilidades para o dia a dia' },
}

const ITEMS_PER_PAGE = 12

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()

  // ── Calculados antes dos useState para que possam ser usados nos inits ──
  const categoryData     = getCategoryBySlug(slug)
  const subcategorySlugs = getSubcategorySlugs(slug)
  // Fallback seguro: se por algum motivo slug for inválido, usa o próprio slug
  const resolvedSlugs    = subcategorySlugs.length ? subcategorySlugs : [slug]

  // ── Leitura do estado da URL (torna as URLs compartilháveis e back/forward funcionais) ──
  const modeParam    = searchParams.get('mode') as ServiceMode | null
  const sortParam    = searchParams.get('sort') || 'relevancia'
  const layoutParam  = (searchParams.get('layout') || 'grid') as 'grid' | 'list'
  const brandsParam  = searchParams.get('brands')?.split(',').filter(Boolean) ?? []
  const condParam    = searchParams.get('cond')?.split(',').filter(Boolean)   ?? []
  const priceMinP    = Number(searchParams.get('priceMin'))  || 0
  const priceMaxP    = Number(searchParams.get('priceMax'))  || 10000
  const inStockP     = searchParams.get('inStock') === '1'
  const freeShipP    = searchParams.get('freeShip') === '1'
  const ratingP      = Number(searchParams.get('rating'))   || 0

  const [mode,       setMode]       = useState<ServiceMode>(modeParam || 'buy')
  const [layout,     setLayout]     = useState<'grid' | 'list'>(layoutParam)
  const [sortBy,     setSortBy]     = useState(sortParam)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [page,       setPage]       = useState(1)
  const [filters, setFilters] = useState<FiltersState>({
    priceMin:    priceMinP,
    priceMax:    priceMaxP,
    brands:      brandsParam,
    condition:   condParam,
    categories:  resolvedSlugs,   // ← usa resolvedSlugs, declarado acima
    inStock:     inStockP,
    rating:      ratingP,
    freeShipping: freeShipP,
  })

  // ── Helper: serializa estado atual para URL ──
  const buildParams = (
    patch: Partial<{
      mode: ServiceMode; sort: string; layout: string;
      brands: string[]; cond: string[]; priceMin: number; priceMax: number;
      inStock: boolean; freeShip: boolean; rating: number;
    }> = {}
  ) => {
    const cur = {
      mode:     patch.mode     ?? mode,
      sort:     patch.sort     ?? sortBy,
      layout:   patch.layout   ?? layout,
      brands:   patch.brands   ?? filters.brands,
      cond:     patch.cond     ?? filters.condition,
      priceMin: patch.priceMin ?? filters.priceMin,
      priceMax: patch.priceMax ?? filters.priceMax,
      inStock:  patch.inStock  ?? filters.inStock,
      freeShip: patch.freeShip ?? filters.freeShipping,
      rating:   patch.rating   ?? filters.rating,
    }
    const p = new URLSearchParams()
    if (cur.mode   !== 'buy')        p.set('mode',      cur.mode)
    if (cur.sort   !== 'relevancia') p.set('sort',      cur.sort)
    if (cur.layout !== 'grid')       p.set('layout',    cur.layout)
    if (cur.brands.length)           p.set('brands',    cur.brands.join(','))
    if (cur.cond.length)             p.set('cond',      cur.cond.join(','))
    if (cur.priceMin > 0)            p.set('priceMin',  String(cur.priceMin))
    if (cur.priceMax < 10000)        p.set('priceMax',  String(cur.priceMax))
    if (cur.inStock)                 p.set('inStock',   '1')
    if (cur.freeShip)                p.set('freeShip',  '1')
    if (cur.rating > 0)              p.set('rating',    String(cur.rating))
    return p.toString()
  }

  const handleModeChange = (newMode: ServiceMode) => {
    setMode(newMode)
    router.push(`?${buildParams({ mode: newMode })}`, { scroll: false })
  }

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort)
    setPage(1)
    router.push(`?${buildParams({ sort: newSort })}`, { scroll: false })
  }

  const handleLayoutChange = (newLayout: 'grid' | 'list') => {
    setLayout(newLayout)
    router.push(`?${buildParams({ layout: newLayout })}`, { scroll: false })
  }

  const handleFiltersChange = (newFilters: FiltersState) => {
    setFilters(newFilters)
    setPage(1)
    router.push(`?${buildParams({
      brands:   newFilters.brands,
      cond:     newFilters.condition,
      priceMin: newFilters.priceMin,
      priceMax: newFilters.priceMax,
      inStock:  newFilters.inStock,
      freeShip: newFilters.freeShipping,
      rating:   newFilters.rating,
    })}`, { scroll: false })
  }

  // ── Re-hidrata state quando searchParams muda (back/forward no browser) ──
  // No App Router o componente NÃO remonta ao navegar, então useState fica
  // travado. Este effect lê a URL atual e atualiza o estado local para mantê-los 1:1.
  useEffect(() => {
    const newMode    = (searchParams.get('mode') as ServiceMode) || 'buy'
    const newSort    = searchParams.get('sort')   || 'relevancia'
    const newLayout  = (searchParams.get('layout') || 'grid') as 'grid' | 'list'
    const newBrands  = searchParams.get('brands')?.split(',').filter(Boolean) ?? []
    const newCond    = searchParams.get('cond')?.split(',').filter(Boolean)   ?? []
    const newPriceMin = Number(searchParams.get('priceMin')) || 0
    const newPriceMax = Number(searchParams.get('priceMax')) || 10000
    const newInStock  = searchParams.get('inStock') === '1'
    const newFreeShip = searchParams.get('freeShip') === '1'
    const newRating   = Number(searchParams.get('rating')) || 0

    setMode(newMode)
    setSortBy(newSort)
    setLayout(newLayout)
    setFilters({
      priceMin:    newPriceMin,
      priceMax:    newPriceMax,
      brands:      newBrands,
      condition:   newCond,
      categories:  resolvedSlugs,
      inStock:     newInStock,
      rating:      newRating,
      freeShipping: newFreeShip,
    })
    setPage(1)
  // searchParams muda a referência a cada navegação — é o trigger correto
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const hero = CATEGORY_HERO[slug] || { gradient: 'from-blue-600 to-blue-800', emoji: '📦', headline: 'Explore nossa coleção' }

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      if (!subcategorySlugs.includes(p.categorySlug)) return false
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false
      if (filters.condition.length > 0 && !filters.condition.includes(p.condition)) return false
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false
      if (filters.inStock && p.stock === 0) return false
      if (filters.freeShipping && p.freeShipping !== true) return false
      if (filters.rating > 0 && p.rating < filters.rating) return false
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
  }, [filters, sortBy, subcategorySlugs])

  // Services filtered by category
  const categoryServices = useMemo(() => {
    if (mode === 'rent') return getServicesByType('rental', slug).length > 0
      ? getServicesByType('rental', slug)
      : getServicesByType('rental')
    if (mode === 'maintenance') return getServicesByType('maintenance', slug).length > 0
      ? getServicesByType('maintenance', slug)
      : getServicesByType('maintenance')
    return []
  }, [mode, slug])

  const paginatedProducts = filteredProducts.slice(0, page * ITEMS_PER_PAGE)
  const hasMore = paginatedProducts.length < filteredProducts.length

  if (!categoryData) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Categoria não encontrada</h1>
          <p className="text-sm text-gray-600 mb-6">Confira nossas categorias:</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {categories.slice(0, 6).map((cat) => (
              <Link key={cat.id} href={`/c/${cat.slug}`}
                className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100">
                <span className="text-sm font-semibold text-blue-700">{cat.name}</span>
              </Link>
            ))}
          </div>
          <Link href="/busca"><Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Ver Todos</Button></Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Category Hero Banner */}
      <div className={`bg-gradient-to-r ${hero.gradient} py-8 md:py-12`}>
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/70 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">{categoryData.name}</span>
          </nav>

          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-4xl mb-2">{hero.emoji}</div>
              <h1 className="text-2xl md:text-4xl font-black text-white mb-1">{categoryData.name}</h1>
              <p className="text-white/80 text-sm md:text-base">{hero.headline}</p>
              <p className="text-white/60 text-xs mt-1">{filteredProducts.length} produtos disponíveis</p>
            </div>

            {/* Quick stats */}
            <div className="hidden md:flex gap-4">
              {[
                { label: 'Produtos', value: filteredProducts.length },
                { label: 'Com frete grátis', value: filteredProducts.filter(p => p.freeShipping).length },
                { label: 'Em promoção', value: filteredProducts.filter(p => p.originalPrice > p.price).length },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center border border-white/20">
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="text-white/70 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subcategory pills */}
          {categoryData.subcategories && categoryData.subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              <Link href={`/c/${slug}`}
                className="px-3 py-1.5 bg-white text-blue-700 rounded-full text-xs font-bold hover:bg-blue-50 transition-colors">
                Todos
              </Link>
              {categoryData.subcategories.map(sub => (
                <Link key={sub.id} href={`/busca?categoria=${sub.slug}`}
                  className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs font-semibold transition-colors border border-white/30">
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6 items-start">
          {/* Desktop Sidebar */}
          <ProfessionalFilterSidebar
            currentCategory={slug}
            onFilterChange={(f) => handleFiltersChange(f)}
            isOpen={true}
          />

          {/* Mobile Sidebar */}
          <ProfessionalFilterSidebar
            currentCategory={slug}
            onFilterChange={(f) => handleFiltersChange(f)}
            isOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Service Mode Selector */}
            <div className="mb-4">
              <ServiceModeSelector currentMode={mode} onModeChange={handleModeChange} />
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-5 bg-white rounded-xl border border-gray-200/80 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="lg:hidden text-xs h-8" onClick={() => setMobileOpen(true)}>
                  <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" /> Filtros
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 hidden sm:inline">Ordenar:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
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
                {[['grid', Grid3x3], ['list', List]].map(([val, Icon]) => (
                  <button key={val as string}
                    onClick={() => handleLayoutChange(val as 'grid' | 'list')}
                    className={`p-1.5 rounded-md transition-colors ${layout === val ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                  >
                    {/* @ts-ignore */}
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Products / Services */}
            {mode === 'buy' ? (
              filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200/80">
                  <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-4">Nenhum produto encontrado</p>
                  <Button size="sm" onClick={() => handleFiltersChange({ priceMin: 0, priceMax: 10000, brands: [], condition: [], categories: resolvedSlugs, inStock: false, rating: 0, freeShipping: false })}
                    className="bg-blue-600 hover:bg-blue-700 text-white">
                    Limpar Filtros
                  </Button>
                </div>
              ) : (
                <>
                  {/* Active filter chips */}
                  <ActiveFilterChips
                    filters={filters}
                    onRemoveBrand={(b) => handleFiltersChange({ ...filters, brands: filters.brands.filter(x => x !== b) })}
                    onRemoveCondition={(c) => handleFiltersChange({ ...filters, condition: filters.condition.filter(x => x !== c) })}
                    onRemoveService={(s) => handleFiltersChange({ ...filters, serviceTypes: (filters.serviceTypes ?? []).filter(x => x !== s) })}
                    onClearPrice={() => handleFiltersChange({ ...filters, priceMin: 0, priceMax: 10000 })}
                    onToggleInStock={() => handleFiltersChange({ ...filters, inStock: !filters.inStock })}
                    onToggleFreeShipping={() => handleFiltersChange({ ...filters, freeShipping: !filters.freeShipping })}
                    onClearRating={() => handleFiltersChange({ ...filters, rating: 0 })}
                    onClearAll={() => handleFiltersChange({ priceMin: 0, priceMax: 10000, brands: [], condition: [], categories: resolvedSlugs, inStock: false, rating: 0, freeShipping: false })}
                  />
                  <div className={layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-3'}>
                    {paginatedProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        variant={layout === 'list' ? 'list' : 'grid'}
                        intentHref={mode !== 'buy' ? `/p/${product.slug}?intent=${mode}` : undefined}
                      />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="mt-8 text-center">
                      <p className="text-sm text-gray-500 mb-3">Mostrando {paginatedProducts.length} de {filteredProducts.length}</p>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4 max-w-xs mx-auto">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(paginatedProducts.length / filteredProducts.length) * 100}%` }} />
                      </div>
                      <Button onClick={() => setPage(p => p + 1)} variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold px-8">
                        Carregar mais <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </>
              )
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(categoryServices as any[]).map(service => (
                  <ServiceCard key={service.id} service={service} isRental={mode === 'rent'} />
                ))}
                {(categoryServices as any[]).length === 0 && (
                  <div className="col-span-full text-center py-12 bg-white rounded-xl border">
                    <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm">Nenhum serviço disponível para esta seleção</p>
                    <Button size="sm" onClick={() => handleModeChange('buy')} className="mt-4 bg-blue-600 text-white">Ver Produtos</Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <ServicesSummary />
    </main>
  )
}
