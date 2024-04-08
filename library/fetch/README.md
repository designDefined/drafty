# Fetch

새로운 fetch 함수를 만듭니다. fetch 함수는 아주 간단한 기능만을 제공합니다.

- request body로 객체를 보낼 때 자동으로 컨텐츠 타입을 `application/json`으로 지정합니다.
- 응답에 오류가 있으면 프로미스를 `reject` 처리합니다.
- Bearer 토큰을 가져오는 로직이 있으면 자동으로 `Authorization` 헤더에 첨부합니다.

## How To Use

### create fetch

공용으로 사용할 fetch 함수를 만듭니다. 보통 한 프로젝트에 하나이나, 용도에 따라 여러개를 만들 수도 있습니다.만들 때에는 baseUrl을 미리 등록할 수 있습니다.

```ts
import { createFetch } from "@library/fetch";

export const { api } = createFetch({
  baseUrl: "http://localhost:8080",
});
```

### send request

GET 요청은 url과 header, POST, PATCH, PUT, DELETE는 url과 body, header를 인자로 받습니다.
url 말고는 모두 optional합니다.

```ts
api.get("/somewhere");
api.post("/else", { dataToPost: { foo: "bar" } });
```

### auth

생성 시 `getAuth` 함수를 명시하면 `authApi`를 통해 토큰이 첨부된 요청을 자동으로 보낼 수 있습니다.

```ts
export const { api, authApi } = createFetch({
  baseUrl: "http://localhost:8080",
  getAuth: () => localStorage.getItem("token"),
});

authApi.post("/needAuth", { dataToPost: "something secret" });
```
