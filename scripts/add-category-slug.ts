import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'products.ts')
let content = fs.readFileSync(filePath, 'utf-8')

// Replace all products that don't have categorySlug yet
// Pattern: category: 'xxx', followed by price or rating (should have categorySlug in between)

const patterns = [
  { from: /category: ('geladeiras'|'fogoes'|'micro-ondas'|'maquinas-lavar'|'ar-condicionado'|'ventiladores'|'smartphones'|'eletronicos'|'perifericos'|'componentes'|'acessorios'|'tvs'|'notebooks'),\n\s+price:/, replacement: (match, cat) => `category: ${cat},\n    categorySlug: ${cat},\n    price:` },
]

for (const pattern of patterns) {
  content = content.replace(new RegExp(pattern.from, 'g'), pattern.replacement)
}

fs.writeFileSync(filePath, content, 'utf-8')
console.log('[v0] Updated products.ts with categorySlug fields')
