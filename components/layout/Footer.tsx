'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Truck, Shield, CreditCard, Zap, Facebook, Instagram, Youtube, Clock } from 'lucide-react'

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
                <p className="text-xs text-gray-400">Acima de R$ 299</p>
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
                <p className="font-bold text-sm">6x Sem Juros</p>
                <p className="text-xs text-gray-400">Em todos produtos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-sm">10% OFF no Pix</p>
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
                <span>(32) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <span>contato@baratodmais.com.br</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <span>Juiz de Fora - MG</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <span>Seg-Sex: 08:00 - 18:00</span>
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
                <Link href="/empresa" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/empresa" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/empresa" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/empresa" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Formas de Pagamento
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="font-bold mb-3 text-center md:text-left">Siga-nos nas redes sociais</h4>
              <div className="flex gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-pink-600 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://youtube.com" 
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
            <p>© {currentYear} Barato D+ - CNPJ: 00.000.000/0001-00 - Todos os direitos reservados.</p>
            <p>Preços e condições exclusivos para compras no site.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
