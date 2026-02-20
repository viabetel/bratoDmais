'use client'

import { useState } from 'react'
import { ChevronDown, X, Sliders, RotateCcw, Filter } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import { getSubcategories } from '@/lib/utils/categories'

interface ProfessionalFilterSidebarProps {
  currentCategory?: string
  onFilterChange: (filters: FiltersState) => void
  isOpen?: boolean
  onClose?: () => void
}

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

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: true,
    brands: true,
    categories: true,
    condition: false,
    rating: false,
    shipping: false,
  })

  const uniqueBrands = [...new Set(products.map(p => p.brand))].sort()
  const activeFilterCount = Object.values(filters).filter(v => 
    Array.isArray(v) ? v.length > 0 : v !== 0 && v !== false
  ).length

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handlePriceChange = (values: number[]) => {
    const newFilters = { ...filters, priceMin: values[0], priceMax: values[1] }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand]
    const newFilters = { ...filters, brands: newBrands }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleConditionToggle = (condition: string) => {
    const newConditions = filters.condition.includes(condition)
      ? filters.condition.filter(c => c !== condition)
      : [...filters.condition, condition]
    const newFilters = { ...filters, condition: newConditions }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleRatingChange = (rating: number) => {
    const newFilters = { ...filters, rating: filters.rating === rating ? 0 : rating }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleClearFilters = () => {
    const clearedFilters: FiltersState = {
      priceMin: 0,
      priceMax: 10000,
      brands: [],
      condition: [],
      categories: currentCategory ? [currentCategory] : [],
      inStock: false,
      rating: 0,
      freeShipping: false,
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  // Mobile drawer view
  if (!isOpen && onClose) {
    return null
  }

  return (
    <>
      {/* Overlay for mobile */}
      {!isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - FIXED POSITION */}
      <div className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-lg z-40 transition-transform duration-300 md:relative md:w-80 ${
        !isOpen ? '-translate-x-full' : 'translate-x-0'
      } md:translate-x-0 md:h-auto md:border-r md:shadow-none`}>
        
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 border-b border-indigo-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <h2 className="font-bold text-lg">Filtros</h2>
            </div>
            <button
              onClick={onClose}
              className="md:hidden p-1 hover:bg-white/20 rounded-lg transition"
              aria-label="Fechar filtros"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {activeFilterCount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="bg-white/20 px-2 py-1 rounded-full">{activeFilterCount} ativo(s)</span>
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition text-xs font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                Limpar
              </button>
            </div>
          )}
        </div>

        {/* Filters Container - SCROLLABLE */}
        <div className="overflow-y-auto h-[calc(100vh-120px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="p-4 space-y-3">
            
            {/* PREÇO */}
            <div className="border-b border-gray-100 pb-4">
              <button
                onClick={() => toggleSection('price')}
                className="w-full flex items-center justify-between font-semibold text-gray-900 mb-3 hover:text-blue-600 transition"
              >
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  Preço
                </span>
                <ChevronDown className={`w-4 h-4 transition ${expandedSections.price ? 'rotate-180' : ''}`} />
              </button>
              {expandedSections.price && (
                <div className="space-y-3">
                  <Slider
                    value={[filters.priceMin, filters.priceMax]}
                    onValueChange={handlePriceChange}
                    min={0}
                    max={10000}
                    step={100}
                    className="w-full"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-green-50 rounded-lg p-2 text-center border border-green-200">
                      <span className="text-xs text-gray-600">Mín</span>
                      <p className="font-bold text-sm text-green-600">R$ {filters.priceMin}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2 text-center border border-green-200">
                      <span className="text-xs text-gray-600">Máx</span>
                      <p className="font-bold text-sm text-green-600">R$ {filters.priceMax}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* MARCAS */}
            <div className="border-b border-gray-100 pb-4">
              <button
                onClick={() => toggleSection('brands')}
                className="w-full flex items-center justify-between font-semibold text-gray-900 mb-3 hover:text-blue-600 transition"
              >
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                  Marcas
                </span>
                <ChevronDown className={`w-4 h-4 transition ${expandedSections.brands ? 'rotate-180' : ''}`} />
              </button>
              {expandedSections.brands && (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {uniqueBrands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                      <Checkbox
                        checked={filters.brands.includes(brand)}
                        onCheckedChange={() => handleBrandToggle(brand)}
                        className="group-hover:border-orange-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-orange-600 transition">{brand}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* CATEGORIAS */}
            <div className="border-b border-gray-100 pb-4">
              <button
                onClick={() => toggleSection('categories')}
                className="w-full flex items-center justify-between font-semibold text-gray-900 mb-3 hover:text-blue-600 transition"
              >
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  Categorias
                </span>
                <ChevronDown className={`w-4 h-4 transition ${expandedSections.categories ? 'rotate-180' : ''}`} />
              </button>
              {expandedSections.categories && (
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat.slug} className="flex items-center gap-2 cursor-pointer group">
                      <Checkbox
                        checked={filters.categories.includes(cat.slug)}
                        onCheckedChange={() => {
                          const newCats = filters.categories.includes(cat.slug)
                            ? filters.categories.filter(c => c !== cat.slug)
                            : [...filters.categories, cat.slug]
                          const newFilters = { ...filters, categories: newCats }
                          setFilters(newFilters)
                          onFilterChange(newFilters)
                        }}
                        className="group-hover:border-blue-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-blue-600 transition">{cat.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* CONDIÇÃO */}
            <div className="border-b border-gray-100 pb-4">
              <button
                onClick={() => toggleSection('condition')}
                className="w-full flex items-center justify-between font-semibold text-gray-900 mb-3 hover:text-blue-600 transition"
              >
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                  Condição
                </span>
                <ChevronDown className={`w-4 h-4 transition ${expandedSections.condition ? 'rotate-180' : ''}`} />
              </button>
              {expandedSections.condition && (
                <div className="space-y-2">
                  {['novo', 'seminovo'].map(cond => (
                    <label key={cond} className="flex items-center gap-2 cursor-pointer group">
                      <Checkbox
                        checked={filters.condition.includes(cond)}
                        onCheckedChange={() => handleConditionToggle(cond)}
                        className="group-hover:border-purple-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-purple-600 transition capitalize">
                        {cond === 'novo' ? 'Novo' : 'Seminovo'}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* AVALIAÇÃO */}
            <div className="border-b border-gray-100 pb-4">
              <button
                onClick={() => toggleSection('rating')}
                className="w-full flex items-center justify-between font-semibold text-gray-900 mb-3 hover:text-blue-600 transition"
              >
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  Avaliação
                </span>
                <ChevronDown className={`w-4 h-4 transition ${expandedSections.rating ? 'rotate-180' : ''}`} />
              </button>
              {expandedSections.rating && (
                <div className="space-y-2">
                  {[5, 4, 3].map(rating => (
                    <button
                      key={rating}
                      onClick={() => handleRatingChange(rating)}
                      className={`w-full text-left p-2 rounded-lg transition flex items-center gap-2 ${
                        filters.rating === rating
                          ? 'bg-yellow-100 border border-yellow-500 text-yellow-700'
                          : 'hover:bg-yellow-50 text-gray-700'
                      }`}
                    >
                      <span className="flex gap-0.5">
                        {[...Array(rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </span>
                      <span className="text-sm">{rating}+ estrelas</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* FRETE */}
            <div>
              <button
                onClick={() => toggleSection('shipping')}
                className="w-full flex items-center justify-between font-semibold text-gray-900 mb-3 hover:text-blue-600 transition"
              >
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  Frete
                </span>
                <ChevronDown className={`w-4 h-4 transition ${expandedSections.shipping ? 'rotate-180' : ''}`} />
              </button>
              {expandedSections.shipping && (
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <Checkbox
                      checked={filters.freeShipping}
                      onCheckedChange={() => {
                        const newFilters = { ...filters, freeShipping: !filters.freeShipping }
                        setFilters(newFilters)
                        onFilterChange(newFilters)
                      }}
                      className="group-hover:border-red-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-red-600 transition">Frete Grátis</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <Checkbox
                      checked={filters.inStock}
                      onCheckedChange={() => {
                        const newFilters = { ...filters, inStock: !filters.inStock }
                        setFilters(newFilters)
                        onFilterChange(newFilters)
                      }}
                      className="group-hover:border-red-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-red-600 transition">Apenas em estoque</span>
                  </label>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Footer - Sticky */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 space-y-2">
          <Button 
            onClick={handleClearFilters}
            variant="outline"
            className="w-full text-sm"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Limpar Todos
          </Button>
        </div>
      </div>
    </>
  )
}


  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const updateFilter = <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand]
    updateFilter('brands', newBrands)
  }

  const handleConditionToggle = (cond: string) => {
    const newCondition = filters.condition.includes(cond)
      ? filters.condition.filter((c) => c !== cond)
      : [...filters.condition, cond]
    updateFilter('condition', newCondition)
  }

  const handleReset = () => {
    const defaultFilters: FiltersState = {
      priceMin: 0,
      priceMax: 10000,
      brands: [],
      condition: [],
      categories: currentCategory ? [currentCategory] : [],
      inStock: false,
      rating: 0,
      freeShipping: false,
    }
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  const activeFiltersCount = [
    ...filters.brands,
    ...filters.condition,
    filters.inStock ? 1 : 0,
    filters.rating > 0 ? 1 : 0,
    filters.freeShipping ? 1 : 0,
  ].filter(Boolean).length

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky lg:top-0 left-0 top-0 w-72 lg:w-64 h-screen lg:h-auto max-h-screen lg:max-h-none bg-white border-r border-gray-200 z-40 lg:z-0 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex flex-col`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white px-6 py-5 flex items-center justify-between gap-3 z-10">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5" />
            <h2 className="font-bold text-lg">Filtros</h2>
          </div>
          {activeFiltersCount > 0 && (
            <span className="bg-white text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="p-5 space-y-4">
            {/* Price Filter */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-green-50 to-emerald-50">
              <button
                onClick={() => toggleSection('price')}
                className="w-full flex items-center justify-between mb-3 hover:opacity-75 transition"
              >
                <span className="font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Preço
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
                />
              </button>

              {expandedSections.price && (
                <div className="space-y-3">
                  <Slider
                    min={0}
                    max={10000}
                    step={100}
                    value={[filters.priceMin, filters.priceMax]}
                    onValueChange={(val) => {
                      updateFilter('priceMin', val[0])
                      updateFilter('priceMax', val[1])
                    }}
                    className="w-full"
                  />
                  <div className="flex gap-2 text-xs">
                    <input
                      type="number"
                      value={filters.priceMin}
                      onChange={(e) => updateFilter('priceMin', Number(e.target.value))}
                      className="flex-1 px-2 py-1.5 border border-gray-300 rounded font-medium"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={filters.priceMax}
                      onChange={(e) => updateFilter('priceMax', Number(e.target.value))}
                      className="flex-1 px-2 py-1.5 border border-gray-300 rounded font-medium"
                      placeholder="Max"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Brands Filter */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-orange-50 to-yellow-50">
              <button
                onClick={() => toggleSection('brands')}
                className="w-full flex items-center justify-between mb-3 hover:opacity-75 transition"
              >
                <span className="font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  Marcas {filters.brands.length > 0 && `(${filters.brands.length})`}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${expandedSections.brands ? 'rotate-180' : ''}`}
                />
              </button>

              {expandedSections.brands && (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center gap-3">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={filters.brands.includes(brand)}
                        onCheckedChange={() => handleBrandToggle(brand)}
                        className="rounded"
                      />
                      <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer font-medium">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Condition Filter */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-purple-50 to-pink-50">
              <button
                onClick={() => toggleSection('condition')}
                className="w-full flex items-center justify-between mb-3 hover:opacity-75 transition"
              >
                <span className="font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  Condição
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${expandedSections.condition ? 'rotate-180' : ''}`}
                />
              </button>

              {expandedSections.condition && (
                <div className="space-y-2">
                  {conditions.map(({ value, label }) => (
                    <div key={value} className="flex items-center gap-3">
                      <Checkbox
                        id={`condition-${value}`}
                        checked={filters.condition.includes(value)}
                        onCheckedChange={() => handleConditionToggle(value)}
                        className="rounded"
                      />
                      <Label htmlFor={`condition-${value}`} className="text-sm cursor-pointer font-medium">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Rating Filter */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-yellow-50 to-amber-50">
              <button
                onClick={() => toggleSection('rating')}
                className="w-full flex items-center justify-between mb-3 hover:opacity-75 transition"
              >
                <span className="font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  Avaliação
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`}
                />
              </button>

              {expandedSections.rating && (
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <button
                      key={stars}
                      onClick={() => updateFilter('rating', stars)}
                      className={`w-full px-3 py-2 rounded-lg font-medium text-sm transition-all text-left flex items-center gap-2 ${
                        filters.rating === stars
                          ? 'bg-yellow-400 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {'★'.repeat(stars)}
                      <span className="text-xs opacity-75">({stars}+)</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shipping Filter */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-blue-50 to-cyan-50">
              <button
                onClick={() => toggleSection('shipping')}
                className="w-full flex items-center justify-between mb-3 hover:opacity-75 transition"
              >
                <span className="font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Entrega
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${expandedSections.shipping ? 'rotate-180' : ''}`}
                />
              </button>

              {expandedSections.shipping && (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="free-shipping"
                      checked={filters.freeShipping}
                      onCheckedChange={(checked) => updateFilter('freeShipping', checked as boolean)}
                      className="rounded"
                    />
                    <Label htmlFor="free-shipping" className="text-sm cursor-pointer font-medium">
                      Frete Grátis
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="in-stock"
                      checked={filters.inStock}
                      onCheckedChange={(checked) => updateFilter('inStock', checked as boolean)}
                      className="rounded"
                    />
                    <Label htmlFor="in-stock" className="text-sm cursor-pointer font-medium">
                      Em Estoque
                    </Label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        {activeFiltersCount > 0 && (
          <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent border-t border-gray-200 p-5 space-y-2">
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 font-bold"
            >
              <RotateCcw className="w-4 h-4" />
              Limpar Filtros
            </Button>
          </div>
        )}
      </aside>
    </>
  )
}
