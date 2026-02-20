import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formas de Pagamento | Brato Mais',
  description: 'Conheça todas as formas de pagamento disponíveis. Parcelamento em até 12x sem juros no cartão de crédito. Pix com 10% de desconto.',
}

export default function PagamentoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
