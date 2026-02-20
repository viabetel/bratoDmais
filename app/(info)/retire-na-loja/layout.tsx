import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Retire na Loja | Brato Mais',
  description: 'Compre online e retire na loja. Sem taxas de frete. Retira no mesmo dia.',
}

export default function RetireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
