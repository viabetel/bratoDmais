import { Metadata } from 'next'
import { ComparePageClient } from './ComparePageClient'

export const metadata: Metadata = {
  title: 'Comparar Produtos | Brato Mais',
  description: 'Compare especificações e preços de até 4 produtos',
}

export default function ComparePage() {
  return <ComparePageClient />
}
