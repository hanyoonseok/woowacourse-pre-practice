# 구현할 기능 목록

- [x] eslint 의존성 설치
- [x] 상수 설정
- [x] 초기 데이터 설정
- [x] 초기 화면은 출발역, 도착역을 입력받는 영역과 최단거리, 최소거리를 선택하는 radio button 영역, 길찾기 버튼을 렌더링 한다.
- [x] 최단거리 조회시 최단경로 라이브러리를 이용하여 가중치를 거리로 설정하여 탐색한다.
- [x] 최소거리 조회시 최단경로 라이브러리를 이용하여 가중치를 시간으로 설정하여 탐색한다.
- [x] 길찾기 클릭시 결과 영역을 초기화 한다.
- [x] 길찾기 클릭시 선택 옵션에 따라 탐색한 결과를 결과 영역에 총 거리, 총 소요시간, 이동 경로를 렌더링한다.
- [x] 예외처리
    - [x] 출발역과 도착역은 2글자 이상이어야 한다.
    - [x] 존재하지 않는 역을 출발역 혹은 도착역으로 입력할 수 없다.
    - [x] 출발역과 도착역이 같을 수 없다.
    - [x] 출발역과 도착역이 연결되어있지 않으면 조회할 수 없다.
    - [x] 모든 입력에 대해 공백이거나, 공백이 포함되는 경우를 불허한다.
