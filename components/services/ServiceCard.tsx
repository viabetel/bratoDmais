'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Wrench, Calendar, Zap, Shield, Package, Truck, Check, Plus } from 'lucide-react'
import { ServiceOption, RentOption } from '@/data/services'
import { useServiceStore } from '@/lib/store/serviceStore'
import { formatBRL } from '@/lib/utils/format'

interface ServiceCardProps {
  service: ServiceOption | RentOption
  isRental?: boolean
  onSelect?: (service: ServiceOption | RentOption, quantity?: number) => void
}

export function ServiceCard({ service, isRental = false, onSelect }: ServiceCardProps) {
  const [isAdded, setIsAdded] = useState(false)
  const { addService } = useServiceStore()

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'installation':
        return <Wrench className="w-6 h-6" />
      case 'maintenance':
        return <Shield className="w-6 h-6" />
      case 'rental':
        return <Package className="w-6 h-6" />
      case 'warranty':
        return <Shield className="w-6 h-6" />
      case 'protection':
        return <Zap className="w-6 h-6" />
      default:
        return <Package className="w-6 h-6" />
    }
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'installation': 'Instalação',
      'maintenance': 'Manutenção',
      'rental': 'Aluguel',
      'warranty': 'Garantia',
      'protection': 'Proteção',
    }
    return labels[type] || type
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'installation':
        return 'from-blue-500 to-blue-600'
      case 'maintenance':
        return 'from-purple-500 to-purple-600'
      case 'rental':
        return 'from-orange-500 to-orange-600'
      case 'warranty':
        return 'from-green-500 to-green-600'
      case 'protection':
        return 'from-red-500 to-red-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const handleSelect = () => {
    addService(service)
    onSelect?.(service)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const serviceType = isRental ? 'rental' : service.type || 'installation'
  const backgroundColor = getTypeColor(serviceType)

  return (
    <div className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-200">
      {/* Header with gradient background and icon */}
      <div className={`relative h-20 bg-gradient-to-br ${backgroundColor} p-4 flex items-center justify-between`}>
        <div className="text-white opacity-20 group-hover:opacity-30 transition-opacity">
          {getServiceIcon(serviceType)}
        </div>
        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/30">
          <span className="text-xs font-bold text-white">{getTypeLabel(serviceType)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2">
          {service.name}
        </h3>

        {/* Description - only for ServiceOption */}
        {'description' in service && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {service.description}
          </p>
        )}

        {/* Duration or details - for RentOption */}
        {'duration' in service && service.duration && (
          <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>{service.duration}</span>
          </div>
        )}

        {/* Rental specific info */}
        {isRental && 'minDays' in service && (
          <div className="text-xs text-gray-600 mb-3 space-y-1">
            {service.minDays && <div>Mínimo: {service.minDays} dia{service.minDays > 1 ? 's' : ''}</div>}
            {service.maxDays && <div>Máximo: {service.maxDays} dia{service.maxDays > 1 ? 's' : ''}</div>}
          </div>
        )}

        {/* Features/Benefits */}
        <div className="space-y-1.5 mb-4">
          {isRental && 'deliveryIncluded' in service && (
            <div className="flex items-center gap-2 text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-gray-700">
                {service.deliveryIncluded ? 'Entrega incluída' : 'Entrega não incluída'}
              </span>
            </div>
          )}
          {isRental && 'depositRequired' in service && (
            <div className="flex items-center gap-2 text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-gray-700">
                {service.depositRequired ? 'Depósito caução' : 'Sem depósito'}
              </span>
            </div>
          )}
          {'categories' in service && !isRental && (
            <div className="flex items-center gap-2 text-xs">
              <Check className="w-3.5 h-3.5 text-green-600" />
              <span className="text-gray-700">Aplicável a {service.categories.length} categoria{service.categories.length > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="border-t border-gray-200 pt-3 pb-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-gray-600">Preço</span>
            <span className="text-lg font-black text-gray-900">{formatBRL(service.price)}</span>
          </div>
          {isRental && 'duration' in service && (
            <span className="text-xs text-gray-500">
              por {service.duration === 'diaria' ? 'dia' : service.duration === 'semanal' ? 'semana' : service.duration === 'mensal' ? 'mês' : 'período'}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleSelect}
          className={`w-full py-2.5 px-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            isAdded
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-gradient-to-br ' + backgroundColor + ' text-white hover:shadow-md active:scale-95'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              Adicionado
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Adicionar
            </>
          )}
        </button>
      </div>
    </div>
  )
}
