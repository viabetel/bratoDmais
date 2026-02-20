'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface SectionBannerProps {
  badge?: string
  title: string
  description?: string
  icon?: React.ReactNode
  href?: string
  gradient?: string
  illustration?: React.ReactNode
}

export function SectionBanner({
  badge,
  title,
  description,
  icon,
  href,
  gradient = 'from-blue-600 to-indigo-600',
  illustration,
}: SectionBannerProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${gradient} py-8 md:py-12 px-6 md:px-10 shadow-xl`}>
      {/* Subtle animated background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 opacity-50 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -ml-20 -mb-20 opacity-30" style={{ animation: 'float-subtle 6s ease-in-out infinite' }} />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between gap-8">
        {/* Left Section */}
        <div className="flex-1 min-w-0">
          {badge && (
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full mb-3 border border-white/20 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wide">{badge}</span>
            </div>
          )}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 text-balance animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {title}
          </h2>
          {description && (
            <p className="text-sm md:text-base text-white/85 text-balance max-w-md animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {description}
            </p>
          )}
        </div>

        {/* Right Section - Icon/Illustration & CTA */}
        <div className="flex items-end gap-4 flex-shrink-0">
          {/* Minimalist Icon */}
          {icon && (
            <div className="hidden sm:flex flex-col items-center gap-2 opacity-90 animate-float-icon" style={{ animationDelay: '0.4s' }}>
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                {icon}
              </div>
            </div>
          )}

          {/* CTA Button */}
          {href && (
            <Link href={href}>
              <button className="flex items-center justify-center gap-2 px-5 py-3 md:px-7 md:py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-bold text-sm md:text-base transition-all active:scale-95 shadow-lg hover:shadow-xl animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <span>Ver Tudo</span>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
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
            transform: translateY(-15px);
            opacity: 0.5;
          }
        }
        @keyframes float-icon {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(1deg);
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
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        .animate-float-icon {
          animation: float-icon 4s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

// Preset banner variants
export const bannerVariants = {
  flashDeals: {
    badge: 'OFERTA RELÂMPAGO',
    title: 'Aproveite Agora',
    description: 'Produtos com até 80% de desconto',
    icon: <svg className="w-8 h-8 text-yellow-300" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    gradient: 'from-red-600 to-orange-500',
  },
  bestsellers: {
    badge: 'MAIS VENDIDOS',
    title: 'Produtos que Vendem',
    description: 'Escolhas dos nossos clientes',
    icon: <svg className="w-8 h-8 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 17"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>,
    gradient: 'from-emerald-600 to-teal-600',
  },
  priceRanges: {
    badge: 'FAIXA DE PREÇO',
    title: 'Produtos por Orçamento',
    description: 'Encontre no seu preço ideal',
    icon: <svg className="w-8 h-8 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><path d="M12 1v6m0 6v6"></path><path d="M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"></path></svg>,
    gradient: 'from-purple-600 to-indigo-600',
  },
  weeklyDeals: {
    badge: 'PROMOÇÃO DA SEMANA',
    title: 'Melhores Ofertas',
    description: 'Atualizado diariamente',
    icon: <svg className="w-8 h-8 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6v6l4 2"></polyline></svg>,
    gradient: 'from-blue-600 to-cyan-600',
  },
}
