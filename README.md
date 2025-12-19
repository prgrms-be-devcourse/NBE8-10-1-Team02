# Super Coffee Mario (슈퍼 커피 마리오)

<img width="383" height="237" alt="Image" src="https://github.com/user-attachments/assets/60b62f93-0c69-4c53-a465-f8890856a24c" />

---

## 1. 프로젝트 소개
- **프로젝트 명**: Super Coffee Mario
- **배경**: 이메일만으로 주문하고 조회할 수 있는 커피 주문 시스템입니다.

---

## 2. 주요 기능
- **메인 페이지**: 서비스 아이덴티티를 강조한 브랜딩 및 직관적인 메뉴 진입로 제공.
- **비회원 주문 조회**: 별도의 로그인 없이 이메일 식별을 통한 주문 내역 필터링 및 조회.
- **주문 관리 시스템**: 관리자 전용 페이지를 통한 전체 주문 현황 모니터링.

---

## 3. 개발 기간
- **2025년 12월 15일 ~ 2025년 12월 22일**

---

## 4. 팀원 소개
| 이름 | 역할 | 작업 내용 |
| :--- | :--- | :--- |
| 원수현(팀장) | BE, FE |  |
| 김경재 | BE, FE |  |
| 김현진 | BE, FE | 메인 페이지 구성, 이메일 주문 조회, 삭제 기능 구현 |
| 송찬의 | BE, FE |  |

---

## 5. 개발 환경 (Development Environment)

| 분류 | 도구 | 용도 |
| :--- | :--- | :--- |
| **Design** | **Figma** | 홈페이지 디자인 |
| **Modeling** | **draw.io (diagrams.net)** | 데이터베이스 ERD 설계 |
| **IDE** | **IntelliJ IDEA**, **VS Code**, **Cursor** | 백엔드 및 프론트엔드 개발 환경 |
| **VCS** | **GitHub**, **Git** | 코드 버전 관리, 이슈 트래킹, 협업 관리 |
| **Management** | **GitHub**, **Notion** | 칸반 보드를 활용한 작업 단위(Issue) 관리 및 문서화 |
| **Testing** | **Postman**, **H2 Console** | REST API 테스트 및 데이터 검증 |

---
## 6. 기술 스택

| 분류 | 기술 스택 (Tech Stack) | 상세 설명 |
| :--- | :--- | :--- |
| **Backend** | **Java 25**, **Spring Boot 4.0.0** | 최신 Java 런타임 및 Spring 환경 활용 |
| **Frontend** | **Next.js 16.0**, **React 19.2** | 최신 App Router 및 React 서버 컴포넌트 활용 |
| **Language** | **TypeScript 5.x** | 정적 타입을 통한 프론트엔드 코드 안정성 확보 |
| **Styling** | **Tailwind CSS 4.0** | 최신 v4 엔진 기반의 유틸리티 퍼스트 스타일링 |
| **ORM / DB** | **Spring Data JPA**, **H2** | 객체 중심 데이터 설계 및 인메모리 DB 활용 |
| **Build Tool** | **Gradle**, **NPM** | 백엔드 및 프론트엔드 의존성 관리 |

---

## 7. ERD

<img width="851" height="228" alt="Image" src="https://github.com/user-attachments/assets/e63a4ff9-74e0-4db3-8997-1c4442510f12" />

---

## 8. API
| 기능 | HTTP | 경로 | 담당 |
| :--- | :---: | :--- | :--- |
| 메인 페이지 | - | `/` | 김현진 |
| 주문 페이지 진입 | `GET` | `/items` | 팀원 |
| 주문하기 | `POST` | `/orders` | 팀원 |
| 내 주문 확인 | `GET` | `/orders?email={email}` | 김현진 |
| 주문 상세 | `GET` | `/orders/{id}` | 팀원 |
| 주문 수정 | `PUT` | `/orders/{id}` | 팀원 |
| 주문 삭제 | `DELETE` | `/orders/{id}` | 김현진 |
| 관리자 페이지 | `GET` | `/admin/orders` | 팀원 |
