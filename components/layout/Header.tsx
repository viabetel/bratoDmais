'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { categories } from '@/data/categories'

export function Header() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/busca?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      {/* Top Bar */}
      <div className="hidden md:block border-b border-border">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground transition">Atendimento</Link>
            <Link href="#" className="hover:text-foreground transition">Sobre Nós</Link>
            <Link href="#" className="hover:text-foreground transition">Blog</Link>
          </div>
          <div className="flex gap-4">
            <span>Fone: 1234-5678</span>
            <span>Seg-Sex: 08:00-18:00</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <Image src="/logo.png" alt="Barato D+" width={40} height={40} className="rounded-lg" />
            <span className="hidden sm:inline text-lg font-bold">Barato D+</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="flex items-center w-full bg-muted rounded-lg px-3">
              <input
                type="text"
                placeholder="Pesquise produtos, marcas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-2 bg-transparent text-sm outline-none"
              />
              <button type="submit" className="text-muted-foreground hover:text-foreground">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link href="#" className="hidden md:flex items-center gap-1 text-sm hover:text-primary transition">
              <Heart className="w-5 h-5" />
              <span className="hidden lg:inline">Favoritos</span>
            </Link>
            <Link href="#" className="hidden md:flex items-center gap-1 text-sm hover:text-primary transition">
              <User className="w-5 h-5" />
              <span className="hidden lg:inline">Conta</span>
            </Link>
            <Link href="#" className="flex items-center gap-1 text-sm hover:text-primary transition">
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden lg:inline">Carrinho</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden flex items-center gap-2 mb-4">
          <div className="flex-1 flex items-center bg-muted rounded-lg px-3">
            <input
              type="text"
              placeholder="Pesquise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 py-2 bg-transparent text-sm outline-none"
            />
            <button type="submit" className="text-muted-foreground">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Navigation Menu */}
      <nav className="hidden md:flex border-t border-border">
        <div className="container mx-auto px-4 flex items-center">
          {/* Mega Menu Button */}
          <div className="relative group">
            <button
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium hover:bg-muted transition flex items-center gap-1"
            >
              Departamentos
              <span className="text-xs">▼</span>
            </button>

            {/* Mega Menu Dropdown */}
            {megaMenuOpen && (
              <div
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
                className="absolute left-0 top-full w-screen bg-card border-t border-border shadow-lg"
              >
                <div className="container mx-auto px-4 py-6 grid grid-cols-5 gap-8">
                  {categories.map((category) => (
                    <div key={category.id}>
                      <Link
                        href={`/c/${category.slug}`}
                        className="font-semibold text-sm mb-3 block hover:text-primary transition"
                      >
                        {category.name}
                      </Link>
                      {category.subcategories && (
                        <ul className="space-y-2">
                          {category.subcategories.map((sub) => (
                            <li key={sub.id}>
                              <Link
                                href={`/c/${sub.slug}`}
                                className="text-xs text-muted-foreground hover:text-primary transition"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Other Menu Items */}
          <Link href="/busca" className="px-4 py-3 text-sm font-medium hover:bg-muted transition">
            Ofertas
          </Link>
          <Link href="/busca" className="px-4 py-3 text-sm font-medium hover:bg-muted transition">
            Novidades
          </Link>
          <Link href="/busca" className="px-4 py-3 text-sm font-medium hover:bg-muted transition">
            Mais Vendidos
          </Link>
          <Link href="/busca" className="px-4 py-3 text-sm font-medium hover:bg-muted transition">
            Retire na Loja
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-2">
          <Link href="/c/eletrodomesticos" className="block px-4 py-2 hover:bg-muted rounded transition">
            Eletrodomésticos
          </Link>
          <Link href="/busca" className="block px-4 py-2 hover:bg-muted rounded transition">
            Ofertas
          </Link>
          <Link href="/busca" className="block px-4 py-2 hover:bg-muted rounded transition">
            Novidades
          </Link>
        </div>
      )}
    </header>
  )
}
