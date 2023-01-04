import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

(window as any).three = THREE;

/**
 * 创建场景对象Scene
 */
const scene = new THREE.Scene();
(window as any).scene = scene;

// 模型
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('../assets/1.jpg'); // 加载纹理贴图

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    emissive: 0x00ff00,
    // map: texture,
    // wireframe: true
});

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set(2, 2)

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 方向光
// var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// // 设置光源位置
// directionalLight.position.set(0, 100, 00);
// scene.add(directionalLight);
// const lightHelp = new THREE.DirectionalLightHelper(directionalLight, 10);
// scene.add(lightHelp);
/**
 * 光源设置
 */
// //点光源
// var point = new THREE.PointLight(0xffffff);
// point.position.set(400, 200, 300); //点光源位置
// scene.add(point); //点光源添加到场景中
// //环境光
// var ambient = new THREE.AmbientLight(0x444444);
// scene.add(ambient);

const axis = new THREE.AxesHelper(500);
scene.add(axis);

/**
 * 相机设置
 */
const width = window.innerWidth; //窗口宽度
const height = window.innerHeight; //窗口高度
const k = width / height; //窗口宽高比
const s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
//执行渲染操作
//    renderer.render(scene,camera);

function render() {
    renderer.render(scene, camera); //执行渲染操作
    requestAnimationFrame(render);
}
render();
new OrbitControls(camera, renderer.domElement); //创建控件对象
