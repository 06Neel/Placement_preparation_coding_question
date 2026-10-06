import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnswerSlide } from './components/AnswerSlide'
import { ClosingSlide } from './components/ClosingSlide'
import { Overview } from './components/Overview'
import { PatternSheet } from './components/PatternSheet'
import { QuestionSlide } from './components/QuestionSlide'
import { SectionSlide } from './components/SectionSlide'
import { TitleSlide } from './components/TitleSlide'
import { TopicSlide } from './components/TopicSlide'
import { buildSlides } from './data/problems'

function App() {
  const slides = useMemo(() => buildSlides(), [])
  const [index, setIndex] = useState(0)
  const [overviewOpen, setOverviewOpen] = useState(false)

  const go = useCallback(
    (next: number) => {
      setIndex(Math.min(slides.length - 1, Math.max(0, next)))
    },
    [slides.length],
  )

  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOverviewOpen(false)
        return
      }
      if (e.key === 'o' || e.key === 'O') {
        setOverviewOpen((v) => !v)
        return
      }
      if (overviewOpen) return
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          prev()
          break
        case 'Home':
          e.preventDefault()
          go(0)
          break
        case 'End':
          e.preventDefault()
          go(slides.length - 1)
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, next, overviewOpen, prev, slides.length])

  const slide = slides[index]
  const progress = ((index + 1) / slides.length) * 100

  return (
    <div className="app">
      <div className="progress" style={{ width: `${progress}%` }} />

      <div className="stage-wrap">
        <main className="stage" aria-live="polite">
          {slide.kind === 'title' && <TitleSlide />}
          {slide.kind === 'section' && (
            <SectionSlide hours={slide.hours} hoursTitle={slide.hoursTitle} />
          )}
          {slide.kind === 'topic' && <TopicSlide topic={slide.topic} />}
          {slide.kind === 'question' && (
            <QuestionSlide topic={slide.topic} problem={slide.problem} />
          )}
          {slide.kind === 'answer' && (
            <AnswerSlide topic={slide.topic} problem={slide.problem} />
          )}
          {slide.kind === 'patterns' && <PatternSheet />}
          {slide.kind === 'closing' && <ClosingSlide />}
        </main>
      </div>

      <footer className="chrome">
        <div className="chrome-hints">
          <kbd>←</kbd> <kbd>→</kbd> navigate · <kbd>Space</kbd> next ·{' '}
          <kbd>O</kbd> overview
        </div>
        <div className="chrome-nav">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setOverviewOpen(true)}
          >
            Overview
          </button>
          <button
            type="button"
            className="btn"
            onClick={prev}
            disabled={index === 0}
          >
            Previous
          </button>
          <span className="counter">
            {index + 1} / {slides.length}
          </span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={next}
            disabled={index === slides.length - 1}
          >
            Next
          </button>
        </div>
      </footer>

      {overviewOpen && (
        <Overview
          slides={slides}
          current={index}
          onSelect={go}
          onClose={() => setOverviewOpen(false)}
        />
      )}
    </div>
  )
}

export default App
