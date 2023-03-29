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

  우선 선분을 하나 긋기 위해서는 시작점과 끝점, 총 2개의 점이 필요하다. 즉 두 개의 선분을 긋기 위해서는 4개의 점이 필요하다.
  
  각 선분의 직선의 방정식을 구한다. 선분의 양 끝점을 알고 있으므로 선분의 직선의 방정식을 구할 수 있다.
  
  * 기울기와 한 점을 알 때 직선의 방정식 구하기
  
    기울기가 $m$이고, y절편이 $n$일 때, 직선의 방정식은 $y=mx+n$이다.
  
    기울기가 $m$이고, 한 점의 좌표가 $P(x_1, y_1)$일 때는 기울기와 한 점의 좌표를 직선의 방정식에 대입하여 $n$을 구할 수 있다.  
    $y_1=m \times x_1+n$에서 $n=y_1-m \times x_1$으로 구할 수 있다.
    
    따라서 기울기가 $m$이고, 한 점의 좌표가 $P(x_1, y_1)$일 때, 직선의 방정식은 $y=mx+(y_1-m \times x_1)$이다.
  
  * 두 점을 알 때 직선의 방정식 구하기
  
    $P(x_1, y_1), Q(x_2, y_2)$의 기울기는 $m=\frac{y_2-y_1}{x_2-x_1}$이다.
    
    기울기와 한 점을 알면 위처럼 직선의 방정식을 구할 수 있으므로 $P$나 $Q$ 중 아무 점을 이용해서 직선의 방정식을 구하면 된다.
    
    그런데 $x_1 == x_2$인 경우가 있을 수 있다. 이때는 기울기가 정의되지 않는다. 이때는 직선의 방정식이 $x=x_1$이다.

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
