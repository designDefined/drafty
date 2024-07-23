import { View } from "@via/core";
import { Todo } from "../entity/Todo";

export const TodosView = View<{ data: Todo[] }>(() => ({
  key: ["todos"],
  from: () => ({
    data: [{ id: "sample", content: "오늘의 할 일", isCompleted: false }],
  }),
}));
