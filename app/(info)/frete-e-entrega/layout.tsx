import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frete e Entrega | Brato Mais - Tudo em Eletrônicos',
  description: 'Saiba como funcionam nossas opções de frete e entrega. Entrega em até 7 dias úteis com rastreamento. Frete grátis para compras acima de R$ 299.',
}

export default function FreteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
