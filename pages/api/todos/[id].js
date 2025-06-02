import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";


export default async function handler(req, res) {
  const client = await connectToDatabase();
  const db = client.db();
  const todos = db.collection("todos");
  const { id } = req.query;

  if (req.method === "PUT") {
    const { status } = req.body;
    const result = await todos.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );
    return res.status(200).json(result);
  }

  if (req.method === "DELETE") {
    const result = await todos.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json(result);
  }

  res.status(405).end();
}
