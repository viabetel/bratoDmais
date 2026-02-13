'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/lib/store/userStore'

export default function CadastroPage() {
  const router = useRouter()
  const login = useUserStore((state) => state.login)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos')
      return
    }

    if (!email.includes('@')) {
      setError('Email inválido')
      return
    }

    if (password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não conferem')
      return
    }

    // Mock register & auto-login
    login(email, name)
    router.push('/minha-conta')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted to-muted/50 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <Link href="/" className="inline-block">
              <div className="w-12 h-12 bg-primary rounded flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold text-lg">⚡</span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold">Criar Conta</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Junte-se à BARATO D+ agora
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary text-primary-foreground"
              size="lg"
            >
              Criar Conta
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* Sign In */}
          <p className="text-center text-sm text-muted-foreground">
            Já tem conta?{' '}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
