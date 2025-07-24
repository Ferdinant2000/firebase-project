"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import styles from "./pageStyles.module.css"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebaseConfig"

export default function Home() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollState, setScrollState] = useState<"top" | "middle" | "bottom">("top")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || "Без имени",
          email: firebaseUser.email || "Без email",
        })
      } else {
        router.push("/")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollRef.current
      if (!container) return
      const { scrollTop, scrollHeight, clientHeight } = container
      if (scrollTop <= 5) setScrollState("top")
      else if (scrollTop + clientHeight >= scrollHeight - 5) setScrollState("bottom")
      else setScrollState("middle")
    }

    const container = scrollRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      handleScroll()
    }
    return () => container?.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/")
  }

  if (loading) return <p style={{ textAlign: "center" }}>Загрузка...</p>

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Публичные профили</h1>
        <p className={styles.subtitle}>Зарегистрированные пользователи</p>
      </div>

      <div className={styles.scrollContainerWrapper}>
        {(scrollState === "middle" || scrollState === "bottom") && <div className={styles.topShadow}></div>}
        <div ref={scrollRef} className={styles.scrollContainer}>
          {user && (
            <div className={styles.profileCard}>
              <div className={styles.profileContent}>
                <img src="/images/Avatar.jpg" alt="Avatar" className={styles.avatar} />
                <div className={styles.profileInfo}>
                  <h3 className={styles.name}>{user.name}</h3>
                  <p className={styles.email}>{user.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        {(scrollState === "middle" || scrollState === "top") && <div className={styles.bottomShadow}></div>}
      </div>

      <div className={styles.footer}>
        <p>Пользователь: {user?.email}</p>
        <button onClick={handleLogout} style={{ marginTop: "10px", padding: "6px 12px" }}>
          Выйти
        </button>
      </div>
    </div>
  )
}
