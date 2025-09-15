'use client'
import { useEffect, useState } from 'react'
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { RangeKey } from '@/lib/utils'
import sipbusinessJSON from '@/data/sip-business.json'


type Row = { label: string; bar: number; line: number }

export default function SipBusiness({ range }: { range: RangeKey }) {
  const [data, setData] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
     const rows: Row[] = sipbusinessJSON.points
   setData(rows)
      setLoading(false)
    },[])

  return (
    <div className="card p-4 h-80">
      <div className="font-medium mb-2">SIP Business</div>
      {loading ? (
        <div className="animate-pulse h-full rounded-xl bg-black/5 dark:bg-white/5" />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bar" name="New SIPs" fill="#8884d8" />
            <Line dataKey="line" name="SIP Value" stroke="#82ca9d" />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
