import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CarModelViewer = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2, 5);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Car Model
        const car = new THREE.Group();
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x4F46E5, metalness: 0.8, roughness: 0.2 });
        const body = new THREE.Mesh(new THREE.BoxGeometry(4, 1, 2), bodyMaterial);
        car.add(body);

        const cabin = new THREE.Mesh(new THREE.BoxGeometry(2, 0.8, 1.8), bodyMaterial);
        cabin.position.set(-0.5, 0.9, 0);
        car.add(cabin);

        const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 });
        const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32);
        const wheelPositions = [
            { x: 1.5, y: -0.25, z: 1 }, { x: 1.5, y: -0.25, z: -1 },
            { x: -1.5, y: -0.25, z: 1 }, { x: -1.5, y: -0.25, z: -1 },
        ];
        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
            wheel.position.set(pos.x, pos.y, pos.z);
            wheel.rotation.x = Math.PI / 2;
            car.add(wheel);
        });
        scene.add(car);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            car.rotation.y += 0.001;
            renderer.render(scene, camera);
        };
        animate();

        // GSAP Scroll Animation
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });
        tl.to(car.position, { x: 10, y: -1, z: -5 })
          .to(car.rotation, { y: Math.PI * 0.75, z: -0.1 }, "<")
          .to(camera.position, { z: 7, y: 3 }, "<");

        // Handle Window Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div id="three-canvas-container" ref={mountRef}></div>;
};

export default CarModelViewer;