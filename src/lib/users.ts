// In production, replace this with a real database.
// Default credentials: admin / admin123
const USERS = [
  {
    id: '1',
    username: 'admin',
    // bcrypt hash of "admin123"
    passwordHash: '$2b$10$SeIbEDoHg5HymdUwNlZj/.UJqUWpOWiSAggZqggrQkalVhHoZyvzi',
  },
]

export function findUserByUsername(username: string) {
  return USERS.find((u) => u.username === username) ?? null
}
