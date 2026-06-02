'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface Props {
  passwordFocused: boolean
}

export default function LoginSlime({ passwordFocused }: Props) {
  const containerRef  = useRef<HTMLDivElement>(null)
  const svgRef        = useRef<SVGSVGElement>(null)
  const bodyGroupRef  = useRef<SVGGElement>(null)
  const leftPupilRef  = useRef<SVGCircleElement>(null)
  const rightPupilRef = useRef<SVGCircleElement>(null)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  /* ── Idle bounce ─────────────────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bodyGroupRef.current, {
        y: -8, scaleY: 0.95, scaleX: 1.05,
        duration: 1.3, yoyo: true, repeat: -1, ease: 'sine.inOut',
        transformOrigin: '100px 185px',
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  /* ── Mouse interactions ───────────────────────────────────────────────── */
  useEffect(() => {
    if (passwordFocused) {
      gsap.to(bodyGroupRef.current, { rotation: 0, skewX: 0, x: 0, duration: 0.5 })
      return
    }

    const onMove = (e: MouseEvent) => {
      if (!svgRef.current) return
      const rect = svgRef.current.getBoundingClientRect()

      // Pupil tracking (SVG coords: viewBox 200 × 220)
      const track = (el: SVGCircleElement | null, ecx: number, ecy: number) => {
        if (!el) return
        const sx = rect.left + (ecx / 200) * rect.width
        const sy = rect.top  + (ecy / 220) * rect.height
        const dx = e.clientX - sx
        const dy = e.clientY - sy
        const ang = Math.atan2(dy, dx)
        const ratio = Math.min(Math.hypot(dx, dy), 150) / 150
        el.setAttribute('cx', String(ecx + Math.cos(ang) * 5 * ratio))
        el.setAttribute('cy', String(ecy + Math.sin(ang) * 4 * ratio))
      }
      track(leftPupilRef.current,  68, 122)
      track(rightPupilRef.current, 132, 122)

      // Body lean
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy) || 1
      const pull = Math.min(dist, 300) / 300
      gsap.to(bodyGroupRef.current, {
        rotation: (dx / dist) * 8 * pull,
        skewX:    (dx / dist) * 4 * pull,
        x:        (dx / dist) * 6 * pull,
        duration: 0.3, ease: 'power2.out', overwrite: 'auto',
      })
    }

    const onLeave = () =>
      gsap.to(bodyGroupRef.current, { rotation: 0, skewX: 0, x: 0, duration: 0.9, ease: 'elastic.out(1,0.4)' })

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [passwordFocused])

  /* ── Click squish + ripple ───────────────────────────────────────────── */
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    gsap.killTweensOf(bodyGroupRef.current, 'scaleY,scaleX,y')
    gsap.fromTo(bodyGroupRef.current,
      { scaleY: 0.5, scaleX: 1.5, y: 16 },
      {
        scaleY: 1, scaleX: 1, y: 0, duration: 0.8,
        ease: 'elastic.out(1.4, 0.4)',
        transformOrigin: '100px 185px',
        onComplete: () => gsap.to(bodyGroupRef.current, {
          y: -8, scaleY: 0.95, scaleX: 1.05,
          duration: 1.3, yoyo: true, repeat: -1, ease: 'sine.inOut',
          transformOrigin: '100px 185px',
        }),
      }
    )
    const rect = svgRef.current!.getBoundingClientRect()
    const id = Date.now()
    setRipples(r => [...r, {
      id,
      x: ((e.clientX - rect.left) / rect.width)  * 200,
      y: ((e.clientY - rect.top)  / rect.height) * 220,
    }])
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 700)
  }

  return (
    <div ref={containerRef} className="w-full h-full flex items-end justify-center pb-1 cursor-pointer select-none">
      <svg
        ref={svgRef}
        viewBox="0 0 200 220"
        className="w-full h-full drop-shadow-xl"
        onClick={handleClick}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main body gradient */}
          <radialGradient id="bodyG" cx="36%" cy="26%" r="72%">
            <stop offset="0%"   stopColor="#bfdbfe" />
            <stop offset="35%"  stopColor="#60a5fa" />
            <stop offset="75%"  stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>
          {/* Inner translucent glow */}
          <radialGradient id="innerG" cx="50%" cy="65%" r="60%">
            <stop offset="0%"   stopColor="#93c5fd" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0"    />
          </radialGradient>
          {/* Eye iris */}
          <radialGradient id="irisG" cx="32%" cy="28%" r="65%">
            <stop offset="0%"   stopColor="#7dd3fc" />
            <stop offset="45%"  stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </radialGradient>
          {/* Blush */}
          <radialGradient id="blushG" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#fb7185" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fb7185" stopOpacity="0"   />
          </radialGradient>
          {/* Shadow */}
          <radialGradient id="shadowG" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#1e3a8a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0"   />
          </radialGradient>
        </defs>

        <g ref={bodyGroupRef}>
          {/* ── Ground shadow ── */}
          <ellipse cx="100" cy="210" rx="60" ry="9" fill="url(#shadowG)" />

          {/* ── Water splashes on sides ── */}
          {/* Left splash arm */}
          <path d="M28,145 C14,130 8,110 18,98 C24,90 34,92 36,102 C30,112 32,128 40,142 Z"
            fill="#60a5fa" opacity="0.75" />
          <path d="M22,135 C10,122 6,108 14,98 C18,92 26,93 28,101 C22,111 24,124 30,135 Z"
            fill="#93c5fd" opacity="0.5" />
          {/* Right splash arm */}
          <path d="M172,145 C186,130 192,110 182,98 C176,90 166,92 164,102 C170,112 168,128 160,142 Z"
            fill="#60a5fa" opacity="0.75" />
          <path d="M178,135 C190,122 194,108 186,98 C182,92 174,93 172,101 C178,111 176,124 170,135 Z"
            fill="#93c5fd" opacity="0.5" />

          {/* Floating droplets */}
          <circle cx="12"  cy="90"  r="5.5" fill="#bfdbfe" opacity="0.85" />
          <circle cx="6"   cy="108" r="3.5" fill="#93c5fd" opacity="0.7"  />
          <circle cx="18"  cy="75"  r="3"   fill="#dbeafe" opacity="0.65" />
          <circle cx="188" cy="88"  r="5"   fill="#bfdbfe" opacity="0.85" />
          <circle cx="194" cy="106" r="3.5" fill="#93c5fd" opacity="0.7"  />
          <circle cx="182" cy="74"  r="3"   fill="#dbeafe" opacity="0.65" />

          {/* ── Main body ── */}
          <path
            d="M100,28 C62,28 22,55 22,102 C22,150 55,192 100,192 C145,192 178,150 178,102 C178,55 138,28 100,28 Z"
            fill="url(#bodyG)"
          />
          {/* Inner glow overlay for depth */}
          <path
            d="M100,28 C62,28 22,55 22,102 C22,150 55,192 100,192 C145,192 178,150 178,102 C178,55 138,28 100,28 Z"
            fill="url(#innerG)"
          />

          {/* ── Body highlights ── */}
          {/* Large specular blob */}
          <ellipse cx="70" cy="70" rx="34" ry="20" fill="rgba(255,255,255,0.52)" transform="rotate(-22,70,70)" />
          {/* Bright core */}
          <ellipse cx="62" cy="62" rx="14" ry="9"  fill="rgba(255,255,255,0.78)" transform="rotate(-22,62,62)" />
          {/* Tiny secondary */}
          <circle  cx="138" cy="55" r="8"            fill="rgba(255,255,255,0.22)" />
          {/* Small bubble details */}
          <circle cx="38"  cy="138" r="6" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          <circle cx="30"  cy="120" r="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)"  strokeWidth="1" />
          <circle cx="162" cy="140" r="5" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />

          {/* ── Blush cheeks ── */}
          <ellipse cx="46"  cy="140" rx="20" ry="12" fill="url(#blushG)" opacity={passwordFocused ? 1 : 0} style={{ transition: 'opacity 0.4s' }} />
          <ellipse cx="154" cy="140" rx="20" ry="12" fill="url(#blushG)" opacity={passwordFocused ? 1 : 0} style={{ transition: 'opacity 0.4s' }} />

          {/* ── Eyes ── */}
          {!passwordFocused ? (
            <>
              {/* Left eye */}
              <circle cx="68" cy="118" r="28" fill="white" />
              <circle cx="68" cy="120" r="20" fill="url(#irisG)" />
              <circle ref={leftPupilRef} cx="68" cy="122" r="12" fill="#052e4a" />
              {/* highlights */}
              <circle cx="58"  cy="110" r="7"   fill="white" />
              <circle cx="76"  cy="113" r="3.5" fill="white" opacity="0.65" />
              <circle cx="62"  cy="130" r="2"   fill="white" opacity="0.4"  />
              {/* Eyelid top shade */}
              <path d="M40,118 Q68,96 96,118" fill="rgba(0,60,120,0.08)" />

              {/* Right eye */}
              <circle cx="132" cy="118" r="28" fill="white" />
              <circle cx="132" cy="120" r="20" fill="url(#irisG)" />
              <circle ref={rightPupilRef} cx="132" cy="122" r="12" fill="#052e4a" />
              <circle cx="122" cy="110" r="7"   fill="white" />
              <circle cx="140" cy="113" r="3.5" fill="white" opacity="0.65" />
              <circle cx="126" cy="130" r="2"   fill="white" opacity="0.4"  />
              <path d="M104,118 Q132,96 160,118" fill="rgba(0,60,120,0.08)" />
            </>
          ) : (
            <>
              {/* Closed / squinting eyes */}
              <path d="M40,118 Q68,104 96,118"  stroke="#0c4a6e" strokeWidth="4" fill="rgba(255,255,255,0.1)" strokeLinecap="round" />
              <path d="M40,120 Q68,132 96,120"  stroke="#0c4a6e" strokeWidth="2.5" fill="rgba(255,255,255,0.08)" strokeLinecap="round" />
              <path d="M104,118 Q132,104 160,118" stroke="#0c4a6e" strokeWidth="4" fill="rgba(255,255,255,0.1)" strokeLinecap="round" />
              <path d="M104,120 Q132,132 160,120" stroke="#0c4a6e" strokeWidth="2.5" fill="rgba(255,255,255,0.08)" strokeLinecap="round" />
            </>
          )}

          {/* ── Mouth ── */}
          {!passwordFocused
            ? <path d="M76,160 Q100,174 124,160" stroke="#1e40af" strokeWidth="3" fill="rgba(147,197,253,0.25)" strokeLinecap="round" />
            : <path d="M80,163 Q100,158 120,163" stroke="#1e40af" strokeWidth="3" fill="none" strokeLinecap="round" />
          }

          {/* Sweat drop */}
          {passwordFocused && (
            <g>
              <path d="M152,72 Q157,84 152,94 Q147,84 152,72 Z" fill="#93c5fd" opacity="0.85" />
              <circle cx="152" cy="72" r="2.5" fill="#bfdbfe" opacity="0.7" />
            </g>
          )}

          {/* Click ripples */}
          {ripples.map(rp => (
            <circle key={rp.id} cx={rp.x} cy={rp.y} r="0" fill="none" stroke="rgba(191,219,254,0.7)" strokeWidth="2.5">
              <animate attributeName="r"       from="0"   to="32"  dur="0.65s" fill="freeze" />
              <animate attributeName="opacity" from="0.8" to="0"   dur="0.65s" fill="freeze" />
            </circle>
          ))}
        </g>
      </svg>
    </div>
  )
}
