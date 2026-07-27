import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'

const _inter = Inter({ subsets: ['latin'] })
const _fraunces = Fraunces({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InteriorCommerce — 공간 큐레이션 가구 스토어',
  description:
    '미니멀 우드, 미드센추리 모던, 빈티지 가구를 공간별로 큐레이션합니다. 실측 규격과 3D 공간 배치 시뮬레이션으로 실패 없는 가구 쇼핑.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f6f2',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
