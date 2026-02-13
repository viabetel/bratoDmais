'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/lib/store/userStore'

export default function DadosPage() {
  const router = useRouter()
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)
  const user = useUserStore((state) => state.user)
  const updateProfile = useUserStore((state) => state.updateProfile)

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })
  const [saved, setSaved] = useState(false)

  if (!isLoggedIn) {
    router.push('/login')
    return null
  }

  const handleSave = () => {
    updateProfile(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/minha-conta">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Dados Pessoais</h1>
      </div>

      <div className="bg-card border border-border rounded-lg p-8 space-y-6">
        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            ✓ Dados atualizados com sucesso!
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold mb-2">Nome Completo</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Telefone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(11) 99999-9999"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary text-primary-foreground"
          >
            Salvar Alterações
          </Button>
          <Link href="/minha-conta">
            <Button variant="outline">Cancelar</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
