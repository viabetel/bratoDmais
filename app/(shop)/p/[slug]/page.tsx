'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { 
  Star, 
  Check, 
  Truck, 
  Heart, 
  ShoppingCart, 
  Shield, 
  Package, 
  ArrowLeft, 
  Share2,
  Minus,
  Plus,
  CreditCard,
  Clock,
  MapPin,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products } from '@/data/products'
import { useCartStore } from '@/lib/store/cartStore'
import { useFavoritesStore } from '@/lib/store/favoritesStore'
import { formatBRL, getDiscountPercent, getPixPrice } from '@/lib/utils/format'
import { ProductCard } from '@/components/products/ProductCard'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [feedback, setFeedback] = useState<'cart' | 'favorite' | null>(null)
  
  const product = products.find((p) => p.slug === slug)
  const addItem = useCartStore((state) => state.addItem)
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product?.id || ''))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <Package className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-50" />
          <h1 className="text-2xl font-bold mb-3">Produto não encontrado</h1>
          <p className="text-muted-foreground mb-8">
            O produto que você procura não existe ou foi removido do catálogo.
          </p>
          <Link href="/busca">
            <Button className="bg-primary hover:bg-primary/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar à Busca
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  const discountPercent = getDiscountPercent(product.originalPrice, product.price)
  const pixPrice = getPixPrice(product.price)
  const savings = product.originalPrice - product.price
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images?.[0] || '📦',
      })
      setFeedback('cart')
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product)
    setFeedback('favorite')
    setTimeout(() => setFeedback(null), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: `Confira: ${product.name} por ${formatBRL(product.price)}`,
        url: window.location.href,
      })
    }
  }

  return (
    <main className="min-h-screen bg-muted/30">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/busca" className="hover:text-primary transition-colors">Produtos</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl border border-border overflow-hidden aspect-square flex items-center justify-center relative group">
              {product.images?.[selectedImage] ? (
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="w-32 h-32 text-muted-foreground/30" />
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {discountPercent > 0 && (
                  <span className="bg-secondary text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">
                    -{discountPercent}% OFF
                  </span>
                )}
                {product.freeShipping && (
                  <span className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    Frete Grátis
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={handleToggleFavorite}
                  className={`p-3 rounded-full transition-all shadow-lg ${
                    isFavorite 
                      ? 'bg-secondary text-white' 
                      : 'bg-white text-muted-foreground hover:text-secondary'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white text-muted-foreground hover:text-primary transition-all shadow-lg"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i 
                        ? 'border-primary shadow-lg' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-primary font-medium">{product.brand}</span>
                <span className="text-muted-foreground">•</span>
                <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-destructive'}`}>
                  {product.stock > 0 ? `${product.stock} em estoque` : 'Indisponível'}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-foreground">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} avaliações)</span>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
              <div>
                <div className="flex items-baseline gap-3 flex-wrap mb-1">
                  <span className="text-4xl font-extrabold text-foreground">
                    {formatBRL(product.price)}
                  </span>
                  <span className="text-lg line-through text-muted-foreground">
                    {formatBRL(product.originalPrice)}
                  </span>
                  {discountPercent > 0 && (
                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-bold">
                      -{discountPercent}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Economia de {formatBRL(savings)}
                </p>
              </div>

              {/* Pix Discount */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">PIX</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-700">{formatBRL(pixPrice)}</p>
                    <p className="text-sm text-green-600">10% de desconto à vista no Pix</p>
                  </div>
                </div>
              </div>

              {/* Installments */}
              <div className="flex items-center gap-3 text-sm">
                <CreditCard className="w-5 h-5 text-primary" />
                <span>ou <strong>6x de {formatBRL(product.price / 6)}</strong> sem juros</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Quantidade:</span>
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                size="lg"
                className={`w-full text-lg font-bold py-6 transition-all ${
                  feedback === 'cart'
                    ? 'bg-green-500 hover:bg-green-500'
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {feedback === 'cart' ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Adicionado ao Carrinho!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Adicionar ao Carrinho
                  </>
                )}
              </Button>

              <Button
                onClick={handleToggleFavorite}
                variant="outline"
                size="lg"
                className="w-full text-lg font-semibold py-6"
              >
                <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-secondary text-secondary' : ''}`} />
                {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Frete Grátis</p>
                  <p className="text-sm text-muted-foreground">Para pedidos acima de R$ 299</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">Entrega em 2-5 dias</p>
                  <p className="text-sm text-muted-foreground">Após confirmação do pagamento</p>
                </div>
              </div>
              {product.pickupAvailable && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Retire na Loja</p>
                    <p className="text-sm text-muted-foreground">Disponível para retirada</p>
                  </div>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-white rounded-xl border border-border">
                <Shield className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-xs font-medium">Compra Segura</p>
              </div>
              <div className="text-center p-3 bg-white rounded-xl border border-border">
                <Package className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-xs font-medium">Garantia</p>
              </div>
              <div className="text-center p-3 bg-white rounded-xl border border-border">
                <ArrowLeft className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-xs font-medium">30 dias</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Specs */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          {/* Description */}
          <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">Sobre este produto</h2>
            {product.description ? (
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            ) : (
              <p className="text-muted-foreground">
                {product.name} da marca {product.brand}. Produto de alta qualidade com garantia do fabricante.
              </p>
            )}
          </div>

          {/* Specifications */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">Especificações Técnicas</h2>
              <div className="space-y-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div 
                    key={key} 
                    className="flex justify-between items-center py-3 border-b border-border last:border-0"
                  >
                    <span className="font-medium text-muted-foreground">{key}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Produtos Relacionados</h2>
              <Link href="/busca">
                <Button variant="ghost" className="text-primary">
                  Ver mais <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
