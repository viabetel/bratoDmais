'use client'

import { X } from 'lucide-react'
import type { FiltersState } from '@/components/filters/ProfessionalFilterSidebar'

const CONDITION_LABELS: Record<string, string> = {
  novo: 'Novo',
  reembalado: 'Reembalado',
  remanufaturado: 'Remanufaturado',
}

const SERVICE_LABELS: Record<string, string> = {
  installation: 'Com Instalação',
  rental: 'Locação',
  maintenance: 'Manutenção',
  warranty: 'Garantia',
  protection: 'Proteção',
}

interface ActiveFilterChipsProps {
  filters: FiltersState
  onRemoveBrand: (brand: string) => void
  onRemoveCondition: (cond: string) => void
  onRemoveService: (service: string) => void
  onClearPrice: () => void
  onToggleInStock: () => void
  onToggleFreeShipping: () => void
  onClearRating: () => void
  onClearAll: () => void
}

export function ActiveFilterChips({
  filters,
  onRemoveBrand,
  onRemoveCondition,
  onRemoveService,
  onClearPrice,
  onToggleInStock,
  onToggleFreeShipping,
  onClearRating,
  onClearAll,
}: ActiveFilterChipsProps) {
  const chips: Array<{ key: string; label: string; onRemove: () => void }> = []

  // Price
  if (filters.priceMin > 0 || filters.priceMax < 10000) {
    const label =
      filters.priceMin > 0 && filters.priceMax < 10000
        ? `R$ ${filters.priceMin} – R$ ${filters.priceMax}`
        : filters.priceMin > 0
        ? `Acima de R$ ${filters.priceMin}`
        : `Até R$ ${filters.priceMax}`
    chips.push({ key: 'price', label, onRemove: onClearPrice })
  }

  // Brands
  filters.brands.forEach((brand) =>
    chips.push({ key: `brand-${brand}`, label: brand, onRemove: () => onRemoveBrand(brand) })
  )

  // Conditions
  filters.condition.forEach((cond) =>
    chips.push({
      key: `cond-${cond}`,
      label: CONDITION_LABELS[cond] ?? cond,
      onRemove: () => onRemoveCondition(cond),
    })
  )

  // Service types
  ;(filters.serviceTypes ?? []).forEach((svc) =>
    chips.push({
      key: `svc-${svc}`,
      label: SERVICE_LABELS[svc] ?? svc,
      onRemove: () => onRemoveService(svc),
    })
  )

  // Booleans
  if (filters.inStock)
    chips.push({ key: 'inStock', label: 'Em Estoque', onRemove: onToggleInStock })
  if (filters.freeShipping)
    chips.push({ key: 'freeShipping', label: 'Frete Grátis', onRemove: onToggleFreeShipping })
  if (filters.rating > 0)
    chips.push({
      key: 'rating',
      label: `${filters.rating}+ estrelas`,
      onRemove: onClearRating,
    })

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <span className="text-xs text-gray-500 font-medium">Filtros:</span>
      {chips.map((chip) => (
        <button
          key={chip.key}
          onClick={chip.onRemove}
          className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-full px-2.5 py-1 text-xs font-medium hover:bg-blue-100 hover:border-blue-300 transition-colors group"
        >
          {chip.label}
          <X className="w-3 h-3 group-hover:text-blue-900" />
        </button>
      ))}
      {chips.length > 1 && (
        <button
          onClick={onClearAll}
          className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          <X className="w-3 h-3" />
          Limpar tudo
        </button>
      )}
    </div>
  )
}
