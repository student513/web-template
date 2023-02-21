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
