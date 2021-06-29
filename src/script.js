import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import gsap from "gsap";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "three.meshline";

console.log(MeshLine);

//Texture Loader
const textureLoader = new THREE.TextureLoader();

// Debug
//const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
//scene.background = textureLoader.load("/photographs/Eget mönster vit Rätt.png");

//* RUTNÄT

const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper(150, 50, 0x00000, 0x000000);
gridHelper.position.set(0, 2, 0);
gridHelper.rotation.x = 1.6;
gridHelper.renderOrder = -20;
scene.add(gridHelper);

/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader();

let fontSize = 3.5;
let textRotationX = 0;
let textRotationY = 0.3;
let textRotationZ = 0;
let textHeight = 1.5;
let curveSegments = 3;
let bevelEnabled = false;
let bevelThickness = 1.8;
let bevelSize = 1.44;
let bevelOffset = 0;
let bevelSegments = 5;
fontLoader.load("/fonts/Plastic_Regular.json", (font) => {
  const textGeometry_kweku = new THREE.TextGeometry("K W E K U   M O S E S", {
    font: font,
    size: fontSize,
    height: textHeight,
    curveSegments: curveSegments,
    bevelEnabled: bevelEnabled,
    bevelThickness: bevelThickness,
    bevelSize: bevelSize,
    bevelOffset: bevelOffset,
    bevelSegments: bevelSegments,
  });
  const textGeometry_fullstack = new THREE.TextGeometry(
    "F U L L S T A C K   D E V E L  O   P   E   R",
    {
      font: font,
      size: fontSize,
      height: textHeight,
      curveSegments: curveSegments,
      bevelEnabled: bevelEnabled,
      bevelThickness: bevelThickness,
      bevelSize: bevelSize,
      bevelOffset: bevelOffset,
      bevelSegments: bevelSegments,
    }
  );

  const textGeometry_2020 = new THREE.TextGeometry(
    "P O R T F O L I O  2 0 2 1",
    {
      font: font,
      size: fontSize,
      height: textHeight,
      curveSegments: curveSegments,
      bevelEnabled: bevelEnabled,
      bevelThickness: bevelThickness,
      bevelSize: bevelSize,
      bevelOffset: bevelOffset,
      bevelSegments: bevelSegments,
    }
  );

  const textMaterial = new THREE.MeshBasicMaterial({
    color: 0x00000,
    //map: textureLoader.load("/photographs/roughness.jpg"),
    wireframe: true,
  });

  /*
  const textMaterial = new THREE.MeshNormalMaterial();
  textMaterial.metalness = 0.7;
  textMaterial.roughness = 0.2;
  //textMaterial.flatShading = true;
  //textMaterial.wireframe = true;
*/
  const text_kweku = new THREE.Mesh(textGeometry_kweku, textMaterial);
  const text_fullstack = new THREE.Mesh(textGeometry_fullstack, textMaterial);
  const text_2020 = new THREE.Mesh(textGeometry_2020, textMaterial);

  //text.rotation.y = 69.3;
  text_kweku.rotation.x = textRotationX;
  text_kweku.rotation.y = textRotationY;
  text_kweku.rotation.z = textRotationZ;
  text_kweku.position.set(-26, 10, 0);

  text_fullstack.rotation.x = textRotationX;
  text_fullstack.rotation.y = textRotationY;
  text_fullstack.rotation.z = textRotationZ;
  text_fullstack.position.set(-26, 6, 0);

  text_2020.rotation.x = textRotationX;
  text_2020.rotation.y = textRotationY;
  text_2020.rotation.z = textRotationZ;
  text_2020.position.set(-26, 2, 0);

  scene.add(text_kweku);
  scene.add(text_fullstack);
  scene.add(text_2020);
});

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xdd, 0.9);
scene.add(ambientLight);

//const geometry = new THREE.SphereGeometry(2, 16, 16);
const geometry = new THREE.BoxBufferGeometry(5, 5, 5);

/*
const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMYapYRKEIwPW4eTZG6s0WhMupq4MS-Q86hA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMYapYRKEIwPW4eTZG6s0WhMupq4MS-Q86hA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMYapYRKEIwPW4eTZG6s0WhMupq4MS-Q86hA&usqp=CAU",
]);
*/

/*
for (let i = 0; i < 4; i++) {
  const material = [
    "../static/photographs/0.JPG",
    "../photographs/1.JPG",
    "../photographs/2.JPG",
    "../photographs/3.JPG",
  ].map((pic) => {
    return new THREE.MeshLambertMaterial({ map: textureLoader.load(pic) });
  });
*/

for (let i = 0; i < 4; i++) {
  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(`/photographs/${i}.JPG`),
    //  map: environmentMapTexture,
    //side: THREE.DoubleSide,
    //  metalness: 0.7,
    //  roughness: 0.5,
    // map: textureLoader.load(`/photographs/0.png`),
    // transparent: true,
  });

  const img = new THREE.Mesh(geometry, material);
  img.position.set(Math.random() + 10.9, i * -14.8);

  scene.add(img);
}

let objs = [];

scene.traverse((object) => {
  if (object.isMesh) {
    objs.push(object);
    //  console.log(objs);
  }
});

// Lights

const pointLight = new THREE.PointLight(0xdd, 0.9);
pointLight.position.x = 12;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

//* Particles
// Geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 20500;

const positions = new Float32Array(count * 3); // Multiply by 3 because each position is composed of 3 values (x, y, z)

for (
  let i = 0;
  i < count * 3;
  i++ // Multiply by 3 for same reason
) {
  positions[i] = (Math.random() - 0.5) * 200; // Math.random() - 0.5 to have a random value between -0.5 and +0.5
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
); // Create the Three.js BufferAttribute and specify that each information is composed of 3 values

// Material
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.2,
  sizeAttenuation: true,
  color: 0xffb6c1,
});

const particleTexture = textureLoader.load("/photographs/particle.png");

// ...

particlesMaterial.map = particleTexture;
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;
particlesMaterial.depthWrite = false;
//particlesMaterial.blending = THREE.AdditiveBlending;
// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 20;
scene.add(camera);

//gui.add(camera.position, "y").min(-5).max(10);
// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0xffffff, 1);

/*
 * Mouse
 */
window.addEventListener("wheel", onMouseWheel);
let y = 0;
let position = 0;

function onMouseWheel(event) {
  //  console.log(event.deltaY);
  y = event.deltaY * 0.005;
  if (position < 0) {
    if (event.deltaY < 0) {
      console.log("up stop");
      y = event.deltaY * 0.0;
    }
  } else if (position > 36) {
    if (event.deltaY > 0) {
      console.log("down stop");
      y = event.deltaY * 0.0;
    }
  }
}
let currentIntersect = null;

const mouse = new THREE.Vector2();
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;

  window.addEventListener("click", () => {
    if (currentIntersect) {
      switch (currentIntersect.object) {
        case objs[0]:
          console.log("click on object 1");
          window.open("https://augustathor.se");
          break;

        case objs[1]:
          console.log("click on object 2");
          break;

        case objs[2]:
          console.log("click on object 3");
          break;
      }
    }
  });
});

/**
 * Animate
 */

const raycaster = new THREE.Raycaster();

const clock = new THREE.Clock();
let rubrik_0 = document.getElementById("rubrik_0");
let rubrik_1 = document.getElementById("rubrik_1");
let rubrik_2 = document.getElementById("rubrik_2");
let rubrik_3 = document.getElementById("rubrik_3");

//* Naming Projects
objs[0].name = "project-0";
objs[1].name = "project-1";
objs[2].name = "project-2";
objs[3].name = "project-3";

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //objs[0].rotation.z += Math.sin(elapsedTime * 0.00009);
  //objs[0].rotation.x += Math.sin(elapsedTime * 0.00009);
  objs[0].rotation.x += 0.0005;
  objs[0].rotation.z += 0.0009;
  // cast a ray
  raycaster.setFromCamera(mouse, camera);

  const objectsToTest = [objs[0], objs[1], objs[2], objs[3]];
  const intersects = raycaster.intersectObjects(objectsToTest);

  for (const intersect of intersects) {
    //  intersect.object.material.color.set("#0000ff");
  }

  for (const object of objectsToTest) {
    if (!intersects.find((intersect) => intersect.object === object)) {
      // object.material.color.set("#ff0000");
    }
  }

  if (intersects.length) {
    if (currentIntersect === null) {
      console.log("mouse enter");

      //  console.log(intersects);
      //  rubrik_1.style.display = "block";
    }
    if (currentIntersect) {
      if (currentIntersect.object.name === "project-0") {
        rubrik_0.style.display = "block";
      }
      if (currentIntersect.object.name === "project-1") {
        rubrik_1.style.display = "block";
      }
      if (currentIntersect.object.name === "project-2") {
        rubrik_2.style.display = "block";
      }
      if (currentIntersect.object.name === "project-3") {
        rubrik_3.style.display = "block";
      }
    }

    currentIntersect = intersects[0];
  } else {
    if (currentIntersect) {
      console.log("mouse leave");
      rubrik_0.style.display = "none";
      rubrik_1.style.display = "none";
      rubrik_2.style.display = "none";
      rubrik_3.style.display = "none";
      // rubrik_1.style.display = "none";
    }
    currentIntersect = null;
  }

  // Update objects
  //  sphere.rotation.y = .5 * elapsedTime

  position += y;
  camera.position.y = -position;
  y *= 0.9;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  //Raycaster
  //raycaster.setFromCamera(mouse, camera);
  //const intersects = raycaster.intersectObjects(objs);

  // console.log(intersects);

  //* Hover
  for (const intersect of intersects) {
    gsap.to(intersect.object.scale, { x: 1.2, y: 1.2 });
    gsap.to(intersect.object.rotation, { y: -0.5 });
    gsap.to(intersect.object.position, { z: -0.9 });
    gsap.to(".rubrik", {
      y: -150,
      duration: 2.5,
      opacity: 1,
      color: 0xff6680,
    });
  }

  for (const object of objs) {
    if (!intersects.find((intersect) => intersect.object === object)) {
      gsap.to(object.scale, { x: 1, y: 1 });
      gsap.to(object.rotation, { y: 0 });
      gsap.to(object.position, { z: 0 });
      gsap.to(".rubrik", {
        y: 0,
        color: 0xffffff,
      });
    }
  }

  //* PARTICLES *//
  for (let i = 0; i < count; i++) {
    let i3 = i * 10;

    const x = particlesGeometry.attributes.position.array[i3];
    particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(
      elapsedTime + x
    );
  }
  particlesGeometry.attributes.position.needsUpdate = true;

  // ...

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
