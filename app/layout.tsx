import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Financial Dashboard',
  description: 'Next.js 14 Financial Dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-dvh flex flex-col">
            <Navbar />
            <main className="container py-6 flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
