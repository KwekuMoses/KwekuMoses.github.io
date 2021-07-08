import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "three.meshline";

// gsap    // If media query matches

gsap.registerPlugin(ScrollTrigger);

console.log(ScrollTrigger);

//Texture Loader
const textureLoader = new THREE.TextureLoader();

// Debug
//const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
//scene.background = textureLoader.load("/photographs/rut-2.png");
console.log(scene);

// GridHelper
const gridHelper = new THREE.GridHelper(300, 90, 0xfffffff, 0xffffff);
gridHelper.position.set(0, 2, 0);
gridHelper.rotation.x = 1.6;
gridHelper.material.depthTest = false;
gridHelper.generateMipmaps = false;
gridHelper.magFilter = THREE.NearestFilter;
gridHelper.material.opacity = 0.8;
// gridHelper.material.transparent = true;
// gridHelper.minFilter = THREE.NearestFilter;

scene.add(gridHelper);

/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader();

let fontSize = 3.5;
let textRotationX = 0;
let textRotationY = -0;
let textRotationZ = 0;
let textHeight = 0.9;
let curveSegments = 5;
let bevelEnabled = false;
let bevelThickness = 1.8;
let bevelSize = 1.44;
let bevelOffset = 0;
let bevelSegments = 5;
fontLoader.load("/fonts/Plastic_Regular.json", (font) => {
  const textGeometry_kweku = new THREE.TextGeometry("K W E K U   MOSES", {
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
    "FULLSTACK   DEVELOPER",
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
    color: 0x606060,
    wireframe: true,
  });

  const text_kweku = new THREE.Mesh(textGeometry_kweku, textMaterial);
  const text_fullstack = new THREE.Mesh(textGeometry_fullstack, textMaterial);
  const text_2020 = new THREE.Mesh(textGeometry_2020, textMaterial);

  //text.rotation.y = 69.3;
  text_kweku.rotation.x = textRotationX;
  text_kweku.rotation.y = textRotationY;
  text_kweku.rotation.z = textRotationZ;
  textMaterial.depthTest = false;
  text_kweku.position.set(-26, 12, 2);
  text_kweku.renderOrder = 100;

  text_fullstack.rotation.x = textRotationX;
  text_fullstack.rotation.y = textRotationY;
  text_fullstack.rotation.z = textRotationZ;
  text_fullstack.position.set(-26, 8, 2);
  text_fullstack.renderOrder = 1;

  text_2020.rotation.x = textRotationX;
  text_2020.rotation.y = textRotationY;
  text_2020.rotation.z = textRotationZ;
  text_2020.position.set(-26, 4, 2);
  text_2020.renderOrder = 100;

  scene.add(text_kweku);
  scene.add(text_fullstack);
  scene.add(text_2020);
});
let about_size = 1.5;
let about_height = 0.2;

var text_about;

fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry_about = new THREE.TextGeometry(
    "Click The Boxes To  \n Go To My Projects \n\n\n Studying \n Fullstack Webdeveloper \n @ Nackademin \n YH \n\n\n  Currently Living in \n Gardet, Stockholm \n\n\n  Born & Raised in \n Berga, Linkoping ",
    {
      font: font,
      size: about_size,
      height: about_height,
      curveSegments: curveSegments - 3,
      bevelEnabled: bevelEnabled,
      bevelThickness: bevelThickness + 2,
      bevelSize: bevelSize,
      bevelOffset: bevelOffset,
      bevelSegments: bevelSegments,
    }
  );

  //* ABOUT TEXT

  const textMaterial = new THREE.MeshBasicMaterial({
    color: 0x2a00ff,
    wireframe: true,
    //  bevelEnabled: true,
    //  bevelThickness: 1,
    depthWrite: true,
    // flatShading: true,
  });

  text_about = new THREE.Mesh(textGeometry_about, textMaterial);

  //text.rotation.y = 69.3;
  text_about.rotation.x = textRotationX;
  text_about.rotation.y = textRotationY + 0.08;
  text_about.rotation.z = textRotationZ;
  textMaterial.depthTest = true;
  text_about.position.set(-26, -2, 2);
  text_about.renderOrder = 100;

  scene.add(text_about);

  gsap.registerPlugin(ScrollTrigger);
  gsap.to(text_about, {
    scrollTrigger: {
      trigger: "scene",
      start: "top top",
      end: "bottom",
      // markers: true,
      scrub: 9,
      toggleActions: "restart pause resume pause",
    },
    size: 3,
    y: 300,
  });
});

// Boxes
const geometry = new THREE.BoxBufferGeometry(5, 5, 5);

for (let i = 0; i < 4; i++) {
  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(`/photographs/${i}.JPG`),
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

let i;

for (i = 0; i < objs.length; i++) {
  gsap.to(objs[i].position, {
    scrollTrigger: {
      trigger: "scene",
      start: "top top",
      end: "bottom ",
      //markers: true,
      scrub: 2 + i * 9,
      toggleActions: "restart pause resume pause",
    },
    y: "-=4" + (i * (1 * i + 3)) / 4,
  });
}

gsap.to(objs[0].rotation, {
  scrollTrigger: {
    trigger: "scene",
    start: "top top",
    end: "bottom ",
    //markers: true,
    scrub: 5,
    toggleActions: "restart pause resume pause",
  },
  x: 100,
});
gsap.to(objs[1].rotation, {
  scrollTrigger: {
    trigger: "scene",
    start: "top top",
    end: "bottom ",
    //markers: true,
    scrub: 5,
    toggleActions: "restart pause resume pause",
  },
  x: 100,
});
gsap.to(objs[2].rotation, {
  scrollTrigger: {
    trigger: "scene",
    start: "top top",
    end: "bottom ",
    //markers: true,
    scrub: 5,
    toggleActions: "restart pause resume pause",
  },
  x: 100,
});
gsap.to(objs[3].rotation, {
  scrollTrigger: {
    trigger: "scene",
    start: "top top",
    end: "bottom ",
    //markers: true,
    scrub: 5,
    toggleActions: "restart pause resume pause",
  },
  x: 100,
});
fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) => {
  const ux_Geometry = new THREE.TextGeometry("Nothing To See Up Here, yet :)", {
    font: font,
    size: about_size,
    height: about_height,
    curveSegments: curveSegments - 3,
    bevelEnabled: bevelEnabled,
    bevelThickness: bevelThickness + 2,
    bevelSize: bevelSize,
    bevelOffset: bevelOffset,
    bevelSegments: bevelSegments,
  });

  const ux_Material = new THREE.MeshNormalMaterial({
    //  color: 0x2A00FF,
    // wireframe: true,
    //  bevelEnabled: true,
    //  bevelThickness: 1,
    depthWrite: true,
    // flatShading: true,
  });

  const ux_mesh = new THREE.Mesh(ux_Geometry, ux_Material);

  //text.rotation.y = 69.3;
  ux_mesh.rotation.x = textRotationX;
  ux_mesh.rotation.y = textRotationY + 0.08;
  ux_mesh.rotation.z = textRotationZ;
  ux_Material.depthTest = true;
  ux_mesh.position.set(-15, 60, 2);
  ux_mesh.renderOrder = 100;
  scene.add(ux_mesh);
});

fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) => {
  const ux_Geometry = new THREE.TextGeometry(
    "Nothing To See Below Here, yet :)",
    {
      font: font,
      size: about_size,
      height: about_height,
      curveSegments: curveSegments - 3,
      bevelEnabled: bevelEnabled,
      bevelThickness: bevelThickness + 2,
      bevelSize: bevelSize,
      bevelOffset: bevelOffset,
      bevelSegments: bevelSegments,
    }
  );

  const ux_Material = new THREE.MeshNormalMaterial({
    //  color: 0x2A00FF,
    //wireframe: true,
    //  bevelEnabled: true,
    //  bevelThickness: 1,
    depthWrite: true,
    // flatShading: true,
  });

  const ux_mesh = new THREE.Mesh(ux_Geometry, ux_Material);

  //text.rotation.y = 69.3;
  ux_mesh.rotation.x = textRotationX;
  ux_mesh.rotation.y = textRotationY + 0.08;
  ux_mesh.rotation.z = textRotationZ;
  ux_Material.depthTest = true;
  ux_mesh.position.set(-15, -90, 2);
  ux_mesh.renderOrder = 100;
  scene.add(ux_mesh);
});

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xdd, 0.9);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xdd, 0.9);
pointLight.position.x = 12;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Particles
// Geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 22500;

const positions = new Float32Array(count * 3); // Multiply by 3 because each position is composed of 3 values (x, y, z)
for (
  let i = 0;
  i < count * 3;
  i++ // Multiply by 3 for same reason
) {
  positions[i] = (Math.random() - 0.5) * 160; // Math.random() - 0.5 to have a random value between -0.5 and +0.5
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
); // Create the Three.js BufferAttribute and specify that each information is composed of 3 values

// Material
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.22,
  sizeAttenuation: true,
  // vertexColors: true,
  color: 0xc0c0c0,
});

const particleTexture = textureLoader.load("/photographs/particle.png");
// ...
particlesMaterial.map = particleTexture;
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;
particlesMaterial.depthWrite = false;

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
  3.9,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 20;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0xf5f5f5, 1);
renderer.sortObjects = false;

/*
 * Profile Image
 */

const profile_geometry = new THREE.PlaneGeometry(6.5, 10);
const profile_geometry2 = new THREE.PlaneGeometry(9.5, 7);
const profile_material = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  map: textureLoader.load("/photographs/lighter.jpg"),
});
const profile_material2 = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  map: textureLoader.load("/photographs/try.jpg"),
});

const profile_plane = new THREE.Mesh(profile_geometry, profile_material);
profile_plane.name = "Rolig Bild";
const profile_plane2 = new THREE.Mesh(profile_geometry, profile_material2);
profile_plane.name = "Bild";

profile_plane.generateMipmaps = false;
profile_plane.magFilter = THREE.NearestFilter;
scene.add(profile_plane);
scene.add(profile_plane2);
profile_plane.position.set(3, -20, 1);
profile_plane2.position.set(-2, -2, -1);
profile_plane2.renderOrder = 0; //*här

gsap.to(profile_plane.position, {
  scrollTrigger: {
    trigger: "scene",
    start: "top top",
    end: "bottom ",
    //markers: true,
    scrub: 6,
    toggleActions: "restart pause resume pause",
  },
  y: -160,
  x: -80,
});
gsap.to(profile_plane.rotation, {
  scrollTrigger: {
    trigger: "scene",
    start: "top top",
    end: "bottom ",
    //markers: true,
    scrub: 3,
  },
  z: 2.55,
});

gsap.to(profile_plane2.position, {
  scrollTrigger: {
    trigger: "scene",
    start: "top top",
    end: "bottom ",
    //markers: true,
    scrub: 4,
    toggleActions: "restart pause resume pause",
  },
  y: -80,
  x: 70,
});
gsap.to(profile_plane2.rotation, {
  scrollTrigger: {
    trigger: "scene",
    start: "top top",
    end: "bottom ",
    //markers: true,
    scrub: 3,
  },
  z: 2.55,
});
//* Animate Mouth symbol
let mouth = document.getElementById("mouth_symbol");

gsap.to(mouth, {
  x: 500,
});

/*
 * Mouse
 */
window.addEventListener("wheel", onMouseWheel);
let y = 0;
let position = 0;

function onMouseWheel(event) {
  //  console.log(event.deltaY);
  y = event.deltaY * 0.005;
  /* if (position < 0) {
          if (event.deltaY < 0) {
            console.log("up stop");
            y = event.deltaY * 0.0;
          }
        } else if (position > 36) {
          if (event.deltaY > 0) {
            console.log("down stop");
            y = event.deltaY * 0.0;
          }
        }*/
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

const raycaster = new THREE.Raycaster();

let rubrik_0 = document.getElementById("rubrik_0");
let rubrik_1 = document.getElementById("rubrik_1");
let rubrik_2 = document.getElementById("rubrik_2");
let rubrik_3 = document.getElementById("rubrik_3");

/**
 * Animate
 */
//* Naming Projects
objs[0].name = "project-0";
objs[1].name = "project-1";
objs[2].name = "project-2";
objs[3].name = "project-3";

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  objs[0].rotation.x += 0.0005;
  objs[0].rotation.z += 0.0009;
  objs[1].rotation.x += 0.001;
  objs[1].rotation.z += 0.0003;

  // cast a ray
  raycaster.setFromCamera(mouse, camera);

  const objectsToTest = [objs[0], objs[1], objs[2], objs[3]];
  const intersects = raycaster.intersectObjects(objectsToTest);

  /*
   * If mouse is on object do something else do something else
   */
  if (intersects.length) {
    if (currentIntersect === null) {
      console.log("mouse enter");
    }
    if (currentIntersect) {
      /*
       * Animate the camera
       */
      gsap.to(camera.rotation, {
        duration: 3,
        y: 0.15,
        ease: "elastic.out(1, 0.3)",
      });
      gsap.to(camera.position, {
        ease: "elastic.out(1, 0.3)",
        duration: 3.4,
        z: 10,
        x: 10,
      });
      /*
       * Animate text
       */
      gsap.to(rubrik_0, {
        opacity: 1,
        duration: 2,
      });
      gsap.to(rubrik_1, {
        opacity: 1,
        duration: 2,
      });

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
      /*
       * Animate the camera
       */
      gsap.to(camera.rotation, {
        duration: 3,
        y: 0,
      });
      gsap.to(camera.position, {
        duration: 3.4,
        z: 20,
        x: 0,
      });
      /*
       * Animate text
       */
      gsap.to(rubrik_0, {
        opacity: 0,
        duration: 2,
      });
      gsap.to(rubrik_1, {
        opacity: 0,
        duration: 2,
      });

      rubrik_0.style.display = "none";
      rubrik_1.style.display = "none";
      rubrik_2.style.display = "none";
      rubrik_3.style.display = "none";
    }
    currentIntersect = null;
  }
  /**
   * Camera animation
   */
  position += y;
  camera.position.y = -position;
  y *= 0.86;

  /*
   * Hover over boxes
   */
  for (const intersect of intersects) {
    gsap.to(intersect.object.scale, { x: 1.2, y: 1.2 });
    gsap.to(intersect.object.rotation, { y: -0.5 });
    gsap.to(intersect.object.position, { z: -0.9 });
    gsap.to(".rubrik", {
      y: 150,
      duration: 2.5,
    });
  }

  for (const object of objs) {
    if (!intersects.find((intersect) => intersect.object === object)) {
      gsap.to(object.scale, { x: 1, y: 1 });
      gsap.to(object.rotation, { y: 0 });
      gsap.to(object.position, { z: 0 });
      gsap.to(".rubrik", {
        y: 0,
        duration: 2.5,
      });
    }
  }

  //** CURSOR */
  if (intersects.length > 0) {
    $("html,body").css("cursor", "grab");
  } else {
    $("html,body").css("cursor", "default");
  }

  /*
   *PARTICLES
   */
  for (let i = 0; i < count; i++) {
    let i3 = i * 10;

    const x = particlesGeometry.attributes.position.array[i3];
    particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(
      elapsedTime + x
    );
  }
  particlesGeometry.attributes.position.needsUpdate = true;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
function myFunction(x) {
  if (x.matches) {
    camera.position.z = 20;
  } else {
    camera.position.z = 70;
  }
}

var x = window.matchMedia("(min-width: 700px)");
myFunction(x); // Call listener function at run time
x.addEventListener("resize", myFunction); // Attach listener function on state changes
