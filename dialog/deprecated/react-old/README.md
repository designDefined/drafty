# Concept

## Policy

정책은 코드로 표현한 기획의 상세 내용이다.

### View Policy

```ts
const VPTodos = PVI.view(() => ({
  key: ["todos"],
  model: Todo.array(),
}));
```

의존성은 타입 캐스팅으로 명시한다.

```ts
const VPTodo = PVI.view((todoId: Todo["id"]) => ({
  key: [{ todo: todoId }],
  model: Todo,
}));
```

반드시 상위 분류를 두어 관리한다.

```ts
const viewPolicy = {
  me: {
    information: VPInformation,
    todoCounts: VPTodoCounts,
  }
  todo: {
    todo: VPTodo,
    todos: VPTodos
  }
};
```

### Intent Policy

```ts
const input = Todo.pick({ content: true });
const output = Todo;
const IPAddTodo = PVI.intent(() => ({
  key: ["addTodo"],
  model: { input, output },
  connect: ({ view, output }) => [
    view.todo.todos.map((prev) => [...prev, output]),
    view.me.todoCounts.invalidate(),
  ],
}));
```

## Usage with React

```ts
const Policy = {};

const policy = PVIReact();
```
