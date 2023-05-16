var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
var camera = new THREE.PerspectiveCamera(75, 1.0, 0.1, 1000);

// 모든 방향으로 퍼지는 빛, 스포트라이트처럼 특정 방향만으로 퍼지는 빛
function initLight() {
    var pointLight = new THREE.PointLight(0xffffff); // 점 광원. 하나의 위치에서 모든 방향으로 퍼지는 빛
    pointLight.position.set(10,10,10); // 10,10,10 위치에서 발산
    // pointLight.castShadow = true; // 없어도 ㄱㅊ
    scene.add(pointLight); // 만들었다고 끝이 아니고, 만들고 scene에 추가해줘야 결과에 반영된다
}

function initRenderer() {
    // camera.position.z = 10; // 카메라 위치 설정. 0,0,10에서 0,0,0을 바라보는 중
    camera.position.z = 15; // 100개로 만들 때 x, y의 거리를 조정해줬음(-4->-9)에도 전체가 보이지 않는다. 사진 찍을 때 전체가 다 안 보이면 카메라가 더 멀리 가면 된다.
    // 0,0,10이 아닌 0,0,15에서 원점을 바라본다.
    // renderer.setClearColor("#000000"); // 배경색
    renderer.setClearColor("#ffffff"); // 배경색
    renderer.setSize(500, 500);
    // Append Renderer to DOM
    document.body.appendChild(renderer.domElement);
}
function initGeometry() {
    // const axesHelper = new THREE.AxesHelper(); //x:red y:green z:blue 
    // scene.add(axesHelper);

    // var material0 = new THREE.MeshLambertMaterial({ color: "#ffff00" });
    var geometryCube = new THREE.BoxGeometry(1, 1, 1); // BoxGeometry(가로, 세로, 깊이)를 정의하는 것이다.
    // (1,1,1)의 정육면체의 면의 개수는 12개 <- 삼각형으로 만들기 때문
    // var geometry = new THREE.SphereGeometry(1); // 가로를 몇 등분, 세로를 몇 등분할 것인지가 2번째, 3번째 파라미터???
    // var geometry = new THREE.ConeGeometry(2,2,10); // ConeGeometry(밑면 반지름, 높이, 몇각형인지)

    // material0.wireframe = true // wireframe 형태로 보기

    // material과 geometry를 먼저 지정 후 Mesh를 생성할 수 있다
    // for (var i = 0; i < 5; i++) {
    for (var i=0; i<10; i++) {
        // for (var j = 0; j < 5; j++) {
        for (var j=0; j<10; j++) {
            var material0 = new THREE.MeshLambertMaterial({ color: "#ffff00" });
            material0.color.setHex(Math.random()*0xffffff)
            var cube = new THREE.Mesh(geometryCube, material0);
            // var cube = new THREE.Mesh(geometry, material0);

            // Translation 없이 바로 scene에 add를 해버리면 25개가 전부 원점에 생성되게 된다.
            //Translation
            // cube.translateX(-4.0 + 2.0 * i);
            if (j%2 ==0)
                material0.wireframe = true
            cube.translateX(-9.0 + 2.0 * i); // -9, -7, ..., 7, 9

            // cube.translateX(-4.0 + 2.0 * j);
            cube.translateY(-9.0 + 2.0 * j);
            // Add cube to Scene
            scene.add(cube); // scene에 추가하는 것을 잊지 말기
        }
    }
}

function init() {
    initLight();
    initRenderer();
    initGeometry();
}

// Render Loop
var render = function () {
    requestAnimationFrame(render);
    // 회전 효과
    for (var i = 1; i < scene.children.length; i++) { // i가 1부터 진행됨
        // scene.children[i].rotation.x += 0.01;
        scene.children[i].rotation.x += Math.random() * 0.05;
        scene.children[i].rotation.y += Math.random() * 0.01;
        scene.children[i].rotation.z += Math.random() * 0.01;
    }
    renderer.render(scene, camera);

};

init();
render();