import type { DiagramId } from '../data/problems'

interface Props {
  id: DiagramId
}

const cell = {
  fill: '#ffffff',
  stroke: '#cbd5e1',
} as const

const accent = '#a100ff'
const ink = '#0f172a'
const muted = '#64748b'
const ok = '#059669'

function Box({
  x,
  y,
  w = 44,
  h = 36,
  label,
  highlight = false,
  color = ink,
}: {
  x: number
  y: number
  w?: number
  h?: number
  label: string
  highlight?: boolean
  color?: string
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={highlight ? 'rgba(161,0,255,0.12)' : cell.fill}
        stroke={highlight ? accent : cell.stroke}
        strokeWidth={highlight ? 2 : 1.5}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 5}
        textAnchor="middle"
        fontSize={14}
        fontWeight={700}
        fontFamily="JetBrains Mono, monospace"
        fill={color}
      >
        {label}
      </text>
    </g>
  )
}

function Label({
  x,
  y,
  text,
  anchor = 'start',
  color = muted,
  size = 11,
}: {
  x: number
  y: number
  text: string
  anchor?: 'start' | 'middle' | 'end'
  color?: string
  size?: number
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={600}
      fontFamily="Inter, sans-serif"
      fill={color}
      letterSpacing="0.04em"
    >
      {text}
    </text>
  )
}

function Extrema() {
  return (
    <g>
      <Label x={16} y={18} text="first / second tracking" />
      {[10, 20, 4, 45, 99].map((v, i) => (
        <Box
          key={v + String(i)}
          x={16 + i * 54}
          y={40}
          label={String(v)}
          highlight={i === 3 || i === 4}
        />
      ))}
      <Label x={16} y={96} text="after scan: first=99  second=45" color={accent} />
    </g>
  )
}

function Missing() {
  return (
    <g>
      <Label x={16} y={18} text="sum identity" />
      <Box x={16} y={36} w={70} label="0" />
      <Box x={92} y={36} w={70} label="1" />
      <Box x={168} y={36} w={70} label="3" highlight />
      <Label x={16} y={90} text="expected 0+1+2+3=6   actual=4   gap=2" color={accent} />
    </g>
  )
}

function Cycle() {
  return (
    <g>
      <Label x={16} y={18} text="Floyd: slow 1×, fast 2× → meet at 2" />
      {[
        [40, 50],
        [130, 50],
        [220, 50],
        [175, 110],
      ].map(([x, y], i) => (
        <Box
          key={i}
          x={x}
          y={y}
          label={String([1, 3, 4, 2][i])}
          highlight={i === 3}
        />
      ))}
      <path
        d="M84 68 H130"
        stroke={accent}
        strokeWidth={2}
        markerEnd="url(#arrow)"
        fill="none"
      />
      <path
        d="M174 68 H220"
        stroke={accent}
        strokeWidth={2}
        markerEnd="url(#arrow)"
        fill="none"
      />
      <path
        d="M242 86 V110 H219"
        stroke={ok}
        strokeWidth={2}
        markerEnd="url(#arrow)"
        fill="none"
      />
      <path
        d="M175 146 H62 V86"
        stroke={ok}
        strokeWidth={2}
        markerEnd="url(#arrow)"
        fill="none"
      />
      <Label x={16} y={168} text="duplicate 2 points to itself (cycle entry)" color={ok} />
    </g>
  )
}

function Rotation() {
  return (
    <g>
      <Label x={16} y={18} text="three reverses, left by k=2" />
      <Label x={16} y={42} text="start" />
      {[1, 2, 3, 4, 5].map((v, i) => (
        <Box key={`s${v}`} x={70 + i * 42} y={26} w={36} h={28} label={String(v)} />
      ))}
      <Label x={16} y={84} text="rev 0..k" />
      {[2, 1].map((v, i) => (
        <Box key={`a${v}`} x={70 + i * 42} y={68} w={36} h={28} label={String(v)} highlight />
      ))}
      {[3, 4, 5].map((v, i) => (
        <Box key={`b${v}`} x={154 + i * 42} y={68} w={36} h={28} label={String(v)} />
      ))}
      <Label x={16} y={126} text="rev all" />
      {[3, 4, 5, 1, 2].map((v, i) => (
        <Box key={`c${i}${v}`} x={70 + i * 42} y={110} w={36} h={28} label={String(v)} highlight />
      ))}
      <Label x={16} y={168} text="[3 4 5 1 2]" color={accent} />
    </g>
  )
}

function Concat() {
  return (
    <g>
      <Label x={16} y={18} text="a + a contains every rotation of a" />
      <text x={16} y={58} fontFamily="JetBrains Mono, monospace" fontSize={15} fill={ink}>
        1,2,3,4,5,<tspan fill={accent} fontWeight={700}>3,4,5,1,2,</tspan>3,4,5,
      </text>
      <rect x={118} y={40} width={118} height={26} rx={6} fill="none" stroke={accent} strokeWidth={2} />
      <Label x={16} y={96} text="enc(b) found inside a+a → true" color={ok} />
    </g>
  )
}

function Freq() {
  const bars = [
    ['1', 3],
    ['3', 2],
    ['2', 1],
    ['4', 1],
  ] as const
  return (
    <g>
      <Label x={16} y={18} text="hash frequency (running best)" />
      {bars.map(([k, h], i) => (
        <g key={k}>
          <rect
            x={30 + i * 60}
            y={110 - h * 24}
            width={40}
            height={h * 24}
            rx={6}
            fill={i === 0 ? accent : '#e2e8f0'}
            stroke={i === 0 ? accent : '#cbd5e1'}
          />
          <text
            x={50 + i * 60}
            y={130}
            textAnchor="middle"
            fontSize={13}
            fontWeight={700}
            fontFamily="JetBrains Mono, monospace"
            fill={ink}
          >
            {k}
          </text>
          <text
            x={50 + i * 60}
            y={104 - h * 24}
            textAnchor="middle"
            fontSize={12}
            fontWeight={700}
            fontFamily="JetBrains Mono, monospace"
            fill={i === 0 ? accent : muted}
          >
            {h}
          </text>
        </g>
      ))}
      <Label x={16} y={160} text="winner: value 1 (count 3)" color={accent} />
    </g>
  )
}

function NonRepeat() {
  return (
    <g>
      <Label x={16} y={18} text="pass 1 counts · pass 2 finds first count=1" />
      {[9, 4, 9, 6, 7, 4].map((v, i) => (
        <Box
          key={i}
          x={16 + i * 50}
          y={36}
          w={42}
          label={String(v)}
          highlight={i === 3}
        />
      ))}
      <Label x={16} y={96} text="counts → skip 9,4 · first 6 wins" color={accent} />
      {[6, 7].map((v, i) => (
        <Box key={v} x={16 + i * 50} y={112} w={42} label={String(v)} highlight />
      ))}
      <Label x={130} y={136} text="both unique; 6 appears first" color={ok} />
    </g>
  )
}

function TwoPointer() {
  return (
    <g>
      <Label x={16} y={18} text="two pointers from both ends" />
      {'racecar'.split('').map((ch, i) => (
        <Box key={i} x={16 + i * 48} y={40} w={40} label={ch} highlight={i === 0 || i === 6} />
      ))}
      <path d="M36 90 H16" stroke={accent} strokeWidth={2} markerEnd="url(#arrow)" fill="none" />
      <path d="M300 90 H320" stroke={accent} strokeWidth={2} markerEnd="url(#arrow)" fill="none" />
      <Label x={16} y={96} text="L=0 →" color={accent} />
      <Label x={340} y={96} text="← R=6" color={accent} anchor="end" />
      <Label x={16} y={140} text="compare s[L] vs s[R], move inward until L ≥ R" />
    </g>
  )
}

function NormalizePointer() {
  return (
    <g>
      <Label x={16} y={18} text="skip non-alnum · compare lowercased" />
      <text x={16} y={58} fontFamily="JetBrains Mono, monospace" fontSize={14} fill={ink}>
        A man, a plan… Panama
      </text>
      <rect x={16} y={70} width={18} height={8} fill={accent} rx={2} />
      <rect x={278} y={70} width={18} height={8} fill={accent} rx={2} />
      <Label x={16} y={104} text="L skips to letter · R skips to letter" />
      <Label x={16} y={132} text="tolower match → continue" color={ok} />
    </g>
  )
}

function Count() {
  const letters = ['a', 'g', 'm', 'n', 'r']
  return (
    <g>
      <Label x={16} y={18} text="+1 for s, −1 for t  (26 slots)" />
      {letters.map((ch, i) => (
        <g key={ch}>
          <Box x={16 + i * 58} y={36} w={50} label={ch} />
          <text
            x={41 + i * 58}
            y={96}
            textAnchor="middle"
            fontSize={14}
            fontWeight={700}
            fontFamily="JetBrains Mono, monospace"
            fill={ok}
          >
            0
          </text>
        </g>
      ))}
      <Label x={16} y={130} text="all zeros → anagram ✓" color={ok} />
    </g>
  )
}

function NormalizeCount() {
  return (
    <g>
      <Label x={16} y={18} text="normalize while counting" />
      <text x={16} y={52} fontFamily="JetBrains Mono, monospace" fontSize={14} fill={ink}>
        Dormitory
      </text>
      <text x={16} y={78} fontFamily="JetBrains Mono, monospace" fontSize={14} fill={ok}>
        ↓ drop space, tolower
      </text>
      <text x={16} y={108} fontFamily="JetBrains Mono, monospace" fontSize={14} fill={accent} fontWeight={700}>
        dormitory  ↔  dirtyroom
      </text>
      <Label x={16} y={144} text="same multiset → true" color={ok} />
    </g>
  )
}

function CharMap() {
  const items = [
    ['a', 1],
    ['c', 2],
    ['e', 2],
    ['n', 1],
    ['t', 1],
    ['u', 1],
  ] as const
  return (
    <g>
      <Label x={16} y={18} text='map char → count  ("accenture")' />
      {items.map(([ch, n], i) => (
        <g key={ch}>
          <Box x={16 + i * 56} y={40} w={48} label={`${ch}:${n}`} highlight={n > 1} />
        </g>
      ))}
      <Label x={16} y={104} text="single pass — insert/update only" color={accent} />
    </g>
  )
}

function WordCount() {
  return (
    <g>
      <Label x={16} y={18} text='tokenize → lower → count  ("the … mat")' />
      {[
        ['the', 3],
        ['and', 2],
        ['cat', 1],
        ['hat', 1],
        ['mat', 1],
      ].map(([w, n], i) => (
        <g key={String(w)}>
          <rect
            x={16 + i * 68}
            y={40}
            width={60}
            height={32}
            rx={8}
            fill={i === 0 ? 'rgba(161,0,255,0.12)' : '#fff'}
            stroke={i === 0 ? accent : '#cbd5e1'}
            strokeWidth={i === 0 ? 2 : 1.5}
          />
          <text
            x={46 + i * 68}
            y={61}
            textAnchor="middle"
            fontSize={13}
            fontWeight={700}
            fontFamily="JetBrains Mono, monospace"
            fill={i === 0 ? accent : ink}
          >
            {w}:{n}
          </text>
        </g>
      ))}
      <Label x={16} y={104} text='max frequency = "the"' color={accent} />
    </g>
  )
}

function WordSplit() {
  return (
    <g>
      <Label x={16} y={18} text='split → walk end→start → join  ("  the sky  is blue ")' />
      {['the', 'sky', 'is', 'blue'].map((w, i) => (
        <Box key={w} x={16 + i * 72} y={40} w={64} label={w} highlight={i >= 2} />
      ))}
      <path d="M280 70 H16" stroke={accent} strokeWidth={2} markerEnd="url(#arrow)" fill="none" strokeDasharray="4 3" />
      <text x={16} y={110} fontFamily="JetBrains Mono, monospace" fontSize={15} fill={accent} fontWeight={700}>
        "blue is sky the"
      </text>
    </g>
  )
}

function SeenSet() {
  return (
    <g>
      <Label x={16} y={18} text='seen-set preserves first occurrence  ("banana")' />
      {'banana'.split('').map((ch, i) => (
        <g key={i}>
          <Box
            x={16 + i * 50}
            y={40}
            w={42}
            label={ch}
            highlight={i < 3}
            color={i < 3 ? ink : muted}
          />
          <text
            x={37 + i * 50}
            y={96}
            textAnchor="middle"
            fontSize={11}
            fontWeight={700}
            fontFamily="Inter, sans-serif"
            fill={i < 3 ? ok : muted}
          >
            {i < 3 ? 'KEEP' : 'SKIP'}
          </text>
        </g>
      ))}
      <text x={16} y={136} fontFamily="JetBrains Mono, monospace" fontSize={16} fontWeight={700} fill={accent}>
        "ban"
      </text>
    </g>
  )
}

function LinearSearch() {
  return (
    <g>
      <Label x={16} y={18} text="scan until match (target = 9)" />
      {[7, 3, 9, 1, 5].map((v, i) => (
        <Box key={i} x={16 + i * 54} y={40} label={String(v)} highlight={i === 2} />
      ))}
      <Label x={16} y={96} text="i=0 ✗ · i=1 ✗ · i=2 ✓ → index 2" color={accent} />
      <Label x={16} y={130} text="unsorted OK · stop at first hit" />
    </g>
  )
}

function FirstLast() {
  return (
    <g>
      <Label x={16} y={18} text="first & last index of target = 8" />
      {[5, 7, 7, 8, 8, 10].map((v, i) => (
        <Box
          key={i}
          x={16 + i * 54}
          y={40}
          label={String(v)}
          highlight={i === 3 || i === 4}
        />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <text
          key={`n${i}`}
          x={38 + i * 54}
          y={96}
          textAnchor="middle"
          fontSize={11}
          fontWeight={700}
          fontFamily="JetBrains Mono, monospace"
          fill={i === 3 || i === 4 ? accent : muted}
        >
          {i}
        </text>
      ))}
      <Label x={16} y={130} text="first=3  last=4 → [3, 4]" color={accent} />
    </g>
  )
}

function BubbleSort() {
  return (
    <g>
      <Label x={16} y={18} text="bubble largest unsorted value to the end" />
      <text x={16} y={50} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={ink}>
        pass1: 5,1 → swap · 4,2 → swap …
      </text>
      {[1, 2, 4, 5, 8].map((v, i) => (
        <Box key={v} x={16 + i * 54} y={68} label={String(v)} highlight={i >= 3} />
      ))}
      <Label x={16} y={130} text="after passes → [1 2 4 5 8]" color={ok} />
      <Label x={16} y={156} text="early exit if a pass has 0 swaps" />
    </g>
  )
}

function SelectionSort() {
  return (
    <g>
      <Label x={16} y={18} text="pick min from unsorted suffix, swap into place" />
      {[11, 12, 22, 25, 64].map((v, i) => (
        <Box key={v} x={16 + i * 54} y={40} label={String(v)} highlight={i === 0} />
      ))}
      <Label x={16} y={96} text="i=0: scan min=11 → swap with arr[0]" color={accent} />
      <Label x={16} y={124} text="i=1: min=12 → … fixed cost ~n²/2" />
    </g>
  )
}

function BinSearch() {
  return (
    <g>
      <Label x={16} y={18} text="halve [lo, hi] each step (target = 16)" />
      {[2, 5, 8, 12, 16, 23].map((v, i) => (
        <Box key={i} x={16 + i * 54} y={40} label={String(v)} highlight={i === 4} />
      ))}
      <Label x={16} y={96} text="mid=8 < 16 → discard left half" />
      <Label x={16} y={124} text="mid=16 == 16 → return index 4" color={accent} />
    </g>
  )
}

function LowerBound() {
  return (
    <g>
      <Label x={16} y={18} text="on match, keep going LEFT for first hit" />
      {[1, 2, 2, 2, 3].map((v, i) => (
        <Box
          key={i}
          x={16 + i * 54}
          y={40}
          label={String(v)}
          highlight={i === 1}
        />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <text
          key={`lb${i}`}
          x={38 + i * 54}
          y={96}
          textAnchor="middle"
          fontSize={11}
          fontWeight={700}
          fontFamily="JetBrains Mono, monospace"
          fill={i === 1 ? accent : muted}
        >
          {i}
        </text>
      ))}
      <Label x={16} y={130} text="record mid, hi = mid-1 → first index 1" color={accent} />
    </g>
  )
}

function DigitSum() {
  return (
    <g>
      <Label x={16} y={18} text="peel last digit with % 10, shrink with / 10" />
      <text x={16} y={52} fontFamily="JetBrains Mono, monospace" fontSize={14} fill={ink}>
        1234 → +4 → 123 → +3 → 12 → +2 → 1 → +1
      </text>
      <text x={16} y={92} fontFamily="JetBrains Mono, monospace" fontSize={16} fontWeight={700} fill={accent}>
        sum = 10
      </text>
      <Label x={16} y={130} text="function digitSum(n) — pure input → output" />
    </g>
  )
}

function NumPalindrome() {
  return (
    <g>
      <Label x={16} y={18} text="reverse digits, compare to original" />
      <text x={16} y={54} fontFamily="JetBrains Mono, monospace" fontSize={15} fill={ink}>
        n = 1221
      </text>
      <text x={16} y={84} fontFamily="JetBrains Mono, monospace" fontSize={15} fill={accent} fontWeight={700}>
        rev = 1221
      </text>
      <Label x={16} y={124} text="rev == orig → true" color={ok} />
      <Label x={16} y={152} text="negatives → false by definition" />
    </g>
  )
}

function FactRec() {
  return (
    <g>
      <Label x={16} y={18} text="fact(n) = n * fact(n-1) · base fact(1)=1" />
      {[5, 4, 3, 2, 1].map((v, i) => (
        <Box
          key={v}
          x={16 + i * 64}
          y={40}
          w={52}
          label={`f(${v})`}
          highlight={i === 4}
        />
      ))}
      <path
        d="M42 84 H70"
        stroke={accent}
        strokeWidth={2}
        markerEnd="url(#arrow)"
        fill="none"
      />
      <Label x={16} y={116} text="call down · multiply on the way up" />
      <text x={16} y={148} fontFamily="JetBrains Mono, monospace" fontSize={15} fontWeight={700} fill={accent}>
        5·4·3·2·1 = 120
      </text>
    </g>
  )
}

function FibRec() {
  return (
    <g>
      <Label x={16} y={18} text="fib(n) = fib(n-1) + fib(n-2)" />
      <Box x={140} y={36} w={70} label="fib(7)" highlight />
      <Box x={70} y={90} w={70} label="fib(6)" />
      <Box x={210} y={90} w={70} label="fib(5)" />
      <Box x={40} y={140} w={70} label="fib(5)…" />
      <path d="M160 72 L110 90" stroke={accent} strokeWidth={1.5} fill="none" />
      <path d="M190 72 L240 90" stroke={accent} strokeWidth={1.5} fill="none" />
      <Label x={16} y={166} text="base: F(0)=0, F(1)=1 → F(7)=13" color={ok} />
    </g>
  )
}

function Gcd() {
  return (
    <g>
      <Label x={16} y={18} text="Euclidean: gcd(a,b) = gcd(b, a % b)" />
      <Box x={16} y={40} w={70} label="48" />
      <Box x={100} y={40} w={70} label="18" />
      <Label x={184} y={64} text="→ (18, 12) → (12, 6) → (6, 0)" />
      <text x={16} y={110} fontFamily="JetBrains Mono, monospace" fontSize={15} fill={ink}>
        48,18 → 18,12 → 12,6 → 6,<tspan fill={accent} fontWeight={700}>0</tspan>
      </text>
      <Label x={16} y={148} text="b == 0 → GCD = 6" color={ok} />
    </g>
  )
}

function Prime() {
  return (
    <g>
      <Label x={16} y={18} text="trial divide only up to √n" />
      <text x={16} y={54} fontFamily="JetBrains Mono, monospace" fontSize={15} fill={ink}>
        n = 29 · √29 ≈ 5.4
      </text>
      <text x={16} y={88} fontFamily="JetBrains Mono, monospace" fontSize={14} fill={ink}>
        try 2 · then 3, 5, 7 … while i*i ≤ n
      </text>
      <text x={16} y={128} fontFamily="JetBrains Mono, monospace" fontSize={16} fontWeight={700} fill={ok}>
        no divisor → prime ✓
      </text>
      <Label x={16} y={158} text="n < 2 → not prime" />
    </g>
  )
}

function HashTwoSum() {
  return (
    <g>
      <Label x={16} y={18} text="map value → index · complement lookup" />
      {[2, 7, 11, 15].map((v, i) => (
        <Box key={i} x={16 + i * 54} y={40} label={String(v)} highlight={i <= 1} />
      ))}
      <text x={16} y={100} fontFamily="JetBrains Mono, monospace" fontSize={14} fill={ink}>
        i=0 store 2→0 · need 9−2=<tspan fill={accent} fontWeight={700}>7</tspan>
      </text>
      <text x={16} y={130} fontFamily="JetBrains Mono, monospace" fontSize={14} fill={ok} fontWeight={700}>
        i=1 value 7 found → [0, 1]
      </text>
      <Label x={16} y={160} text="target = 9 · one pass O(n)" />
    </g>
  )
}

function Intersection() {
  return (
    <g>
      <Label x={16} y={18} text="set from A · collect members of B" />
      <Label x={16} y={44} text="A = [1, 2, 2, 1]" />
      {[1, 2].map((v) => (
        <Box key={v} x={16 + (v - 1) * 54} y={54} w={46} label={String(v)} highlight />
      ))}
      <Label x={16} y={116} text="B = [2, 2] → both hit set, dedupe" />
      <text x={16} y={150} fontFamily="JetBrains Mono, monospace" fontSize={16} fontWeight={700} fill={accent}>
        intersection = [2]
      </text>
    </g>
  )
}

function PairTwoPointer() {
  return (
    <g>
      <Label x={16} y={18} text="sorted two pointers · target = 10" />
      {[1, 2, 4, 6, 8, 11].map((v, i) => (
        <Box key={i} x={16 + i * 54} y={40} label={String(v)} highlight={i === 1 || i === 4} />
      ))}
      <Label x={16} y={96} text="L at 2 · R at 8 → 2+8 = 10 ✓" color={ok} />
      <Label x={16} y={130} text="sum small → L++ · sum big → R--" color={accent} />
      <Label x={16} y={160} text="O(n) after sort" />
    </g>
  )
}

function PairClosest() {
  return (
    <g>
      <Label x={16} y={18} text="track best |sum − target| · target = 15" />
      {[1, 3, 4, 7, 10].map((v, i) => (
        <Box key={i} x={16 + i * 64} y={40} w={52} label={String(v)} highlight={i === 2 || i === 4} />
      ))}
      <text x={16} y={100} fontFamily="JetBrains Mono, monospace" fontSize={14} fill={ink}>
        best sums: 11 → 13 → <tspan fill={accent} fontWeight={700}>14</tspan> → 17
      </text>
      <Label x={16} y={136} text="closest pair (4, 10) → 14" color={ok} />
    </g>
  )
}

function Transpose() {
  return (
    <g>
      <Label x={16} y={18} text="swap across main diagonal" />
      <text x={40} y={56} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={ink}>
        1 2
      </text>
      <text x={40} y={76} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={ink}>
        3 4
      </text>
      <text x={150} y={70} fontSize={20} fill={accent} fontWeight={700}>
        →
      </text>
      <text x={200} y={56} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={accent} fontWeight={700}>
        1 3
      </text>
      <text x={200} y={76} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={accent} fontWeight={700}>
        2 4
      </text>
      <Label x={16} y={120} text="for i &lt; j: swap mat[i][j], mat[j][i]" />
      <Label x={16} y={150} text="rows become columns" color={ok} />
    </g>
  )
}

function RotateMat() {
  return (
    <g>
      <Label x={16} y={18} text="90° CW = transpose + reverse each row" />
      <text x={30} y={54} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={ink}>
        1 2
      </text>
      <text x={30} y={74} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={ink}>
        3 4
      </text>
      <text x={120} y={70} fontSize={18} fill={accent}>
        → T →
      </text>
      <text x={210} y={54} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={ink}>
        1 3
      </text>
      <text x={210} y={74} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={ink}>
        2 4
      </text>
      <text x={120} y={120} fontSize={16} fill={accent} fontWeight={700}>
        rev rows
      </text>
      <text x={40} y={150} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={ok} fontWeight={700}>
        3 1 / 4 2
      </text>
    </g>
  )
}

function MatSearch() {
  return (
    <g>
      <Label x={16} y={18} text="staircase from top-right · target = 5" />
      {[
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ].map((row, r) =>
        row.map((v, c) => (
          <Box
            key={`${r}${c}`}
            x={40 + c * 70}
            y={36 + r * 44}
            w={56}
            h={34}
            label={String(v)}
            highlight={v === 4 || v === 5}
          />
        )),
      )}
      <Label x={16} y={166} text="7>5 left · 4<5 down · 5==5 ✓" color={ok} />
    </g>
  )
}

function Spiral() {
  return (
    <g>
      <Label x={16} y={18} text="peel rings: right → down → left → up" />
      {[
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ].map((row, r) =>
        row.map((v, c) => (
          <Box
            key={`${r}${c}`}
            x={40 + c * 70}
            y={36 + r * 44}
            w={56}
            h={34}
            label={String(v)}
            highlight={v === 5}
          />
        )),
      )}
      <Label x={16} y={166} text="outer layer first · center last" color={accent} />
    </g>
  )
}

function Stock() {
  return (
    <g>
      <Label x={16} y={18} text="buy low so far · sell for max gap" />
      {[7, 1, 5, 3, 6, 4].map((v, i) => (
        <Box
          key={i}
          x={16 + i * 54}
          y={40}
          label={String(v)}
          highlight={i === 1 || i === 4}
        />
      ))}
      <Label x={16} y={96} text="min=1 at day 1 · best sell=6 at day 4" />
      <text x={16} y={136} fontFamily="JetBrains Mono, monospace" fontSize={16} fontWeight={700} fill={accent}>
        profit = 6 − 1 = 5
      </text>
      <Label x={16} y={164} text="one pass · O(1) space" />
    </g>
  )
}

function Kadane() {
  return (
    <g>
      <Label x={16} y={18} text="Kadane: curr = max(x, curr+x) · track best" />
      {[-2, 1, -3, 4, -1, 2, 1, -5, 4].map((v, i) => (
        <Box
          key={i}
          x={12 + i * 38}
          y={40}
          w={34}
          h={32}
          label={String(v)}
          highlight={i >= 3 && i <= 6}
        />
      ))}
      <text x={16} y={100} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={ink}>
        subarray [4, -1, 2, 1]
      </text>
      <text x={16} y={140} fontFamily="JetBrains Mono, monospace" fontSize={18} fontWeight={700} fill={accent}>
        sum = 6
      </text>
      <Label x={16} y={166} text="works for all-negative arrays too" />
    </g>
  )
}

function NextGreater() {
  const nums = [2, 1, 2, 4, 3]
  const ans = [4, 4, 4, -1, -1]
  return (
    <g>
      <Label x={16} y={18} text="monotonic stack · indices awaiting answers" />
      {nums.map((v, i) => (
        <Box key={i} x={14 + i * 52} y={36} w={44} h={34} label={String(v)} highlight={i === 3} />
      ))}
      {ans.map((v, i) => (
        <text
          key={i}
          x={36 + i * 52}
          y={92}
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize={13}
          fontWeight={700}
          fill={v < 0 ? muted : accent}
        >
          {v}
        </text>
      ))}
      <Label x={16} y={118} text="ans aligned with input · −1 if none" />
      <Label x={16} y={140} text="while top < incoming: answer & pop" color={accent} />
      <Label x={16} y={162} text="each index pushed & popped once → O(n)" />
    </g>
  )
}

function QueueStacks() {
  return (
    <g>
      <Label x={16} y={18} text="inStack (enqueue)  →  outStack (dequeue)" />
      <Label x={30} y={42} text="in" />
      {[3, 2, 1].map((v, i) => (
        <Box key={`i${v}`} x={30} y={52 + i * 34} w={70} h={30} label={String(v)} />
      ))}
      <path d="M110 95 H175" stroke={accent} strokeWidth={2} markerEnd="url(#arrow)" />
      <Label x={190} y={42} text="out" />
      {[1, 2, 3].map((v, i) => (
        <Box key={`o${v}`} x={190} y={52 + i * 34} w={70} h={30} label={String(v)} highlight={i === 0} />
      ))}
      <Label x={16} y={166} text="pour in→out only when out is empty · amortized O(1)" />
    </g>
  )
}

function ValidParens() {
  return (
    <g>
      <Label x={16} y={18} text='s = "([{}])" · push opens · match closes' />
      <text x={16} y={58} fontFamily="JetBrains Mono, monospace" fontSize={22} fontWeight={700} fill={ink}>
        ( [ {'{'} {'}'} ] )
      </text>
      <Label x={16} y={92} text="stack top must be the partner" />
      {[1, 2, 3].map((i) => (
        <Box key={i} x={16 + (i - 1) * 58} y={108} w={50} h={30} label={['(', '[', '{'][i - 1]} />
      ))}
      <text x={210} y={130} fontFamily="Inter, sans-serif" fontSize={18} fontWeight={800} fill={ok}>
        → empty at end ✓
      </text>
      <Label x={16} y={166} text='false if closer ≠ top · or stack not empty' />
    </g>
  )
}

function LongestValid() {
  return (
    <g>
      <Label x={16} y={18} text='s = ")()())" · base index −1 on stack' />
      <text x={16} y={56} fontFamily="JetBrains Mono, monospace" fontSize={20} fontWeight={700} fill={ink}>
        ) ( ) ( ) )
      </text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <text
          key={i}
          x={34 + i * 34}
          y={78}
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize={11}
          fill={i === 4 ? accent : muted}
        >
          {i}
        </text>
      ))}
      <Box x={16} y={96} w={130} h={34} label="best = 4" highlight />
      <text x={160} y={120} fontFamily="Inter, sans-serif" fontSize={14} fontWeight={600} fill={ink}>
        len = i − stack.top
      </text>
      <Label x={16} y={166} text="match indexes 1..4 → ()() length 4" />
    </g>
  )
}

function InplaceDedup() {
  return (
    <g>
      <Label x={16} y={18} text="write pointer packs uniques left" />
      {[1, 1, 2, 2, 3].map((v, i) => (
        <Box key={i} x={14 + i * 52} y={40} w={44} h={34} label={String(v)} highlight={i < 3} />
      ))}
      <text x={16} y={100} fontFamily="JetBrains Mono, monospace" fontSize={14} fill={ink}>
        w=0 keep · i=1 skip · i=2 write → w=1
      </text>
      <Box x={14} y={116} w={148} h={34} label="1 2 3  · k = 3" highlight />
      <Label x={16} y={166} text="sorted input → only need one past-copy guard" />
    </g>
  )
}

function ContainerWater() {
  return (
    <g>
      <Label x={16} y={18} text="L & R at ends · move the shorter line" />
      {[1, 8, 6, 2, 5, 4, 8, 3, 7].map((v, i) => (
        <rect
          key={i}
          x={16 + i * 36}
          y={140 - v * 9}
          width={26}
          height={v * 9}
          fill={i === 1 || i === 8 ? 'rgba(161,0,255,0.18)' : '#e2e8f0'}
          stroke={i === 1 || i === 8 ? accent : cell.stroke}
          strokeWidth={i === 1 || i === 8 ? 2 : 1}
        />
      ))}
      <path d="M52 34 L340 34" stroke={accent} strokeWidth={1.5} strokeDasharray="4 3" />
      <text x={170} y={28} fontFamily="JetBrains Mono, monospace" fontSize={13} fontWeight={700} fill={accent}>
        area = 7 × 7 = 49
      </text>
      <Label x={16} y={166} text="area = min(h[L], h[R]) × (R − L)" />
    </g>
  )
}

function WindowSumK() {
  return (
    <g>
      <Label x={16} y={18} text="fixed window k=3 · add in, subtract out" />
      {[2, 1, 5, 1, 3, 2].map((v, i) => (
        <Box
          key={i}
          x={30 + i * 50}
          y={48}
          w={44}
          h={36}
          label={String(v)}
          highlight={i >= 2 && i <= 4}
        />
      ))}
      <path d="M134 96 H236" stroke={accent} strokeWidth={2} markerEnd="url(#arrow)" />
      <text x={140} y={124} fontFamily="JetBrains Mono, monospace" fontSize={16} fontWeight={700} fill={accent}>
        5 + 1 + 3 = 9
      </text>
      <Label x={16} y={166} text="sum += in − out each slide → O(n)" />
    </g>
  )
}

function WindowUnique() {
  return (
    <g>
      <Label x={16} y={18} text='s = "abcabcbb" · shrink when a repeat enters' />
      {'abcabcbb'.split('').map((c, i) => (
        <Box key={i} x={20 + i * 40} y={40} w={34} h={34} label={c} highlight={i >= 2 && i <= 4} />
      ))}
      <path d="M104 86 H224" stroke={accent} strokeWidth={2} markerEnd="url(#arrow)" />
      <text x={118} y={116} fontFamily="JetBrains Mono, monospace" fontSize={16} fontWeight={700} fill={accent}>
        window "cab" · len 3
      </text>
      <Label x={16} y={166} text="left jumps to lastIndex[s[r]] + 1" />
    </g>
  )
}

function PrefixRange() {
  return (
    <g>
      <Label x={16} y={18} text="pref = [0, 1, 3, 6, 10]" />
      {[0, 1, 3, 6, 10].map((v, i) => (
        <Box key={i} x={16 + i * 52} y={36} w={44} h={34} label={String(v)} highlight={i === 1 || i === 4} />
      ))}
      <text x={16} y={104} fontFamily="JetBrains Mono, monospace" fontSize={15} fontWeight={700} fill={ink}>
        sum(1..3) = pref[4] − pref[1]
      </text>
      <Box x={16} y={120} w={200} h={34} label="10 − 1 = 9" highlight />
      <Label x={16} y={166} text="O(n) build · O(1) per range query" />
    </g>
  )
}

function PrefixCountK() {
  return (
    <g>
      <Label x={16} y={18} text="map of prefix sums · each pref−k found counts" />
      {[1, 1, 1].map((v, i) => (
        <Box key={i} x={30 + i * 56} y={36} w={44} h={34} label={String(v)} highlight />
      ))}
      <text x={16} y={96} fontFamily="JetBrains Mono, monospace" fontSize={14} fill={ink}>
        pref: 1 → 2 → 3
      </text>
      <text x={16} y={126} fontFamily="JetBrains Mono, monospace" fontSize={15} fontWeight={700} fill={accent}>
        pref=2 needs 0 ✓ · pref=3 needs 1 ✓
      </text>
      <Label x={16} y={166} text='start map {0:1} so prefix-from-0 counts' />
    </g>
  )
}

function AssignCookies() {
  return (
    <g>
      <Label x={16} y={18} text="sort both · smallest cookie for next child" />
      <Label x={30} y={46} text="g" />
      {[1, 2].map((v, i) => (
        <Box key={`g${i}`} x={30} y={56 + i * 38} w={60} h={34} label={String(v)} highlight />
      ))}
      <Label x={130} y={46} text="s" />
      {[1, 2, 3].map((v, i) => (
        <Box key={`s${i}`} x={130} y={56 + i * 38} w={60} h={34} label={String(v)} highlight={i < 2} />
      ))}
      <text x={230} y={86} fontFamily="Inter, sans-serif" fontSize={15} fontWeight={700} fill={accent}>
        1≥1 ✓ · 2≥2 ✓
      </text>
      <Box x={230} y={104} w={90} h={34} label="count=2" highlight />
      <Label x={16} y={166} text="never waste a big cookie on a small greed" />
    </g>
  )
}

function JumpGame() {
  return (
    <g>
      <Label x={16} y={18} text="far = furthest index reachable" />
      {[2, 3, 1, 1, 4].map((v, i) => (
        <Box key={i} x={20 + i * 58} y={36} w={50} h={34} label={String(v)} highlight={i <= 1} />
      ))}
      <path d="M20 96 H316" stroke={accent} strokeWidth={2} markerEnd="url(#arrow)" />
      <text x={20} y={124} fontFamily="JetBrains Mono, monospace" fontSize={15} fontWeight={700} fill={accent}>
        i=0 far=2 · i=1 far=4 ≥ 4 ✓
      </text>
      <Label x={16} y={166} text="fail only if i runs past far" />
    </g>
  )
}

function UniqueSet() {
  return (
    <g>
      <Label x={16} y={18} text="static membership → build a set once" />
      {[4, 1, 7, 1].map((v, i) => (
        <Box key={i} x={16 + i * 48} y={40} w={40} h={34} label={String(v)} />
      ))}
      <path d="M210 58 H250" stroke={accent} strokeWidth={2} markerEnd="url(#arrow)" />
      <Box x={256} y={36} w={88} h={38} label="{4,1,7}" highlight />
      <text x={16} y={112} fontFamily="JetBrains Mono, monospace" fontSize={15} fontWeight={700} fill={ink}>
        query 1 → true · query 5 → false
      </text>
      <Label x={16} y={166} text="order needed? → sorted + binary search instead" />
    </g>
  )
}

function TopK() {
  return (
    <g>
      <Label x={16} y={18} text="count map → bucket by frequency" />
      <text x={16} y={52} fontFamily="JetBrains Mono, monospace" fontSize={14} fill={ink}>
        {'{1:3, 2:2, 3:1}'}
      </text>
      <Box x={16} y={70} w={80} h={34} label="c=3 → 1" highlight />
      <Box x={104} y={70} w={80} h={34} label="c=2 → 2" highlight />
      <Box x={192} y={70} w={80} h={34} label="c=1 → 3" />
      <text x={16} y={134} fontFamily="Inter, sans-serif" fontSize={15} fontWeight={700} fill={accent}>
        scan high → low · take first k: [1, 2]
      </text>
      <Label x={16} y={166} text="map + array beats full sort when k ≪ n" />
    </g>
  )
}

function Abstraction() {
  return (
    <g>
      <Label x={16} y={18} text="client depends on Shape — not on Circle/Rectangle" />
      <Box x={120} y={36} w={120} h={34} label="«interface» Shape" highlight />
      <path d="M150 74 V96 H90" stroke={accent} strokeWidth={1.5} fill="none" markerEnd="url(#arrow)" />
      <path d="M210 74 V96 H270" stroke={accent} strokeWidth={1.5} fill="none" markerEnd="url(#arrow)" />
      <Box x={40} y={100} w={100} h={34} label="Circle" />
      <Box x={220} y={100} w={110} h={34} label="Rectangle" />
      <Label x={16} y={166} text="area() declared once · each type implements it" />
    </g>
  )
}

function Encapsulation() {
  return (
    <g>
      <Label x={16} y={18} text="private fields · validated public methods" />
      <rect x={16} y={36} width={160} height={110} rx={10} fill="#fff" stroke={accent} strokeWidth={2} />
      <Label x={28} y={58} text="BankAccount" color={accent} />
      <text x={28} y={84} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={ink}>
        − balance
      </text>
      <text x={28} y={106} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={ok}>
        + deposit()
      </text>
      <text x={28} y={128} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={ok}>
        + withdraw()
      </text>
      <text x={200} y={70} fontFamily="Inter, sans-serif" fontSize={13} fontWeight={700} fill={muted}>
        no direct write
      </text>
      <text x={200} y={104} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={accent}>
        withdraw(150)
      </text>
      <text x={200} y={128} fontFamily="JetBrains Mono, monospace" fontSize={13} fontWeight={700} fill={ink}>
        → rejected
      </text>
      <Label x={16} y={166} text="invariant balance ≥ 0 can never be broken" />
    </g>
  )
}

function Overload() {
  return (
    <g>
      <Label x={16} y={18} text="one name · three signatures · compile-time pick" />
      <text x={16} y={54} fontFamily="JetBrains Mono, monospace" fontSize={15} fontWeight={700} fill={accent}>
        sum
      </text>
      <Box x={70} y={36} w={90} h={34} label="(int,int)" highlight />
      <Box x={170} y={36} w={110} h={34} label="(int,int,int)" highlight />
      <Box x={70} y={84} w={120} h={34} label="(int[])" highlight />
      <text x={210} y={106} fontFamily="JetBrains Mono, monospace" fontSize={14} fill={ink}>
        3 · 6 · 6
      </text>
      <Label x={16} y={144} text="return type alone cannot overload" />
      <Label x={16} y={166} text="Python: *args / defaults emulate this" />
    </g>
  )
}

function Inherit() {
  return (
    <g>
      <Label x={16} y={18} text="is-a chain · base first, then derived" />
      <Box x={90} y={34} w={140} h={34} label="Vehicle" highlight />
      <path d="M160 72 V96" stroke={accent} strokeWidth={2} markerEnd="url(#arrow)" />
      <Box x={90} y={100} w={140} h={34} label="Car → ElectricCar" />
      <text x={16} y={160} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={ink}>
        ctor order: Vehicle() Car() ElectricCar()
      </text>
    </g>
  )
}

function Override() {
  return (
    <g>
      <Label x={16} y={18} text="base ref · runtime type decides" />
      <Box x={16} y={40} w={110} h={34} label="Animal.speak" />
      <Box x={150} y={40} w={110} h={34} label="Cat.speak" highlight />
      <path d="M130 57 H146" stroke={accent} strokeWidth={2} markerEnd="url(#arrow)" />
      <text x={280} y={62} fontFamily="JetBrains Mono, monospace" fontSize={14} fontWeight={700} fill={ok}>
        Meow
      </text>
      <text x={16} y={104} fontFamily="Inter, sans-serif" fontSize={13} fill={ink}>
        Dog.speak() = super.speak() + &quot; Woof&quot;
      </text>
      <text x={16} y={134} fontFamily="JetBrains Mono, monospace" fontSize={15} fontWeight={700} fill={accent}>
        ... Woof
      </text>
      <Label x={16} y={166} text="override = same signature · overload = different" />
    </g>
  )
}

function OopsMistakes() {
  const rows: [string, string][] = [
    ['public field', 'private + getter'],
    ['wrong signature', 'exact @Override'],
    ['missing super()', 'chain base first'],
    ['leaks list', 'unmodifiable copy'],
  ]
  return (
    <g>
      <Label x={16} y={18} text="review checklist · design smell → fix" />
      {rows.map(([bad, fix], i) => (
        <g key={i}>
          <text
            x={16}
            y={48 + i * 30}
            fontFamily="JetBrains Mono, monospace"
            fontSize={13}
            fill={muted}
            textDecoration="line-through"
          >
            {bad}
          </text>
          <text
            x={170}
            y={48 + i * 30}
            fontFamily="JetBrains Mono, monospace"
            fontSize={13}
            fontWeight={700}
            fill={ok}
          >
            → {fix}
          </text>
        </g>
      ))}
      <Label x={16} y={166} text="has-a → compose · is-a → extend · copy on get" />
    </g>
  )
}

function SqlFilter() {
  return (
    <g>
      <Label x={16} y={18} text="FROM → WHERE → ORDER BY → LIMIT" />
      {[90, 55, 70, 40].map((s, i) => (
        <Box key={i} x={20 + i * 78} y={48} w={70} h={34} label={String(s)} highlight={s > 60} />
      ))}
      <text x={16} y={112} fontFamily="JetBrains Mono, monospace" fontSize={14} fontWeight={700} fill={accent}>
        WHERE &gt; 60 → 90, 70 · DESC → LIMIT 3
      </text>
      <Label x={16} y={166} text="filter before sort · alias not usable in WHERE" />
    </g>
  )
}

function SqlJoin() {
  return (
    <g>
      <Label x={16} y={18} text="ON e.dept_id = d.id" />
      <Label x={30} y={44} text="employees" />
      {['Ada', 'Bob', 'Cy'].map((emp, i) => (
        <Box key={emp} x={30} y={54 + i * 34} w={100} h={30} label={emp} />
      ))}
      <path d="M140 70 H190" stroke={accent} strokeWidth={2} markerEnd="url(#arrow)" />
      <Label x={220} y={44} text="departments" />
      {['Eng', 'Sales', 'HR'].map((dept, i) => (
        <Box key={dept} x={210} y={54 + i * 34} w={100} h={30} label={dept} highlight={dept === 'HR'} />
      ))}
      <Label x={16} y={166} text="INNER drops HR · LEFT keeps it (e.id IS NULL)" />
    </g>
  )
}

function SqlGroup() {
  return (
    <g>
      <Label x={16} y={18} text="GROUP BY dept → aggregates → HAVING" />
      <Box x={20} y={40} w={140} h={50} label="Eng: 90k, 55k" />
      <Box x={180} y={40} w={140} h={50} label="Sales: 70k" />
      <text x={20} y={116} fontFamily="JetBrains Mono, monospace" fontSize={14} fontWeight={700} fill={accent}>
        AVG 72500 · 70000
      </text>
      <text x={20} y={144} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={ink}>
        HAVING &gt; 60000 → both pass
      </text>
      <Label x={16} y={166} text="WHERE rows · HAVING groups" />
    </g>
  )
}

function SqlSubquery() {
  return (
    <g>
      <Label x={16} y={18} text="scalar / correlated subquery" />
      <Box x={20} y={40} w={150} h={44} label="MAX = 90000" highlight />
      <path d="M95 90 V112" stroke={accent} strokeWidth={2} markerEnd="url(#arrow)" />
      <text x={20} y={136} fontFamily="JetBrains Mono, monospace" fontSize={14} fill={ink}>
        salary &lt; 90000 → 70k, 55k
      </text>
      <text x={20} y={160} fontFamily="JetBrains Mono, monospace" fontSize={15} fontWeight={700} fill={accent}>
        MAX → 70000 (2nd)
      </text>
    </g>
  )
}

function SqlWindow() {
  return (
    <g>
      <Label x={16} y={18} text="OVER (PARTITION BY dept ORDER BY salary)" />
      {[90, 55, 70].map((v, i) => (
        <g key={i}>
          <Box x={20 + i * 90} y={40} w={74} h={34} label={String(v)} highlight />
          <text
            x={57 + i * 90}
            y={96}
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontSize={14}
            fontWeight={700}
            fill={accent}
          >
            rank {[1, 2, 1][i]}
          </text>
        </g>
      ))}
      <text x={16} y={136} fontFamily="JetBrains Mono, monospace" fontSize={14} fill={ink}>
        SUM OVER → 200 · 350 · 750
      </text>
      <Label x={16} y={166} text="rows stay · no GROUP BY collapse" />
    </g>
  )
}

function SqlIndex() {
  return (
    <g>
      <Label x={16} y={18} text="composite (dept_id, salary) · sargable range" />
      <Box x={20} y={40} w={200} h={44} label="(dept_id, salary)" highlight />
      <text x={20} y={112} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={ink}>
        WHERE dept_id = 5 ORDER BY salary → no filesort
      </text>
      <text x={20} y={140} fontFamily="JetBrains Mono, monospace" fontSize={13} fill={ok}>
        YEAR(x)=2024 → range x &gt;= … AND &lt; …
      </text>
      <Label x={16} y={166} text="bare column in WHERE · writes pay index cost" />
    </g>
  )
}

const MAP: Record<DiagramId, () => React.JSX.Element> = {
  extrema: Extrema,
  missing: Missing,
  cycle: Cycle,
  rotation: Rotation,
  concat: Concat,
  freq: Freq,
  nonrepeat: NonRepeat,
  'two-pointer': TwoPointer,
  'normalize-pointer': NormalizePointer,
  count: Count,
  'normalize-count': NormalizeCount,
  'char-map': CharMap,
  'word-count': WordCount,
  'word-split': WordSplit,
  'seen-set': SeenSet,
  'linear-search': LinearSearch,
  'first-last': FirstLast,
  'bubble-sort': BubbleSort,
  'selection-sort': SelectionSort,
  binsearch: BinSearch,
  'lower-bound': LowerBound,
  'digit-sum': DigitSum,
  'num-palindrome': NumPalindrome,
  'fact-rec': FactRec,
  'fib-rec': FibRec,
  gcd: Gcd,
  prime: Prime,
  'hash-two-sum': HashTwoSum,
  intersection: Intersection,
  'pair-two-pointer': PairTwoPointer,
  'pair-closest': PairClosest,
  transpose: Transpose,
  'rotate-mat': RotateMat,
  'mat-search': MatSearch,
  spiral: Spiral,
  stock: Stock,
  kadane: Kadane,
  'next-greater': NextGreater,
  'queue-stacks': QueueStacks,
  'valid-parens': ValidParens,
  'longest-valid': LongestValid,
  'inplace-dedup': InplaceDedup,
  'container-water': ContainerWater,
  'window-sum-k': WindowSumK,
  'window-unique': WindowUnique,
  'prefix-range': PrefixRange,
  'prefix-count-k': PrefixCountK,
  'assign-cookies': AssignCookies,
  'jump-game': JumpGame,
  'unique-set': UniqueSet,
  'top-k': TopK,
  abstraction: Abstraction,
  encapsulation: Encapsulation,
  overload: Overload,
  inherit: Inherit,
  override: Override,
  'oops-mistakes': OopsMistakes,
  'sql-filter': SqlFilter,
  'sql-join': SqlJoin,
  'sql-group': SqlGroup,
  'sql-subquery': SqlSubquery,
  'sql-window': SqlWindow,
  'sql-index': SqlIndex,
}

export function Diagram({ id }: Props) {
  const Shape = MAP[id]
  return (
    <div className="diagram" aria-hidden="true">
      <svg viewBox="0 0 360 170" width="100%" height="100%" role="img">
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" fill={accent} />
          </marker>
        </defs>
        <Shape />
      </svg>
    </div>
  )
}
