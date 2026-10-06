import { SlideShell } from './SlideShell'
import { topics, type Topic } from '../data/problems'

export function TopicSlide({ topic }: { topic: Topic }) {
  return (
    <SlideShell className="topic-slide">
      <div className="topic-index" aria-hidden="true">
        {String(topic.index).padStart(2, '0')}
      </div>
      <span className="eyebrow">
        {topic.hours} · Topic {topic.index} of {topics.length}
      </span>
      <h1 className="slide-title">{topic.title}</h1>
      <p className="slide-sub">{topic.subtitle}</p>
      <div className="topic-problems">
        {topic.problems.map((p) => (
          <div className="topic-problem" key={p.id}>
            <span className="num">{p.number}</span>
            <span className="name">{p.title}</span>
          </div>
        ))}
      </div>
    </SlideShell>
  )
}
