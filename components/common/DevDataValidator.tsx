'use client'

import { useEffect } from 'react'

export function DevDataValidator() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    // Importação dinâmica para não impactar bundle de produção
    import('@/lib/utils/validateData').then(({ validateDataIntegrity }) => {
      validateDataIntegrity()
    })
  }, [])

  return null
}
