'use client'

import Link from 'next/link'
import { ArrowRight, Flame } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white pt-16 md:pt-24 pb-12 md:pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-200 px-4 py-2 rounded-full mb-6 border border-red-400/30">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-semibold">SUPER OFERTAS HOJE: Até 80% OFF</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight text-balance">
            Eletrônicos e Eletrodomésticos com Melhor Preço
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl text-balance">
            Compre com segurança. Frete grátis, até 12x sem juros e 10% OFF no Pix. Garantia de 12 meses em todos os produtos.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/busca">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 w-full sm:w-auto">
                <Flame className="w-5 h-5" /> Ver Ofertas
              </button>
            </Link>
            <Link href="/categorias">
              <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all border border-white/20 w-full sm:w-auto">
                Explorar Categorias <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-300">✓</div>
              <span>4.8★ Mais de 50 mil clientes satisfeitos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-300">✓</div>
              <span>Entrega em até 7 dias úteis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
