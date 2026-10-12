// JSONPlaceholder: テスト用の公開 API からTODOを取得する例

type TodoFromAPI = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

async function fetchTodos(): Promise<void> {
  console.log("APIからTODOを取得中...");

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  const todos: TodoFromAPI[] = await response.json();

  console.log(`${todos.length} 件取得しました`);
  console.log("");

  for (const todo of todos) {
    let status: string;
    if (todo.completed) {
      status = "✅";
    } else {
      status = "⬜";
    }
    console.log(`${status} [${todo.id}] ${todo.title}`);
  }
}

fetchTodos();
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  done INTEGER NOT NULL DEFAULT 0
);
INSERT INTO todos (title) VALUES ('牛乳を買う');
INSERT INTO todos (title) VALUES ('日報を書く');
INSERT INTO todos (title, done) VALUES ('TypeScriptを学ぶ', 1);
UPDATE todos SET done = 1 WHERE id = 1;
SELECT * FROM todos;
DELETE FROM todos WHERE id = 2;
SELECT * FROM todos;
.quit

