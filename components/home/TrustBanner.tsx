'use client'

import Link from 'next/link'
import { Truck, Percent, CreditCard, CheckCircle, ShieldCheck } from 'lucide-react'

const trustItems = [
  { icon: Truck, title: 'Frete Grátis', description: 'Acima de R$ 299', href: '/frete-e-entrega', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Percent, title: '10% OFF no Pix', description: 'Desconto automático', href: '/pagamento', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: CreditCard, title: 'Até 12x', description: 'Sem juros no cartão', href: '/pagamento', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: CheckCircle, title: 'Garantia', description: 'Mínimo 12 meses', href: '/trocas-e-garantia', color: 'text-orange-600', bg: 'bg-orange-50' },
  { icon: ShieldCheck, title: 'Compra Segura', description: 'Site SSL certificado', href: '/politica-de-privacidade', color: 'text-red-600', bg: 'bg-red-50' },
]

export function TrustBanner() {
  return (
    <div className="bg-white border-b border-gray-200 py-4 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 md:pb-0 md:justify-around">
          {trustItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.title} href={item.href} className="flex-shrink-0">
                <div className="flex items-center gap-2.5 hover:opacity-75 transition-opacity px-3 py-1.5 rounded-xl hover:bg-gray-50 group cursor-pointer">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.bg} flex-shrink-0`}>
                    <Icon className={`w-4.5 h-4.5 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 whitespace-nowrap">{item.title}</p>
                    <p className="text-[11px] text-gray-500 whitespace-nowrap">{item.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
