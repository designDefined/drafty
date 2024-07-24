import { View } from "@via/core";
import { Todo } from "../entity/Todo";

export const TodosView = View<{ data: Todo[] }>(() => ({
  key: ["todos"],
  from: () => ({
    data: [
      {
        id: "sampleTodo",
        content: "오늘의 할 일",
        isCompleted: false,
        date: { year: 2024, month: 7, day: 1 },
        assignedUsers: [
          {
            id: "sampleUser",
            name: "홍길동",
            hobbies: [
              { id: "1", name: "운동", color: "#f00" },
              { id: "2", name: "독서", color: "#0f0" },
            ],
          },
        ],
      },
    ],
  }),
}));
