# Cascade

Vanilla CSS의 구조를 그대로 사용하면서 약간의 모듈화를 도와주는 라이브러리입니다. CSS-Modules를 사용하는 환경에서 함께 사용할 수 있습니다.

## Concept

CSS Modules를 사용하면 Vanilla CSS의 전역 네임스페이스 문제를 해결할 수 있습니다. 그러나 공통 스타일을 재사용하는 게 어렵습니다. 재사용이 불가능하다면 CSS-In-JS 라이브러리를 사용하는 것과 별반 다르지 않아집니다. 특히나 `Classnames`와 같은 라이브러리를 사용할 때 더 그렇습니다.

`Cascade`는 일부 스타일시트를 명시적으로 공유할 수 있게 도와주는 간단한 라이브러리입니다. CSS-In-CSS 방식을 고수하면서도, 로컬 스타일과 공용 스타일을 쉽게 섞어서 사용할 수 있게 만들어줍니다.

## Usage

### Create CSS Function

프로젝트에 공통으로 사용할 css 함수를 생성합니다. 인자로 공유할 CSS Modules를 전달하면 됩니다.

```ts
import { createStyle } from "@library/cascade";
import layout from "./module/layout.module.css";
import material from "./module/material.module.css";

export const { css } = createStyle<Modules>({
  layout,
  material,
});
```

### 리액트에서 사용하기

css 함수를 이용하여 리액트에서 공용 스타일과 로컬 스타일을 섞어서 사용하세요.

```tsx
import { css } from "@design/style";
import styles from "./SomeComponent.module.css"; // 로컬 스타일

export default function SomeComponent() {
  return (
    <div
      className={css(({ layout, material }) => [
        layout.page, // 공용 스타일
        material.paper, // 공용 스타일
        styles.SomeComponent, // 로컬 스타일
      ])}
    >
      컴포넌트
    </div>
  );
}
```

### 조건부 스타일링

배열의 `falsy`한 값은 무시되므로, 아래와 같이 조건부 스타일링을 할 수 있습니다.

```tsx
import { css } from "@design/style";
import styles from "./SomeButton.module.css"; // 로컬 스타일

export default function SomeButton() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <button
      className={css(({ layout, material, animation }) => [
        layout.pages
        styles.SomeButton,
        !isClicked && animation.blink // 조건부 스타일 적용
      ])}
      onClick={() => setIsClicked(!isClicked)}
    >
      버튼
    </button>
  );
}
```

### 타입스크립트와 사용하기

공용 Style Module은 자동으로 Intellisense가 되지 않습니다. 따라서 타입스크립트와 사용할 때에는, 조금 귀찮아도 수동으로 타입 캐스팅을 해주는 것을 추천합니다. 타입 캐스팅은 css 함수를 생성할 때 진행합니다.

`StyleModule`은 타입 캐스팅에 사용할 수 있는 유틸리티 타입입니다.

```ts
import { createStyle, StyleModule } from "@library/cascade";

type Modules = {
  layout: StyleModule<"page">;
  material: StyleModule<"paper" | "glass">;
};

export const { css } = createStyle<Modules>({
  layout,
  material,
});
```

또는 완전히 수동으로 타입 캐스팅을 해도 무방합니다.

```ts
type Modules = {
  layout: { page: string };
  material: { paper: string; glass: string };
};

export const { css } = createStyle<Modules>({
  layout,
  material,
});
```

### 디자인 시스템과 함께 사용하기

디자인 시스템에 따라 공용 컴포넌트를 정의할 때 모듈화된 CSS를 사용하면 커스터마이징이 난해해진다는 어려움이 있습니다. 라이브러리의 공용 컴포넌트를 사용할 때 해당 컴포넌트와 구성 요소들의 커스터마이징을 편하게 할 수 있다면 좋겠죠. 이 때 `cssNamed` 함수를 이용하면

cssNamed 함수는 `createStyle`에서 함께 생성됩니다.

```ts
export const { css, cssNamed } = createStyle<Modules>({
  layout,
  material,
});
```

공용 컴포넌트를 생성할 때 `cssNamed`로 merge 함수를 생성하세요. merge 함수는 미리 정의한 Namespace에 따른 StyleModule을 받아 css 함수의 결과물과 함쳐줍니다. 아래 예시와 같이, Props로 전달받은 StyleModule을 merge 함수의 인자로 넣으면, 미리 정의된 컴포넌트의 스타일과 사용 시에 커스터마이징한 스타일을 결합할 수 있습니다.

```tsx
import { cssNamed } from "@design/style";
import styles from "./TextInput.module.css";

const { merge } = cssNamed("root", "name", "icon", "input");

type Props = {
  name: string;
  customStyle?: Parameters<typeof merge>[0];
};

export default function TextInput({ name, css }: Props) {
  const custom = merge(css);
  // 혹은 memoizing이 필요하다면
  // const cssRef = useRef(css);
  // const custom = useMemo(()=>merge(cssRef.current), []);

  return (
    <label className={custom.root(() => styles.TextInput)}>
      <div
        className={custom.name(({ typo }) => [typo.description, styles.name])}
      >
        {name}
      </div>
      <image className={custom.icon(() => styles.icon)} />
      <input className={custom.input(() => styles.input)} />
    </label>
  );
}
```

공용 컴포넌트의 Props로는 기존의 css 함수와 흡사하지만, Namespace가 특정된 객체를 리턴하는 함수를 전달할 수 있습니다.

```tsx
export default function UserForm() {
  return (
    <form className={() => styles.UserForm}>
      <TextInput
        css={({ typo }) => ({
          root: styles.textInputWrapper, // TextInput.root에 대한 스타일
          name: [typo.warning, styles.textInputName], // TextInput.name에 대한 스타일
        })}
      >
        가나다
      </TextInput>
      <submit className={css(() => styles.submitButton)}>제출</submit>
    </form>
  );
}
```

타입스크립트를 사용한다면 다음과 같이 `StyleProps` 유틸리티 타입을 하나 정의하여 사용하면 편합니다.

```tsx
import { cssNamed } from "@design/style";

export type StyleProps<Merge extends ReturnType<typeof cssNamed>["merge"]> = {
  customStyle?: Parameters<Merge>[0];
};
```

```tsx
import { cssNamed } from "@design/style";
import { StyleProps } from "@design/component/types";

const { merge } = cssNamed("root", "partOne", "partTwo");

type Props = {
  /*
    ...Component Props
  */
};

export default function Button({
  customStyle,
  ...props
}: Props & StyleProps<typeof merge>) {
  const css = merge(customStyle);
  /*
    ...Component Codes...
  */
}
```
