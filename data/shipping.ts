export interface ShippingOption {
  id: string
  name: string
  estimatedDays: number
  baseCost: number
  icon: string
}

export const shippingOptions: ShippingOption[] = [
  {
    id: 'shipping-express',
    name: 'Entrega Express',
    estimatedDays: 1,
    baseCost: 0,
    icon: 'zap',
  },
  {
    id: 'shipping-fast',
    name: 'Entrega Rápida',
    estimatedDays: 3,
    baseCost: 0,
    icon: 'truck',
  },
  {
    id: 'shipping-standard',
    name: 'Entrega Padrão',
    estimatedDays: 7,
    baseCost: 0,
    icon: 'box',
  },
  {
    id: 'shipping-pickup',
    name: 'Retirada na Loja',
    estimatedDays: 1,
    baseCost: 0,
    icon: 'store',
  },
]

export const mockStores = [
  {
    id: 'store-sp',
    name: 'Loja São Paulo - Pinheiros',
    address: 'Rua Augusta, 1234 - São Paulo, SP',
    hours: 'Seg-Dom: 10h-21h',
  },
  {
    id: 'store-rj',
    name: 'Loja Rio de Janeiro - Copacabana',
    address: 'Av. Atlântica, 5678 - Rio de Janeiro, RJ',
    hours: 'Seg-Dom: 09h-22h',
  },
  {
    id: 'store-mg',
    name: 'Loja Belo Horizonte - Centro',
    address: 'Av. Getúlio Vargas, 9101 - Belo Horizonte, MG',
    hours: 'Seg-Sáb: 10h-20h | Dom: 12h-18h',
  },
  {
    id: 'store-ba',
    name: 'Loja Salvador - Barra',
    address: 'Av. Oceânica, 1112 - Salvador, BA',
    hours: 'Seg-Dom: 10h-21h',
  },
]
