'use client'

import { ShoppingBag, Search, Menu } from 'lucide-react'

type SiteHeaderProps = {
  cartCount: number
  onHome: () => void
  onCart: () => void
}

export function SiteHeader({ cartCount, onHome, onCart }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6">
        <button
          type="button"
          onClick={onHome}
          className="flex items-center gap-2 text-left"
          aria-label="Interior Commerce 홈으로 이동"
        >
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-serif text-sm">
            IC
          </span>
          <span className="font-serif text-base leading-none tracking-tight sm:text-lg">
            Interior<span className="text-primary">Commerce</span>
          </span>
        </button>

        <nav aria-label="주요 메뉴" className="ml-6 hidden items-center gap-6 md:flex">
          {['신규 컬렉션', '공간별', '스타일', '3D 시뮬레이터'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={onHome}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            aria-label="검색"
            className="hidden rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:inline-flex"
          >
            <Search className="size-5" />
          </button>
          <button
            type="button"
            onClick={onCart}
            className="relative rounded-md p-2 text-foreground transition-colors hover:bg-secondary"
            aria-label={`장바구니, ${cartCount}개 상품`}
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label="메뉴"
            onClick={onHome}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
