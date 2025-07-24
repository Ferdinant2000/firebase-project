"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./FormStyle.module.css"
import { registerUser, loginUser } from "@/lib/auth"
export default function Form() {

    const [isActive, setIsActive] = useState(false)

    // Поля для регистрации
    const [regName, setRegName] = useState("")
    const [regEmail, setRegEmail] = useState("")
    const [regPassword, setRegPassword] = useState("")

    // Поля для логина
    const [logEmail, setLogEmail] = useState("")
    const [logPassword, setLogPassword] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const router = useRouter()

    // Обработчик регистрации
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("handleRegister called")
        setLoading(true)
        setError("")
        try {
            await registerUser(regName, regEmail, regPassword)
            console.log("Registration successful, redirecting to /home")
            router.push("@/pages/Home/page.tsx") // обязательно страница должна быть в lowercase
        } catch (err: any) {
            console.error("Registration error:", err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Обработчик логина
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("handleLogin called")
        setLoading(true)
        setError("")
        try {
            await loginUser(logEmail, logPassword)
            console.log("Login successful, redirecting to /home")
            router.push("/home")
        } catch (err: any) {
            console.error("Login error:", err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
            {/* Login */}
            <div className={`${styles["form-box"]} ${styles.login}`}>
                <form onSubmit={handleLogin}>
                    <h1 className="font-bold">Login</h1>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className={styles["input-box"]}>
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={logEmail}
                            onChange={(e) => setLogEmail(e.target.value)}
                        />
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className={styles["input-box"]}>
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={logPassword}
                            onChange={(e) => setLogPassword(e.target.value)}
                        />
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    <div className={styles["forgot-link"]}>
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button type="submit" className={styles.btn} disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                    </button>
                    <p>or login with social platforms</p>
                    <div className={styles["social-icons"]}>
                        <a href="#"><i className="bx bxl-google"></i></a>
                        <a href="#"><i className="bx bxl-facebook"></i></a>
                        <a href="#"><i className="bx bxl-github"></i></a>
                        <a href="#"><i className="bx bxl-linkedin"></i></a>
                    </div>
                </form>
            </div>

            {/* Register */}
            <div className={`${styles["form-box"]} ${styles.register}`}>
                <form onSubmit={handleRegister}>
                    <h1 className="font-bold">Registration</h1>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className={styles["input-box"]}>
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                        />
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className={styles["input-box"]}>
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                        />
                        <i className="bx bxs-envelope"></i>
                    </div>
                    <div className={styles["input-box"]}>
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                        />
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    <button type="submit" className={styles.btn} disabled={loading}>
                        {loading ? "Loading..." : "Register"}
                    </button>
                    <p>or register with social platforms</p>
                    <div className={styles["social-icons"]}>
                        <a href="#"><i className="bx bxl-google"></i></a>
                        <a href="#"><i className="bx bxl-facebook"></i></a>
                        <a href="#"><i className="bx bxl-github"></i></a>
                        <a href="#"><i className="bx bxl-linkedin"></i></a>
                    </div>
                </form>
            </div>

            {/* Toggle */}
            <div className={styles["toggle-box"]}>
                <div className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}>
                    <h1 className="font-bold">Hello, Welcome!</h1>
                    <p>Don't have an account?</p>
                    <button
                        type="button"
                        className={styles.btn}
                        onClick={() => setIsActive(true)}
                    >
                        Register
                    </button>
                </div>

                <div className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}>
                    <h1 className="font-bold">Welcome Back!</h1>
                    <p>Already have an account?</p>
                    <button
                        type="button"
                        className={styles.btn}
                        onClick={() => setIsActive(false)}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}
