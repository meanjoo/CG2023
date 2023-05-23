var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
var camera = new THREE.PerspectiveCamera(75, 1.0, 0.1, 1000);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var torus;
//Lights
// const spotLight = new THREE.SpotLight(0xffffff, 0.5, 30, Math.PI * 0.1, 0.1, 1);
// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
// const pointLight = new THREE.PointLight(0xff9000, 0.9, 15, 3);
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);

const redSpotLight = new THREE.SpotLight(0xff0000, 0.5, 30, Math.PI * 0.1, 0.1, 1)
const redSpotLightHelper = new THREE.SpotLightHelper(redSpotLight)
var redLightTarget = new THREE.Object3D()

const greenSpotLight = new THREE.SpotLight(0x00ff00, 0.5, 30, Math.PI * 0.1, 0.1, 1)
const greenSpotLightHelper = new THREE.SpotLightHelper(greenSpotLight)
var greenLightTarget = new THREE.Object3D()

const blueSpotLight = new THREE.SpotLight(0x0000ff, 0.5, 30, Math.PI * 0.1, 0.1, 1)
const blueSpotLightHelper = new THREE.SpotLightHelper(blueSpotLight)
var blueLightTarget = new THREE.Object3D()

var gui = new dat.GUI();

controls.enableDamping = true; // 부드러운 감속 효과 활성화
// pointLight.visible=false;


function loadOBJ(url) {
  var loader = new THREE.OBJLoader();
  // instantiate a loader
  // load a resource
  loader.load(
    // resource URL
    url,
    // called when resource is loaded
    function (object) {

      scene.add(object);

    },
    // called when loading is in progresses
    function (xhr) {

      console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

      console.log('An error happened');

    }
  );
}

// 빛 설정하기
function initLight() {
//   spotLight.position.set(0, 0, 10);
//   spotLight.castShadow = true;
//   scene.add(spotLight);


//   scene.add(spotLightHelper);


  scene.add(ambientLight);

//   pointLight.position.set(-2, -2, 2);
//   scene.add(pointLight);
//   scene.add(pointLightHelper);

// target 설정을 안 하면 spotlight의 점이 무조건 원점을 향하게 되기 때문에 이상한 모양이 나오게 될 가능성이 높다

  redSpotLight.position.set(-1,0,10)
  redSpotLight.castShadow = true
  redLightTarget.position.set(-1,0,0)
  redSpotLight.target = redLightTarget
  scene.add(redSpotLight)
  scene.add(redSpotLightHelper)

  greenSpotLight.position.set(1,0,10)
  greenSpotLight.castShadow = true
  greenLightTarget.position.set(1,0,0)
  greenSpotLight.target = greenLightTarget
  scene.add(greenSpotLight)
  scene.add(greenSpotLightHelper)

  blueSpotLight.position.set(0,2,10)
  blueSpotLight.castShadow = true
  blueLightTarget.position.set(0,2,0)
  blueSpotLight.target = blueLightTarget
  scene.add(blueSpotLight)
  scene.add(blueSpotLightHelper)
}

function initGeometry() {
  const axesHelper = new THREE.AxesHelper(); //x:red y:green z:blue 
  scene.add(axesHelper);

  var material0 = new THREE.MeshLambertMaterial({ color: "#ffffff", side: THREE.DoubleSide });
  var geometryPlane = new THREE.PlaneGeometry(10, 10);
  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateY(5.0);
  plane.translateZ(5.0);
  plane.rotateX(Math.PI * 0.5);
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateX(5.0);
  plane.translateZ(5.0);
  plane.rotateY(Math.PI * 0.5);
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateY(-5.0);
  plane.translateZ(5.0);
  plane.rotateX(Math.PI * 0.5);
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateX(-5.0);
  plane.translateZ(5.0);
  plane.rotateY(Math.PI * 0.5);
  scene.add(plane);



  var material1 = new THREE.MeshPhongMaterial({ color: "#ff0000" });
  var geoCube = new THREE.BoxGeometry();
  var cube = new THREE.Mesh(geoCube, material1);
  cube.castShadow = true;
  cube.translateX(-1.0);
  cube.translateY(-1.0);
  cube.translateZ(0.5);
  scene.add(cube);

  var material2 = new THREE.MeshNormalMaterial();
  var geoTorus = new THREE.TorusGeometry(0.5, 0.2);
  torus = new THREE.Mesh(geoTorus, material2);
  torus.castShadow = true;
  torus.translateX(1.0);
  torus.translateY(1.0);
  torus.translateZ(0.5);
  scene.add(torus);

  var material3 = new THREE.MeshStandardMaterial({ color: "#fed136" });
  var geoCone = new THREE.ConeGeometry(0.5, 1);
  var cone = new THREE.Mesh(geoCone, material3);
  cone.translateX(1.0);
  cone.translateY(-1.0);
  cone.translateZ(0.5);
  cone.rotateX(Math.PI * 0.5);
  scene.add(cone);

  var material4 = new THREE.MeshPhysicalMaterial({ color: "#3333cc" });
  var geoCone = new THREE.SphereGeometry(0.5);
  var cone = new THREE.Mesh(geoCone, material4);
  cone.translateX(-1.0);
  cone.translateY(1.0);
  cone.translateZ(0.5);
  cone.rotateX(Math.PI * 0.5);
  scene.add(cone);
}

function initRenderer() {
  camera.position.z = 10;
  controls.update();
  renderer.setClearColor("#000000");
  renderer.setSize(500, 500); // 렌더링 사이즈 조절
  // Append Renderer to DOM
  document.body.appendChild(renderer.domElement);
}

// GUI 설정
function initGUI() {
//   gui.add(ambientLight, "visible").name("Ambient Light");
//   gui.add(spotLight, "visible").name("Spot Light");
//   gui.add(pointLight, "visible").name("Point Light");

//   gui.add(ambientLight, "intensity", 0, 1.0);

//   const spotFolder = gui.addFolder('SpotLight')
//   spotFolder.add(spotLight.position, 'x', -10.0, 10.0,.01);
//   spotFolder.add(spotLight.position, 'y', -10.0, 10.0,0.1);
//   spotFolder.add(spotLight.position, 'z', -10, 10);
//   spotFolder.add(spotLight, 'angle', 0, Math.PI * 0.2);

//   const pointFolder = gui.addFolder('PointLight')
//   pointFolder.add(pointLight.position, 'x', -10, 10);
//   pointFolder.add(pointLight.position, 'y', -10, 10);
//   pointFolder.add(pointLight.position, 'z', -10, 10);
//   pointFolder.add(pointLight, 'distance', 0, 100);
//   pointFolder.add(pointLight, 'decay', 0, 10);

  // const torusFolder = gui.addFolder('torus')
  // torusFolder.add(torus.position, 'x', -10, 10);
  // torusFolder.add(torus.position, 'y', -10, 10);
  // torusFolder.add(torus.position, 'z', -10, 10);

  gui.add(ambientLight, "visible").name("Ambient Light")
  gui.add(redSpotLight, "visible").name("Spot Light RED")
  gui.add(greenSpotLight, "visible").name("Spot Light GREEN")
  gui.add(blueSpotLight, "visible").name("Spot Light BLUE")

  const redSpotFolder = gui.addFolder("Spot Light RED")
  redSpotFolder.add(redSpotLight.position, "x", -7.0, 7.0)
  redSpotFolder.add(redSpotLight.position, "y", -7.0, 7.0)
  redSpotFolder.add(redSpotLight.position, "z", 1.0, 10.0)

  const blueSpotFolder = gui.addFolder("Spot Light BLUE")
  blueSpotFolder.add(blueSpotLight, "angle", 0, Math.PI * 0.5)

}

function init() {
  initLight();
  initGeometry();
  initRenderer();
  initGUI();
}

// Render Loop
var render = function () {
    requestAnimationFrame(render);
    controls.update();

//   spotLightHelper.update();
//   pointLightHelper.update();

//   if (spotLight.visible != spotLightHelper.visible)
//     spotLightHelper.visible = spotLight.visible;
//   if (pointLight.visible != pointLightHelper.visible)
//     pointLightHelper.visible = pointLight.visible;

    redSpotLightHelper.update()
    greenSpotLightHelper.update()
    blueSpotLightHelper.update()

    redLightTarget.position.set(redSpotLight.position.x, redSpotLight.position.y, 0)

    if (redSpotLight.visible != redSpotLightHelper.visible)
        redSpotLightHelper.visible = redSpotLight.visible
    if (greenSpotLight.visible != greenSpotLightHelper.visible)
        greenSpotLightHelper.visible = greenSpotLight.visible
    if (blueSpotLight.visible != blueSpotLightHelper.visible)
        blueSpotLightHelper.visible = blueSpotLight.visible

    renderer.render(scene, camera);

};

init();
render();