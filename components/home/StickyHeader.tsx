'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-sm animate-in slide-in-from-top duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image src="/logo.png" alt="Barato D+" width={32} height={32} className="rounded" />
          <span className="hidden sm:inline">Barato D+</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/busca">
            <Button size="sm" variant="ghost">
              <Search className="w-4 h-4" />
            </Button>
          </Link>
          <Button size="sm" variant="ghost">
            <Heart className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost">
            <ShoppingCart className="w-4 h-4" />
          </Button>
          <Button size="sm" className="hidden sm:inline">
            Promoções
          </Button>
        </div>
      </div>
    </div>
  )
}
