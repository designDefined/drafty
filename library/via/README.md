# VIA

VIA is a simple `View-Intent Architecture` for web frontend.

## Flow

### private

- `_create`: Add target(`Stored`) to store and return.

- `_read`: Find target(`Stored`) from store with given key. If exist, `_check` target and return the result. If not, return `undefined`.

- `_delete`: Remove target(`Stored`) from store.

- `_update`: `_read` target. If exist, change data with given setter.

- `_reset`: `_read` target. If exist, change data with existing `Stored.from`

- `_check`: Return given `Stored` unless it is stale. If stale, `_reset` and return it.

### public

- `get`: `_read` `Stored`. If exists, return read value. If not, `_create` `Stored` with `from` unless it fails or is absent.

### vanilla

```typescript
const CounterView = View<number>((pageId: string) => ({
  key: ["Counter", pageId],
  from: () => 0,
})).use(store);

const ChangeCountIntent = Intent<number, number>((pageId: string) => ({
  key: ["ChangeCount", pageId],
  to: (num: number) => num,
  next: ({ output }) => [CounterView(pageId).set((prev) => prev + output)],
})).use(store);
```

```typescript
const pageId = getPageParams("id");
if (!pageId) throw new Error("page must provide id");

const counterDisplay = document.querySeletor("#counterDisplay");
CounterView(pageId).subscribe((num) => {
  counterDisplay?.innerText = `${num}`;
});

const increaseButton = document.querySelector("#increasebutton");
increaseButton?.addEventListener("click", () =>
  ChangeCountIntent(pageId).send(1),
);

const decreaseButton = document.querySelector("#decreasebutton");
decreaseButton?.addEventListener("click", () =>
  ChangeCountIntent(pageId).send(-1),
);
```

### react

- `useView`: `get` and then `subscribe` on mount. Return or throw value in priority of `Stored.value` - `Stored.promise` - `Stored.error`

```typescript
export const MessageView = View<Message>((messageId: number) => ({
  key: ["Message", { messageId }],
}));

export const Messages = View<{ data: Message[]; next?: string }>(
  (config?: MessagesConfig) => ({
    key: ["Messages", config],
  }),
);
```

```typescript
export const SendMessageIntent = Intent<SendMessageInput, Message>(() => ({
  key: ["SendMessage"],
  next: ({ output }) => [
    MessageView(output.id).update(output, { override: true }),
    MessagesView().update(({ data, next }) => {
      if (!next) data.push(output);
    }),
    (store) => store.invalidate({ key: MessageCountView.alias }),
  ],
}));

export const EditMessageIntent = Intent<Partial<SendMessageInput>, unknown>(
  (id: messageId) => ({
    key: ["EditMessage", { id }],
    next: ({ input }) => [
      MessageView(id).update(input),
      MessagesView().update(({ data }) => {
        const existing = data.find((message) => message.id === id);
        if (existing) merge(existing, input);
      }),
      MessagesView().update(({ data }) => mergeBy(data, { ...input, id })),
    ],
  }),
);
```
