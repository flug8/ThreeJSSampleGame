// Set up the scene
var scene = new THREE.Scene();

// Create a camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

// Create a renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
//document.body.appendChild( renderer.domElement );

// Create a line material
var material = new THREE.LineBasicMaterial({ color: 0x000000 });

// Variables to keep track of mouse position when drawing
var mouseDown = false;
var startPos;
var endPos;

// Mouse down event listener
document.addEventListener("mousedown", function(event) {
    mouseDown = true;
    startPos = new THREE.Vector3(event.clientX, event.clientY, 0);
    startPos.unproject(camera);
});

// Mouse move event listener
document.addEventListener("mousemove", function(event) {
    if (mouseDown) {
        endPos = new THREE.Vector3(event.clientX, event.clientY, 0);
        endPos.unproject(camera);
    }
});

// Mouse up event listener
document.addEventListener("mouseup", function(event) {
    mouseDown = false;
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(startPos);
    lineGeometry.vertices.push(endPos);
    var line = new THREE.Line(lineGeometry, material);
    scene.add(line);
});

// Render the scene
function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
}
render();

// Create a floor geometry
var floorGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);

// Create a floor material
var floorMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

// Create a floor mesh
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -0.5 * Math.PI; // rotate the floor 90 degrees
floor.position.y = -1; // move the floor down 1 unit

// Add the floor to the scene
scene.add(floor);

