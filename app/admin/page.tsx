// app/admin/page.tsx
import { useSession } from 'next-auth/react'

export default function AdminPage() {
  const { data: session } = useSession()

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome, {session?.user?.name}!</p>
    </div>
  )
}
