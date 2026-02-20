export interface ServiceOption {
  id: string
  name: string
  description: string
  price: number
  duration?: string
  categories: string[]
  type: 'installation' | 'rental' | 'maintenance' | 'warranty' | 'protection'
}

export interface RentOption {
  id: string
  productId: string
  duration: 'diaria' | 'semanal' | 'mensal' | 'trimestral'
  price: number
  minDays?: number
  maxDays?: number
  deliveryIncluded: boolean
  depositRequired: boolean
  depositAmount?: number
}

export interface SchedulingOption {
  id: string
  serviceId: string
  minDate: number
  maxDate: number
  availableSlots: string[]
  location?: string
}

// Core services available across categories
export const services: ServiceOption[] = [
  // Installation Services
  {
    id: 'inst-001',
    name: 'Instalação Profissional',
    description: 'Instalação realizada por técnico especializado com garantia',
    price: 299,
    duration: '2-4 horas',
    categories: ['geladeiras', 'fogoes', 'microondas', 'maquinas-lavar', 'climatizacao'],
    type: 'installation',
  },
  {
    id: 'inst-002',
    name: 'Instalação Premium',
    description: 'Instalação premium com montagem de acessórios e testes completos',
    price: 499,
    duration: '4-6 horas',
    categories: ['geladeiras', 'maquinas-lavar', 'climatizacao'],
    type: 'installation',
  },
  
  // Extended Warranty Services
  {
    id: 'war-001',
    name: 'Garantia Estendida 12 meses',
    description: 'Proteção adicional contra defeitos de fabricação',
    price: 99,
    categories: ['geladeiras', 'fogoes', 'microondas', 'maquinas-lavar', 'notebooks', 'smartphones'],
    type: 'warranty',
  },
  {
    id: 'war-002',
    name: 'Garantia Estendida 24 meses',
    description: 'Proteção de 2 anos contra defeitos e cobertura de peças',
    price: 199,
    categories: ['geladeiras', 'fogoes', 'microondas', 'maquinas-lavar', 'tvs', 'climatizacao'],
    type: 'warranty',
  },
  
  // Protection Plans
  {
    id: 'prot-001',
    name: 'Proteção Contra Acidentes',
    description: 'Cobertura para danos acidentais, quedas e impactos',
    price: 149,
    categories: ['smartphones', 'notebooks', 'tvs'],
    type: 'protection',
  },
  {
    id: 'prot-002',
    name: 'Proteção Total',
    description: 'Proteção contra acidentes, defeitos e roubo com até R$ 5.000',
    price: 349,
    categories: ['smartphones', 'notebooks', 'tvs'],
    type: 'protection',
  },
  
  // Maintenance Services
  {
    id: 'mant-001',
    name: 'Manutenção Preventiva',
    description: 'Limpeza e inspeção de componentes críticos',
    price: 199,
    duration: '1-2 horas',
    categories: ['geladeiras', 'ar-condicionado', 'climatizacao'],
    type: 'maintenance',
  },
  {
    id: 'mant-002',
    name: 'Manutenção Anual',
    description: 'Plano anual com 2 visitas de manutenção preventiva',
    price: 299,
    categories: ['geladeiras', 'climatizacao', 'maquinas-lavar'],
    type: 'maintenance',
  },
  {
    id: 'mant-003',
    name: 'Atendimento Emergencial 24h',
    description: 'Suporte técnico 24/7 com atendimento em até 4 horas',
    price: 199,
    categories: ['geladeiras', 'climatizacao'],
    type: 'maintenance',
  },
  
  // Rental Options (by category)
  {
    id: 'rent-001',
    name: 'Aluguel Diário',
    description: 'Aluguel por dia com entrega e retirada incluída',
    price: 49,
    duration: 'diaria',
    categories: ['microondas', 'fogoes'],
    type: 'rental',
  },
  {
    id: 'rent-002',
    name: 'Aluguel Semanal',
    description: 'Aluguel por semana com desconto progressivo',
    price: 249,
    duration: 'semanal',
    categories: ['geladeiras', 'microondas', 'fogoes', 'maquinas-lavar'],
    type: 'rental',
  },
  {
    id: 'rent-003',
    name: 'Aluguel Mensal',
    description: 'Aluguel por mês com opção de compra',
    price: 799,
    duration: 'mensal',
    categories: ['geladeiras', 'maquinas-lavar', 'climatizacao'],
    type: 'rental',
  },
]

// Service availability by category
export const servicesByCategory: Record<string, ServiceOption[]> = {}

// Build mapping
services.forEach((service) => {
  service.categories.forEach((category) => {
    if (!servicesByCategory[category]) {
      servicesByCategory[category] = []
    }
    servicesByCategory[category].push(service)
  })
})

export function getServicesByCategory(categorySlug: string): ServiceOption[] {
  return servicesByCategory[categorySlug] || []
}

export function getServiceById(id: string): ServiceOption | undefined {
  return services.find((s) => s.id === id)
}

export function getServicesByType(
  type: ServiceOption['type'],
  categorySlug?: string
): ServiceOption[] {
  let filtered = services.filter((s) => s.type === type)
  if (categorySlug) {
    filtered = filtered.filter((s) => s.categories.includes(categorySlug))
  }
  return filtered
}
