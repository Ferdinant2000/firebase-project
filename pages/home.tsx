"use client"

import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signOut, onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebaseConfig"
import styles from "@/pages/HomeStyle/pageStyles.module.css"

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollState, setScrollState] = useState<"top" | "middle" | "bottom">("top")

  // Подписка на изменения пользователя
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
      } else {
        setUser(null)
        router.push("/") // если нет пользователя — возвращаем на форму
      }
    })

    return () => unsubscribe()
  }, [router])

  // Логика скролла для теней
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

  // Выход из аккаунта
  const handleLogout = async () => {
    await signOut(auth)
    router.push("/")
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Your plans</h1>
        <p className={styles.subtitle}>ToDo list</p>
      </div>

      <div className={styles.scrollContainerWrapper}>
        {(scrollState === "middle" || scrollState === "bottom") && <div className={styles.topShadow}></div>}
        <div ref={scrollRef} className={styles.scrollContainer}>
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
