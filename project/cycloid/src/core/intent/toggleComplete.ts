import { Intent } from "@via/core";
import { TodosView } from "../view/todos";

export const ToggleCompleteIntent = Intent<
  { isCompleted: boolean },
  boolean,
  [string]
>((todoId) => ({
  key: ["checkTodo"],
  to: () => true,
  next: ({ i }) => [
    TodosView().set(({ data: todos }) => {
      todos.find(({ id }) => id === todoId)!.isCompleted = i.isCompleted;
    }),
  ],
}));
