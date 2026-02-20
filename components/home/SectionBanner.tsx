'use client'

import Link from 'next/link'
import { ChevronRight, TrendingUp } from 'lucide-react'

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
    <div className={`relative overflow-hidden rounded-lg bg-gradient-to-r ${gradient} py-6 md:py-8 px-5 md:px-8 shadow-lg group`}>
      {/* Animated background elements with more activity */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/8 rounded-full blur-2xl -mr-12 -mt-12 opacity-40 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/6 rounded-full blur-3xl -ml-16 -mb-16 opacity-25" style={{ animation: 'float-subtle 6s ease-in-out infinite' }} />
      <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white/5 rounded-full blur-xl opacity-30" style={{ animation: 'drift 8s ease-in-out infinite', animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between gap-6 md:gap-8">
        {/* Left Section */}
        <div className="flex-1 min-w-0">
          {badge && (
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full mb-3 border border-white/25 animate-badge-pulse group-hover:scale-105 transition-transform" style={{ animationDelay: '0.1s' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">{badge}</span>
            </div>
          )}
          
          {/* Main Title - Bold and Eye-Catching */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 text-balance leading-tight animate-title-shimmer" style={{ animationDelay: '0.15s' }}>
            {title}
          </h2>
          
          {/* Subtitle - Secondary but Strong */}
          {subtitle && (
            <p className="text-base md:text-lg text-white font-bold mb-2.5 text-balance animate-slide-up opacity-95" style={{ animationDelay: '0.2s' }}>
              {subtitle}
            </p>
          )}
          
          {/* Description - Supporting copy */}
          {description && (
            <p className="text-sm md:text-base text-white/85 text-balance max-w-lg mb-4 animate-slide-up leading-relaxed" style={{ animationDelay: '0.25s' }}>
              {description}
            </p>
          )}

          {/* Stats Row - Prominent metrics */}
          {stats && stats.length > 0 && (
            <div className="flex flex-wrap gap-3 md:gap-5 mt-4 mb-4 animate-stats-appear" style={{ animationDelay: '0.3s' }}>
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/12 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/15 hover:border-white/30 hover:bg-white/15 transition-all cursor-default group/stat" style={{ animationDelay: `${0.3 + idx * 0.1}s` }}>
                  <div className="flex flex-col">
                    <span className="font-black text-white text-lg leading-none">{stat.value}</span>
                    <span className="text-white/80 text-xs font-semibold leading-none">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Highlight Badge - Call out special feature */}
          {highlight && (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 hover:bg-white/25 transition-all animate-slide-up group/highlight" style={{ animationDelay: '0.4s' }}>
              <TrendingUp className="w-4 h-4 text-white/90 animate-bounce-subtle" style={{ animationDelay: '0.5s' }} />
              <span className="text-sm font-bold text-white">{highlight}</span>
            </div>
          )}
        </div>

        {/* Right Section - Icon & CTA */}
        <div className="flex flex-col items-end gap-4 flex-shrink-0">
          {/* Icon Container - Floating animation */}
          {icon && (
            <div className="hidden sm:flex p-3 bg-white/12 rounded-lg backdrop-blur-sm border border-white/20 opacity-95 animate-float-icon hover:scale-110 transition-transform" style={{ animationDelay: '0.45s' }}>
              <div className="text-white/90">{icon}</div>
            </div>
          )}

          {/* CTA Button - Interactive and prominent */}
          {href && (
            <Link href={href}>
              <button className="flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-100 text-gray-900 rounded-lg font-bold text-sm md:text-base transition-all duration-200 active:scale-95 shadow-lg hover:shadow-2xl animate-slide-up hover:-translate-y-1 group/btn" style={{ animationDelay: '0.5s' }}>
                <span className="group-hover/btn:font-black">Ver Tudo</span>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* CSS Animations - Enhanced set */}
      <style jsx>{`
        @keyframes float-subtle {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-12px);
            opacity: 0.5;
          }
        }
        @keyframes drift {
          0%, 100% {
            transform: translateX(0px) translateY(0px);
            opacity: 0.25;
          }
          25% {
            transform: translateX(15px) translateY(-10px);
          }
          50% {
            transform: translateX(0px) translateY(15px);
            opacity: 0.35;
          }
          75% {
            transform: translateX(-15px) translateY(-5px);
          }
        }
        @keyframes float-icon {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(2deg);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes stats-appear {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes title-shimmer {
          from {
            opacity: 0;
            transform: translateY(20px);
            letter-spacing: -0.02em;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            letter-spacing: 0em;
          }
        }
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        @keyframes badge-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          50% {
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        .animate-float-icon {
          animation: float-icon 4s ease-in-out infinite;
        }
        .animate-stats-appear {
          animation: stats-appear 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-title-shimmer {
          animation: title-shimmer 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        .animate-badge-pulse {
          animation: badge-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// Preset banner variants with compelling, action-oriented copy
export const bannerVariants = {
  flashDeals: {
    badge: '⚡ OFERTA RELÂMPAGO',
    title: 'Descontos que Não Esperam',
    subtitle: 'Até 80% OFF em produtos selecionados',
    description: 'Promoção válida por tempo limitado. Esses preços explodem a cada 6 horas. Não deixe passar.',
    highlight: '500+ produtos em oferta agora',
    stats: [
      { label: 'Desconto Máx', value: '80%' },
      { label: 'Tempo Restante', value: '6h' },
    ],
    icon: <svg className="w-7 h-7 md:w-8 md:h-8 text-yellow-300" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    gradient: 'from-red-600 via-orange-500 to-orange-600',
  },
  bestsellers: {
    badge: '⭐ TOP DE VENDAS',
    title: 'Produtos que Todos Querem',
    subtitle: 'Escolhidos por mais de 50 mil clientes',
    description: 'Esses produtos praticamente vendem sozinhos. Qualidade comprovada e avaliações reais de quem comprou.',
    highlight: 'Baseado em compras e avaliações',
    stats: [
      { label: 'Clientes Satisfeitos', value: '50k+' },
      { label: 'Rating Médio', value: '4.8★' },
    ],
    icon: <svg className="w-7 h-7 md:w-8 md:h-8 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 17"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>,
    gradient: 'from-emerald-600 via-teal-500 to-emerald-600',
  },
  priceRanges: {
    badge: '💰 POR SEU ORÇAMENTO',
    title: 'Exatamente Dentro do Seu Preço',
    subtitle: 'De R$ 99 até R$ 50.000',
    description: 'Encontre aquele produto perfeito sem estourar o orçamento. Filtros inteligentes deixam tudo fácil.',
    highlight: 'Encontre em 3 cliques',
    stats: [
      { label: 'Faixas de Preço', value: '8' },
      { label: 'Marcas Diferentes', value: '200+' },
    ],
    icon: <svg className="w-7 h-7 md:w-8 md:h-8 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><path d="M12 1v6m0 6v6"></path><path d="M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"></path></svg>,
    gradient: 'from-purple-600 via-indigo-500 to-purple-600',
  },
}
