'use client'

import { useState } from 'react'
import { ChevronDown, X, Sliders, Filter } from 'lucide-react'
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

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    subcategories: !!currentCategory,
    price: true,
    brands: true,
    condition: false,
    stock: false,
    rating: false,
    shipping: false,
  })

  const brands = Array.from(new Set(products.map((p) => p.brand))).sort()
  const conditions = ['novo', 'reembalado', 'remanufaturado']
  const subcategoriesOfCurrent = currentCategory ? getSubcategories(currentCategory) : []

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const updateFilter = <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleCategoryToggle = (categorySlug: string) => {
    const newCategories = filters.categories.includes(categorySlug)
      ? filters.categories.filter((c) => c !== categorySlug)
      : [...filters.categories, categorySlug]
    updateFilter('categories', newCategories)
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

  if (!isOpen) return null

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Glassmorphism Design */}
      <div className="fixed md:sticky top-0 left-0 md:left-auto h-screen md:h-auto md:max-h-[calc(100vh-120px)] w-96 md:w-80 z-40 md:z-0">
        {/* Glassmorphism Container */}
        <div className="h-full w-full bg-gradient-to-b from-white/95 to-white/90 md:bg-gradient-to-b md:from-white md:to-white backdrop-blur-xl md:backdrop-blur-none border-r border-white/20 md:border-gray-200 md:rounded-2xl md:shadow-xl md:shadow-blue-500/10 overflow-y-auto md:overflow-y-auto md:scrollbar-hide">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 md:p-6 md:rounded-t-2xl backdrop-blur-xl flex items-center justify-between z-10 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <Filter className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Filtros</h3>
                <p className="text-xs text-blue-100">Refine sua busca</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="md:hidden w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
              aria-label="Fechar filtros"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Categorias */}
            <FilterSection
              title="Categorias"
              isExpanded={expandedSections.categories}
              onToggle={() => toggleSection('categories')}
              itemCount={filters.categories.length}
            >
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center group cursor-pointer">
                    <div className="relative">
                      <Checkbox
                        checked={filters.categories.includes(cat.slug)}
                        onCheckedChange={() => handleCategoryToggle(cat.slug)}
                        className="w-5 h-5 rounded-lg border-2 border-gray-300 group-hover:border-blue-500 transition-colors"
                      />
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Subcategorias */}
            {subcategoriesOfCurrent.length > 0 && (
              <FilterSection
                title="Subcategorias"
                isExpanded={expandedSections.subcategories}
                onToggle={() => toggleSection('subcategories')}
                badge={`+${subcategoriesOfCurrent.length}`}
              >
                <div className="space-y-3">
                  {subcategoriesOfCurrent.map((subcat) => (
                    <label key={subcat.id} className="flex items-center group cursor-pointer">
                      <Checkbox
                        checked={filters.categories.includes(subcat.slug)}
                        onCheckedChange={() => handleCategoryToggle(subcat.slug)}
                        className="w-5 h-5 rounded-lg border-2 border-purple-300 group-hover:border-purple-500 transition-colors"
                      />
                      <span className="ml-3 text-sm text-gray-600 group-hover:text-purple-600 transition-colors">
                        {subcat.name}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>
            )}

            {/* Preço */}
            <FilterSection
              title="Faixa de Preço"
              isExpanded={expandedSections.price}
              onToggle={() => toggleSection('price')}
            >
              <div className="space-y-5 pt-2">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <Label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Mínimo</Label>
                  <div className="text-2xl font-bold text-green-600 mt-1">R$ {filters.priceMin.toLocaleString('pt-BR')}</div>
                  <Slider
                    value={[filters.priceMin]}
                    onValueChange={(val) => updateFilter('priceMin', val[0])}
                    min={0}
                    max={10000}
                    step={100}
                    className="mt-3"
                  />
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <Label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Máximo</Label>
                  <div className="text-2xl font-bold text-blue-600 mt-1">R$ {filters.priceMax.toLocaleString('pt-BR')}</div>
                  <Slider
                    value={[filters.priceMax]}
                    onValueChange={(val) => updateFilter('priceMax', val[0])}
                    min={0}
                    max={10000}
                    step={100}
                    className="mt-3"
                  />
                </div>
              </div>
            </FilterSection>

            {/* Marcas */}
            <FilterSection
              title="Marcas"
              isExpanded={expandedSections.brands}
              onToggle={() => toggleSection('brands')}
              itemCount={brands.length}
            >
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center group cursor-pointer">
                    <Checkbox
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={() => handleBrandToggle(brand)}
                      className="w-5 h-5 rounded-lg border-2 border-orange-300 group-hover:border-orange-500 transition-colors"
                    />
                    <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 font-medium transition-colors">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Condição */}
            <FilterSection
              title="Condição"
              isExpanded={expandedSections.condition}
              onToggle={() => toggleSection('condition')}
            >
              <div className="space-y-3">
                {conditions.map((cond) => (
                  <label key={cond} className="flex items-center group cursor-pointer">
                    <Checkbox
                      checked={filters.condition.includes(cond)}
                      onCheckedChange={() => handleConditionToggle(cond)}
                      className="w-5 h-5 rounded-lg border-2 border-pink-300 group-hover:border-pink-500 transition-colors"
                    />
                    <span className="ml-3 text-sm text-gray-700 group-hover:text-pink-600 font-medium capitalize transition-colors">
                      {cond}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Disponibilidade */}
            <FilterSection
              title="Disponibilidade"
              isExpanded={expandedSections.stock}
              onToggle={() => toggleSection('stock')}
            >
              <div className="space-y-3">
                <label className="flex items-center group cursor-pointer">
                  <Checkbox
                    checked={filters.inStock}
                    onCheckedChange={(checked) => updateFilter('inStock', !!checked)}
                    className="w-5 h-5 rounded-lg border-2 border-teal-300 group-hover:border-teal-500 transition-colors"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-teal-600 font-medium transition-colors">
                    Apenas em estoque
                  </span>
                </label>
                <label className="flex items-center group cursor-pointer">
                  <Checkbox
                    checked={filters.freeShipping}
                    onCheckedChange={(checked) => updateFilter('freeShipping', !!checked)}
                    className="w-5 h-5 rounded-lg border-2 border-cyan-300 group-hover:border-cyan-500 transition-colors"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 font-medium transition-colors">
                    Frete grátis
                  </span>
                </label>
              </div>
            </FilterSection>

            {/* Avaliação */}
            <FilterSection
              title="Avaliação Mínima"
              isExpanded={expandedSections.rating}
              onToggle={() => toggleSection('rating')}
            >
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <label key={stars} className="flex items-center group cursor-pointer p-2 rounded-lg hover:bg-yellow-50 transition-colors">
                    <Checkbox
                      checked={filters.rating === stars}
                      onCheckedChange={(checked) => updateFilter('rating', checked ? stars : 0)}
                      className="w-5 h-5 rounded-lg border-2 border-yellow-300 group-hover:border-yellow-500 transition-colors"
                    />
                    <span className="ml-3 text-sm font-medium">
                      {'★'.repeat(stars)}{' '}
                      <span className="text-gray-500">e acima</span>
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Clear Button */}
            <button
              onClick={handleReset}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-900 font-bold text-sm uppercase tracking-wide transition-all hover:shadow-md border border-gray-200"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// Filter Section Component
function FilterSection({
  title,
  isExpanded,
  onToggle,
  children,
  itemCount,
  badge,
}: {
  title: string
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
  itemCount?: number
  badge?: string
}) {
  return (
    <div className="border-b border-gray-100 pb-5 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between group p-2 -m-2 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 rounded-lg transition-all"
      >
        <div className="flex items-center gap-2 flex-1">
          <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h4>
          {itemCount !== undefined && itemCount > 0 && (
            <span className="ml-auto inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold">
              {itemCount}
            </span>
          )}
          {badge && (
            <span className="ml-auto px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-bold rounded-full">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-all ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isExpanded && <div className="mt-4 pl-2">{children}</div>}
    </div>
  )
}
