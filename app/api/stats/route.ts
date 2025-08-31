import { NextResponse } from 'next/server'

const base = [
  { label: 'Purchases', value: 1243 },
  { label: 'Redemptions', value: 834 },
  { label: 'Rejected Transactions', value: 12 },
  { label: 'SIP Rejections', value: 9 },
  { label: 'New SIP', value: 176 },
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const range = (searchParams.get('range') ?? '7d') as '3d' | '7d' | '10d' | '30d'
  const tweak = { '3d': 0.9, '7d': 1.0, '10d': 1.1, '30d': 1.25 } as const
  const stats = base.map(s => ({ ...s, value: Math.round((s.value as number) * tweak[range]) }))
  return NextResponse.json({ stats })
}