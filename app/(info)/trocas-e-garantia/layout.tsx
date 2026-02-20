import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trocas e Garantia | Brato Mais',
  description: 'Conheça nossa política de trocas, devoluções e garantia de 12 meses. Compre com segurança.',
}

export default function TrocasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
