'use client'

import { useCallback, useState } from 'react'
import { CartView } from '@/components/cart-view'
import { HomeView } from '@/components/home-view'
import { ProductDetailView } from '@/components/product-detail-view'
import { SiteHeader } from '@/components/site-header'
import type { CartItem } from '@/lib/cart'
import { getProduct } from '@/lib/products'

type View = { name: 'home' } | { name: 'detail'; productId: string } | { name: 'cart' }

export default function Page() {
  const [view, setView] = useState<View>({ name: 'home' })
  const [cart, setCart] = useState<CartItem[]>([])

  const goHome = useCallback(() => {
    setView({ name: 'home' })
    window.scrollTo({ top: 0 })
  }, [])

  const goCart = useCallback(() => {
    setView({ name: 'cart' })
    window.scrollTo({ top: 0 })
  }, [])

  const goDetail = useCallback((productId: string) => {
    setView({ name: 'detail', productId })
    window.scrollTo({ top: 0 })
  }, [])

  const addToCart = useCallback((productId: string, optionId: string, quantity: number) => {
    const key = `${productId}__${optionId}`
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: Math.min(9, i.quantity + quantity) } : i,
        )
      }
      return [...prev, { key, productId, optionId, quantity }]
    })
  }, [])

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity < 1) return
    setCart((prev) =>
      prev.map((i) => (i.key === key ? { ...i, quantity: Math.min(9, quantity) } : i)),
    )
  }, [])

  const removeItem = useCallback(
    (key: string) => setCart((prev) => prev.filter((i) => i.key !== key)),
    [],
  )

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)
  const detailProduct = view.name === 'detail' ? getProduct(view.productId) : undefined

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader cartCount={cartCount} onHome={goHome} onCart={goCart} />

      <main className="flex-1">
        {view.name === 'home' && <HomeView onSelectProduct={goDetail} />}
        {view.name === 'detail' && detailProduct && (
          <ProductDetailView
            product={detailProduct}
            onBack={goHome}
            onAddToCart={addToCart}
            onGoToCart={goCart}
          />
        )}
        {view.name === 'cart' && (
          <CartView
            items={cart}
            onBack={goHome}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
            onClear={() => setCart([])}
          />
        )}
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-10 sm:px-6">
          <span className="font-serif text-base text-card-foreground">
            Interior<span className="text-primary">Commerce</span>
          </span>
          <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
            공간의 감도를 높이는 가구 큐레이션 스토어. 실측 규격 데이터와 3D 배치 시뮬레이션으로
            실패 없는 가구 쇼핑을 제안합니다.
          </p>
          <p className="text-[11px] text-muted-foreground/80">
            © 2026 InteriorCommerce. 데모용 목업 데이터로 구성된 페이지입니다.
          </p>
        </div>
      </footer>
    </div>
  )
}
