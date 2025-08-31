import { NextResponse } from 'next/server'

type Point = { x: number; y: number; size: number; name: string }

function seed(range: string): Point[] {
  const mult = range === '30d' ? 1.2 : range === '10d' ? 1.1 : range === '3d' ? 0.9 : 1
  const pts: Point[] = []
  for (let i = 0; i < 18; i++) {
    const x = Math.round((50 + Math.random() * 350) * mult)
    const y = Math.round((40 + Math.random() * 220) * mult)
    const size = Math.round((10 + Math.random() * 50) * mult)
    pts.push({ x, y, size, name: `Client ${i+1}` })
  }
  return pts
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const range = searchParams.get('range') ?? '7d'
  return NextResponse.json({ points: seed(range) })
}
