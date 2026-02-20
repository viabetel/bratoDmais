'use client'

import { PackageX, AlertCircle } from 'lucide-react'
import Link from 'next/link'

<<<<<<< HEAD
interface EmptyStateProps {
  title?: string
  description?: string
  action?: { label: string; href: string }
}

export function EmptyState({
  title = 'Nenhum produto encontrado',
  description = 'Tente ajustar os filtros ou buscar por outro termo',
  action,
}: EmptyStateProps) {
=======
export function EmptyState({
  title = 'Nenhum produto encontrado',
  description = 'Tente ajustar os filtros ou buscar por outro termo',
  action?: { label: string; href: string }
}) {
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
  return (
    <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
      <PackageX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <Link href={action.href}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg transition-all">
            {action.label}
          </button>
        </Link>
      )}
    </div>
  )
}

<<<<<<< HEAD
interface ErrorStateProps {
  title?: string
  description?: string
  action?: { label: string; onClick: () => void }
}

export function ErrorState({
  title = 'Oops! Algo deu errado',
  description = 'Tente recarregar a página ou voltar mais tarde',
  action,
}: ErrorStateProps) {
=======
export function ErrorState({
  title = 'Oops! Algo deu errado',
  description = 'Tente recarregar a página ou voltar mais tarde',
  action?: { label: string; onClick: () => void }
}) {
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
  return (
    <div className="text-center py-16 bg-red-50 border border-red-200 rounded-xl">
      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-red-900 mb-2">{title}</h3>
      <p className="text-red-700 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg transition-all"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
