// lib/auth.ts
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { app } from "./firebaseConfig"

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
    console.error("Ошибка регистрации:", error.code, error.message)
    throw new Error(mapAuthError(error.code))
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
    console.error("Ошибка входа:", error.code, error.message)
    throw new Error(mapAuthError(error.code))
  }
}

/**
 * Функция для преобразования кодов ошибок Firebase в понятные сообщения
 * @param code - Код ошибки Firebase
 */
const mapAuthError = (code: string): string => {
  switch (code) {
    case "auth/invalid-email":
      return "Invalid email format"
    case "auth/user-not-found":
      return "User not found"
    case "auth/wrong-password":
      return "Wrong password"
    case "auth/invalid-credential":
      return "Email or password is incorrect"
    case "auth/email-already-in-use":
      return "Email already registered"
    case "auth/too-many-requests":
      return "Too many attempts Try again later"
    default:
      return "Unknown authorization error"
  }
}
