'use client'

import Link from 'next/link'
import { ChevronRight, TrendingUp, Clock, Award } from 'lucide-react'

interface SectionBannerProps {
  badge?: string
  title: string
  subtitle?: string
  description?: string
  highlight?: string
  icon?: React.ReactNode
  href?: string
  gradient?: string
  stats?: Array<{ label: string; value: string }>
}

export function SectionBanner({
  badge,
  title,
  subtitle,
  description,
  highlight,
  icon,
  href,
  gradient = 'from-blue-600 to-indigo-600',
  stats,
}: SectionBannerProps) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-gradient-to-r ${gradient} py-6 md:py-7 px-5 md:px-8 shadow-lg`}>
      {/* Subtle animated background elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-12 -mt-12 opacity-50 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -ml-16 -mb-16 opacity-30" style={{ animation: 'float-subtle 6s ease-in-out infinite' }} />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between gap-6 md:gap-8">
        {/* Left Section */}
        <div className="flex-1 min-w-0">
          {badge && (
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full mb-2 border border-white/20 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wide">{badge}</span>
            </div>
          )}
          
          <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-1.5 text-balance animate-slide-up" style={{ animationDelay: '0.15s' }}>
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-sm md:text-base text-white/90 font-semibold mb-2 text-balance animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {subtitle}
            </p>
          )}
          
          {description && (
            <p className="text-xs md:text-sm text-white/80 text-balance max-w-sm mb-3 animate-slide-up" style={{ animationDelay: '0.25s' }}>
              {description}
            </p>
          )}

          {/* Stats Row */}
          {stats && stats.length > 0 && (
            <div className="flex flex-wrap gap-3 md:gap-4 mt-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-white/10 rounded px-2 py-1 text-xs">
                  <span className="font-bold text-white">{stat.value}</span>
                  <span className="text-white/80">{stat.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Highlight Badge */}
          {highlight && (
            <div className="mt-3 inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1.5 text-xs font-semibold text-white animate-slide-up" style={{ animationDelay: '0.35s' }}>
              <TrendingUp className="w-3.5 h-3.5" />
              {highlight}
            </div>
          )}
        </div>

        {/* Right Section - Icon & CTA */}
        <div className="flex flex-col items-end gap-3 flex-shrink-0">
          {/* Icon */}
          {icon && (
            <div className="hidden sm:flex p-2.5 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 opacity-90 animate-float-icon" style={{ animationDelay: '0.4s' }}>
              {icon}
            </div>
          )}

          {/* CTA Button */}
          {href && (
            <Link href={href}>
              <button className="flex items-center justify-center gap-1.5 px-4 py-2 md:px-5 md:py-2.5 bg-white hover:bg-gray-100 text-gray-900 rounded-lg font-bold text-xs md:text-sm transition-all active:scale-95 shadow-lg hover:shadow-xl animate-slide-up" style={{ animationDelay: '0.45s' }}>
                <span>Ver Tudo</span>
                <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-subtle {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-10px);
            opacity: 0.5;
          }
        }
        @keyframes float-icon {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-6px) rotate(1deg);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
        .animate-float-icon {
          animation: float-icon 4s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

// Preset banner variants with richer content
export const bannerVariants = {
  flashDeals: {
    badge: 'OFERTA RELÂMPAGO',
    title: 'Aproveite Agora',
    subtitle: 'Descontos exclusivos que não voltam',
    description: 'Produtos selecionados com até 80% de desconto. Promoção válida por tempo limitado.',
    highlight: 'Atualizado a cada 6 horas',
    stats: [
      { label: 'Produtos', value: '500+' },
      { label: 'Desconto Máx', value: '80%' },
    ],
    icon: <svg className="w-6 h-6 md:w-7 md:h-7 text-yellow-300" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    gradient: 'from-red-600 to-orange-500',
  },
  bestsellers: {
    badge: 'MAIS VENDIDOS',
    title: 'Produtos que Agradam',
    subtitle: 'Escolhidos por mais de 50 mil clientes',
    description: 'Esses produtos vendem sozinhos. Confira as avaliações e descubra por quê.',
    highlight: 'Baseado em compras reais',
    stats: [
      { label: 'Clientes', value: '50k+' },
      { label: 'Rating Médio', value: '4.8⭐' },
    ],
    icon: <svg className="w-6 h-6 md:w-7 md:h-7 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 17"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>,
    gradient: 'from-emerald-600 to-teal-600',
  },
  priceRanges: {
    badge: 'POR ORÇAMENTO',
    title: 'Produtos no Seu Preço',
    subtitle: 'De R$ 99 até R$ 50.000',
    description: 'Encontre exatamente o que procura dentro do seu orçamento. Várias opções em cada faixa.',
    highlight: 'Filtro avançado disponível',
    stats: [
      { label: 'Faixas', value: '8' },
      { label: 'Marcas', value: '200+' },
    ],
    icon: <svg className="w-6 h-6 md:w-7 md:h-7 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><path d="M12 1v6m0 6v6"></path><path d="M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"></path></svg>,
    gradient: 'from-purple-600 to-indigo-600',
  },
}
