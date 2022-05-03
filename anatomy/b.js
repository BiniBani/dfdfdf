import * as THREE from 'https://unpkg.com/three@0.108.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.108.0/examples/jsm/loaders/GLTFLoader.js';
import { Raycaster } from '../src/core/Raycaster.js';

let controls, gltfLoader;

function main(){
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry2 = new THREE.SphereGeometry(10, 10, 10);
    const material2 = new THREE.MeshNormalMaterial({wireframe: true});
    const sphere2 = new THREE.Mesh(geometry2, material2);
    sphere2.position.x = 40;
    scene.add(sphere2);

    const geometry3 = new THREE.SphereGeometry(10, 10, 10);
    const material3 = new THREE.MeshNormalMaterial({wireframe: true});
    const sphere3 = new THREE.Mesh(geometry3, material3);
    sphere3.position.x = -40;
    scene.add(sphere3);

    gltfLoader = new GLTFLoader();

    let objt;
    gltfLoader.load("scene.gltf", function(gltf) {
        objt = gltf.scene;
        objt.scale.set(10,10,10);
        objt.position.y -= 10;
        // obj.position.x += 20;
        scene.add(gltf.scene);
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    {
        renderer.domElement.addEventListener("click", function() {
            event.preventDefault();

	        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	        raycaster.setFromCamera( mouse, camera );

            const intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0){
                alert("Success!");
            }
        });
    }

    {
        let light = new THREE.HemisphereLight(0xffffff, 0x000000); // 전자 : 하얀색, 후자 : 검은색
        scene.add(light);
        camera.position.y = 17;
        camera.position.z = 20;

        
    }

    {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 1;
        controls.maxDistance = 1000;
    }

    const animate = () => {
        // requestAnimationFrame 잘 이해 안 됨 그럼에도 간단하게 정리하자면,
        // requestAnimationFrame을 함수의 재귀적인 특성을 이용해 원하는 목적 수행
        requestAnimationFrame(animate);

        controls.update();
        // 신체 돌리기
        // obj.rotation.y += 0.05;

        renderer.render(scene, camera);
    }

    animate();
}

main();