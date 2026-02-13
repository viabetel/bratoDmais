/**
 * Format a number as Brazilian Real (BRL)
 * @param amount - Amount to format
 * @returns Formatted string (e.g., "R$ 299,90")
 */
export function formatBRL(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount)
}

/**
 * Calculate Pix discount (10% off by default)
 * @param amount - Original amount
 * @param discountPercent - Discount percentage (default: 10)
 * @returns Discounted amount
 */
export function calcPixDiscount(amount: number, discountPercent = 10): number {
  return amount * (1 - discountPercent / 100)
}

/**
 * Generate installment options
 * @param price - Product price
 * @param maxInstallments - Maximum number of installments (default: 6)
 * @returns Array of installment options
 */
export function calcInstallments(
  price: number,
  maxInstallments = 6
): Array<{ installments: number; value: number; total: number }> {
  const options = []

  for (let i = 1; i <= maxInstallments; i++) {
    const value = price / i
    options.push({
      installments: i,
      value: Math.round(value * 100) / 100,
      total: price,
    })
  }

  return options
}

/**
 * Build filters from URL search params
 * @param searchParams - URL search params
 * @returns Parsed filters object
 */
export function buildFiltersFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): {
  priceMin?: number
  priceMax?: number
  brands?: string[]
  condition?: string
  inStock?: boolean
  rating?: number
  sort?: string
  search?: string
  page?: number
} {
  const filters: Record<string, any> = {}

  if (searchParams.priceMin) {
    filters.priceMin = parseInt(searchParams.priceMin as string)
  }
  if (searchParams.priceMax) {
    filters.priceMax = parseInt(searchParams.priceMax as string)
  }
  if (searchParams.brands) {
    filters.brands = Array.isArray(searchParams.brands)
      ? searchParams.brands
      : [searchParams.brands]
  }
  if (searchParams.condition) {
    filters.condition = searchParams.condition
  }
  if (searchParams.inStock !== undefined) {
    filters.inStock = searchParams.inStock === 'true'
  }
  if (searchParams.rating) {
    filters.rating = parseInt(searchParams.rating as string)
  }
  if (searchParams.sort) {
    filters.sort = searchParams.sort
  }
  if (searchParams.q) {
    filters.search = searchParams.q
  }
  if (searchParams.page) {
    filters.page = parseInt(searchParams.page as string)
  }

  return filters
}

/**
 * Convert a string to a URL-friendly slug
 * @param text - Text to slugify
 * @returns URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Reverse of slugify - convert slug back to readable text
 * @param slug - URL slug
 * @returns Readable text
 */
export function unslugify(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Calculate discount percentage
 * @param originalPrice - Original price
 * @param currentPrice - Current price
 * @returns Discount percentage
 */
export function getDiscountPercent(originalPrice: number, currentPrice: number): number {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

/**
 * Calculate discount amount
 * @param originalPrice - Original price
 * @param currentPrice - Current price
 * @returns Discount amount
 */
export function getDiscountAmount(originalPrice: number, currentPrice: number): number {
  return Math.round((originalPrice - currentPrice) * 100) / 100
}

/**
 * Format installment text
 * @param price - Product price
 * @param installments - Number of installments
 * @returns Formatted installment string
 */
export function formatInstallment(price: number, installments: number): string {
  const value = price / installments
  return `${installments}x de ${formatBRL(value)} sem juros`
}

/**
 * Format date to Brazilian format
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d)
}

/**
 * Format CEP with mask
 * @param cep - CEP string
 * @returns Formatted CEP
 */
export function formatCEP(cep: string): string {
  const cleaned = cep.replace(/\D/g, '')
  return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2')
}

/**
 * Format phone number with mask
 * @param phone - Phone string
 * @returns Formatted phone
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
}

/**
 * Get Pix price (10% discount)
 * @param price - Original price
 * @returns Price with Pix discount
 */
export function getPixPrice(price: number): number {
  return price * 0.9
}
