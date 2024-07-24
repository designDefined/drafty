import { Intent } from "@via/core";
import { z } from "zod";
import { zodUtil } from "../../util/zodUtil";

export const AddTodoInput = z.object({
  content: z.string(),
  date: z.object({
    year: z.number(),
    month: z.number().min(1).max(12),
    day: z.number().min(1).max(31),
  }),
});
export type AddTodoInput = z.infer<typeof AddTodoInput>;

export const AddTodoIntent = Intent<AddTodoInput, boolean>(() => ({
  key: ["addTodo"],
  to: (input) => {
    console.log(input);
    return true;
  },
  from: () => ({ content: "", date: { year: 2024, month: 7, day: 24 } }),
  model: { tree: zodUtil.deepParse(AddTodoInput), output: z.boolean().parse },
}));
