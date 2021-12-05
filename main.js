import './style.css'

import * as THREE from 'three'
import { MeshBasicMaterial, TetrahedronGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

// instantiate a loader
const loader = new OBJLoader();

// load a resource
loader.load(
	// resource URL
	// 'bugatti/bugatti.obj',
	'gummy.obj',
	// called when resource is loaded
	function ( object ) {
    object.traverse( function (obj) {
      // var material = new THREE.MeshBasicMaterial({ color : 0xFFB6C1 })
      // if( obj.isMesh ) {
      if ( obj instanceof THREE.Mesh ) {
        // obj.material.color.set(0xFFB6C1);
        obj.material = material;
      }
    });
    object.position.setZ(5)
    object.rotation.y = -15
    
		// scene.add( object );
	},
	// called when loading is in progresses
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);

///////SCENE////////////
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

window.addEventListener( 'resize', function (){
  const width = window.innerWidth
  const height = window.innerHeight
  renderer.setSize( width, height )
})

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize (window.innerWidth, window.innerHeight )
camera.position.setZ(100)

/////TEXTURES/////////////////
const bgTexture = new THREE.TextureLoader().load('Public/Images/space-bg.jpg')
const globeTexture = new THREE.TextureLoader().load('Public/Images/mirrorball.jpg')
const ball = new THREE.TextureLoader().load('Public/Images/ball.jpg')
const kanga = new THREE.TextureLoader().load('Public/Images/kanga.png')
const tex = new THREE.TextureLoader().load('Public/Images/tex.png')
const icons = new THREE.TextureLoader().load('Public/Images/icons.jpg')

//NORMAL MAPS///////////////
const thatch = new THREE.TextureLoader().load('Public/Images/thatch.jpg')
const normalmap = new THREE.TextureLoader().load('Public/Images/normalmap.png')
const iconsnormal = new THREE.TextureLoader().load('Public/Images/iconsnormal.png')

////////BG//////////////////////////
scene.background = kanga


///////////TORUS////////////////////
const geometry = new THREE.TorusBufferGeometry( 10, 3, 16, 100 )
//no light source req for mesh
// const material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true } )
const material = new THREE.MeshStandardMaterial( { 
  // color: 0xFF6347
  map: bgTexture,
  normalMap: thatch
} )
const torus = new THREE.Mesh( geometry, material )
torus.position.set(40, 40, 40)
scene.add(torus)

//PLANE/////aaaaaaaaaaa

const geometry2 = new THREE.PlaneGeometry( 100, 100 );
// const material2 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const material2 = new THREE.MeshBasicMaterial( {
  // color: 0xffff00, 
  side: THREE.DoubleSide,
  map: kanga,
  transparent: true,
  // opacity: 0.5
} );
const plane = new THREE.Mesh( geometry2, material2 );
// scene.add( plane );


////////////GLOBE////////////
function addSphere() {
  const z = Math.floor(Math.random() * 100)

  const geometry = new THREE.SphereGeometry( 10, 80, 80 );
  // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const material = new THREE.MeshStandardMaterial({
    map: tex,
    normalMap: normalmap
    // color: 0x0388fc
  })
  const sphere = new THREE.Mesh( geometry, material );
  sphere.position.set(0, 0, 0)
  return sphere
}
let globe = addSphere()
// let globe2 = addSphere()
scene.add(globe);


////LIGHTING///////
const ambientLight = new THREE.AmbientLight(0xf2ba1f)

const pointLight = new THREE.PointLight(0xffffff)
const pointLight2 = new THREE.PointLight(0xffffff)
pointLight.position.set(-10, 0, -10)
pointLight2.position.set(10, 10, 10)
scene.add(pointLight, pointLight2, ambientLight)

///LIGHTING HELPERS
const lightHelper = new THREE.PointLightHelper(pointLight)
const lightHelper2 = new THREE.PointLightHelper(pointLight2)
// const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, lightHelper2)

const controls =  new OrbitControls(camera, renderer.domElement)

function addStar(){
  const geometry = new THREE.SphereGeometry(0.2, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh( geometry, material)

  const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread( 100 ))
  star.position.set(x, y, z)
  scene.add(star)
}

// Array(200).fill().forEach(()=>addStar)

for (let i = 0; i < 2000; i++) {
  addStar()
}

function animate() {
  requestAnimationFrame( animate );

  // CAREMA_UPDATE
  //ITEM  UPDATE
  
  torus.rotation.x += 0.006
  torus.rotation.y += 0.006
  torus.rotation.z += 0.003
  // torus.position.x += 0.11
  // torus.position.y += 0.11
  globe.rotation.y += 0.004
  // gummy.object.rotation.x += 0.01

  renderer.render( scene, camera);
}

animate()