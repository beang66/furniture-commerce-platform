'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowLeft,
  Box,
  Check,
  Lightbulb,
  Minus,
  Plus,
  Ruler,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react'
import { Modal } from '@/components/modal'
import { formatKRW, ROOM_SCENES, SPACES, STYLES, type Product } from '@/lib/products'
import { cn } from '@/lib/utils'

type ProductDetailViewProps = {
  product: Product
  onBack: () => void
  onAddToCart: (productId: string, optionId: string, quantity: number) => void
  onGoToCart: () => void
}

export function ProductDetailView({
  product,
  onBack,
  onAddToCart,
  onGoToCart,
}: ProductDetailViewProps) {
  const [optionId, setOptionId] = useState(product.options[0].id)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [simulatorOpen, setSimulatorOpen] = useState(false)
  const [activeImage, setActiveImage] = useState<'product' | 'room'>('product')

  const option = product.options.find((o) => o.id === optionId) ?? product.options[0]
  const unitPrice = product.price + option.extra
  const roomImage = ROOM_SCENES[product.space]
  const spaceLabel = SPACES.find((s) => s.id === product.space)?.label
  const styleLabel = STYLES.find((s) => s.id === product.style)?.label

  const handleAdd = () => {
    onAddToCart(product.id, optionId, quantity)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        컬렉션으로 돌아가기
      </button>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left: imagery */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-secondary">
            <Image
              src={(activeImage === 'product' ? product.image : roomImage) || '/placeholder.svg'}
              alt={
                activeImage === 'product'
                  ? `${product.name} 제품 이미지`
                  : `${product.name}의 ${spaceLabel} 공간 매칭 예시`
              }
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => setSimulatorOpen(true)}
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-md bg-card/90 px-3 py-2 text-xs font-medium text-card-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-card"
            >
              <Box className="size-3.5" />
              3D로 보기
            </button>
          </div>

          <div className="flex gap-3">
            {(
              [
                { key: 'product' as const, src: product.image, label: '제품 컷' },
                { key: 'room' as const, src: roomImage, label: `${spaceLabel} 매칭 컷` },
              ]
            ).map((thumb) => (
              <button
                key={thumb.key}
                type="button"
                onClick={() => setActiveImage(thumb.key)}
                aria-pressed={activeImage === thumb.key}
                className={cn(
                  'relative aspect-4/3 w-28 overflow-hidden rounded-lg border-2 bg-secondary transition-colors sm:w-32',
                  activeImage === thumb.key ? 'border-primary' : 'border-transparent',
                )}
              >
                <Image
                  src={thumb.src || '/placeholder.svg'}
                  alt={thumb.label}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: info */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-secondary-foreground">
              {spaceLabel}
            </span>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-secondary-foreground">
              {styleLabel}
            </span>
          </div>

          <span className="mt-4 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {product.brand} &middot; Design by {product.designer}
          </span>
          <h1 className="mt-2 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 text-foreground">
              <Star className="size-4 fill-accent text-accent" />
              {product.rating.toFixed(1)}
            </span>
            <span>리뷰 {product.reviews}개</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-foreground">{formatKRW(unitPrice)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatKRW(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Meta */}
          <dl className="mt-6 divide-y divide-border border-y border-border text-sm">
            <div className="flex gap-4 py-3">
              <dt className="w-24 shrink-0 text-muted-foreground">주요 소재</dt>
              <dd className="text-foreground">{product.materials.join(' · ')}</dd>
            </div>
            <div className="flex gap-4 py-3">
              <dt className="w-24 shrink-0 text-muted-foreground">규격</dt>
              <dd className="flex items-center gap-1.5 text-foreground">
                <Ruler className="size-4 text-primary" />
                {product.dimensions.w} × {product.dimensions.d} × {product.dimensions.h} mm
              </dd>
            </div>
            <div className="flex gap-4 py-3">
              <dt className="w-24 shrink-0 text-muted-foreground">배송</dt>
              <dd className="flex items-center gap-1.5 text-foreground">
                <Truck className="size-4 text-primary" />
                가구 전문 배송 · 방문 설치 (평균 5~7일)
              </dd>
            </div>
          </dl>

          {/* Styling tip */}
          <div className="mt-6 flex gap-3 rounded-lg border border-accent/50 bg-accent/25 p-4">
            <Lightbulb className="mt-0.5 size-4 shrink-0 text-accent-foreground" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-accent-foreground">공간 스타일링 팁</span>
              <p className="text-xs leading-relaxed text-accent-foreground/85">
                {product.stylingTip}
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="mt-7 flex flex-col gap-3">
            <span className="text-xs font-medium text-foreground">
              컬러 / 소재 <span className="text-muted-foreground">— {option.label}</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {product.options.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setOptionId(o.id)}
                  aria-pressed={optionId === o.id}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs transition-colors',
                    optionId === o.id
                      ? 'border-primary bg-secondary text-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/40',
                  )}
                >
                  <span
                    className="size-4 rounded-full border border-border"
                    style={{ backgroundColor: o.swatch }}
                    aria-hidden="true"
                  />
                  {o.label}
                  {o.extra > 0 && (
                    <span className="text-muted-foreground">+{(o.extra / 10000).toFixed(0)}만</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6 flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-3">
            <span className="text-xs font-medium text-card-foreground">수량</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="수량 줄이기"
                className="rounded-md border border-border p-1.5 text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-10 text-center text-sm font-medium text-foreground" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(9, q + 1))}
                aria-label="수량 늘리기"
                className="rounded-md border border-border p-1.5 text-foreground transition-colors hover:bg-secondary"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">총 상품 금액</span>
            <span className="text-lg font-semibold text-foreground">
              {formatKRW(unitPrice * quantity)}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={handleAdd}
              className={cn(
                'inline-flex flex-1 items-center justify-center gap-2 rounded-md px-5 py-3.5 text-sm font-medium transition-colors',
                added
                  ? 'bg-secondary text-primary'
                  : 'bg-primary text-primary-foreground hover:opacity-90',
              )}
            >
              {added ? (
                <>
                  <Check className="size-4" />
                  장바구니에 담았습니다
                </>
              ) : (
                <>
                  <ShoppingBag className="size-4" />
                  장바구니 담기
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setSimulatorOpen(true)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-primary/40 bg-card px-5 py-3.5 text-sm font-medium text-primary transition-colors hover:bg-secondary"
            >
              <Box className="size-4" />
              3D 공간 배치해보기
            </button>
          </div>

          {added && (
            <button
              type="button"
              onClick={onGoToCart}
              className="mt-3 text-xs text-primary underline underline-offset-4"
            >
              장바구니로 이동하기
            </button>
          )}
        </div>
      </div>

      {/* 3D simulator modal */}
      <Modal
        open={simulatorOpen}
        onClose={() => setSimulatorOpen(false)}
        title="3D 공간 배치 시뮬레이터"
        className="sm:max-w-2xl"
      >
        <div className="flex flex-col gap-4">
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg bg-secondary">
            <Image
              src={roomImage || '/placeholder.svg'}
              alt={`${spaceLabel} 3D 배치 시뮬레이션 미리보기`}
              fill
              sizes="(min-width: 640px) 672px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-foreground/25" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
              <span className="flex size-11 items-center justify-center rounded-full bg-card/90 text-primary">
                <Box className="size-5" />
              </span>
              <span className="text-sm font-medium text-primary-foreground">
                {product.name} 배치 미리보기
              </span>
              <span className="text-xs text-primary-foreground/80">
                {product.dimensions.w} × {product.dimensions.d} mm 기준 자동 스케일
              </span>
            </div>
          </div>
          <ol className="flex flex-col gap-2 text-xs leading-relaxed text-muted-foreground">
            <li>1. 우리 집 평면도를 업로드하거나 기본 {spaceLabel} 템플릿을 선택합니다.</li>
            <li>2. 실측 규격을 기준으로 가구가 자동 스케일되어 배치됩니다.</li>
            <li>3. 통로 폭과 벽 이격 거리를 확인한 뒤 그대로 주문할 수 있습니다.</li>
          </ol>
          <button
            type="button"
            onClick={() => setSimulatorOpen(false)}
            className="mt-1 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            확인
          </button>
        </div>
      </Modal>
    </div>
  )
}
