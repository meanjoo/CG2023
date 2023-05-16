var scene = new THREE.Scene()
var renderer = new THREE.WebGLRenderer({ antialis: true })
var camera

const element = document.getElementsByName("camera_type")
element.forEach(radio => radio.addEventListener('change', () => {
    console.log(radio.value)
    setCamera(radio.value === "orthographic" ? true : false)
}))

function setCamera(orthographic) {
    camera = orthographic
            ? new THREE.OrthographicCamera(-3, 3, 3, -3, -10, 10)
            : new THREE.PerspectiveCamera(75, 1.0, 0.1, 1000)
    init()
    render()    
}

function initRenderer() {
    camera.position.z = 4
    renderer.setClearColor("#000000")
    renderer.setSize(500, 500)
    // Append Renderer to DOM
    document.body.appendChild(renderer.domElement)
}

function initGeometry() {
    const axesHelper = new THREE.AxesHelper() // 축을 확인하는 데에 도움을 준다. x축: red, y축: green, z축: blue로 화면에 표시
    scene.add(axesHelper)

    var material0 = new THREE.MeshBasicMaterial({ color: "#ff0000" })
    var material1 = new THREE.MeshBasicMaterial({ color: "#00ff00"})

    material0.wireframe = true
    material1.wireframe = true

    var geometryCube = new THREE.BoxGeometry(1, 1, 1)
    var cube0 = new THREE.Mesh(geometryCube, material0)
    var cube1 = new THREE.Mesh(geometryCube, material1)

    // Translation - x, y, z 각각의 축에 대해서 이동시킬 수 있다.
    cube0.translateX(0.5)
    cube0.translateZ(-0.5)
    cube1.translateZ(2.0)

    // Add cube to Scene
    scene.add(cube0)
    scene.add(cube1)
}

function init() {
    initRenderer()
    initGeometry()
}

// Renderer Loop
var render = function() {
    renderer.render(scene, camera)
}

setCamera(true)
init()
render()