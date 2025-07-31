"use client"

import { useEffect, useState } from "react"
import DefaultLayout from "@/layouts/default"
import Form from "@/pages/form"
import Home from "@/pages/home"

export default function IndexPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Проверяем наличие флага авторизации
    const token = localStorage.getItem("authToken")
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <DefaultLayout>
      {isLoggedIn ? <Home /> : <Form />}
    </DefaultLayout>
  )
}
