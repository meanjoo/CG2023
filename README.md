# CG2023
2023-1학기 컴퓨터 그래픽스 (code from: https://github.com/youngjinDAU/DAU-CG23-LAB)

## 환경
* Node.js
* Visual Studio Code

## 실행
* `npm i` 또는 `npm install` 필요 (node_modules 폴더가 없는 경우)
* TERMINAL에서 `node main.js`로 서버 실행 후 웹 브라우저에서 http://localhost:8081 로 접속

## 2023-03-13 (2주차)
(index.html의 body 태그>script 태그의 src 속성값을 `./js/draw_230313.js`로 변경 후 서버 실행)

[실습 내용]

:dash: 두 선분이 교차하는 지점에 빨간 점 찍기

### Line-Line Intersection

선분은 양쪽에 끝나는 점이 있는, 직선의 부분이다.
  
선분의 교점을 구하기 위해서는 두 직선의 교점을 구한 뒤 이 교점이 두 선분 상에 존재하는지 확인하면 된다.

우선 선분을 하나 긋기 위해서는 시작점과 끝점, 총 2개의 점이 필요하다. 즉 두 개의 선분을 긋기 위해서는 4개의 점이 필요하다.

선분의 양 끝점을 알고 있으므로 선분의 직선의 방정식을 구할 수 있다.

**[직선의 방정식 구하기]**
  
* 기울기와 한 점을 알 때 직선의 방정식 구하기
 
  기울기가 $m$이고, y절편이 $n$일 때, 직선의 방정식은 $y=mx+n$이다.
  
  기울기가 $m$이고, 한 점의 좌표가 $P(x_1, y_1)$일 때는 기울기와 한 점의 좌표를 직선의 방정식에 대입하여 $n$을 구할 수 있다.  
  $y_1=m \times x_1+n$에서 $n=y_1-m \times x_1$으로 구할 수 있다.
    
  따라서 기울기가 $m$이고, 한 점의 좌표가 $P(x_1, y_1)$일 때, 직선의 방정식은 $y=mx+(y_1-m \times x_1)$이다.
  
* 두 점을 알 때 직선의 방정식 구하기
  
  $P(x_1, y_1), Q(x_2, y_2)$의 기울기는 $m=(y_2-y_1) \div (x_2-x_1)$이다.
    
  기울기와 한 점을 알면 위처럼 직선의 방정식을 구할 수 있으므로 $P$나 $Q$ 중 아무 점을 이용해서 직선의 방정식을 구하면 된다.
    
  그런데 $x_1 == x_2$인 경우가 있을 수 있다. 이때는 기울기가 정의되지 않는다. 이때는 직선의 방정식이 $x=x_1$이다.

**[두 직선의 교점 구하기]**

두 직선 $l_0: y=a_0x+b_0$, $l_1: y=a_1x+b_1$을 같다고 두고 교점의 x좌표 $x_i$를 구한 뒤, $x_i$를 $l_0$나 $l_1$에 대입하여 교점의 y좌표 $y_i$를 구한다.

$a_0x+b_0=a_1x+b_1$

$(a_0-a_1)x=b_1-b_0$

$x=(b_1-b_0) \div (a_0-a_1)$

교점을 $P_i(x_i, y_i)$라고 하면, $x_i=(b_1-b_0) \div (a_0-a_1)$이고, $y_i=a_0 \times x_i+b_0$ 또는 $y_i=a_1 \times x_i+b_1$이다.

두 직선의 교점 $P_i(x_i, y_i)$를 구했으면 $P_i$가 선분 위에 위치하는지 판단하면 된다.

**[교점이 선분 위에 위치하는지 판단하기]**

교점을 $P(x_i, y_i)$, 선분의 양끝점을 $A(x_1, y_1)$, $B(x_2, y_2)$라고 하자.

$min(x_1, x_2) \leq x_i \leq max(x_1, x_2)$ && $min(y_1, y_2) \leq y_i \leq max(y_1, y_2)$이면 교점이 선분 위에 위치하는 것이다.

$min(x_1, x_2) \gt x_i$ || $max(x_1, x_2) \lt x_i$ || $min(y_1, y_2) \gt y_i$ || $max(y_1, y_2) \lt y_i$이면 교점이 선분 위에 위치하지 않는다.

선분 1의 양끝점을 `p0`, `p1`, 선분 2의 양끝점을 `p2`, `p3`, 교점을 (`intersectionX`, `intersectionY`)라고 할 때,  
두 선분의 교점이 선분 위에 존재하는지 판단하는 코드는 다음과 같다.

```javascript
if (Math.min(p0.x, p1.x) > intersectionX || Math.max(p0.x, p1.x) < intersectionX)
  return false
if (Math.min(p2.x, p3.x) > intersectionX || Math.max(p2.x, p3.x) < intersectionX)
  return false
if (Math.min(p0.y, p1.y) > intersectionY || Math.max(p0.y, p1.y) < intersectionY)
  return false
if (Math.min(p2.y, p3.y) > intersectionY || Math.max(p2.y, p3.y) < intersectionY)
  return false
return true
```
```javascript
return (Math.min(p0.x, p1.x) <= intersectionX && intersectionX <= Math.max(p0.x, p1.x) &&
        Math.min(p0.y, p1.y) <= intersectionY && intersectionY <= Math.max(p0.y, p1.y) &&
        Math.min(p2.x, p3.x) <= intersectionX && intersectionX <= Math.max(p2.x, p3.x) &&
        Math.min(p2.y, p3.y) <= intersectionY && intersectionY <= Math.max(p2.y, p3.y)
        ? true
        : false)        
```

**[교점이 선분 위에 위치하는지 판단하기 2]**

선분의 시작점과 끝점으로 선분 교차 여부를 판별할 수도 있지만, CCW를 이용해서 선분 교차 여부를 판별할 수도 있다.

## 2023-03-20 (3주차)
(index.html의 body 태그>script 태그의 src 속성값을 `./js/draw_230320.js`로 변경 후 서버 실행)

[실습 내용]

:dash: 선분과 직사각형이 교차하는 지점에 점 찍기

:dash: 선분과 원이 교차하는 지점에 점 찍기

:dash: 직사각형과 원이 교차하는 지점에 점 찍기

:smiley_cat: 원이 하나 존재하는데 방향키를 통해 이 원을 움직일 수 있다.

### Line, Box, Circle Intersections
* ### Line-Box Intersection
  직사각형 하나를 x축에 평행한 선분 2개와 y축에 평행한 선분 2개로 나누어서 생각할 수 있다.
  
  그럼 line-box intersection 문제가 line-line intersection 문제로 변하게 된다.
  
  <img src="https://github.com/meanjoo/LinkPicture/blob/main/linebox.jpg" width="400" height=auto />
  
  직사각형과 교차하고 있는지 체크할 선분의 직선의 방정식을 $l_0: y=a_0x+b_0$ 이라고 하자.  
  이를 $x$에 관해 풀면 $x=(y-b_0) \div a_0$ 이다.  
  (해당 실습 코드는 이 선분이 y축과 평행하지 않다는 전제 하에 작성되었다. 이러한 경우도 체크하려면 조건을 추가해야 한다.)
  
  선분 ①의 직선의 방정식은 $l_1: y=boxMinPt.y$ 이다.  
  직선 $l_1$과 직선 $l_0$의 교점을 $P_1(x_1, y_1)$ 이라고 하면, $y_1=boxMinPt.y$ 이고, $x_1=(y_1-b_0) \div a_0$ 이다.  
  $P_1(x_1, y_1)=((boxMinPt.y-b_0) \div a_0, boxMinPt.y)$
  
  선분 ②의 직선의 방정식은 $l_2: x=boxMinPt.x$ 이다.  
  직선 $l_2$와 직선 $l_0$의 교점을 $P_2(x_2, y_2)$ 라고 하면, $x_2=boxMinPt.x$ 이고, $y_2=a_0x_2+b_0$ 이다.  
  $P_2(x_2, y_2)=(boxMinPt.x, a_0 \times boxMinPt.x+b_0)$
  
  선분 ③의 직선의 방정식은 $l_3: x=boxMaxPt.x$ 이다.  
  직선 $l_3$와 직선 $l_0$의 교점을 $P_3(x_3, y_3)$ 라고 하면, $x_3=boxMaxPt.x$ 이고, $y_3=a_0x_3+b_0$ 이다.  
  $P_3(x_3, y_3)=(boxMaxPt.x, a_0 \times boxMaxPt.x+b_0)$
  
  선분 ④의 직선의 방정식은 $l_4: y=boxMaxPt.y$ 이다.  
  직선 $l_4$와 직선 $l_0$의 교점을 $P_4(x_4, y_4)$ 라고 하면, $y_4=boxMaxPt.y$ 이고, $x_4=(y_4-b_0) \div a_0$ 이다.  
  $P_4(x_4, y_4)=((boxMaxPt.y-b_0) \div a_0, boxMaxPt.y)$
  
  이렇게 두 직선의 교점을 구했으면 이 교점이 선분 위에 있는지 확인해주면 된다.  
  (만약 line_line_intersection() 함수에서 y축에 평행한 선분이 있을 때를 처리했다면  
  &nbsp;line_box_intersection()에서 선분의 양끝점과 직사각형의 양끝점을 인자로 하여 line_line_intersection() 함수를 4번만 호출하면 되지만,  
  &nbsp;해당 코드는 이 경우를 처리하지 않아서 이 안에서 직선끼리의 교점을 구한 뒤 교점이 선분 위에 위치하는지 체크하고 있다.)  
  :heavy_check_mark:*기회가 된다면 line_line_intersection() 함수를 수정해보자.*
  
* ### Line-Circle Intersection
  
* ### Box-Circle Intersection

## 2023-03-27 (4주차)
(index.html의 body 태그>script 태그의 src 속성값을 `./js/draw_230327.js`로 변경 후 서버 실행)

[실습 내용]

:dash: 1개의 움직이는 직사각형이 고정된 5개의 직사각형과 충돌할 때 색칠하기  
※ 단, 현재 실습 코드는 고정된 직사각형끼리는 충돌하지 않는 관계에 있다는 전제 하에 작성되었다. 만약 고정된 직사각형끼리 충돌하는 경우를 만든다면 조건을 추가해야 한다.

:smiley_cat: 방향키를 통해 빨간색 직사각형을 움직일 수 있다.

### Box-Box Collision

+ 교수님 코드
  
   ```javascript
   if (pMin.x < qMax.x && pMax.x  > qMin.x && pMin.y < qMax.y && pMax.y > qMin.y)
     return true
   return false
   ```
