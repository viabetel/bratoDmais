'use client'

import Link from 'next/link'
import { ArrowRight, Refrigerator, Flame, Microwave, Wind } from 'lucide-react'

const categories = [
  {
    title: 'Geladeiras',
    href: '/busca?categoria=geladeiras',
    icon: Refrigerator,
    bg: 'from-blue-500 to-blue-600',
    count: 15,
  },
  {
    title: 'Fogões',
    href: '/busca?categoria=fogoes',
    icon: Flame,
    bg: 'from-orange-500 to-red-600',
    count: 15,
  },
  {
    title: 'Micro-ondas',
    href: '/busca?categoria=microondas',
    icon: Microwave,
    bg: 'from-purple-500 to-purple-600',
    count: 15,
  },
  {
    title: 'Climatização',
    href: '/busca?categoria=climatizacao',
    icon: Wind,
    bg: 'from-cyan-500 to-blue-600',
    count: 7,
  },
]

export function CategoriesGrid() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Categorias Principais</h2>
            <p className="text-gray-500 mt-1">Encontre o que precisa em poucos cliques</p>
          </div>
          <Link href="/categorias" className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
            Ver tudo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Link key={cat.title} href={cat.href}>
                <div className={`bg-gradient-to-br ${cat.bg} rounded-lg sm:rounded-xl p-4 sm:p-6 text-white cursor-pointer transition-all hover:shadow-lg hover:scale-105 group border border-white/20`}>
                  <div className="mb-2 sm:mb-3 inline-block p-2 sm:p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-1">{cat.title}</h3>
                  <p className="text-xs sm:text-sm text-white/80 mb-2 sm:mb-3">{cat.count} produtos</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
                    Ver <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
