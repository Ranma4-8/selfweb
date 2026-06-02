type User = { id: string; username: string; passwordHash: string }

// Module-level store (persists for server lifetime).
// In production replace with a real database.
const store = new Map<string, User>([
  ['admin', {
    id: '1',
    username: 'admin',
    // bcrypt hash of "admin123"
    passwordHash: '$2b$10$SeIbEDoHg5HymdUwNlZj/.UJqUWpOWiSAggZqggrQkalVhHoZyvzi',
  }],
])

export function findUserByUsername(username: string): User | null {
  return store.get(username) ?? null
}

export function createUser(username: string, passwordHash: string): User {
  const user: User = { id: Date.now().toString(), username, passwordHash }
  store.set(username, user)
  return user
}
