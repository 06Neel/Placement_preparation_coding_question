import { CodeTabs } from './CodeTabs'
import { Diagram } from './Diagram'
import { SlideShell } from './SlideShell'
import { TracePanel } from './TracePanel'
import type { Problem, Topic } from '../data/problems'

interface Props {
  topic: Topic
  problem: Problem
}

export function AnswerSlide({ topic, problem }: Props) {
  return (
    <SlideShell className="answer-slide">
      <span className="eyebrow">
        Solution · Topic {topic.index} · Q{problem.number}
      </span>
      <h1 className="slide-title">{problem.title}</h1>
      <div className="answer-layout">
        <aside className="answer-side">
          <div className="side-card">
            <h3>Approach</h3>
            <ul>
              {problem.approach.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
          <div className="side-card diagram-card">
            <h3>Visual</h3>
            <Diagram id={problem.diagram} />
          </div>
          <div className="side-card">
            <h3>Complexity</h3>
            <div className="cx">
              <span>Time</span>
              <strong>{problem.time}</strong>
            </div>
            <div className="cx">
              <span>Space</span>
              <strong>{problem.space}</strong>
            </div>
          </div>
        </aside>
        <div className="answer-main">
          <CodeTabs key={problem.id} answers={problem.answers} />
          <TracePanel trace={problem.trace} />
        </div>
      </div>
    </SlideShell>
  )
}
