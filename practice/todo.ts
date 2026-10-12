// --- Todo 型を定義する ---
type Todo = {
  id: number;
  title: string;
  done: boolean;
};

// --- Todo の配列を作成する ---
const todos: Todo[] = [
  { id: 1, title: "牛乳を買う", done: false },
  { id: 2, title: "日報を書く", done: true },
  { id: 3, title: "TypeScriptを学ぶ", done: false },
];

// --- 一覧を表示する関数 ---
function showTodos(todos: Todo[]): void {
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

// --- 実行 ---
console.log("=== TODO 一覧 ===");
showTodos(todos);
// --- Todo を追加する関数 ---
function addTodo(todos: Todo[], title: string): Todo[] {
  const newId = todos.length + 1;
  const newTodo: Todo = { id: newId, title: title, done: false };
  return [...todos, newTodo];
}

// --- 追加して再表示 ---
const updatedTodos = addTodo(todos, "掃除をする");

console.log("");
console.log("=== 追加後の TODO 一覧 ===");
showTodos(updatedTodos);
return [...todos, newTodo];
const a = [1, 2, 3];
const b = [...a, 4]; // [1, 2, 3, 4]
// a はそのまま [1, 2, 3]
