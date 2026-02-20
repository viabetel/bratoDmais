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
  
  // More Installation Services
  {
    id: 'inst-003',
    name: 'Instalação AC Split',
    description: 'Especializada em ar-condicionado split com canos hidráulicos',
    price: 599,
    duration: '3-5 horas',
    categories: ['climatizacao', 'ar-condicionado'],
    type: 'installation',
  },
  {
    id: 'inst-004',
    name: 'Instalação de Encanação',
    description: 'Adaptação de encanação e instalação com testes de vazamento',
    price: 399,
    duration: '2-3 horas',
    categories: ['geladeiras', 'maquinas-lavar'],
    type: 'installation',
  },
  
  // More Maintenance Services
  {
    id: 'mant-004',
    name: 'Plano Ouro - Manutenção Trimestral',
    description: '4 visitas por ano com prioridade no agendamento',
    price: 799,
    categories: ['climatizacao', 'geladeiras', 'maquinas-lavar'],
    type: 'maintenance',
  },
  {
    id: 'mant-005',
    name: 'Limpeza Profissional de AC',
    description: 'Higienização completa do sistema de ar-condicionado',
    price: 249,
    duration: '1-2 horas',
    categories: ['climatizacao', 'ar-condicionado'],
    type: 'maintenance',
  },
  {
    id: 'mant-006',
    name: 'Substituição de Filtros',
    description: 'Troca de filtros e análise de funcionalidade',
    price: 149,
    duration: '30 min',
    categories: ['climatizacao', 'ar-condicionado', 'geladeiras'],
    type: 'maintenance',
  },
  
  // Extended Warranties
  {
    id: 'war-003',
    name: 'Garantia Estendida 36 meses',
    description: 'Proteção de 3 anos com cobertura total incluindo peças',
    price: 299,
    categories: ['geladeiras', 'climatizacao', 'maquinas-lavar'],
    type: 'warranty',
  },
  {
    id: 'war-004',
    name: 'Proteção com Seguro',
    description: 'Garantia estendida + seguro contra roubo e sinistros',
    price: 449,
    categories: ['smartphones', 'notebooks', 'tvs'],
    type: 'warranty',
  },
  
  // More Protection Plans
  {
    id: 'prot-003',
    name: 'Proteção Premium Plus',
    description: 'Cobertura máxima: acidentes, roubo, sinistros, até R$ 10.000',
    price: 599,
    categories: ['smartphones', 'notebooks', 'tvs', 'eletronicos'],
    type: 'protection',
  },
  {
    id: 'prot-004',
    name: 'Seguro de Produto',
    description: 'Cobertura securitária com indenização total do equipamento',
    price: 249,
    categories: ['smartphones', 'tvs', 'notebooks'],
    type: 'protection',
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
