import { NextResponse } from 'next/server'

type Row = { month: string; aum: number; sip: number; redemption: number }

function make(range: string): Row[] {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const mult = range === '30d' ? 1.2 : range === '10d' ? 1.05 : range === '3d' ? 0.95 : 1
  return months.map((m, i) => ({
    month: m,
    aum: Math.round((500 + Math.sin(i/2)*80 + Math.random()*60) * mult),
    sip: Math.round((220 + Math.cos(i/3)*40 + Math.random()*40) * mult),
    redemption: Math.round((160 + Math.sin(i/4)*30 + Math.random()*30) * mult),
  }))
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const range = searchParams.get('range') ?? '7d'
  return NextResponse.json({ rows: make(range) })
}
