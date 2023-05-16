var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
var camera = new THREE.PerspectiveCamera(75, 1.0, 0.1, 1000);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
// var index = 0;
let index = 0

controls.enableDamping = false; // 부드러운 감속 효과 활성화. true로 하면 카메라를 돌렸을 때 부드럽게 서서히 카메라가 멈춤.
// controls.rotateSpeed. 카메라의 돌아가는 정돌ㄹ를 설정ㄴ
// controls.autoRotate = true;


function loadOBJ(url) { // url: OBJ 파일의 경로
  var loader = new THREE.OBJLoader();
  // instantiate a loader
  // load a resource
  loader.load(
    // resource URL
    url,
    // called when resource is loaded
    function (object) {

      scene.add(object); // scene에 추가해야 화면에 나타난다.

    },
    // called when loading is in progresses
    // 웹 환경을 생각하면 동기 비동기를 항상 생각해야 한다. 3D를 로드한ㄷ나ㅡㄴ것은 cpu 시간이랑 파일을 가져오는 시간이 같을리가 없다. 보통 3D 파일의 크기는 크기 때문이다.
    // 파일 로딩과정이 비동기로 처리됨. 중간중간에 로딩되고 있는지 아닌지를 확인하기 위해 console 출력
    function (xhr) {

      console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

      console.log('An error happened');

    }
  );
}

function initLight() {
  var pointLight0 = new THREE.PointLight(0xffffff);
  pointLight0.position.set(10, 0, 10);
  scene.add(pointLight0);
}

function initGeometry() {
  const axesHelper = new THREE.AxesHelper(); //x:red y:green z:blue 
  scene.add(axesHelper);
  loadOBJ("../models/kitten.obj"); // 여기서 실행 경로 제공; url

}

function initRenderer() {
  camera.position.z = 1;
  controls.update();
  renderer.setClearColor("#ffffff");
  renderer.setSize(500, 500);
  // Append Renderer to DOM
  document.body.appendChild(renderer.domElement);
}

function init() {
  initLight();
  initGeometry();
  initRenderer();
}

// Render Loop: 4번 여기서 해라
var render = function () {
  requestAnimationFrame(render);
  index++
  scene.children[0].position.set(index,5,index)
  // children[0]이 빛
  controls.update();
  renderer.render(scene, camera);

};

// 카메라는 고정, 광원의 위치를 조정
// scene.children[0].position.

init();
render();