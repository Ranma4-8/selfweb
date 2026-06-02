'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { WeatherTheme } from '@/lib/weather'

// ─── Sunny ────────────────────────────────────────────────────────────────────
function SunEffect() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Core glow pulse
      gsap.to('.sun-core', { scale: 1.08, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      // Rays rotate
      gsap.to('.sun-rays', { rotation: 360, duration: 18, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
      // Halo breathe
      gsap.to('.sun-halo', { scale: 1.15, opacity: 0.3, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      // Light shaft drift
      gsap.to('.sun-shaft', {
        opacity: 0,
        scaleY: 0.6,
        duration: 3,
        stagger: { each: 0.4, repeat: -1, yoyo: true },
        ease: 'sine.inOut',
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  const rayAngles = Array.from({ length: 12 }, (_, i) => i * 30)
  const shaftAngles = [15, 35, 55, 75]

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Light shafts from top-left */}
      {shaftAngles.map((angle, i) => (
        <div
          key={i}
          className="sun-shaft absolute top-0 left-0 origin-top-left opacity-20"
          style={{
            width: '2px',
            height: '110vh',
            background: 'linear-gradient(to bottom, rgba(251,191,36,0.8), transparent)',
            transform: `rotate(${angle}deg) translateX(${60 + i * 120}px)`,
          }}
        />
      ))}

      {/* Sun centered upper area */}
      <div className="absolute top-[12%] left-1/2 -translate-x-1/2">
        {/* Outer halo */}
        <div
          className="sun-halo absolute rounded-full opacity-20"
          style={{
            width: 260, height: 260,
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            background: 'radial-gradient(circle, rgba(251,191,36,0.5), transparent 70%)',
          }}
        />
        {/* Rays ring */}
        <div className="sun-rays absolute" style={{ width: 160, height: 160, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
          {rayAngles.map((angle) => (
            <div
              key={angle}
              className="absolute"
              style={{
                width: 2,
                height: 28,
                background: 'rgba(251,191,36,0.7)',
                borderRadius: 2,
                top: '50%',
                left: '50%',
                transformOrigin: '50% 100%',
                transform: `rotate(${angle}deg) translateX(-50%) translateY(-100%) translateY(-48px)`,
              }}
            />
          ))}
        </div>
        {/* Core */}
        <div
          className="sun-core rounded-full"
          style={{
            width: 80, height: 80,
            background: 'radial-gradient(circle at 40% 35%, #fef08a, #f59e0b)',
            boxShadow: '0 0 40px 16px rgba(251,191,36,0.4)',
          }}
        />
      </div>
    </div>
  )
}

// ─── Rain ─────────────────────────────────────────────────────────────────────
function RainEffect({ heavy = false }: { heavy?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const count = heavy ? 80 : 50

  const drops = useRef(
    Array.from({ length: count }, (_, i) => ({
      left: `${Math.random() * 105}%`,
      delay: Math.random() * 2,
      dur: heavy ? 0.45 + Math.random() * 0.2 : 0.7 + Math.random() * 0.4,
      height: heavy ? 18 + Math.random() * 10 : 12 + Math.random() * 8,
      opacity: 0.25 + Math.random() * 0.35,
    }))
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      wrapRef.current!.querySelectorAll<HTMLElement>('.raindrop').forEach((el, i) => {
        const d = drops.current[i]
        gsap.fromTo(
          el,
          { y: '-10vh', opacity: d.opacity },
          {
            y: '105vh',
            opacity: d.opacity * 0.6,
            duration: d.dur,
            delay: d.delay,
            repeat: -1,
            ease: 'none',
          }
        )
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {drops.current.map((d, i) => (
        <div
          key={i}
          className="raindrop absolute"
          style={{
            left: d.left,
            top: 0,
            width: heavy ? 1.5 : 1,
            height: d.height,
            background: heavy
              ? 'linear-gradient(to bottom, transparent, rgba(147,197,253,0.9))'
              : 'linear-gradient(to bottom, transparent, rgba(186,230,253,0.8))',
            borderRadius: 2,
            transform: heavy ? 'rotate(12deg)' : 'rotate(6deg)',
          }}
        />
      ))}
    </div>
  )
}

// ─── Snow ─────────────────────────────────────────────────────────────────────
function SnowEffect() {
  const wrapRef = useRef<HTMLDivElement>(null)

  const flakes = useRef(
    Array.from({ length: 45 }, () => ({
      left: `${Math.random() * 100}%`,
      size: 3 + Math.random() * 6,
      delay: Math.random() * 5,
      dur: 5 + Math.random() * 6,
      drift: (Math.random() - 0.5) * 80,
      opacity: 0.4 + Math.random() * 0.5,
    }))
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      wrapRef.current!.querySelectorAll<HTMLElement>('.snowflake').forEach((el, i) => {
        const f = flakes.current[i]
        gsap.fromTo(
          el,
          { y: '-5vh', x: 0, opacity: f.opacity, rotation: 0 },
          {
            y: '105vh',
            x: f.drift,
            opacity: f.opacity * 0.5,
            rotation: 360,
            duration: f.dur,
            delay: f.delay,
            repeat: -1,
            ease: 'none',
          }
        )
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {flakes.current.map((f, i) => (
        <div
          key={i}
          className="snowflake absolute rounded-full bg-white"
          style={{ left: f.left, top: 0, width: f.size, height: f.size }}
        />
      ))}
    </div>
  )
}

// ─── Clouds ───────────────────────────────────────────────────────────────────
function CloudEffect() {
  const wrapRef = useRef<HTMLDivElement>(null)

  const clouds = useRef([
    { top: '8%',  width: 320, blur: 28, opacity: 0.18, dur: 28, startX: '-20vw' },
    { top: '22%', width: 260, blur: 22, opacity: 0.13, dur: 38, startX: '110vw' },
    { top: '40%', width: 400, blur: 36, opacity: 0.10, dur: 50, startX: '-30vw' },
    { top: '6%',  width: 180, blur: 16, opacity: 0.22, dur: 22, startX: '80vw'  },
  ])

  useEffect(() => {
    const ctx = gsap.context(() => {
      wrapRef.current!.querySelectorAll<HTMLElement>('.cloud').forEach((el, i) => {
        const c = clouds.current[i]
        const goRight = i % 2 === 0
        gsap.fromTo(
          el,
          { x: c.startX },
          { x: goRight ? '130vw' : '-50vw', duration: c.dur, repeat: -1, ease: 'none' }
        )
        // gentle vertical bob
        gsap.to(el, { y: 12, duration: 6 + i * 2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {clouds.current.map((c, i) => (
        <div
          key={i}
          className="cloud absolute rounded-full"
          style={{
            top: c.top,
            width: c.width,
            height: c.width * 0.42,
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.9), rgba(200,210,220,0.5))',
            filter: `blur(${c.blur}px)`,
            opacity: c.opacity,
          }}
        />
      ))}
    </div>
  )
}

// ─── Storm ────────────────────────────────────────────────────────────────────
function StormEffect() {
  const lightningRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const flash = () => {
      if (!lightningRef.current) return
      const delay = 3 + Math.random() * 6
      gsap.delayedCall(delay, () => {
        gsap.fromTo(
          lightningRef.current,
          { opacity: 0.7 },
          {
            opacity: 0,
            duration: 0.12,
            yoyo: true,
            repeat: 3,
            ease: 'power2.out',
            onComplete: flash,
          }
        )
      })
    }
    flash()
  }, [])

  return (
    <>
      <div ref={lightningRef} className="absolute inset-0 pointer-events-none opacity-0 bg-indigo-100/20" />
      <RainEffect heavy />
    </>
  )
}

// ─── Fog ──────────────────────────────────────────────────────────────────────
function FogEffect() {
  const wrapRef = useRef<HTMLDivElement>(null)

  const bands = useRef([
    { top: '15%', height: 90,  opacity: 0.18, dur: 22, startX: '-40vw' },
    { top: '38%', height: 130, opacity: 0.14, dur: 30, startX: '20vw'  },
    { top: '60%', height: 100, opacity: 0.20, dur: 18, startX: '-10vw' },
    { top: '78%', height: 80,  opacity: 0.12, dur: 26, startX: '60vw'  },
  ])

  useEffect(() => {
    const ctx = gsap.context(() => {
      wrapRef.current!.querySelectorAll<HTMLElement>('.fog-band').forEach((el, i) => {
        const b = bands.current[i]
        const goRight = i % 2 === 0
        gsap.fromTo(
          el,
          { x: b.startX, opacity: b.opacity },
          {
            x: goRight ? '120vw' : '-120vw',
            duration: b.dur,
            repeat: -1,
            ease: 'none',
          }
        )
        gsap.to(el, { opacity: b.opacity * 0.4, duration: b.dur / 4, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {bands.current.map((b, i) => (
        <div
          key={i}
          className="fog-band absolute w-[200vw]"
          style={{
            top: b.top,
            height: b.height,
            background: 'linear-gradient(to right, transparent, rgba(200,210,215,0.9) 30%, rgba(200,210,215,0.9) 70%, transparent)',
            filter: 'blur(20px)',
          }}
        />
      ))}
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function WeatherEffect({ theme }: { theme: WeatherTheme }) {
  switch (theme) {
    case 'sunny':  return <SunEffect />
    case 'rainy':  return <RainEffect />
    case 'snowy':  return <SnowEffect />
    case 'cloudy': return <CloudEffect />
    case 'stormy': return <StormEffect />
    case 'foggy':  return <FogEffect />
  }
}
