'use client'

import { useState } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const faqItems = [
  {
    question: 'Qual é o prazo de entrega?',
    answer: 'Entregamos em até 7 dias úteis para a maioria das regiões. Frete grátis em compras acima de R$ 299. Escolha o frete expresso no carrinho se preferir mais rapidez.',
  },
  {
    question: 'Posso parcelar minha compra?',
    answer: 'Sim! Oferecemos até 12x sem juros no crédito e 10% de desconto no Pix à vista. Confira as condições no carrinho.',
  },
  {
    question: 'E se o produto chegar com defeito?',
    answer: 'Todos os produtos têm garantia de 12 meses. Se chegar com defeito, fazemos troca ou reembolso imediato. Basta entrar em contato pelo WhatsApp.',
  },
  {
    question: 'Como faço para rastrear meu pedido?',
    answer: 'Você recebe um código de rastreamento por email assim que o produto sai do nosso estoque. Pode acompanhar pelo seu perfil ou clicando no link que enviamos.',
  },
  {
    question: 'Qual é o horário de atendimento?',
    answer: 'Estamos disponíveis de segunda a sexta, das 08h às 18h (horário de Brasília) pelo WhatsApp e email. Nos fins de semana respondemos com até 24 horas.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
            Dúvidas Frequentes
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Confira as respostas para as perguntas mais comuns
          </p>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-left">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
            <p className="text-gray-700 mb-4">Ainda tem dúvidas?</p>
            <Link href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 mx-auto transition-all">
                <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
