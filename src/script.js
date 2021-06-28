import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import gsap from "gsap";

//Texture Loader
const textureLoader = new THREE.TextureLoader();

// Debug
//const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader();

fontLoader.load("/fonts/Plastic_Regular.json", (font) => {
  console.log("loaded");
});
fontLoader.load("/fonts/Plastic_Regular.json", (font) => {
  const textGeometry = new THREE.TextGeometry(
    "KWEKU MOSES FULLSTACK DEVELOPER",
    {
      font: font,
      size: 2,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    }
  );
  const textMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
  });
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);

  text.position.set(-30, 10, 0);
});

const geometry = new THREE.PlaneGeometry(12, 12);

for (let i = 0; i < 4; i++) {
  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(`/photographs/${i}.JPG`),
    side: THREE.DoubleSide,
    // map: textureLoader.load(`/photographs/0.png`),
  });

  //* Make horizontal
  const img = new THREE.Mesh(geometry, material);
  img.position.set(Math.random() + 40.9 * i, i * -14.8 * 0);

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

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

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
camera.position.z = 60;
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
          window.open("https://google.com");
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
  objs[0].rotation.y += 0.01;

  const elapsedTime = clock.getElapsedTime();

  // cast a ray
  raycaster.setFromCamera(mouse, camera);

  const objectsToTest = [objs[0], objs[1], objs[2], objs[3]];
  const intersects = raycaster.intersectObjects(objectsToTest);

  for (const intersect of intersects) {
    intersect.object.material.color.set("#0000ff");
  }

  for (const object of objectsToTest) {
    if (!intersects.find((intersect) => intersect.object === object)) {
      object.material.color.set("#ff0000");
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
  }

  for (const object of objs) {
    if (!intersects.find((intersect) => intersect.object === object)) {
      gsap.to(object.scale, { x: 1, y: 1 });
      gsap.to(object.rotation, { y: 0 });
      gsap.to(object.position, { z: 0 });
    }
  }

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
