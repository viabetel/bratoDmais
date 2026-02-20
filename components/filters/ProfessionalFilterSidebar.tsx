'use client'

import { useState } from 'react'
import { ChevronDown, X, Filter, RotateCcw } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { products } from '@/data/products'
import { categories } from '@/data/categories'

interface ProfessionalFilterSidebarProps {
  currentCategory?: string
  onFilterChange: (filters: FilterState) => void
  isOpen?: boolean
  onClose?: () => void
}

export interface FilterState {
  priceMin: number
  priceMax: number
  brands: string[]
  condition: string[]
  rating: number
}

export function ProfessionalFilterSidebar({
  onFilterChange,
  isOpen = true,
  onClose,
}: ProfessionalFilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceMin: 0,
    priceMax: 10000,
    brands: [],
    condition: [],
    rating: 0,
  })

  const [expanded, setExpanded] = useState({
    price: true,
    brands: true,
    condition: false,
    rating: false,
  })

  const brands = Array.from(new Set(products.map(p => p.brand)))
    .sort()
    .slice(0, 15)

  const handlePriceChange = (value: number[]) => {
    const updated = { ...filters, priceMin: value[0], priceMax: value[1] }
    setFilters(updated)
    onFilterChange(updated)
  }

  const handleBrandToggle = (brand: string) => {
    const updated = {
      ...filters,
      brands: filters.brands.includes(brand)
        ? filters.brands.filter(b => b !== brand)
        : [...filters.brands, brand]
    }
    setFilters(updated)
    onFilterChange(updated)
  }

  const handleConditionToggle = (cond: string) => {
    const updated = {
      ...filters,
      condition: filters.condition.includes(cond)
        ? filters.condition.filter(c => c !== cond)
        : [...filters.condition, cond]
    }
    setFilters(updated)
    onFilterChange(updated)
  }

  const handleRatingChange = (rating: number) => {
    const updated = { ...filters, rating: filters.rating === rating ? 0 : rating }
    setFilters(updated)
    onFilterChange(updated)
  }

  const handleClearAll = () => {
    const cleared = { priceMin: 0, priceMax: 10000, brands: [], condition: [], rating: 0 }
    setFilters(cleared)
    onFilterChange(cleared)
  }

  const activeCount = [
    filters.brands.length,
    filters.condition.length,
    filters.rating > 0 ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 w-80 h-screen bg-white z-40 shadow-2xl border-r border-gray-200 lg:relative lg:w-72 lg:h-auto lg:shadow-none overflow-hidden transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <h2 className="font-bold text-lg">Filtros</h2>
            {activeCount > 0 && (
              <span className="ml-auto bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
                {activeCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-white/20 rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-[calc(100vh-180px)] lg:h-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="p-6 space-y-6">
            {/* Price Filter */}
            <div>
              <button
                onClick={() => setExpanded(prev => ({ ...prev, price: !prev.price }))}
                className="w-full flex items-center justify-between font-bold text-gray-900 mb-3 hover:text-blue-600"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                  Preço
                </span>
                <ChevronDown className={`w-4 h-4 transition ${expanded.price ? 'rotate-180' : ''}`} />
              </button>
              {expanded.price && (
                <div className="space-y-3">
                  <Slider
                    value={[filters.priceMin, filters.priceMax]}
                    onValueChange={handlePriceChange}
                    min={0}
                    max={10000}
                    step={100}
                  />
                  <div className="flex gap-2 text-xs">
                    <input
                      type="number"
                      value={filters.priceMin}
                      onChange={(e) => handlePriceChange([Number(e.target.value), filters.priceMax])}
                      placeholder="Min"
                      className="flex-1 px-2 py-1.5 border border-gray-300 rounded font-medium"
                    />
                    <input
                      type="number"
                      value={filters.priceMax}
                      onChange={(e) => handlePriceChange([filters.priceMin, Number(e.target.value)])}
                      placeholder="Max"
                      className="flex-1 px-2 py-1.5 border border-gray-300 rounded font-medium"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Brands Filter */}
            <div>
              <button
                onClick={() => setExpanded(prev => ({ ...prev, brands: !prev.brands }))}
                className="w-full flex items-center justify-between font-bold text-gray-900 mb-3 hover:text-blue-600"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
                  Marcas {filters.brands.length > 0 && `(${filters.brands.length})`}
                </span>
                <ChevronDown className={`w-4 h-4 transition ${expanded.brands ? 'rotate-180' : ''}`} />
              </button>
              {expanded.brands && (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center gap-2">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={filters.brands.includes(brand)}
                        onCheckedChange={() => handleBrandToggle(brand)}
                      />
                      <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Condition Filter */}
            <div>
              <button
                onClick={() => setExpanded(prev => ({ ...prev, condition: !prev.condition }))}
                className="w-full flex items-center justify-between font-bold text-gray-900 mb-3 hover:text-blue-600"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-purple-500 rounded-full"></span>
                  Condição {filters.condition.length > 0 && `(${filters.condition.length})`}
                </span>
                <ChevronDown className={`w-4 h-4 transition ${expanded.condition ? 'rotate-180' : ''}`} />
              </button>
              {expanded.condition && (
                <div className="space-y-2">
                  {['novo', 'reembalado'].map(cond => (
                    <div key={cond} className="flex items-center gap-2">
                      <Checkbox
                        id={`cond-${cond}`}
                        checked={filters.condition.includes(cond)}
                        onCheckedChange={() => handleConditionToggle(cond)}
                      />
                      <Label htmlFor={`cond-${cond}`} className="text-sm cursor-pointer capitalize">
                        {cond === 'novo' ? 'Novo' : 'Reembalado'}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Rating Filter */}
            <div>
              <button
                onClick={() => setExpanded(prev => ({ ...prev, rating: !prev.rating }))}
                className="w-full flex items-center justify-between font-bold text-gray-900 mb-3 hover:text-blue-600"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></span>
                  Avaliação
                </span>
                <ChevronDown className={`w-4 h-4 transition ${expanded.rating ? 'rotate-180' : ''}`} />
              </button>
              {expanded.rating && (
                <div className="space-y-2">
                  {[5, 4, 3].map(rating => (
                    <button
                      key={rating}
                      onClick={() => handleRatingChange(rating)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition text-sm flex items-center gap-2 ${
                        filters.rating === rating
                          ? 'bg-yellow-100 border border-yellow-500 text-yellow-700'
                          : 'hover:bg-yellow-50'
                      }`}
                    >
                      <span className="flex gap-0.5">
                        {[...Array(rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </span>
                      {rating}+ estrelas
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-t from-gray-50 to-gray-25 border-t border-gray-200 px-6 py-4 lg:relative">
          <Button
            onClick={handleClearAll}
            variant="outline"
            className="w-full text-sm font-semibold"
            disabled={activeCount === 0}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Limpar Filtros
          </Button>
        </div>
      </aside>
    </>
  )
}
