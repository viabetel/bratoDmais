'use client'

import { useState } from 'react'
import { ChevronDown, X, Sliders } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import { getSubcategories, getCategoryBySlug } from '@/lib/utils/categories'

interface ProfessionalFilterSidebarProps {
  currentCategory?: string
  onFiltersChange: (filters: FiltersState) => void
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
  onFiltersChange,
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

  // Subcategorias da categoria selecionada
  const subcategoriesOfCurrent = currentCategory
    ? getSubcategories(currentCategory)
    : []

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const updateFilter = <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
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
    onFiltersChange(defaultFilters)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay móvel */}
      <div
        className="fixed inset-0 bg-black/50 z-30 md:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed md:sticky top-0 left-0 w-80 md:w-72 h-screen md:h-auto md:max-h-[calc(100vh-120px)] bg-white border-r border-gray-200 overflow-y-auto z-40 md:z-0 md:rounded-lg md:p-6 space-y-6">
        {/* Mobile Close Button */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-lg">Filtros</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 p-4 md:p-0">
          {/* Header - Desktop */}
          <div className="hidden md:flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-lg">Filtros</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs">
              Limpar
            </Button>
          </div>

          {/* Categorias */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('categories')}
              className="w-full flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition"
            >
              <h4 className="font-bold text-gray-900">Categorias</h4>
              <ChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform ${
                  expandedSections.categories ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.categories && (
              <div className="mt-3 space-y-2 pl-2">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cat-${cat.slug}`}
                      checked={filters.categories.includes(cat.slug)}
                      onCheckedChange={() => handleCategoryToggle(cat.slug)}
                      className="w-4 h-4"
                    />
                    <Label
                      htmlFor={`cat-${cat.slug}`}
                      className="text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition"
                    >
                      {cat.name}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subcategorias (se há categoria atual) */}
          {subcategoriesOfCurrent.length > 0 && (
            <div className="border-b pb-4">
              <button
                onClick={() => toggleSection('subcategories')}
                className="w-full flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition"
              >
                <h4 className="font-bold text-gray-900">Subcategorias</h4>
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform ${
                    expandedSections.subcategories ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSections.subcategories && (
                <div className="mt-3 space-y-2 pl-2">
                  {subcategoriesOfCurrent.map((subcat) => (
                    <div key={subcat.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`subcat-${subcat.slug}`}
                        checked={filters.categories.includes(subcat.slug)}
                        onCheckedChange={() => handleCategoryToggle(subcat.slug)}
                        className="w-4 h-4"
                      />
                      <Label
                        htmlFor={`subcat-${subcat.slug}`}
                        className="text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition"
                      >
                        {subcat.name}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Preço */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition"
            >
              <h4 className="font-bold text-gray-900">Preço</h4>
              <ChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform ${
                  expandedSections.price ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.price && (
              <div className="mt-4 space-y-4 pl-2">
                <div>
                  <Label className="text-xs text-gray-600 font-semibold">
                    De R$ {filters.priceMin.toLocaleString('pt-BR')}
                  </Label>
                  <Slider
                    value={[filters.priceMin]}
                    onValueChange={(val) => updateFilter('priceMin', val[0])}
                    min={0}
                    max={10000}
                    step={100}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600 font-semibold">
                    Até R$ {filters.priceMax.toLocaleString('pt-BR')}
                  </Label>
                  <Slider
                    value={[filters.priceMax]}
                    onValueChange={(val) => updateFilter('priceMax', val[0])}
                    min={0}
                    max={10000}
                    step={100}
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Marcas */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('brands')}
              className="w-full flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition"
            >
              <h4 className="font-bold text-gray-900">Marcas</h4>
              <ChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform ${
                  expandedSections.brands ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.brands && (
              <div className="mt-3 space-y-2 pl-2 max-h-48 overflow-y-auto">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={() => handleBrandToggle(brand)}
                      className="w-4 h-4"
                    />
                    <Label
                      htmlFor={`brand-${brand}`}
                      className="text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition"
                    >
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Condição */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('condition')}
              className="w-full flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition"
            >
              <h4 className="font-bold text-gray-900">Condição</h4>
              <ChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform ${
                  expandedSections.condition ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.condition && (
              <div className="mt-3 space-y-2 pl-2">
                {conditions.map((cond) => (
                  <div key={cond} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cond-${cond}`}
                      checked={filters.condition.includes(cond)}
                      onCheckedChange={() => handleConditionToggle(cond)}
                      className="w-4 h-4"
                    />
                    <Label
                      htmlFor={`cond-${cond}`}
                      className="text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition capitalize"
                    >
                      {cond}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Disponibilidade */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('stock')}
              className="w-full flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition"
            >
              <h4 className="font-bold text-gray-900">Disponibilidade</h4>
              <ChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform ${
                  expandedSections.stock ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.stock && (
              <div className="mt-3 space-y-2 pl-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="in-stock"
                    checked={filters.inStock}
                    onCheckedChange={(checked) => updateFilter('inStock', !!checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="in-stock" className="text-sm text-gray-700 cursor-pointer">
                    Apenas em estoque
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="free-shipping"
                    checked={filters.freeShipping}
                    onCheckedChange={(checked) => updateFilter('freeShipping', !!checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="free-shipping" className="text-sm text-gray-700 cursor-pointer">
                    Frete grátis
                  </Label>
                </div>
              </div>
            )}
          </div>

          {/* Avaliação */}
          <div>
            <button
              onClick={() => toggleSection('rating')}
              className="w-full flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition"
            >
              <h4 className="font-bold text-gray-900">Avaliação</h4>
              <ChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform ${
                  expandedSections.rating ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.rating && (
              <div className="mt-3 space-y-2 pl-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${stars}`}
                      checked={filters.rating === stars}
                      onCheckedChange={(checked) =>
                        updateFilter('rating', checked ? stars : 0)
                      }
                      className="w-4 h-4"
                    />
                    <Label htmlFor={`rating-${stars}`} className="text-sm text-gray-700 cursor-pointer">
                      {'★'.repeat(stars)} ({stars} estrelas)
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Clear Button */}
          <Button
            onClick={handleReset}
            className="md:hidden w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold"
          >
            Limpar Filtros
          </Button>
        </div>
      </div>
    </>
  )
}
