
export default function RecordSummaryCard({ summary }){
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="card-title">RecordID: {summary.recordId}</div>
          <div className="card-subtitle">Updated: {new Date(summary.updatedAt).toLocaleString()}</div>
        </div>
        <div className="text-right">
          <div className="text-sm"><span className="font-medium">Primary Dx:</span> {summary.primaryDiagnosis}</div>
          <div className="text-sm"><span className="font-medium">Last Lab:</span> {summary.lastLabSummary.name}: {summary.lastLabSummary.value}{summary.lastLabSummary.units} ({summary.lastLabSummary.date})</div>
        </div>
      </div>
    </div>
  )
}
