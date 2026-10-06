import { useMemo, useState } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-sql'
import { LANGS, type AnswerLang } from '../data/problems'

interface Props {
  answers: Partial<Record<AnswerLang, string>>
}

function grammarFor(lang: AnswerLang) {
  switch (lang) {
    case 'cpp':
      return Prism.languages.cpp
    case 'java':
      return Prism.languages.java
    case 'python':
      return Prism.languages.python
    case 'sql':
      return Prism.languages.sql
  }
}

export function CodeTabs({ answers }: Props) {
  const tabs = LANGS.filter(({ id }) => answers[id])
  const [lang, setLang] = useState<AnswerLang>(tabs[0]?.id ?? 'cpp')

  const html = useMemo(() => {
    const source = answers[lang]
    if (!source) return ''
    return Prism.highlight(source, grammarFor(lang), lang)
  }, [answers, lang])

  return (
    <div className="code-panel">
      <div className="tabs" role="tablist" aria-label="Language">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={lang === id}
            className={`tab${lang === id ? ' active' : ''}`}
            onClick={() => setLang(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="code-scroll">
        <pre>
          <code dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
      </div>
    </div>
  )
}
