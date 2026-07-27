'use client'

import Image from 'next/image'
import { Eye, Star } from 'lucide-react'
import { formatKRW, type Product } from '@/lib/products'

type ProductCardProps = {
  product: Product
  onSelect: () => void
  onQuickView: () => void
}

export function ProductCard({ product, onSelect, onQuickView }: ProductCardProps) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-secondary">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={`${product.name} 제품 이미지`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-medium tracking-wide text-primary-foreground">
            {product.badge}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 flex translate-y-2 flex-col gap-2 bg-linear-to-t from-foreground/55 to-transparent p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onQuickView}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-card/95 px-3 py-2 text-xs font-medium text-card-foreground transition-colors hover:bg-card"
            >
              <Eye className="size-3.5" />
              퀵 뷰
            </button>
            <button
              type="button"
              onClick={onSelect}
              className="inline-flex flex-1 items-center justify-center rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              상세 보기
            </button>
          </div>
        </div>
      </div>

      <button type="button" onClick={onSelect} className="mt-3 flex flex-col gap-1 text-left">
        <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {product.brand} · {product.designer}
        </span>
        <span className="text-sm font-medium leading-snug text-foreground text-pretty">
          {product.name}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3 fill-accent text-accent" />
          {product.rating.toFixed(1)}
          <span className="text-muted-foreground/70">({product.reviews})</span>
        </span>
        <span className="mt-0.5 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-foreground">{formatKRW(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatKRW(product.originalPrice)}
            </span>
          )}
        </span>
      </button>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {product.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[11px] text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}
