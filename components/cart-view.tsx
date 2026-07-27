'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, Check, Minus, Plus, ShoppingBag, Trash2, Truck } from 'lucide-react'
import { Modal } from '@/components/modal'
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, type CartItem } from '@/lib/cart'
import { formatKRW, getProduct } from '@/lib/products'
import { cn } from '@/lib/utils'

type CartViewProps = {
  items: CartItem[]
  onBack: () => void
  onUpdateQuantity: (key: string, quantity: number) => void
  onRemove: (key: string) => void
  onClear: () => void
}

const PAYMENTS = [
  { id: 'card', label: '신용 · 체크카드' },
  { id: 'transfer', label: '무이자 할부 / 계좌이체' },
  { id: 'easy', label: '간편결제' },
]

export function CartView({ items, onBack, onUpdateQuantity, onRemove, onClear }: CartViewProps) {
  const [form, setForm] = useState({ name: '', address: '', phone: '', payment: 'card' })
  const [submitted, setSubmitted] = useState(false)

  const detailed = items
    .map((item) => {
      const product = getProduct(item.productId)
      if (!product) return null
      const option = product.options.find((o) => o.id === item.optionId) ?? product.options[0]
      return { item, product, option, lineTotal: (product.price + option.extra) * item.quantity }
    })
    .filter((row): row is NonNullable<typeof row> => row !== null)

  const subtotal = detailed.reduce((sum, row) => sum + row.lineTotal, 0)
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const total = subtotal + delivery
  const formValid = form.name.trim() && form.address.trim() && form.phone.trim()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formValid || detailed.length === 0) return
    setSubmitted(true)
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        쇼핑 계속하기
      </button>

      <h1 className="mt-6 font-serif text-3xl text-foreground sm:text-4xl">장바구니 &amp; 주문</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        선택한 가구 {detailed.length}종 &middot; 가구 전문 기사 방문 설치 포함
      </p>

      {detailed.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-20 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
            <ShoppingBag className="size-5" />
          </span>
          <p className="text-sm font-medium text-foreground">장바구니가 비어 있습니다</p>
          <p className="text-xs text-muted-foreground">컬렉션에서 마음에 드는 가구를 담아보세요.</p>
          <button
            type="button"
            onClick={onBack}
            className="mt-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            컬렉션 보기
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-10">
          {/* Items + form */}
          <div className="flex flex-col gap-8">
            <ul className="flex flex-col divide-y divide-border border-y border-border">
              {detailed.map(({ item, product, option, lineTotal }) => (
                <li key={item.key} className="flex gap-4 py-5">
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-secondary sm:size-28">
                    <Image
                      src={product.image || '/placeholder.svg'}
                      alt={`${product.name} 제품 이미지`}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {product.brand}
                    </span>
                    <span className="text-sm font-medium leading-snug text-foreground text-pretty">
                      {product.name}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span
                        className="size-3 rounded-full border border-border"
                        style={{ backgroundColor: option.swatch }}
                        aria-hidden="true"
                      />
                      {option.label}
                    </span>

                    <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.key, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label={`${product.name} 수량 줄이기`}
                          className="rounded-md border border-border p-1.5 text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-8 text-center text-sm text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.key, item.quantity + 1)}
                          aria-label={`${product.name} 수량 늘리기`}
                          className="rounded-md border border-border p-1.5 text-foreground transition-colors hover:bg-secondary"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {formatKRW(lineTotal)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemove(item.key)}
                    aria-label={`${product.name} 삭제`}
                    className="h-fit rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Checkout form */}
            <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h2 className="font-serif text-xl text-foreground">주문 정보</h2>
                <p className="text-xs text-muted-foreground">
                  배송 일정은 입력하신 연락처로 해피콜 후 확정됩니다.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-xs">
                  <span className="font-medium text-foreground">주문자명</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="홍길동"
                    className="rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-xs">
                  <span className="font-medium text-foreground">연락처 (해피콜)</span>
                  <input
                    required
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="010-0000-0000"
                    className="rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-xs sm:col-span-2">
                  <span className="font-medium text-foreground">배송 주소</span>
                  <input
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="서울시 성동구 성수이로 10, 3층"
                    className="rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
                  />
                </label>
              </div>

              <fieldset className="flex flex-col gap-2">
                <legend className="mb-1 text-xs font-medium text-foreground">결제 수단</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {PAYMENTS.map((p) => (
                    <label
                      key={p.id}
                      className={cn(
                        'flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 text-xs transition-colors',
                        form.payment === p.id
                          ? 'border-primary bg-secondary text-foreground'
                          : 'border-border bg-card text-muted-foreground hover:border-primary/40',
                      )}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={p.id}
                        checked={form.payment === p.id}
                        onChange={() => setForm({ ...form, payment: p.id })}
                        className="accent-primary"
                      />
                      {p.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            </form>
          </div>

          {/* Order summary */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
              <h2 className="font-serif text-lg text-card-foreground">주문 요약</h2>

              <dl className="flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">상품 소계</dt>
                  <dd className="text-card-foreground">{formatKRW(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1.5 text-muted-foreground">
                    <Truck className="size-4" />
                    배송 · 설치비
                  </dt>
                  <dd className="text-card-foreground">
                    {delivery === 0 ? '무료' : formatKRW(delivery)}
                  </dd>
                </div>
              </dl>

              {delivery > 0 && (
                <p className="rounded-md bg-secondary/70 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
                  {formatKRW(FREE_DELIVERY_THRESHOLD - subtotal)} 더 담으면 배송 · 설치비가
                  무료입니다.
                </p>
              )}

              <div className="flex items-baseline justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">최종 결제 금액</span>
                <span className="text-xl font-semibold text-card-foreground">
                  {formatKRW(total)}
                </span>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={!formValid}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
              >
                주문 완료
              </button>
              {!formValid && (
                <p className="text-center text-[11px] text-muted-foreground">
                  주문자명 · 연락처 · 주소를 입력해주세요.
                </p>
              )}
            </div>
          </aside>
        </div>
      )}

      <Modal open={submitted} onClose={() => setSubmitted(false)} title="주문 완료">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
            <Check className="size-6" />
          </span>
          <p className="font-serif text-xl text-card-foreground">주문이 접수되었습니다</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {form.name}님, 총 <span className="font-medium text-foreground">{formatKRW(total)}</span>{' '}
            결제가 예약되었습니다. 배송 일정 확정을 위해 {form.phone}로 해피콜을 드립니다.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false)
              onClear()
              onBack()
            }}
            className="mt-2 w-full rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            컬렉션으로 돌아가기
          </button>
        </div>
      </Modal>
    </div>
  )
}
