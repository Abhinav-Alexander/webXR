import * as THREE from 'three';
import {OrbitControls} from './OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer(
  {
    antialias: true,
  });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
  })
const starVertices = []
for (let i = 0; i < 100000; i++) {
  const x = (Math.random() - 0.5) * 2000
  const y = (Math.random() - 0.5) * 2000
  const z = - Math.random() * 2000
  starVertices.push(x, y, z)
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3)
)
const stars = new THREE.Points(starGeometry, starMaterial)

const earthGeometry = new THREE.SphereGeometry(100, 50, 50);
const earthMaterial = new THREE.MeshBasicMaterial(
  {
    map: new THREE.TextureLoader().load('./layers/earth.jpg')
//     // color: 0xffff00 
  });

  scene.add(stars);
const earth = new THREE.Mesh(earthGeometry, earthMaterial);

scene.add(earth);

const moonGeometry = new THREE.SphereGeometry(40, 50, 50);
const moonMaterial = new THREE.MeshBasicMaterial(
  {
    map: new THREE.TextureLoader().load('./layers/moon.jpg')
//     // color: 0xffff00 
  });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);

earth.add(moon);
moon.position.x = 300;
moon.position.y = 100;


camera.position.set(0, 10, 400);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  earth.rotation.y += 0.001;
  moon.rotation.y += 0.005;
}
animate();
