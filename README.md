# furniture-commerce-platform

> **README 구조 개편:** 2026-11-16 · 기존 설명·명령·이미지·원저작자 표기를 보존하고, 제품·의사결정·검증 기준으로 재배열했습니다. **이번 작업에서는 앱이나 테스트를 재실행하지 않았습니다.** 기재된 성과는 원본 README의 주장입니다.

**읽는 순서:** 0~2 제품 설명 → 3~4 설계 판단 → 5~8 실행·검증·권리 → 9 다음 단계.

## 0. 30초 요약·실행 상태

<div align="center">
  <h1 align="center">
    가구 커머스 플랫폼
    <br />
    <br />
    <img src="docs/screenshots/home.png" alt="InteriorCommerce 메인 화면" width="880">
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

### Introduction

**InteriorCommerce**는 공간 · 스타일별로 가구를 고르고, 실측 규격을 확인한 뒤 옵션을 골라 장바구니에 담는 흐름을 만든 가구 커머스 프로토타입입니다. v0로 화면을 만들고 Vercel로 배포했습니다.

- **공간 · 스타일로 고르기**

> 가구 7종을 거실 · 주방 같은 공간과 미니멀 우드 · 미드센추리 같은 스타일로 나눠 보여 줍니다.

- **실측 규격을 먼저 보여 주기**

> 모든 가구의 W/D/H를 mm 단위로 보여 줘, 우리 집에 들어가는지 먼저 확인하게 했습니다.

- **옵션별 장바구니**

> 같은 상품도 옵션이 다르면 따로 담고, 수량은 1–9개로 제한합니다. 목록에서 빠른 보기로 상세 화면을 열지 않고 미리 봅니다.

## 1. 사용자 문제·프로젝트 목표

> **확인 필요:** 누가 어떤 문제를 겪는지, 사용자 인터뷰·관찰·분석 근거 또는 명시적 가설을 기록.

## 2. 핵심 사용 흐름·기능

### 화면

| 상품 상세 | 장바구니 · 주문 정보 |
| --- | --- |
| <img src="docs/screenshots/detail.png" alt="상품 상세 화면: 규격, 옵션, 수량" width="430"> | <img src="docs/screenshots/cart.png" alt="장바구니와 주문 정보 화면" width="430"> |

| 모바일 |
| --- |
| <img src="docs/screenshots/mobile.png" alt="모바일 메인 화면" width="240"> |

## 3. 시스템 구조·데이터·기술

### 기술 스택

| 구분 | 기술 |
| --- | --- |
| 프레임워크 | Next.js 16 (App Router), React 19, TypeScript |
| UI | Tailwind CSS 4, shadcn/ui · Base UI, lucide-react |
| 배포 · 분석 | Vercel, Vercel Analytics |

### 구조

```text
app/          layout · page (홈 / 상세 / 장바구니 화면 전환)
components/   home-view · product-detail-view · cart-view · quick-view-dialog · site-header · ui
lib/          products (상품 · 옵션 데이터) · cart
```

## 4. 핵심 의사결정·대안

### 제작 방식

v0로 화면과 컴포넌트를 만들고, 이 저장소와 연결해 `main`에 병합될 때마다 Vercel에 자동 배포했습니다.

## 5. 설치·실행·배포

### Installation

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build
```

## 6. 검증·측정 결과

### Status

결제와 회원 기능이 없는 화면 프로토타입입니다. 상품 데이터는 예시이고, 3D 공간 배치 시뮬레이터는 미리보기 이미지를 띄우는 화면 목업입니다.

## 7. 담당 역할·협업

### Author

안정빈 — 기획 · v0 기반 구현 (개인)

## 8. 한계·보안·라이선스

> **확인 필요:** 실행/보안/개인정보/데이터·이미지·소스 라이선스 및 미완료 범위를 확인.

## 9. 다음 단계·참고 문서

> **확인 필요:** 다음 작업 1~3개와 완료 기준, 실제 존재하는 추가 문서 링크를 기록.

---

> 표준: [Vault README 가이드](https://github.com/beang66/Vault/blob/main/wiki/concepts/GitHub%20README%20%EA%B0%80%EC%9D%B4%EB%93%9C%20%E2%80%94%20%EC%A0%9C%ED%92%88%C2%B7%EC%9D%98%EC%82%AC%EA%B2%B0%EC%A0%95%C2%B7%EA%B2%80%EC%A6%9D.md). 확인 필요는 구현 완료를 의미하지 않습니다.
