'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, X, SlidersHorizontal, RotateCcw, Truck, Star, Wrench, Calendar, Shield, Award } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { products } from '@/data/products'
import { getSubcategorySlugs } from '@/lib/utils/categories'

export interface FiltersState {
  priceMin: number
  priceMax: number
  brands: string[]
  condition: string[]
  categories: string[]
  inStock: boolean
  rating: number
  freeShipping: boolean
  serviceTypes?: string[]
}

interface ProfessionalFilterSidebarProps {
  currentCategory?: string
  onFilterChange: (filters: FiltersState) => void
  isOpen?: boolean
  onClose?: () => void
  initialFilters?: Partial<FiltersState>
}

const DEFAULT_FILTERS: FiltersState = {
  priceMin: 0, priceMax: 10000, brands: [], condition: [],
  categories: [], inStock: false, rating: 0, freeShipping: false,
}

// Quick price range presets
const PRICE_PRESETS = [
  { label: 'Até R$199', min: 0, max: 199 },
  { label: 'Até R$499', min: 0, max: 499 },
  { label: 'Até R$999', min: 0, max: 999 },
  { label: 'Até R$1.999', min: 0, max: 1999 },
]

// Product conditions in the actual data
const CONDITIONS = [
  { value: 'novo', label: 'Novo', icon: '✨', color: 'green' },
  { value: 'reembalado', label: 'Reembalado', icon: '📦', color: 'amber' },
  { value: 'remanufaturado', label: 'Remanufaturado', icon: '🔧', color: 'blue' },
]

function FilterSection({
  title, colorClass, count, expanded, onToggle, children,
}: {
  title: string; colorClass: string; count?: number; expanded: boolean; onToggle: () => void; children: React.ReactNode
}) {
  return (
    <div className="border-b border-gray-100 pb-4 last:border-b-0">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-2.5 group">
        <span className="flex items-center gap-2.5 text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
          <span className={`w-2 h-2 rounded-full ${colorClass}`} />
          {title}
          {count !== undefined && count > 0 && (
            <span className="text-[11px] bg-blue-100 text-blue-700 w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {count}
            </span>
          )}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${expanded ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pt-2">{children}</div>
      </div>
    </div>
  )
}

export function ProfessionalFilterSidebar({
  currentCategory, onFilterChange, isOpen = true, onClose, initialFilters,
}: ProfessionalFilterSidebarProps) {
  const [filters, setFilters] = useState<FiltersState>({
    ...DEFAULT_FILTERS,
    categories: currentCategory ? [currentCategory] : [],
    ...initialFilters,
  })

  const [sections, setSections] = useState({
    price: true, brands: true, condition: true, rating: false, shipping: false,
  })
  const [brandSearch, setBrandSearch] = useState('')

  // Get brands relevant to current category
  // Produtos relevantes para esta categoria (pai ou subcategoria)
  // getSubcategorySlugs já inclui o slug pai + subcategorias, então funciona para ambos os casos
  const relevantSlugs = currentCategory ? getSubcategorySlugs(currentCategory) : []
  const relevantProducts = currentCategory
    ? products.filter(p => relevantSlugs.includes(p.categorySlug))
    : products

  const uniqueBrands = [...new Set(relevantProducts.map(p => p.brand))].sort()
  const filteredBrands = brandSearch
    ? uniqueBrands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()))
    : uniqueBrands

  // Count products per brand (for this filter state)
  const brandCounts = uniqueBrands.reduce((acc, brand) => {
    acc[brand] = relevantProducts.filter(p => p.brand === brand).length
    return acc
  }, {} as Record<string, number>)

  const activeCount = [
    ...filters.brands, ...filters.condition,
    filters.inStock ? 'x' : null, filters.freeShipping ? 'x' : null,
    filters.rating > 0 ? 'x' : null,
    filters.priceMin > 0 ? 'x' : null, filters.priceMax < 10000 ? 'x' : null,
  ].filter(Boolean).length

  const toggle = (key: keyof typeof sections) => setSections(s => ({ ...s, [key]: !s[key] }))

  const update = (patch: Partial<FiltersState>) => {
    const next = { ...filters, ...patch }
    setFilters(next)
    onFilterChange(next)
  }

  const clearAll = () => {
    const cleared: FiltersState = {
      ...DEFAULT_FILTERS,
      // usa relevantSlugs para que o reset não deixe categoria pai "órfã"
      categories: relevantSlugs.length > 0 ? relevantSlugs : [],
    }
    setFilters(cleared)
    onFilterChange(cleared)
  }

  const content = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3.5 border-b border-gray-100 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <SlidersHorizontal className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">Filtros</h2>
              {activeCount > 0 && (
                <p className="text-[11px] text-blue-600 font-medium">{activeCount} ativo{activeCount > 1 ? 's' : ''}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeCount > 0 && (
              <button onClick={clearAll} className="text-[11px] text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 transition-colors">
                <RotateCcw className="w-3 h-3" /> Limpar
              </button>
            )}
            {onClose && (
              <button onClick={onClose} className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable filters */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* Price */}
        <FilterSection title="Faixa de Preço" colorClass="bg-emerald-500" expanded={sections.price} onToggle={() => toggle('price')}>
          {/* Quick presets */}
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {PRICE_PRESETS.map(preset => {
              const active = filters.priceMax === preset.max && filters.priceMin === preset.min
              return (
                <button
                  key={preset.max}
                  onClick={() => update({ priceMin: preset.min, priceMax: preset.max })}
                  className={`text-[11px] font-semibold px-2 py-1.5 rounded-lg border transition-all ${
                    active ? 'bg-emerald-600 text-white border-emerald-600' : 'border-gray-200 text-gray-600 hover:border-emerald-400 hover:bg-emerald-50'
                  }`}
                >
                  {preset.label}
                </button>
              )
            })}
          </div>

          <Slider
            value={[filters.priceMin, filters.priceMax]}
            onValueChange={(v) => update({ priceMin: v[0], priceMax: v[1] })}
            min={0} max={10000} step={50}
            className="w-full mb-3"
          />

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Mínimo', key: 'priceMin' as const, val: filters.priceMin },
              { label: 'Máximo', key: 'priceMax' as const, val: filters.priceMax },
            ].map(({ label, key, val }) => (
              <div key={key}>
                <label className="text-[11px] font-semibold text-gray-500 mb-1 block">{label}</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-semibold">R$</span>
                  <input
                    type="number"
                    value={val}
                    onChange={(e) => {
                      const n = parseInt(e.target.value) || 0
                      if (key === 'priceMin' && n <= filters.priceMax) update({ priceMin: n })
                      if (key === 'priceMax' && n >= filters.priceMin) update({ priceMax: n })
                    }}
                    className="w-full pl-7 pr-2 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Brands */}
        <FilterSection title="Marcas" colorClass="bg-orange-500" count={filters.brands.length} expanded={sections.brands} onToggle={() => toggle('brands')}>
          {uniqueBrands.length > 5 && (
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Buscar marca..."
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                className="w-full pl-3 pr-8 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 bg-gray-50"
              />
              {brandSearch && (
                <button
                  onClick={() => setBrandSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}
          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
            {filteredBrands.map(brand => (
              <label key={brand} className="flex items-center justify-between gap-2 cursor-pointer py-1.5 px-2 rounded-lg hover:bg-orange-50 transition-colors group">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={() => {
                      const next = filters.brands.includes(brand)
                        ? filters.brands.filter(b => b !== brand)
                        : [...filters.brands, brand]
                      update({ brands: next })
                    }}
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-gray-700 font-medium group-hover:text-orange-700 transition-colors">{brand}</span>
                </div>
                <span className="text-[11px] text-gray-400 font-medium flex-shrink-0">{brandCounts[brand]}</span>
              </label>
            ))}
            {filteredBrands.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-2">Nenhuma marca encontrada</p>
            )}
          </div>
        </FilterSection>

        {/* Condition */}
        <FilterSection title="Condição" colorClass="bg-purple-500" count={filters.condition.length} expanded={sections.condition} onToggle={() => toggle('condition')}>
          <div className="space-y-1.5">
            {CONDITIONS.map(c => (
              <label key={c.value} className="flex items-center gap-2.5 cursor-pointer py-2 px-2 rounded-lg hover:bg-purple-50 transition-colors group">
                <Checkbox
                  checked={filters.condition.includes(c.value)}
                  onCheckedChange={() => {
                    const next = filters.condition.includes(c.value)
                      ? filters.condition.filter(x => x !== c.value)
                      : [...filters.condition, c.value]
                    update({ condition: next })
                  }}
                  className="h-4 w-4"
                />
                <span className="text-base">{c.icon}</span>
                <span className="text-sm text-gray-700 font-medium group-hover:text-purple-700 transition-colors">{c.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Avaliação Mínima" colorClass="bg-amber-500" expanded={sections.rating} onToggle={() => toggle('rating')}>
          <div className="space-y-1.5">
            {[5, 4, 3].map(r => (
              <button
                key={r}
                onClick={() => update({ rating: filters.rating === r ? 0 : r })}
                className={`w-full flex items-center gap-2 py-2 px-2 rounded-lg text-left transition-all border-2 ${
                  filters.rating === r ? 'bg-amber-50 border-amber-400' : 'border-transparent hover:bg-amber-50/60'
                }`}
              >
                <span className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < r ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                  ))}
                </span>
                <span className="text-xs text-gray-700 font-medium">{r}+ estrelas</span>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Shipping & Stock */}
        <FilterSection title="Entrega & Estoque" colorClass="bg-blue-500" expanded={sections.shipping} onToggle={() => toggle('shipping')}>
          <div className="space-y-2">
            {[
              { checked: filters.freeShipping, label: 'Frete Grátis', icon: <Truck className="w-4 h-4 text-green-600" />, key: 'freeShipping' as const },
              { checked: filters.inStock, label: 'Em Estoque', icon: <span className="text-base">📦</span>, key: 'inStock' as const },
            ].map(({ checked, label, icon, key }) => (
              <label key={key} className="flex items-center gap-2.5 cursor-pointer py-2 px-2 rounded-lg hover:bg-blue-50 transition-colors group">
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => update({ [key]: !checked })}
                  className="h-4 w-4"
                />
                {icon}
                <span className="text-sm text-gray-700 font-medium group-hover:text-blue-700 transition-colors">{label}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Footer */}
      {activeCount > 0 && (
        <div className="flex-shrink-0 px-4 py-3 border-t border-gray-100 bg-gray-50/60">
          <button onClick={clearAll} className="w-full py-2 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2">
            <RotateCcw className="w-3.5 h-3.5" /> Limpar Todos os Filtros
          </button>
        </div>
      )}
    </div>
  )

  if (onClose) {
    return (
      <>
        {isOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}
        <aside className={`fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-2xl transition-transform duration-300 lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {content}
        </aside>
      </>
    )
  }

  return (
    <aside className="w-56 flex-shrink-0 hidden lg:block">
      <div className="sticky top-[5rem] max-h-[calc(100vh-7rem)] bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col">
        {content}
      </div>
    </aside>
  )
}
