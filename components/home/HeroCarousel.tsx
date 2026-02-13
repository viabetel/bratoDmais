'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface HeroSlide {
  title: string
  subtitle: string
  cta: {
    text: string
    href: string
  }
  bgColor: string
}

interface HeroCarouselProps {
  slides: HeroSlide[]
  logo?: React.ReactNode
}

export function HeroCarousel({ slides, logo }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 10000)

    return () => clearInterval(timer)
  }, [isAutoPlay, slides.length])

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
  }

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
  }

  const slide = slides[current]

  return (
    <div className={`relative w-full h-96 md:h-[550px] ${slide.bgColor} overflow-hidden`}>
      {/* Logo - Maior */}
      <div className="absolute top-6 left-6 z-20">
        <div className="w-20 h-20 md:w-28 md:h-28 rounded-xl shadow-2xl overflow-hidden">
          {logo}
        </div>
      </div>

      {/* Content - Mais centralizado e com mais espaço */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
        <div className="text-center text-white max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight drop-shadow-lg">
            {slide.title}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90 text-pretty drop-shadow-md font-medium">
            {slide.subtitle}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 shadow-lg font-semibold px-8">
              {slide.cta.text}
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 shadow-lg font-semibold px-8">
              Explorar Catálogo
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrent(idx)
              setIsAutoPlay(false)
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === current ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
