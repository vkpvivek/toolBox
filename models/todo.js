//models/todo.js
export function createTodo({ text, status = "pending" }) {
    if (!text || typeof text !== "string") {
        throw new Error("Invalid todo text");
    }

    return {
        text: text.trim(),
        status,
        createdAt: new Date(),
    };
}
