'use client'

import { useState } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const faqItems = [
  {
    question: 'Qual é o prazo de entrega?',
    answer: 'Entregamos em até 7 dias úteis para a maioria das regiões. Frete grátis em compras acima de R$ 299. Escolha o frete expresso se preferir receber em 2-3 dias úteis.',
  },
  {
    question: 'Posso parcelar minha compra?',
    answer: 'Sim! Oferecemos até 12x sem juros no cartão de crédito. Além disso, aproveite 10% de desconto ao pagar via Pix à vista. Sem taxa de administração em nenhuma opção.',
  },
  {
    question: 'E se o produto chegar com defeito?',
    answer: 'Temos garantia de 12 meses em todos os produtos. Se chegar com defeito, oferecemos troca gratuitamente ou reembolso integral em até 5 dias úteis.',
  },
  {
    question: 'Como faço para rastrear meu pedido?',
    answer: 'Você recebe um código de rastreamento por email assim que o produto sai do estoque. Pode acompanhar em tempo real pelo seu perfil na Brato Mais ou no site da transportadora.',
  },
  {
    question: 'Qual é o horário de atendimento?',
    answer: 'Atendimento de segunda a sexta, das 08h às 18h (Brasília). Nos finais de semana, respondemos com até 24 horas. Contato via WhatsApp, email e chat ao vivo.',
  },
  {
    question: 'Existe alternativa ao frete?',
    answer: 'Sim! Você pode retirar na loja sem taxas de frete. Compre online e retire no mesmo dia em nossa unidade. Confira a disponibilidade de produtos para retirada ao finalizar a compra.',
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
