import { SlideShell } from './SlideShell'
import { patterns, topics } from '../data/problems'

export function PatternSheet() {
  const problemCount = topics.reduce((n, t) => n + t.problems.length, 0)

  return (
    <SlideShell className="patterns-slide">
      <span className="eyebrow">Cheat sheet</span>
      <h1 className="slide-title">
        {patterns.length} patterns → {problemCount} problems
      </h1>
      <p className="slide-sub">
        Name the pattern before you code. If the problem fits one of these, the
        structure of your solution is already decided.
      </p>
      <div className="pattern-grid">
        {patterns.map((p, i) => (
          <article className="pattern-card" key={p.id}>
            <span className="pattern-num">{String(i + 1).padStart(2, '0')}</span>
            <h2>{p.name}</h2>
            <p className="pattern-when">{p.when}</p>
            <p className="pattern-eg">{p.example}</p>
          </article>
        ))}
      </div>
    </SlideShell>
  )
}
