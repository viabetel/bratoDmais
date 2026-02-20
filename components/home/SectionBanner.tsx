'use client'

import Link from 'next/link'
import { ChevronRight, Flame, TrendingUp, Heart, Tag, Zap } from 'lucide-react'

interface SectionBannerProps {
  badge?: string
  title: string
  description?: string
  icon?: React.ReactNode
  href?: string
  gradient?: string
  animated?: boolean
}

export function SectionBanner({
  badge,
  title,
  description,
  icon,
  href,
  gradient = 'from-blue-600 to-indigo-600',
  animated = true,
}: SectionBannerProps) {
  const bannerContent = (
    <div className={`relative overflow-hidden rounded-lg bg-gradient-to-r ${gradient} py-6 md:py-8 px-6 md:px-8 shadow-lg ${animated ? 'animate-pulse-subtle' : ''}`}>
      {/* Animated background elements */}
      {animated && (
        <>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 animate-float" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -ml-16 -mb-16 animate-float-delay" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Icon */}
          {icon && (
            <div className="flex-shrink-0 p-2.5 bg-white/20 rounded-lg backdrop-blur-sm">
              {icon}
            </div>
          )}

          {/* Text */}
          <div>
            {badge && (
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2 border border-white/30">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wide">{badge}</span>
              </div>
            )}
            <h2 className="text-2xl md:text-3xl font-black text-white mb-1 text-balance">
              {title}
            </h2>
            {description && (
              <p className="text-sm md:text-base text-white/90 text-balance">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* CTA */}
        {href && (
          <Link href={href} className="flex-shrink-0">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-white text-gray-900 rounded-lg font-bold text-sm md:text-base hover:bg-gray-100 transition-all active:scale-95 shadow-lg">
              Ver Tudo
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </Link>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        @keyframes float-delay {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(20px) translateX(-10px);
          }
        }
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.95;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 8s ease-in-out infinite;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )

  return bannerContent
}

// Preset banner variants
export const bannerVariants = {
  flashDeals: {
    badge: 'OFERTA RELÂMPAGO',
    title: 'Ofertas Relâmpago',
    description: 'Produtos com os melhores descontos do momento',
    icon: <Flame className="w-6 h-6 md:w-7 md:h-7 text-yellow-300" />,
    gradient: 'from-red-600 to-orange-500',
  },
  bestsellers: {
    badge: 'MAIS VENDIDOS',
    title: 'Mais Vendidos',
    description: 'Produtos escolhidos e aprovados por nossos clientes',
    icon: <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-emerald-300" />,
    gradient: 'from-emerald-600 to-teal-600',
  },
  favorites: {
    badge: 'FAVORITOS',
    title: 'Favoritos da Semana',
    description: 'Seleção especial para você',
    icon: <Heart className="w-6 h-6 md:w-7 md:h-7 text-pink-300" />,
    gradient: 'from-pink-600 to-rose-600',
  },
  priceRanges: {
    badge: 'FAIXA DE PREÇO',
    title: 'Ofertas por Faixa de Preço',
    description: 'Encontre produtos no seu orçamento',
    icon: <Tag className="w-6 h-6 md:w-7 md:h-7 text-purple-300" />,
    gradient: 'from-purple-600 to-indigo-600',
  },
  deals: {
    badge: 'SUPER PROMOÇÃO',
    title: 'Super Promoção do Dia',
    description: 'Aproveite antes que acabem',
    icon: <Zap className="w-6 h-6 md:w-7 md:h-7 text-yellow-300" />,
    gradient: 'from-amber-600 to-orange-600',
  },
}
