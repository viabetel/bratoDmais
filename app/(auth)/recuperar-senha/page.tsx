'use client'

import { useState } from 'react'
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.includes('@')) {
      setSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted to-muted/50 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="text-center">
                <Link href="/" className="inline-block">
                  <div className="w-12 h-12 bg-primary rounded flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-foreground font-bold text-lg">⚡</span>
                  </div>
                </Link>
                <h1 className="text-2xl font-bold">Recuperar Senha</h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Digite seu email para receber um link de recuperação
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
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

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary text-primary-foreground"
                  size="lg"
                >
                  Enviar Link
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              {/* Back to Login */}
              <div className="text-center">
                <Link href="/login" className="text-primary hover:underline text-sm inline-flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar ao Login
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Success */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-3xl">✓</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Email Enviado!</h1>
                  <p className="text-sm text-muted-foreground mt-2">
                    Enviamos um link de recuperação para <strong>{email}</strong>
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Verifique sua caixa de entrada e spam se não encontrar o email em alguns minutos.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link href="/login" className="block">
                  <Button className="w-full bg-primary hover:bg-primary text-primary-foreground" size="lg">
                    Voltar ao Login
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
