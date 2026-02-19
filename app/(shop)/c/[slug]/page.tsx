'use client'

import { useState, useMemo, use } from 'react'
import Link from 'next/link'
import { ChevronDown, Grid3x3, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/ProductCard'
import { products } from '@/data/products'
import { categories } from '@/data/categories'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params)
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('relevancia')
  const [filterBrand, setFilterBrand] = useState<string | null>(null)
  const [filterCondition, setFilterCondition] = useState<string | null>(null)
  const [filterPrice, setFilterPrice] = useState({ min: 0, max: 10000 })

  // Procura pela categoria ou subcategoria
  let categoryData = categories.find((c) => c.slug === slug)
  if (!categoryData) {
    // Se não encontrou na raiz, procura nas subcategorias
    for (const cat of categories) {
      const subcat = cat.subcategories?.find((s) => s.slug === slug)
      if (subcat) {
        categoryData = subcat
        break
      }
    }
  }

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => p.categorySlug === slug)

    if (filterBrand) result = result.filter((p) => p.brand === filterBrand)
    if (filterCondition) result = result.filter((p) => p.condition === filterCondition)
    result = result.filter((p) => p.price >= filterPrice.min && p.price <= filterPrice.max)

    switch (sortBy) {
      case 'maior-preco':
        return result.sort((a, b) => b.price - a.price)
      case 'menor-preco':
        return result.sort((a, b) => a.price - b.price)
      case 'maior-desconto':
        return result.sort((a, b) => {
          const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100
          const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100
          return discountB - discountA
        })
      case 'melhor-avaliacao':
        return result.sort((a, b) => b.rating - a.rating)
      default:
        return result
    }
  }, [slug, filterBrand, filterCondition, filterPrice, sortBy])

  const brands = [...new Set(products.filter((p) => p.categorySlug === slug).map((p) => p.brand))]
  const conditions = ['novo', 'reembalado', 'remanufaturado']

  if (!categoryData) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Categoria não encontrada</h1>
          <p className="text-gray-600 text-lg mb-8">A categoria que você está procurando não existe. Confira nossas categorias principais:</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`/c/${cat.slug}`}
                className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-lg transition-all hover:scale-105 border border-blue-200"
              >
                <span className="block text-lg font-bold text-blue-600 mb-1">{cat.name}</span>
                <span className="text-xs text-gray-600">{cat.description?.slice(0, 40)}</span>
              </Link>
            ))}
          </div>
          
          <Link href="/busca">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Ver Todos os Produtos
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-primary hover:underline">
          Home
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-semibold">{categoryData.name}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{categoryData.name}</h1>
        <p className="text-muted-foreground mb-4">{categoryData.description}</p>
        <p className="text-sm font-medium">{filteredProducts.length} produtos encontrados</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 space-y-6 sticky top-24">
            <div>
              <h3 className="font-semibold mb-4 flex items-center justify-between">
                Filtros
                <button
                  onClick={() => {
                    setFilterBrand(null)
                    setFilterCondition(null)
                    setFilterPrice({ min: 0, max: 10000 })
                  }}
                  className="text-xs text-primary hover:underline font-normal"
                >
                  Limpar
                </button>
              </h3>
            </div>

            {/* Marca */}
            {brands.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-3">Marca</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={filterBrand === brand}
                        onChange={() => setFilterBrand(filterBrand === brand ? null : brand)}
                        className="w-4 h-4 rounded border-border"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Condição */}
            <div>
              <h4 className="font-medium text-sm mb-3">Condição</h4>
              <div className="space-y-2">
                {conditions.map((cond) => (
                  <label key={cond} className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      checked={filterCondition === cond}
                      onChange={() => setFilterCondition(filterCondition === cond ? null : cond)}
                      className="w-4 h-4 rounded border-border"
                    />
                    <span className="capitalize">
                      {cond === 'novo' ? 'Novo' : cond === 'reembalado' ? 'Reembalado' : 'Remanufaturado'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preço */}
            <div>
              <h4 className="font-medium text-sm mb-3">Preço</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Mín: R${filterPrice.min}</label>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={filterPrice.min}
                    onChange={(e) => setFilterPrice({ ...filterPrice, min: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Máx: R${filterPrice.max}</label>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={filterPrice.max}
                    onChange={(e) => setFilterPrice({ ...filterPrice, max: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Frete Grátis */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" className="w-4 h-4 rounded border-border" />
                <span>Frete Grátis</span>
              </label>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-border gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-sm border border-border rounded bg-card flex-1 sm:flex-none"
              >
                <option value="relevancia">Relevância</option>
                <option value="menor-preco">Menor Preço</option>
                <option value="maior-preco">Maior Preço</option>
                <option value="maior-desconto">Maior Desconto</option>
                <option value="melhor-avaliacao">Melhor Avaliação</option>
              </select>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <Button
                size="sm"
                variant={layout === 'grid' ? 'default' : 'outline'}
                onClick={() => setLayout('grid')}
                className="px-2"
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={layout === 'list' ? 'default' : 'outline'}
                onClick={() => setLayout('list')}
                className="px-2"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid/List */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Nenhum produto encontrado com os filtros selecionados</p>
              <Button
                variant="outline"
                onClick={() => {
                  setFilterBrand(null)
                  setFilterCondition(null)
                  setFilterPrice({ min: 0, max: 10000 })
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          ) : (
            <div
              className={
                layout === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} variant={layout === 'list' ? 'list' : 'grid'} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
