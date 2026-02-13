import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, RefreshCw, Package, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Trocas e Devoluções | ' + siteConfig.name,
  description: 'Saiba como realizar trocas e devoluções de produtos comprados na Barato D+.',
}

export default function TrocasEDevolucoesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Trocas e Devoluções</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Trocas e Devoluções
            </h1>
            <p className="text-gray-600 text-lg">
              Sua satisfação é nossa prioridade. Conheça nossa política de trocas.
            </p>
          </div>

          {/* Highlight Box */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 md:p-8 text-white mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">{siteConfig.policies.returnDays} dias para trocar ou devolver</h2>
                <p className="text-green-100">A partir do recebimento do produto, sem burocracia!</p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="bg-white rounded-2xl shadow-sm border p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Como solicitar troca ou devolução</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Acesse sua conta</h3>
                  <p className="text-gray-600">Entre em "Meus Pedidos" e selecione o pedido que deseja trocar ou devolver.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Solicite a troca/devolução</h3>
                  <p className="text-gray-600">Clique em "Solicitar troca" ou "Solicitar devolução" e informe o motivo.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Envie o produto</h3>
                  <p className="text-gray-600">Você receberá um código de postagem gratuito. Embale o produto na embalagem original.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Receba o reembolso ou novo produto</h3>
                  <p className="text-gray-600">Após análise, o reembolso será feito em até 10 dias úteis ou enviaremos o novo produto.</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/minha-conta/pedidos">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Ir para Meus Pedidos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Conditions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-gray-900">Quando aceito</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Produto com defeito de fabricação
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Produto diferente do pedido
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Arrependimento (até 7 dias)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Produto danificado no transporte
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Produto em embalagem original
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="w-6 h-6 text-red-600" />
                <h3 className="font-bold text-gray-900">Quando não aceito</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  Produto usado ou com sinais de uso
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  Sem embalagem original
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  Fora do prazo de {siteConfig.policies.returnDays} dias
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  Produto danificado por mau uso
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  Sem nota fiscal
                </li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-blue-800">
              <strong>Precisa de ajuda?</strong> Entre em contato pelo WhatsApp{' '}
              <a href={siteConfig.social.whatsapp} className="underline font-semibold">
                {siteConfig.contact.phone}
              </a>{' '}
              ou e-mail {siteConfig.contact.email}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
