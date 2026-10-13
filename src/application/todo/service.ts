import type { TodoRow } from "../../domain/todo/types.js";
import { validateTitle } from "../../domain/todo/validate.js";
import {
  deleteTodoById,
  findAllTodos,
  findTodoById,
  insertTodo,
  updateTodoDone,
} from "../../infrastructure/todo/repository.js";

export function listTodos(): TodoRow[] {
  return findAllTodos();
}

export function createTodo(rawTitle: unknown): TodoRow {
  const title = validateTitle(rawTitle);
  return insertTodo(title);
}

export function toggleTodoDone(id: number): TodoRow | undefined {
  const todo = findTodoById(id);
  if (!todo) {
    return undefined;
  }
  return updateTodoDone(id, !todo.done);
}

export function removeTodo(id: number): boolean {
  return deleteTodoById(id);
}
