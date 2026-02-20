'use client'

import { Truck, CreditCard, Percent, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export function TrustBanner() {
  const trustItems = [
    {
      icon: Truck,
      title: 'Frete Grátis',
      description: 'Acima de R$ 299',
      href: '/frete-e-entrega',
    },
    {
      icon: Percent,
      title: '10% OFF no Pix',
      description: 'Compre com desconto',
      href: '/pagamento',
    },
    {
      icon: CreditCard,
      title: 'Até 12x',
      description: 'Sem juros',
      href: '/pagamento',
    },
    {
      icon: CheckCircle,
      title: 'Garantia',
      description: '12 meses',
      href: '/trocas-e-garantia',
    },
  ]

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-b border-blue-200 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.title} href={item.href}>
                <div className="bg-white rounded-lg p-4 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer text-center">
                  <Icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
