import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';
import {OBJLoader2} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/OBJLoader2.js';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const fov = 50;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, -2, 0);
const controls  = new OrbitControls(camera,renderer.domElement);
controls.target.set(0, 5, 0);
controls.update();

const scene = new THREE.Scene();
scene.background = new THREE.Color('black');

// Add lighing
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 2, 0);
light.target.position.set(-5, 0, 0);
scene.add(light);
scene.add(light.target);

let object;

// Add 3d object
const objLoader = new OBJLoader2();
// 'https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj'
    objLoader.load('face.obj', (root) => {
        console.log("loaded object")
    object = root;
    // object.rotation.z = 90;
    object.position.set(0,0,0);
    scene.add(root);
});



// let sphere;

//   // Add geometry
//   var geometry = new THREE.SphereGeometry( 5, 6, 6 );
//   var material = new THREE.MeshBasicMaterial( {color: 0x066ce9,wireframe:true} );
//   sphere = new THREE.Mesh( geometry, material );
//   sphere.position.z -=40
//   scene.add( sphere );




// init();
update();

// function init()
// {

 
    // //Init the scene
    //  scene = new THREE.Scene();

    // // Init the renderer
    // renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    // renderer.shadowMap.enabled = true;
    // renderer.setPixelRatio(window.devicePixelRatio);
    // document.body.appendChild(renderer.domElement);

    // // Const elements (viewing angle, aspect ratio, near clipping plane, far clipping plane)
    // camera = new THREE.PerspectiveCamera();

    // // Add controls

    //  controls.target.set(0, 5, 0);
    // controls.update();

    // const objLoader = new OBJLoader2();
    // objLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj', (root) => {
    //   scene.add(root);
    // });

  
// }


// Rendering loop
function update() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(update);
//     sphere.rotation.x += 0.001;
//   sphere.rotation.y += 0.0005;
}
  

  
// Check if the browser hase resized;
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvasPixelWidth = canvas.width / window.devicePixelRatio;
    let canvasPixelHeight = canvas.height / window.devicePixelRatio;
  
    const needResize =
      canvasPixelWidth !== width || canvasPixelHeight !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
}