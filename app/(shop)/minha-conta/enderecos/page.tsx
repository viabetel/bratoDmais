'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Edit2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAddressStore } from '@/lib/store/addressStore'
import { useUserStore } from '@/lib/store/userStore'

export default function EnderecosPage() {
  const router = useRouter()
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)
  const addresses = useAddressStore((state) => state.addresses)
  const deleteAddress = useAddressStore((state) => state.deleteAddress)
  const setDefaultAddress = useAddressStore((state) => state.setDefaultAddress)

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
  })

  if (!isLoggedIn) {
    router.push('/login')
    return null
  }

  const handleAddAddress = () => {
    const { addAddress } = useAddressStore.getState()
    addAddress({
      ...formData,
      isDefault: addresses.length === 0,
    })
    setFormData({
      name: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
    })
    setShowForm(false)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/minha-conta">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Meus Endereços</h1>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Endereço
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="font-bold mb-4">Adicionar Novo Endereço</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              placeholder="Nome do endereço (ex: Casa)"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-3 py-2 border border-border rounded"
            />
            <input
              placeholder="Rua"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              className="px-3 py-2 border border-border rounded"
            />
            <input
              placeholder="Número"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              className="px-3 py-2 border border-border rounded"
            />
            <input
              placeholder="Complemento (opcional)"
              value={formData.complement}
              onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
              className="px-3 py-2 border border-border rounded"
            />
            <input
              placeholder="Bairro"
              value={formData.neighborhood}
              onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
              className="px-3 py-2 border border-border rounded"
            />
            <input
              placeholder="Cidade"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="px-3 py-2 border border-border rounded"
            />
            <input
              placeholder="Estado (ex: SP)"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="px-3 py-2 border border-border rounded"
            />
            <input
              placeholder="CEP"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              className="px-3 py-2 border border-border rounded"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddAddress} className="bg-primary hover:bg-primary text-primary-foreground">
              Salvar
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Addresses List */}
      {addresses.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">Nenhum endereço cadastrado</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-card border-2 rounded-lg p-6 hover:shadow-lg transition-all"
              style={{ borderColor: addr.isDefault ? 'var(--color-primary)' : 'var(--color-border)' }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg">{addr.name}</h3>
                {addr.isDefault && (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                    Endereço Padrão
                  </span>
                )}
              </div>
              <p className="text-sm mb-3">
                {addr.street}, {addr.number}
                {addr.complement && ` - ${addr.complement}`}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {addr.neighborhood} - {addr.city}, {addr.state} {addr.zipCode}
              </p>
              <div className="flex gap-2">
                {!addr.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDefaultAddress(addr.id)}
                  >
                    Definir como Padrão
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => deleteAddress(addr.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
