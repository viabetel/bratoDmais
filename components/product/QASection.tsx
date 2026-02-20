'use client'

import { useState } from 'react'
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Product } from '@/data/products'
import { siteConfig } from '@/lib/config'

interface QAItem {
  question: string
  answer: string
  votes: number
}

function generateQA(product: Product): QAItem[] {
  const base: QAItem[] = [
    {
      question: `Este produto tem garantia?`,
      answer: `Sim! O ${product.name} vem com ${siteConfig.policies.warrantyMonths} meses de garantia do fabricante. Adicionalmente, oferecemos a opção de Garantia Estendida por mais 12 meses pelo nosso serviço.`,
      votes: 24,
    },
    {
      question: `Qual o prazo de entrega?`,
      answer: `Após a confirmação do pagamento, o prazo de entrega padrão é de ${siteConfig.shipping.standardDeliveryDays} dias úteis. Para entrega expressa, entre ${siteConfig.shipping.expressDeliveryDays} dias úteis. O frete é grátis para compras acima de R$ ${siteConfig.shipping.freeShippingMinimum}.`,
      votes: 18,
    },
    {
      question: `Posso trocar ou devolver o produto?`,
      answer: `Sim, você tem ${siteConfig.policies.returnDays} dias corridos após o recebimento para solicitar troca ou devolução caso o produto chegue com defeito ou diferente do anunciado. Basta entrar em contato com nosso suporte.`,
      votes: 15,
    },
    {
      question: `Vocês instalam o produto?`,
      answer: `Sim! Oferecemos serviço de instalação profissional com técnicos certificados. Ao adicionar ao carrinho, você pode incluir a instalação como serviço adicional. O agendamento é feito após a entrega.`,
      votes: 12,
    },
    {
      question: `O produto é original e novo?`,
      answer: `Todos os produtos da Barato D+ são originais e com nota fiscal. ${product.condition === 'novo' ? 'Este produto é novo, lacrado e na embalagem original do fabricante.' : `Este produto é classificado como "${product.condition}" — leia a descrição completa para detalhes sobre o estado de conservação.`}`,
      votes: 31,
    },
  ]

  // Add category-specific Q&A
  if (['geladeiras', 'maquinas-lavar', 'ar-condicionado', 'climatizacao'].includes(product.categorySlug)) {
    base.push({
      question: `Preciso de instalação para usar este produto?`,
      answer: `Sim, eletrodomésticos como ${product.category} geralmente requerem instalação por profissional. Recomendamos contratar nosso serviço de instalação para garantia do serviço e evitar problemas com a garantia do produto.`,
      votes: 9,
    })
  }

  if (['notebooks', 'smartphones', 'eletronicos'].includes(product.categorySlug)) {
    base.push({
      question: `Vem com carregador e acessórios na caixa?`,
      answer: `Sim, o produto vem com todos os acessórios originais do fabricante na caixa. Consulte as especificações técnicas para ver a lista completa de itens inclusos.`,
      votes: 22,
    })
  }

  return base
}

interface QASectionProps {
  product: Product
}

export function QASection({ product }: QASectionProps) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]))
  const [voted, setVoted] = useState<Set<number>>(new Set())
  const qaItems = generateQA(product)

  const handleVote = (index: number) => {
    setVoted((prev) => new Set([...prev, index]))
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 mt-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-bold text-gray-900">Perguntas Frequentes</h2>
        </div>
        <a
          href={siteConfig.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-green-600 font-semibold hover:text-green-700 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Perguntar no WhatsApp
        </a>
      </div>

      <div className="space-y-2">
        {qaItems.map((item, index) => {
          const isOpen = expanded.has(index)
          return (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden transition-all ${
                isOpen ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <button
                onClick={() =>
                  setExpanded((prev) => {
                    const next = new Set(prev)
                    if (next.has(index)) next.delete(index)
                    else next.add(index)
                    return next
                  })
                }
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
              >
                <span className="font-semibold text-sm text-gray-900">{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{item.answer}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">Esta resposta foi útil?</span>
                    <button
                      onClick={() => handleVote(index)}
                      disabled={voted.has(index)}
                      className={`text-xs flex items-center gap-1 transition-colors ${
                        voted.has(index)
                          ? 'text-blue-600 font-semibold cursor-default'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      👍 {item.votes + (voted.has(index) ? 1 : 0)}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-500 mb-2">Não encontrou sua resposta?</p>
        <a
          href={siteConfig.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-sm px-4 py-2 rounded-xl transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Falar com um especialista
        </a>
      </div>
    </div>
  )
}
