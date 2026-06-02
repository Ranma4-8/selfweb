'use client'

import { useActionState, useEffect, useRef } from 'react'
import { login } from '@/app/actions/auth'
import gsap from 'gsap'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null)

  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const fieldsRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { opacity: 0, y: 40, scale: 0.97 })
      gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 16 })
      gsap.set(fieldsRef.current!.children, { opacity: 0, y: 12 })
      gsap.set(btnRef.current, { opacity: 0, y: 8 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to(cardRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.55 })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.35 }, '-=0.3')
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.3 }, '-=0.2')
        .to(fieldsRef.current!.children, { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 }, '-=0.15')
        .to(btnRef.current, { opacity: 1, y: 0, duration: 0.3 }, '-=0.1')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Shake animation on error
  useEffect(() => {
    if (!state?.error || !cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { x: -8 },
      { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
    )
    if (errorRef.current) {
      gsap.fromTo(errorRef.current, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.25 })
    }
  }, [state?.error])

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="w-full max-w-sm">
        <div ref={cardRef} className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
          <h1 ref={titleRef} className="text-2xl font-semibold text-stone-800 mb-2">欢迎回来</h1>
          <p ref={subtitleRef} className="text-stone-500 text-sm mb-8">登录你的个人网站</p>

          <form action={formAction} className="space-y-4">
            <div ref={fieldsRef} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-stone-700 mb-1">
                  用户名
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                  placeholder="输入用户名"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1">
                  密码
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
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
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 disabled:opacity-60 text-white font-medium transition mt-2"
            >
              {pending ? '登录中...' : '登录'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
