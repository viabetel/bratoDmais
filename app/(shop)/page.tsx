'use client'

import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowRight, Star, Truck, Shield, CreditCard, Zap, 
  TrendingUp, Package, Clock, ChevronRight, Flame,
  Sparkles, Gift, BadgePercent
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import { ProductCard } from '@/components/products/ProductCard'
import { formatBRL, getDiscountPercent, getPixPrice } from '@/lib/utils/format'
import { siteConfig, formatCurrency } from '@/lib/config'

// Get products by different criteria
const getOfertasDaSemana = () => {
  return [...products]
    .sort((a, b) => {
      const discountA = getDiscountPercent(a.originalPrice, a.price)
      const discountB = getDiscountPercent(b.originalPrice, b.price)
      return discountB - discountA
    })
    .slice(0, 8)
}

const getMaisVendidos = () => {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, 4)
}

const getNovidades = () => {
  return products.slice(0, 4)
}

const getEletrodomesticos = () => {
  return products.filter(p => 
    p.categorySlug === 'geladeiras' || 
    p.categorySlug === 'fogoes' || 
    p.categorySlug === 'microondas' ||
    p.categorySlug === 'maquinas-lavar'
  ).slice(0, 4)
}

const categoryIcons: Record<string, string> = {
  'eletronicos': '⚡',
  'perifericos': '🖱️',
  'componentes': '🔧',
  'acessorios': '🎧',
  'eletrodomesticos': '🏠',
  'climatizacao': '❄️',
  'tvs': '📺',
  'notebooks': '💻',
  'smartphones': '📱',
  'utilidades': '🍳',
  'geladeiras': '🧊',
  'fogoes': '🔥',
}

// Section Divider Component
function SectionDivider({ 
  variant = 'wave',
  fromColor = 'white',
  toColor = 'gray-50'
}: { 
  variant?: 'wave' | 'angle' | 'curve'
  fromColor?: string
  toColor?: string
}) {
  if (variant === 'wave') {
    return (
      <div className={`relative h-16 -mt-1 bg-${fromColor}`}>
        <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1440 64" preserveAspectRatio="none">
          <path 
            d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,48 1440,32 L1440,64 L0,64 Z" 
            className={`fill-current text-${toColor === 'gray-50' ? 'gray-50' : toColor}`}
          />
        </svg>
      </div>
    )
  }
  
  if (variant === 'angle') {
    return (
      <div className={`relative h-12 bg-${fromColor}`}>
        <svg className="absolute bottom-0 w-full h-12" viewBox="0 0 1440 48" preserveAspectRatio="none">
          <polygon 
            points="0,48 1440,0 1440,48" 
            className={`fill-current text-${toColor === 'gray-50' ? 'gray-50' : toColor}`}
          />
        </svg>
      </div>
    )
  }
  
  return (
    <div className={`relative h-20 bg-${fromColor}`}>
      <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <ellipse cx="720" cy="80" rx="900" ry="40" className={`fill-current text-${toColor === 'gray-50' ? 'gray-50' : toColor}`}/>
      </svg>
    </div>
  )
}

// Interactive Banner Component
function PromoBanner() {
  return (
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-8 text-white animate-pulse">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-yellow-300" />
            <span className="font-bold text-sm md:text-base">MEGA OFERTAS</span>
          </div>
          <span className="hidden md:inline text-yellow-200">•</span>
          <span className="font-semibold text-sm md:text-base">Até 80% OFF + Frete Grátis</span>
          <span className="hidden md:inline text-yellow-200">•</span>
          <Link href="/busca?sort=discount" className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm font-bold hover:bg-white/30 transition">
            APROVEITE <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const ofertasDaSemana = getOfertasDaSemana()
  const maisVendidos = getMaisVendidos()
  const novidades = getNovidades()
  const eletrodomesticos = getEletrodomesticos()

  return (
    <div className="min-h-screen bg-white">
      {/* Promo Banner */}
      <PromoBanner />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Animated Circles */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                <Sparkles className="w-4 h-4" />
                <span>PRODUTOS NOVOS E COM GARANTIA!</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                Eletrônicos e Eletrodomésticos com
                <span className="block text-yellow-300 drop-shadow-lg">ATÉ 80% OFF!</span>
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100 max-w-lg">
                Tudo para sua casa com os melhores preços! Parcelamento em até <strong>6x sem juros</strong> e <strong>10% de desconto no Pix</strong>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/busca?sort=discount">
                  <Button 
                    size="lg" 
                    className="bg-red-500 hover:bg-red-600 text-white font-black text-lg px-8 py-6 shadow-xl shadow-red-500/30 rounded-xl group w-full sm:w-auto"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    VER OFERTAS
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/busca">
                  <Button 
                    size="lg" 
                    className="bg-white hover:bg-gray-100 text-blue-700 font-bold text-lg px-8 py-6 shadow-xl rounded-xl w-full sm:w-auto"
                  >
                    Explorar Produtos
                  </Button>
                </Link>
              </div>
              
              {/* Trust Badges - Mobile */}
              <div className="flex flex-wrap gap-3 pt-4 lg:hidden">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-2 rounded-lg">
                  <Truck className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium">Frete Grátis</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-2 rounded-lg">
                  <CreditCard className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium">6x Sem Juros</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-2 rounded-lg">
                  <Shield className="w-4 h-4 text-green-300" />
                  <span className="text-sm font-medium">Garantia</span>
                </div>
              </div>
            </div>
            
            {/* Right Content - Hero Cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white hover:bg-white/20 transition-all hover:scale-105 cursor-pointer border border-white/20">
                  <div className="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Truck className="w-7 h-7 text-yellow-900" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">Frete Grátis</h3>
                  <p className="text-sm text-blue-200">Acima de R$ 299</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white hover:bg-white/20 transition-all hover:scale-105 cursor-pointer border border-white/20">
                  <div className="w-14 h-14 bg-green-400 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Shield className="w-7 h-7 text-green-900" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">Garantia Total</h3>
                  <p className="text-sm text-blue-200">Produtos com garantia</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white hover:bg-white/20 transition-all hover:scale-105 cursor-pointer border border-white/20">
                  <div className="w-14 h-14 bg-blue-400 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <CreditCard className="w-7 h-7 text-blue-900" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">6x Sem Juros</h3>
                  <p className="text-sm text-blue-200">Em todos os produtos</p>
                </div>
                <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 text-white hover:scale-105 transition-all cursor-pointer shadow-xl">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Zap className="w-7 h-7 text-red-500" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">10% OFF no Pix</h3>
                  <p className="text-sm text-red-100">Desconto instantâneo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">Categorias</h2>
              <p className="text-gray-500 mt-1">Explore nossos departamentos</p>
            </div>
            <Link href="/busca">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold">
                Ver todas <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.slice(0, 10).map((cat, index) => (
              <Link key={cat.slug} href={`/c/${cat.slug}`}>
                <div 
                  className="group bg-white border-2 border-gray-100 rounded-2xl p-5 text-center hover:border-blue-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                    {categoryIcons[cat.slug] || '📦'}
                  </div>
                  <h3 className="font-bold text-sm text-gray-800 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative h-8 bg-white">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white px-6">
            <BadgePercent className="w-6 h-6 text-red-500" />
          </div>
        </div>
      </div>

      {/* Flash Deals Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-xl blur-lg opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-red-500 to-red-600 text-white p-3 rounded-xl shadow-lg">
                  <Zap className="w-7 h-7" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                  🔥 Ofertas da Semana
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">Descontos imperdíveis por tempo limitado!</p>
              </div>
            </div>
            <Link href="/busca?sort=discount">
              <Button className="bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg shadow-red-500/25">
                Ver Todas <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ofertasDaSemana.slice(0, 4).map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          {/* More Offers Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ofertasDaSemana.slice(4, 8).map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${(index + 4) * 100}ms` }} className="animate-fade-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Banner */}
      <section className="py-8 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-red-400 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-white">
              <Gift className="w-12 h-12 text-yellow-300" />
              <div>
                <h3 className="text-xl md:text-2xl font-black">Primeira Compra?</h3>
                <p className="text-blue-200">Ganhe <span className="text-yellow-300 font-bold">15% OFF</span> no seu primeiro pedido!</p>
              </div>
            </div>
            <Link href="/cadastro">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black text-lg px-8 shadow-xl">
                CRIAR CONTA GRÁTIS
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-xl shadow-lg">
                <TrendingUp className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">Mais Vendidos</h2>
                <p className="text-gray-500 text-sm mt-0.5">Os queridinhos dos nossos clientes</p>
              </div>
            </div>
            <Link href="/busca?sort=rating">
              <Button variant="outline" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold">
                Ver Todos <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {maisVendidos.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider with Icon */}
      <div className="relative py-6 bg-gray-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-2xl h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-gray-50 px-8 flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <Sparkles className="w-5 h-5 text-blue-500" />
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Eletrodomésticos Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-3 rounded-xl shadow-lg">
                <Package className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">🏠 Eletrodomésticos</h2>
                <p className="text-gray-500 text-sm mt-0.5">Tudo para sua casa com os melhores preços</p>
              </div>
            </div>
            <Link href="/c/eletrodomesticos">
              <Button variant="outline" className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-bold">
                Ver Todos <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {eletrodomesticos.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 md:py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-black text-center text-gray-900 mb-10">
            Por que comprar na <span className="text-blue-600">Barato D+</span>?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Entrega Rápida</h3>
              <p className="text-sm text-gray-500">Receba em até 48h</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/25">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Compra Segura</h3>
              <p className="text-sm text-gray-500">Dados 100% protegidos</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-orange-50 to-white rounded-2xl border border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/25">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Suporte 24h</h3>
              <p className="text-sm text-gray-500">Atendimento integral</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/25">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Devolução Grátis</h3>
              <p className="text-sm text-gray-500">Até 30 dias</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-red-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 max-w-3xl mx-auto leading-tight">
            Tudo para sua casa com os <span className="text-yellow-300">melhores preços!</span>
          </h2>
          <p className="text-lg md:text-xl text-blue-200 mb-8 max-w-xl mx-auto">
            Descubra ofertas exclusivas em eletrodomésticos e eletrônicos. Garantia e qualidade em cada produto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/busca">
              <Button 
                size="lg" 
                className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black text-lg px-10 py-6 shadow-xl rounded-xl"
              >
                COMEÇAR A COMPRAR
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/empresa">
              <Button 
                size="lg" 
                className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 font-bold text-lg px-10 py-6 rounded-xl backdrop-blur"
              >
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
