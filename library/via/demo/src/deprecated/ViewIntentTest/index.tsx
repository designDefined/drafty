// import { useView } from "viajs-react";
// import { useEffect, useState } from "react";
// import { Div, Span } from "@fluid/core";

// import { TodosView } from "../../core/view/todos";
// import TodoItem from "./TodoItem";

// import "../../core/intent/addTodo";
// import MyDetail from "./MyDetail";
// import AddTodoInput from "./AddTodoInput";

// export default function ViewIntentTest() {
//   const [counts, setCounts] = useState({ status: 0, todos: 0, update: 0 });

//   const {
//     value: { data: todos },
//     status,
//     update,
//   } = useView({
//     view: TodosView(),
//   });

//   useEffect(() => {
//     setCounts((prev) => ({ ...prev, status: prev.status + 1 }));
//   }, [status]);

//   useEffect(() => {
//     setCounts((prev) => ({ ...prev, todos: prev.todos + 1 }));
//   }, [todos]);

//   useEffect(() => {
//     setCounts((prev) => ({ ...prev, update: prev.update + 1 }));
//   }, [update]);

//   return (
//     <Div flex={[0, 0, "auto"]} spacing={[20, 10]}>
//       <Div className="sans h2">View - Intent Test</Div>
//       <Div flow={["row", "nowrap", "center"]} spacing={[0, 10]}>
//         <Span flex={[0, 0, "auto"]} className="sans bold">
//           Rerender Counts:
//         </Span>
//         <Span flex={[0, 0, "auto"]} className="sans">
//           status: {counts.status} / todos: {counts.todos} / update:{" "}
//           {counts.update}
//         </Span>
//       </Div>
//       <Div flow={["column"]} spacing={[0, 10]}>
//         {todos.map((todo, index) => (
//           <TodoItem todo={todo} index={index} key={todo.id} />
//         ))}
//       </Div>
//       <AddTodoInput />
//       <MyDetail />
//     </Div>
//   );
// }
