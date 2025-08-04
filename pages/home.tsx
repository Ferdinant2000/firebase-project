"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signOut, onAuthStateChanged, User } from "firebase/auth"
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore"
import { auth, db } from "@/lib/firebaseConfig"
import styles from "@/pages/HomeStyle/pageStyles.module.css"

interface Todo {
  id: string
  title: string
  completed: boolean
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const router = useRouter()

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
      } else {
        setUser(null)
        router.push("/")
      }
    })

    return () => unsubscribeAuth()
  }, [router])

  useEffect(() => {
    if (!user) return
    const todosRef = collection(db, "todos", user.uid, "userTodos")
    const q = query(todosRef, orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedTodos: Todo[] = []
      snapshot.forEach((doc) => {
        updatedTodos.push({ id: doc.id, ...(doc.data() as Omit<Todo, "id">) })
      })
      setTodos(updatedTodos)
    })

    return () => unsubscribe()
  }, [user])

  const handleAddTodo = async () => {
    if (!newTodo.trim() || !user) return

    await addDoc(collection(db, "todos", user.uid, "userTodos"), {
      title: newTodo,
      completed: false,
      createdAt: new Date(),
    })
    setNewTodo("")
  }

  const handleToggleCompleted = async (todoId: string, current: boolean) => {
    if (!user) return
    const todoRef = doc(db, "todos", user.uid, "userTodos", todoId)
    await updateDoc(todoRef, { completed: !current })
  }

  const handleDeleteTodo = async (todoId: string) => {
    if (!user) return
    const todoRef = doc(db, "todos", user.uid, "userTodos", todoId)
    await deleteDoc(todoRef)
  }

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

            <div className={styles.todoSection}>
              <div className={styles.todoInput}>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Enter a new task"
                />
                <button onClick={handleAddTodo}>Add</button>
              </div>

              <ul className={styles.todoList}>
                {todos.map((todo) => (
                  <li key={todo.id} className={styles.todoItem}>
                    <label>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleCompleted(todo.id, todo.completed)}
                        className={styles.todoCheckbox}
                      />
                      <span className={todo.completed ? styles.completed : ""}>
                        {todo.completed}{todo.title}
                      </span>
                    </label>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className={styles.deleteButton}
                      title="Удалить задачу"
                    >
                      🗑️
                    </button>
                  </li>
                ))}
              </ul>
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
