'use client'

import { ArrowUpDown, TrendingUp, Star, DollarSign } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SortDropdownProps {
  value: string
  onChange: (value: string) => void
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">
            <div className="flex items-center gap-2">
              <span>Relevância</span>
            </div>
          </SelectItem>
          <SelectItem value="newest">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Mais Novos</span>
            </div>
          </SelectItem>
          <SelectItem value="price-asc">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>Menor Preço</span>
            </div>
          </SelectItem>
          <SelectItem value="price-desc">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>Maior Preço</span>
            </div>
          </SelectItem>
          <SelectItem value="rating">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>Mais Avaliados</span>
            </div>
          </SelectItem>
          <SelectItem value="popular">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Mais Populares</span>
            </div>
          </SelectItem>
          <SelectItem value="discount">
            <div className="flex items-center gap-2">
              <span>Maior Desconto</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
