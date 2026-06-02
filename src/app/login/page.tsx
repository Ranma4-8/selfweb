'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions/auth'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
          <h1 className="text-2xl font-semibold text-stone-800 mb-2">欢迎回来</h1>
          <p className="text-stone-500 text-sm mb-8">登录你的个人网站</p>

          <form action={formAction} className="space-y-4">
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

            {state?.error && (
              <p className="text-red-500 text-sm bg-red-50 rounded-lg px-3 py-2">{state.error}</p>
            )}

            <button
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
