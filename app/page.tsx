'use client'

import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowRight, Truck, Shield, CreditCard, Zap, 
  TrendingUp, Package, Clock, ChevronRight, Flame,
  Sparkles, Gift, MapPin, Headphones, 
  Refrigerator, Microwave, Washer,
  Star, Award, Headset, Banknote
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
      <div className={`${bgGradient} rounded-2xl p-6 text-white cursor-pointer transition-all hover:shadow-xl hover:scale-105 group`}>
        <div className="mb-3 inline-block p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition">
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="font-black text-lg mb-1">{title}</h3>
        <p className="text-xs text-white/80">{description}</p>
        <div className="mt-3 flex items-center gap-1 text-sm font-semibold opacity-0 group-hover:opacity-100 transition">
          Ver mais <ArrowRight className="w-4 h-4" />
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
        
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div className="text-white space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-full text-xs font-bold">
                <Sparkles className="w-3 h-3" />
                QUALIDADE GARANTIDA
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                Sua Casa Merece o Melhor
                <span className="block text-yellow-300">Até 80% de Desconto</span>
              </h1>
              
              <p className="text-sm md:text-base text-blue-100 max-w-md leading-relaxed">
                Compre eletrodomésticos de qualidade com segurança. {siteConfig.payment.maxInstallments}x sem juros, {siteConfig.payment.pixDiscount}% OFF no Pix e garantia de 12 meses em todos os produtos.
              </p>
              
              <div className="flex gap-2.5 pt-2">
                <Link href="/busca?sort=discount">
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-sm px-6 py-5 shadow-lg rounded-lg group">
                    <Zap className="w-4 h-4 mr-2" />
                    VER OFERTAS
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <Link href="/busca">
                  <Button className="bg-white hover:bg-gray-100 text-blue-700 font-bold text-sm px-6 py-5 rounded-lg">
                    Explorar Catálogo
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white border border-white/20 hover:bg-white/15 transition">
                <div className="bg-yellow-400/20 w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                  <Truck className="w-6 h-6 text-yellow-300" />
                </div>
                <h3 className="font-bold text-sm">Frete Grátis</h3>
                <p className="text-xs text-blue-200 mt-1">Acima de {formatCurrency(siteConfig.shipping.freeShippingMinimum)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white border border-white/20 hover:bg-white/15 transition">
                <div className="bg-green-400/20 w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 text-green-300" />
                </div>
                <h3 className="font-bold text-sm">12 Meses</h3>
                <p className="text-xs text-blue-200 mt-1">Garantia total</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white border border-white/20 hover:bg-white/15 transition">
                <div className="bg-blue-300/20 w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                  <CreditCard className="w-6 h-6 text-blue-200" />
                </div>
                <h3 className="font-bold text-sm">Até 6x</h3>
                <p className="text-xs text-blue-200 mt-1">Sem juros</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg p-4 text-blue-900 shadow-lg hover:shadow-xl transition">
                <div className="bg-yellow-300/40 w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                  <Banknote className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm">10% OFF</h3>
                <p className="text-xs font-semibold mt-1">Pagamento Pix</p>
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
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900">Encontre o Que Precisa</h2>
            <p className="text-gray-500 text-sm mt-2">Navegue pelas principais categorias de produtos</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              Icon={Washer}
              bgGradient="bg-gradient-to-br from-teal-500 to-teal-600"
              description="Limpeza perfeita"
            />
          </div>
        </div>
      </section>

      {/* Ofertas da Semana */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-red-600" />
                <h2 className="text-3xl font-black text-gray-900">Ofertas Imperdíveis</h2>
              </div>
              <p className="text-gray-500 text-sm">Descontos especiais que você não pode perder</p>
            </div>
            <Link href="/busca?sort=discount">
              <Button className="bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-6 py-2 rounded-lg">
                Ver Todas <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ofertasDaSemana.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Geladeiras Section */}
      {geladeiras.length > 0 && (
        <section className="py-8 bg-gradient-to-br from-blue-50 via-blue-50 to-cyan-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Refrigerator className="w-6 h-6 text-blue-600" />
                  <h2 className="text-3xl font-black text-gray-900">Geladeiras & Freezers</h2>
                </div>
                <p className="text-gray-600 text-sm">Conservação inteligente com eficiência energética</p>
              </div>
              <Link href="/c/geladeiras">
                <Button variant="outline" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold text-sm px-6 py-2 rounded-lg">
                  Ver Todas <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {geladeiras.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fogões Section */}
      {fogoes.length > 0 && (
        <section className="py-8 bg-gradient-to-br from-orange-50 via-orange-50 to-amber-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-6 h-6 text-orange-600" />
                  <h2 className="text-3xl font-black text-gray-900">Fogões e Cooktops</h2>
                </div>
                <p className="text-gray-600 text-sm">Cozinhe com estilo, tecnologia e segurança</p>
              </div>
              <Link href="/c/fogoes">
                <Button variant="outline" className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold text-sm px-6 py-2 rounded-lg">
                  Ver Todos <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {fogoes.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Micro-ondas Section */}
      {microondas.length > 0 && (
        <section className="py-8 bg-gradient-to-br from-purple-50 via-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Microwave className="w-6 h-6 text-purple-600" />
                  <h2 className="text-3xl font-black text-gray-900">Micro-ondas</h2>
                </div>
                <p className="text-gray-600 text-sm">Aquecimento rápido com potência e precisão</p>
              </div>
              <Link href="/c/microondas">
                <Button variant="outline" className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-bold text-sm px-6 py-2 rounded-lg">
                  Ver Todos <ArrowRight className="w-4 h-4 ml-1" />
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
        <section className="py-8 bg-gradient-to-br from-teal-50 via-teal-50 to-cyan-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Washer className="w-6 h-6 text-teal-600" />
                  <h2 className="text-3xl font-black text-gray-900">Máquinas de Lavar</h2>
                </div>
                <p className="text-gray-600 text-sm">Limpeza perfeita com durabilidade garantida</p>
              </div>
              <Link href="/c/maquinas-lavar">
                <Button variant="outline" className="border-2 border-teal-500 text-teal-600 hover:bg-teal-50 font-bold text-sm px-6 py-2 rounded-lg">
                  Ver Todos <ArrowRight className="w-4 h-4 ml-1" />
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
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-6 h-6 text-yellow-500" />
                <h2 className="text-3xl font-black text-gray-900">Mais Vendidos</h2>
              </div>
              <p className="text-gray-500 text-sm">Escolhidos pelos nossos clientes</p>
            </div>
            <Link href="/busca?sort=rating">
              <Button variant="outline" className="border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 font-bold text-sm px-6 py-2 rounded-lg">
                Ver Todos <ArrowRight className="w-4 h-4 ml-1" />
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
      <section className="py-10 bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-10">
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
      <section className="py-10 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-3">Encontre o Produto Perfeito</h2>
          <p className="text-blue-100 mb-6 max-w-md mx-auto text-base">Explore nosso catálogo completo com dezenas de marcas líderes e ofertas exclusivas</p>
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
