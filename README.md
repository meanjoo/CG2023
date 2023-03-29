# CG2023
2023-1학기 컴퓨터 그래픽스 (code from: https://github.com/youngjinDAU/DAU-CG23-LAB)

## 환경
* Visual Studio Code

## 실행
* `npm i` 또는 `npm install` 필요 (node_modules 폴더가 없는 경우)
* TERMINAL에서 `node main.js`로 서버 실행 후 웹 브라우저에서 http://localhost:8081 로 접속

## 2023-03-13 (2주차)
(main.js의 body 태그>script 태그의 src 속성값을 `./draw_230313.js`로 변경 후 서버 실행)

* Line-Line Intersection: 두 선분이 교차하는 지점에 빨간 점 찍기

## 2023-03-20 (3주차)
(main.js의 body 태그>script 태그의 src 속성값을 `./draw_230320.js`로 변경 후 서버 실행)

* Line, Box, Circle Intersections: 교차 지점에 점 찍기
  * Line-Box Intersection
  
  * Line-Circle Intersection
  
  * Box-Circle Intersection

## 2023-03-27 (4주차)

* Box-Box Collision

  + 교수님 코드  
  ```javascript
  if (pMin.x < qMax.x && pMax.x  > qMin.x && pMin.y < qMax.y && pMax.y > qMin.y)
    return true
  return false
  ```
