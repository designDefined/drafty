import { View } from "@via/core";
import { UserDetail } from "../entity/User";

export const MyDetailView = View<UserDetail>(() => ({
  key: ["myDetail"],
  from: () => ({
    id: "me",
    name: "홍길동",
    hobbies: [
      { id: "1", name: "운동", color: "#f00" },
      { id: "2", name: "독서", color: "#0f0" },
    ],
    statistics: {
      todo: {
        date: "2021-07-01",
        counts: { total: 1, completed: 0, uncompleted: 1 },
      },
    },
  }),
}));
