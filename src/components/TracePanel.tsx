import type { TraceStep } from '../data/problems'

interface Props {
  trace: TraceStep[]
}

export function TracePanel({ trace }: Props) {
  return (
    <div className="trace-panel">
      <div className="trace-label">Dry run</div>
      <ol className="trace-steps">
        {trace.map((s, i) => (
          <li key={`${s.step}-${i}`}>
            <span className="trace-step">{s.step}</span>
            <span className="trace-detail">{s.detail}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
