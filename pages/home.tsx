"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

type Todo = {
  id: string;
  text: string;
  created: number;
};

export default function Home() {
  const { user } = useAuth() as unknown as {
    user: { uid: string; email?: string } | null;
  };
  console.log("user in home: ", user);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const q = query(
      collection(db, "todos", user.uid, "userTodos"),
      orderBy("created", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Todo, "id">),
      }));
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, [user, router]);

  const addTodo = async () => {
    if (!input.trim() || !user) return;

    await addDoc(collection(db, "todos", user.uid, "userTodos"), {
      text: input.trim(),
      created: Date.now(),
    });

    setInput("");
  };

  const deleteTodo = async (id: string) => {
    if (!user) return;

    await deleteDoc(doc(db, "todos", user.uid, "userTodos", id));
  };

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome, {user?.email}</h1>
      <div>
        <input
          placeholder="Add a task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}{" "}
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: "0.5rem" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
      <button onClick={logout} style={{ marginTop: "2rem" }}>
        Log out
      </button>
    </div>
  );
}
