
export default function FooterBar({ onBack, onPrint, onExportFHIR }){
  return (
    <div className="flex flex-wrap items-center justify-between py-4">
      <div className="text-sm text-slate-500">© 2025 EHR Demo</div>
      <div className="flex items-center gap-2">
        <button className="btn btn-secondary" onClick={onBack}>Back to Patient List</button>
        {/* <button className="btn btn-secondary" onClick={onPrint}>Print Summary</button> */}
        <button className="btn btn-primary" onClick={onExportFHIR}>Export (JSON)</button>
      </div>
    </div>
  )
}
