# TripNbnb Client

## Development

```sh
git clone https://github.com/Tripandbnb/TripNbnb-project.git
cd client_side
npm install # install dependencies
npm start # start server on http://localhost:3000
```

## Directory Structure

```sh
├── craco.config.js
├── package.json
├── src
│   ├── App.tsx
│   ├── __tests__
│   │   ├── Filter.test.tsx
│   │   ├── RequiredLogin.test.tsx
│   │   ├── UserContext.test.tsx
│   │   └── server
│   │       ├── config
│   │       │   └── env.js
│   │       └── index.js
│   ├── api
│   │   ├── date
│   │   │   └── index.ts
│   │   ├── reviews
│   │   │   └── index.ts
│   │   └── user
│   │       └── index.ts
│   ├── components
│   │   ├── common
│   │   │   ├── GridContainer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── typography
│   │   │   │   └── index.tsx
│   │   │   └── user
│   │   │       ├── Avatar.tsx
│   │   │       └── PopoverAvatar.tsx
│   │   ├── map
│   │   │   ├── Container.tsx
│   │   │   ├── detail
│   │   │   │   ├── Container.tsx
│   │   │   │   ├── Intro.tsx
│   │   │   │   ├── LikesPlace.tsx
│   │   │   │   ├── Photos.tsx
│   │   │   │   ├── Reviews.tsx
│   │   │   │   ├── ReviewsInput.tsx
│   │   │   │   ├── ReviewsTab.tsx
│   │   │   │   ├── Thumbnails.tsx
│   │   │   │   ├── common
│   │   │   │   │   ├── Loading.tsx
│   │   │   │   │   └── Section.tsx
│   │   │   │   ├── reservation
│   │   │   │   │   ├── Container.tsx
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   ├── Information.tsx
│   │   │   │   │   ├── Modal.tsx
│   │   │   │   │   └── Price.tsx
│   │   │   │   └── style
│   │   │   │       └── picker_panel.css
│   │   │   ├── hooks
│   │   │   │   ├── FetchPlace.ts
│   │   │   │   └── reservation-hooks.ts
│   │   │   ├── menu
│   │   │   │   ├── Filter.tsx
│   │   │   │   └── SearchButton.tsx
│   │   │   ├── overlay
│   │   │   │   ├── Container.tsx
│   │   │   │   └── Content.tsx
│   │   │   └── search
│   │   │       ├── Box.tsx
│   │   │       ├── Function.tsx
│   │   │       ├── HighlightOverlay.tsx
│   │   │       └── List.tsx
│   │   └── user
│   │       ├── Divider.tsx
│   │       ├── Information.tsx
│   │       ├── Places.tsx
│   │       ├── RequiredLogin.tsx
│   │       ├── Reviews.tsx
│   │       └── hooks
│   │           └── user-hooks.ts
│   ├── context
│   │   ├── Map.ts
│   │   ├── Marker.tsx
│   │   ├── PlaceDataHandler.tsx
│   │   └── User.ts
│   ├── event
│   │   ├── Login.tsx
│   │   ├── MapCenter.ts
│   │   ├── Marker.tsx
│   │   └── TileLoaded.tsx
│   ├── index.tsx
│   ├── pages
│   │   ├── Info.tsx
│   │   ├── Main.tsx
│   │   ├── Map.tsx
│   │   ├── OAuth.tsx
│   │   └── index.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   ├── styles
│   │   └── global.less
│   └── type.d.ts
├── tsconfig.json
└── yarn.lock
```

- `craco.config.js`

CRA에서 reject 하지 않고 웹팩 설정을 수정하기 위해 `craco`를 사용, 그 설정 파일

- `src/api/`

서버에서 특정 데이터를 가져오기 위한 로직 분리

- `src/components/common/`

모든 컴포넌트에서 공통적으로 사용되는 컴포넌트 `e.g) typography, user, layout...`

- `src/components/map/`

맵의 여러 부분을 구성하는 컴포넌트 마커 클릭 시 생기는 UI 컴포넌트 포함, 그 컴포넌트가 포함하는 플레이스, 리뷰, 예약, 사진 등을 그리기 위한 컴포넌트 포함, 이 구역 재검색, 마커 필터링 등에 필요한 메뉴 컴포넌트 포함, 서버와 예약 정보를 주고받기 위한 `reservation-hooks` 포함, 플레이스 정보를 가져오기 위한 훅 포함

- `src/components/user/`

유저 프로필 페이지를 그리기 위한 컴포넌트, 유저의 예약 정보, 리뷰 정보, 리스트에 담은 플레이스 정보를 그리기 위한 컴포넌트 포함

- `src/context/`

상위 컴포넌트에서 깊이가 큰 하위 컴포넌트까지 데이터를 뿌려주기 위한 컨텍스트 포함

- `src/event/`

컴포넌트에서 발생하는 이벤트를 감지하거나 발생시키는 이벤트 컴포넌트 로직 분리

- `src/pages/`

각 경로마다 다른 페이지를 그리기 위한 페이지 래퍼 컴포넌트 각각 파일 이름으로 구분하고 `index.tsx`에서 모든 라우터를 관리

- `src/styles/`

전역 스타일 포함

- `src/type.d.ts`

외부 SDK를 사용해 동적으로 바인딩되는 객체들을 전역적으로 타이핑하기 위함. 혹은 너무 긴 인터페이스 명을 짧게 별칭으로 사용하기 위함.
