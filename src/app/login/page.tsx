'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { login } from '@/app/actions/auth'
import gsap from 'gsap'
import { fetchWeather, WEATHER_THEMES, type WeatherInfo } from '@/lib/weather'

// Floating particle that drifts upward
function Particle({ emoji, style }: { emoji: string; style: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!ref.current) return
    gsap.to(ref.current, {
      y: -120,
      opacity: 0,
      duration: gsap.utils.random(3, 6),
      delay: gsap.utils.random(0, 3),
      repeat: -1,
      ease: 'power1.in',
      repeatDelay: gsap.utils.random(1, 4),
    })
  }, [])
  return (
    <span ref={ref} className="absolute text-2xl select-none pointer-events-none opacity-60" style={style}>
      {emoji}
    </span>
  )
}

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null)
  const [showForm, setShowForm] = useState(false)
  const [weather, setWeather] = useState<WeatherInfo | null>(null)
  const [loading, setLoading] = useState(true)

  const splashRef = useRef<HTMLDivElement>(null)
  const bgCircle1 = useRef<HTMLDivElement>(null)
  const bgCircle2 = useRef<HTMLDivElement>(null)
  const splashTitleRef = useRef<HTMLDivElement>(null)
  const weatherBadgeRef = useRef<HTMLDivElement>(null)
  const splashBtnRef = useRef<HTMLButtonElement>(null)

  const formWrapRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const fieldsRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)

  // Fetch weather
  useEffect(() => {
    fetchWeather()
      .then(setWeather)
      .catch(() => setWeather({ theme: 'sunny', label: '晴', temp: 20 }))
      .finally(() => setLoading(false))
  }, [])

  const theme = WEATHER_THEMES[weather?.theme ?? 'sunny']

  // Splash entrance (runs after weather loads)
  useEffect(() => {
    if (loading) return
    const ctx = gsap.context(() => {
      gsap.set(bgCircle1.current, { scale: 0, opacity: 0 })
      gsap.set(bgCircle2.current, { scale: 0, opacity: 0 })
      gsap.set(splashTitleRef.current!.children, { opacity: 0, y: 30 })
      gsap.set(weatherBadgeRef.current, { opacity: 0, scale: 0.7 })
      gsap.set(splashBtnRef.current, { opacity: 0, scale: 0.8 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to(bgCircle1.current, { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' })
        .to(bgCircle2.current, { scale: 1, opacity: 1, duration: 1.0 }, '-=0.8')
        .to(splashTitleRef.current!.children, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, '-=0.5')
        .to(weatherBadgeRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, '-=0.2')
        .to(splashBtnRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.15')

      // Idle float
      gsap.to(bgCircle1.current, { y: -24, duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      gsap.to(bgCircle2.current, { y: 18, duration: 4.1, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.6 })
    })
    return () => ctx.revert()
  }, [loading])

  // Transition splash → form
  function handleShowForm() {
    const tl = gsap.timeline()
    tl.to(splashBtnRef.current, { opacity: 0, scale: 0.85, duration: 0.2 })
      .to(weatherBadgeRef.current, { opacity: 0, duration: 0.2 }, '-=0.1')
      .to(splashTitleRef.current!.children, { opacity: 0, y: -24, duration: 0.35, stagger: 0.07 }, '-=0.1')
      .to([bgCircle1.current, bgCircle2.current], { scale: 4, opacity: 0, duration: 0.7, ease: 'power2.in', stagger: 0.1 }, '-=0.2')
      .to(splashRef.current, { opacity: 0, duration: 0.25 }, '-=0.2')
      .call(() => setShowForm(true))
  }

  // Form entrance
  useEffect(() => {
    if (!showForm) return
    gsap.set(formWrapRef.current, { opacity: 0 })
    gsap.set(cardRef.current, { opacity: 0, y: 50, rotateX: 10 })
    gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 18 })
    gsap.set(fieldsRef.current!.children, { opacity: 0, x: -18 })
    gsap.set(btnRef.current, { opacity: 0, y: 10 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.to(formWrapRef.current, { opacity: 1, duration: 0.1 })
      .to(cardRef.current, { opacity: 1, y: 0, rotateX: 0, duration: 0.65, ease: 'back.out(1.3)' })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.35')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.35 }, '-=0.25')
      .to(fieldsRef.current!.children, { opacity: 1, x: 0, duration: 0.35, stagger: 0.1 }, '-=0.2')
      .to(btnRef.current, { opacity: 1, y: 0, duration: 0.3 }, '-=0.1')
  }, [showForm])

  // Error shake
  useEffect(() => {
    if (!state?.error || !cardRef.current) return
    gsap.fromTo(cardRef.current, { x: -10 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
    if (errorRef.current) {
      gsap.fromTo(errorRef.current, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.3 })
    }
  }, [state?.error])

  // Particle positions (fixed so they don't recompute on re-render)
  const particlePositions = useRef(
    Array.from({ length: 9 }, (_, i) => ({
      left: `${10 + (i % 3) * 33 + Math.random() * 10}%`,
      bottom: `${5 + Math.floor(i / 3) * 15}%`,
    }))
  )

  if (loading) {
    return <div className="min-h-screen bg-stone-900 flex items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
    </div>
  }

  return (
    <div className={`relative min-h-screen overflow-hidden ${theme.bg} transition-colors duration-700`}>

      {/* Splash */}
      {!showForm && (
        <div ref={splashRef} className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Blobs */}
          <div ref={bgCircle1} className={`absolute w-96 h-96 rounded-full ${theme.blob1} blur-3xl -top-16 -left-16 pointer-events-none`} />
          <div ref={bgCircle2} className={`absolute w-80 h-80 rounded-full ${theme.blob2} blur-3xl bottom-10 right-10 pointer-events-none`} />

          {/* Floating particles */}
          {theme.particles.map((emoji, i) => (
            <Particle
              key={i}
              emoji={emoji}
              style={particlePositions.current[i % 9]}
            />
          ))}

          {/* Title */}
          <div ref={splashTitleRef} className="relative z-10 text-center mb-6 space-y-3">
            <p className={`${theme.subColor} text-sm tracking-[0.3em] uppercase`}>欢迎回来</p>
            <h1 className={`text-5xl font-bold ${theme.titleColor} tracking-tight`}>晴间有云</h1>
            <p className={`${theme.subColor} text-base`}>记录生活的碎片</p>
          </div>

          {/* Weather badge */}
          <div ref={weatherBadgeRef} className="relative z-10 mb-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-lg">{theme.particles[0]}</span>
            <span className={`${theme.titleColor} text-sm font-medium`}>
              {weather?.label} · {weather?.temp}°C
            </span>
          </div>

          {/* CTA */}
          <button
            ref={splashBtnRef}
            onClick={handleShowForm}
            className={`relative z-10 group px-8 py-3 rounded-full ${theme.accent} font-semibold text-sm tracking-wide transition-colors duration-200 shadow-lg`}
          >
            <span className="flex items-center gap-2">
              进入
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      )}

      {/* Login form */}
      {showForm && (
        <div ref={formWrapRef} className="absolute inset-0 flex items-center justify-center bg-stone-50">
          <div className="w-full max-w-sm px-4" style={{ perspective: '800px' }}>
            <div ref={cardRef} className="bg-white rounded-2xl shadow-xl border border-stone-100 p-8">
              <h1 ref={titleRef} className="text-2xl font-semibold text-stone-800 mb-2">登录</h1>
              <p ref={subtitleRef} className="text-stone-400 text-sm mb-8">输入账号继续</p>

              <form action={formAction} className="space-y-4">
                <div ref={fieldsRef} className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-stone-600 mb-1">用户名</label>
                    <input
                      id="username" name="username" type="text" autoComplete="username" required
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                      placeholder="输入用户名"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-stone-600 mb-1">密码</label>
                    <input
                      id="password" name="password" type="password" autoComplete="current-password" required
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                      placeholder="输入密码"
                    />
                  </div>
                </div>

                {state?.error && (
                  <p ref={errorRef} className="text-red-500 text-sm bg-red-50 rounded-lg px-3 py-2">{state.error}</p>
                )}

                <button
                  ref={btnRef} type="submit" disabled={pending}
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 disabled:opacity-60 text-white font-semibold tracking-wide transition mt-2 shadow-md shadow-amber-200"
                >
                  {pending ? '登录中...' : '登录'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
