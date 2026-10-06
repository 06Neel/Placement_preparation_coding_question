import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export function SlideShell({ children, className = '' }: Props) {
  return <div className={`stage-body ${className}`.trim()}>{children}</div>
}
