'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Truck, Shield, CreditCard, Zap, Facebook, Instagram, Youtube, Clock } from 'lucide-react'
import { siteConfig, formatCurrency } from '@/lib/config'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-16">
      {/* Trust Badges Bar */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-sm">Frete Grátis</p>
                <p className="text-xs text-gray-400">Acima de {formatCurrency(siteConfig.shipping.freeShippingMinimum)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-sm">Compra Segura</p>
                <p className="text-xs text-gray-400">Dados protegidos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-sm">{siteConfig.payment.maxInstallments}x Sem Juros</p>
                <p className="text-xs text-gray-400">Em todos produtos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-sm">{siteConfig.payment.pixDiscount}% OFF no Pix</p>
                <p className="text-xs text-gray-400">Desconto instantâneo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image 
                  src="/logo.png" 
                  alt="Barato D+" 
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-black text-blue-400">BARATO</span>
                <span className="text-xl font-black text-red-400"> D+</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6 max-w-sm">
              Sua loja online de confiança com os melhores preços em eletrodomésticos e eletrônicos. Produtos novos e com garantia!
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <span>{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <span>{siteConfig.contact.city} - {siteConfig.contact.state}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <span>Seg-Sex: {siteConfig.hours.weekdays}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Navegação</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/busca" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Todos os Produtos
                </Link>
              </li>
              <li>
                <Link href="/busca?sort=discount" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link href="/c/eletrodomesticos" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Eletrodomésticos
                </Link>
              </li>
              <li>
                <Link href="/c/smartphones" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/c/notebooks" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Notebooks
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Atendimento</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/minha-conta" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Minha Conta
                </Link>
              </li>
              <li>
                <Link href="/minha-conta/pedidos" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Meus Pedidos
                </Link>
              </li>
              <li>
                <Link href="/carrinho" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Carrinho
                </Link>
              </li>
              <li>
                <Link href="/favoritos" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Favoritos
                </Link>
              </li>
              <li>
                <Link href="/empresa" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Institucional</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/empresa" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/trocas-e-devolucoes" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/formas-de-pagamento" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Formas de Pagamento
                </Link>
              </li>
              <li>
                <Link href="/frete-e-entrega" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Frete e Entrega
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="bg-gray-800 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h4 className="font-bold text-lg text-white mb-1">Receba Ofertas Exclusivas</h4>
              <p className="text-sm text-gray-400">Cadastre seu e-mail e seja o primeiro a saber sobre promoções.</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 md:w-64 bg-gray-700 border border-gray-600 text-white placeholder:text-gray-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
              >
                Cadastrar
              </button>
            </form>
          </div>
        </div>

        {/* Social & Security */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="font-bold mb-3 text-center md:text-left">Siga-nos nas redes sociais</h4>
              <div className="flex gap-3">
                <a 
                  href={siteConfig.social.facebook}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href={siteConfig.social.instagram}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-pink-600 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href={siteConfig.social.youtube}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                Site Seguro
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                🔒 SSL Certificado
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                ✓ Compra Protegida
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {currentYear} {siteConfig.name} - CNPJ: {siteConfig.contact.cnpj} - Todos os direitos reservados.</p>
            <p>Preços e condições exclusivos para compras no site.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
