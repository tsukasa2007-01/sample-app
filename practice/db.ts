import Database from "better-sqlite3";

// --- データベースに接続 ---
const db = new Database("todo.db");

// --- テーブルを作る（なければ作る） ---
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0
  )
`);

// --- アプリで使う TODO の形（done は boolean）---
// SQLite の done カラムは 0 / 1 の数値ですが、TypeScript では boolean として扱います。
type TodoRow = {
  id: number;
  title: string;
  done: boolean;
};

// DB の1行（done は 0 | 1）を、TodoRow型に変換する関数
function todoRowFromSqliteRow(row: {
  id: number;
  title: string;
  done: number;
}): TodoRow {
  return {
    id: row.id,
    title: row.title,
    done: row.done === 1, // doneが1の場合はtrue, 0の場合はfalse
  };
}

// --- TODO を追加する ---
function addTodo(title: string): void {
  const stmt = db.prepare("INSERT INTO todos (title) VALUES (?)");
  stmt.run(title);
  console.log(`追加: ${title}`);
}

// --- TODO 一覧を取得する ---
function getAllTodos(): TodoRow[] {
  const stmt = db.prepare("SELECT * FROM todos");
  const rows = stmt.all() as Array<{ id: number; title: string; done: number }>; //asは型アサーションで、stmt.all()の戻り値をArray<{ id: number; title: string; done: number }>として扱うことを示している
  const todos: TodoRow[] = [];
  for (const row of rows) {
    todos.push(todoRowFromSqliteRow(row));
  }
  return todos;
}

// --- TODO 一覧を表示する ---
function showTodos(): void {
  const todos = getAllTodos();
  if (todos.length === 0) {
    console.log("TODOはありません");
    return;
  }
  for (const todo of todos) {
    let status: string;
    if (todo.done) {
      status = "✅";
    } else {
      status = "⬜";
    }
    console.log(`${status} [${todo.id}] ${todo.title}`);
  }
}

// --- 実行する ---
console.log("=== TODO を追加 ===");
addTodo("牛乳を買う");
addTodo("日報を書く");
addTodo("掃除をする");

console.log("");
console.log("=== TODO 一覧 ===");
showTodos();

// --- データベースを閉じる ---
db.close();
