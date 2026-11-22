# 21901037 이준형

## 프로젝트 소개

12주차 React Hooks 실습이다. 강의 스타터는 https://github.com/2026-2-OSS/week12_starter_project 이고, 이 프로젝트를 받아서 useEffect와 useRef로 랩 4개를 작성했다. 화면 제목은 초시계랑 입력창으로 바꿨다.

## 설치와 실행

프로젝트 폴더에서 npm install을 한 뒤 npm run dev를 실행하고 http://localhost:5173 을 열었다. 위쪽에 제목과 랩 1부터 랩 4 버튼이 있고, 버튼을 누르면 그 랩만 화면에 남는다. 콘솔 오류는 없었다.

## 소스 코드 분석

src/App.jsx가 제목과 랩 전환을 담당하고, 선택된 번호는 active state에 둔다. 랩 화면은 src/components의 Lab1_EffectTimer.jsx, Lab2_TimerControl.jsx, Lab3_InputFocus.jsx, Lab4_RefTimer.jsx이다. 스타일은 src/App.css다.

### useEffect

화면을 그린 뒤에 실행된다. 두 번째 인자 배열의 값이 바뀔 때만 다시 실행되고, 빈 배열이면 마운트 때 한 번이다. return한 함수는 cleanup이라서 다음 effect 전이나 컴포넌트가 사라질 때 실행된다.

### useRef

current에 값을 저장한다. current를 바꿔도 화면은 다시 그려지지 않고, useState는 값을 바꾸면 다시 그려진다. 화면에 보이는 숫자와 상태는 state에 두고, 타이머 번호와 input 요소는 ref에 두었다.

### Lab1_EffectTimer.jsx

useEffect 안에서 setInterval로 1초마다 setCount(prev => prev + 1)를 호출한다. count + 1을 쓰면 첫 렌더의 값만 기억해서 prev로 적었다. 의존성 배열은 빈 배열이다. return에서 clearInterval(timerId)로 타이머를 끈다.

### Lab4_RefTimer.jsx

timerRef는 useRef(null)이다. start에서 current가 이미 있으면 return하고, 없으면 setInterval 번호를 current에 저장한다. stop은 clearInterval 후 current를 null로 둔다. 숫자 변경은 setCount가 담당하고, 아래 useEffect는 언마운트 때 타이머를 정리한다.

## 랩 구현

### 랩 1

마운트되면 1초마다 증가한다. 9초면 00:09로 보이고 아래에 경과 9초가 나온다. 다른 랩으로 이동하면 타이머가 정리되고, 다시 열면 0부터 센다.

### 랩 2

Start로 시작하고 Stop으로 멈추며 Reset은 멈추고 00:00으로 돌린다. running이 false면 타이머를 만들지 않고, running이 바뀌면 이전 타이머는 cleanup으로 제거된다. 실행 중에는 Start가 비활성화된다. 상태는 Running과 Stopped로 구분된다.

### 랩 3

input에 ref를 연결했다. Focus는 inputRef.current.focus()로 커서를 옮기고, Clear는 입력값을 지운 뒤 다시 focus한다. 한 글자면 두 글자 이상 입력하라는 문장이 나오고, 숫자가 있으면 숫자를 빼라는 문장이 나온다. 준형을 입력하면 사용할 수 있는 이름입니다가 나왔다.

### 랩 4

Start, Stop, Reset이 동작한다. 타이머 번호는 ref에 있으므로 Start를 연속으로 눌러도 타이머는 하나만 생긴다. 다른 랩으로 가면 cleanup이 인터벌을 끈다. 실행 중 Reset해도 00:00에서 멈춘다.

## 랩 비교

### Dependency Array가 필요한 이유

effect를 다시 실행할 시점을 정하기 위해서다. 배열이 없으면 렌더링마다 setInterval이 추가된다. 빈 배열은 처음 한 번, running을 넣으면 그 값이 바뀔 때만 다시 실행된다.

### Cleanup을 쓰지 않으면

컴포넌트가 사라져도 setInterval이 남는다. 랩을 옮겨도 이전 타이머가 숫자를 계속 증가시키고, 시작을 반복하면 타이머가 겹친다.

### useState와 useRef의 차이

state를 바꾸면 화면이 다시 그려지고, ref의 current만 바꾸면 다시 그려지지 않는다. 보여줄 값은 state, 화면에 직접 나오지 않는 타이머 번호와 DOM은 ref에 두는 편이 맞다.

### 랩 2와 랩 4의 차이

랩 2는 running이 바뀌면 useEffect가 타이머를 만들거나 cleanup으로 지운다. 타이머 번호는 effect 안의 지역 변수다. 랩 4는 Start에서 바로 setInterval을 하고 번호를 timerRef.current에 저장하며, Stop도 그 번호를 바로 clearInterval한다. 랩 4의 useEffect는 언마운트 때 정리하는 용도다.

## 수정 내용

index.html의 탭 제목을 초시계랑 입력창으로 바꿨다. src/App.jsx의 제목과 설명을 바꿨다. src/App.css의 배경, 버튼, 숫자 색을 바꾸고 실행 상태와 입력 오류 색을 추가했다. Lab1_EffectTimer.jsx, Lab2_TimerControl.jsx, Lab4_RefTimer.jsx에 초를 00:00으로 보여주는 formatTime을 넣었다. Lab3_InputFocus.jsx에 이름 검사를 넣고 useId로 label과 input을 연결했다. Lab4_RefTimer.jsx의 start는 타이머가 이미 있으면 return하도록 수정했다.

## Weekly Review

### 새롭게 배운 내용

effect는 렌더링이 끝난 뒤에 실행된다. 빈 배열과 값이 들어 있는 배열은 다시 실행되는 시점이 다르다. ref를 변경해도 화면은 다시 그려지지 않는다.

### 어려웠던 점과 해결 방법

랩 1은 탭을 바꿔도 숫자가 계속 증가했다. cleanup이 없어서 인터벌이 남아 있었고, return에 clearInterval을 넣어 해결했다. 랩 4는 Start를 연속으로 누르면 타이머가 두 개 생겼다. 버튼 비활성화만으로는 막히지 않아서 timerRef.current를 먼저 확인했다.

### AI 활용과 느낀 점

effect가 언제 실행되는지 헷갈릴 때 AI에게 물어본 뒤, 브라우저에서 직접 다시 확인했다. 타이머가 겹치는 이유도 질문하고 ref 검사를 코드에 넣었다. 질문하면 원인은 빨리 알 수 있었지만, 화면에서 눌러 보지 않으면 틀린 동작을 지나치기 쉬웠다.
