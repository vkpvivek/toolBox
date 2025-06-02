"use client";
import { useEffect, useState } from "react";

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/api/todos")
      .then(res => res.json())
      .then(setTodos);
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (res.ok) {
      const newTodo = await res.json();
      setTodos([...todos, { ...newTodo.ops[0] }]);
      setText("");
    }
  };

  const updateStatus = async (id, status) => {
    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setTodos(todos.map(todo => todo._id === id ? { ...todo, status } : todo));
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 Todo Manager</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <ul className="space-y-4">
        {todos.map(todo => (
          <li
            key={todo._id}
            className="flex items-center justify-between p-4 bg-white shadow rounded-md border"
          >
            <div>
              <p className={`font-medium ${todo.status === "done" ? "line-through text-gray-500" : ""}`}>
                {todo.text}
              </p>
              <p className="text-sm text-gray-400 mt-1">Status: {todo.status}</p>
            </div>
            <div className="flex items-center gap-2">
              {todo.status !== "done" && (
                <button
                  onClick={() => updateStatus(todo._id, "done")}
                  className="text-green-600 hover:underline text-sm"
                >
                  Mark Done
                </button>
              )}
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
