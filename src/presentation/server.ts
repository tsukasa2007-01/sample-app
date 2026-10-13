import express from "express";
import path from "path";
import {
  createTodo,
  listTodos,
  removeTodo,
  toggleTodoDone,
} from "../application/todo/service.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

app.get("/api/todos", (_req, res) => {
  res.json(listTodos());
});

app.post("/api/todos", (req, res) => {
  try {
    const todo = createTodo(req.body.title);
    res.status(201).json(todo);
  } catch (error) {
    const message = (error as Error).message;
    res.status(400).json({ error: message });
  }
});

app.put("/api/todos/:id", (req, res) => {
  const todo = toggleTodoDone(Number(req.params.id));
  if (!todo) {
    res.status(404).json({ error: "見つかりません" });
    return;
  }
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const deleted = removeTodo(Number(req.params.id));
  if (!deleted) {
    res.status(404).json({ error: "見つかりません" });
    return;
  }
  res.json({ message: "削除しました" });
});

app.listen(PORT, () => {
  console.log(`サーバー起動: http://localhost:${PORT}`);
});

