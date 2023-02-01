const scene = new THREE.Scene();



const playerCar = Car();
//scene.add(playerCar);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(100, -300, 400);
scene.add(dirLight);

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

var camera = new THREE.OrthographicCamera(cameraWidth / -2, cameraWidth / 2, cameraHeight / 2, cameraHeight / -2, 0, 1000);
camera.position.set(200, -200, 100);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

var sphere;
var xX = 0;
var yY = 0;

function animate() {
    requestAnimationFrame(animate);
    playerCar.rotation.z += .01;
    renderer.render(scene, camera);


    drawLine();
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

setTimeout(animate, 250);


// DEFINE CAR

function Car() {
    const car = new THREE.Group();

    const backWheel = Wheel();
    backWheel.position.x = -18;
    car.add(backWheel);

    const FrontWheel = Wheel();
    FrontWheel.position.x = 18;
    car.add(FrontWheel);

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(60, 30, 15),
        new THREE.MeshLambertMaterial({ color: 0xa52523 })
    );
    main.position.z = 12;
    car.add(main);

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(33, 24, 12),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    cabin.position.z = 25.5;
    cabin.position.x = -6;
    car.add(cabin);

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(15, 32, 16),
        new THREE.MeshToonMaterial({ color: 0x88888800 })
    )
    sphere.position.z = 30;
    car.add(sphere);

    return car;
}

function Wheel() {
    const wheel = new THREE.Mesh(
        new THREE.BoxBufferGeometry(12, 33, 12),
        new THREE.MeshLambertMaterial({ color: 0x333333 })
    );
    wheel.position.z = 6;
    return wheel;
}



function onPointerMove(event) {

    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

function raycast() {

    // update the picking ray with the camera and pointer position
    raycaster.setFromCamera(pointer, camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects([main]);


    if (intersects[0]) {
        //console.log(intersects[0].point);
        return intersects[0].point;
    }
    return null;

}

const main = new THREE.Mesh(
    new THREE.BoxBufferGeometry(600, 600, 1),
    new THREE.MeshLambertMaterial({ color: 0xaaddff })
);

scene.add(main);

var mousedown = false;

window.addEventListener('pointermove', onPointerMove);
window.addEventListener('click', function () {
    mousedown = false;
    if(Math.sqrt(Math.pow(raycast().x - pos[0], 2) + Math.pow(raycast().y - pos[1], 2)) > 1) {
        lines.push({x1 : pos[0], y1 : pos[1], x2 : raycast().x, y2 : raycast().y, line});
        linesObj.push(line);
    }else
        scene.remove(line);
    
});

var linesObj = [];
var lines = [];
window.addEventListener
window.addEventListener('mousedown', function () {
    mousedown = true;
    line = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 5),
        new THREE.MeshLambertMaterial({ color: 0xFFFF00 })
    );
    scene.add(line);
    pos = [raycast().x, raycast().y];
});

var linex;
var rotX = 0;
var drawingActive = true;
var pos = [0,0]

function drawLine() {
    if (mousedown && drawingActive) {
        const x = raycast().x - pos[0];
        const y = raycast().y - pos[1];
        let rot;

        const c = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        rot = Math.atan2(y , x);

        linex.position.x = (pos[0] + raycast().x) /2;
        linex.position.y = (pos[1] + raycast().y) /2;
        linex.rotation.z = rot;
        linex.scale.x = c;
    }
}



var camera2;

var sphereXY = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 16),
    new THREE.MeshToonMaterial({ color: 0x88888800 })
)
scene.add(sphereXY);


function cam2() {
    
    

    camera2 = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera2.position.set(0, 0, 2);
    camera2.up.set(0, 0, 1);
    camera2.lookAt(0, 0, 50);
    camera2.rotation.set(Math.PI/2, 0, 0);



}

cam2()

const gui = new dat.GUI();

//gui.add(camera.rotation, 'x', 0, 2 * Math.PI);
gui.add(camera2.rotation, 'y', 0, 2.5 * Math.PI);
//gui.add(camera.rotation, 'z', 0, 2 * Math.PI);

var ray = {
    rot : 0,
    pos : [0,0,0]
};
gui.add(ray, 'rot', 0, 2*Math.PI);

var raycaster2;
var line;
console.log("Ready");

setInterval(raycast2, 2000);
function raycast2() {
    raycaster2  = new THREE.Raycaster(new THREE.Vector3(0,0,0), new THREE.Vector3(Math.cos(ray.rot),Math.sin(ray.rot),0), 0 , 100);
    line = new THREE.Line(new THREE.BoxGeometry().setFromPoints( [new THREE.Vector3(0,0,10), new THREE.Vector3(Math.cos(ray.rot)*100,Math.sin(ray.rot)*100,2)]), new THREE.LineBasicMaterial({color: 0x0000ff}));
    scene.add(line);
    // calculate objects intersecting the picking ray
    const intersects = raycaster2.intersectObjects(linesObj);


    if (intersects[0]) {
        //console.log(intersects[0].point);
        return intersects[0].distance / 100;
    }
    return 1;
}









