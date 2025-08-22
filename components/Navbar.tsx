'use client'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

const items = [
  'CRM','Utilities','Insurance','Assets','Mutual','Research','Transact Online','Goal GPS','Financial Planning','Wealth Report','Other'
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60 border-b border-black/5">
      <div className="container flex items-center gap-4 py-3">
        <Link href="/" className="font-semibold text-lg">Financial Dashboard</Link>
        <nav className="hidden md:flex flex-wrap items-center gap-4 ml-6 text-sm">
          {items.map(i => (
            <a key={i} className="hover:underline cursor-pointer opacity-80 hover:opacity-100" title={i}>{i}</a>
          ))}
        </nav>
        <div className="ml-auto"><ThemeToggle/></div>
      </div>
    </header>
  )
}
