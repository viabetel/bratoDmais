import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BARATO D+ - Eletrônicos com Desconto | Produtos Novos e com Garantia',
  description: 'Compre eletrônicos com desconto em BARATO D+. Parcelado em até 6x, 10% de desconto no Pix, frete rápido em 48 horas. Tudo para sua casa!',
  keywords: 'eletrônicos, desconto, barato, produtos novos, garantia, frete rápido, pix desconto',
  openGraph: {
    title: 'BARATO D+ - Eletrônicos com Desconto',
    description: 'Compre eletrônicos com desconto em BARATO D+. Parcelado em até 6x, 10% de desconto no Pix, frete rápido.',
    url: 'https://baroto-dplus.com',
    locale: 'pt_BR',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1F43AF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
