'use client'

import Link from 'next/link'
import { ArrowRight, Refrigerator, Flame, Microwave, Droplets, Wind, Tv, Laptop, Smartphone, Zap, Package, Home } from 'lucide-react'
import { categories } from '@/data/categories'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'eletrodomesticos': Refrigerator,
  'geladeiras': Refrigerator,
  'fogoes': Flame,
  'microondas': Microwave,
  'maquinas-lavar': Droplets,
  'climatizacao': Wind,
  'ar-condicionado': Wind,
  'ventiladores': Wind,
  'tvs': Tv,
  'notebooks': Laptop,
  'smartphones': Smartphone,
  'eletronicos': Zap,
  'utilidades': Home,
}

const CATEGORY_CONFIG: Record<string, { gradient: string }> = {
  'eletrodomesticos': { gradient: 'from-blue-500 to-blue-700' },
  'climatizacao': { gradient: 'from-cyan-500 to-blue-600' },
  'tvs': { gradient: 'from-gray-700 to-gray-900' },
  'notebooks': { gradient: 'from-indigo-500 to-purple-600' },
  'smartphones': { gradient: 'from-rose-500 to-pink-600' },
  'eletronicos': { gradient: 'from-violet-500 to-purple-700' },
  'utilidades': { gradient: 'from-green-500 to-emerald-600' },
}

const PRODUCT_COUNTS: Record<string, number> = {
  'eletrodomesticos': 60, 'climatizacao': 20, 'tvs': 18,
  'notebooks': 22, 'smartphones': 25, 'eletronicos': 30, 'utilidades': 12,
}

export function CategoriesGrid() {
  const mainCategories = categories.slice(0, 6)
  const allSubcategories = categories.flatMap(cat => cat.subcategories || []).slice(0, 10)

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Navegue por</p>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Categorias</h2>
          </div>
          <Link href="/busca" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors group">
            Ver todos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {mainCategories.map((cat) => {
            const config = CATEGORY_CONFIG[cat.slug] || { gradient: 'from-gray-500 to-gray-700' }
            const Icon = ICON_MAP[cat.slug] || Package
            const count = PRODUCT_COUNTS[cat.slug] || 10

            return (
              <Link key={cat.id} href={`/c/${cat.slug}`}>
                <div className={`bg-gradient-to-br ${config.gradient} rounded-xl p-4 text-white cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border border-white/10 relative overflow-hidden min-h-[120px] flex flex-col justify-between`}>
                  <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/10" />
                  <div className="relative">
                    <div className="bg-white/20 rounded-lg p-2 w-fit mb-2 group-hover:bg-white/30 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm leading-tight">{cat.name}</h3>
                    <p className="text-white/70 text-xs mt-0.5">{count}+ produtos</p>
                  </div>
                  <div className="relative flex items-center gap-1 text-white/60 group-hover:text-white transition-colors mt-2">
                    <span className="text-xs font-medium">Ver</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick-access subcategory pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {allSubcategories.map((sub) => {
            const Icon = ICON_MAP[sub.slug] || Package
            return (
              <Link key={sub.id} href={`/busca?categoria=${sub.slug}`}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-full text-xs font-medium text-gray-700 hover:text-blue-700 transition-all duration-200">
                <Icon className="w-3.5 h-3.5" />
                {sub.name}
              </Link>
            )
          })}
          <Link href="/busca" className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-full text-xs font-bold text-white transition-colors">
            +Mais <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}
