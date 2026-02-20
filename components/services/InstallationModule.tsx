'use client'

import { useState } from 'react'
import { Zap, Check, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getServicesByCategory, formatServicePrice } from '@/data/services'
import { formatCurrency } from '@/lib/config'

interface InstallationModuleProps {
  categorySlug: string
  productName: string
  basePrice: number
  onSelect?: (serviceId: string, price: number) => void
}

export function InstallationModule({ categorySlug, productName, basePrice, onSelect }: InstallationModuleProps) {
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState(false)

  const installationServices = getServicesByCategory(categorySlug, 'install')
  if (installationServices.length === 0) {
    return null
  }

  const primaryService = installationServices[0]

  const handleToggle = () => {
    setSelected(!selected)
    if (!selected) {
      onSelect?.(primaryService.id, primaryService.basePrice)
    }
  }

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
        <div className="flex items-start gap-3 flex-1">
          <Zap className="w-5 h-5 text-orange-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Instalação Profissional</h3>
            <p className="text-sm text-gray-700 mt-1">
              Técnico especializado realiza a instalação com garantia
            </p>
          </div>
          <span className="font-bold text-orange-600 text-lg whitespace-nowrap ml-2">
            +{formatCurrency(primaryService.basePrice)}
          </span>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <Button
          onClick={handleToggle}
          className={`flex-1 text-sm ${
            selected
              ? 'bg-orange-600 hover:bg-orange-700 text-white'
              : 'bg-white border border-orange-300 text-orange-700 hover:bg-orange-50'
          }`}
          size="sm"
        >
          <Check className={`w-3.5 h-3.5 mr-1.5 ${selected ? 'block' : 'hidden'}`} />
          {selected ? 'Instalação Adicionada' : 'Adicionar Instalação'}
        </Button>

        <button
          onClick={() => setExpanded(!expanded)}
          className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 space-y-2 bg-orange-50 rounded-lg p-3 border border-orange-200">
          <h4 className="font-semibold text-sm text-gray-900">Opções disponíveis:</h4>
          {installationServices.map((service) => (
            <div key={service.id} className="text-sm">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <p className="font-medium text-gray-900">{service.name}</p>
                  <p className="text-xs text-gray-600">{service.description}</p>
                </div>
                <span className="text-orange-600 font-semibold whitespace-nowrap">
                  +{formatCurrency(service.basePrice)}
                </span>
              </div>
              {service.features && (
                <ul className="mt-1 ml-0 space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                      <Check className="w-3 h-3 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="mt-2 pt-2 border-t border-orange-200 text-xs text-gray-600 flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>Disponível em até 7 dias úteis na sua região</span>
          </div>
        </div>
      )}
    </div>
  )
}
