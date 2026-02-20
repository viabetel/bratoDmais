'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { 
  Search, ShoppingCart, Heart, User, Menu, X, 
  ChevronDown, Truck, Shield, CreditCard, Zap,
  Phone, MapPin, Refrigerator, Flame, Microwave, Droplets,
  Wind, Home, Tv, Laptop, Smartphone, Package, Wrench, Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { categories } from '@/data/categories'
import { getServicesByType } from '@/data/services'
import { useCartStore } from '@/lib/store/cartStore'
import { useFavoritesStore } from '@/lib/store/favoritesStore'
import { useUserStore } from '@/lib/store/userStore'
import { siteConfig, formatCurrency } from '@/lib/config'

// Função para mapear slugs para ícones Lucide
const getCategoryIcon = (slug: string) => {
  const iconMap: Record<string, React.ComponentType<{ className: string }>> = {
    'eletrodomesticos': Refrigerator,
    'geladeiras': Refrigerator,
    'fogoes': Flame,
    'microondas': Microwave,
    'maquinas-lavar': Droplets,
    'climatizacao': Wind,
    'utilidades': Home,
    'tvs': Tv,
    'notebooks': Laptop,
    'smartphones': Smartphone,
    'eletronicos': Zap,
  }
  const Icon = iconMap[slug] || Package
  return Icon
}

export function Header() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const cartItems = useCartStore((state) => state.items)
  const favorites = useFavoritesStore((state) => state.favorites)
  const user = useUserStore((state) => state.user)
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const favoritesCount = favorites.length

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
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      {/* Top Bar - Promocional */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-xs md:text-sm">
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                <span className="font-medium">Frete Grátis acima de {formatCurrency(siteConfig.shipping.freeShippingMinimum)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="font-medium">{siteConfig.payment.pixDiscount}% OFF no Pix</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mx-auto md:mx-0">
              <div className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" />
                <span className="font-medium">{siteConfig.payment.maxInstallments}x Sem Juros</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-green-300" />
                <span className="font-medium">Compra Segura</span>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{siteConfig.contact.city} - {siteConfig.contact.state}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 md:w-16 md:h-16 transition-transform group-hover:scale-105">
                  <Image 
                    src="/logo.png" 
                    alt="Barato D+" 
                    fill
                    sizes="(max-width: 768px) 56px, 64px"
                    className="object-contain drop-shadow-md"
                    priority
                  />
                </div>
                <div className="hidden sm:block">
                  <span className="text-2xl font-black text-blue-600 tracking-tight">BARATO</span>
                  <span className="text-2xl font-black text-red-500 tracking-tight"> D+</span>
                  <p className="text-[10px] text-gray-500 font-medium -mt-1">PRODUTOS NOVOS E COM GARANTIA</p>
                </div>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-6">
              <div className="flex items-center w-full border-2 border-blue-500 rounded-full overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow focus-within:shadow-md focus-within:border-blue-600">
                <input
                  type="text"
                  placeholder="O que você está procurando?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-3 px-5 bg-transparent text-sm outline-none placeholder:text-gray-400"
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Favoritos */}
              <Link 
                href="/favoritos" 
                className="hidden md:flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors group relative"
              >
                <div className="relative">
                  <Heart className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors" />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                      {favoritesCount}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-600 group-hover:text-red-500 transition-colors font-medium">Favoritos</span>
              </Link>
              
              {/* Conta */}
              <Link 
                href={user ? "/minha-conta" : "/login"}
                className="hidden md:flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <User className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                <span className="text-xs text-gray-600 group-hover:text-blue-600 transition-colors font-medium">
                  {user ? 'Minha Conta' : 'Entrar'}
                </span>
              </Link>
              
              {/* Carrinho */}
              <Link 
                href="/carrinho"
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group relative"
              >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs text-blue-600 font-semibold">Carrinho</span>
              </Link>
              
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden mt-3">
            <div className="flex items-center border-2 border-blue-500 rounded-full overflow-hidden bg-white">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-2.5 px-4 bg-transparent text-sm outline-none"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2.5">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation Menu - Desktop */}
      <nav className="hidden md:block bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            {/* Mega Menu Button */}
            <div 
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button className="flex items-center gap-2 px-5 py-3.5 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
                <Menu className="w-5 h-5" />
                <span>Departamentos</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {megaMenuOpen && (
                <div className="absolute left-0 top-full w-screen max-w-6xl bg-white border border-gray-200 shadow-2xl rounded-b-xl overflow-hidden z-50">
                  <div className="grid grid-cols-2 gap-0">
                    {/* LEFT: Categorias + Serviços */}
                    <div className="p-6 border-r border-gray-200">
                      {/* Categorias Section */}
                      <div className="mb-8">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Categorias</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {categories.map((category) => (
                            <Link
                              key={category.id}
                              href={`/c/${category.slug}`}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                              onClick={() => setMegaMenuOpen(false)}
                            >
                              {(() => {
                                const Icon = getCategoryIcon(category.slug)
                                return <Icon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                              })()}
                              <div>
                                <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors block text-sm">
                                  {category.name}
                                </span>
                                <span className="text-xs text-gray-500">{category.description?.slice(0, 25)}...</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Serviços Section */}
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Serviços</h3>
                        <div className="space-y-2">
                          {/* Aluguel */}
                          <Link
                            href="/c/climatizacao?mode=rent"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group"
                            onClick={() => setMegaMenuOpen(false)}
                          >
                            <Calendar className="w-6 h-6 text-green-600 flex-shrink-0" />
                            <div>
                              <span className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors block text-sm">
                                Aluguel/Alocação
                              </span>
                              <span className="text-xs text-gray-500">Produtos por período</span>
                            </div>
                          </Link>

                          {/* Instalação */}
                          <Link
                            href="/c/climatizacao"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors group"
                            onClick={() => setMegaMenuOpen(false)}
                          >
                            <Wrench className="w-6 h-6 text-orange-600 flex-shrink-0" />
                            <div>
                              <span className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors block text-sm">
                                Instalação
                              </span>
                              <span className="text-xs text-gray-500">Profissional com garantia</span>
                            </div>
                          </Link>

                          {/* Manutenção */}
                          <Link
                            href="/c/climatizacao?mode=maintenance"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                            onClick={() => setMegaMenuOpen(false)}
                          >
                            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
                            <div>
                              <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors block text-sm">
                                Manutenção
                              </span>
                              <span className="text-xs text-gray-500">Planos de proteção</span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    {/* RIGHT: Banner Lateral */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Flame className="w-5 h-5 text-orange-300" />
                          <h3 className="font-bold text-lg">Ofertas Imperdíveis!</h3>
                        </div>
                        <p className="text-sm text-blue-100 mb-4">Até 80% de desconto em produtos selecionados</p>
                        <Link 
                          href="/busca?sort=discount"
                          onClick={() => setMegaMenuOpen(false)}
                        >
                          <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold">
                            Ver Ofertas
                          </Button>
                        </Link>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4" />
                          <span>Frete Grátis +{formatCurrency(siteConfig.shipping.freeShippingMinimum)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          <span>{siteConfig.payment.maxInstallments}x Sem Juros</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          <span>Garantia Total</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <Link 
              href="/busca?sort=discount" 
              className="px-5 py-3.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4" />
              Ofertas
            </Link>
            <Link 
              href="/c/climatizacao?mode=rent" 
              className="px-5 py-3.5 text-sm font-semibold text-green-600 hover:bg-green-50 transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              Aluguel
            </Link>
            <Link 
              href="/busca?condition=novo" 
              className="px-5 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Novidades
            </Link>
            <Link 
              href="/busca?sort=rating" 
              className="px-5 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Mais Vendidos
            </Link>
            <Link 
              href="/c/eletrodomesticos" 
              className="px-5 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Eletrodomésticos
            </Link>
            <Link 
              href="/c/smartphones" 
              className="px-5 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Smartphones
            </Link>
            <Link 
              href="/empresa" 
              className="px-5 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors ml-auto"
            >
              Sobre Nós
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {/* User Actions Mobile */}
            <div className="flex gap-2 pb-3 border-b border-gray-100">
              <Link 
                href={user ? "/minha-conta" : "/login"}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-lg font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                {user ? 'Minha Conta' : 'Entrar'}
              </Link>
              <Link 
                href="/favoritos"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 rounded-lg font-medium text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="w-4 h-4" />
                {favoritesCount > 0 && <span className="text-red-500">({favoritesCount})</span>}
              </Link>
            </div>
            
            {/* Categories */}
            <div className="py-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Categorias</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 8).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/c/${cat.slug}`}
                    className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {(() => {
                      const Icon = getCategoryIcon(cat.slug)
                      return <Icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    })()}
                    <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Quick Links Mobile */}
            <div className="pt-2 border-t border-gray-100 space-y-1">
              <Link
                href="/busca?sort=discount"
                className="flex items-center gap-2 p-3 text-red-600 font-semibold hover:bg-red-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Zap className="w-5 h-5" />
                Ofertas da Semana
              </Link>
              <Link
                href="/busca"
                className="flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ver Todos os Produtos
              </Link>
              <Link
                href="/empresa"
                className="flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre Nós
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
