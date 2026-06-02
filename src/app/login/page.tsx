'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { login } from '@/app/actions/auth'
import gsap from 'gsap'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null)
  const [showForm, setShowForm] = useState(false)

  const splashRef = useRef<HTMLDivElement>(null)
  const bgCircle1 = useRef<HTMLDivElement>(null)
  const bgCircle2 = useRef<HTMLDivElement>(null)
  const splashTitleRef = useRef<HTMLDivElement>(null)
  const splashBtnRef = useRef<HTMLButtonElement>(null)

  const formWrapRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const fieldsRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)

  // Splash entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(bgCircle1.current, { scale: 0, opacity: 0 })
      gsap.set(bgCircle2.current, { scale: 0, opacity: 0 })
      gsap.set(splashTitleRef.current!.children, { opacity: 0, y: 30 })
      gsap.set(splashBtnRef.current, { opacity: 0, scale: 0.8 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to(bgCircle1.current, { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' })
        .to(bgCircle2.current, { scale: 1, opacity: 1, duration: 1.0, ease: 'power2.out' }, '-=0.8')
        .to(splashTitleRef.current!.children, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, '-=0.5')
        .to(splashBtnRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.2')

      // Floating circles idle animation
      gsap.to(bgCircle1.current, { y: -20, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      gsap.to(bgCircle2.current, { y: 15, duration: 3.8, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.5 })
    })

    return () => ctx.revert()
  }, [])

  // Transition: splash → form
  function handleShowForm() {
    const tl = gsap.timeline()

    // Splash exits
    tl.to(splashBtnRef.current, { opacity: 0, scale: 0.9, duration: 0.25 })
      .to(splashTitleRef.current!.children, { opacity: 0, y: -20, duration: 0.35, stagger: 0.08 }, '-=0.1')
      .to(bgCircle1.current, { scale: 3, opacity: 0, duration: 0.6, ease: 'power2.in' }, '-=0.1')
      .to(bgCircle2.current, { scale: 3, opacity: 0, duration: 0.6, ease: 'power2.in' }, '-=0.5')
      .to(splashRef.current, { opacity: 0, duration: 0.3 }, '-=0.3')
      .call(() => setShowForm(true))
  }

  // Form entrance (after showForm becomes true)
  useEffect(() => {
    if (!showForm) return

    gsap.set(formWrapRef.current, { opacity: 0 })
    gsap.set(cardRef.current, { opacity: 0, y: 50, rotateX: 8 })
    gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 20 })
    gsap.set(fieldsRef.current!.children, { opacity: 0, x: -20 })
    gsap.set(btnRef.current, { opacity: 0, y: 10 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.to(formWrapRef.current, { opacity: 1, duration: 0.1 })
      .to(cardRef.current, { opacity: 1, y: 0, rotateX: 0, duration: 0.6, ease: 'back.out(1.4)' })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.35 }, '-=0.25')
      .to(fieldsRef.current!.children, { opacity: 1, x: 0, duration: 0.35, stagger: 0.1 }, '-=0.2')
      .to(btnRef.current, { opacity: 1, y: 0, duration: 0.3 }, '-=0.1')
  }, [showForm])

  // Shake on error
  useEffect(() => {
    if (!state?.error || !cardRef.current) return
    gsap.fromTo(cardRef.current, { x: -10 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
    if (errorRef.current) {
      gsap.fromTo(errorRef.current, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.3 })
    }
  }, [state?.error])

  return (
    <div className="relative min-h-screen overflow-hidden bg-stone-900">

      {/* Splash screen */}
      {!showForm && (
        <div ref={splashRef} className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Background blobs */}
          <div
            ref={bgCircle1}
            className="absolute w-96 h-96 rounded-full bg-amber-400/30 blur-3xl -top-20 -left-20 pointer-events-none"
          />
          <div
            ref={bgCircle2}
            className="absolute w-80 h-80 rounded-full bg-orange-300/20 blur-3xl bottom-10 right-10 pointer-events-none"
          />

          {/* Title */}
          <div ref={splashTitleRef} className="relative z-10 text-center mb-12 space-y-3">
            <p className="text-amber-400 text-sm tracking-[0.3em] uppercase">欢迎回来</p>
            <h1 className="text-5xl font-bold text-white tracking-tight">晴间有云</h1>
            <p className="text-stone-400 text-base">记录生活的碎片</p>
          </div>

          {/* CTA button */}
          <button
            ref={splashBtnRef}
            onClick={handleShowForm}
            className="relative z-10 group px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-900 font-semibold text-sm tracking-wide transition-colors duration-200 shadow-lg shadow-amber-400/30"
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
                    <label htmlFor="username" className="block text-sm font-medium text-stone-600 mb-1">
                      用户名
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                      placeholder="输入用户名"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-stone-600 mb-1">
                      密码
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                      placeholder="输入密码"
                    />
                  </div>
                </div>

                {state?.error && (
                  <p ref={errorRef} className="text-red-500 text-sm bg-red-50 rounded-lg px-3 py-2">
                    {state.error}
                  </p>
                )}

                <button
                  ref={btnRef}
                  type="submit"
                  disabled={pending}
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
