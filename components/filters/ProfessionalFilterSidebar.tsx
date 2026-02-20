'use client'

import { useState } from 'react'
import { ChevronDown, X, Filter, RotateCcw } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
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

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brands: true,
    condition: false,
    rating: false,
  })

  const uniqueBrands = [...new Set(products.map(p => p.brand))].sort()
  const activeCount = [
    ...filters.brands,
    ...filters.condition,
    ...filters.categories,
    filters.inStock ? 'inStock' : null,
    filters.freeShipping ? 'freeShipping' : null,
    filters.rating > 0 ? 'rating' : null,
  ].filter(Boolean).length

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleFilterUpdate = (newFilters: FiltersState) => {
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleClearAll = () => {
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

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && onClose && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - FIXED and FLOATING */}
      <aside
        className={`fixed left-0 top-0 w-80 h-screen bg-white/95 backdrop-blur-md z-40 shadow-2xl border-r border-gray-200/50 overflow-hidden transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header - Gradient with glassmorphism */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 z-10 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Filter className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-xl">Filtros</h2>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm"
                aria-label="Fechar filtros"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {activeCount > 0 && (
            <div className="flex items-center justify-between text-sm bg-white/20 rounded-lg p-2 backdrop-blur-sm">
              <span className="font-semibold">{activeCount} filtro(s) ativo(s)</span>
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1 hover:bg-white/20 px-2 py-1 rounded transition text-xs font-bold"
              >
                <RotateCcw className="w-3 h-3" />
                Limpar
              </button>
            </div>
          )}
        </div>

        {/* Scrollable Content with padding */}
        <div className="overflow-y-auto h-[calc(100vh-180px)] px-6 py-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-300/50 scrollbar-track-transparent">
          
          {/* PRICE FILTER */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between group"
            >
              <span className="flex items-center gap-3 font-bold text-gray-900 text-base">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"></span>
                Preço
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.price && (
              <div className="space-y-4 pl-5">
                <Slider
                  value={[filters.priceMin, filters.priceMax]}
                  onValueChange={(values) => handleFilterUpdate({ ...filters, priceMin: values[0], priceMax: values[1] })}
                  min={0}
                  max={10000}
                  step={100}
                  className="w-full"
                />
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200/50">
                    <span className="text-xs text-gray-600 font-medium">Mínimo</span>
                    <p className="font-bold text-green-700 text-base">R$ {filters.priceMin}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200/50">
                    <span className="text-xs text-gray-600 font-medium">Máximo</span>
                    <p className="font-bold text-green-700 text-base">R$ {filters.priceMax}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100"></div>

          {/* BRANDS FILTER */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('brands')}
              className="w-full flex items-center justify-between group"
            >
              <span className="flex items-center gap-3 font-bold text-gray-900 text-base">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></span>
                Marcas
                {filters.brands.length > 0 && (
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">
                    {filters.brands.length}
                  </span>
                )}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.brands ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.brands && (
              <div className="space-y-2 pl-5 max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300/50">
                {uniqueBrands.map(brand => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition">
                    <Checkbox
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={() => {
                        const newBrands = filters.brands.includes(brand)
                          ? filters.brands.filter(b => b !== brand)
                          : [...filters.brands, brand]
                        handleFilterUpdate({ ...filters, brands: newBrands })
                      }}
                      className="border-2 group-hover:border-orange-500 transition"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-orange-600 font-medium transition">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-gray-100"></div>

          {/* CONDITION FILTER */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('condition')}
              className="w-full flex items-center justify-between group"
            >
              <span className="flex items-center gap-3 font-bold text-gray-900 text-base">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500"></span>
                Condição
                {filters.condition.length > 0 && (
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">
                    {filters.condition.length}
                  </span>
                )}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.condition ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.condition && (
              <div className="space-y-2 pl-5">
                {[{ value: 'novo', label: 'Novo' }, { value: 'seminovo', label: 'Seminovo' }].map(cond => (
                  <label key={cond.value} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition">
                    <Checkbox
                      checked={filters.condition.includes(cond.value)}
                      onCheckedChange={() => {
                        const newConditions = filters.condition.includes(cond.value)
                          ? filters.condition.filter(c => c !== cond.value)
                          : [...filters.condition, cond.value]
                        handleFilterUpdate({ ...filters, condition: newConditions })
                      }}
                      className="border-2 group-hover:border-purple-500 transition"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-purple-600 font-medium transition">
                      {cond.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-gray-100"></div>

          {/* RATING FILTER */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('rating')}
              className="w-full flex items-center justify-between group"
            >
              <span className="flex items-center gap-3 font-bold text-gray-900 text-base">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"></span>
                Avaliação
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.rating && (
              <div className="space-y-2 pl-5">
                {[5, 4, 3].map(rating => (
                  <button
                    key={rating}
                    onClick={() => handleFilterUpdate({ ...filters, rating: filters.rating === rating ? 0 : rating })}
                    className={`w-full text-left p-3 rounded-lg transition flex items-center gap-2 ${
                      filters.rating === rating
                        ? 'bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-300 shadow-sm'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <span className="flex gap-0.5">
                      {[...Array(rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                    </span>
                    <span className={`text-sm font-medium ${filters.rating === rating ? 'text-yellow-800' : 'text-gray-700'}`}>
                      {rating}+ estrelas
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-gray-100"></div>

          {/* SHIPPING & STOCK */}
          <div className="space-y-3">
            <span className="flex items-center gap-3 font-bold text-gray-900 text-base">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500"></span>
              Entrega
            </span>
            <div className="space-y-2 pl-5">
              <label className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition">
                <Checkbox
                  checked={filters.freeShipping}
                  onCheckedChange={() => handleFilterUpdate({ ...filters, freeShipping: !filters.freeShipping })}
                  className="border-2 group-hover:border-blue-500 transition"
                />
                <span className="text-sm text-gray-700 group-hover:text-blue-600 font-medium transition">
                  Frete Grátis
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition">
                <Checkbox
                  checked={filters.inStock}
                  onCheckedChange={() => handleFilterUpdate({ ...filters, inStock: !filters.inStock })}
                  className="border-2 group-hover:border-blue-500 transition"
                />
                <span className="text-sm text-gray-700 group-hover:text-blue-600 font-medium transition">
                  Apenas em estoque
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer - Absolute at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent border-t border-gray-200/50 px-6 py-4 backdrop-blur-sm">
          <Button 
            onClick={handleClearAll}
            variant="outline"
            className="w-full font-bold border-2 hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-all"
            disabled={activeCount === 0}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Limpar Todos os Filtros
          </Button>
        </div>
      </aside>
    </>
  )
}
