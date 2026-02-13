'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const promos = [
  {
    id: 1,
    text: '🏪 Compre no site + retire na loja',
    icon: '📍',
  },
  {
    id: 2,
    text: '💳 Parcele em até 6x sem juros',
    icon: '💳',
  },
  {
    id: 3,
    text: '💚 10% de desconto no Pix',
    icon: '💚',
  },
  {
    id: 4,
    text: '⚡ Entrega em 48 horas',
    icon: '⚡',
  },
]

export function PromoBar() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promos.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % promos.length)
    setIsAutoPlay(false)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + promos.length) % promos.length)
    setIsAutoPlay(false)
  }

  const handleMouseEnter = () => setIsAutoPlay(false)
  const handleMouseLeave = () => setIsAutoPlay(true)

  return (
    <div
      className="bg-primary text-primary-foreground py-3 px-4 relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Previous promo"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-hidden">
          <div className="relative h-6 flex items-center">
            {promos.map((promo, index) => (
              <div
                key={promo.id}
                className={`absolute inset-0 flex items-center gap-3 transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <span className="text-lg">{promo.icon}</span>
                <span className="font-medium text-sm whitespace-nowrap">{promo.text}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Next promo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex gap-2 flex-shrink-0">
          {promos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlay(false)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-6' : 'bg-white/40'
              }`}
              aria-label={`Go to promo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
