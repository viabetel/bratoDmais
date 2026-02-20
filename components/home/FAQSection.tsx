'use client'

import { useState } from 'react'
<<<<<<< HEAD
import { ChevronDown, MessageCircle, Mail } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'
=======
import { ChevronDown, MessageCircle } from 'lucide-react'
import Link from 'next/link'
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308

const faqItems = [
  {
    question: 'Qual é o prazo de entrega?',
<<<<<<< HEAD
    answer: 'Entregamos em até 7 dias úteis para a maioria das regiões. Frete grátis em compras acima de R$ 299. Escolha o frete expresso para receber em 1-2 dias úteis.',
  },
  {
    question: 'Posso parcelar minha compra?',
    answer: 'Sim! Até 12x sem juros no cartão de crédito. 10% de desconto pagando via Pix à vista. Sem taxas escondidas.',
  },
  {
    question: 'E se o produto chegar com defeito?',
    answer: 'Garantia de 12 meses em todos os produtos. Troca gratuitamente ou reembolso integral em até 5 dias úteis. Simples e sem burocracia.',
  },
  {
    question: 'Como rastreio meu pedido?',
    answer: 'Você recebe um código de rastreamento por e-mail assim que o produto sai do estoque. Acompanhe em tempo real na sua conta.',
  },
  {
    question: 'Qual é o horário de atendimento?',
    answer: `Segunda a sexta das ${siteConfig.hours.weekdays} e sábados das ${siteConfig.hours.saturday}. WhatsApp com resposta em até 24h.`,
  },
  {
    question: 'Posso retirar na loja?',
    answer: `Sim! Compre online e retire sem custo de frete em ${siteConfig.contact.city} - ${siteConfig.contact.state}. Disponível no mesmo dia.`,
  },
  {
    question: 'Vocês fazem instalação?',
    answer: 'Sim! Instalação profissional com técnico certificado para geladeiras, máquinas de lavar, ar-condicionados, TVs e mais. Adicione o serviço na página do produto.',
  },
  {
    question: 'É possível alugar em vez de comprar?',
    answer: 'Sim! Aluguel mensal, semanal ou diário para geladeiras, lavadoras, micro-ondas e AC. Ideal para empresas, eventos ou situações temporárias.',
=======
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
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
<<<<<<< HEAD
    <section className="py-12 md:py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Temos as respostas</p>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Dúvidas Frequentes</h2>
            <p className="text-gray-500 text-sm">Tudo que você precisa saber antes de comprar</p>
          </div>

          <div className="space-y-2 mb-8">
            {faqItems.map((item, index) => (
              <div key={index} className={`border rounded-xl overflow-hidden transition-all ${openIndex === index ? 'border-blue-200 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50/80 transition-colors text-left gap-4"
                >
                  <span className={`font-semibold text-sm leading-snug ${openIndex === index ? 'text-blue-700' : 'text-gray-900'}`}>
                    {item.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-48' : 'max-h-0'}`}>
                  <div className="px-5 pb-4 pt-1 border-t border-blue-100 bg-blue-50/30">
                    <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                  </div>
                </div>
=======
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
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
              </div>
            ))}
          </div>

<<<<<<< HEAD
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white text-center">
            <h3 className="font-black text-lg mb-1">Ainda tem dúvidas?</h3>
            <p className="text-blue-100 text-sm mb-5">Nossa equipe está pronta para ajudar você agora</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent('Olá! Tenho uma dúvida.')}`} target="_blank" rel="noopener noreferrer">
                <button className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-2.5 rounded-xl transition-all hover:shadow-lg text-sm">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </button>
              </Link>
              <Link href="/contato">
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-2.5 rounded-xl transition-all border border-white/30 text-sm">
                  <Mail className="w-4 h-4" /> Enviar Mensagem
                </button>
              </Link>
            </div>
=======
          <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
            <p className="text-gray-700 mb-4">Ainda tem dúvidas?</p>
            <Link href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 mx-auto transition-all">
                <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
              </button>
            </Link>
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
          </div>
        </div>
      </div>
    </section>
  )
}
