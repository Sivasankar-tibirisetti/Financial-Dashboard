export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export type RangeKey = '3d' | '7d' | '10d' | '30d'
export const RANGES: { key: RangeKey; label: string }[] = [
  { key: '3d', label: '3 Days' },
  { key: '7d', label: '7 Days' },
  { key: '10d', label: '10 Days' },
  { key: '30d', label: '30 Days' },
]
