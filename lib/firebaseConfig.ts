// lib/firebaseConfig.ts
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Конфигурация из Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyD_P-I-M1Aopn-2WFoxUge48D1qMGlDx9I",
  authDomain: "firstproject-329c2.firebaseapp.com",
  projectId: "firstproject-329c2",
  storageBucket: "firstproject-329c2.firebasestorage.app",
  messagingSenderId: "788714414789",
  appId: "1:788714414789:web:c997733c9b7d1cc783c6ac"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export { app }  // <--- ЭТО ДОБАВИЛИ
