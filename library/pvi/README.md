# PVI

## PVI란?

Policy-View-Intent(간단히 PVI)는 선언적 코드 스타일과 단방향 데이터 흐름을 중시하는 오늘날의 프론트엔드 환경에 도입할 수 있는 아키텍쳐입니다. MVI(Model-View-Intent) 아키텍쳐를 기반으로, 서버와 클라이언트가 분리된 환경에서 사용하기 좋게 불필요한 부분을 줄였습니다.

### 핵심 가치

PVI가 지향하는 핵심 가치는 다음과 같습니다.

#### 다른 개발자 / 기획자 / 디자이너와의 협업이 원할하면서도 자율적이어야 한다

로직과 화면을 통합해 사용자가 직접 대면하는 인터페이스를 생성하는 프론트엔드 개발은 다른 분야와의 원활한 협업이 중요합니다. 화면을 그리는 데에는 디자인이 필요하고, 로직을 완성하는 데에는 서버의 API가 필요합니다. 그러나 외부의 작업에 과하게 의존하게 되면, 프론트엔드의 개발 효율이 떨어져 오히려 협업에 방해가 될 수 있습니다.

PVI는 프론트엔드 개발자가 다른 분야의 작업물(이를테면 서버 API나 디자인, 기획 세부사항 등)에 의존할 부분과 의존하지 않을 부분을 구분하고 통제할 수 있게 합니다. 프론트엔드 개발자는 다른 분야의 진척 상황에 맞게 작업을 설계하고 추진할 수 있습니다.

#### 아키텍쳐는 최소한의 의존성만을 가져야 한다

#### 개발자의 창의성은 필수가 아니여야 한다

좋은 아키텍쳐는 개발자를 덜 생각하게끔 만듭니다. 필수적이고 당연한 일들을 할 때 고민을 많이 하다보면 진짜 창의적인 접근이 필요한 부분에서 피로해지기 마련입니다. PVI 라이브러리를 사용하면 타입스크립트 Intellisense를 기반으로 프로젝트의 구조를 파악하기 쉽게 하여 크게 고민하지 않고도 작업의 맥락을 파악하고 코드 스타일을 유지할 수 있게 해줍니다. 비교적 단순한 데이터의 흐름은 빠르게 확정하고, 유려한 디자인 컴포넌트를 생성하거나 복잡한 로직을 처리하는 등의 작업에 집중할 수 있습니다.

### 사전 지식

### MVI

(추후 추가 예정)

### Zod

Zod는 JS/TS를 위한 데이터 파싱 라이브러리로, 어떤 값을 런타임에서 동적으로 검사할 수 있게 합니다. Zod는 여타 검증 라이브러리와 다르게, 검사가 끝난 값의 타입을 검사 내용에 따라 고정시켜줍니다. 따라서 서버 요청이나 사용자의 입력과 같이 그 값을 확신할 수 없는 데이터를 다룰 경우, Zod를 이용해 값을 검증하므로써 타입이 확정되었다 가정하고 이후의 로직을 작업할 수 있습니다. 만약 검증에 실패했다면 자동으로 ZodError가 throw되므로 이에 따라 다른 방식으로 데이터를 처리할 수 있습니다.

PVI의 핵심은 정책을 먼저 작성하고, 작성된 정책에 따라 View와 Intent의 흐름이 엄격하게 통제되게 만드는 것입니다. 이를 위해서는 정책이 강력한 타입 가드를 포함할 필요가 있습니다. 따라서 PVI는 Zod에 강력히 의존하며, 언젠가 의존성에서 벗어나더라도 다른 방식의 데이터 파싱 방안을 마련해야 할 것입니다.

(추후 추가 예정)
[읽을거리1](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/)

## 개념과 사용법

### Policy

정책은 코드로 표현된 기획입니다. 매장의 상품 목록을 조회하고 관리하는 서비스가 있다고 해봅시다. 기본적으로는 상품 목록을 보는 정책과, 상품 목록에 항목을 추가, 수정, 삭제하는 정책이 있겠죠. 기획을 좀 더 자세히 살펴보면 이런 정책에 더 많은 내용을 적을 수 있을 겁니다. 가령 상품 목록에는 어떤 정보가 표시되어야 하는 지, 또는 상품을 생성하려면 어떤 정보를 입력해야 하는 지도 각각의 정책에 명시되어야 합니다. 어떤 정책들은 서로 연결되어 있습니다. 예를 들어 상품 목록에 항목을 추가하면 상품 목록을 조회할 때 표시될 항목이 하나 늘어납니다.

이 정책들을 코드로 옮긴다고 생각해봅시다. 쉽게 생각하면 상품 목록을 어딘가에 데이터로 저장하고, 이를 가져오는 정책과 여기에 항목을 추가하는 정책 등을 간단한 코드로 작성할 수 있겠죠. 문제는 이렇게 작동할 수 있는 프론트엔드 프로젝트가 많지 않다는 겁니다. 프론트엔드 코드베이스에서는 데이터를 직접 조작하지 못합니다. 조작하는 것은 백엔드(서버)의 로직으로 저장되어 있고, 프론트엔드는 요청을 보내거나 받는 일만을 수행합니다.

따라서 프론트엔드의 입장에서 정책은 어떤 로직이 아닙니다. 요청을 보낼 때 필요한 데이터 타입, 응답이 올 것이라 기대되는 데이터 타입, 그리고 정책 간의 연결만을 명시해놓은 함수입니다. 함수의 인자로는 해당 정책의 내용을 특정하는 데 필요한 의존성만이 명시됩니다. 상품 항목을 수정하는 정책의 경우 '어떤 상품을 수정할 것인 지 특정하는 값'이 의존성이라 할 수 있겠습니다.

PVI에서 정책은 크게 View Policy와 Intent Policy로 구분됩니다. 구분을 한 이유는 데이터의 흐름을 단방향으로 통제하기 위해서입니다. View Policy는 사용자에게 보이는 화면을 결정하는 정책입니다. 사용자가 화면을 보고 요청하는 바는 Intent Policy로 명시됩니다. 사용자의 의도가 제대로 전달되면 화면의 일부가 바뀔 것입니다. 따라서 Intent Policy는 특정 View Policy와 연결될 수 있지만, 반대로는 불가능합니다. 화면을 보고 의도를 결정하는 것은 사용자가 할 일이지, 개발자가 할 일은 아니기 때문입니다.

### View Policy

View Policy는 어떤 데이터가 화면에 뿌려질 지를 명시합니다. 자체적으로 map과 invalidate 함수를 갖고 있는데, 이는 Intent Policy에서 연결 관계를 명시할 때 사용하는 인터페이스로 직접 조작하는 것은 권장되지 않습니다.

View Policy를 생성하기 위해서는 `createViewPolicy`로 먼저 정책 생성 함수(이하 VP)를 선언해야 합니다.

```ts
export const VP = createViewPolicy();
```

View Policy는 다음과 같이 생성합니다. `key`는 각 정책별로 고유한 식별자(QueryKey), `model`은 데이터 타입을 명시한 Zod 객체입니다.

```ts
const VPTodos = VP(() => ({
  key: ["todos"],
  model: Todo.array(),
}));
```

VP 함수의 인자는 정책의 의존성을 표현합니다. 타입 캐스팅으로 의존성의 타입을 선언할 수 있습니다.

```ts
const VPTodo = PVI.view((todoId: Todo["id"]) => ({
  key: [{ todo: todoId }],
  model: Todo,
}));
```

ViewPolicy는 주제 별로 나뉘어진 객체로 묶어서 관리되어야 합니다

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

Intent Policy 역시 IP라는 생성 함수를 만들어 사용할 수 있습니다. Intent Policy는 View Policy와 연결될 수 있기 때문에, viewPolicy의 객체를 주입받습니다.

```ts
export const IP = PVI.createIntentPolicyFactory(viewPolicy);
```

Intent Policy는 View Policy처럼 인자로 의존성을 명시하고, key와 model을 가지고 있지만, model이 `{ input: ZodType, output:ZodType }`으로 묶인 객체라는 점이 다릅니다. 그리고 connect 프로퍼티를 통해 viewPolicy와의 관계성을 명시할 수 있습니다.

connect 프로퍼티는 `(intent의 결과물) => (view의 변화)[]` 꼴의 함수입니다. `intent의 결과물`은 다음과 같습니다:

- model의 input. 즉 요청을 보낼 때 필요한 값
- model의 output. 요청의 응답으로 받을 값
- Intent Policy의 의존성

`view의 변화`는 다음과 같습니다:

- invalidate: 다시 서버에 요청을 보내 view의 값을 갱신합니다.
- map: 이전의 view를 받아 새로운 view를 반환하는 함수입니다.

다음은 Todo의 content를 입력받아 Todo를 생성하고, 성공하면 todos라는 view에 새로 생성된 Todo를 하나 추가하면서 동시에 todoCounts라는 view를 값을 새로고침하는 정책(AddTodo)의 예시입니다.

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

주의할 것은, 이렇게 VP와 IP 함수로 생성한 정책들은 정책의 초안(Draft)이라는 겁니다. 실제로 특정 환경에서 사용하기 위해서는 필요한 의존성과 인터페이스를 주입할 필요가 있습니다. 현재는 `@pvi/react` 패키지를 설치하여 React 프로젝트에서 사용할 수 있습니다.

### Usage with React

사용을 위해서는 core 뿐 아니라 React용 PVI 모듈을 설치해야 합니다.

```shell
yarn add @pvi/core @pvi/react
```

생성한 정책의 초안들은 주제 별로 나눠서 관리되고 있을 겁니다. 이 묶음을 `integrateWithReact` 함수를 이용하여 의존성이 주입된 실제 정책으로 만들어야 합니다.

```ts
export const {
  policy,
  hooks: { useView, useStaticView, useViewState, useIntent },
} = integrateWithReact({
  viewPolicy,
  intentPolicy,
  queryClient,
});
```

`integrateWithReact` 함수는 policy와 hooks를 반환합니다. policy는 `{view: viewPolicy, intent: intentPolicy}` 꼴로 묶인 전체 정책의 모음이고, hooks는 리액트 컴포넌트 내에서 정책을 사용할 때 이용 가능한 함수입니다.

View Policy는 `useView` 또는 `useViewState`로 가져올 수 있습니다. useView는 React Suspense 환경에 적합하고, `useViewState`는 `useQuery`와 비슷한 방식으로 작동합니다.

```tsx
export default function MyInformation() {
  const { data } = useView((view) => ({
    policy: view.user.me(),
    repository: UserRepository.me,
  }));
  return <div>{data.name}</div>;
}
```

여기서 repository는 해당 정책의 model에 대하여 `()=>Promise<{data: Model, context: unknown}>` 꼴의 함수를 의미합니다. context를 별도로 둔 이유는 정책의 흐름과 무관하지만 Repository의 작동을 위하 필요한 값(Pagination 관련 정보 등)을 임시로 저장해두기 위해서입니다.

Intent Policy는 `useIntent`로 사용할 수 있습니다. Intent를 작동시키는 방법은 크게 두 가지입니다. 하나는 `input`을 입력하고, `submit`으로 해당 정보를 묶어서 요청을 보내는 것. 다른 하나는 `send`로 값을 입력함과 함께 요청을 보내는 것. form 형식의 화면에는 전자, 클릭 하나로 요청을 보내는 토글 등에는 후자가 적합합니다. 아래는 input과 submit으로 메시지를 입력 후 전송하는 컴포넌트의 예시입니다.

```tsx
export default function MessageInput() {
  const {
    input: { values:{ text }, set },
    submit: sendMessage,
    isValid,
  } = useIntent((intent) => ({
    policy: intent.message.sendMessage,
    repository: MessageRepository.sendMessage,
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isValid) sendMessage()
      }
    >
      메시지 작성:
      <input
        type="text"
        value={value.text.value ?? ""}
        onChange={(e) => set({ text: e.target.value })}
      />
      <button
        type="submit"
      >
        전송
      </button>
    </form>
  );
}
```
