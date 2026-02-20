'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, Phone, Mail, User, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ServiceOption } from '@/data/services'

interface ServiceSchedulingModalProps {
  isOpen: boolean
  service: ServiceOption | null
  productName?: string
  onClose: () => void
  onConfirm: (bookingData: any) => void
}

export function ServiceSchedulingModal({
  isOpen,
  service,
  productName,
  onClose,
  onConfirm,
}: ServiceSchedulingModalProps) {
  const [step, setStep] = useState<'form' | 'datetime' | 'confirm'>('form')
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
    zipCode: '',
    city: '',
    preferredDate: '',
    preferredTime: 'morning', // morning, afternoon, evening
    notes: '',
  })
  const [isConfirming, setIsConfirming] = useState(false)

  if (!isOpen || !service) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    setIsConfirming(true)
    // Simulate booking API call
    setTimeout(() => {
      onConfirm({
        ...formData,
        serviceId: service.id,
        serviceName: service.name,
        servicePrice: service.price,
        productName,
      })
      setIsConfirming(false)
      setStep('confirm')
    }, 800)
  }

  const handleClose = () => {
    setStep('form')
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      address: '',
      zipCode: '',
      city: '',
      preferredDate: '',
      preferredTime: 'morning',
      notes: '',
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50">
      <div className="w-full md:w-full md:max-w-md bg-white rounded-t-3xl md:rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-lg">Agendar {service.name}</h2>
            <p className="text-blue-100 text-xs">{productName}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-full transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'form' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="Seu nome"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telefone
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  CEP
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange({...e, target: {...e.target, name: 'zipCode', value: e.target.value.replace(/\D/g, '').slice(0, 8)}})}
                  placeholder="12345-678"
                  maxLength={8}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Cidade"
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Observações</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Deixe alguma informação importante..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm resize-none"
                />
              </div>

              <Button
                onClick={() => setStep('datetime')}
                disabled={!formData.customerName || !formData.customerPhone}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
              >
                Continuar
              </Button>
            </div>
          )}

          {step === 'datetime' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Data Preferida
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Horário Preferido
                </label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm"
                >
                  <option value="morning">Manhã (08h - 12h)</option>
                  <option value="afternoon">Tarde (12h - 17h)</option>
                  <option value="evening">Noite (17h - 20h)</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900 font-medium">
                  Informações de Agendamento:
                </p>
                <p className="text-sm text-blue-700 mt-2">
                  Serviço: <strong>{service.name}</strong>
                </p>
                <p className="text-sm text-blue-700">
                  Valor: <strong>R$ {service.price.toFixed(2).replace('.', ',')}</strong>
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => setStep('form')}
                  variant="outline"
                  className="flex-1 py-3"
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => setStep('confirm')}
                  disabled={!formData.preferredDate}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
                >
                  Revisar
                </Button>
              </div>
            </div>
          )}

          {step === 'confirm' && !isConfirming && (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Agendamento Confirmado!</h3>
              <p className="text-gray-600 text-sm">
                Você receberá um email de confirmação em breve com todos os detalhes do seu agendamento.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-left text-sm space-y-2">
                <p><strong>Cliente:</strong> {formData.customerName}</p>
                <p><strong>Serviço:</strong> {service.name}</p>
                <p><strong>Data:</strong> {formData.preferredDate}</p>
                <p><strong>Horário:</strong> {formData.preferredTime === 'morning' ? '08h-12h' : formData.preferredTime === 'afternoon' ? '12h-17h' : '17h-20h'}</p>
              </div>
              <Button
                onClick={handleClose}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
              >
                Finalizar
              </Button>
            </div>
          )}

          {isConfirming && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              <p className="text-sm text-gray-600">Confirmando agendamento...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
