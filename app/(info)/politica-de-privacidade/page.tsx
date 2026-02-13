import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Shield, Lock, Eye, Database, Trash2, Mail } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Política de Privacidade | ' + siteConfig.name,
  description: 'Saiba como tratamos seus dados pessoais e protegemos sua privacidade.',
}

export default function PoliticaPrivacidadePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Política de Privacidade</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Política de Privacidade
            </h1>
            <p className="text-gray-600">
              Última atualização: Janeiro de 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12 space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">1. Dados que Coletamos</h2>
              </div>
              <div className="text-gray-600 space-y-3 pl-9">
                <p>Coletamos os seguintes dados pessoais:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Dados de identificação:</strong> Nome, CPF, data de nascimento</li>
                  <li><strong>Dados de contato:</strong> E-mail, telefone, endereço</li>
                  <li><strong>Dados de navegação:</strong> IP, cookies, páginas visitadas</li>
                  <li><strong>Dados de pagamento:</strong> Cartão de crédito (processado por gateway seguro)</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">2. Como Usamos seus Dados</h2>
              </div>
              <div className="text-gray-600 space-y-3 pl-9">
                <p>Utilizamos seus dados para:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Processar pedidos e pagamentos</li>
                  <li>Entregar produtos no endereço informado</li>
                  <li>Enviar atualizações sobre pedidos</li>
                  <li>Oferecer suporte ao cliente</li>
                  <li>Enviar promoções (com seu consentimento)</li>
                  <li>Melhorar nossos serviços</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">3. Proteção dos Dados</h2>
              </div>
              <div className="text-gray-600 space-y-3 pl-9">
                <p>Adotamos medidas de segurança para proteger seus dados:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Criptografia SSL em todas as páginas</li>
                  <li>Servidores seguros e monitorados</li>
                  <li>Acesso restrito aos dados pessoais</li>
                  <li>Pagamentos processados por gateways certificados PCI-DSS</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Trash2 className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">4. Seus Direitos</h2>
              </div>
              <div className="text-gray-600 space-y-3 pl-9">
                <p>De acordo com a LGPD, você tem direito a:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir dados incompletos ou incorretos</li>
                  <li>Solicitar a exclusão dos seus dados</li>
                  <li>Revogar o consentimento para marketing</li>
                  <li>Solicitar portabilidade dos dados</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">5. Contato</h2>
              </div>
              <div className="text-gray-600 pl-9">
                <p>Para exercer seus direitos ou tirar dúvidas sobre esta política:</p>
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <p><strong>E-mail:</strong> {siteConfig.contact.email}</p>
                  <p><strong>Telefone:</strong> {siteConfig.contact.phone}</p>
                  <p><strong>Endereço:</strong> {siteConfig.contact.address}, {siteConfig.contact.city} - {siteConfig.contact.state}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
