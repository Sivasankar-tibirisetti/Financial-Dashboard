'use client'
import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { RangeKey } from '@/lib/utils'
import monthlyMISjson from '@/data/mis.json'


type Row = { month: string; aum: number; sip: number; redemption: number }

export default function MonthlyMIS({ range }: { range: RangeKey }) {
  const [data, setData] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
      setData(monthlyMISjson.points)
      setLoading(false)
    }, [])


  return (
    <div className="card p-4 h-80">
      <div className="font-medium mb-2">Monthly MIS</div>
      {loading ? (
        <div className="animate-pulse h-full rounded-xl bg-black/5 dark:bg-white/5" />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="aum" name="AUM" stroke="#8884d8" />
            <Line dataKey="sip" name="SIP" stroke="#82ca9d" />
            <Line dataKey="redemption" name="Redemptions" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
