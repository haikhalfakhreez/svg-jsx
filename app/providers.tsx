'use client'

import { Analytics } from '@vercel/analytics/react'
import { Toaster } from '@/components/ui/toaster'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
      <Analytics />
    </>
  )
}
