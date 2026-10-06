import { SlideShell } from './SlideShell'
import { LANGS, topics } from '../data/problems'

export function TitleSlide() {
  const problemCount = topics.reduce((n, t) => n + t.problems.length, 0)
  const hours = [...new Set(topics.map((t) => t.hours))]

  return (
    <SlideShell className="title-slide">
      <span className="eyebrow">Accenture Drive · {hours.join(' · ')}</span>
      <h1 className="slide-title">Problem-Solving Sprint</h1>
      <p className="slide-sub">
        {topics.length} interview topics with two practice problems each —
        question first, then a worked solution in C++, Java, and Python.
      </p>
      <div className="title-meta">
        <div>
          <strong>{topics.length}</strong>
          <span>Topics</span>
        </div>
        <div>
          <strong>{problemCount}</strong>
          <span>Problems</span>
        </div>
        <div>
          <strong>{LANGS.length}</strong>
          <span>Languages</span>
        </div>
      </div>
    </SlideShell>
  )
}
