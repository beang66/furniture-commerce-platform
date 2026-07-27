'use client'

import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'
import { Modal } from '@/components/modal'
import { formatKRW, STYLES, type Product } from '@/lib/products'

type QuickViewDialogProps = {
  product: Product | null
  onClose: () => void
  onDetail: (id: string) => void
}

export function QuickViewDialog({ product, onClose, onDetail }: QuickViewDialogProps) {
  return (
    <Modal open={Boolean(product)} onClose={onClose} title="퀵 뷰">
      {product && (
        <div className="flex flex-col gap-5">
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg bg-secondary">
            <Image
              src={product.image || '/placeholder.svg'}
              alt={`${product.name} 제품 이미지`}
              fill
              sizes="(min-width: 640px) 512px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {product.brand} · {product.designer}
            </span>
            <h3 className="font-serif text-xl text-card-foreground text-pretty">{product.name}</h3>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3 fill-accent text-accent" />
              {product.rating.toFixed(1)} ({product.reviews})
              <span className="mx-1 text-border">|</span>
              {STYLES.find((s) => s.id === product.style)?.label}
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          </div>

          <dl className="grid grid-cols-2 gap-3 rounded-lg bg-secondary/60 p-4 text-xs">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground">규격 (W×D×H)</dt>
              <dd className="font-medium text-foreground">
                {product.dimensions.w} × {product.dimensions.d} × {product.dimensions.h} mm
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground">주요 소재</dt>
              <dd className="font-medium text-foreground">{product.materials.join(', ')}</dd>
            </div>
          </dl>

          <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
            <span className="text-lg font-semibold text-card-foreground">
              {formatKRW(product.price)}
            </span>
            <button
              type="button"
              onClick={() => onDetail(product.id)}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              상세 페이지로
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}
