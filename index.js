import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 0);
        scene.add(directionalLight);

        // Load FBX model
        const loader = new THREE.FBXLoader();
        loader.load('path/to/model.fbx', (fbx) => {
            fbx.scale.set(0.1, 0.1, 0.1); // adjust scale as needed
            fbx.position.set(0, 0, 0); // center the model
            scene.add(fbx);
        });

        // Set up mouse controls
        const mouse = new THREE.Vector2();
        const mouseDelta = new THREE.Vector2();
        document.addEventListener('mousemove', (event) => {
            mouseDelta.x = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            mouseDelta.y = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        });

        // Set up rendering loop
        function animate() {
            requestAnimationFrame(animate);
            // Rotate model based on mouse input
            scene.traverse((object) => {
                if (object.isMesh) {
                    object.rotation.y += mouseDelta.x * 0.01;
                    object.rotation.x += mouseDelta.y * 0.01;
                }
            });
            mouseDelta.set(0, 0); // reset mouse delta
            renderer.render(scene, camera);
        }
        animate();

        // Set up camera
        camera.position.z = 5;

        // Adjust renderer on window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

