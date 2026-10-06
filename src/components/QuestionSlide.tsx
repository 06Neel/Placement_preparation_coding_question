import { SlideShell } from './SlideShell'
import type { Problem, Topic } from '../data/problems'

interface Props {
  topic: Topic
  problem: Problem
}

export function QuestionSlide({ topic, problem }: Props) {
  return (
    <SlideShell className="question-slide">
      <span className="eyebrow">
        Topic {topic.index} · {topic.title} · Q{problem.number}
      </span>
      <h1 className="slide-title">{problem.title}</h1>
      <div className="meta-row">
        <span className="chip">{problem.difficulty}</span>
        <span className="chip chip-muted">Time target 3–5 min</span>
      </div>
      <p className="statement">{problem.statement}</p>
      <div className="hint-strip">
        <span className="hint-label">Hint</span>
        <span className="hint-text">{problem.hint}</span>
      </div>
      <div className="io-card">
        <div className="io-box">
          <label>Input</label>
          <code>{problem.inputLabel}</code>
        </div>
        <div className="io-box out">
          <label>Output</label>
          <code>{problem.outputLabel}</code>
        </div>
        {problem.note && <p className="io-note">{problem.note}</p>}
      </div>
    </SlideShell>
  )
}
