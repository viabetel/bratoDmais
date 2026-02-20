/**
 * Shared image utilities - single source of truth for product placeholder images
 * Eliminates duplication between ProductCard, product page, and other components
 */

const CATEGORY_IMAGES: Record<string, string> = {
  'geladeiras': 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=600&fit=crop',
  'fogoes': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop',
  'microondas': 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&h=600&fit=crop',
  'maquinas-lavar': 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&h=600&fit=crop',
  'ar-condicionado': 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&h=600&fit=crop',
  'climatizacao': 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&h=600&fit=crop',
  'ventiladores': 'https://images.unsplash.com/photo-1617375407633-acd67aba7864?w=600&h=600&fit=crop',
  'tvs': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop',
  'notebooks': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop',
  'smartphones': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
  'eletronicos': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=600&fit=crop',
  'perifericos': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop',
  'componentes': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&h=600&fit=crop',
  'acessorios': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
  'utilidades': 'https://images.unsplash.com/photo-1522869635100-ce0846b1d02d?w=600&h=600&fit=crop',
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=600&fit=crop'

/**
 * Returns a reliable product image URL for a given category slug.
 * Falls back to a generic product image if category has no specific image.
 */
export function getProductImage(categorySlug: string, size: 'sm' | 'md' | 'lg' = 'md'): string {
  const sizeDimensions = { sm: '400&h=400', md: '600&h=600', lg: '800&h=800' }
  const base = CATEGORY_IMAGES[categorySlug] || DEFAULT_IMAGE
  // Replace default dimensions with requested size
  return base.replace(/w=\d+&h=\d+/, `w=${sizeDimensions[size]}`)
}

/**
 * Returns the best available image for a product, falling back to category placeholder.
 */
export function resolveProductImage(
  images: string[] | undefined,
  categorySlug: string,
  size: 'sm' | 'md' | 'lg' = 'md'
): string {
  // If the image is a placeholder path like /products/xxx.jpg, use category fallback
  if (!images?.length || images[0].startsWith('/products/')) {
    return getProductImage(categorySlug, size)
  }
  return images[0]
}

/**
 * Service type to icon/color mapping for consistent UI across components
 */
export const SERVICE_TYPE_CONFIG = {
  installation: { label: 'Instalação', color: 'orange', bgClass: 'bg-orange-50', textClass: 'text-orange-700', borderClass: 'border-orange-200' },
  rental: { label: 'Aluguel', color: 'green', bgClass: 'bg-green-50', textClass: 'text-green-700', borderClass: 'border-green-200' },
  maintenance: { label: 'Manutenção', color: 'blue', bgClass: 'bg-blue-50', textClass: 'text-blue-700', borderClass: 'border-blue-200' },
  warranty: { label: 'Garantia', color: 'purple', bgClass: 'bg-purple-50', textClass: 'text-purple-700', borderClass: 'border-purple-200' },
  protection: { label: 'Proteção', color: 'red', bgClass: 'bg-red-50', textClass: 'text-red-700', borderClass: 'border-red-200' },
} as const
