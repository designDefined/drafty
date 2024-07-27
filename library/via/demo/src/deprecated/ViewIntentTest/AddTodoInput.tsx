// import { useIntentInput } from "@via/react";
// import { AddTodoIntent } from "../../core/intent/addTodo";

// export default function AddTodoInput() {
//   const {
//     values: {
//       content,
//       date: { year, month, day },
//     },
//     set,
//   } = useIntentInput({
//     intent: AddTodoIntent(),
//   });
//   return (
//     <div>
//       <div>
//         프리뷰: 1. {content.value} ({year.value}.{month.value}.{day.value})
//       </div>
//       <div>
//         content:{" "}
//         <input
//           value={content.value}
//           onChange={(e) =>
//             set((prev) => {
//               prev.content.value = e.target.value;
//             })
//           }
//         />
//         {content.error ? <span>에러!</span> : <span>괜찮</span>}
//       </div>
//       <div>
//         year:{" "}
//         <input
//           value={year.value}
//           onChange={(e) => set({ date: { year: Number(e.target.value) } })}
//         />
//         {year.error ? <span>에러!</span> : <span>괜찮</span>}
//       </div>
//       <div>
//         month:{" "}
//         <input
//           value={month.value}
//           onChange={(e) => set({ date: { month: Number(e.target.value) } })}
//         />
//         {month.error ? <span>에러!</span> : <span>괜찮</span>}
//       </div>
//       <div>
//         day:{" "}
//         <input
//           value={day.value}
//           onChange={(e) => set({ date: { day: Number(e.target.value) } })}
//         />
//         {day.error ? <span>에러!</span> : <span>괜찮</span>}
//       </div>
//     </div>
//   );
// }
