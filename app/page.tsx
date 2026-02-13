import Link from 'next/link'
import { Truck, Shield, Zap, Star, Home, Wind, Users, Laptop, Smartphone, Cpu, Package, Gift, Mic, ShoppingBag, TrendingUp, Award, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/ProductCard'
import { HeroCarousel } from '@/components/home/HeroCarousel'
import { SectionDivider } from '@/components/home/SectionDivider'
import { ContentSection } from '@/components/home/ContentSection'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import Image from 'next/image'

const heroSlides = [
  {
    title: 'Eletrodomésticos Premium',
    subtitle: 'Marcas confiáveis com desconto especial. Parcelado em até 12x sem juros + 10% de desconto no Pix.',
    cta: { text: 'Descobrir Ofertas', href: '/c/eletrodomesticos' },
    bgColor: 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900',
  },
  {
    title: 'Tecnologia & Inovação',
    subtitle: 'Últimos lançamentos em smartphones, notebooks e acessórios. Frete grátis acima de R$ 500.',
    cta: { text: 'Ver Eletrônicos', href: '/c/eletronicos' },
    bgColor: 'bg-gradient-to-br from-purple-600 via-pink-600 to-red-600',
  },
  {
    title: 'Climatização Inteligente',
    subtitle: 'Ar condicionado e ventiladores com economia de energia. Qualidade garantida por 12 meses.',
    cta: { text: 'Climatizar Agora', href: '/c/climatizacao' },
    bgColor: 'bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700',
  },
  {
    title: 'Black Friday: -50% OFF',
    subtitle: 'Produtos selecionados com desconto imperdível. Estoque limitado - aproveite agora!',
    cta: { text: 'Comprar Agora', href: '/busca' },
    bgColor: 'bg-gradient-to-br from-orange-500 via-red-600 to-rose-700',
  },
]

const categoryIcons: Record<string, React.ReactNode> = {
  eletrodomesticos: <Home className="w-6 h-6" />,
  climatizacao: <Wind className="w-6 h-6" />,
  utilidades: <Users className="w-6 h-6" />,
  tvs: <Package className="w-6 h-6" />,
  notebooks: <Laptop className="w-6 h-6" />,
  smartphones: <Smartphone className="w-6 h-6" />,
  eletronicos: <Cpu className="w-6 h-6" />,
  perifericos: <Gift className="w-6 h-6" />,
  componentes: <Zap className="w-6 h-6" />,
  acessorios: <ShoppingBag className="w-6 h-6" />,
  studio: <Mic className="w-6 h-6" />,
}

export default function HomePage() {
  // Produtos com maiores descontos
  const topOffers = products
    .sort((a, b) => {
      const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100
      const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100
      return discountB - discountA
    })
    .slice(0, 8)

  // Produtos mais avaliados
  const topRated = products.sort((a, b) => b.rating - a.rating).slice(0, 8)

  // Produtos em estoque
  const inStock = products.filter((p) => p.stock > 0).slice(0, 8)

  // Content sections data
  const benefitsContent = [
    {
      title: 'Qualidade Garantida',
      subtitle: 'qualidade em cada compra',
      description: 'Todos os nossos produtos passam por rigoroso controle de qualidade. Marcas confiáveis com garantia de até 12 meses.',
      icon: <Award className="w-12 h-12 text-primary" />,
    },
    {
      title: 'Inovação Constante',
      subtitle: 'sempre novos produtos',
      description: 'Atualizamos nosso catálogo semanalmente com os últimos lançamentos e tecnologias do mercado.',
      icon: <Lightbulb className="w-12 h-12 text-primary" />,
    },
    {
      title: 'Melhores Preços',
      subtitle: 'economia para você',
      description: 'Ótimos descontos e parcelamento em até 12x sem juros. Pix com 10% de desconto adicional.',
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel 
        slides={heroSlides}
        logo={
          <Image src="/logo.png" alt="Barato D+" width={80} height={80} className="rounded-lg shadow-lg" />
        }
      />

      {/* Trust Badges */}
      <section className="bg-muted py-8 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 text-center md:text-left">
              <Truck className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Frete Grátis</h3>
                <p className="text-xs text-muted-foreground">Em compras acima de R$ 500</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center md:text-left">
              <Shield className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Segurança 100%</h3>
                <p className="text-xs text-muted-foreground">Compra protegida</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center md:text-left">
              <Zap className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Pix 10% OFF</h3>
                <p className="text-xs text-muted-foreground">Na primeira compra</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center md:text-left">
              <Star className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Garantia</h3>
                <p className="text-xs text-muted-foreground">Até 12 meses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Categorias em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.slice(0, 5).map((cat) => (
              <Link key={cat.id} href={`/c/${cat.slug}`}>
                <div className="group bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg hover:border-primary transition-all cursor-pointer h-full flex flex-col justify-center items-center">
                  <div className="mb-3 text-primary">
                    {categoryIcons[cat.slug] || <Package className="w-6 h-6" />}
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <SectionDivider variant="minimal" />

      {/* Top Offers */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Ofertas da Semana</h2>
              <p className="text-sm text-muted-foreground mt-1">Descontos de até 50% em produtos selecionados</p>
            </div>
            <Link href="/busca">
              <Button variant="outline">Ver Todas</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topOffers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <SectionDivider variant="gradient" />

      {/* Content Section - Benefits */}
      <ContentSection 
        title="Por Que Barato D+?" 
        items={benefitsContent}
        bgColor="bg-slate-50"
      />

      {/* Divider */}
      <SectionDivider variant="minimal" />

      {/* Top Rated Products */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Mais Bem Avaliados</h2>
              <p className="text-sm text-muted-foreground mt-1">Produtos confiáveis pelos nossos clientes</p>
            </div>
            <Link href="/busca">
              <Button variant="outline">Ver Todos</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topRated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <SectionDivider variant="dots" />

      {/* In Stock Products */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Disponível na Loja</h2>
              <p className="text-sm text-muted-foreground mt-1">Retirada na loja em até 2 horas</p>
            </div>
            <Link href="/busca">
              <Button variant="outline">Ver Mais</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {inStock.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Não Encontrou o que Procura?</h2>
          <p className="text-lg mb-6 opacity-90">
            Navegue por todas as categorias e encontre os melhores preços
          </p>
          <Link href="/busca">
            <Button size="lg" variant="outline" className="border-current text-current hover:bg-current hover:text-secondary">
              Explorar Catálogo Completo
            </Button>
          </Link>
        </div>
      </section>

      {/* Divider before brands */}
      <SectionDivider variant="minimal" />

      {/* Brands Section */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Marcas Parceiras</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Brastemp', 'Electrolux', 'Samsung', 'LG', 'Consul', 'Panasonic'].map((brand) => (
              <div key={brand} className="bg-card border border-border rounded-lg p-4 text-center flex items-center justify-center h-24 hover:shadow-lg transition-all cursor-pointer">
                <span className="font-semibold text-sm">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Receba Nossas Ofertas</h2>
          <p className="text-muted-foreground mb-6">
            Cadastre seu email e receba as melhores promoções em primeira mão
          </p>
          <form className="max-w-sm mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Seu email"
              className="flex-1 px-4 py-3 rounded border border-border bg-card"
              required
            />
            <Button>Inscrever</Button>
          </form>
        </div>
      </section>
    </main>
  )
}
