const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
    60,
    900 / 300,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

document.getElementById("stadium").appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.8));

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// Cricket Ground
const ground = new THREE.Mesh(
    new THREE.CircleGeometry(15, 64),
    new THREE.MeshStandardMaterial({color: 0x16803c})
);

ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Pitch
const pitch = new THREE.Mesh(
    new THREE.BoxGeometry(3, 0.1, 12),
    new THREE.MeshStandardMaterial({color: 0xc8a878})
);

pitch.position.y = 0.08;
scene.add(pitch);

// Cricket Ball
const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 24, 24),
    new THREE.MeshStandardMaterial({color: 0xff2222})
);

ball.position.set(0, 0.5, 0);
scene.add(ball);

// Stadium camera
camera.position.set(12, 10, 17);
camera.lookAt(0, 0, 0);

function resizeGame() {
    const box = document.getElementById("stadium");

    camera.aspect = box.clientWidth / box.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(box.clientWidth, box.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);

    ball.rotation.x += 0.01;
    ball.rotation.y += 0.02;

    renderer.render(scene, camera);
}

resizeGame();
window.addEventListener("resize", resizeGame);
animate();
