
# EHR Management Module (React + Tailwind + Vite)

Screens:
- **Patients List** → select patient
- **Patient Health Record Overview** → read/update diagnoses & labs; consent banner; audit preview
- **Doctor Access & Audit Trail** → manage access; consent history; detailed audit

New in v4:
- **Add Lab**: dropdown test names (≥6), auto-units & reference ranges per test.
- **Ordering Doctor & Lab**: dropdowns with defaults.
- **Upload & View Reports**: view PDFs/images in a modal.
- **Compare Chart**: decluttered SVG with gridlines & tooltips.
- **Flag**: toggle, highlight, filter (All / Flagged / Unflagged).

## Quick Start
1. Node.js 18+
2. Install: `npm install`
3. Dev: `npm run dev`
4. Build: `npm run build && npm run preview`

## Routes
- `/patients` — patient list
- `/patient/:id` — overview & update medical record
- `/access/:id` — doctor access & audit trail
