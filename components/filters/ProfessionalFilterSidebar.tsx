'use client'

import { useState } from 'react'
import { ChevronDown, X, SlidersHorizontal, RotateCcw } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { products } from '@/data/products'

export interface FiltersState {
  priceMin: number
  priceMax: number
  brands: string[]
  condition: string[]
  rating: number
  freeShipping: boolean
}

interface ProfessionalFilterSidebarProps {
  onFilterChange: (filters: FiltersState) => void
  isOpen?: boolean
  onClose?: () => void
}

export function ProfessionalFilterSidebar({
  onFilterChange,
  isOpen = true,
  onClose,
}: ProfessionalFilterSidebarProps) {
  const [filters, setFilters] = useState<FiltersState>({
    priceMin: 0,
    priceMax: 10000,
    brands: [],
    condition: [],
    rating: 0,
    freeShipping: false,
  })

  const [expanded, setExpanded] = useState({
    price: true,
    brands: true,
    condition: false,
    rating: false,
    shipping: false,
  })

  const uniqueBrands = [...new Set(products.map(p => p.brand))].sort()
  const activeCount = Object.values(filters).filter(v =>
    Array.isArray(v) ? v.length > 0 : v !== 0 && v !== false
  ).length

  const updateFilters = (newFilters: Partial<FiltersState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFilterChange(updated)
  }

  const clearAll = () => {
    const cleared: FiltersState = {
      priceMin: 0,
      priceMax: 10000,
      brands: [],
      condition: [],
      rating: 0,
      freeShipping: false,
    }
    setFilters(cleared)
    onFilterChange(cleared)
  }

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <>
      {/* Mobile overlay */}
      {!isOpen && onClose && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onClose} />
      )}

      {/* TRULY FIXED SIDEBAR - Independent from page scroll */}
      <aside
        className={`fixed left-0 top-[120px] w-96 h-[calc(100vh-120px)] bg-white border-r-2 border-gray-200 shadow-2xl z-40 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-50 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile close button */}
        <div className="sticky top-0 lg:hidden bg-white border-b-2 border-gray-100 p-4 flex justify-end">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header - Gradient with icon */}
        <div className="sticky top-0 lg:top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 border-b-4 border-indigo-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-2xl">Filtros</h2>
              {activeCount > 0 && <p className="text-sm text-indigo-100 font-medium">{activeCount} ativo(s)</p>}
            </div>
          </div>
          
          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold text-sm transition backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Limpar todos
            </button>
          )}
        </div>

        {/* Filters - Spacious layout */}
        <div className="p-8 space-y-8">
          {/* PREÇO */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between font-bold text-gray-900 text-lg hover:text-blue-600 transition"
            >
              <span className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                Preço
              </span>
              <ChevronDown className={`w-5 h-5 transition ${expanded.price ? 'rotate-180' : ''}`} />
            </button>
            
            {expanded.price && (
              <div className="space-y-4 pl-6">
                <Slider
                  value={[filters.priceMin, filters.priceMax]}
                  onValueChange={(v) => updateFilters({ priceMin: v[0], priceMax: v[1] })}
                  min={0}
                  max={10000}
                  step={100}
                  className="w-full"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-600 mb-1 font-semibold">Mínimo</p>
                    <p className="text-lg font-bold text-green-600">R$ {filters.priceMin}</p>
                  </div>
                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-600 mb-1 font-semibold">Máximo</p>
                    <p className="text-lg font-bold text-green-600">R$ {filters.priceMax}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* MARCAS */}
          <div className="space-y-4 border-t-2 border-gray-100 pt-6">
            <button
              onClick={() => toggleSection('brands')}
              className="w-full flex items-center justify-between font-bold text-gray-900 text-lg hover:text-orange-600 transition"
            >
              <span className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                Marcas ({filters.brands.length})
              </span>
              <ChevronDown className={`w-5 h-5 transition ${expanded.brands ? 'rotate-180' : ''}`} />
            </button>
            
            {expanded.brands && (
              <div className="space-y-3 pl-6 max-h-48 overflow-y-auto">
                {uniqueBrands.map(brand => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={() => {
                        const updated = filters.brands.includes(brand)
                          ? filters.brands.filter(b => b !== brand)
                          : [...filters.brands, brand]
                        updateFilters({ brands: updated })
                      }}
                      className="w-5 h-5 group-hover:border-orange-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-orange-600 transition font-medium">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* CONDIÇÃO */}
          <div className="space-y-4 border-t-2 border-gray-100 pt-6">
            <button
              onClick={() => toggleSection('condition')}
              className="w-full flex items-center justify-between font-bold text-gray-900 text-lg hover:text-purple-600 transition"
            >
              <span className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                Condição
              </span>
              <ChevronDown className={`w-5 h-5 transition ${expanded.condition ? 'rotate-180' : ''}`} />
            </button>
            
            {expanded.condition && (
              <div className="space-y-3 pl-6">
                {['novo', 'seminovo'].map(cond => (
                  <label key={cond} className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox
                      checked={filters.condition.includes(cond)}
                      onCheckedChange={() => {
                        const updated = filters.condition.includes(cond)
                          ? filters.condition.filter(c => c !== cond)
                          : [...filters.condition, cond]
                        updateFilters({ condition: updated })
                      }}
                      className="w-5 h-5 group-hover:border-purple-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-purple-600 transition font-medium capitalize">
                      {cond === 'novo' ? 'Novo' : 'Seminovo'}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* AVALIAÇÃO */}
          <div className="space-y-4 border-t-2 border-gray-100 pt-6">
            <button
              onClick={() => toggleSection('rating')}
              className="w-full flex items-center justify-between font-bold text-gray-900 text-lg hover:text-yellow-600 transition"
            >
              <span className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                Avaliação
              </span>
              <ChevronDown className={`w-5 h-5 transition ${expanded.rating ? 'rotate-180' : ''}`} />
            </button>
            
            {expanded.rating && (
              <div className="space-y-3 pl-6">
                {[5, 4, 3].map(rating => (
                  <button
                    key={rating}
                    onClick={() => updateFilters({ rating: filters.rating === rating ? 0 : rating })}
                    className={`w-full text-left p-3 rounded-lg transition font-medium text-sm flex items-center gap-2 ${
                      filters.rating === rating
                        ? 'bg-yellow-100 border-2 border-yellow-500 text-yellow-700'
                        : 'bg-gray-50 border-2 border-gray-200 text-gray-700 hover:bg-yellow-50'
                    }`}
                  >
                    <span className="flex gap-0.5">
                      {[...Array(rating)].map((_, i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
                    </span>
                    {rating}+ estrelas
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* FRETE */}
          <div className="space-y-4 border-t-2 border-gray-100 pt-6">
            <button
              onClick={() => toggleSection('shipping')}
              className="w-full flex items-center justify-between font-bold text-gray-900 text-lg hover:text-red-600 transition"
            >
              <span className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                Frete Grátis
              </span>
              <ChevronDown className={`w-5 h-5 transition ${expanded.shipping ? 'rotate-180' : ''}`} />
            </button>
            
            {expanded.shipping && (
              <div className="space-y-3 pl-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox
                    checked={filters.freeShipping}
                    onCheckedChange={() => updateFilters({ freeShipping: !filters.freeShipping })}
                    className="w-5 h-5 group-hover:border-red-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-red-600 transition font-medium">
                    Apenas frete grátis
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-t from-gray-50 to-white border-t-2 border-gray-200 p-8">
          <button
            onClick={clearAll}
            disabled={activeCount === 0}
            className="w-full py-4 px-6 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-all bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-5 h-5" />
            Limpar Todos
          </button>
        </div>
      </aside>
    </>
  )
}
