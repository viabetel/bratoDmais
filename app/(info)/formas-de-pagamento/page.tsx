import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, CreditCard, Smartphone, FileText, Zap, Shield, Clock } from 'lucide-react'
import { siteConfig, formatCurrency } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Formas de Pagamento | ' + siteConfig.name,
  description: 'Conheça todas as formas de pagamento aceitas na Barato D+. Pix, cartão de crédito e boleto.',
}

export default function FormasDePagamentoPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Formas de Pagamento</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Formas de Pagamento
            </h1>
            <p className="text-gray-600 text-lg">
              Escolha a melhor forma de pagar sua compra
            </p>
          </div>

          {/* Payment Methods */}
          <div className="space-y-6">
            {/* PIX */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 md:p-8 text-white">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">Pix</h2>
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                      {siteConfig.payment.pixDiscount}% OFF
                    </span>
                  </div>
                  <p className="text-green-100 mb-4">
                    Pague com Pix e ganhe {siteConfig.payment.pixDiscount}% de desconto! O pagamento é confirmado na hora.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">✓</span>
                      Desconto de {siteConfig.payment.pixDiscount}% no valor total
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">✓</span>
                      Aprovação instantânea
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">✓</span>
                      QR Code ou copia e cola
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cartão de Crédito */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Cartão de Crédito</h2>
                  <p className="text-gray-600 mb-4">
                    Parcele em até {siteConfig.payment.maxInstallments}x sem juros. Parcela mínima de {formatCurrency(siteConfig.payment.minInstallmentValue)}.
                  </p>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Bandeiras aceitas:</p>
                    <div className="flex flex-wrap gap-2">
                      {siteConfig.payment.acceptedCards.map((card) => (
                        <span 
                          key={card} 
                          className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-lg font-medium"
                        >
                          {card}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs">✓</span>
                      Até {siteConfig.payment.maxInstallments}x sem juros
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs">✓</span>
                      Aprovação em segundos
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs">✓</span>
                      Ambiente 100% seguro
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Boleto */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Boleto Bancário</h2>
                  <p className="text-gray-600 mb-4">
                    Pague em qualquer banco ou lotérica. O pedido é processado após a confirmação do pagamento.
                  </p>
                  
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xs">✓</span>
                      Vencimento em 3 dias úteis
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xs">✓</span>
                      Pague em qualquer banco
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-400" />
                      Confirmação em até 2 dias úteis
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="mt-8 bg-gray-900 rounded-2xl p-6 md:p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Shield className="w-8 h-8 text-green-400" />
              <h2 className="text-xl font-bold">Compra 100% Segura</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Todas as transações são criptografadas e processadas por gateways de pagamento certificados.
              Seus dados estão protegidos.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                🔒 SSL Certificado
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                ✓ PCI-DSS Compliant
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                🛡️ Antifraude
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
