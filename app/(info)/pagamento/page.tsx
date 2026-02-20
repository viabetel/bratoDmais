import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Percent, Banknote } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Formas de Pagamento | Brato Mais',
  description: 'Conheça todas as formas de pagamento e condições',
}

export default function PagamentoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Formas de Pagamento</h1>
          <p className="text-gray-600 mb-8">Escolha a forma que mais se adequa a você</p>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Percent className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Pix (10% de Desconto)</h2>
              </div>
              <p className="text-gray-700">
                Aproveite <strong>10% de desconto</strong> ao pagar com Pix. Transferência em segundos, totalmente segura e sem tarifas.
              </p>
              <p className="text-sm text-gray-600 mt-3">Exemplo: Produto de R$ 1.000 sai por R$ 900 no Pix.</p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Cartão de Crédito</h2>
              </div>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold text-gray-900">Até 12 Parcelas SEM JUROS</p>
                  <p className="text-sm text-gray-600">Em compras acima de R$ 100</p>
                </div>
                <p className="text-gray-700 mt-4">
                  Aceitamos todos os principais cartões: Visa, Mastercard, Elo, American Express e Hipercard.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Banknote className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Boleto Bancário</h2>
              </div>
              <p className="text-gray-700">
                Pague com boleto e acompanhe a confirmação em até 48 horas. Seu produto será processado assim que recebermos a confirmação do pagamento.
              </p>
            </section>

            <section className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">Segurança Garantida</h3>
              <p className="text-gray-700">
                Todas as transações são criptografadas e protegidas com os mais altos padrões de segurança da indústria.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
