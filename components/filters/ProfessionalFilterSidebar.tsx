'use client'

import { useState } from 'react'
import { ChevronDown, X, SlidersHorizontal, RotateCcw, Truck, Star } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { products } from '@/data/products'

export interface FiltersState {
  priceMin: number
  priceMax: number
  brands: string[]
  condition: string[]
  categories: string[]
  inStock: boolean
  rating: number
  freeShipping: boolean
}

interface ProfessionalFilterSidebarProps {
  currentCategory?: string
  onFilterChange: (filters: FiltersState) => void
  isOpen?: boolean
  onClose?: () => void
}

function FilterSection({
  title,
  color,
  count,
  expanded,
  onToggle,
  children,
}: {
  title: string
  color: string
  count?: number
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2 group"
      >
        <span className="flex items-center gap-2.5 text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
          <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
          {title}
          {count !== undefined && count > 0 && (
            <span className="text-[10px] bg-blue-600 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {count}
            </span>
          )}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          expanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export function ProfessionalFilterSidebar({
  currentCategory,
  onFilterChange,
  isOpen = true,
  onClose,
}: ProfessionalFilterSidebarProps) {
  const [filters, setFilters] = useState<FiltersState>({
    priceMin: 0,
    priceMax: 10000,
    brands: [],
    condition: [],
    categories: currentCategory ? [currentCategory] : [],
    inStock: false,
    rating: 0,
    freeShipping: false,
  })

  const [sections, setSections] = useState({
    price: true,
    brands: true,
    condition: false,
    rating: false,
    shipping: false,
  })

  const uniqueBrands = [...new Set(products.map((p) => p.brand))].sort()

  const activeCount = [
    ...filters.brands,
    ...filters.condition,
    filters.inStock ? 'x' : null,
    filters.freeShipping ? 'x' : null,
    filters.rating > 0 ? 'x' : null,
    filters.priceMin > 0 ? 'x' : null,
    filters.priceMax < 10000 ? 'x' : null,
  ].filter(Boolean).length

  const toggle = (key: keyof typeof sections) =>
    setSections((s) => ({ ...s, [key]: !s[key] }))

  const update = (patch: Partial<FiltersState>) => {
    const next = { ...filters, ...patch }
    setFilters(next)
    onFilterChange(next)
  }

  const clearAll = () => {
    const cleared: FiltersState = {
      priceMin: 0,
      priceMax: 10000,
      brands: [],
      condition: [],
      categories: currentCategory ? [currentCategory] : [],
      inStock: false,
      rating: 0,
      freeShipping: false,
    }
    setFilters(cleared)
    onFilterChange(cleared)
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-5 py-4 border-b border-gray-100 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">Filtros</h2>
              {activeCount > 0 && (
                <p className="text-[11px] text-blue-600 font-medium">
                  {activeCount} ativo{activeCount > 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="text-[11px] text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Limpar
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Fechar filtros"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable filters */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* Price */}
        <FilterSection
          title="Faixa de Preço"
          color="bg-emerald-500"
          expanded={sections.price}
          onToggle={() => toggle('price')}
        >
          <div className="space-y-3 pl-4">
            <Slider
              value={[filters.priceMin, filters.priceMax]}
              onValueChange={(v) => update({ priceMin: v[0], priceMax: v[1] })}
              min={0}
              max={10000}
              step={100}
            />
            <div className="flex gap-2">
              <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                <span className="text-[10px] text-gray-500 block">Min</span>
                <span className="text-xs font-bold text-gray-900">
                  R$ {filters.priceMin.toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                <span className="text-[10px] text-gray-500 block">Max</span>
                <span className="text-xs font-bold text-gray-900">
                  R$ {filters.priceMax.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
        </FilterSection>

        <hr className="border-gray-100" />

        {/* Brands */}
        <FilterSection
          title="Marcas"
          color="bg-orange-500"
          count={filters.brands.length}
          expanded={sections.brands}
          onToggle={() => toggle('brands')}
        >
          <div className="space-y-1 pl-4 max-h-44 overflow-y-auto">
            {uniqueBrands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-2.5 cursor-pointer py-1.5 px-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Checkbox
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={() => {
                    const next = filters.brands.includes(brand)
                      ? filters.brands.filter((b) => b !== brand)
                      : [...filters.brands, brand]
                    update({ brands: next })
                  }}
                  className="h-3.5 w-3.5"
                />
                <span className="text-xs text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <hr className="border-gray-100" />

        {/* Condition */}
        <FilterSection
          title="Condição"
          color="bg-purple-500"
          count={filters.condition.length}
          expanded={sections.condition}
          onToggle={() => toggle('condition')}
        >
          <div className="space-y-1 pl-4">
            {[
              { value: 'novo', label: 'Novo' },
              { value: 'seminovo', label: 'Seminovo' },
            ].map((c) => (
              <label
                key={c.value}
                className="flex items-center gap-2.5 cursor-pointer py-1.5 px-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Checkbox
                  checked={filters.condition.includes(c.value)}
                  onCheckedChange={() => {
                    const next = filters.condition.includes(c.value)
                      ? filters.condition.filter((x) => x !== c.value)
                      : [...filters.condition, c.value]
                    update({ condition: next })
                  }}
                  className="h-3.5 w-3.5"
                />
                <span className="text-xs text-gray-700">{c.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <hr className="border-gray-100" />

        {/* Rating */}
        <FilterSection
          title="Avaliação"
          color="bg-amber-500"
          expanded={sections.rating}
          onToggle={() => toggle('rating')}
        >
          <div className="space-y-1 pl-4">
            {[5, 4, 3].map((r) => (
              <button
                key={r}
                onClick={() => update({ rating: filters.rating === r ? 0 : r })}
                className={`w-full flex items-center gap-2 py-1.5 px-2 rounded-md text-left transition-colors ${
                  filters.rating === r
                    ? 'bg-amber-50 border border-amber-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="flex">
                  {[...Array(r)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </span>
                <span className="text-xs text-gray-600">e acima</span>
              </button>
            ))}
          </div>
        </FilterSection>

        <hr className="border-gray-100" />

        {/* Shipping */}
        <FilterSection
          title="Entrega"
          color="bg-blue-500"
          expanded={sections.shipping}
          onToggle={() => toggle('shipping')}
        >
          <div className="space-y-1 pl-4">
            <label className="flex items-center gap-2.5 cursor-pointer py-1.5 px-2 rounded-md hover:bg-gray-50 transition-colors">
              <Checkbox
                checked={filters.freeShipping}
                onCheckedChange={() =>
                  update({ freeShipping: !filters.freeShipping })
                }
                className="h-3.5 w-3.5"
              />
              <Truck className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs text-gray-700">Frete Grátis</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer py-1.5 px-2 rounded-md hover:bg-gray-50 transition-colors">
              <Checkbox
                checked={filters.inStock}
                onCheckedChange={() => update({ inStock: !filters.inStock })}
                className="h-3.5 w-3.5"
              />
              <span className="text-xs text-gray-700">Em estoque</span>
            </label>
          </div>
        </FilterSection>
      </div>

      {/* Footer */}
      {activeCount > 0 && (
        <div className="flex-shrink-0 px-5 py-3 border-t border-gray-100 bg-gray-50/80">
          <button
            onClick={clearAll}
            className="w-full py-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3 h-3" />
            Limpar todos os filtros
          </button>
        </div>
      )}
    </div>
  )

  // Mobile: full-screen drawer
  if (onClose) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
        <aside
          className={`fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-2xl transition-transform duration-300 lg:hidden ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent}
        </aside>
      </>
    )
  }

  // Desktop: sticky sidebar that starts below header
  return (
    <aside className="w-56 flex-shrink-0 hidden lg:block">
      <div className="sticky top-[9rem] h-[calc(100vh-10rem)] bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
        {sidebarContent}
      </div>
    </aside>
  )
}
