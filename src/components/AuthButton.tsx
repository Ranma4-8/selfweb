import { getSession } from '@/lib/session'
import { logout } from '@/app/actions/auth'
import Link from 'next/link'

export default async function AuthButton() {
  const session = await getSession()

  if (!session) {
    return (
      <Link
        href="/login"
        className="text-sm font-medium text-stone-600 hover:text-amber-600 transition-colors"
      >
        登录
      </Link>
    )
  }

  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-sm font-medium text-stone-600 hover:text-amber-600 transition-colors"
      >
        退出 ({session.username})
      </button>
    </form>
  )
}
