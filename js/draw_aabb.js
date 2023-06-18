var scene = new THREE.Scene()
var renderer = new THREE.WebGLRenderer({ antialias: true})
renderer.shadowMap.enabled = true
var camera = new THREE.PerspectiveCamera(75, 1.0, 0.1, 1000)
var controls = new THREE.OrbitControls(camera, renderer.domElement)
var torus
var cone

// Lights
const spotLight = new THREE.SpotLight(0xffffff, 0.5, 30, Math.PI*0.1, 0.1, 1)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
const pointLight = new THREE.PointLight(0xff9000, 0.9, 15, 3)

var gui = new dat.GUI()

controls.enableDamping = true // 부드러운 감속 효과 활성화

function initLight() {
    spotLight.position.set(-1, 0, 10)
    spotLight.castShadow = true
    scene.add(spotLight)

    scene.add(ambientLight)

    pointLight.position.set(-2, -2, 2)
    scene.add(pointLight)
}

function initGeometry() {
    const axesHelper = new THREE.AxesHelper() //x: red, y: green, z: blue 
    scene.add(axesHelper)
  
    var material0 = new THREE.MeshLambertMaterial({ color: "#ffffff" })
    var geometryPlane = new THREE.PlaneGeometry(10, 10)
    var plane = new THREE.Mesh(geometryPlane, material0)
    plane.receiveShadow = true
    scene.add(plane)

    var material1 = new THREE.MeshPhongMaterial({ color: "#ff0000" })
    var geometryCube = new THREE.BoxGeometry()
    var cube = new THREE.Mesh(geometryCube, material1)
    cube.castShadow = true
    cube.translateX(-1.0)
    cube.translateY(-1.0)
    cube.translateZ(0.5)
    scene.add(cube)

    var material2 = new THREE.MeshPhongMaterial({ color: "#00ff00" })
    var geometryTorus = new THREE.TorusGeometry(0.5, 0.2)
    torus = new THREE.Mesh(geometryTorus, material2)
    torus.castShadow = true
    torus.translateX(1.0)
    torus.translateY(1.0)
    torus.translateZ(0.5)
    scene.add(torus)
    spotLight.target = torus

    var material3 = new THREE.MeshPhongMaterial({ color: "#fed136" })
    var geometryCone = new THREE.ConeGeometry(0.5, 1)
    cone = new THREE.Mesh(geometryCone, material3)
    cone.translateX(1.0)
    cone.translateY(-1.0)
    cone.translateZ(0.5)
    cone.rotateX(Math.PI*0.5)
    scene.add(cone)

    torus.geometry.computeBoundingBox() // Three.js에서 기본적으로 aabb를 계산해주는 함수를 제공한다.
    var torusBoxHelper = new THREE.Box3Helper(torus.geometry.boundingBox, 0xff0000) // 박스를 표현하기 위해 Box3Helper를 사용
    scene.add(torusBoxHelper)

    cone.geometry.computeBoundingBox()
    var coneBoxHelper = new THREE.Box3Helper(cone.geometry.boundingBox) // 색을 지정해주지 않으면 기본 도형의 색과 같은 색으로 지정됨
    scene.add(coneBoxHelper)
}

function initRenderer() {
    camera.position.z = 10
    controls.update()
    renderer.setClearColor("#000000")
    renderer.setSize(500, 500)
    // Append Renderer to DOM
    document.body.appendChild(renderer.domElement)
}

function initGUI() {
    gui.add(ambientLight, "visible").name("Ambient Light")
    gui.add(spotLight, "visible").name("Spot Light")
    gui.add(pointLight, "visible").name("Point Light")

    gui.add(ambientLight, "intensity", 0, 1.0)

    const spotFolder = gui.addFolder("SpotLight")
    spotFolder.add(spotLight.position, "x", -10, 10)
    spotFolder.add(spotLight.position, "y", -10, 10)
    spotFolder.add(spotLight.position, "z", -10, 10)
    spotFolder.add(spotLight, "angle", 0, Math.PI*0.2)

    const pointFolder = gui.addFolder("PointLight")
    pointFolder.add(pointLight.position, "x", -10, 10)
    pointFolder.add(pointLight.position, "y", -10, 10)
    pointFolder.add(pointLight.position, "z", -10, 10)
    pointFolder.add(pointLight, "decay", 0, 10)

    const torusFolder = gui.addFolder("Torus")
    torusFolder.add(torus.position, "x", -10, 10)
    torusFolder.add(torus.position, "y", -10, 10)
    torusFolder.add(torus.position, "z", -10, 10)
}

function init() {
    initLight()
    initGeometry()
    initRenderer()
    initGUI()
}

var render = function() {
    requestAnimationFrame(render)
    controls.update()
    renderer.render(scene, camera)

    torus.geometry.computeBoundingBox()
    cone.geometry.computeBoundingBox()

    // 모든 기하적 데이터, 즉 모델에 대한 좌표 정보는 모델좌표계(지역좌표계)에서 정의된다. 
    // 실제로 박스와 박스를 비교하려면 결국 월드좌표계로 변환을 한 다음에 거기서 연산을 해야 한다. 
    // 만약 아래의 과정이 없다면 각각의 모델 좌표계에서 비교(=충돌 감지)하므로 적절한 계산이 될 수 없다.
    var torusBox = torus.geometry.boundingBox // torus의 지역좌표계에서 정의
    var coneBox = cone.geometry.boundingBox // cone의 지역좌표계에서 정의
    torusBox.applyMatrix4(torus.matrix) // torus의 AABB를 torus의 지역좌표계에서 월드좌표계로 변환하는 matrix를 더함
    coneBox.applyMatrix4(cone.matrix)

    if (torusBox.intersectsBox(coneBox)) {
        torus.material.color.r = 1; torus.material.color.g = 0; torus.material.color.b = 0;
    }
    else {
        torus.material.color.r = 0.7; torus.material.color.g = 0.7; torus.material.color.b = 0.7;
    }
}

init()
render()