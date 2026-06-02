'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Props { passwordFocused: boolean }

// Each blob's geometric + face data
const BLOBS = [
  {
    id: 'pink',
    cx: 72, cy: 60, rx: 54, ry: 48,
    gradient: 'gPink',
    hl: { x: 48, y: 35, rx: 22, ry: 13, angle: -28 },
    eyeL: { x: 60, y: 62, r: 5.5 },
    eyeR: { x: 82, y: 62, r: 5.5 },
    mouth: { d: 'M62,72 Q71,77 80,72', dc: 'M63,73 Q71,69 79,73' },
    blush: { lx: 46, ly: 72, rx_: 93, ry_: 72, color: '#fda4af' },
    groupRef: null as unknown as React.RefObject<SVGGElement>,
  },
  {
    id: 'teal',
    cx: 150, cy: 63, rx: 47, ry: 43,
    gradient: 'gTeal',
    hl: { x: 130, y: 41, rx: 19, ry: 12, angle: -22 },
    eyeL: { x: 139, y: 66, r: 5 },
    eyeR: { x: 160, y: 66, r: 5 },
    mouth: { d: 'M141,76 L159,76', dc: 'M142,76 L158,76' },
    blush: { lx: 128, ly: 75, rx_: 171, ry_: 75, color: '#99f6e4' },
    speckles: [
      {x:162,y:52,r:2.2},{x:170,y:62,r:1.6},{x:157,y:65,r:2},{x:163,y:74,r:1.4},{x:150,y:53,r:1.8},
    ],
    groupRef: null as unknown as React.RefObject<SVGGElement>,
  },
  {
    id: 'yellow',
    cx: 26, cy: 164, rx: 27, ry: 24,
    gradient: 'gYellow',
    hl: { x: 12, y: 150, rx: 11, ry: 7, angle: -24 },
    eyeL: { x: 18, y: 164, r: 3 },
    eyeR: { x: 34, y: 164, r: 3 },
    mouth: { d: 'M19,172 L33,172', dc: 'M20,172 L32,172' },
    blush: { lx: 13, ly: 171, rx_: 39, ry_: 171, color: '#fde047' },
    groupRef: null as unknown as React.RefObject<SVGGElement>,
  },
  {
    id: 'cyan',
    cx: 100, cy: 174, rx: 51, ry: 45,
    gradient: 'gCyan',
    hl: { x: 76, y: 151, rx: 21, ry: 13, angle: -26 },
    eyeL: { x: 88, y: 175, r: 5.5 },
    eyeR: { x: 112, y: 175, r: 5.5 },
    mouth: { d: 'M90,185 L110,185', dc: 'M91,185 L109,185' },
    blush: { lx: 74, ly: 184, rx_: 126, ry_: 184, color: '#7dd3fc' },
    groupRef: null as unknown as React.RefObject<SVGGElement>,
  },
  {
    id: 'purple',
    cx: 172, cy: 170, rx: 37, ry: 33,
    gradient: 'gPurple',
    hl: { x: 153, y: 148, rx: 15, ry: 9, angle: -24 },
    eyeL: { x: 162, y: 170, r: 4 },
    eyeR: { x: 182, y: 170, r: 4 },
    mouth: { d: 'M163,179 Q172,184 181,179', dc: 'M164,179 L180,179' },
    blush: { lx: 152, ly: 177, rx_: 192, ry_: 177, color: '#c4b5fd' },
    groupRef: null as unknown as React.RefObject<SVGGElement>,
  },
] as const

export default function LoginBlobs({ passwordFocused }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)

  // Group refs for idle bounce
  const gRefs = {
    pink:   useRef<SVGGElement>(null),
    teal:   useRef<SVGGElement>(null),
    yellow: useRef<SVGGElement>(null),
    cyan:   useRef<SVGGElement>(null),
    purple: useRef<SVGGElement>(null),
  }

  // Eye refs: [left, right] per blob
  const eyeRefs: Record<string, [React.MutableRefObject<SVGCircleElement | null>, React.MutableRefObject<SVGCircleElement | null>]> = {
    pink:   [useRef<SVGCircleElement | null>(null), useRef<SVGCircleElement | null>(null)],
    teal:   [useRef<SVGCircleElement | null>(null), useRef<SVGCircleElement | null>(null)],
    yellow: [useRef<SVGCircleElement | null>(null), useRef<SVGCircleElement | null>(null)],
    cyan:   [useRef<SVGCircleElement | null>(null), useRef<SVGCircleElement | null>(null)],
    purple: [useRef<SVGCircleElement | null>(null), useRef<SVGCircleElement | null>(null)],
  }

  /* ── Idle animations ─────────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const configs = [
        { ref: gRefs.pink,   dy: -9,  dur: 1.6, delay: 0,   cx: 72,  cy: 60  },
        { ref: gRefs.teal,   dy: -8,  dur: 1.9, delay: 0.4, cx: 150, cy: 63  },
        { ref: gRefs.yellow, dy: -6,  dur: 1.3, delay: 0.2, cx: 26,  cy: 164 },
        { ref: gRefs.cyan,   dy: -10, dur: 1.7, delay: 0.6, cx: 100, cy: 174 },
        { ref: gRefs.purple, dy: -7,  dur: 1.4, delay: 0.8, cx: 172, cy: 170 },
      ]
      configs.forEach(({ ref, dy, dur, delay }) => {
        gsap.to(ref.current, { y: dy, duration: dur, yoyo: true, repeat: -1, ease: 'sine.inOut', delay })
      })
    })
    return () => ctx.revert()
  }, [])

  /* ── Eye tracking ────────────────────────────────────────────────── */
  useEffect(() => {
    if (passwordFocused) return
    const VW = 200, VH = 220

    const onMove = (e: MouseEvent) => {
      const rect = svgRef.current?.getBoundingClientRect()
      if (!rect) return

      BLOBS.forEach(blob => {
        const [lRef, rRef] = eyeRefs[blob.id]
        ;[{ ref: lRef, ex: blob.eyeL.x, ey: blob.eyeL.y }, { ref: rRef, ex: blob.eyeR.x, ey: blob.eyeR.y }]
          .forEach(({ ref, ex, ey }) => {
            if (!ref.current) return
            const sx = rect.left + (ex / VW) * rect.width
            const sy = rect.top  + (ey / VH) * rect.height
            const dx = e.clientX - sx
            const dy = e.clientY - sy
            const ang = Math.atan2(dy, dx)
            const ratio = Math.min(Math.hypot(dx, dy), 200) / 200
            const max = blob.eyeL.r * 0.45  // subtle movement
            ref.current.setAttribute('cx', String(ex + Math.cos(ang) * max * ratio))
            ref.current.setAttribute('cy', String(ey + Math.sin(ang) * max * ratio))
          })
      })
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [passwordFocused])

  /* ── Click squish ────────────────────────────────────────────────── */
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current!.getBoundingClientRect()
    const mx = ((e.clientX - rect.left) / rect.width) * 200
    const my = ((e.clientY - rect.top)  / rect.height) * 220

    // Find nearest blob
    let nearestId: string = BLOBS[0].id, nearestCx: number = BLOBS[0].cx, nearestCy: number = BLOBS[0].cy, nearestRy: number = BLOBS[0].ry, minD = Infinity
    BLOBS.forEach(b => {
      const d = Math.hypot(mx - b.cx, my - b.cy)
      if (d < minD) { minD = d; nearestId = b.id; nearestCx = b.cx; nearestCy = b.cy; nearestRy = b.ry }
    })
    const ref = gRefs[nearestId as keyof typeof gRefs]
    gsap.killTweensOf(ref.current, 'y,scaleX,scaleY')
    gsap.fromTo(ref.current,
      { scaleX: 1.35, scaleY: 0.65, y: 10 },
      {
        scaleX: 1, scaleY: 1, y: 0,
        duration: 0.7, ease: 'elastic.out(1.2, 0.4)',
        transformOrigin: `${nearestCx}px ${nearestCy + nearestRy}px`,
        onComplete: () => gsap.to(ref.current, {
          y: -9, duration: 1.6, yoyo: true, repeat: -1, ease: 'sine.inOut',
        }),
      }
    )
  }

  const bo = passwordFocused ? 0.55 : 0  // blush opacity

  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <svg
        ref={svgRef}
        viewBox="0 0 200 220"
        className="w-full h-full cursor-pointer"
        onClick={handleClick}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="gPink" cx="32%" cy="25%" r="70%">
            <stop offset="0%"   stopColor="#ffd6dc"/>
            <stop offset="45%"  stopColor="#f9a8b4"/>
            <stop offset="100%" stopColor="#e05c7a"/>
          </radialGradient>
          <radialGradient id="gTeal" cx="30%" cy="22%" r="72%">
            <stop offset="0%"   stopColor="#ccfbf1"/>
            <stop offset="40%"  stopColor="#6ee7b7"/>
            <stop offset="100%" stopColor="#0d9488"/>
          </radialGradient>
          <radialGradient id="gYellow" cx="30%" cy="25%" r="68%">
            <stop offset="0%"   stopColor="#fef9c3"/>
            <stop offset="45%"  stopColor="#fde047"/>
            <stop offset="100%" stopColor="#ca8a04"/>
          </radialGradient>
          <radialGradient id="gCyan" cx="30%" cy="24%" r="72%">
            <stop offset="0%"   stopColor="#e0f7ff"/>
            <stop offset="42%"  stopColor="#7dd3fc"/>
            <stop offset="100%" stopColor="#0369a1"/>
          </radialGradient>
          <radialGradient id="gPurple" cx="30%" cy="25%" r="70%">
            <stop offset="0%"   stopColor="#ede9fe"/>
            <stop offset="42%"  stopColor="#a78bfa"/>
            <stop offset="100%" stopColor="#6d28d9"/>
          </radialGradient>
        </defs>

        {/* Ground shadows */}
        {BLOBS.map(b => (
          <ellipse key={`s-${b.id}`} cx={b.cx} cy={b.cy + b.ry + 3} rx={b.rx * 0.7} ry={6} fill="rgba(0,0,0,0.1)" />
        ))}

        {/* ── Render each blob ── */}
        {BLOBS.map(b => {
          const [lRef, rRef] = eyeRefs[b.id]
          const gRef = gRefs[b.id as keyof typeof gRefs]
          return (
            <g key={b.id} ref={gRef}>
              {/* Body */}
              <ellipse cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill={`url(#${b.gradient})`} />

              {/* Speckles (teal only) */}
              {'speckles' in b && b.speckles?.map((sp, i) => (
                <circle key={i} cx={sp.x} cy={sp.y} r={sp.r} fill="rgba(0,100,80,0.25)" />
              ))}

              {/* Specular highlight — large glossy blob */}
              <ellipse
                cx={b.hl.x} cy={b.hl.y} rx={b.hl.rx} ry={b.hl.ry}
                fill="rgba(255,255,255,0.72)"
                transform={`rotate(${b.hl.angle},${b.hl.x},${b.hl.y})`}
              />
              {/* Bright inner core of highlight */}
              <ellipse
                cx={b.hl.x - 2} cy={b.hl.y - 2} rx={b.hl.rx * 0.45} ry={b.hl.ry * 0.45}
                fill="rgba(255,255,255,0.55)"
                transform={`rotate(${b.hl.angle},${b.hl.x - 2},${b.hl.y - 2})`}
              />

              {/* Blush */}
              <ellipse cx={b.blush.lx} cy={b.blush.ly} rx={b.rx * 0.22} ry={b.ry * 0.18}
                fill={b.blush.color} opacity={bo} style={{ transition: 'opacity 0.4s' }} />
              <ellipse cx={b.blush.rx_} cy={b.blush.ry_} rx={b.rx * 0.22} ry={b.ry * 0.18}
                fill={b.blush.color} opacity={bo} style={{ transition: 'opacity 0.4s' }} />

              {/* Eyes — always rendered for ref tracking */}
              <circle ref={lRef} cx={b.eyeL.x} cy={b.eyeL.y} r={b.eyeL.r}
                fill={passwordFocused ? 'none' : '#111'} style={{ transition: 'fill 0.2s' }} />
              <circle ref={rRef} cx={b.eyeR.x} cy={b.eyeR.y} r={b.eyeR.r}
                fill={passwordFocused ? 'none' : '#111'} style={{ transition: 'fill 0.2s' }} />

              {/* Closed eyes arc (shown on password focus) */}
              <path
                d={`M${b.eyeL.x - b.eyeL.r},${b.eyeL.y} Q${b.eyeL.x},${b.eyeL.y - b.eyeL.r * 1.4} ${b.eyeL.x + b.eyeL.r},${b.eyeL.y}`}
                stroke="#111" strokeWidth={b.eyeL.r * 0.55} fill="none" strokeLinecap="round"
                opacity={passwordFocused ? 1 : 0} style={{ transition: 'opacity 0.3s' }}
              />
              <path
                d={`M${b.eyeR.x - b.eyeR.r},${b.eyeR.y} Q${b.eyeR.x},${b.eyeR.y - b.eyeR.r * 1.4} ${b.eyeR.x + b.eyeR.r},${b.eyeR.y}`}
                stroke="#111" strokeWidth={b.eyeR.r * 0.55} fill="none" strokeLinecap="round"
                opacity={passwordFocused ? 1 : 0} style={{ transition: 'opacity 0.3s' }}
              />

              {/* Mouth */}
              <path
                d={passwordFocused ? b.mouth.dc : b.mouth.d}
                stroke="#222" strokeWidth={b.eyeL.r * 0.48} fill="none" strokeLinecap="round"
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
