'use client'

import { useEffect, useRef } from 'react'

interface Props {
  passwordFocused: boolean
}

export default function LoginCharacter({ passwordFocused }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const leftPupilRef = useRef<SVGCircleElement>(null)
  const rightPupilRef = useRef<SVGCircleElement>(null)

  // Eye tracking — disabled when password is focused
  useEffect(() => {
    if (passwordFocused) return

    const EYE_CENTERS = [
      { el: leftPupilRef,  cx: 62,  cy: 88, baseX: 62,  baseY: 88  },
      { el: rightPupilRef, cx: 108, cy: 88, baseX: 108, baseY: 88  },
    ]

    const onMove = (e: MouseEvent) => {
      if (!svgRef.current) return
      const rect = svgRef.current.getBoundingClientRect()

      EYE_CENTERS.forEach(({ el, cx, cy }) => {
        if (!el.current) return
        // Map SVG coords to screen space
        const scx = rect.left + (cx / 170) * rect.width
        const scy = rect.top  + (cy / 190) * rect.height
        const dx = e.clientX - scx
        const dy = e.clientY - scy
        const angle = Math.atan2(dy, dx)
        const dist  = Math.min(Math.hypot(dx, dy), 80)
        const offset = (dist / 80) * 4.5
        el.current.setAttribute('cx', String(cx + Math.cos(angle) * offset))
        el.current.setAttribute('cy', String(cy + Math.sin(angle) * offset))
      })
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [passwordFocused])

  // Reset pupils to center when password focused
  useEffect(() => {
    if (passwordFocused) {
      leftPupilRef.current?.setAttribute('cx', '62')
      leftPupilRef.current?.setAttribute('cy', '88')
      rightPupilRef.current?.setAttribute('cx', '108')
      rightPupilRef.current?.setAttribute('cy', '88')
    }
  }, [passwordFocused])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 170 190"
      className="w-full h-full select-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bear ears */}
      <circle cx="42"  cy="42" r="22" fill="#f5c842" />
      <circle cx="128" cy="42" r="22" fill="#f5c842" />
      <circle cx="42"  cy="42" r="13" fill="#e8a020" />
      <circle cx="128" cy="42" r="13" fill="#e8a020" />

      {/* Head */}
      <circle cx="85" cy="105" r="72" fill="#fde68a" />

      {/* Muzzle */}
      <ellipse cx="85" cy="124" rx="26" ry="18" fill="#fbbf24" opacity="0.5" />

      {/* Blush — visible only when password focused */}
      <ellipse cx="42" cy="118" rx="18" ry="11" fill="#fb7185" opacity={passwordFocused ? 0.45 : 0} style={{ transition: 'opacity 0.4s' }} />
      <ellipse cx="128" cy="118" rx="18" ry="11" fill="#fb7185" opacity={passwordFocused ? 0.45 : 0} style={{ transition: 'opacity 0.4s' }} />

      {/* ── Open eyes ── */}
      {!passwordFocused && (
        <>
          {/* Left eye white */}
          <circle cx="62" cy="88" r="14" fill="white" />
          {/* Left pupil */}
          <circle ref={leftPupilRef} cx="62" cy="88" r="7.5" fill="#1c1917" />
          {/* Left shine */}
          <circle cx="65" cy="84" r="2.5" fill="white" />

          {/* Right eye white */}
          <circle cx="108" cy="88" r="14" fill="white" />
          {/* Right pupil */}
          <circle ref={rightPupilRef} cx="108" cy="88" r="7.5" fill="#1c1917" />
          {/* Right shine */}
          <circle cx="111" cy="84" r="2.5" fill="white" />
        </>
      )}

      {/* ── Closed eyes (password) ── */}
      {passwordFocused && (
        <>
          {/* Closed arcs */}
          <path d="M 48 88 Q 62 76 76 88" stroke="#92400e" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 94 88 Q 108 76 122 88" stroke="#92400e" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Lower lashes */}
          <path d="M 50 90 Q 62 98 74 90" stroke="#92400e" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
          <path d="M 96 90 Q 108 98 120 90" stroke="#92400e" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
        </>
      )}

      {/* Nose */}
      <ellipse cx="85" cy="108" rx="5" ry="3.5" fill="#b45309" />

      {/* Mouth */}
      {!passwordFocused
        ? <path d="M 72 120 Q 85 132 98 120" stroke="#92400e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        : <path d="M 74 122 Q 85 118 96 122" stroke="#92400e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      }

      {/* Sweat drop when password focused */}
      {passwordFocused && (
        <g opacity="0.7">
          <path d="M 138 70 Q 142 82 138 90 Q 134 82 138 70 Z" fill="#93c5fd" />
        </g>
      )}
    </svg>
  )
}
