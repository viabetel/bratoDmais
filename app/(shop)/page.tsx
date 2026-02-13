'use client'

import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowRight, Truck, Shield, CreditCard, Zap, 
  TrendingUp, Package, Clock, ChevronRight, Flame,
  Sparkles, Gift, MapPin, Headphones
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import { ProductCard } from '@/components/products/ProductCard'
import { formatBRL, getDiscountPercent } from '@/lib/utils/format'
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

const getGeladeiras = () => products.filter(p => p.categorySlug === 'geladeiras').slice(0, 4)
const getFogoes = () => products.filter(p => p.categorySlug === 'fogoes').slice(0, 4)
const getMicroondas = () => products.filter(p => p.categorySlug === 'microondas').slice(0, 4)
const getLavadoras = () => products.filter(p => p.categorySlug === 'maquinas-lavar').slice(0, 4)

const categoryIcons: Record<string, string> = {
  'eletronicos': '⚡', 'perifericos': '🖱️', 'componentes': '🔧', 'acessorios': '🎧',
  'eletrodomesticos': '🏠', 'climatizacao': '❄️', 'tvs': '📺', 'notebooks': '💻',
  'smartphones': '📱', 'utilidades': '🍳', 'geladeiras': '🧊', 'fogoes': '🔥',
  'microondas': '📻', 'maquinas-lavar': '🧺',
}

// Banner Image Component
function BannerImage({ 
  src, 
  href, 
  alt,
  className = ""
}: { 
  src: string
  href: string
  alt: string
  className?: string
}) {
  return (
    <Link href={href} className={`block overflow-hidden rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5 ${className}`}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
      />
    </Link>
  )
}

// Promo Banner Strip
function PromoBanner() {
  return (
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 md:gap-6 text-white text-xs md:text-sm font-medium">
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-yellow-300" />
            <span className="font-bold">MEGA OFERTAS</span>
          </div>
          <span className="text-white/50 hidden sm:inline">•</span>
          <span className="hidden sm:inline">Até 80% OFF + Frete Grátis</span>
          <Link href="/busca?sort=discount" className="flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold hover:bg-white/30 transition">
            APROVEITE <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const ofertasDaSemana = getOfertasDaSemana()
  const maisVendidos = getMaisVendidos()
  const geladeiras = getGeladeiras()
  const fogoes = getFogoes()
  const microondas = getMicroondas()
  const lavadoras = getLavadoras()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TESTE - SE VOCÊ VER ISSO, O DEPLOY FUNCIONOU! */}
      <div className="bg-yellow-400 text-black text-center py-6 text-2xl font-black">
        🚀 DEPLOY FUNCIONOU! CÓDIGO NOVO ATIVO! 🚀
      </div>
      <PromoBanner />
      
      {/* Hero Section - Compacto */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M20 20h20v20H20zM0 0h20v20H0z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="absolute top-5 left-5 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-5 right-5 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div className="text-white space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-yellow-900 px-2.5 py-1 rounded-full text-xs font-bold">
                <Sparkles className="w-3 h-3" />
                PRODUTOS NOVOS E COM GARANTIA!
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight">
                Eletrônicos e Eletrodomésticos
                <span className="block text-yellow-300">ATÉ 80% OFF!</span>
              </h1>
              
              <p className="text-sm md:text-base text-blue-100 max-w-md">
                Tudo para sua casa! <strong>{siteConfig.payment.maxInstallments}x sem juros</strong> e <strong>{siteConfig.payment.pixDiscount}% OFF no Pix</strong>.
              </p>
              
              <div className="flex gap-2.5 pt-1">
                <Link href="/busca?sort=discount">
                  <Button className="bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-5 py-4 shadow-lg rounded-lg group">
                    <Zap className="w-4 h-4 mr-1.5" />
                    VER OFERTAS
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <Link href="/busca">
                  <Button className="bg-white hover:bg-gray-100 text-blue-700 font-bold text-sm px-5 py-4 rounded-lg">
                    Explorar
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white border border-white/20">
                <Truck className="w-6 h-6 mb-1.5 text-yellow-300" />
                <h3 className="font-bold text-sm">Frete Grátis</h3>
                <p className="text-xs text-blue-200">+{formatCurrency(siteConfig.shipping.freeShippingMinimum)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white border border-white/20">
                <Shield className="w-6 h-6 mb-1.5 text-green-300" />
                <h3 className="font-bold text-sm">Garantia</h3>
                <p className="text-xs text-blue-200">{siteConfig.policies.warrantyMonths} meses</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white border border-white/20">
                <CreditCard className="w-6 h-6 mb-1.5 text-blue-300" />
                <h3 className="font-bold text-sm">{siteConfig.payment.maxInstallments}x Sem Juros</h3>
                <p className="text-xs text-blue-200">Todos produtos</p>
              </div>
              <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-lg p-3 text-white shadow-lg">
                <Zap className="w-6 h-6 mb-1.5" />
                <h3 className="font-bold text-sm">{siteConfig.payment.pixDiscount}% Pix</h3>
                <p className="text-xs text-red-100">Desconto à vista</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" className="w-full">
            <path d="M0 50L720 30L1440 50V50H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Banner Row 1 - Categorias Principais */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            <BannerImage src="/banners/ofertas-semana.png" href="/busca?sort=discount" alt="Ofertas da Semana" />
            <BannerImage src="/banners/eletrodomesticos.png" href="/c/eletrodomesticos" alt="Eletrodomésticos" />
            <BannerImage src="/banners/geladeiras.png" href="/c/geladeiras" alt="Geladeiras" />
            <BannerImage src="/banners/fogoes.png" href="/c/fogoes" alt="Fogões" />
          </div>
        </div>
      </section>

      {/* Ofertas da Semana */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-2 rounded-lg">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-black text-gray-900">🔥 Ofertas da Semana</h2>
                <p className="text-gray-500 text-xs">Descontos de verdade no Pix</p>
              </div>
            </div>
            <Link href="/busca?sort=discount">
              <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs">
                Ver Todas <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ofertasDaSemana.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Row 2 - Micro-ondas, Lavadoras */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            <BannerImage src="/banners/microondas.png" href="/c/microondas" alt="Micro-ondas" />
            <BannerImage src="/banners/lavadoras.png" href="/c/maquinas-lavar" alt="Lavadoras" />
            <BannerImage src="/banners/retire-loja.png" href="/frete-e-entrega" alt="Retire na Loja" className="col-span-2" />
          </div>
        </div>
      </section>

      {/* Geladeiras */}
      {geladeiras.length > 0 && (
        <section className="py-6 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-2 rounded-lg">
                  <span className="text-base">🧊</span>
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-black text-gray-900">Geladeiras em Destaque</h2>
                  <p className="text-gray-500 text-xs">Mais espaço, mais economia</p>
                </div>
              </div>
              <Link href="/c/geladeiras">
                <Button size="sm" variant="outline" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold text-xs">
                  Ver Todas <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {geladeiras.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Banner Row 3 - Parcelamento, Combo, Confiança */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            <BannerImage src="/banners/parcelamento.png" href="/formas-de-pagamento" alt="Parcelamento" className="col-span-2" />
            <BannerImage src="/banners/combo-casa.png" href="/busca" alt="Combo Casa" />
            <BannerImage src="/banners/confianca.png" href="/contato" alt="Confiança" />
          </div>
        </div>
      </section>

      {/* Fogões */}
      {fogoes.length > 0 && (
        <section className="py-6 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-2 rounded-lg">
                  <span className="text-base">🔥</span>
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-black text-gray-900">Fogões & Cooktops</h2>
                  <p className="text-gray-500 text-xs">Cozinhe com estilo</p>
                </div>
              </div>
              <Link href="/c/fogoes">
                <Button size="sm" variant="outline" className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold text-xs">
                  Ver Todos <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {fogoes.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Pills */}
      <section className="py-5 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-sm font-bold text-gray-700 mb-3">Navegue por Categoria</h2>
          <div className="flex flex-wrap gap-1.5">
            {categories.slice(0, 10).map((cat) => (
              <Link key={cat.slug} href={`/c/${cat.slug}`}>
                <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition">
                  {categoryIcons[cat.slug] || '📦'} {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mais Vendidos */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-2 rounded-lg">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-black text-gray-900">⭐ Mais Vendidos</h2>
                <p className="text-gray-500 text-xs">Os queridinhos dos clientes</p>
              </div>
            </div>
            <Link href="/busca?sort=rating">
              <Button size="sm" variant="outline" className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-bold text-xs">
                Ver Todos <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {maisVendidos.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-6 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-sm font-bold text-center text-gray-700 mb-5">
            Por que comprar na <span className="text-blue-600">{siteConfig.name}</span>?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Truck, color: 'blue', title: 'Entrega Rápida', desc: 'Receba em até 48h' },
              { icon: Shield, color: 'green', title: 'Compra Segura', desc: 'Dados protegidos' },
              { icon: Clock, color: 'orange', title: 'Suporte 24h', desc: 'Atendimento integral' },
              { icon: Package, color: 'purple', title: 'Devolução Grátis', desc: `Até ${siteConfig.policies.returnDays} dias` },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-4 bg-white rounded-lg border border-gray-100">
                <div className={`w-10 h-10 bg-${item.color}-500 rounded-lg flex items-center justify-center mb-2 shadow-lg shadow-${item.color}-500/25`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-xs">{item.title}</h3>
                <p className="text-[10px] text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 bg-gradient-to-br from-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-5 right-5 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-5 left-5 w-56 h-56 bg-red-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-xl md:text-2xl font-black mb-3">
            Tudo para sua casa com os <span className="text-yellow-300">melhores preços!</span>
          </h2>
          <p className="text-blue-200 text-sm mb-5 max-w-md mx-auto">
            Ofertas exclusivas em eletrodomésticos e eletrônicos.
          </p>
          <div className="flex gap-2.5 justify-center">
            <Link href="/busca">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold text-sm px-6 py-4 rounded-lg shadow-xl">
                COMEÇAR A COMPRAR
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/empresa">
              <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-sm px-6 py-4 rounded-lg">
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
