import { notFound } from 'next/navigation'
import { getCategoryBySlug, getCategoryPath } from '@/lib/utils/categories'
import { categories } from '@/data/categories'
import { CategoryPageContent } from './CategoryPageContent'

export async function generateStaticParams() {
  const params: { slug: string }[] = []

  categories.forEach((cat) => {
    params.push({ slug: cat.slug })
    if (cat.subcategories) {
      cat.subcategories.forEach((subcat) => {
        params.push({ slug: subcat.slug })
      })
    }
  })

  return params
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    return {
      title: 'Categoria não encontrada',
      description: 'A categoria que você está procurando não existe.',
    }
  }

  return {
    title: `${category.name} | Brato Mais`,
    description: category.description,
    openGraph: {
      title: `${category.name} | Brato Mais`,
      description: category.description,
      url: `https://bratomais.com/c/${params.slug}`,
    },
  }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  return <CategoryPageContent category={category} slug={params.slug} />
}
