'use client'

import Link from 'next/link'
<<<<<<< HEAD
import { ArrowRight, Truck, Shield, CreditCard, Award, Wrench, Calendar, Package, Sparkles, Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products } from '@/data/products'
import { services } from '@/data/services'
=======
import { ArrowRight, Truck, Shield, CreditCard, Zap, Flame, Refrigerator, Microwave, Droplets, Star, Award, Headset, Banknote, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products } from '@/data/products'
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
import { ProductCard } from '@/components/products/ProductCard'
import { HeroSection } from '@/components/home/HeroSection'
import { TrustBanner } from '@/components/home/TrustBanner'
import { CategoriesGrid } from '@/components/home/CategoriesGrid'
import { ProductGrid } from '@/components/home/ProductGrid'
import { SectionBanner, bannerVariants } from '@/components/home/SectionBanner'
import { CampaignBanner } from '@/components/home/CampaignBanner'
import { FAQSection } from '@/components/home/FAQSection'
<<<<<<< HEAD
import { FlashDealsSection } from '@/components/home/FlashDealsSection'
=======
import { CompareBar } from '@/components/home/CompareBar'
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
import { formatBRL, getDiscountPercent } from '@/lib/utils/format'
import { formatCurrency } from '@/lib/config'
import { SERVICE_TYPE_CONFIG } from '@/lib/utils/images'

// Product selectors
const getOfertasDaSemana = () =>
  [...products]
    .sort((a, b) => getDiscountPercent(b.originalPrice, b.price) - getDiscountPercent(a.originalPrice, a.price))
    .slice(0, 8)

<<<<<<< HEAD
const getMaisVendidos = () =>
  [...products].sort((a, b) => b.rating - a.rating).slice(0, 8)

const getAtePrix = (max: number) =>
  products.filter(p => p.price <= max).slice(0, 4)

// Services cross-category: group by type
const FEATURED_SERVICE_TYPES = [
  { type: 'installation' as const, icon: Wrench, color: 'orange', title: 'Instalação', desc: 'Por técnico certificado com garantia de serviço', href: '/busca?service=installation' },
  { type: 'rental' as const, icon: Calendar, color: 'green', title: 'Aluguel', desc: 'Geladeiras, lavadoras, ACs por dia, semana ou mês', href: '/busca?service=rental' },
  { type: 'maintenance' as const, icon: Shield, color: 'blue', title: 'Manutenção', desc: 'Preventiva, anual ou emergencial 24h', href: '/busca?service=maintenance' },
  { type: 'warranty' as const, icon: Award, color: 'purple', title: 'Garantia Estendida', desc: 'Proteção de 12 a 36 meses para seu produto', href: '/busca?service=warranty' },
  { type: 'protection' as const, icon: Shield, color: 'red', title: 'Proteção Total', desc: 'Cobertura contra acidentes e roubo', href: '/busca?service=protection' },
]

const COLOR_MAP: Record<string, { bg: string; icon: string; btn: string }> = {
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600 bg-orange-100', btn: 'bg-orange-600 hover:bg-orange-700' },
  green: { bg: 'bg-green-50', icon: 'text-green-600 bg-green-100', btn: 'bg-green-600 hover:bg-green-700' },
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600 bg-blue-100', btn: 'bg-blue-600 hover:bg-blue-700' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600 bg-purple-100', btn: 'bg-purple-600 hover:bg-purple-700' },
  red: { bg: 'bg-red-50', icon: 'text-red-600 bg-red-100', btn: 'bg-red-600 hover:bg-red-700' },
=======
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
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
}

export default function Home() {
  const ofertasDaSemana = getOfertasDaSemana()
  const maisVendidos = getMaisVendidos()
  const ate199 = getAtePrix(199)
  const ate499 = getAtePrix(499)
  const ate999 = getAtePrix(999)
<<<<<<< HEAD

  // Count services by type
  const serviceCountByType = FEATURED_SERVICE_TYPES.reduce((acc, st) => {
    acc[st.type] = services.filter(s => s.type === st.type).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <HeroSection />

      {/* Trust Banner */}
      <TrustBanner />

      {/* Categories */}
      <CategoriesGrid />

      {/* Flash Deals */}
      <FlashDealsSection />

      {/* Flash Offers Banner */}
      <section className="py-4 md:py-6">
        <div className="container mx-auto px-4">
          <SectionBanner {...bannerVariants.flashDeals} href="/busca?sort=discount" />
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
        showCountdown={true}
      />

      {/* Services Section - Cross-category */}
      <section className="py-12 md:py-16 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              DISPONÍVEL PARA TODOS OS PRODUTOS
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
              Serviços Exclusivos
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
              Instalação, manutenção, aluguel e proteção — disponíveis para eletrodomésticos, eletrônicos e muito mais
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {FEATURED_SERVICE_TYPES.map((st) => {
              const colors = COLOR_MAP[st.color]
              const Icon = st.icon
              const cheapest = services.filter(s => s.type === st.type).sort((a, b) => a.price - b.price)[0]

              return (
                <Link key={st.type} href={st.href}>
                  <div className={`${colors.bg} rounded-xl p-5 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 h-full flex flex-col cursor-pointer group`}>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${colors.icon}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm">{st.title}</h3>
                    <p className="text-xs text-gray-500 mb-3 flex-1 leading-relaxed">{st.desc}</p>
                    <div className="flex items-center justify-between">
                      {cheapest && (
                        <span className="text-xs font-bold text-gray-700">
                          A partir de {formatBRL(cheapest.price)}
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <div className="mt-2 text-[10px] font-semibold text-gray-400">
                      {serviceCountByType[st.type]} opções disponíveis
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Best Sellers Banner */}
      <section className="py-4 md:py-6">
        <div className="container mx-auto px-4">
          <SectionBanner {...bannerVariants.bestsellers} href="/busca?sort=rating" />
=======

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
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
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

<<<<<<< HEAD
      {/* Price Ranges */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Para todos os bolsos</p>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Ofertas por Faixa de Preço</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { max: 199, products: ate199, color: 'blue', gradient: 'from-blue-50 to-blue-100', border: 'border-blue-200', btn: 'bg-blue-600 hover:bg-blue-700', price: 'text-blue-600' },
              { max: 499, products: ate499, color: 'purple', gradient: 'from-purple-50 to-purple-100', border: 'border-purple-200', btn: 'bg-purple-600 hover:bg-purple-700', price: 'text-purple-600' },
              { max: 999, products: ate999, color: 'green', gradient: 'from-green-50 to-green-100', border: 'border-green-200', btn: 'bg-green-600 hover:bg-green-700', price: 'text-green-600' },
            ].map(({ max, products: prods, gradient, border, btn, price }) => (
              <div key={max} className={`bg-gradient-to-br ${gradient} rounded-xl p-6 border ${border}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-gray-900">Até {formatBRL(max)}</h3>
                  <span className="text-xs font-bold bg-white px-2 py-1 rounded-full border border-gray-200 text-gray-600">
                    {prods.length} produtos
                  </span>
                </div>
                <div className="space-y-2 mb-5">
                  {prods.map(product => (
                    <Link key={product.id} href={`/p/${product.slug}`}>
                      <div className="bg-white rounded-lg p-3 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-gray-900 line-clamp-1 flex-1">{product.name}</p>
                        <p className={`${price} font-bold text-sm whitespace-nowrap`}>{formatBRL(product.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href={`/busca?maxPrice=${max}`}>
                  <button className={`w-full ${btn} text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors`}>
                    Ver Mais <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
=======
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
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
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

<<<<<<< HEAD
      {/* Campaign Banner */}
      <CampaignBanner
        title="Semana Especial de Climatização"
        subtitle="Ar condicionado com até 50% de desconto + instalação inclusa em modelos selecionados."
        cta="Aproveitar Agora"
        href="/busca?categoria=climatizacao"
        gradient="from-cyan-500 via-blue-500 to-blue-600"
      />

      {/* Why Trust Us */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Por Que Confiar em Nós</h2>
            <p className="text-gray-500">Mais de 10.000 clientes satisfeitos em Juiz de Fora e região</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Truck, color: 'blue', title: 'Entrega Rápida', desc: 'Em até 7 dias úteis com rastreamento em tempo real' },
              { icon: Shield, color: 'green', title: 'Compra Segura', desc: 'Transações criptografadas e protegidas pelo nosso sistema' },
              { icon: CreditCard, color: 'purple', title: 'Parcelamento', desc: `Até 12x sem juros no cartão de crédito` },
              { icon: Award, color: 'orange', title: 'Garantia 12 Meses', desc: 'Garantia total em todos os produtos do catálogo' },
            ].map(({ icon: Icon, color, title, desc }) => {
              const colorMap: Record<string, string> = {
                blue: 'bg-blue-100 text-blue-600', green: 'bg-green-100 text-green-600',
                purple: 'bg-purple-100 text-purple-600', orange: 'bg-orange-100 text-orange-600',
              }
              return (
                <div key={title} className="bg-white rounded-xl p-5 md:p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${colorMap[color]}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              )
            })}
          </div>

          {/* Social proof strip */}
          <div className="mt-10 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-around gap-6">
            {[
              { value: '10.000+', label: 'Clientes Atendidos' },
              { value: '4.8★', label: 'Avaliação Média' },
              { value: '98%', label: 'Satisfação Garantida' },
              { value: '5 anos', label: 'No Mercado' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl md:text-3xl font-black text-blue-600">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
=======
      {/* FAQ Section */}
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
      <FAQSection />

      {/* Final CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
<<<<<<< HEAD
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-bold mb-4">
            <Zap className="w-4 h-4 text-yellow-300" />
            Frete grátis em compras acima de {formatCurrency(299)}
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-3">Pronto para Economizar?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Milhares de clientes já aproveitam nossos preços especiais. Compre agora!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/busca">
              <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold px-8 py-4 rounded-xl text-base flex items-center gap-2 mx-auto transition-all hover:shadow-xl hover:scale-105 active:scale-95">
                Começar a Comprar <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/busca?service=installation">
              <button className="bg-transparent border-2 border-white/60 hover:border-white hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl text-base flex items-center gap-2 mx-auto transition-all">
                <Wrench className="w-5 h-5" />
                Ver Serviços
              </button>
            </Link>
          </div>
        </div>
      </section>

=======
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
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
    </div>
  )
}
