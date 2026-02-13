import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Sobre Nós - OutletMix',
  description: 'Conheça a história e missão da OutletMix',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Sobre OutletMix
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Somos o maior outlet de eletrônicos online do Brasil, oferecendo as melhores marcas
            com descontos incríveis direto para sua casa.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-balance">Nossa Missão</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Na OutletMix, acreditamos que todo mundo merece ter acesso aos melhores produtos
                eletrônicos com preços justos. Nossa missão é tornar a tecnologia acessível para
                todos, oferecendo descontos incomparáveis sem comprometer a qualidade.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Com mais de 10 anos de experiência no mercado, consolidamos nosso compromisso com a
                satisfação do cliente, entrega rápida e segurança nas transações.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary to-primary/60 h-64 md:h-96 rounded-lg flex items-center justify-center text-6xl">
              ⚡
            </div>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-3xl font-bold mb-12 text-center text-balance">Nossos Valores</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-lg font-bold mb-2">Melhor Preço</h3>
                <p className="text-muted-foreground">
                  Garantimos os melhores preços do mercado com descontos de até 80%
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-lg font-bold mb-2">Entrega Rápida</h3>
                <p className="text-muted-foreground">
                  Entregamos em até 48 horas ou você pode retirar na loja
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-lg font-bold mb-2">Confiança Total</h3>
                <p className="text-muted-foreground">
                  Compra 100% segura com suporte ao cliente 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary text-secondary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">500K+</p>
              <p className="text-secondary-foreground/80">Clientes Satisfeitos</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">50K+</p>
              <p className="text-secondary-foreground/80">Produtos em Catálogo</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">200+</p>
              <p className="text-secondary-foreground/80">Marcas Parceiras</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">10+</p>
              <p className="text-secondary-foreground/80">Anos no Mercado</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-balance">Pronto para começar?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Navegue por nossos produtos e encontre as melhores ofertas em eletrônicos
          </p>
          <Link href="/busca">
            <Button size="lg" className="bg-primary hover:bg-primary text-primary-foreground">
              Começar a Comprar
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
