'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CampaignBannerProps {
  title: string
  subtitle: string
  cta: string
  href: string
  gradient: string
}

export function CampaignBanner({ title, subtitle, cta, href, gradient }: CampaignBannerProps) {
  return (
    <section className={`bg-gradient-to-r ${gradient} text-white py-12 md:py-16 rounded-2xl`}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
          <p className="text-lg md:text-xl text-white/90 mb-6">{subtitle}</p>
          <Link href={href}>
            <button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all">
              {cta} <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
