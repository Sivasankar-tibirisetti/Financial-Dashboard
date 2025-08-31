import { NextResponse } from 'next/server'

const base = {
  aum: 123_45_67_890,
  sip: 23_45_67_8,
}

function formatINR(n: number) {
  return n.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const range = (searchParams.get('range') ?? '7d') as '3d' | '7d' | '10d' | '30d'
  const factor = { '3d': 1.00, '7d': 1.02, '10d': 0.98, '30d': 1.05 } as const
  const aum = Math.round(base.aum * factor[range])
  const sip = Math.round(base.sip * factor[range])
  const aumMoM = ((factor[range] - 1) * 100)
  const sipMoM = ((1 / factor[range] - 1) * 100)
  return NextResponse.json({ aum: formatINR(aum), aumMoM, sip: formatINR(sip), sipMoM })
}
