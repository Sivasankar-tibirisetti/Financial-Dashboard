'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <button className="px-3 py-1 rounded-lg border">…</button>
  const active = theme === 'system' ? systemTheme : theme
  const isDark = active === 'dark'
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="px-3 py-1 rounded-lg border border-black/10 dark:border-white/10 text-sm"
      aria-label="Toggle dark mode"
    >{isDark ? '🌙 Dark' : '☀️ Light'}</button>
  )
}
