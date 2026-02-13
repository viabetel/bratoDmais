// Configurações centralizadas do site - SINGLE SOURCE OF TRUTH
// Todas as regras de negócio em um só lugar

export const siteConfig = {
  name: 'Barato D+',
  slogan: 'Produtos Novos e com Garantia',
  tagline: 'Tudo para sua casa!',
  
  // Contato
  contact: {
    phone: '(32) 99999-9999',
    whatsapp: '5532999999999',
    email: 'contato@baratodmais.com.br',
    address: 'Rua Principal, 123 - Centro',
    city: 'Juiz de Fora',
    state: 'MG',
    cep: '36000-000',
    cnpj: '00.000.000/0001-00',
  },
  
  // Horário de funcionamento
  hours: {
    weekdays: '08:00 às 18:00',
    saturday: '08:00 às 12:00',
    sunday: 'Fechado',
    support: '24 horas (chat)',
  },
  
  // Regras de frete
  shipping: {
    freeShippingMinimum: 299, // Frete grátis acima de R$ 299
    expressDeliveryDays: '1-2 dias úteis',
    standardDeliveryDays: '3-5 dias úteis',
    pickupAvailable: true,
  },
  
  // Regras de pagamento
  payment: {
    pixDiscount: 10, // 10% de desconto no Pix
    maxInstallments: 6, // Até 6x sem juros
    minInstallmentValue: 50, // Parcela mínima de R$ 50
    acceptedCards: ['Visa', 'Mastercard', 'Elo', 'American Express', 'Hipercard'],
    acceptedMethods: ['Pix', 'Cartão de Crédito', 'Boleto'],
  },
  
  // Garantias e políticas
  policies: {
    returnDays: 30, // 30 dias para devolução
    warrantyMonths: 12, // 12 meses de garantia
    extendedWarrantyPrice: 99.90, // Preço da garantia estendida
    installationPrice: 149.90, // Preço da instalação
  },
  
  // Redes sociais
  social: {
    facebook: 'https://facebook.com/baratodmais',
    instagram: 'https://instagram.com/baratodmais',
    youtube: 'https://youtube.com/baratodmais',
    whatsapp: 'https://wa.me/5532999999999',
  },
  
  // SEO
  seo: {
    defaultTitle: 'BARATO D+ - Eletrônicos e Eletrodomésticos com Desconto',
    defaultDescription: 'Compre eletrônicos e eletrodomésticos com até 80% de desconto. Parcelamento em 6x sem juros, 10% OFF no Pix e frete grátis acima de R$ 299.',
    keywords: ['eletrônicos', 'eletrodomésticos', 'desconto', 'promoção', 'barato', 'garantia'],
  },
}

// Helper para formatar valores
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

// Calcular preço com desconto Pix
export function calcPixPrice(price: number): number {
  return price * (1 - siteConfig.payment.pixDiscount / 100)
}

// Calcular parcelas
export function calcInstallments(price: number): { installments: number; value: number } {
  let installments = siteConfig.payment.maxInstallments
  let value = price / installments
  
  while (value < siteConfig.payment.minInstallmentValue && installments > 1) {
    installments--
    value = price / installments
  }
  
  return { installments, value }
}

// Verificar se tem frete grátis
export function hasFreeShipping(cartTotal: number): boolean {
  return cartTotal >= siteConfig.shipping.freeShippingMinimum
}

// Calcular frete
export function calcShipping(cep: string, cartTotal: number): { 
  standard: { price: number; days: string }
  express: { price: number; days: string }
  free: boolean
} {
  const free = hasFreeShipping(cartTotal)
  
  return {
    standard: {
      price: free ? 0 : 19.90,
      days: siteConfig.shipping.standardDeliveryDays,
    },
    express: {
      price: free ? 0 : 29.90,
      days: siteConfig.shipping.expressDeliveryDays,
    },
    free,
  }
}
