'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ShoppingCart, Wrench, Package } from 'lucide-react'

export type ServiceMode = 'buy' | 'rent' | 'maintenance'

interface ServiceModeProps {
  currentMode: ServiceMode
  onModeChange: (mode: ServiceMode) => void
}

const modes: Array<{ id: ServiceMode; label: string; icon: React.ReactNode; description: string }> = [
  {
    id: 'buy',
    label: 'Comprar',
    icon: <ShoppingCart className="w-4 h-4" />,
    description: 'Produtos à venda',
  },
  {
    id: 'rent',
    label: 'Alugar/Alocar',
    icon: <Package className="w-4 h-4" />,
    description: 'Aluguel e alocação',
  },
  {
    id: 'maintenance',
    label: 'Manutenção',
    icon: <Wrench className="w-4 h-4" />,
    description: 'Serviços técnicos',
  },
]

export function ServiceModeSelector({ currentMode, onModeChange }: ServiceModeProps) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200/80 p-1.5 shadow-sm w-fit">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all font-medium text-sm ${
            currentMode === mode.id
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          title={mode.description}
        >
          {mode.icon}
          <span>{mode.label}</span>
        </button>
      ))}
    </div>
  )
}
