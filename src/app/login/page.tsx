'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { login } from '@/app/actions/auth'
import gsap from 'gsap'
import { fetchWeather, WEATHER_THEMES, type WeatherInfo } from '@/lib/weather'
import WeatherEffect from '@/components/WeatherEffect'
import LoginSlime from '@/components/LoginSlime'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null)
  const [showForm, setShowForm] = useState(false)
  const [weather, setWeather] = useState<WeatherInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const splashRef = useRef<HTMLDivElement>(null)
  const bgCircle1 = useRef<HTMLDivElement>(null)
  const bgCircle2 = useRef<HTMLDivElement>(null)
  const splashTitleRef = useRef<HTMLDivElement>(null)
  const weatherBadgeRef = useRef<HTMLDivElement>(null)
  const splashBtnRef = useRef<HTMLButtonElement>(null)

  const formWrapRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const characterRef = useRef<HTMLDivElement>(null)
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

  // Splash entrance
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
    gsap.set(cardRef.current, { opacity: 0, y: 50, scale: 0.95 })
    gsap.set(characterRef.current, { opacity: 0, x: -30 })
    gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 16 })
    gsap.set(fieldsRef.current!.children, { opacity: 0, x: -16 })
    gsap.set(btnRef.current, { opacity: 0, y: 8 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.to(formWrapRef.current, { opacity: 1, duration: 0.1 })
      .to(cardRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.3)' })
      .to(characterRef.current, { opacity: 1, x: 0, duration: 0.5 }, '-=0.3')
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.35 }, '-=0.2')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.3 }, '-=0.2')
      .to(fieldsRef.current!.children, { opacity: 1, x: 0, duration: 0.3, stagger: 0.09 }, '-=0.15')
      .to(btnRef.current, { opacity: 1, y: 0, duration: 0.25 }, '-=0.1')
  }, [showForm])

  // Error shake
  useEffect(() => {
    if (!state?.error || !cardRef.current) return
    gsap.fromTo(cardRef.current, { x: -10 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
    if (errorRef.current) {
      gsap.fromTo(errorRef.current, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.3 })
    }
  }, [state?.error])

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className={`relative min-h-screen overflow-hidden ${theme.bg}`}>
      {/* Weather effect — always visible */}
      <WeatherEffect theme={weather?.theme ?? 'sunny'} />

      {/* Splash */}
      {!showForm && (
        <div ref={splashRef} className="absolute inset-0 flex flex-col items-center justify-center">
          <div ref={bgCircle1} className={`absolute w-96 h-96 rounded-full ${theme.blob1} blur-3xl -top-16 -left-16 pointer-events-none`} />
          <div ref={bgCircle2} className={`absolute w-80 h-80 rounded-full ${theme.blob2} blur-3xl bottom-10 right-10 pointer-events-none`} />

          <div ref={splashTitleRef} className="relative z-10 text-center mb-6 space-y-3">
            <p className={`${theme.subColor} text-sm tracking-[0.3em] uppercase`}>欢迎回来</p>
            <h1 className={`text-5xl font-bold ${theme.titleColor} tracking-tight`}>晴间有云</h1>
            <p className={`${theme.subColor} text-base`}>记录生活的碎片</p>
          </div>

          <div ref={weatherBadgeRef} className="relative z-10 mb-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-lg">{theme.icon}</span>
            <span className={`${theme.titleColor} text-sm font-medium`}>
              {weather?.label} · {weather?.temp}°C
            </span>
          </div>

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

      {/* Login form — frosted glass, character on left */}
      {showForm && (
        <div ref={formWrapRef} className="absolute inset-0 flex items-center justify-center px-4">
          <div ref={cardRef} className="w-full max-w-2xl">
            {/* Frosted glass card */}
            <div className="bg-white/12 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

              {/* Character panel */}
              <div
                ref={characterRef}
                className="flex items-end justify-center pt-8 pb-0 md:pt-0 md:pb-0 md:w-56 shrink-0 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))' }}
              >
                {/* Subtle inner glow */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.07), transparent 70%)' }} />
                <div className="w-40 h-44 relative z-10">
                  <LoginSlime passwordFocused={passwordFocused} />
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px bg-white/10 my-8" />

              {/* Form panel */}
              <div className="flex-1 px-8 py-9">
                <h1 ref={titleRef} className="text-2xl font-semibold text-white mb-1">登录</h1>
                <p ref={subtitleRef} className="text-white/50 text-sm mb-8">输入账号继续</p>

                <form action={formAction} className="space-y-4">
                  <div ref={fieldsRef} className="space-y-4">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-white/70 mb-1">
                        用户名
                      </label>
                      <input
                        id="username" name="username" type="text" autoComplete="username" required
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition backdrop-blur-sm"
                        placeholder="输入用户名"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-1">
                        密码
                      </label>
                      <input
                        id="password" name="password" type="password" autoComplete="current-password" required
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition backdrop-blur-sm"
                        placeholder="输入密码"
                      />
                    </div>
                  </div>

                  {state?.error && (
                    <p ref={errorRef} className="text-red-300 text-sm bg-red-500/20 rounded-lg px-3 py-2 border border-red-400/20">
                      {state.error}
                    </p>
                  )}

                  <button
                    ref={btnRef} type="submit" disabled={pending}
                    className={`w-full py-2.5 rounded-xl ${theme.accent} font-semibold tracking-wide transition shadow-lg mt-2 disabled:opacity-50`}
                  >
                    {pending ? '登录中...' : '登录'}
                  </button>
                </form>
              </div>
            </div>

            {/* Weather info below card */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-base">{theme.icon}</span>
              <span className="text-white/40 text-xs">{weather?.label} · {weather?.temp}°C</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
