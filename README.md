<div align="center">
  <h1 align="center">
    가구 커머스 플랫폼
  </h1>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white" alt="Next.js 16">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4">
  <img src="https://img.shields.io/badge/shadcn/ui-components-000000" alt="shadcn/ui components">
  <img src="https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white" alt="Vercel deployed">
  <img src="https://img.shields.io/badge/built_with-v0-000000" alt="built with v0">
</p>

<p align="center"><a href="https://furniture-commerce-platform.vercel.app/">Live Demo</a></p>

## Introduction

리빙 가구 7종을 둘러보고, 옵션을 골라 장바구니에 담는 흐름을 만든 가구 커머스 프로토타입입니다. v0로 화면을 만들고 Vercel로 배포했습니다.

- **홈 · 상세 · 장바구니 세 화면**

> 한 페이지 안에서 홈, 상품 상세, 장바구니를 오가고, 화면이 바뀌면 맨 위로 돌아갑니다.

- **옵션별 장바구니**

> 같은 상품도 옵션이 다르면 따로 담고, 수량은 1–9개로 제한합니다.

- **빠른 보기**

> 목록에서 상세 화면으로 가지 않고 상품을 미리 봅니다.

## Installation

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build
```

## 구조

```text
app/          layout · page (홈 / 상세 / 장바구니 화면 전환)
components/   home-view · product-detail-view · cart-view · quick-view-dialog · site-header · ui
lib/          products (상품 · 옵션 데이터) · cart
```

## Status

결제와 회원 기능이 없는 화면 프로토타입입니다. 상품 데이터는 예시입니다.

## Author

안정빈 — 기획 · v0 기반 구현 (개인)
