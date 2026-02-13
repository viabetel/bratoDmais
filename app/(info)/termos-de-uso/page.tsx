import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, FileText, CheckCircle, AlertTriangle, Scale, Users } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Termos de Uso | ' + siteConfig.name,
  description: 'Conheça os termos e condições de uso do site Barato D+.',
}

export default function TermosDeUsoPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Termos de Uso</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Termos de Uso
            </h1>
            <p className="text-gray-600">
              Última atualização: Janeiro de 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12 space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">1. Aceitação dos Termos</h2>
              </div>
              <div className="text-gray-600 space-y-3 pl-9">
                <p>
                  Ao acessar e utilizar o site {siteConfig.name}, você concorda com estes Termos de Uso. 
                  Se não concordar com algum termo, não utilize nossos serviços.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">2. Cadastro e Conta</h2>
              </div>
              <div className="text-gray-600 space-y-3 pl-9">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Você deve ter 18 anos ou mais para realizar compras</li>
                  <li>As informações fornecidas devem ser verdadeiras e atualizadas</li>
                  <li>Você é responsável pela segurança da sua senha</li>
                  <li>Não compartilhe seus dados de acesso com terceiros</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">3. Preços e Pagamentos</h2>
              </div>
              <div className="text-gray-600 space-y-3 pl-9">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Os preços estão em Reais (R$) e podem ser alterados sem aviso prévio</li>
                  <li>Ofertas têm prazo determinado e estoque limitado</li>
                  <li>O desconto de {siteConfig.payment.pixDiscount}% no Pix é aplicado automaticamente</li>
                  <li>Parcelamento em até {siteConfig.payment.maxInstallments}x sem juros (parcela mínima R$ {siteConfig.payment.minInstallmentValue})</li>
                  <li>Reservamo-nos o direito de cancelar pedidos com indícios de fraude</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">4. Uso Proibido</h2>
              </div>
              <div className="text-gray-600 space-y-3 pl-9">
                <p>É proibido:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Utilizar o site para fins ilegais</li>
                  <li>Tentar acessar áreas restritas do sistema</li>
                  <li>Copiar ou reproduzir conteúdo sem autorização</li>
                  <li>Realizar compras com dados falsos ou de terceiros</li>
                  <li>Utilizar bots ou sistemas automatizados</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">5. Propriedade Intelectual</h2>
              </div>
              <div className="text-gray-600 space-y-3 pl-9">
                <p>
                  Todo o conteúdo do site (textos, imagens, logotipos, design) é propriedade do {siteConfig.name} 
                  ou de seus parceiros, protegido por leis de direitos autorais.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">6. Legislação Aplicável</h2>
              </div>
              <div className="text-gray-600 space-y-3 pl-9">
                <p>
                  Estes termos são regidos pelas leis brasileiras, especialmente o Código de Defesa do Consumidor. 
                  O foro da comarca de {siteConfig.contact.city}/{siteConfig.contact.state} é competente para dirimir quaisquer controvérsias.
                </p>
              </div>
            </section>

            <div className="mt-8 p-6 bg-purple-50 rounded-xl border border-purple-200">
              <p className="text-purple-800 text-sm">
                <strong>Dúvidas?</strong> Entre em contato pelo e-mail {siteConfig.contact.email} ou 
                telefone {siteConfig.contact.phone}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
