import { SlideShell } from './SlideShell'

interface Props {
  hours: string
  hoursTitle: string
}

export function SectionSlide({ hours, hoursTitle }: Props) {
  return (
    <SlideShell className="section-slide">
      <span className="eyebrow">{hours}</span>
      <h1 className="slide-title">{hoursTitle}</h1>
      <p className="slide-sub">
        Two practice problems per topic — try the question slide first, then
        study the approach, dry run, and multi-language solution.
      </p>
    </SlideShell>
  )
}
