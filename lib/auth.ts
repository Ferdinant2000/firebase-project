// lib/auth.ts
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { app } from "./firebaseConfig"

// Инициализация auth
const auth = getAuth(app)

/**
 * Регистрация нового пользователя
 * @param name - Имя пользователя
 * @param email - Email
 * @param password - Пароль
 */
export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name })
    }
    return userCredential.user
  } catch (error: any) {
    throw new Error(error.message || "Ошибка при регистрации")
  }
}

/**
 * Авторизация пользователя
 * @param email - Email
 * @param password - Пароль
 */
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error: any) {
    throw new Error(error.message || "Ошибка при входе")
  }
}
