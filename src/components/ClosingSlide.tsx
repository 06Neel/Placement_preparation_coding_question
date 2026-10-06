import { SlideShell } from './SlideShell'
import { topics } from '../data/problems'

export function ClosingSlide() {
  const problemCount = topics.reduce((n, t) => n + t.problems.length, 0)

  return (
    <SlideShell className="closing-slide">
      <span className="eyebrow">Wrap-up</span>
      <h1 className="slide-title">You are ready for the drive</h1>
      <p className="slide-sub">
        You just worked through {problemCount} problems across {topics.length} high-frequency patterns. Review approach notes — not memorized code — before the next set.
      </p>
      <ul className="checklist">
        <li>State constraints and clarify edge cases first</li>
        <li>Name the pattern before writing code</li>
        <li>Walk through one dry-run example out loud</li>
        <li>Call time & space complexity at the end</li>
      </ul>
    </SlideShell>
  )
}
