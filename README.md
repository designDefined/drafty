# PVI-Samples

프론트엔드용 선언형 아키텍쳐 PVI(Policy-View-Intent)를 테스트하기 위한 프로젝트의 모음입니다.

## How To Use

### 디렉토리 구조

- `/project`
  - 프론트엔드 프로젝트의 모음입니다.
- `/library`
  - 모든 프로젝트에서 공용으로 사용할 수 있는
- `/mock`
  - 프로젝트를 위한 간단한 mock DB & CRUD API를 제공하는 서버의 모음입니다.
  - 로컬에서는 잘 작동하지만 배포 환경에는 적합하지 않으므로 배포 시에는 별도의 서버를 두는 것을 추천합니다.
  - 현재 `json-server` 기반으로 작성되어 있지만, `Express`로 리팩토링 예정.

### 프로젝트 사용해보기

모든 프로젝트는 로컬에서만 작동하며, `yarn`과 `node`가 설치되어 있어야 합니다.

```shell
# 모노레포와 의존성 설치
yarn

# 로컬 DB 생성
yarn initialize-db

# 프로젝트 구동
yarn dev:프로젝트명
```

모든 프로젝트는 `http://localhost:3000`, 서버는 `http://localhost:3001`에서 구동됩니다.

### 아키텍쳐에 대해 궁금하다면

아래 Library List 중에서 호기심이 가는 라이브러리의 `README.md`를 읽어보세요! 모든 라이브러리에는 README가 자세하게 작성되어 있습니다. 가장 핵심적인 라이브러리는 [PVI-React](./library/pvi/react/README.md)입니다.

## Library List

- `pvi`
  - 앞서 설명한 Policy-View-Intent 구조의 프론트엔드 프로젝트를 만들 때 사용할 수 있는 라이브러리입니다. 핵심적인
  - 현재는 리액트 환경(react와 react-query)에 의존하는 라이브러리만 존재하며, 추후 확장할 예정입니다. (`@pvi/react`)
- `cascade`
  - CSS Modules와 함께 사용할 수 있는 스타일링 라이브러리입니다. 모듈화된 `css-in-css` 환경을 고수하면서도 공용 스타일을 적용하거나 스타일 커스터마이징이 가능한 디자인 시스템 라이브러리를 만드는 데 사용할 수 있습니다.

## Project List

- `dialog`
  - PVI 구조를 이용하여 상태 변화를 간단히 구현해놓은 리액트 프로젝트입니다.
