'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border mt-16">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Barato D+</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Sua loja online de confiança com os melhores preços em eletrodomésticos e eletrônicos.
            </p>
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>1234-5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contato@baratodmais.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Rua Principal, 123 - SP</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/busca" className="text-muted-foreground hover:text-primary transition">
                  Todos os Produtos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Promoções
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Rastreamento
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Devoluções
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Direitos do Consumidor
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {currentYear} Barato D+. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <span>Segurança:</span>
              <span>🔒 SSL Seguro</span>
              <span>✓ Compra Protegida</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
