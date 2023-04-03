# CG2023
2023-1학기 컴퓨터 그래픽스 (code from: https://github.com/youngjinDAU/DAU-CG23-LAB)

## 환경
* Node.js
* Visual Studio Code

## 실행
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

**[plus: 선분 교차 판단 알고리즘]**

위 방법으로 두 선분의 교점 및 교차 여부를 판단할 수도 있지만, 교차 여부를 다른 방법으로 판단할 수도 있다.  
교점을 구하는 방법은 같아도 교차 여부를 CCW를 이용해서 판단할 수 있다.  
선분이 교차하고 있을 때는 두 직선의 교점이 곧 선분의 교점이고, 교차하지 않고 있을 때는 교점이 없다.


## 2023-03-20 (3주차)
(index.html의 body 태그>script 태그의 src 속성값을 `./js/draw_230320.js`로 변경 후 서버 실행)

[실습 내용]

:dash: 선분과 직사각형이 교차하는 지점에 점 찍기

:dash: 선분과 원이 교차하는 지점에 점 찍기

:dash: 직사각형과 원이 교차하는 지점에 점 찍기

:smiley_cat: 원이 하나 존재하는데 방향키를 통해 이 원을 움직일 수 있다.

### Line, Box, Circle Intersections
* ### Line-Box Intersection
  `line_box_intersection(lineP0, lineP1, boxMinPt, boxMaxPt)`  
  = lineP0: 선분의 시작점  
  = lineP1: 선분의 끝점  
  = boxMinPt: 직사각형의 시작점(왼쪽 위)  
  = boxMaxPt: 직사각형의 끝점(오른쪽 아래)
  
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
  
  이렇게 두 직선의 교점을 구했으면 이 교점이 선분 위에 있는지 체크하고 점을 찍을지 말지 결정한다.  
  (만약 line_line_intersection() 함수에서 y축에 평행한 선분이 있을 때를 처리했다면  
  &nbsp;line_box_intersection()에서 선분의 양끝점과 직사각형의 양끝점을 인자로 하여 line_line_intersection() 함수를 4번만 호출하면 되지만,  
  &nbsp;해당 코드는 이 경우를 처리하지 않아서 이 안에서 직선끼리의 교점을 구한 뒤 교점이 선분 위에 위치하는지 체크하고 있다.)  
  :heavy_check_mark:*기회가 된다면 line_line_intersection() 함수를 수정해보자.*
  
* ### Line-Circle Intersection
  `line_circle_intersection(lineP0, lineP1, circleCtr, circleRadius)`  
  = lineP0: 선분의 시작점  
  = lineP1: 선분의 끝점  
  = circleCtr: 원의 중심  
  = circleRadius: 원의 반지름
  
  **[y축과 평행하지 않은 선분과 원]**
  
  선분의 직선의 방정식을 $l: y=a_0x+b_0$ 라고 하자.
  
  원의 중심이 $(a, b)$이고 반지름이 $r$인 원의 방정식은 $(x-a)^2+(y-b)^2=r^2$ 이다.
  
  두 식을 연립하여 식을 얻은 후 근의 공식을 사용하여 원과 직선의 교점을 알 수 있다.
  
  $(x-a)^2+(y-b)^2=r^2$
  
  $x^2-2ax+a^2+y^2-2by+b^2-r^2=0$
  
  $x^2-2ax+a^2+(a_0x+b_0)^2-2b(a_0x+b_0)+b^2-r^2=0$&nbsp;&nbsp;&nbsp;&nbsp;(직선의 방정식 대입)
  
  $x^2-2ax+a^2+a_0^2x^2+2a_0b_0x+b_0^2-2a_0bx-2bb_0+b^2-r^2=0$
  
  $(1+a_0^2)x^2+2(a_0b_0-a-a_0b)x+a^2+b_0^2-2bb_0+b^2-r^2=0$
  
  $x$에 관한 이차방정식의 형태가 되었다. 판별식을 통해서 원과 직선의 교점 개수를 알 수 있다.  
  $D\gt0$이면 교점이 2개, $D=0$이면 교점이 1개, $D\lt0$이면 교점이 없다.
  
  이차방정식 $ax^2+bx+c=0$ $(a\neq0)$ 의 판별식은 $D=b^2-4ac$ 이다.  
  이차방정식이 $ax^2+2b'x+c=0$ $(a\neq0)$ 꼴이면 짝수 판별식을 사용할 수 있고, 짝수 판별식은 $D/4=b'^2-ac$ 이다.
  
  우리가 정리한 식은 $ax^2+2b'x+c=0$ $(a\neq0)$ 꼴에 해당하므로 짝수 판별식을 이용하자.  
  식이 복잡하므로 $A=1+a_0^2$, $B=a_0b_0-a-a_0b$, $C=a^2+b_0^2-2bb_0+b^2-r^2$ 로 두고 식을 $Ax^2+2Bx+C=0$ 라 하자.
  
  짝수 판별식 $D/4=B^2-AC$ 가 0보다 작으면 원과 직선은 교점이 없다.  
  $D/4$가 0 이상이면 원과 직선은 교점을 최소 하나는 가진다는 말이다.  
  교점은 근의 공식을 사용해서 구한다. 짝수 판별식을 이용했으므로 마찬가지로 짝수 근의 공식을 사용하자.
  
  이차방정식 $ax^2+bx+c=0$ $(a\neq0)$ 의 근 - 근의 공식: $x=(-b\pm\sqrt{b^2-4ac})\div 2a$  
  이차방정식 $ax^2+2b'x+c=0$ $(a\neq0)$ 의 근 - 짝수 근의 공식: $x=(-b'\pm\sqrt{b'^2-ac})\div a$
  
  원과 직선의 교점 $(x_1, y_1)$  
  $x_1=(-B+\sqrt{B^2-AC})/A=(-B+\sqrt{D/4})/A$  
  $y_1=a_0x_1+b_0$  
  $D/4$가 0이면 교점은 $(x_1, y_1)$ 하나이고, 0보다 크면 교점을 하나 더 갖는다.
  
  원과 직선의 교점2 $(x_2, y_2)$  
  $x_2=(-B-\sqrt{B^2-AC})/A=(-B-\sqrt{D/4})/A$  
  $y_2=a_0x_2+b_0$
  
  교점을 구했으면 이 교점이 선분 위에 있는지 체크하고 점을 찍을지 말지 결정한다.
  
  **[y축과 평행한 선분과 원]**
  
  선분이 y축에 평행할 때는 직선의 방정식이 $x=a$ 꼴로 $y=a_0x+b_0$와 형태가 다르다.  
  따라서 선분이 y축에 평행한 경우에는 살짝 다르게 처리해줘야 한다.
  
  직선의 기울기인 $a_0$가 정의되지 않는 경우(분모=0)에는 다음과 같이 교점을 구할 수 있다.  
  이 때는 선분의 양 끝점이 $P(x_1, y_1)$, $Q(x_2, y_2)$일 때, $x_1 == x_2$ 이므로 직선의 방정식은 $x=x_1=x_2$ 이다.  
  이 차이 빼고 나머지 과정은 [y축과 평행하지 않은 선분과 원]에서 했던 과정과 같다.
  
  $(x-a)^2+(y-b)^2=r^2$
  
  $(x_1-a)^2+(y-b)^2-r^2=0$&nbsp;&nbsp;&nbsp;&nbsp;(직선의 방정식 대입)
  
  $(x_1-a)^2+y^2-2by+b^2-r^2=0$
  
  $y^2-2by+(x_1-a)^2+b^2-r^2=0$
  
  $y$에 관한 이차방정식이 되었고, 짝수 판별식을 통해 교점의 개수를 구하고 교점을 구한다.  
  식의 상수항이 복잡하므로 $\alpha=(x_1-a)^2+b^2-r^2$ 로 두고 식을 $y^2-2by+\alpha=0$ 라 하자.
  
  $D/4=b^2-\alpha$  
  교점1: $(x_1, b+\sqrt{b^2-C}=b+\sqrt{D/4})$ ($D/4 \geq 0$일 때 존재)  
  교점2: $(x_1, b-\sqrt{b^2-C}=b-\sqrt{D/4})$ ($D/4 \gt 0$일 때 존재)
  
  이후 마찬가지로 교점이 선분 위에 있는지 체크하고 점을 찍을지 말지 결정한다.
  
* ### Box-Circle Intersection
  `line_circle_intersection(boxMinPt, boxMaxPt, circleCtr, circleRadius)`  
  = boxMinPt: 직사각형의 시작점(왼쪽 위)  
  = boxMaxPt: 직사각형의 끝점(오른쪽 아래)  
  = circleCtr: 원의 중심  
  = circleRadius: 원의 반지름
  
  Line-Box Intersection에서 했던 것처럼 직사각형을 4개의 선분으로 나누어서 본다.
  
  그럼 Box-Circle Intersection 문제가 Line-Circle Intersection 문제가 된다.
  
  4개의 선분과 원에 대해서 `line_circle_intersection()` 함수를 총 4번 호출해주면 된다.

## 2023-03-27 (4주차)
(index.html의 body 태그>script 태그의 src 속성값을 `./js/draw_230327.js`로 변경 후 서버 실행)

[실습 내용]

:dash: 1개의 움직이는 직사각형이 고정된 5개의 직사각형과 충돌할 때 색칠하기  
※ 단, 현재 실습 코드는 고정된 직사각형끼리는 충돌하지 않는 관계에 있다는 전제 하에 작성되었다. 만약 고정된 직사각형끼리 충돌하는 경우를 만든다면 조건을 추가해야 한다.

:smiley_cat: 방향키를 통해 빨간색 직사각형을 움직일 수 있다.

<img src="https://github.com/meanjoo/LinkPicture/blob/main/boxboxcollisionEx.PNG" />

### Box-Box Collision
`box_box_collision(pMin, pMax, qMin, qMax)`  
= pMin: 직사각형 1의 시작점(왼쪽 위)  
= pMax: 직사각형 1의 끝점(오른쪽 아래)  
= qMin: 직사각형 2의 시작점(왼쪽 위)  
= qMax: 직사각형 2의 끝점(오른쪽 아래)

+ 내 접근

  <img src="https://github.com/meanjoo/LinkPicture/blob/main/myBoxBoxCollision.jpg" width="800" height=auto />
  
  위와 같은 생각에서 두 직사각형의 충돌을 알아낼 수 있다고 생각했다.
  
  `distx < w1 + w2`와 `disty < h1 + h2`를 모두 만족하면 두 직사각형이 충돌한 상태이고, 그렇지 않으면 충돌하지 않은 상태이다.
  
  직사각형의 시작점과 끝점을 알면 직사각형의 너비 $w$와 높이 $h$는 알아낼 수 있다.  
  $w=boxMaxPt.x-boxMinPt.x$  
  $h=boxMaxPt.y-boxMinPt.y$
  
  $distx$와 $disty$를 알기 위해서는 두 직사각형의 최대최소 x좌표와 최대최소 y좌표를 알아야 한다.
  
  ```
  maxx = max(boxMinPt1.x, boxMaxPt1.x, boxMinPt2.x, boxMaxPt2.x)
  minx = min(boxMinPt1.x, boxMaxPt1.x, boxMinPt2.x, boxMaxPt2.x)
  maxy = max(boxMinPt1.y, boxMaxPt1.y, boxMinPt2.y, boxMaxPt2.y)
  miny = min(boxMinPt1.y, boxMaxPt1.y, boxMinPt2.y, boxMaxPt2.y)
  
  distx = maxx - minx
  disty = maxy - miny
  ```

  `distx < w1 + w2 && disty < h1 + h2`가 참이면 두 직사각형은 충돌한 상태이고, 그렇지 않으면 충돌하지 않은 상태이다.

+ 교수님 코드  
  ```
  if (pMin.x < qMax.x && pMax.x  > qMin.x && pMin.y < qMax.y && pMax.y > qMin.y)
    return true
  return false
  ```

:tomato: 두 코드 모두 현재 테두리끼리의 충돌은 충돌하지 않은 상태라고 판단하게 되어 있다.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 조건에 등호(=)를 추가하면 테두리끼리 충돌했을 때도 충돌로 판정할 수 있다.


## 2023-04-03 (5주차)
(index.html의 body 태그>script 태그의 src 속성값을 `./js/draw_230403.js`로 변경 후 서버 실행)

[실습 내용]

:dash: 박스를 그리고, 마우스가 박스 내부에 있으면 박스를 채우는 `draw_box()` 함수 작성하기

:dash: 원을 그리고, 마우스가 원 내부에 있으면 원을 채우는 `draw_circle()` 함수 작성하기

:dash: 삼각형을 그리고, 마우스가 삼각형 내부에 있으면 삼각형을 채우는 `draw_triangle()` 함수 작성하기

이전 주차까지는 도형을 점으로 나타냈는데, 이번 실습 코드에서는 도형을 객체로 만든다.

### Box
마우스가 박스 내부에 있는지 판단하는 방법은 간단하다. 좌표를 비교해주기만 하면 된다.
```javascript
boxMinPt.x <= mouseX && mouseX <= boxMaxPt.x && boxMinPt.y <= mouseY && mouseY <= boxMaxPt.y ? true : false
```

### Circle
마우스가 원 내부에 있는지 판단하는 방법은 두 점 사이의 거리를 이용하거나 원의 방정식을 이용할 수 있는데 이 둘은 식이 같다.  
마우스의 좌표를 $(m_x, m_y)$, 원의 중심을 $(a, b)$, 원의 반지름 길이를 $r$이라고 하자.

두 점 $(x_1, y_1), (x_2, y_2)$ 사이의 거리는 $\sqrt{(x_1-x_2)^2+(y_1-y_2)^2}$ 이다.  
$(x_1, y_1)=(m_x, m_y), (x_2, y_2)=(a, b)$ 라고 하면 두 점 사이의 거리는 $\sqrt{(m_x-a)^2+(m_y-b)^2}$ 이고, 원의 내부이면 이 값이 $r$ 이하이다.  
즉 $\sqrt{(m_x-a)^2+(m_y-b)^2}<=r$ 이면 원의 내부이고,  
정수형으로 비교하기 위해 양변에 제곱을 취해주면 $(m_x-a)^2+(m_y-b)^2<=r^2$ 일 때 마우스는 원의 내부에 있다.

원의 방정식은 $(x-a)^2+(y-b)^2=r^2$ 이다.  
마우스가 원의 내부에 있다면 $(m_x-a)^2+(m_y-b)^2<=r^2$ 를 만족한다.
```javascript
(mouseX - a)*(mouseX - a) + (mouseY - b)*(mouseY - b) <= r*r ? true : false
```

또는 [three.js의 Vector2](https://threejs.org/docs/#api/en/math/Vector2)에서 제공하는 메서드를 이용할 수 있다.  
우리는 Vector2로 점을 나타냈는데 여기에는 현재 벡터와 v 벡터의 거리를 계산해주는 `.distanceTo(v)` 메서드가 있다.
```javascript
mousePt.distanceTo(center of circle) <= r ? true : false
```

### Triangle
점이 삼각형 내부에 있는지 외부에 있는지 알아내는 방법은 몇 가지가 있다.  
1. 삼각형과 점을 이용하여 삼각형 3개를 만든 후 원래 삼각형의 넓이와 비교하는 방법
2. 

*(canvas 관련)*  
[Applying styles and colors](https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors)  
[Drawing Shapes](https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)

strokeStyle 또는 fillStyle 속성을 설정하면, 새로 설정된 값이 앞으로 그려질 도형의 기본 값이 된다. 각 도형에 다른 색을 적용하려면 fillStyle 또는 strokeStyle 속성을 다시 적용해야 한다. 속성을 다시 설정해주지 않으면 다른 도형이 칠해질 때 속성이 바뀌면서 원하는 색이 아닌 다른 색이 나올 수 있다.

path는 점들의 집합이며 서로 연결하여 경로를 만듦으로써 도형을 그릴 수 있다. 경로가 만들어졌으면 경로를 렌더링하기 위해 윤곽선을 그리거나 내부를 채울 수 있다.  
.stroke(): path의 윤곽선을 그린다.  
.fill(): path의 내부를 채운다.


* **삼각형과 점을 이용하여 삼각형 3개를 만든 후 원래 삼각형의 넓이와 비교하는 방법**

  <img src="https://github.com/meanjoo/LinkPicture/blob/main/triangle1.PNG" width="700" height=auto/>

  그림의 왼쪽은 삼각형 내부에 점이 위치한 경우, 오른쪽은 삼각형 외부에 점이 위치한 경우이다.  
  점 $A$가 삼각형 $P_0P_1P_2$ 내부에 있으면 $△P_0P_1A+△P_1P_2A+△P_2P_0A=△P_0P_1P_2$ 임을 이용한다.

  삼각형 세 점의 좌표를 알 때 삼각형의 넓이는 신발끈 공식을 통해 쉽게 계산할 수 있다.  
  신발끈 공식은 $\div 2$ 연산이 들어가는데 값이 같은지 비교할 때 실수형이 되면 오차가 발생할 수 있으므로  
  정수형으로 계산하기 위해 양변에 $\times 2$ 를 해준다.

  따라서 $2△P_0P_1A+2△P_1P_2A+2△P_2P_0A=2△P_0P_1P_2$ 를 만족하면 점 $A$는 삼각형 $P_0P_1P_2$ 내부에 있는 것이다.

  ```
  getTriAreaX2(p0, p1, p2) -> p0.x*p1.y + p1.x*p2.y + p2.x*p0.y - p1.x*p0.y - p2.x*p1.y - p0.x*p2.y
  
  getTriAreaX2(p0, p1, A) + getTriAreaX2(p1, p2, A) + getTriAreaX2(p2, p0, A) == getTriAreaX2(p0, p1, p2)
  ? true
  : false
  ```
