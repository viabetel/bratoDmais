'use client'

import Link from 'next/link'
import { ArrowRight, Truck, Shield, CreditCard, Zap, Flame, Refrigerator, Microwave, Droplets, Star, Award, Headset, Banknote, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products } from '@/data/products'
import { ProductCard } from '@/components/products/ProductCard'
import { HeroSection } from '@/components/home/HeroSection'
import { TrustBanner } from '@/components/home/TrustBanner'
import { CategoriesGrid } from '@/components/home/CategoriesGrid'
import { ProductGrid } from '@/components/home/ProductGrid'
import { CampaignBanner } from '@/components/home/CampaignBanner'
import { FAQSection } from '@/components/home/FAQSection'
import { CompareBar } from '@/components/home/CompareBar'
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
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, 8)
}

const getAtePrix = (price: number) => products.filter(p => p.price <= price).slice(0, 4)

export default function Home() {
  const ofertasDaSemana = getOfertasDaSemana()
  const maisVendidos = getMaisVendidos()
  const ate199 = getAtePrix(199)
  const ate499 = getAtePrix(499)
  const ate999 = getAtePrix(999)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Trust Banner */}
      <TrustBanner />
      
      {/* Categories Grid */}
      <CategoriesGrid />

      {/* Flash Offers */}
      <ProductGrid
        title="Ofertas Relâmpago"
        description="Produtos com os melhores descontos do momento"
        products={ofertasDaSemana}
        viewMoreHref="/busca?sort=discount"
        badge="flash"
      />

      {/* Best Sellers */}
      <ProductGrid
        title="Mais Vendidos"
        description="Produtos escolhidos e aprovados por nossos clientes"
        products={maisVendidos}
        viewMoreHref="/busca?sort=rating"
        badge="bestseller"
      />

      {/* Price Ranges Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Ofertas por Faixa de Preço
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Até R$ 199 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Até R$ 199</h3>
              <div className="space-y-3 mb-6">
                {ate199.map(product => (
                  <Link key={product.id} href={`/p/${product.slug}`}>
                    <div className="bg-white rounded-lg p-3 hover:shadow-md transition-all cursor-pointer">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-1">{product.name}</p>
                      <p className="text-blue-600 font-bold text-sm">{formatBRL(product.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/busca?maxPrice=199">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2">
                  Ver Mais <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Até R$ 499 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Até R$ 499</h3>
              <div className="space-y-3 mb-6">
                {ate499.map(product => (
                  <Link key={product.id} href={`/p/${product.slug}`}>
                    <div className="bg-white rounded-lg p-3 hover:shadow-md transition-all cursor-pointer">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-1">{product.name}</p>
                      <p className="text-purple-600 font-bold text-sm">{formatBRL(product.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/busca?maxPrice=499">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2">
                  Ver Mais <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Até R$ 999 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Até R$ 999</h3>
              <div className="space-y-3 mb-6">
                {ate999.map(product => (
                  <Link key={product.id} href={`/p/${product.slug}`}>
                    <div className="bg-white rounded-lg p-3 hover:shadow-md transition-all cursor-pointer">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-1">{product.name}</p>
                      <p className="text-green-600 font-bold text-sm">{formatBRL(product.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/busca?maxPrice=999">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2">
                  Ver Mais <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Banner */}
      <CampaignBanner
        title="Semana Especial de Ar Condicionado"
        subtitle="Climatização com até 50% de desconto. Frete grátis em compras acima de R$ 299."
        cta="Aproveitar"
        href="/busca?categoria=climatizacao"
        gradient="from-cyan-500 via-blue-500 to-blue-600"
      />

      {/* Trust Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Por Que Confiar em Nós
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Entrega Rápida</h3>
              <p className="text-gray-600 text-sm">Entrega em até 7 dias úteis com rastreamento</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Compra Segura</h3>
              <p className="text-gray-600 text-sm">Transações criptografadas e protegidas</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Parcelamento</h3>
              <p className="text-gray-600 text-sm">Até 12x sem juros no cartão</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all">
              <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Garantia 12 Meses</h3>
              <p className="text-gray-600 text-sm">Garantia em todos os produtos</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para Economizar?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Milhares de clientes já aproveitam nossos preços especiais. Compre agora e receba frete grátis!
          </p>
          <Link href="/busca">
            <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold px-8 py-4 rounded-lg text-lg flex items-center gap-2 mx-auto transition-all">
              Começar a Comprar <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>

      {/* Compare Bar */}
      <CompareBar />
    </div>
  )

const getGeladeiras = () => products.filter(p => p.categorySlug === 'geladeiras').slice(0, 4)
const getFogoes = () => products.filter(p => p.categorySlug === 'fogoes').slice(0, 4)
const getMicroondas = () => products.filter(p => p.categorySlug === 'microondas').slice(0, 4)
const getLavadoras = () => products.filter(p => p.categorySlug === 'maquinas-lavar').slice(0, 4)

// Category Card Component - com ícone Lucide
interface CategoryCardProps {
  title: string
  href: string
  Icon: React.ComponentType<{ className: string }>
  bgGradient: string
  description: string
}

function CategoryCard({ 
  title, 
  href, 
  Icon,
  bgGradient,
  description
}: CategoryCardProps) {
  return (
    <Link href={href}>
      <div className={`${bgGradient} rounded-xl p-4 text-white cursor-pointer transition-all hover:shadow-lg hover:scale-102 group border border-white/20`}>
        <div className="mb-2 inline-block p-2 bg-white/15 rounded-lg group-hover:bg-white/25 transition">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-sm mb-0.5">{title}</h3>
        <p className="text-xs text-white/70">{description}</p>
        <div className="mt-2 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
          Ver <ArrowRight className="w-3 h-3" />
        </div>
      </div>
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
            <span className="font-bold">SUPER OFERTAS</span>
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
    <div className="min-h-screen bg-white">
      <PromoBanner />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M20 20h20v20H20zM0 0h20v20H0z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="absolute top-5 left-5 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-5 right-5 w-64 h-64 bg-yellow-300/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-6 md:py-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-4 items-center">
            <div className="text-white space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                <Sparkles className="w-3 h-3" />
                QUALIDADE GARANTIDA
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight">
                Sua Casa Merece o Melhor
                <span className="block text-yellow-300">Até 80% de Desconto</span>
              </h1>
              
              <p className="text-xs md:text-sm text-blue-100 max-w-md leading-relaxed">
                Compre eletrodomésticos de qualidade com segurança. {siteConfig.payment.maxInstallments}x sem juros, {siteConfig.payment.pixDiscount}% OFF no Pix e garantia de 12 meses.
              </p>
              
              <div className="flex gap-2 pt-1">
                <Link href="/busca?sort=discount">
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-xs px-5 py-4 shadow-lg rounded-lg group">
                    <Zap className="w-4 h-4 mr-1.5" />
                    VER OFERTAS
                    <ArrowRight className="w-3 h-3 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <Link href="/busca">
                  <Button className="bg-white hover:bg-gray-100 text-blue-700 font-bold text-xs px-5 py-4 rounded-lg">
                    Explorar
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white border border-white/20 hover:bg-white/15 transition">
                <div className="bg-yellow-400/20 w-9 h-9 rounded-lg flex items-center justify-center mb-1.5">
                  <Truck className="w-5 h-5 text-yellow-300" />
                </div>
                <h3 className="font-bold text-xs">Frete Grátis</h3>
                <p className="text-[11px] text-blue-200 mt-0.5">{formatCurrency(siteConfig.shipping.freeShippingMinimum)}+</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white border border-white/20 hover:bg-white/15 transition">
                <div className="bg-green-400/20 w-9 h-9 rounded-lg flex items-center justify-center mb-1.5">
                  <Award className="w-5 h-5 text-green-300" />
                </div>
                <h3 className="font-bold text-xs">12 Meses</h3>
                <p className="text-[11px] text-blue-200 mt-0.5">Garantia</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white border border-white/20 hover:bg-white/15 transition">
                <div className="bg-blue-300/20 w-9 h-9 rounded-lg flex items-center justify-center mb-1.5">
                  <CreditCard className="w-5 h-5 text-blue-200" />
                </div>
                <h3 className="font-bold text-xs">Até 6x</h3>
                <p className="text-[11px] text-blue-200 mt-0.5">Sem juros</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg p-3 text-blue-900 shadow-lg hover:shadow-xl transition">
                <div className="bg-yellow-300/40 w-9 h-9 rounded-lg flex items-center justify-center mb-1.5">
                  <Banknote className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xs">10% OFF</h3>
                <p className="text-[11px] font-semibold mt-0.5">Pix</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" className="w-full">
            <path d="M0 50L720 30L1440 50V50H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* Categorias Principais - Cards com Ícones Profissionais */}
      <section className="py-5 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-5">
            <h2 className="text-2xl font-black text-gray-900">Encontre o Que Precisa</h2>
            <p className="text-gray-500 text-xs mt-1">Principais categorias de produtos</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <CategoryCard 
              title="Geladeiras" 
              href="/c/geladeiras" 
              Icon={Refrigerator}
              bgGradient="bg-gradient-to-br from-blue-500 to-blue-600"
              description="Conservação inteligente"
            />
            <CategoryCard 
              title="Fogões" 
              href="/c/fogoes" 
              Icon={Flame}
              bgGradient="bg-gradient-to-br from-orange-500 to-orange-600"
              description="Cozinhe com eficiência"
            />
            <CategoryCard 
              title="Micro-ondas" 
              href="/c/microondas" 
              Icon={Microwave}
              bgGradient="bg-gradient-to-br from-purple-500 to-purple-600"
              description="Aquecimento rápido"
            />
            <CategoryCard 
              title="Máquinas de Lavar" 
              href="/c/maquinas-lavar" 
              Icon={Droplets}
              bgGradient="bg-gradient-to-br from-teal-500 to-teal-600"
              description="Limpeza perfeita"
            />
          </div>
        </div>
      </section>

      {/* Ofertas da Semana */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-5 h-5 text-red-600" />
                <h2 className="text-2xl font-black text-gray-900">Ofertas Imperdíveis</h2>
              </div>
              <p className="text-gray-500 text-xs">Descontos especiais</p>
            </div>
            <Link href="/busca?sort=discount">
              <Button className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-lg">
                Ver Todas <ArrowRight className="w-3 h-3 ml-1" />
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

      {/* Geladeiras Section */}
      {geladeiras.length > 0 && (
        <section className="py-4 bg-gradient-to-br from-blue-50 via-blue-50 to-cyan-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Refrigerator className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-black text-gray-900">Geladeiras & Freezers</h2>
                </div>
                <p className="text-gray-600 text-xs">Conservação inteligente</p>
              </div>
              <Link href="/c/geladeiras">
                <Button variant="outline" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold text-xs px-4 py-1.5 rounded-lg">
                  Ver Todas <ArrowRight className="w-3 h-3 ml-1" />
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

      {/* Fogões Section */}
      {fogoes.length > 0 && (
        <section className="py-4 bg-gradient-to-br from-orange-50 via-orange-50 to-amber-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-5 h-5 text-orange-600" />
                  <h2 className="text-xl font-black text-gray-900">Fogões e Cooktops</h2>
                </div>
                <p className="text-gray-600 text-xs">Cozinhe com estilo e segurança</p>
              </div>
              <Link href="/c/fogoes">
                <Button variant="outline" className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold text-xs px-4 py-1.5 rounded-lg">
                  Ver Todos <ArrowRight className="w-3 h-3 ml-1" />
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

      {/* Micro-ondas Section */}
      {microondas.length > 0 && (
        <section className="py-4 bg-gradient-to-br from-purple-50 via-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Microwave className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-black text-gray-900">Micro-ondas</h2>
                </div>
                <p className="text-gray-600 text-xs">Aquecimento rápido e preciso</p>
              </div>
              <Link href="/c/microondas">
                <Button variant="outline" className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-bold text-xs px-4 py-1.5 rounded-lg">
                  Ver Todos <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {microondas.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Máquinas de Lavar Section */}
      {lavadoras.length > 0 && (
        <section className="py-4 bg-gradient-to-br from-teal-50 via-teal-50 to-cyan-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Droplets className="w-5 h-5 text-teal-600" />
                  <h2 className="text-xl font-black text-gray-900">Máquinas de Lavar</h2>
                </div>
                <p className="text-gray-600 text-xs">Limpeza perfeita e durável</p>
              </div>
              <Link href="/c/maquinas-lavar">
                <Button variant="outline" className="border-2 border-teal-500 text-teal-600 hover:bg-teal-50 font-bold text-xs px-4 py-1.5 rounded-lg">
                  Ver Todos <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {lavadoras.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mais Vendidos */}
      <section className="py-4 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl font-black text-gray-900">Mais Vendidos</h2>
              </div>
              <p className="text-gray-500 text-xs">Escolhidos pelos clientes</p>
            </div>
            <Link href="/busca?sort=rating">
              <Button variant="outline" className="border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 font-bold text-xs px-4 py-1.5 rounded-lg">
                Ver Todos <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {maisVendidos.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - Por Que Escolher a Barato D+ */}
      <section className="py-6 bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-black text-center text-gray-900 mb-6">
            Por Que Escolher <span className="text-blue-600">{siteConfig.name}</span>?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Entrega Rápida</h3>
              <p className="text-gray-600 text-sm">Receba em até 48 horas úteis em sua casa</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Compra Protegida</h3>
              <p className="text-gray-600 text-sm">Seus dados seguros com criptografia SSL</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition">
              <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headset className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Suporte 24/7</h3>
              <p className="text-gray-600 text-sm">Atendimento especializado o tempo todo</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Garantia Completa</h3>
              <p className="text-gray-600 text-sm">12 meses de garantia em todos os itens</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-2">Encontre o Produto Perfeito</h2>
          <p className="text-blue-100 mb-5 max-w-md mx-auto text-sm">Explore nosso catálogo completo com dezenas de marcas líderes</p>
          <Link href="/busca">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-base px-8 py-3 rounded-lg shadow-lg">
              Explorar Catálogo <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
