import { categories } from '@/data/categories'

export type Category = (typeof categories)[number]
export type Subcategory = Category['subcategories'][number]

/**
 * Encontra uma categoria ou subcategoria pelo slug
 */
export function getCategoryBySlug(slug: string): Category | Subcategory | undefined {
  // Procura nas categorias raiz
  const category = categories.find((c) => c.slug === slug)
  if (category) return category

  // Procura nas subcategorias
  for (const cat of categories) {
    const subcat = cat.subcategories?.find((s) => s.slug === slug)
    if (subcat) return subcat
  }

  return undefined
}

/**
 * Encontra uma categoria pelo ID
 */
export function getCategoryById(id: string): Category | Subcategory | undefined {
  const category = categories.find((c) => c.id === id)
  if (category) return category

  for (const cat of categories) {
    const subcat = cat.subcategories?.find((s) => s.id === id)
    if (subcat) return subcat
  }

  return undefined
}

/**
 * Retorna as subcategorias de uma categoria pai
 */
export function getSubcategories(categorySlug: string): Subcategory[] {
  const category = categories.find((c) => c.slug === categorySlug)
  return category?.subcategories || []
}

/**
 * Retorna o caminho completo de uma categoria/subcategoria
 * Ex: ["Eletrônicos", "Notebooks"] ou ["Eletrodomésticos"]
 */
export function getCategoryPath(slug: string): string[] {
  const path: string[] = []

  // Procura nas categorias raiz
  const rootCategory = categories.find((c) => c.slug === slug)
  if (rootCategory) {
    path.push(rootCategory.name)
    return path
  }

  // Procura nas subcategorias
  for (const cat of categories) {
    const subcat = cat.subcategories?.find((s) => s.slug === slug)
    if (subcat) {
      path.push(cat.name)
      path.push(subcat.name)
      return path
    }
  }

  return []
}

/**
 * Retorna a categoria pai de uma subcategoria
 */
export function getParentCategory(subcategorySlug: string): Category | undefined {
  for (const cat of categories) {
    const subcat = cat.subcategories?.find((s) => s.slug === subcategorySlug)
    if (subcat) return cat
  }
  return undefined
}

/**
 * Retorna todas as subcategorias como array flat para filtros
 */
export function getAllSubcategories(): Subcategory[] {
  const allSubcats: Subcategory[] = []
  for (const cat of categories) {
    if (cat.subcategories) {
      allSubcats.push(...cat.subcategories)
    }
  }
  return allSubcats
}

/**
 * Valida se um slug de categoria existe
 */
export function isCategoryValid(slug: string): boolean {
  return getCategoryBySlug(slug) !== undefined
}
<<<<<<< HEAD

/**
 * Obtém todos os slugs de subcategorias de uma categoria pai
 * Usado para filtrar produtos quando uma categoria pai é selecionada
 */
export function getSubcategorySlugs(parentCategorySlug: string): string[] {
  const category = categories.find((c) => c.slug === parentCategorySlug)
  if (!category || !category.subcategories) {
    // Se for uma subcategoria, retorna ela mesma
    if (getCategoryBySlug(parentCategorySlug)) {
      return [parentCategorySlug]
    }
    return []
  }
  return category.subcategories.map((s) => s.slug)
}

/**
 * Verifica se um slug é uma categoria pai (tem subcategorias)
 */
export function isParentCategory(slug: string): boolean {
  const category = categories.find((c) => c.slug === slug)
  return category ? (category.subcategories && category.subcategories.length > 0) : false
}
=======
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
