'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { products } from '@/data/products'

interface FilterSidebarProps {
  onFiltersChange: (filters: FiltersState) => void
}

export interface FiltersState {
  priceMin: number
  priceMax: number
  brands: string[]
  condition: string[]
  inStock: boolean
  rating: number
  freeShipping: boolean
  pickupAvailable: boolean
}

export function FilterSidebar({ onFiltersChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FiltersState>({
    priceMin: 0,
    priceMax: 2000,
    brands: [],
    condition: [],
    inStock: false,
    rating: 0,
    freeShipping: false,
    pickupAvailable: false,
  })

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brands: true,
    condition: true,
    stock: false,
    rating: false,
    shipping: false,
  })

  const brands = Array.from(new Set(products.map((p) => p.brand))).sort()
  const conditions = ['novo', 'reembalado', 'remanufaturado']

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const updateFilter = <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
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
      priceMax: 2000,
      brands: [],
      condition: [],
      inStock: false,
      rating: 0,
      freeShipping: false,
      pickupAvailable: false,
    }
    setFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Filtros</h3>
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs">
          Limpar Tudo
        </Button>
      </div>

      {/* Price */}
      <div className="border-t border-border pt-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex w-full justify-between items-center mb-4"
        >
          <span className="font-semibold text-sm">Preço</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.price ? '' : '-rotate-90'
            }`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <Slider
              value={[filters.priceMin, filters.priceMax]}
              onValueChange={(value) => {
                updateFilter('priceMin', value[0])
                updateFilter('priceMax', value[1])
              }}
              min={0}
              max={2000}
              step={50}
              className="w-full"
            />
            <div className="flex gap-2 text-sm">
              <div>
                <label className="text-xs text-muted-foreground">Mín</label>
                <div className="font-semibold">R$ {filters.priceMin}</div>
              </div>
              <div className="flex-1 text-right">
                <label className="text-xs text-muted-foreground">Máx</label>
                <div className="font-semibold">R$ {filters.priceMax}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="border-t border-border pt-4">
        <button
          onClick={() => toggleSection('brands')}
          className="flex w-full justify-between items-center mb-4"
        >
          <span className="font-semibold text-sm">Marcas</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.brands ? '' : '-rotate-90'
            }`}
          />
        </button>
        {expandedSections.brands && (
          <div className="space-y-3">
            {brands.map((brand) => (
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

      {/* Condition */}
      <div className="border-t border-border pt-4">
        <button
          onClick={() => toggleSection('condition')}
          className="flex w-full justify-between items-center mb-4"
        >
          <span className="font-semibold text-sm">Condição</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.condition ? '' : '-rotate-90'
            }`}
          />
        </button>
        {expandedSections.condition && (
          <div className="space-y-3">
            {conditions.map((cond) => (
              <div key={cond} className="flex items-center gap-2">
                <Checkbox
                  id={`cond-${cond}`}
                  checked={filters.condition.includes(cond)}
                  onCheckedChange={() => handleConditionToggle(cond)}
                />
                <Label htmlFor={`cond-${cond}`} className="text-sm cursor-pointer capitalize">
                  {cond === 'novo' ? 'Novo' : cond === 'reembalado' ? 'Reembalado' : 'Remanufaturado'}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stock */}
      <div className="border-t border-border pt-4">
        <button
          onClick={() => toggleSection('stock')}
          className="flex w-full justify-between items-center mb-4"
        >
          <span className="font-semibold text-sm">Disponibilidade</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.stock ? '' : '-rotate-90'
            }`}
          />
        </button>
        {expandedSections.stock && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="inStock"
                checked={filters.inStock}
                onCheckedChange={(checked) => updateFilter('inStock', checked as boolean)}
              />
              <Label htmlFor="inStock" className="text-sm cursor-pointer">
                Em estoque
              </Label>
            </div>
          </div>
        )}
      </div>

      {/* Shipping */}
      <div className="border-t border-border pt-4">
        <button
          onClick={() => toggleSection('shipping')}
          className="flex w-full justify-between items-center mb-4"
        >
          <span className="font-semibold text-sm">Entrega</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.shipping ? '' : '-rotate-90'
            }`}
          />
        </button>
        {expandedSections.shipping && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="freeShipping"
                checked={filters.freeShipping}
                onCheckedChange={(checked) => updateFilter('freeShipping', checked as boolean)}
              />
              <Label htmlFor="freeShipping" className="text-sm cursor-pointer">
                Frete Grátis
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="pickup"
                checked={filters.pickupAvailable}
                onCheckedChange={(checked) => updateFilter('pickupAvailable', checked as boolean)}
              />
              <Label htmlFor="pickup" className="text-sm cursor-pointer">
                Retirada na Loja
              </Label>
            </div>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="border-t border-border pt-4">
        <button
          onClick={() => toggleSection('rating')}
          className="flex w-full justify-between items-center mb-4"
        >
          <span className="font-semibold text-sm">Avaliação</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.rating ? '' : '-rotate-90'
            }`}
          />
        </button>
        {expandedSections.rating && (
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => updateFilter('rating', filters.rating === rating ? 0 : rating)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  filters.rating === rating
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                {'⭐'.repeat(rating)} {rating}+ estrelas
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
