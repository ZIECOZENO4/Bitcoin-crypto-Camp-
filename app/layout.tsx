import { Provider } from '@/components/providers'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bitcoin & Cypto Blog',
  description: 'this is the official crypto camp blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Provider>
          <body className={inter.className}>{children}</body>    
      </Provider>
    </html>
  )
}
