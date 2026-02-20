import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Trocas e Garantia | Brato Mais',
  description: 'Política de garantia, trocas e devoluções',
}

export default function TrocasEGarantiaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trocas e Garantia</h1>
          <p className="text-gray-600 mb-8">Sua satisfação é nossa prioridade</p>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Garantia de 12 Meses</h2>
              </div>
              <p className="text-gray-700">
                Todos os nossos produtos vêm com garantia de 12 meses contra defeitos de fabricação. Se apresentar problemas, nos avise!
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Troca Fácil</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Produto chegou com defeito? Fazemos a troca <strong>gratuitamente</strong> em até 10 dias úteis.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-semibold text-gray-900">Como solicitar uma troca:</p>
                  <ol className="text-sm text-gray-700 list-decimal list-inside space-y-1">
                    <li>Entre em contato pelo WhatsApp com foto do produto</li>
                    <li>Nossa equipe avalia e aprova a troca</li>
                    <li>Enviamos o produto novo sem custo</li>
                    <li>Você recebe e deverte o com defeito</li>
                  </ol>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">O que é coberto pela garantia?</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">Defeitos de fabricação</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">Mau funcionamento</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">Peças que pararam de funcionar</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">O que NÃO é coberto?</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  <span className="text-gray-700">Danos por queda ou impacto</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  <span className="text-gray-700">Uso indevido ou negligência</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  <span className="text-gray-700">Modificações não autorizadas</span>
                </div>
              </div>
            </section>

            <section className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">Dúvidas sobre sua compra?</h3>
              <p className="text-gray-700 mb-4">
                Entre em contato conosco pelo WhatsApp e conversamos sobre a melhor solução para você.
              </p>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-lg">
                  Falar no WhatsApp
                </button>
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
