"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signOut, onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebaseConfig"
import styles from "@/pages/HomeStyle/pageStyles.module.css"

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
      } else {
        setUser(null)
        router.push("/")
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/")
  }

  return (
    <div className={styles.fullBackground}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Your plans</h1>
          <p className={styles.subtitle}>ToDo list</p>
        </div>

        {user && (
          <div className={styles.profileCard}>
            <div className={styles.profileContent}>
              <img src="/images/Avatar.jpg" alt="Avatar" className={styles.avatar} />
              <div className={styles.profileInfo}>
                <h3 className={styles.name}>{user.displayName || "Без имени"}</h3>
                <p className={styles.email}>{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <div className={styles.footer}>
          <p>User: {user?.email}</p>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}
