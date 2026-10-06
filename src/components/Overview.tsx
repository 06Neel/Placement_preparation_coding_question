import { slideLabel, slideTitle, type Slide } from '../data/problems'

interface Props {
  slides: Slide[]
  current: number
  onSelect: (index: number) => void
  onClose: () => void
}

export function Overview({ slides, current, onSelect, onClose }: Props) {
  return (
    <div
      className="overview"
      role="dialog"
      aria-modal="true"
      aria-label="Slide overview"
      onClick={onClose}
    >
      <div className="overview-panel" onClick={(e) => e.stopPropagation()}>
        <div className="overview-head">
          <h2>Slides</h2>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Close (Esc)
          </button>
        </div>
        <div className="overview-grid">
          {slides.map((slide, i) => (
            <button
              key={`${slide.kind}-${i}`}
              type="button"
              className={`thumb${i === current ? ' active' : ''}`}
              onClick={() => {
                onSelect(i)
                onClose()
              }}
            >
              <span className="kind">{slideLabel(slide)}</span>
              <span className="t-title">{slideTitle(slide)}</span>
              <span className="t-num">{i + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
