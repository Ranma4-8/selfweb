'use server'

import { compare } from 'bcryptjs'
import { redirect } from 'next/navigation'
import { createSession, deleteSession } from '@/lib/session'
import { findUserByUsername } from '@/lib/users'

export async function login(_prev: { error: string } | null, formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { error: '请输入用户名和密码' }
  }

  const user = findUserByUsername(username)
  if (!user) {
    return { error: '用户名或密码错误' }
  }

  const valid = await compare(password, user.passwordHash)
  if (!valid) {
    return { error: '用户名或密码错误' }
  }

  await createSession(user.id, user.username)
  redirect('/')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
