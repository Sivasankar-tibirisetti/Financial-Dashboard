'use client'
import { useEffect, useState } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { RangeKey } from '@/lib/utils'

type ClientPoint = { x: number; y: number; size: number; name: string }

export default function ClientsBubble({ range }: { range: RangeKey }) {
  const [data, setData] = useState<ClientPoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/clients?range=${range}`).then(r => r.json()).then(d => {
      setData(d.points)
      setLoading(false)
    })
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
