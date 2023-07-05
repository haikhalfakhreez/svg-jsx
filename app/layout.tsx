import '@/styles/globals.css'
import { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { inter, robotoMono } from '@/lib/fonts'
import { Providers } from './providers'

const title = 'SVG-JSX'
const description = 'Convert SVG to React component'
const url = 'https://svg-jsx.vercel.app'

export const metadata: Metadata = {
  title,
  description,
  authors: [
    {
      name: '@ekaliacid',
      url: 'https://haikhalfakhreez.com',
    },
  ],
  creator: '@ekaliacid',
  themeColor: '#fff',
  icons: '/favicon.ico',
  openGraph: {
    title,
    description,
    url,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@ekaliacid',
  },
  metadataBase: new URL(url),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(robotoMono.variable, inter.variable, 'font-default antialiased')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
