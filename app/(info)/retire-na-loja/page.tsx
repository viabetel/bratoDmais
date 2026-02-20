import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Retire na Loja | Brato Mais',
  description: 'Compre online e retire em nossas lojas',
}

export default function RetireNaLojaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Retire na Loja</h1>
          <p className="text-gray-600 mb-8">Compre online e retire sem custo de frete</p>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Como Funciona</h2>
              <ol className="space-y-3 list-decimal list-inside text-gray-700">
                <li>Faça sua compra no site e escolha "Retirada na Loja"</li>
                <li>Você receberá um email com confirmação</li>
                <li>Retire seu pedido em até 24h em qualquer loja</li>
                <li>Apresente o código de retirada no balcão</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Nossas Lojas</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold text-gray-900">São Paulo - Centro</p>
                  <p className="text-sm text-gray-600">Rua das Flores, 123 - Centro</p>
                  <p className="text-sm text-gray-600">📞 (11) 3000-1234</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold text-gray-900">São Paulo - Vila Mariana</p>
                  <p className="text-sm text-gray-600">Av. Paulista, 456 - Vila Mariana</p>
                  <p className="text-sm text-gray-600">📞 (11) 3000-5678</p>
                </div>
              </div>
            </section>

            <section className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">Horário de Funcionamento</h3>
              <div className="text-gray-700 space-y-1">
                <p><strong>Segunda a Sexta:</strong> 09h - 19h</p>
                <p><strong>Sábado:</strong> 09h - 13h</p>
                <p><strong>Domingo:</strong> Fechado</p>
              </div>
            </section>

            <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">Dúvidas?</h3>
              <p className="text-gray-700 mb-4">
                Entre em contato conosco pelo WhatsApp para mais informações sobre retirada na loja.
              </p>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
                </button>
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
