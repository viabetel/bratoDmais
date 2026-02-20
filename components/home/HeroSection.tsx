'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Flame, ChevronLeft, ChevronRight, Zap, Tag } from 'lucide-react'

const heroSlides = [
  {
    id: 1,
    badge: 'ELETRODOMÉSTICOS',
    title: 'Geladeiras com Tecnologia Frost Free',
    description: 'Refrigeração inteligente com até 80% OFF',
    cta: 'Conferir Geladeiras',
    link: '/busca?categoria=geladeiras',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=1200&h=600&fit=crop',
    gradient: 'from-blue-600/90 to-cyan-600/90',
    discount: '80%',
  },
  {
    id: 2,
    badge: 'FOGÕES',
    title: 'Fogões Premium para Sua Cozinha',
    description: 'Até 6 queimadores com tecnologia de ponta',
    cta: 'Ver Fogões',
    link: '/busca?categoria=fogoes',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop',
    gradient: 'from-orange-500/90 to-red-600/90',
    discount: '65%',
  },
  {
    id: 3,
    badge: 'MÁQUINAS DE LAVAR',
    title: 'Máquinas de Lavar Automáticas',
    description: 'Capacidade até 14kg com tecnologia Eco',
    cta: 'Explorar Máquinas',
    link: '/busca?categoria=maquinas-lavar',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=1200&h=600&fit=crop',
    gradient: 'from-purple-600/90 to-blue-600/90',
    discount: '70%',
  },
  {
    id: 4,
    badge: 'CLIMATIZAÇÃO',
    title: 'Ar Condicionado Split com Instalação',
    description: 'Climatize seu ambiente com conforto total',
    cta: 'Ver Climatização',
    link: '/busca?categoria=climatizacao',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=1200&h=600&fit=crop',
    gradient: 'from-cyan-500/90 to-blue-700/90',
    discount: '50%',
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => setCurrent(p => (p + 1) % heroSlides.length), 5000)
    return () => clearInterval(interval)
  }, [autoPlay])

  const pause = () => { setAutoPlay(false); setTimeout(() => setAutoPlay(true), 7000) }
  const next = () => { setCurrent(p => (p + 1) % heroSlides.length); pause() }
  const prev = () => { setCurrent(p => (p - 1 + heroSlides.length) % heroSlides.length); pause() }
  const goTo = (i: number) => { setCurrent(i); pause() }

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[260px] md:h-[380px] lg:h-[460px] w-full overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* BG Image */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[6000ms]"
              style={{ backgroundImage: `url('${slide.image}')` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-xl">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full mb-4 border border-white/30">
                    <Flame className="w-3.5 h-3.5 text-yellow-300" />
                    <span className="text-xs font-bold tracking-wider">{slide.badge}</span>
                    <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full ml-1">
                      ATÉ -{slide.discount}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 drop-shadow-lg">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-white/90 text-sm md:text-base mb-6 max-w-sm">
                    {slide.description}
                  </p>

                  {/* CTA */}
                  <Link href={slide.link}>
                    <button className="bg-white hover:bg-gray-50 text-gray-900 font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all hover:shadow-xl hover:scale-105 active:scale-95 text-sm md:text-base shadow-lg">
                      {slide.cta}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Nav Buttons */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
          aria-label="Próximo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-white w-7' : 'bg-white/50 hover:bg-white/75 w-2'}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/20">
          {autoPlay && (
            <div
              key={current}
              className="h-full bg-white/70 animate-[width_5s_linear_forwards]"
              style={{ animation: 'progress 5s linear forwards' }}
            />
          )}
        </div>
      </div>

      {/* Inline keyframe for progress bar */}
      <style>{`
        @keyframes progress { from { width: 0% } to { width: 100% } }
      `}</style>
    </section>
  )
}
