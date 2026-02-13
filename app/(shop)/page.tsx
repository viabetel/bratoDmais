'use client'

import Link from 'next/link'
import { ArrowRight, Star, Truck, Shield, CreditCard, Sparkles, TrendingUp, Package, Zap, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import { ProductCard } from '@/components/products/ProductCard'
import { formatBRL, getDiscountPercent, getPixPrice } from '@/lib/utils/format'

// Get featured products from real catalog
const getFeaturedProducts = () => {
  return products.slice(0, 8)
}

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
}

export default function Home() {
  const featuredProducts = getFeaturedProducts()
  const ofertasDaSemana = getOfertasDaSemana()
  const maisVendidos = getMaisVendidos()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-secondary overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/20 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Ofertas Imperdíveis</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Produtos Novos com
                <span className="block text-yellow-300">até 80% OFF!</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 max-w-lg">
                Eletrodomésticos e eletrônicos com garantia, parcelamento em até 6x sem juros e 10% de desconto no Pix.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/busca?sort=discount">
                  <Button 
                    size="lg" 
                    className="bg-secondary hover:bg-secondary/90 text-white font-bold shadow-xl shadow-secondary/30 text-lg px-8 group"
                  >
                    Ver Ofertas
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/busca">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-8 backdrop-blur-sm"
                  >
                    Explorar Produtos
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Hero Stats/Benefits */}
            <div className="hidden md:grid grid-cols-2 gap-4 animate-slide-up">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white hover:bg-white/15 transition-all">
                <Truck className="w-10 h-10 mb-4 text-yellow-300" />
                <h3 className="font-bold text-lg mb-1">Frete Grátis</h3>
                <p className="text-sm text-white/80">Acima de R$ 299</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white hover:bg-white/15 transition-all">
                <Shield className="w-10 h-10 mb-4 text-yellow-300" />
                <h3 className="font-bold text-lg mb-1">Garantia Total</h3>
                <p className="text-sm text-white/80">Produtos com garantia</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white hover:bg-white/15 transition-all">
                <CreditCard className="w-10 h-10 mb-4 text-yellow-300" />
                <h3 className="font-bold text-lg mb-1">6x Sem Juros</h3>
                <p className="text-sm text-white/80">Em todos os produtos</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white hover:bg-white/15 transition-all">
                <Zap className="w-10 h-10 mb-4 text-yellow-300" />
                <h3 className="font-bold text-lg mb-1">10% OFF no Pix</h3>
                <p className="text-sm text-white/80">Desconto instantâneo</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50L60 45C120 40 240 30 360 25C480 20 600 20 720 30C840 40 960 60 1080 65C1200 70 1320 60 1380 55L1440 50V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Categorias</h2>
              <p className="text-muted-foreground mt-1">Explore nossos departamentos</p>
            </div>
            <Link href="/busca">
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                Ver todas <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.slice(0, 10).map((cat) => (
              <Link key={cat.slug} href={`/c/${cat.slug}`}>
                <div className="group bg-gradient-to-br from-muted/50 to-muted border border-border rounded-xl p-5 text-center hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {categoryIcons[cat.slug] || '📦'}
                  </div>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Deals Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-secondary/5 via-secondary/10 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-secondary text-white p-2 rounded-lg">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-secondary">Ofertas da Semana</h2>
                <p className="text-muted-foreground text-sm mt-0.5">Descontos imperdíveis por tempo limitado</p>
              </div>
            </div>
            <Link href="/busca?sort=discount">
              <Button className="bg-secondary hover:bg-secondary/90 text-white">
                Ver Todas <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ofertasDaSemana.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-white p-2 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Produtos em Destaque</h2>
                <p className="text-muted-foreground text-sm mt-0.5">Mais procurados da semana</p>
              </div>
            </div>
            <Link href="/busca">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Ver Todos <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold mb-1">Entrega Rápida</h3>
              <p className="text-sm text-muted-foreground">Receba em até 48h</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-bold mb-1">Compra Segura</h3>
              <p className="text-sm text-muted-foreground">Dados protegidos</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-bold mb-1">Suporte 24h</h3>
              <p className="text-sm text-muted-foreground">Atendimento integral</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Package className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-bold mb-1">Devolução Grátis</h3>
              <p className="text-sm text-muted-foreground">Até 30 dias</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-2xl mx-auto">
            Tudo para sua casa com os melhores preços!
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">
            Descubra ofertas exclusivas em eletrodomésticos e eletrônicos. Garantia e qualidade em cada produto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/busca">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-10 shadow-xl"
              >
                Começar a Comprar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/empresa">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-10"
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
