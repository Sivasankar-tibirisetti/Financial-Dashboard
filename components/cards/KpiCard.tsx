import Link from 'next/link'

export default function KpiCard({ title, value, mom }: { title: string; value: string; mom: number }) {
  const pos = mom >= 0
  return (
    <div className="card p-5">
      <div className="text-sm opacity-70">{title}</div>
      <div className="mt-1 text-3xl font-semibold">{value}</div>
      <div className="mt-2 text-sm">
        <span className={pos ? 'text-emerald-600' : 'text-rose-600'}>
          {pos ? '▲' : '▼'} {Math.abs(mom).toFixed(2)}%
        </span>
      </div>
      <div className="mt-4">
        
        <Link href="#" className="inline-block px-3 py-1 rounded-lg border text-sm hover:bg-black/5 dark:hover:bg-white/5">View Report</Link>
      </div>
    </div>
  )
}
