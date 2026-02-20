'use client'

import { useState } from 'react'
import { Wrench, Clock, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ServiceSchedulingModal } from './ServiceSchedulingModal'
import { getServicesByType } from '@/data/services'
import { formatCurrency } from '@/lib/config'

interface MaintenanceModuleProps {
  categorySlug: string
  productName: string
  onSelect?: (service: any) => void
}

export function MaintenanceModule({ categorySlug, productName, onSelect }: MaintenanceModuleProps) {
  const [expanded, setExpanded] = useState(false)
  const [selectedService, setSelectedService] = useState<any | null>(null)
  const [showScheduling, setShowScheduling] = useState(false)

  const maintenanceServices = getServicesByType('maintenance', categorySlug)
  if (maintenanceServices.length === 0) {
    return null
  }

  const handleSelectService = (service: any) => {
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
            <Wrench className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">Manutenção & Proteção</span>
          </div>
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {expanded && (
          <div className="mt-4 space-y-3 bg-blue-50 rounded-lg p-4">
            {maintenanceServices.map((service) => (
              <div
                key={service.id}
                className="p-3 border border-blue-200 rounded-lg hover:bg-white hover:border-blue-400 transition-all cursor-pointer"
                onClick={() => handleSelectService(service)}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{service.name}</h4>
                  <span className="font-bold text-blue-600 flex-shrink-0">+{formatCurrency(service.price)}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{service.description}</p>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectService(service)
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1.5"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  Agendar Manutenção
                </Button>
              </div>
            ))}

            <div className="mt-3 pt-3 border-t border-blue-200 text-xs text-gray-600 flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>Disponível para agendamento em até 3 dias úteis</span>
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
          console.log('[v0] Manutenção agendada:', booking)
          setShowScheduling(false)
        }}
      />
    </>
  )
}
