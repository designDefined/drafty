# TO-BE

## Core

### Constants

Constants types are nouns in `PASCAL_CASE`.

```ts
// core/base/constants/id.ts
const INTEGER_ID = z.number().int().nonnegative();
export const USER_ID = INTEGER_ID;
export type USER_ID = Typed<typeof USER_ID>;
```

### Utils

Util types are adjectives.

```ts
// core/base/utils/identified.ts
export const Identified = {
  user: z.object({ id: USER_ID }).extend,
};
export type Identified = EnumTyped<GenericTyped<typeof Identified>>;
```

### Entities

Entity types are nouns.

```ts
// core/base/entities/user/index.ts
export const User = Identified.user({
  name: z.string().min(1).max(20),
  createTime: IsoDate,
});
export type User = Typed<typeof User>;
```

## Policy

### View

View policies are nouns.

```ts
// core/policy/user/view/me.ts
export const VPMe = PVI.view(() => ({
  key: ["user", "me"],
  model: Async(User),
}));
```

```ts
// core/user/view/profile.ts
export const VPProfile = PVI.view<Identified["user"]>((userId) => ({
  key: ["user", "profile", userId],
  model: Async(User),
}));
```

```ts
// core/user/index.ts
const userPolicy = {
  view: {
    me: VPMe,
    profile: VPProfile,
  },
  intent: {
    // intents...
  },
};
```

### Intent

Intent policies are verbs.

```ts
// core/user/intent/changeMyProfile.ts
const input = User.pick({ name: true }).partial();
const output = User;

export const IPChangeMyProfile = PVI.intent(() => ({
  key: ["user", "changeMyProfile"]
  model: { input, output },
  connect: (policy, { output }) => [
    policy.user.view.me().revalidate(),
    policy.user.view.users.map(IdentifiedLense.user(output)),
  ],
}));
```

## Hooks

- useView
- useViewData
- useIntent

## Component

```tsx

```

## UI

```tsx
function MyInformation() {
  const { name } = useView(policy.user.view.me);
  return (
    <section className={design(self.container)}>
      <div className={design(self.title)}>My Information</div>
      <div className={design(self.name)}>name: {name}</div>
      <MyStatistics />
    </section>
  );
}

function MyStatistics() {
  const { wrote, received } = useViewData(policy.view.me)(
    (data) => data.statistics.count,
  );
  return (
    <div className={style(parent.card)}>
      <div>messages wrote: {wrote}</div>
      <div>messages received: {received}</div>
    </div>
  );
}
```
