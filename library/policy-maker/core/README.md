```ts
export const useView = (policy, repository) => {
  const store = useStore();
  const data = useMemo(() => store.get(policy.key, repository), [policy.key]);
  return { data: repository };
};
```

```tsx
import styles from "./TodoList.module.css";

export default function TodoList() {
  const { data } = useView(view.todo.todos(), TodoRepository.getTodos());

  return (
    <ul className={styles.TodoList}>
      {data.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
```

```tsx
export default function TodoDetail() {
  const todoDomain = useTodoDomain();
  const { data } = useView({
    policy: viewPolicy.todo.todo(todoDomain),
    from: () => TodoRepository.getTodo(todoDomain),
  });
}
```
