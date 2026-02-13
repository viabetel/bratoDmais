'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Package,
  Truck,
  CreditCard,
  Sparkles,
  MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/cartStore'
import { useFavoritesStore } from '@/lib/store/favoritesStore'
import { useUserStore } from '@/lib/store/userStore'
import { categories } from '@/data/categories'

export function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const cartTotal = useCartStore((state) => state.getTotalItems())
  const favoritesCount = useFavoritesStore((state) => state.favorites.length)
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)
  const user = useUserStore((state) => state.user)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/busca?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <>
      {/* Promo Bar */}
      <div className="bg-gradient-to-r from-primary via-primary to-secondary text-white text-center py-2 px-4 text-sm font-medium">
        <div className="container mx-auto flex items-center justify-center gap-2 flex-wrap">
          <Sparkles className="w-4 h-4" />
          <span>Frete Grátis acima de R$ 299</span>
          <span className="mx-2 hidden sm:inline">•</span>
          <span className="hidden sm:inline">Até 10% OFF no Pix</span>
          <span className="mx-2 hidden md:inline">•</span>
          <span className="hidden md:inline">6x sem juros</span>
        </div>
      </div>

      <header 
        className={`bg-white border-b border-border sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? 'shadow-lg' : 'shadow-sm'
        }`}
      >
        {/* Top Header */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                <span className="text-white font-bold text-xl md:text-2xl">B+</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg md:text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
                  BARATO D+
                </h1>
                <p className="text-xs text-muted-foreground">Eletrônicos & Eletro</p>
              </div>
            </Link>

            {/* Desktop Search */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-xl items-center bg-muted/50 rounded-xl overflow-hidden border-2 border-transparent focus-within:border-primary focus-within:bg-white transition-all duration-200 shadow-sm"
            >
              <input
                type="text"
                placeholder="O que você está procurando?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* Right Icons */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* User */}
              <Link href={isLoggedIn ? '/minha-conta' : '/login'}>
                <Button 
                  variant="ghost" 
                  className="hidden sm:flex items-center gap-2 text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs text-muted-foreground">
                      {isLoggedIn ? `Olá, ${user?.name?.split(' ')[0]}` : 'Entre ou'}
                    </p>
                    <p className="text-sm font-semibold">
                      {isLoggedIn ? 'Minha Conta' : 'Cadastre-se'}
                    </p>
                  </div>
                </Button>
              </Link>

              {/* Favorites */}
              <Link href="/favoritos">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative text-foreground hover:text-secondary hover:bg-secondary/5 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-secondary text-secondary' : ''}`} />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-scale-in">
                      {favoritesCount > 9 ? '9+' : favoritesCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Link href="/carrinho">
                <Button 
                  variant="ghost" 
                  className="relative flex items-center gap-2 text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {cartTotal > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-scale-in">
                        {cartTotal > 9 ? '9+' : cartTotal}
                      </span>
                    )}
                  </div>
                  <span className="hidden lg:block text-sm font-semibold">Carrinho</span>
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <form 
            onSubmit={handleSearch} 
            className="md:hidden mt-3 flex items-center bg-muted/50 rounded-xl overflow-hidden border-2 border-transparent focus-within:border-primary focus-within:bg-white transition-all"
          >
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-transparent outline-none text-sm"
            />
            <button type="submit" className="px-4 py-2.5 bg-primary text-white">
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Navigation */}
        <nav
          className={`border-t border-border bg-white ${
            mobileMenuOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-1">
              {/* Departamentos - Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <button
                  className="w-full md:w-auto px-4 py-3 text-sm font-semibold text-foreground hover:text-primary flex items-center justify-between gap-2 transition-colors"
                >
                  <Menu className="w-4 h-4" />
                  Departamentos
                  <ChevronDown className={`w-4 h-4 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Mega Menu Desktop */}
                {megaMenuOpen && (
                  <div className="hidden md:block absolute left-0 top-full w-screen max-w-4xl bg-white shadow-2xl border border-border rounded-b-xl z-50 animate-fade-in">
                    <div className="grid grid-cols-3 gap-6 p-6">
                      {categories.slice(0, 6).map((cat) => (
                        <div key={cat.id} className="space-y-2">
                          <Link 
                            href={`/c/${cat.slug}`}
                            className="font-bold text-primary hover:text-primary/80 flex items-center gap-2 transition-colors"
                          >
                            <Package className="w-4 h-4" />
                            {cat.name}
                          </Link>
                          <ul className="space-y-1 pl-6">
                            {cat.subcategories?.map((sub) => (
                              <li key={sub.id}>
                                <Link
                                  href={`/c/${sub.slug}`}
                                  className="text-sm text-muted-foreground hover:text-primary transition-colors block py-0.5"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    
                    {/* Promo Banner in Mega Menu */}
                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 px-6 py-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Truck className="w-4 h-4 text-primary" />
                            <span>Frete Grátis</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CreditCard className="w-4 h-4 text-primary" />
                            <span>6x sem juros</span>
                          </div>
                        </div>
                        <Link href="/busca?sort=discount">
                          <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white">
                            Ver Ofertas
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/busca?sort=discount"
                className="px-4 py-3 text-sm font-medium text-secondary hover:bg-secondary/5 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-4 h-4" />
                Ofertas
              </Link>
              <Link
                href="/busca?sort=-createdAt"
                className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
              >
                Novidades
              </Link>
              <Link
                href="/busca?sort=rating"
                className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
              >
                Mais Vendidos
              </Link>
              <Link
                href="/busca?pickup=true"
                className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors flex items-center gap-1"
              >
                <MapPin className="w-4 h-4" />
                Retire na Loja
              </Link>
              <Link
                href="/empresa"
                className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
              >
                Atendimento
              </Link>
            </div>

            {/* Mobile Categories */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t border-border py-4 animate-slide-up">
                <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Categorias
                </p>
                {categories.slice(0, 6).map((cat) => (
                  <div key={cat.id} className="mb-3">
                    <Link 
                      href={`/c/${cat.slug}`}
                      className="font-semibold text-primary hover:underline block px-4 py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cat.name}
                    </Link>
                    <div className="flex flex-wrap gap-2 px-4 mt-1">
                      {cat.subcategories?.slice(0, 3).map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/c/${sub.slug}`}
                          className="text-xs text-muted-foreground hover:text-primary bg-muted px-2 py-1 rounded transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  )
}
