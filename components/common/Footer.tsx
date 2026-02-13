import Link from 'next/link'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube, 
  CreditCard,
  Truck,
  Shield,
  Clock,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-200">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">
                Receba nossas ofertas exclusivas
              </h3>
              <p className="text-slate-400 text-sm">
                Cadastre-se e ganhe 10% de desconto na primeira compra
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="flex-1 md:w-72 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 outline-none focus:border-primary transition-colors"
              />
              <Button className="bg-primary hover:bg-primary/90 px-6 font-semibold">
                Inscrever
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">B+</span>
              </div>
              <div>
                <h4 className="font-bold text-lg text-white">BARATO D+</h4>
                <p className="text-xs text-slate-400">Eletrônicos & Eletro</p>
              </div>
            </Link>
            <p className="text-slate-400 text-sm mb-6 max-w-sm">
              Sua loja de eletrodomésticos e eletrônicos com os melhores preços, 
              garantia em todos os produtos e atendimento de qualidade.
            </p>
            <div className="space-y-2">
              <a href="tel:08001234567" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                <span>0800 123 4567</span>
              </a>
              <a href="mailto:contato@baratod.com" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                <span>contato@baratod.com</span>
              </a>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span>Seg a Sex: 8h às 18h</span>
              </div>
            </div>
          </div>

          {/* Shopping */}
          <div>
            <h5 className="font-bold text-white mb-4">Compre</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/c/eletrodomesticos" className="text-slate-400 hover:text-primary transition-colors">
                  Eletrodomésticos
                </Link>
              </li>
              <li>
                <Link href="/c/eletronicos" className="text-slate-400 hover:text-primary transition-colors">
                  Eletrônicos
                </Link>
              </li>
              <li>
                <Link href="/c/tvs" className="text-slate-400 hover:text-primary transition-colors">
                  TVs
                </Link>
              </li>
              <li>
                <Link href="/c/notebooks" className="text-slate-400 hover:text-primary transition-colors">
                  Notebooks
                </Link>
              </li>
              <li>
                <Link href="/busca?sort=discount" className="text-slate-400 hover:text-primary transition-colors">
                  Ofertas
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h5 className="font-bold text-white mb-4">Ajuda</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/empresa" className="text-slate-400 hover:text-primary transition-colors">
                  Como Comprar
                </Link>
              </li>
              <li>
                <Link href="/empresa" className="text-slate-400 hover:text-primary transition-colors">
                  Entregas
                </Link>
              </li>
              <li>
                <Link href="/empresa" className="text-slate-400 hover:text-primary transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/empresa" className="text-slate-400 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/empresa" className="text-slate-400 hover:text-primary transition-colors">
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h5 className="font-bold text-white mb-4">Institucional</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/empresa" className="text-slate-400 hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/empresa" className="text-slate-400 hover:text-primary transition-colors">
                  Privacidade & LGPD
                </Link>
              </li>
              <li>
                <Link href="/empresa" className="text-slate-400 hover:text-primary transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/empresa" className="text-slate-400 hover:text-primary transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
            <Truck className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm font-semibold text-white">Frete Grátis</p>
              <p className="text-xs text-slate-400">Acima de R$ 299</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
            <Shield className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm font-semibold text-white">Compra Segura</p>
              <p className="text-xs text-slate-400">SSL 256-bit</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
            <CreditCard className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm font-semibold text-white">Parcelamento</p>
              <p className="text-xs text-slate-400">6x sem juros</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">PIX</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Pix</p>
              <p className="text-xs text-slate-400">10% de desconto</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 text-center md:text-left">
              © {currentYear} BARATO D+. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-500 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
