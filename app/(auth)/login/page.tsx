'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles, Shield, Truck, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/lib/store/userStore'

export default function LoginPage() {
  const router = useRouter()
  const login = useUserStore((state) => state.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Por favor, preencha todos os campos')
      return
    }

    if (!email.includes('@')) {
      setError('Por favor, insira um e-mail válido')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    setLoading(true)
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Mock login - any valid email/password works
    const name = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
    login(email, name)
    router.push('/minha-conta')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md animate-fade-in">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
              <span className="text-white font-bold text-xl">B+</span>
            </div>
            <div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                BARATO D+
              </h1>
              <p className="text-xs text-muted-foreground">Eletrônicos & Eletro</p>
            </div>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Bem-vindo de volta!
            </h2>
            <p className="text-muted-foreground">
              Entre na sua conta para continuar comprando
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-scale-in">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full"></span>
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-muted/50 border-muted focus:bg-white transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 bg-muted/50 border-muted focus:bg-white transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-border accent-primary" 
                />
                <span className="text-sm text-muted-foreground">Lembrar-me</span>
              </label>
              <Link 
                href="/recuperar-senha" 
                className="text-sm text-primary font-medium hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-primary/90 font-semibold text-base"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Entrar
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-sm text-muted-foreground">ou</span>
            </div>
          </div>

          {/* Sign Up */}
          <p className="text-center text-muted-foreground">
            Não tem uma conta?{' '}
            <Link href="/cadastro" className="text-primary font-semibold hover:underline">
              Criar conta grátis
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Promo */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-primary/95 to-secondary p-12 items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-white max-w-lg">
          <div className="mb-8">
            <Sparkles className="w-12 h-12 text-yellow-300 mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Ofertas exclusivas para membros
            </h2>
            <p className="text-white/80 text-lg">
              Cadastre-se e tenha acesso a descontos especiais, frete grátis e muito mais!
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">Frete Grátis</p>
                <p className="text-sm text-white/70">Em compras acima de R$ 299</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">6x Sem Juros</p>
                <p className="text-sm text-white/70">Parcele suas compras</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">Compra Segura</p>
                <p className="text-sm text-white/70">Seus dados protegidos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
