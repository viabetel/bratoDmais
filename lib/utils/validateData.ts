/**
 * Validador de integridade de dados — lib/utils/validateData.ts
 *
 * Roda em desenvolvimento ou em um script de CI para garantir que:
 * - todo product.categorySlug existe em categories
 * - todo service.categories[] existe em categories
 * - nenhum slug está duplicado dentro da mesma entidade
 * - slugs reservados não estão em uso
 * - categorias pai sem filhos E sem produtos são reportadas
 *
 * Uso:
 *   import { validateDataIntegrity } from '@/lib/utils/validateData'
 *   validateDataIntegrity() // lança no console, retorna resumo
 */

import { categories } from '@/data/categories'
import { products } from '@/data/products'
import { services } from '@/data/services'
import { getSubcategorySlugs } from './categories'

const RESERVED_SLUGS = new Set([
  'admin', 'api', 'login', 'logout', 'register', 'dashboard',
  'static', 'public', '_next', 'favicon', 'robots',
])

export interface ValidationResult {
  errors: string[]
  warnings: string[]
  ok: boolean
  summary: string
}

export function validateDataIntegrity(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // ── 1. Slugs reservados ──────────────────────────────────────────────────
  for (const cat of categories) {
    if (RESERVED_SLUGS.has(cat.slug)) {
      errors.push(`[category] Slug reservado em uso: "${cat.slug}"`)
    }
    for (const sub of cat.subcategories ?? []) {
      if (RESERVED_SLUGS.has(sub.slug)) {
        errors.push(`[subcategory] Slug reservado em uso: "${sub.slug}" (pai: ${cat.slug})`)
      }
    }
  }

  for (const p of products) {
    if (RESERVED_SLUGS.has(p.slug)) {
      errors.push(`[product] Slug reservado em uso: "${p.slug}" (id: ${p.id})`)
    }
  }

  // ── 2. Unicidade de slugs por entidade ───────────────────────────────────
  const allCategorySlugs = [
    ...categories.map(c => c.slug),
    ...categories.flatMap(c => (c.subcategories ?? []).map(s => s.slug)),
  ]
  const dupCategorySlugs = allCategorySlugs.filter(
    (s, i, arr) => arr.indexOf(s) !== i
  )
  for (const dup of [...new Set(dupCategorySlugs)]) {
    errors.push(`[category] Slug duplicado: "${dup}"`)
  }

  const productSlugs = products.map(p => p.slug)
  const dupProductSlugs = productSlugs.filter((s, i, arr) => arr.indexOf(s) !== i)
  for (const dup of [...new Set(dupProductSlugs)]) {
    errors.push(`[product] Slug duplicado: "${dup}"`)
  }

  // ── 3. product.categorySlug deve existir em categories ───────────────────
  const validCategorySlugs = new Set(allCategorySlugs)
  for (const p of products) {
    if (!validCategorySlugs.has(p.categorySlug)) {
      errors.push(
        `[product] categorySlug inválido: produto "${p.slug}" tem categorySlug="${p.categorySlug}" que não existe em categories`
      )
    }
  }

  // ── 4. service.categories[] devem existir em categories ─────────────────
  for (const s of services) {
    for (const catSlug of s.categories ?? []) {
      if (!validCategorySlugs.has(catSlug)) {
        warnings.push(
          `[service] categoria inexistente em serviço "${s.id}": "${catSlug}" — o serviço pode nunca aparecer`
        )
      }
    }
  }

  // ── 5. Categorias pai sem filhos E sem produtos ──────────────────────────
  for (const cat of categories) {
    const hasSubs = (cat.subcategories?.length ?? 0) > 0
    const relevantSlugs = getSubcategorySlugs(cat.slug)
    const hasProducts = products.some(p => relevantSlugs.includes(p.categorySlug))

    if (!hasSubs && !hasProducts) {
      warnings.push(
        `[category] Categoria "${cat.slug}" não tem subcategorias nem produtos vinculados`
      )
    }
    if (hasSubs && !hasProducts) {
      warnings.push(
        `[category] Categoria pai "${cat.slug}" tem subcategorias mas NENHUM produto — verifique se categorySlug dos produtos usa o slug pai ou das subcategorias`
      )
    }
  }

  // ── 6. product.category (display name) vs categorySlug ───────────────────
  // Detecta produtos onde .category é diferente do name da categoria correspondente
  const categoryNameMap = new Map<string, string>()
  for (const cat of categories) {
    categoryNameMap.set(cat.slug, cat.name)
    for (const sub of cat.subcategories ?? []) {
      categoryNameMap.set(sub.slug, sub.name)
    }
  }

  const categoryNameMismatch = new Map<string, { slug: string; catField: string; expected: string }>()
  for (const p of products) {
    const expected = categoryNameMap.get(p.categorySlug)
    if (expected && p.category !== p.categorySlug && p.category !== expected) {
      // Só registra uma vez por categoria para não poluir
      if (!categoryNameMismatch.has(p.categorySlug)) {
        categoryNameMismatch.set(p.categorySlug, {
          slug: p.categorySlug,
          catField: p.category,
          expected,
        })
      }
    }
  }
  for (const [, info] of categoryNameMismatch) {
    warnings.push(
      `[product] product.category="${info.catField}" pode estar desatualizado para categorySlug="${info.slug}" (nome esperado: "${info.expected}") — considere usar getCategoryBySlug().name no display`
    )
  }

  // ── Resultado ────────────────────────────────────────────────────────────
  const ok = errors.length === 0
  const summary = ok
    ? `✅ Integridade OK — ${warnings.length} aviso(s)`
    : `❌ ${errors.length} erro(s), ${warnings.length} aviso(s)`

  if (process.env.NODE_ENV === 'development') {
    if (errors.length) {
      console.group('%c[validateDataIntegrity] ERROS', 'color: red; font-weight: bold')
      errors.forEach(e => console.error(e))
      console.groupEnd()
    }
    if (warnings.length) {
      console.group('%c[validateDataIntegrity] AVISOS', 'color: orange; font-weight: bold')
      warnings.forEach(w => console.warn(w))
      console.groupEnd()
    }
    console.log(`%c${summary}`, `color: ${ok ? 'green' : 'red'}; font-weight: bold`)
  }

  return { errors, warnings, ok, summary }
}
