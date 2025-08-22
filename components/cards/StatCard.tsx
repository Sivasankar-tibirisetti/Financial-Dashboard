export default function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card p-4">
      <div className="text-sm opacity-70">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  )
}
