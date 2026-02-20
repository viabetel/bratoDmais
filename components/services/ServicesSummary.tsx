'use client'

import { useState } from 'react'
import { X, Minus, Plus, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useServiceStore } from '@/lib/store/serviceStore'
import { formatBRL } from '@/lib/utils/format'

export function ServicesSummary() {
  const { selectedServices, removeService, getTotal } = useServiceStore()
  const [isOpen, setIsOpen] = useState(false)

  if (selectedServices.length === 0) return null

  const total = getTotal()

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all active:scale-95 z-40 flex items-center gap-2"
      >
        <ShoppingCart className="w-6 h-6" />
        <span className="font-bold text-lg">{selectedServices.length}</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50">
              <h2 className="text-lg font-bold text-gray-900">Serviços Selecionados</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Services List */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {selectedServices.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">Nenhum serviço selecionado</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedServices.map((service) => (
                    <div key={service.id} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-gray-900">{service.name}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {service.type === 'rental' ? 'Aluguel' : 
                             service.type === 'maintenance' ? 'Manutenção' : 
                             service.type === 'warranty' ? 'Garantia' : 
                             service.type === 'protection' ? 'Proteção' : 'Instalação'}
                          </p>
                        </div>
                        <button
                          onClick={() => removeService(service.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">{formatBRL(service.price)}</span>
                        {service.duration && (
                          <span className="text-xs text-gray-500">
                            {service.duration === 'diaria' ? 'dia' : 
                             service.duration === 'semanal' ? 'semana' : 
                             service.duration === 'mensal' ? 'mês' : service.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50 space-y-3">
              <div className="flex items-center justify-between pb-3">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="text-2xl font-black text-purple-600">{formatBRL(total)}</span>
              </div>

              <Link href="/carrinho" className="block">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 rounded-lg transition-all active:scale-95 shadow-lg"
                >
                  Adicionar ao Carrinho
                </button>
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 rounded-lg transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
