'use server'

import { compare, hash } from 'bcryptjs'
import { redirect } from 'next/navigation'
import { createSession, deleteSession } from '@/lib/session'
import { findUserByUsername, createUser } from '@/lib/users'

export async function login(_prev: { error: string } | null, formData: FormData) {
  const username = (formData.get('username') as string)?.trim()
  const password = formData.get('password') as string

  if (!username || !password) return { error: '请输入用户名和密码' }

  const user = findUserByUsername(username)
  if (!user || !(await compare(password, user.passwordHash))) {
    return { error: '用户名或密码错误' }
  }

  await createSession(user.id, user.username)
  redirect('/')
}

export async function register(_prev: { error: string } | null, formData: FormData) {
  const username = (formData.get('username') as string)?.trim()
  const password = formData.get('password') as string
  const confirm  = formData.get('confirm')  as string

  if (!username || !password || !confirm) return { error: '请填写所有字段' }
  if (username.length < 2) return { error: '用户名至少 2 个字符' }
  if (password.length < 6) return { error: '密码至少 6 个字符' }
  if (password !== confirm)  return { error: '两次密码不一致' }
  if (findUserByUsername(username)) return { error: '该用户名已被注册' }

  const passwordHash = await hash(password, 10)
  const user = createUser(username, passwordHash)
  await createSession(user.id, user.username)
  redirect('/')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
