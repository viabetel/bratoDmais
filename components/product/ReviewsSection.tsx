'use client'

import { useState } from 'react'
import { Star, ThumbsUp, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Product } from '@/data/products'

interface ReviewsSectionProps {
  product: Product
}

// Generate pseudo-reviews based on product data
function generateReviews(product: Product) {
  const names = [
    'Carlos M.', 'Ana Paula S.', 'Roberto F.', 'Juliana C.',
    'Marcos A.', 'Fernanda L.', 'Diego R.', 'Patricia N.',
    'Lucas B.', 'Camila V.', 'Eduardo T.', 'Marina G.',
  ]
  const positiveComments = [
    `Excelente produto! ${product.name} superou minhas expectativas. Entrega rápida e produto bem embalado.`,
    `Comprei para usar em casa e estou muito satisfeito. Qualidade muito boa, vale cada centavo.`,
    `Produto chegou antes do prazo, em perfeito estado. Recomendo para quem está em dúvida.`,
    `Já é o segundo que compro nessa loja. Atendimento cinco estrelas e produto original.`,
    `Ótimo custo-benefício. Funciona perfeitamente e a instalação foi simples.`,
    `Muito feliz com a compra! O produto é ainda melhor do que parece nas fotos.`,
  ]
  const midComments = [
    `Produto bom, mas a entrega demorou um pouco mais do que o esperado. No geral satisfeito.`,
    `Funciona bem, mas o manual poderia ser mais detalhado. Nada que pesquise online não resolva.`,
  ]

  const count = Math.min(8, product.reviews)
  return Array.from({ length: count }, (_, i) => {
    const stars =
      i === count - 1 ? 3
      : i === count - 2 ? 4
      : 5
    return {
      id: i,
      name: names[i % names.length],
      stars,
      date: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      comment: stars === 5
        ? positiveComments[i % positiveComments.length]
        : midComments[i % midComments.length],
      helpful: Math.floor(Math.random() * 20),
      verified: true,
    }
  })
}

// Calculate rating distribution
function getRatingDist(rating: number, total: number) {
  // Simulate distribution around the average
  const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  if (rating >= 4.5) {
    dist[5] = Math.round(total * 0.65)
    dist[4] = Math.round(total * 0.25)
    dist[3] = Math.round(total * 0.07)
    dist[2] = Math.round(total * 0.02)
    dist[1] = total - dist[5] - dist[4] - dist[3] - dist[2]
  } else if (rating >= 4) {
    dist[5] = Math.round(total * 0.45)
    dist[4] = Math.round(total * 0.35)
    dist[3] = Math.round(total * 0.12)
    dist[2] = Math.round(total * 0.05)
    dist[1] = total - dist[5] - dist[4] - dist[3] - dist[2]
  } else {
    dist[5] = Math.round(total * 0.30)
    dist[4] = Math.round(total * 0.30)
    dist[3] = Math.round(total * 0.25)
    dist[2] = Math.round(total * 0.10)
    dist[1] = total - dist[5] - dist[4] - dist[3] - dist[2]
  }
  return dist
}

export function ReviewsSection({ product }: ReviewsSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const [helpfulClicked, setHelpfulClicked] = useState<Set<number>>(new Set())
  const [filterStars, setFilterStars] = useState<number | null>(null)

  const reviews = generateReviews(product)
  const dist = getRatingDist(product.rating, product.reviews)

  const filteredReviews = filterStars
    ? reviews.filter((r) => r.stars === filterStars)
    : reviews
  const displayReviews = showAll ? filteredReviews : filteredReviews.slice(0, 3)

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 mt-8" id="reviews">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Avaliações dos Clientes
        <span className="ml-2 text-sm text-gray-400 font-normal">({product.reviews} avaliações)</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Overall score */}
        <div className="flex flex-col items-center justify-center bg-blue-50 rounded-xl p-5">
          <span className="text-5xl font-black text-gray-900 mb-1">{product.rating.toFixed(1)}</span>
          <div className="flex mb-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i <= Math.round(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-200 fill-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">{product.reviews} avaliações</span>
        </div>

        {/* Rating distribution */}
        <div className="md:col-span-2 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = dist[stars]
            const pct = product.reviews > 0 ? (count / product.reviews) * 100 : 0
            return (
              <button
                key={stars}
                onClick={() => setFilterStars(filterStars === stars ? null : stars)}
                className={`w-full flex items-center gap-2 group transition-opacity ${
                  filterStars !== null && filterStars !== stars ? 'opacity-40' : ''
                }`}
              >
                <div className="flex items-center gap-0.5 w-16 flex-shrink-0">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i <= stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-8 text-right flex-shrink-0">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Filter chips */}
      {filterStars && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-500">Filtrando por:</span>
          <button
            onClick={() => setFilterStars(null)}
            className="inline-flex items-center gap-1 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-full px-2.5 py-1 text-xs font-medium"
          >
            {filterStars} estrelas ✕
          </button>
        </div>
      )}

      {/* Review cards */}
      <div className="space-y-4">
        {displayReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-gray-900">{review.name}</span>
                    {review.verified && (
                      <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">
                        ✓ Compra verificada
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i <= review.stars
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-200 fill-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2 leading-relaxed">{review.comment}</p>
            <button
              onClick={() => setHelpfulClicked((prev) => new Set([...prev, review.id]))}
              className={`flex items-center gap-1 text-xs transition-colors ${
                helpfulClicked.has(review.id)
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <ThumbsUp className="w-3 h-3" />
              Útil ({review.helpful + (helpfulClicked.has(review.id) ? 1 : 0)})
            </button>
          </div>
        ))}
      </div>

      {filteredReviews.length > 3 && (
        <Button
          variant="outline"
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 text-sm"
        >
          {showAll ? 'Mostrar menos' : `Ver todas as ${filteredReviews.length} avaliações`}
          <ChevronDown className={`w-4 h-4 ml-1.5 transition-transform ${showAll ? 'rotate-180' : ''}`} />
        </Button>
      )}
    </div>
  )
}
