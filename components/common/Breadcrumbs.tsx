import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Breadcrumb {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: Breadcrumb[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          {index > 0 && <ChevronRight className="w-4 h-4" />}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-primary transition-colors underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
