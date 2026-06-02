'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Props { passwordFocused: boolean }

// Pupil helper: move a pupil toward cursor within maxOffset px
function trackPupil(
  el: SVGCircleElement | null,
  ecx: number, ecy: number,
  rect: DOMRect,
  vw: number, vh: number,
  mx: number, my: number,
  maxOffset: number,
) {
  if (!el) return
  const sx = rect.left + (ecx / vw) * rect.width
  const sy = rect.top  + (ecy / vh) * rect.height
  const dx = mx - sx, dy = my - sy
  const ang = Math.atan2(dy, dx)
  const ratio = Math.min(Math.hypot(dx, dy), 160) / 160
  el.setAttribute('cx', String(ecx + Math.cos(ang) * maxOffset * ratio))
  el.setAttribute('cy', String(ecy + Math.sin(ang) * maxOffset * ratio))
}

export default function LoginGeoPals({ passwordFocused }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)

  // Shape group refs (for idle animation)
  const circleGRef = useRef<SVGGElement>(null)
  const triGRef    = useRef<SVGGElement>(null)
  const sqGRef     = useRef<SVGGElement>(null)
  const dotGRef    = useRef<SVGGElement>(null)

  // Pupil refs — always rendered, moved by mouse
  const cLP = useRef<SVGCircleElement>(null)  // circle left pupil
  const cRP = useRef<SVGCircleElement>(null)
  const tLP = useRef<SVGCircleElement>(null)  // triangle left pupil
  const tRP = useRef<SVGCircleElement>(null)
  const sLP = useRef<SVGCircleElement>(null)  // square left pupil
  const sRP = useRef<SVGCircleElement>(null)

  /* ── Idle bobbing ─────────────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(circleGRef.current, { y: -10, duration: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      gsap.to(triGRef.current,    { y: -8, rotation:  6, duration: 1.9, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '52px 78px', delay: 0.3 })
      gsap.to(sqGRef.current,     { y: -7, rotation: -5, duration: 1.2, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '155px 55px', delay: 0.7 })
      gsap.to(dotGRef.current,    { y: -5, duration: 2.1, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.0 })
    })
    return () => ctx.revert()
  }, [])

  /* ── Mouse eye tracking ───────────────────────────────────────────── */
  useEffect(() => {
    if (passwordFocused) return
    const VW = 200, VH = 240
    const onMove = (e: MouseEvent) => {
      const rect = svgRef.current?.getBoundingClientRect()
      if (!rect) return
      // circle eyes at (85,178) and (115,178)
      trackPupil(cLP.current,  85, 178, rect, VW, VH, e.clientX, e.clientY, 5)
      trackPupil(cRP.current, 115, 178, rect, VW, VH, e.clientX, e.clientY, 5)
      // triangle eyes at (43,67) and (61,67)
      trackPupil(tLP.current,  43, 67, rect, VW, VH, e.clientX, e.clientY, 3)
      trackPupil(tRP.current,  61, 67, rect, VW, VH, e.clientX, e.clientY, 3)
      // square eyes at (143,52) and (167,52)
      trackPupil(sLP.current, 143, 52, rect, VW, VH, e.clientX, e.clientY, 3.5)
      trackPupil(sRP.current, 167, 52, rect, VW, VH, e.clientX, e.clientY, 3.5)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [passwordFocused])

  /* ── Shared style helpers ─────────────────────────────────────────── */
  const blushO = passwordFocused ? 0.5 : 0

  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <svg ref={svgRef} viewBox="0 0 200 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Circle — sky blue */}
          <radialGradient id="gC" cx="35%" cy="28%" r="72%">
            <stop offset="0%"   stopColor="#bae6fd"/>
            <stop offset="40%"  stopColor="#38bdf8"/>
            <stop offset="100%" stopColor="#0369a1"/>
          </radialGradient>
          {/* Triangle — sunny yellow */}
          <radialGradient id="gT" cx="38%" cy="28%" r="68%">
            <stop offset="0%"   stopColor="#fef9c3"/>
            <stop offset="45%"  stopColor="#fde047"/>
            <stop offset="100%" stopColor="#ca8a04"/>
          </radialGradient>
          {/* Square — coral pink */}
          <radialGradient id="gS" cx="35%" cy="28%" r="68%">
            <stop offset="0%"   stopColor="#fecdd3"/>
            <stop offset="45%"  stopColor="#f472b6"/>
            <stop offset="100%" stopColor="#be185d"/>
          </radialGradient>
          {/* Dot — mint */}
          <radialGradient id="gD" cx="35%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#d1fae5"/>
            <stop offset="50%"  stopColor="#34d399"/>
            <stop offset="100%" stopColor="#065f46"/>
          </radialGradient>
        </defs>

        {/* ──────────────────────────────────────────────────────────────
            SMALL MINT DOT  (decorative, top-left)
        ────────────────────────────────────────────────────────────── */}
        <g ref={dotGRef}>
          <circle cx="22" cy="48" r="14" fill="url(#gD)"/>
          <ellipse cx="16" cy="41" rx="5" ry="3" fill="rgba(255,255,255,0.55)" transform="rotate(-20,16,41)"/>
          {/* Tiny face */}
          <circle cx="18" cy="48" r="2.5" fill="white"/>
          <circle cx="18" cy="48" r="1.5" fill="#065f46"/>
          <circle cx="26" cy="48" r="2.5" fill="white"/>
          <circle cx="26" cy="48" r="1.5" fill="#065f46"/>
          <path d="M17,53 Q22,57 27,53" stroke="#065f46" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </g>

        {/* ──────────────────────────────────────────────────────────────
            ROUNDED TRIANGLE  (yellow, upper-left)
        ────────────────────────────────────────────────────────────── */}
        <g ref={triGRef}>
          {/* Rounded triangle using cubic bezier */}
          <path
            d="M52,22 C50,22 36,46 27,62 C23,68 25,78 32,78 L72,78 C79,78 81,68 77,62 C68,46 54,22 52,22 Z"
            fill="url(#gT)"
          />
          {/* Specular */}
          <ellipse cx="42" cy="40" rx="10" ry="6" fill="rgba(255,255,255,0.55)" transform="rotate(-25,42,40)"/>
          <ellipse cx="38" cy="34" rx="4"  ry="2.5" fill="rgba(255,255,255,0.8)" transform="rotate(-25,38,34)"/>

          {/* Blush */}
          <ellipse cx="35" cy="70" rx="9"  ry="5.5" fill="#fb923c" opacity={blushO} style={{transition:'opacity 0.4s'}}/>
          <ellipse cx="69" cy="70" rx="9"  ry="5.5" fill="#fb923c" opacity={blushO} style={{transition:'opacity 0.4s'}}/>

          {/* Open eyes */}
          <circle cx="43" cy="64" r="9" fill="white" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle cx="43" cy="64" r="6" fill="#854d0e" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle ref={tLP} cx="43" cy="64" r="3.5" fill="#1c0a00" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle cx="40" cy="60" r="2" fill="white" opacity={passwordFocused ? 0 : 0.9} style={{transition:'opacity 0.3s'}}/>

          <circle cx="61" cy="64" r="9" fill="white" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle cx="61" cy="64" r="6" fill="#854d0e" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle ref={tRP} cx="61" cy="64" r="3.5" fill="#1c0a00" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle cx="58" cy="60" r="2" fill="white" opacity={passwordFocused ? 0 : 0.9} style={{transition:'opacity 0.3s'}}/>

          {/* Closed eyes overlay */}
          <path d="M34,64 Q43,55 52,64" stroke="#854d0e" strokeWidth="3" fill="rgba(254,249,195,0.3)" strokeLinecap="round" opacity={passwordFocused ? 1 : 0} style={{transition:'opacity 0.3s'}}/>
          <path d="M52,64 Q61,55 70,64" stroke="#854d0e" strokeWidth="3" fill="rgba(254,249,195,0.3)" strokeLinecap="round" opacity={passwordFocused ? 1 : 0} style={{transition:'opacity 0.3s'}}/>

          {/* Mouth */}
          <path
            d={passwordFocused ? "M44,72 Q52,69 60,72" : "M43,72 Q52,78 61,72"}
            stroke="#92400e" strokeWidth="2" fill="none" strokeLinecap="round"
          />
        </g>

        {/* ──────────────────────────────────────────────────────────────
            ROUNDED SQUARE  (pink, upper-right)
        ────────────────────────────────────────────────────────────── */}
        <g ref={sqGRef}>
          <rect x="122" y="18" width="66" height="66" rx="18" fill="url(#gS)"/>
          {/* Specular */}
          <ellipse cx="136" cy="30" rx="13" ry="8" fill="rgba(255,255,255,0.5)" transform="rotate(-18,136,30)"/>
          <ellipse cx="130" cy="25" rx="6"  ry="3.5" fill="rgba(255,255,255,0.75)" transform="rotate(-18,130,25)"/>

          {/* Blush */}
          <ellipse cx="130" cy="74" rx="10" ry="6" fill="#be185d" opacity={blushO} style={{transition:'opacity 0.4s'}}/>
          <ellipse cx="180" cy="74" rx="10" ry="6" fill="#be185d" opacity={blushO} style={{transition:'opacity 0.4s'}}/>

          {/* Open eyes */}
          <circle cx="143" cy="49" r="11" fill="white" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle cx="143" cy="49" r="7.5" fill="#831843" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle ref={sLP} cx="143" cy="49" r="4.5" fill="#1a0010" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle cx="138" cy="44" r="3" fill="white" opacity={passwordFocused ? 0 : 0.9} style={{transition:'opacity 0.3s'}}/>

          <circle cx="167" cy="49" r="11" fill="white" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle cx="167" cy="49" r="7.5" fill="#831843" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle ref={sRP} cx="167" cy="49" r="4.5" fill="#1a0010" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle cx="162" cy="44" r="3" fill="white" opacity={passwordFocused ? 0 : 0.9} style={{transition:'opacity 0.3s'}}/>

          {/* Closed eyes */}
          <path d="M132,49 Q143,38 154,49" stroke="#831843" strokeWidth="3.5" fill="rgba(254,205,211,0.3)" strokeLinecap="round" opacity={passwordFocused ? 1 : 0} style={{transition:'opacity 0.3s'}}/>
          <path d="M156,49 Q167,38 178,49" stroke="#831843" strokeWidth="3.5" fill="rgba(254,205,211,0.3)" strokeLinecap="round" opacity={passwordFocused ? 1 : 0} style={{transition:'opacity 0.3s'}}/>

          {/* Mouth */}
          <path
            d={passwordFocused ? "M148,66 Q155,63 162,66" : "M146,66 Q155,72 164,66"}
            stroke="#9d174d" strokeWidth="2.5" fill="none" strokeLinecap="round"
          />

          {/* Sweat drop when focused */}
          <path d="M186,28 Q190,36 186,44 Q182,36 186,28 Z" fill="#bae6fd" opacity={passwordFocused ? 0.8 : 0} style={{transition:'opacity 0.4s'}}/>
        </g>

        {/* ──────────────────────────────────────────────────────────────
            MAIN CIRCLE  (blue, center-bottom, largest)
        ────────────────────────────────────────────────────────────── */}
        <g ref={circleGRef}>
          <circle cx="100" cy="185" r="52" fill="url(#gC)"/>
          {/* Inner glow */}
          <circle cx="100" cy="185" r="52" fill="radial-gradient(circle,rgba(186,230,253,0.4),transparent)" opacity="0.5"/>
          {/* Specular highlights */}
          <ellipse cx="78"  cy="158" rx="20" ry="12" fill="rgba(255,255,255,0.5)" transform="rotate(-20,78,158)"/>
          <ellipse cx="70"  cy="150" rx="9"  ry="5.5" fill="rgba(255,255,255,0.8)" transform="rotate(-20,70,150)"/>
          <circle  cx="130" cy="162" r="7"   fill="rgba(255,255,255,0.2)"/>

          {/* Blush */}
          <ellipse cx="66"  cy="196" rx="16" ry="9" fill="#f472b6" opacity={blushO} style={{transition:'opacity 0.4s'}}/>
          <ellipse cx="134" cy="196" rx="16" ry="9" fill="#f472b6" opacity={blushO} style={{transition:'opacity 0.4s'}}/>

          {/* Open eyes */}
          <circle cx="85" cy="178" r="16" fill="white" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle cx="85" cy="178" r="11" fill="#075985" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle ref={cLP} cx="85" cy="178" r="6.5" fill="#001e2e" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle cx="78"  cy="171" r="4" fill="white" opacity={passwordFocused ? 0 : 0.95} style={{transition:'opacity 0.3s'}}/>
          <circle cx="89"  cy="175" r="2" fill="white" opacity={passwordFocused ? 0 : 0.65} style={{transition:'opacity 0.3s'}}/>

          <circle cx="115" cy="178" r="16" fill="white" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle cx="115" cy="178" r="11" fill="#075985" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle ref={cRP} cx="115" cy="178" r="6.5" fill="#001e2e" opacity={passwordFocused ? 0 : 1} style={{transition:'opacity 0.3s'}}/>
          <circle cx="108" cy="171" r="4" fill="white" opacity={passwordFocused ? 0 : 0.95} style={{transition:'opacity 0.3s'}}/>
          <circle cx="119" cy="175" r="2" fill="white" opacity={passwordFocused ? 0 : 0.65} style={{transition:'opacity 0.3s'}}/>

          {/* Closed eyes */}
          <path d="M69,178 Q85,163 101,178" stroke="#075985" strokeWidth="4" fill="rgba(186,230,253,0.2)" strokeLinecap="round" opacity={passwordFocused ? 1 : 0} style={{transition:'opacity 0.3s'}}/>
          <path d="M69,181 Q85,193 101,181" stroke="#075985" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity={passwordFocused ? 1 : 0} style={{transition:'opacity 0.3s'}}/>
          <path d="M99,178 Q115,163 131,178" stroke="#075985" strokeWidth="4" fill="rgba(186,230,253,0.2)" strokeLinecap="round" opacity={passwordFocused ? 1 : 0} style={{transition:'opacity 0.3s'}}/>
          <path d="M99,181 Q115,193 131,181" stroke="#075985" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity={passwordFocused ? 1 : 0} style={{transition:'opacity 0.3s'}}/>

          {/* Mouth */}
          <path
            d={passwordFocused ? "M88,200 Q100,196 112,200" : "M86,200 Q100,212 114,200"}
            stroke="#0c4a6e" strokeWidth="3" fill={passwordFocused ? "none" : "rgba(186,230,253,0.3)"} strokeLinecap="round"
            style={{transition:'d 0.3s'}}
          />
          {/* Bottom bubble details */}
          <circle cx="58"  cy="208" r="5" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
          <circle cx="142" cy="210" r="4" fill="rgba(255,255,255,0.2)"  stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
        </g>

        {/* Floating stars (decorative) */}
        <g opacity="0.7">
          <circle cx="12" cy="165" r="4" fill="#fde047">
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="190" cy="140" r="3" fill="#f9a8d4">
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.7s" repeatCount="indefinite"/>
          </circle>
          <circle cx="8" cy="200" r="3" fill="#6ee7b7">
            <animate attributeName="opacity" values="0.5;0.15;0.5" dur="2.4s" repeatCount="indefinite"/>
          </circle>
        </g>
      </svg>
    </div>
  )
}
