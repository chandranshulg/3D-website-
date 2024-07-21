// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set background color
scene.background = new THREE.Color(0x87CEEB); // Light sky blue

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Create a ball
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshPhongMaterial({ color: 0xFF6347 }); // Tomato red
const ball = new THREE.Mesh(geometry, material);
scene.add(ball);

// Load font and create text
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new THREE.TextGeometry('CHANDRANSHU BASIC 3D WEBSITE PROJECT ', {
        font: font,
        size: 1,
        height: 0.1,
    });

    // Center the text horizontally
    textGeometry.computeBoundingBox();
    const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;

    const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-window.innerWidth / 200, -3, -5); // Adjust position to start from the left side
    textMesh.scale.set(0.5, 0.5, 0.5); // Scale down the text to fit within the viewport
    scene.add(textMesh);
});

// Set camera position
camera.position.z = 5;

// Animation variables
let speed = 0.05;
let direction = 1;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Make the ball bounce
    ball.position.y += speed * direction;
    if (ball.position.y > 2 || ball.position.y < -2) {
        direction *= -1;
    }

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
