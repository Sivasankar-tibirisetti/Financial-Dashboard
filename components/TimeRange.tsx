'use client'
import { cn, RANGES, RangeKey } from '@/lib/utils'

export default function TimeRange({ value, onChange }: { value: RangeKey, onChange: (v: RangeKey) => void }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {RANGES.map(r => (
        <button
          key={r.key}
          onClick={() => onChange(r.key)}
          className={cn('px-3 py-1 rounded-full border text-sm', value===r.key && 'bg-gray-900 text-white dark:bg-white dark:text-gray-900')}
        >{r.label}</button>
      ))}
    </div>
  )
}
