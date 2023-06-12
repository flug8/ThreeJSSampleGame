// import threejs library

// create a scene
const scene = new THREE.Scene();

// create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// create a renderer
const renderer = new THREE.WebGLRenderer();

// create a car
const car = new THREE.Object3D();
const carMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
);
car.add(carMesh);

// position the car
const position = new THREE.Vector3(0, -0.5, 0);
carMesh.position.copy(position);

// add a direction indicator
const directionIndicator = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
);
carMesh.add(directionIndicator);

// add a platform
const platformMesh = new THREE.Mesh(
    new THREE.BoxGeometry(10, 0.5, 10),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
);
scene.add(platformMesh);

// position the platform
const platformPosition = new THREE.Vector3(0, 0.5, 0);
platformMesh.position.copy(platformPosition);

// update the position of the car based on keyboard inputs
function update() {
    if (User.isKeyDown('w')) {
        carMesh.position.x += 0.1;
    }
    if (User.isKeyDown('a')) {
        carMesh.position.x -= 0.1;
    }
    if (User.isKeyDown('s')) {
        carMesh.position.z -= 0.1;
    }
    if (User.isKeyDown('d')) {
        carMesh.position.z += 0.1;
    }
}

// update the direction indicator based on the direction the car is facing
function updateIndicator() {
    const carRotation = new THREE.Euler(
        carMesh.rotation.x,
        carMesh.rotation.y,
        carMesh.rotation.z,
    );
    directionIndicator.rotation.copy(carRotation);
}

// render the scene
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

// initialize the scene
function init() {
    const container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
    const rendererContainer = document.createElement('div');
    rendererContainer.id = 'renderer-container';
    container.appendChild(rendererContainer);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(render);
    renderer.domElement.appendChild(container);
}

// detect keyboard input
function handleKeyboardInput() {
    User.on('keydown', function(event) {
        switch (event.keyCode) {
            case 87:
                User.isKeyDown('w');
                break;
            case 65:
                User.isKeyDown('a');
                break;
            case 83:
                User.isKeyDown('s');
                break;
            case 68:
                User.isKeyDown('d');
                break;
            default:
                User.isKeyDown('');
                break;
        }
    });
    User.on('keyup', function(event) {
        switch (event.keyCode) {
            case 87:
                User.isKeyDown('w');
                break;
            case 65:
                User.isKeyDown('a');
                break;
            case 83:
                User.isKeyDown('s');
                break;
            case 68:
                User.isKeyDown('d');
                break;
            default:
                User.isKeyDown('');
                break;
        }
    });
}

// start the application
animate();
init();
handleKeyboardInput();