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

### Box-Box Collision

+ 교수님 코드
  
   ```javascript
   if (pMin.x < qMax.x && pMax.x  > qMin.x && pMin.y < qMax.y && pMax.y > qMin.y)
     return true
   return false
   ```
