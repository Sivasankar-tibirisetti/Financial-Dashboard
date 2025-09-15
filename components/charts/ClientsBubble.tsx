'use client'
import { useEffect, useState } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { RangeKey } from '@/lib/utils'
// Import JSON directly
import clientsJSON from '@/data/clients.json'

type ClientPoint = { x: number; y: number; size: number; name: string }

// Define type for JSON structure
type ClientsJSON = {
  [key in RangeKey]: ClientPoint[]
}

// Cast imported JSON to the correct type
const clientsData = clientsJSON as unknown as ClientsJSON


export default function ClientsBubble({ range }: { range: RangeKey }) {
  const [data, setData] = useState<ClientPoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Apply multiplier based on range
    const mult = range === '30d' ? 1.2 : range === '10d' ? 1.1 : range === '3d' ? 0.9 : 1

    // Map the single points array and apply multiplier
   const basePoints: ClientPoint[] = clientsJSON.points
    const points: ClientPoint[] = basePoints.map(p => ({
      x: Math.round(p.x * mult),
      y: Math.round(p.y * mult),
      size: Math.round(p.size * mult),
      name: p.name
    }))

    setData(points)
    setLoading(false)
  }, [range])


    
  return (
    <div className="card p-4 h-80">
      <div className="font-medium mb-2">Clients</div>
      {loading ? (
        <div className="animate-pulse h-full rounded-xl bg-black/5 dark:bg-white/5" />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <XAxis type="number" dataKey="x" name="AUM" />
            <YAxis type="number" dataKey="y" name="SIP" />
            <ZAxis type="number" dataKey="size" range={[60, 900]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={data} />
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
