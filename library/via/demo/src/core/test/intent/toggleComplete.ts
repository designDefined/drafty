import { Intent } from "@via/core";
import { TodosView } from "../view/todos";
import { MyDetailView } from "../view/myDetail";

export const ToggleCompleteIntent = Intent<
  { isCompleted: boolean },
  boolean,
  [string]
>((todoId) => ({
  key: ["toggleComplete"],
  to: () => true,
  next: ({ i }) => [
    TodosView().set(({ data: todos }) => {
      todos.find(({ id }) => id === todoId)!.isCompleted = i.isCompleted;
    }),
    MyDetailView().set((prev) => {
      prev.statistics.todo.counts.uncompleted += i.isCompleted ? -1 : 1;
      prev.statistics.todo.counts.completed += i.isCompleted ? 1 : -1;
    }),
  ],
}));
