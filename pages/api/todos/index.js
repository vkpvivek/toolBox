// pages/api/todos/index.js
import { connectToDatabase } from "@/lib/mongodb";
import { createTodo } from "@/models/todo";


export default async function handler(req, res) {
  const client = await connectToDatabase();
  const db = client.db(); // uses default DB from URI
  const todos = db.collection("todos");

  
  if (req.method === "GET") {
    const allTodos = await todos.find().toArray();
    return res.status(200).json(allTodos);
  }

  if (req.method === "POST") {
    try {
      const todo = createTodo(req.body);
      const result = await todos.insertOne(todo);
      return res.status(201).json(result);
    } 
    catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }


  res.status(405).end(); // Method Not Allowed
}

