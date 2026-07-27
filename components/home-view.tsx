'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { ArrowRight, Box, Leaf, Ruler, SlidersHorizontal } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { QuickViewDialog } from '@/components/quick-view-dialog'
import {
  PRODUCTS,
  SPACES,
  STYLES,
  type Product,
  type SpaceId,
  type StyleId,
} from '@/lib/products'
import { cn } from '@/lib/utils'

type HomeViewProps = {
  onSelectProduct: (id: string) => void
}

export function HomeView({ onSelectProduct }: HomeViewProps) {
  const [space, setSpace] = useState<SpaceId>('all')
  const [styles, setStyles] = useState<StyleId[]>([])
  const [quickView, setQuickView] = useState<Product | null>(null)

  const filtered = useMemo(
    () =>
      PRODUCTS.filter((p) => {
        const spaceOk = space === 'all' || p.space === space
        const styleOk = styles.length === 0 || styles.includes(p.style)
        return spaceOk && styleOk
      }),
    [space, styles],
  )

  const toggleStyle = (id: StyleId) =>
    setStyles((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[520px] w-full sm:h-[600px]">
          <Image
            src="/hero-living-room.png"
            alt="따뜻한 우드와 그린으로 큐레이션된 미니멀 거실"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-foreground/85 via-foreground/55 to-foreground/25 sm:bg-linear-to-r sm:from-foreground/80 sm:via-foreground/45 sm:to-foreground/10" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="max-w-xl lg:max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-primary-foreground backdrop-blur-sm">
                <Leaf className="size-3.5" />
                2026 Spring Curation
              </span>
              <h1 className="mt-5 font-serif text-4xl leading-[1.15] text-primary-foreground text-balance sm:text-5xl">
                우드와 그린이 머무는 공간, 미리 배치해 보세요
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
                실측 규격 기반 3D 공간 시뮬레이션으로 구매 전에 우리 집에 놓아봅니다. 큐레이터가
                고른 미니멀 우드 &middot; 미드센추리 &middot; 빈티지 가구를 한곳에서.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#collection"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  컬렉션 보기
                  <ArrowRight className="size-4" />
                </a>
                <span className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-5 py-3 text-sm text-primary-foreground">
                  <Box className="size-4" />
                  3D 배치 시뮬레이션 무료
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value strip */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
          {[
            { icon: Ruler, title: '실측 규격 데이터', desc: '모든 가구의 W/D/H를 mm 단위로 제공' },
            { icon: Box, title: '3D 공간 배치', desc: '구매 전 우리 집 도면에 미리 배치' },
            { icon: Leaf, title: '전문 배송 · 설치', desc: '가구 전문 기사 방문 설치 및 폐기물 수거' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                <Icon className="size-4.5" />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-card-foreground">{title}</span>
                <span className="text-xs leading-relaxed text-muted-foreground">{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters + grid */}
      <section id="collection" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.18em] text-primary">Collection</span>
          <h2 className="font-serif text-2xl text-foreground sm:text-3xl">공간 큐레이션</h2>
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            공간과 스타일을 조합해 우리 집에 맞는 가구만 골라 보세요.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-y border-border py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="w-16 shrink-0 text-xs font-medium text-muted-foreground">공간</span>
            <div className="flex flex-wrap gap-2">
              {SPACES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={space === s.id}
                  onClick={() => setSpace(s.id)}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-sm transition-colors',
                    space === s.id
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="w-16 shrink-0 text-xs font-medium text-muted-foreground">스타일</span>
            <div className="flex flex-wrap items-center gap-2">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={styles.includes(s.id)}
                  onClick={() => toggleStyle(s.id)}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-sm transition-colors',
                    styles.includes(s.id)
                      ? 'border-primary bg-secondary text-primary'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
                  )}
                >
                  {s.label}
                </button>
              ))}
              {(styles.length > 0 || space !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setStyles([])
                    setSpace('all')
                  }}
                  className="inline-flex items-center gap-1.5 px-2 py-1.5 text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  <SlidersHorizontal className="size-3.5" />
                  필터 초기화
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          총 <span className="font-medium text-foreground">{filtered.length}</span>개의 가구
        </p>

        {filtered.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-16 text-center">
            <p className="text-sm font-medium text-foreground">조건에 맞는 가구가 없습니다</p>
            <p className="text-xs text-muted-foreground">스타일 필터를 하나만 선택해 보세요.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-9 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={() => onSelectProduct(product.id)}
                onQuickView={() => setQuickView(product)}
              />
            ))}
          </div>
        )}
      </section>

      <QuickViewDialog
        product={quickView}
        onClose={() => setQuickView(null)}
        onDetail={(id) => {
          setQuickView(null)
          onSelectProduct(id)
        }}
      />
    </div>
  )
}
