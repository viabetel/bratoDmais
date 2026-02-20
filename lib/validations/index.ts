import { categories } from '@/data/categories'

export function validateCategorySlug(slug: string): boolean {
  for (const category of categories) {
    if (category.slug === slug) return true
    if (category.subcategories?.some(sub => sub.slug === slug)) return true
  }
  return false
}

export function validatePriceRange(min: number, max: number): boolean {
  return min >= 0 && max >= min && max <= 100000
}

export function validateProductId(id: string): boolean {
  return /^p\d{3}$/.test(id)
}

export function validateRating(rating: number): boolean {
  return rating >= 0 && rating <= 5
}

export function sanitizeSearchQuery(query: string): string {
  return query.trim().substring(0, 100)
}
