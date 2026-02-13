'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ContentItem {
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
}

interface ContentSectionProps {
  items: ContentItem[]
  title: string
  bgColor?: string
}

export function ContentSection({ items, title, bgColor = 'bg-white' }: ContentSectionProps) {
  const [current, setCurrent] = useState(0)

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length)
  }

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % items.length)
  }

  const item = items[current]

  return (
    <section className={`${bgColor} py-16 md:py-24`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <div className="text-primary">{item.icon}</div>
            <h3 className="text-3xl font-bold text-balance">{item.title}</h3>
            <p className="text-lg text-muted-foreground text-pretty">{item.description}</p>
            <a href="#" className="inline-block text-primary font-semibold hover:underline">
              Conheça {item.subtitle.toLowerCase()}
            </a>
          </div>

          {/* Right Column - Image/Navigation */}
          <div className="relative">
            <div className="bg-muted rounded-lg aspect-square flex items-center justify-center mb-6">
              <div className="text-6xl">{item.icon}</div>
            </div>

            {/* Navigation Indicators */}
            <div className="flex justify-center gap-2 mb-4">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === current ? 'bg-primary w-8' : 'bg-muted-foreground'
                  }`}
                  aria-label={`Item ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrow Navigation */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handlePrev}
                className="p-3 hover:bg-muted rounded-full transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 hover:bg-muted rounded-full transition-colors"
                aria-label="Próximo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
