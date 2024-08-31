// import { Div } from "@fluid/core";
// import { Todo } from "../../core/entity/Todo";
// import { useIntent } from "viajs-react";
// import { ToggleCompleteIntent } from "../../core/intent/toggleComplete";

// type TodoProps = { todo: Todo; index: number };

// export default function TodoItem({ todo, index }: TodoProps) {
//   const { send } = useIntent({ intent: ToggleCompleteIntent(todo.id) });

//   return (
//     <Div
//       flex={[0, 0, "auto"]}
//       flow={["row", "nowrap", "center"]}
//       spacing={[4, 8]}
//       className="sans"
//     >
//       {index + 1}. {todo.content} ({todo.date.year}.{todo.date.month}.
//       {todo.date.day}.)
//       <input
//         type="checkbox"
//         checked={todo.isCompleted}
//         onChange={(e) => send({ isCompleted: e.target.checked })}
//       />
//     </Div>
//   );
// }
