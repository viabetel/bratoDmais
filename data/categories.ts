export interface Category {
  id: string
  slug: string
  name: string
  description: string
  icon?: string
  subcategories?: Category[]
}

export const categories: Category[] = [
  {
    id: 'cat-eletrodomesticos',
    slug: 'eletrodomesticos',
    name: 'Eletrodomésticos',
    description: 'Geladeiras, fogões, micro-ondas e muito mais',
    icon: 'refrigerator',
    subcategories: [
      {
        id: 'subcat-geladeiras',
        slug: 'geladeiras',
        name: 'Geladeiras',
        description: 'Frost Free, Duplex e Inverse',
      },
      {
        id: 'subcat-fogoes',
        slug: 'fogoes',
        name: 'Fogões',
        description: '4, 5 e 6 bocas',
      },
      {
        id: 'subcat-microondas',
        slug: 'microondas',
        name: 'Micro-ondas',
        description: 'Com e sem grill',
      },
      {
        id: 'subcat-maquinas-lavar',
        slug: 'maquinas-lavar',
        name: 'Máquinas de Lavar',
        description: 'Lava e Seca, Automáticas',
      },
    ],
  },
  {
    id: 'cat-climatizacao',
    slug: 'climatizacao',
    name: 'Climatização',
    description: 'Ar condicionado e ventiladores',
    icon: 'wind',
    subcategories: [
      {
        id: 'subcat-ar-condicionado',
        slug: 'ar-condicionado',
        name: 'Ar Condicionado',
        description: 'Split e Janela',
      },
      {
        id: 'subcat-ventiladores',
        slug: 'ventiladores',
        name: 'Ventiladores',
        description: 'Coluna, Mesa e Parede',
      },
    ],
  },
  {
    id: 'cat-utilidades',
    slug: 'utilidades',
    name: 'Utilidades Domésticas',
    description: 'Para facilitar seu dia a dia',
    icon: 'home',
  },
  {
    id: 'cat-tvs',
    slug: 'tvs',
    name: 'TVs',
    description: 'Smart TVs e monitores',
    icon: 'tv',
  },
  {
    id: 'cat-notebooks',
    slug: 'notebooks',
    name: 'Notebooks',
    description: 'Para trabalho e estudo',
    icon: 'laptop',
  },
  {
    id: 'cat-smartphones',
    slug: 'smartphones',
    name: 'Smartphones',
    description: 'Celulares e acessórios',
    icon: 'smartphone',
  },
  {
    id: 'cat-eletronicos',
    slug: 'eletronicos',
    name: 'Eletrônicos',
    description: 'Confira nossos eletrônicos com desconto',
    icon: 'zap',
  },
  {
    id: 'cat-perifericos',
    slug: 'perifericos',
    name: 'Periféricos',
    description: 'Teclados, mouses e mais',
    icon: 'mouse',
  },
  {
    id: 'cat-componentes',
    slug: 'componentes',
    name: 'Componentes',
    description: 'Para sua máquina gamer',
    icon: 'cpu',
  },
  {
    id: 'cat-acessorios',
    slug: 'acessorios',
    name: 'Acessórios',
    description: 'Cabos, carregadores e muito mais',
    icon: 'gift',
  },
]
