'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface Props {
  passwordFocused: boolean
}

export default function LoginSlime({ passwordFocused }: Props) {
  const containerRef  = useRef<HTMLDivElement>(null)
  const svgRef        = useRef<SVGSVGElement>(null)
  const bodyGroupRef  = useRef<SVGGElement>(null)   // whole slime (squish/lean)
  const eyeGroupRef   = useRef<SVGGElement>(null)   // eyes layer
  const leftPupilRef  = useRef<SVGCircleElement>(null)
  const rightPupilRef = useRef<SVGCircleElement>(null)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const idleCtxRef    = useRef<gsap.Context | null>(null)
  const idleTlRef     = useRef<gsap.core.Tween | null>(null)

  /* ── Idle bobbing ────────────────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      idleTlRef.current = gsap.to(bodyGroupRef.current, {
        y: -10,
        scaleY: 0.94,
        scaleX: 1.06,
        duration: 1.1,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: 'bottom center',
      })
    }, containerRef)
    idleCtxRef.current = ctx
    return () => ctx.revert()
  }, [])

  /* ── Eye tracking + body lean ────────────────────────────────────────── */
  useEffect(() => {
    if (passwordFocused) {
      gsap.to(bodyGroupRef.current, { rotation: 0, skewX: 0, x: 0, duration: 0.4 })
      return
    }

    const onMove = (e: MouseEvent) => {
      if (!svgRef.current) return
      const rect = svgRef.current.getBoundingClientRect()

      // Eye center positions in SVG space (viewBox 0 0 160 190)
      const trackPupil = (el: SVGCircleElement | null, ecx: number, ecy: number) => {
        if (!el) return
        const sx = rect.left + (ecx / 160) * rect.width
        const sy = rect.top  + (ecy / 190) * rect.height
        const dx = e.clientX - sx
        const dy = e.clientY - sy
        const ang = Math.atan2(dy, dx)
        const ratio = Math.min(Math.hypot(dx, dy), 120) / 120
        el.setAttribute('cx', String(ecx + Math.cos(ang) * 4.5 * ratio))
        el.setAttribute('cy', String(ecy + Math.sin(ang) * 3.5 * ratio))
      }
      trackPupil(leftPupilRef.current,  55, 90)
      trackPupil(rightPupilRef.current, 105, 90)

      // Lean body toward cursor
      const cx = rect.left + rect.width / 2
      const cy = rect.top  + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      const pull = Math.min(dist, 280) / 280
      gsap.to(bodyGroupRef.current, {
        rotation: (dx / (dist || 1)) * 9 * pull,
        skewX:    (dx / (dist || 1)) * 5 * pull,
        x:        (dx / (dist || 1)) * 7 * pull,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    const onLeave = () => {
      gsap.to(bodyGroupRef.current, { rotation: 0, skewX: 0, x: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [passwordFocused])

  /* ── Click: squish + ripple ──────────────────────────────────────────── */
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    // Squish flatten → bounce up
    gsap.killTweensOf(bodyGroupRef.current, 'scaleY,scaleX,y')
    gsap.fromTo(bodyGroupRef.current,
      { scaleY: 0.55, scaleX: 1.45, y: 12 },
      {
        scaleY: 1, scaleX: 1, y: 0,
        duration: 0.75,
        ease: 'elastic.out(1.3, 0.4)',
        transformOrigin: 'bottom center',
        onComplete: () => {
          // Resume idle after bounce
          gsap.to(bodyGroupRef.current, {
            y: -10, scaleY: 0.94, scaleX: 1.06,
            duration: 1.1, yoyo: true, repeat: -1, ease: 'sine.inOut',
            transformOrigin: 'bottom center',
          })
        },
      }
    )
    // Ripple at click point
    const rect = svgRef.current!.getBoundingClientRect()
    const rx = ((e.clientX - rect.left) / rect.width) * 160
    const ry = ((e.clientY - rect.top)  / rect.height) * 190
    const id = Date.now()
    setRipples(r => [...r, { id, x: rx, y: ry }])
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 700)
  }

  /* ── Password-focus reaction ─────────────────────────────────────────── */
  useEffect(() => {
    if (passwordFocused) {
      gsap.to(bodyGroupRef.current, { y: -4, scaleY: 0.97, scaleX: 1.03, duration: 0.3, transformOrigin: 'bottom center' })
    }
  }, [passwordFocused])

  return (
    <div ref={containerRef} className="w-full h-full flex items-end justify-center pb-2">
      <svg
        ref={svgRef}
        viewBox="0 0 160 190"
        className="w-36 h-40 cursor-pointer drop-shadow-lg"
        onClick={handleClick}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="sg" cx="38%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#a5f3fc" />
            <stop offset="55%"  stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0891b2" />
          </radialGradient>
          <radialGradient id="sg2" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#67e8f9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Shadow */}
        <ellipse cx="80" cy="174" rx="38" ry="7" fill="rgba(0,0,0,0.18)" />

        {/* Whole slime group — squish / lean applied here */}
        <g ref={bodyGroupRef} style={{ transformOrigin: '80px 160px' }}>

          {/* Antenna / topknot */}
          <path d="M74,42 C72,24 76,14 80,18 C84,14 88,24 86,42"
            fill="none" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" />
          <circle cx="80" cy="14" r="6" fill="#67e8f9" filter="url(#glow)" />

          {/* Bottom drip tendrils */}
          <path d="M58,148 Q54,162 58,172 Q62,180 66,172 Q70,162 66,148 Z" fill="url(#sg)" opacity="0.7" />
          <path d="M94,150 Q90,163 94,172 Q98,179 101,172 Q104,163 100,150 Z" fill="url(#sg)" opacity="0.6" />

          {/* Main body */}
          <path
            d="M80,38 C52,38 24,56 24,88 C24,118 46,148 80,148 C114,148 136,118 136,88 C136,56 108,38 80,38 Z"
            fill="url(#sg)"
          />
          {/* Inner glow overlay */}
          <path
            d="M80,38 C52,38 24,56 24,88 C24,118 46,148 80,148 C114,148 136,118 136,88 C136,56 108,38 80,38 Z"
            fill="url(#sg2)"
          />
          {/* Specular highlight */}
          <ellipse cx="58" cy="62" rx="18" ry="11" fill="rgba(255,255,255,0.45)" transform="rotate(-20,58,62)" />
          <ellipse cx="66" cy="56" rx="7" ry="4" fill="rgba(255,255,255,0.6)" transform="rotate(-20,66,56)" />

          {/* Blush */}
          <ellipse cx="42" cy="108" rx="14" ry="9" fill="#fb7185" opacity={passwordFocused ? 0.45 : 0} style={{ transition: 'opacity 0.4s' }} />
          <ellipse cx="118" cy="108" rx="14" ry="9" fill="#fb7185" opacity={passwordFocused ? 0.45 : 0} style={{ transition: 'opacity 0.4s' }} />

          {/* Eyes group */}
          <g ref={eyeGroupRef}>
            {!passwordFocused ? (
              <>
                {/* Left eye */}
                <circle cx="55" cy="90" r="14" fill="white" />
                <circle ref={leftPupilRef} cx="55" cy="90" r="8" fill="#164e63" />
                <circle cx="58" cy="86" r="3" fill="white" />
                <circle cx="54" cy="93" r="1.5" fill="white" opacity="0.6" />
                {/* Right eye */}
                <circle cx="105" cy="90" r="14" fill="white" />
                <circle ref={rightPupilRef} cx="105" cy="90" r="8" fill="#164e63" />
                <circle cx="108" cy="86" r="3" fill="white" />
                <circle cx="104" cy="93" r="1.5" fill="white" opacity="0.6" />
              </>
            ) : (
              <>
                {/* Closed — curved arcs */}
                <path d="M41,90 Q55,78 69,90" stroke="#164e63" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M41,92 Q55,100 69,92" stroke="#164e63" strokeWidth="2" fill="rgba(255,255,255,0.15)" strokeLinecap="round" />
                <path d="M91,90 Q105,78 119,90" stroke="#164e63" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M91,92 Q105,100 119,92" stroke="#164e63" strokeWidth="2" fill="rgba(255,255,255,0.15)" strokeLinecap="round" />
              </>
            )}
          </g>

          {/* Mouth */}
          {!passwordFocused
            ? <path d="M66,114 Q80,124 94,114" stroke="#164e63" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            : <path d="M68,116 Q80,112 92,116" stroke="#164e63" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          }

          {/* Sweat drop */}
          {passwordFocused && (
            <path d="M124,74 Q128,84 124,92 Q120,84 124,74 Z" fill="#a5f3fc" opacity="0.8" />
          )}

          {/* Click ripples */}
          {ripples.map(rp => (
            <circle key={rp.id} cx={rp.x} cy={rp.y} r="0" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
              <animate attributeName="r"     from="0" to="30" dur="0.6s" fill="freeze" />
              <animate attributeName="opacity" from="0.7" to="0" dur="0.6s" fill="freeze" />
            </circle>
          ))}
        </g>
      </svg>
    </div>
  )
}
