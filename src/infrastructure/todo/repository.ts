import Database from "better-sqlite3";
import type { TodoRow } from "../../domain/todo/types.js";

type SqliteTodoRow = {
  id: number;
  title: string;
  done: number;
};

const db = new Database("todo.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0
  )
`);

function todoFromSqliteRow(row: SqliteTodoRow): TodoRow {
  return {
    id: row.id,
    title: row.title,
    done: row.done === 1,
  };
}

export function findAllTodos(): TodoRow[] {
  const rows = db
    .prepare("SELECT * FROM todos ORDER BY id DESC")
    .all() as SqliteTodoRow[];

  const todos: TodoRow[] = [];
  for (const row of rows) {
    todos.push(todoFromSqliteRow(row));
  }
  return todos;
}

export function insertTodo(title: string): TodoRow {
  const info = db.prepare("INSERT INTO todos (title) VALUES (?)").run(title);
  return {
    id: Number(info.lastInsertRowid),
    title,
    done: false,
  };
}

export function findTodoById(id: number): TodoRow | undefined {
  const row = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as
    | SqliteTodoRow
    | undefined;

  if (!row) {
    return undefined;
  }
  return todoFromSqliteRow(row);
}

export function updateTodoDone(id: number, done: boolean): TodoRow | undefined {
  let doneForSqlite = 0;
  if (done) {
    doneForSqlite = 1;
  }

  const result = db.prepare("UPDATE todos SET done = ? WHERE id = ?").run(doneForSqlite, id);
  if (result.changes === 0) {
    return undefined;
  }
  return findTodoById(id);
}

export function deleteTodoById(id: number): boolean {
  const result = db.prepare("DELETE FROM todos WHERE id = ?").run(id);
  return result.changes > 0;
}

