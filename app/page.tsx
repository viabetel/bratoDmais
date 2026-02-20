'use client'

import Link from 'next/link'
import { ArrowRight, Truck, Shield, CreditCard, Zap, Flame, Refrigerator, Microwave, Droplets, Star, Award, Headset, Banknote, ChevronRight, Sparkles, Wrench, Package, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products } from '@/data/products'
import { getServicesByType } from '@/data/services'
import { ProductCard } from '@/components/products/ProductCard'
import { ServiceCard } from '@/components/services/ServiceCard'
import { HeroSection } from '@/components/home/HeroSection'
import { TrustBanner } from '@/components/home/TrustBanner'
import { CategoriesGrid } from '@/components/home/CategoriesGrid'
import { ProductGrid } from '@/components/home/ProductGrid'
import { SectionBanner, bannerVariants } from '@/components/home/SectionBanner'
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
  const ate199 = getAtePrix(199)
  const ate499 = getAtePrix(499)
  const ate999 = getAtePrix(999)
  
  // Get featured services
  const instalacaoServices = getServicesByType('installation').slice(0, 2)
  const aluguelServices = getServicesByType('rental').slice(0, 2)
  const manutencaoServices = getServicesByType('maintenance').slice(0, 2)
  const allServices = [...instalacaoServices, ...aluguelServices, ...manutencaoServices].slice(0, 6)

  return (
    <div className="min-h-screen bg-white">
      <PromoBanner />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Trust Banner */}
      <TrustBanner />
      
      {/* Categories Grid */}
      <CategoriesGrid />

      {/* Flash Offers Banner */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <SectionBanner
            {...bannerVariants.flashDeals}
            href="/busca?sort=discount"
          />
        </div>
      </section>

      {/* Flash Offers */}
      <ProductGrid
        title="Ofertas Relâmpago"
        description="Produtos com os melhores descontos do momento"
        products={ofertasDaSemana}
        viewMoreHref="/busca?sort=discount"
        badge="flash"
        hideTitle={true}
      />

      {/* Best Sellers Banner */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <SectionBanner
            {...bannerVariants.bestsellers}
            href="/busca?sort=rating"
          />
        </div>
      </section>

      {/* Best Sellers */}
      <ProductGrid
        title="Mais Vendidos"
        description="Produtos escolhidos e aprovados por nossos clientes"
        products={maisVendidos}
        viewMoreHref="/busca?sort=rating"
        badge="bestseller"
        hideTitle={true}
      />

      {/* Ofertas Imperdíveis - Services Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-bold text-blue-100 uppercase tracking-wide">Serviços Exclusivos</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white text-balance">
                  Ofertas Imperdíveis!
                </h2>
                <p className="text-blue-100 mt-2">
                  Instalação, Manutenção, Aluguel - Tudo que você precisa em um só lugar
                </p>
              </div>
              <Link href="/c/climatizacao" className="hidden md:block flex-shrink-0 ml-4">
                <Button className="bg-white hover:bg-blue-50 text-blue-600 font-bold px-6 py-2.5">
                  Ver Mais <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Services Grid */}
          {allServices.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {allServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isRental={service.type === 'rental'}
                  />
                ))}
              </div>
              <div className="md:hidden text-center">
                <Link href="/c/climatizacao">
                  <Button className="w-full bg-white hover:bg-blue-50 text-blue-600 font-bold py-2.5">
                    Ver Todas os Serviços <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-blue-100 mx-auto mb-3" />
              <p className="text-blue-100">Serviços em breve...</p>
            </div>
          )}
        </div>
      </section>

      {/* Price Ranges Banner */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <SectionBanner
            {...bannerVariants.priceRanges}
          />
        </div>
      </section>
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
}
