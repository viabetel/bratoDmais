'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Flame, ChevronLeft, ChevronRight } from 'lucide-react'

const heroSlides = [
  {
    id: 1,
    category: 'GELADEIRAS',
    title: 'Geladeiras com Tecnologia Frost Free',
    description: 'Refrigeração inteligente com até 80% OFF',
    cta: 'Conferir Geladeiras',
    link: '/busca?categoria=geladeiras',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=1200&h=600&fit=crop',
    bgGradient: 'from-blue-600 to-cyan-600',
  },
  {
    id: 2,
    category: 'FOGÕES',
    title: 'Fogões Premium para Sua Cozinha',
    description: 'Até 6 queimadores com tecnologia de ponta',
    cta: 'Ver Fogões',
    link: '/busca?categoria=fogoes',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop',
    bgGradient: 'from-orange-500 to-red-600',
  },
  {
    id: 3,
    category: 'MÁQUINAS DE LAVAR',
    title: 'Máquinas de Lavar Automáticas',
    description: 'Capacidade até 14kg com tecnologia Eco',
    cta: 'Explorar Máquinas',
    link: '/busca?categoria=maquinas-lavar',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=1200&h=600&fit=crop',
    bgGradient: 'from-purple-600 to-blue-600',
  },
  {
    id: 4,
    category: 'MICRO-ONDAS',
    title: 'Micro-ondas Inteligentes',
    description: 'Até 50L com múltiplas potências',
    cta: 'Ver Micro-ondas',
    link: '/busca?categoria=microondas',
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=1200&h=600&fit=crop',
    bgGradient: 'from-indigo-600 to-purple-600',
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 7000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 7000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 7000)
  }

  const slide = heroSlides[currentSlide]

  return (
    <section className="relative bg-white pt-0 pb-0 overflow-hidden">
      {/* Carousel Container */}
      <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden">
        {/* Slides */}
        {heroSlides.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${s.image}')`,
                backgroundPosition: 'center',
              }}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${s.bgGradient} opacity-85`}></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  {/* Badge */}
                  <div className={`inline-flex items-center gap-2 ${
                    idx === currentSlide
                      ? 'animate-fadeIn'
                      : ''
                  } bg-white/20 text-white px-4 py-2 rounded-full mb-4 border border-white/40 backdrop-blur-sm`}>
                    <Flame className="w-4 h-4" />
                    <span className="text-sm font-semibold">{s.category}</span>
                  </div>

                  {/* Headline */}
                  <h1 className={`text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight text-balance text-white ${
                    idx === currentSlide
                      ? 'animate-slideUp'
                      : ''
                  }`}>
                    {s.title}
                  </h1>

                  {/* Subheadline */}
                  <p className={`text-base md:text-lg text-white/90 mb-8 max-w-xl text-balance ${
                    idx === currentSlide
                      ? 'animate-slideUp'
                      : ''
                  }`}
                    style={{
                      animationDelay: idx === currentSlide ? '0.1s' : '',
                    }}
                  >
                    {s.description}
                  </p>

                  {/* CTA */}
                  <Link href={s.link}>
                    <button className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg hover:shadow-xl transform hover:scale-105">
                      {s.cta}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition-all active:scale-95"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition-all active:scale-95"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75 w-3'
              }`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust Banner Below Carousel */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-6 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-6 justify-around text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-600 font-bold">✓</div>
              <div>
                <p className="font-semibold text-gray-900">Garantia 12 Meses</p>
                <p className="text-gray-600 text-xs">Em todos os produtos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-600 font-bold">✓</div>
              <div>
                <p className="font-semibold text-gray-900">Frete Grátis</p>
                <p className="text-gray-600 text-xs">Em compras acima de R$ 199</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-600 font-bold">✓</div>
              <div>
                <p className="font-semibold text-gray-900">Até 12x sem Juros</p>
                <p className="text-gray-600 text-xs">No cartão de crédito</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
