## 설치 및 실행

```
  yarn && yarn dev
```

## 사용 기술

- next.js
- constate
- axios
- react-query
- typescript

## 구조

### 디렉토리 구조

- assets: svg 파일 관리
- components: 각종 컴포넌트 관리
- pages
  - /Main.tsx: 사이트 입장 시 초기에 보이는 검색어 입력 화면입니다.
  - /result/SearchResult.tsx: 검색 시 검색 결과를 보여주는 화면입니다.
- providers: 앱 사용에 필요한 provider를 정의한 곳입니다.

### 코드 구조

```
  <QueryClientProvider>
    <AxiosInstanceProvider>
      <ApiProvider>
        <Component />
      </ApiProvider>
    </AxiosInstanceProvider>
  </QueryClientProvider>
```

- Provider를 이용하여 api 호출에 필요한 전역상태를 관리하고 있습니다.
- AxiosInstanceProvider: axios 인스턴스를 생성하여 관리합니다
- ApiProvider: api와 axios 인스턴스를 조합하여 관리합니다.

### 개선점

- 앱의 확장성을 고려했을 때 useQuery 등의 react-query hook로 생성되는 쿼리결과를 provider에 모아 전역상태로 관리가 가능할 것 같습니다.
- 무한 스크롤을 구현하며 api의 반환값을 수정해도 좋을 것 같습니다. 마지막으로 받은 데이터의 인덱스값 또한 반환값으로 받아서, 다음에 들어갈 from에 입력할 수 있다면 `useInfiniteQuery`를 더 원활하게 사용할 수 있을 것으로 보입니다.
