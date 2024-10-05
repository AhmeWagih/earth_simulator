'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import EarthVertex from '../../shaders/earth/vertex.glsl';
import EarthFragment from '../../shaders/earth/fragment.glsl';
import AtmosphereVertex from '../../shaders/atmosphere/vertex.glsl';
import AtmosphereFragment from '../../shaders/atmosphere/fragment.glsl';
const ThreeEarth = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(12, 5, 4);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor('#000011');

    // Orbit Controls
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    // Loaders
    const textureLoader = new THREE.TextureLoader();
    // Load textures
    const earthDayTexture = textureLoader.load('/earth/day.jpg');
    const earthNightTexture = textureLoader.load('/earth/night.jpg');
    const earthSpecularCloudsTexture = textureLoader.load(
      '/earth/specularClouds.jpg'
    );
    // Earth Shader Material (using your shader code)
    const earthMaterial = new THREE.ShaderMaterial({
      vertexShader: EarthVertex, // Use imported variables directly
      fragmentShader: EarthFragment,
      uniforms: {
        uTime: { value: 0 },
        uDayTexture: { value: earthDayTexture },
        uNightTexture: { value: earthNightTexture },
        uSpecularCloudsTexture: { value: earthSpecularCloudsTexture },
        uSunDirection: { value: new THREE.Vector3(0, 0, 1) },
        uAmountOfClouds: { value: 0.5 },
        uAtmosphereDayColor: { value: new THREE.Color('#006994') },
        uAtmosphereTwilightColor: { value: new THREE.Color('#006994') },
        uCloudColor: { value: new THREE.Color(1, 1, 1) }, // Default white cloud color
      },
    });
    // Earth geometry and mesh
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    // Atmosphere setup (like in your original code)
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: AtmosphereVertex,
      fragmentShader: AtmosphereFragment,
      side: THREE.BackSide,
      transparent: true,
      uniforms: {
        uSunDirection: { value: new THREE.Vector3(0, 0, 1) },
        uAtmosphereDayColor: { value: new THREE.Color('#006994') },
        uAtmosphereTwilightColor: { value: new THREE.Color('#006994') },
      },
    });
    const atmosphere = new THREE.Mesh(earthGeometry, atmosphereMaterial);
    atmosphere.scale.set(1.04, 1.04, 1.04);
    scene.add(atmosphere);
    // GUI for controlling parameters
    const gui = new GUI();
    const earthParams = {
      atmosphereDayColor: '#006994',
      atmosphereTwilightColor: '#006994',
      amountOfClouds: 0.5,
    };
    gui.addColor(earthParams, 'atmosphereDayColor').onChange((value) => {
      earthMaterial.uniforms.uAtmosphereDayColor.value.set(value);
      atmosphereMaterial.uniforms.uAtmosphereDayColor.value.set(value);
    });
    gui.addColor(earthParams, 'atmosphereTwilightColor').onChange((value) => {
      earthMaterial.uniforms.uAtmosphereTwilightColor.value.set(value);
      atmosphereMaterial.uniforms.uAtmosphereTwilightColor.value.set(value);
    });
    gui
      .add(earthParams, 'amountOfClouds', 0, 1)
      .step(0.01)
      .onChange((value) => {
        earthMaterial.uniforms.uAmountOfClouds.value = value;
      });
    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      earth.rotation.y = elapsedTime * 0.1;
      earthMaterial.uniforms.uTime.value = elapsedTime * 0.1;
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
    // Resize event listener
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      gui.destroy();
    };
  }, []);
  return <canvas ref={canvasRef} className="webgl" />;
};

export default ThreeEarth;
