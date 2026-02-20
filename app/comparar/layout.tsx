import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comparar Produtos | Brato Mais',
  description: 'Compare até 4 produtos lado a lado. Veja especificações, preços e avaliações.',
}

export default function ComparLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
