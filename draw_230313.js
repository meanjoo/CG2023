let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

//Make data
//선분 2개를 그리기 위한 점 4개 (선분 1개를 그리기 위해서는 시작점, 끝점 총 2개가 필요)
let pts = [];
pts.push(new THREE.Vector2(0, 0)); // ★원점이 좌측상단에 위치★ 아래로 갈수록 y값이 증가
pts.push(new THREE.Vector2(250, 250)); // 250,250 -> 50,50으로 하면 두 선분이 만나지 않는 경우
pts.push(new THREE.Vector2(0, 100));
pts.push(new THREE.Vector2(300, 200));

//Draw Line
for (let i = 0; i < pts.length; i += 2) {
    draw_line(pts[i],pts[i+1]);
}

function draw_line(p0,p1)
{
    ctx.beginPath(); // canvas에서 그림을 그리겠다는 시작을 알리는 함수
    ctx.moveTo(p0.x, p0.y); // 시작점(p0)으로 펜을 이동
    ctx.lineTo(p1.x, p1.y); // 끝점(p1)까지 선 그리기
    ctx.stroke(); // 그림 그리기 종료. 선분은 stroke로 접근해야 한다.
}

// 점 그리는 함수
function draw_point(p)
{
    ctx.fillStyle = "#ff0000"; // 점 색깔 지정
    ctx.beginPath(); // 시작을 알리는 함수
    ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI, true); // 원호: 원의 일부분 / 마지막 매개변수 기본값은 CCW 기준-true, false하면 CW
    ctx.fill();
}

function ccw(p1, p2, p3) {
    let result = p1.x*p2.y + p2.x*p3.y + p3.x*p1.y - p2.x*p1.y - p3.x*p2.y - p1.x*p3.y
    if (result > 0) // ccw
        return 1
    else if (result < 0) // cw
        return -1
    else // parallel
        return 0
}

// line 자료구조가 없기 때문에 점 4개를 입력으로 받는다
function line_line_intersection(p0, p1, p2, p3) {
    console.log(p0);
    console.log(p1);
    console.log(p2);
    console.log(p3);

    //Need to write...

    let a0 = (p0.y - p1.y) / (p0.x - p1.x)
    let a1 = (p2.y - p3.y) / (p2.x - p3.x)

    let intersectionX= (a1*p2.x + p2.y + a0*p0.x - p0.y) / (a0 - a1);
    let intersectionY= a0*(intersectionX - p0.x) + p0.y;

    console.log(intersectionX)
    console.log(intersectionY)

    let intersectionPt = new THREE.Vector2(intersectionX, intersectionY);

    // 점이 만나지 않을 때 예외처리 필요 <- 선분 2개가 항상 교점이 있는 것이 아님
    // 단 아래 식은 두 선분이 같은 직선 상에 있을 때 교차하지 않는 경우는 제외하지 않은 상태임

    // CCW 없이 하려면 교점 비교를 하면 된다.
    // min(x1,x2) <= X <= max(x1,x2) && ... 로 안에 존재할 때 혹은 벗어났을 때를 보면 된다.
    if(ccw(p0, p1, p2)*ccw(p0, p1, p3) <= 0 && ccw(p2, p3, p0)*ccw(p2, p3, p1) <= 0)
        draw_point(intersectionPt);
}

line_line_intersection(pts[0],pts[1],pts[2],pts[3]);