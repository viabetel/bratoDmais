'use client'

import { useState } from 'react'
import { Package, Calendar, AlertCircle, ChevronDown, ChevronUp, Truck, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ServiceSchedulingModal } from './ServiceSchedulingModal'
import { getServicesByType } from '@/data/services'
import { formatCurrency } from '@/lib/config'

interface RentalModuleProps {
  productId: string
  productName: string
  onSelect?: (service: any) => void
}

export function RentalModule({ productId, productName, onSelect }: RentalModuleProps) {
  const [expanded, setExpanded] = useState(false)
  const [selectedService, setSelectedService] = useState<any | null>(null)
  const [showScheduling, setShowScheduling] = useState(false)

  const rentalServices = getServicesByType('rental')
  if (rentalServices.length === 0) {
    return null
  }

  const handleSelectTerm = (service: any) => {
    setSelectedService(service)
    setShowScheduling(true)
    onSelect?.(service)
  }

  return (
    <>
      <div className="border-t border-gray-200 pt-4 mt-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-gray-900">Aluguel/Alocação</span>
          </div>
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {expanded && (
          <div className="mt-4 space-y-3 bg-green-50 rounded-lg p-4">
            {rentalServices.map((service) => (
              <div
                key={service.id}
                className="p-3 border border-green-200 rounded-lg hover:bg-white hover:border-green-400 transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{service.name}</h4>
                  <span className="font-bold text-green-600 flex-shrink-0">{formatCurrency(service.price)}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{service.description}</p>
                
                <div className="flex gap-2 mb-3 text-xs">
                  {service.duration && (
                    <span className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-green-200">
                      <Calendar className="w-3 h-3 text-green-600" />
                      {service.duration}
                    </span>
                  )}
                  <span className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-green-200">
                    <Truck className="w-3 h-3 text-green-600" />
                    Entrega incl.
                  </span>
                </div>

                <Button
                  size="sm"
                  onClick={() => handleSelectTerm(service)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-1.5"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  Agendar Aluguel
                </Button>
              </div>
            ))}

            <div className="mt-3 pt-3 border-t border-green-200 text-xs text-gray-600 flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>Aluguel com entrega incluída. Cancelamento até 48h antes.</span>
            </div>
          </div>
        )}
      </div>

      <ServiceSchedulingModal
        isOpen={showScheduling}
        service={selectedService}
        productName={productName}
        onClose={() => setShowScheduling(false)}
        onConfirm={(booking) => {
          console.log('[v0] Aluguel agendado:', booking)
          setShowScheduling(false)
        }}
      />
    </>
  )
}

      {expanded && (
        <div className="mt-4 space-y-3 bg-green-50 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            Escolha o período de aluguel que melhor se adequa às suas necessidades:
          </p>

          {rentOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelectTerm(option.term)}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                selectedTerm === option.term
                  ? 'border-green-500 bg-green-100'
                  : 'border-gray-300 bg-white hover:border-green-400'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{termLabels[option.term]}</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {option.minDuration && option.maxDuration
                      ? `De ${option.minDuration} a ${option.maxDuration} dias`
                      : 'Período flexível'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">
                    {formatCurrency(option.pricePerTerm)}
                  </p>
                  <p className="text-xs text-gray-600">
                    {option.term === 'daily' ? '/dia' : option.term === 'weekly' ? '/semana' : '/mês'}
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  <span>
                    Caução: {formatCurrency(option.deposit)}
                  </span>
                </div>
                {option.includesDelivery && (
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-green-600" />
                    <span className="text-green-700">Entrega e retirada incluídas</span>
                  </div>
                )}
                {option.includesMaintenance && (
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-green-600" />
                    <span className="text-green-700">Manutenção incluída</span>
                  </div>
                )}
              </div>

              {selectedTerm === option.term && (
                <div className="mt-3 pt-3 border-t border-green-200">
                  <Button
                    size="sm"
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle rental booking
                    }}
                  >
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    Agendar Aluguel
                  </Button>
                </div>
              )}
            </div>
          ))}

          <div className="text-xs text-gray-600 bg-white rounded p-2 mt-3 flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>
              Termo de locação e política de cancelamento serão apresentados na próxima etapa
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
