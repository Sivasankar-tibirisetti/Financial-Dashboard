import { NextResponse } from 'next/server'

type Row = { label: string; bar: number; line: number }

function make(range: string): Row[] {
  const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  const mult = range === '30d' ? 1.3 : range === '10d' ? 1.15 : range === '3d' ? 0.85 : 1
  return labels.map((l, i) => ({
    label: l,
    bar: Math.round((30 + Math.random() * 70) * mult),
    line: Math.round((100 + Math.random() * 200) * mult),
  }))
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const range = searchParams.get('range') ?? '7d'
  return NextResponse.json({ rows: make(range) })
}
