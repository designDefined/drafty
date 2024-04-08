# PVI-Samples

프론트엔드용 선언형 아키텍쳐 PVI(Policy-View-Intent)를 테스트하기 위한 프로젝트의 모음입니다.

## Project List

- dialog
  - PVI 구조를
- mock
  - 다른 라이브러리들을 위한 간단한 mock DB & CRUD API를 제공하는 서버 프로젝트입니다.
  - 로컬에서는 잘 작동하지만 배포 환경에는 적합하지 않으므로 배포 시에는 별도의 서버를 두는 것을 추천합니다.
  - 현재 `json-server` 기반으로 작성되어 있지만, `Expressjs`로 리팩토링할 예정.
