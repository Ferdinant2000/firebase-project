"use client"

import { useEffect, useState, createContext, useContext } from "react"
import { useRouter } from "next/navigation"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"

const AuthContext = createContext<User | null>(null)

export function useAuth() {
  return useContext(AuthContext)
}

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) return <p style={{ textAlign: "center" }}>Загрузка...</p>

  // Возвращаем контент только если пользователь авторизован
  return user ? <AuthContext.Provider value={user}>{children}</AuthContext.Provider> : null
}
