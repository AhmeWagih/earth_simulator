'use client';
import { useEffect, useState, useRef } from 'react';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import EarthVertex from '../../shaders/earth/vertex.glsl';
import EarthFragment from '../../shaders/earth/fragment.glsl';
import AtmosphereVertex from '../../shaders/atmosphere/vertex.glsl';
import AtmosphereFragment from '../../shaders/atmosphere/fragment.glsl';

const SliderRow = ({ label, value, setValue, max,min, step, unit = '' }) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center text-xs">
      <span className="text-gray-300">{label}</span>
      <span className="text-blue-400 font-bold">
        {value.toFixed(2)}{unit}
      </span>
    </div>
    <Slider
      value={[value]}
      onValueChange={(newValue) => setValue(newValue[0])}
      max={max}
      min={min}
      step={step}
      className="w-full transition-all duration-200 ease-in-out"
    />
  </div>
);

const page = () => {
  const canvasRef = useRef(null);
  const earthMaterialRef = useRef(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [cloudCoverage, setCloudCoverage] = useState(0.5);
  const [drought, setDrought] = useState(0);
  const [forest, setForest] = useState(0);
  const [seaLevel, setSeaLevel] = useState(0);

  const [airQuality, setAirQuality] = useState(0.5); // in percentage
  const [temperature, setTemperature] = useState(0); // in °C


  const handleIconClick = (iconType) => {
    setSelectedIcon(iconType);
  };

  const renderIconData = () => {
    switch (selectedIcon) {
      case 'cloud':
        return (
          <>
            <SliderRow
              label="Cloud Coverage"
              value={cloudCoverage}
              setValue={setCloudCoverage}
              max={1}
              step={0.01}
            />
            <SliderRow
              label="Temperature"
              value={temperature}
              setValue={setTemperature}
              max={5}
              step={0.01}
              unit="°"
            />
            <SliderRow
              label="Air Quality"
              value={airQuality}
              setValue={setAirQuality}
              max={1}
              min={0.5}
              step={0.01}
              unit="°"
            />
          </>
        );
      case 'layers':
        return (
          <SliderRow
            label="Drought"
            value={drought}
            setValue={setDrought}
            max={2}
            step={0.01}
            unit="%"
          />
        );
      case 'biosphere':
        return (
          <SliderRow
            label="Forest Coverage"
            value={forest}
            setValue={setForest}
            max={0.5}
            step={0.01}
            unit="%"
          />
        );
      case 'earth':
        return (
          <SliderRow
            label="Sea Level"
            value={seaLevel}
            setValue={setSeaLevel}
            max={2}
            step={0.01}
            unit="m"
          />
        );
      default:
        return <p>Select an icon to see Earth-related data.</p>;
    }
  };

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
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const earthDayTexture = textureLoader.load('/earth/day.jpg');
    const earthNightTexture = textureLoader.load('/earth/night.jpg');
    const earthSpecularCloudsTexture = textureLoader.load('/earth/specularClouds.jpg');

    const earthDroughtTexture = textureLoader.load('/earth/0.png'); // Check if this path is correct
    const earthForestTexture = textureLoader.load('/earth/0.png'); // Same here
    const earthSeaLevelTexture = textureLoader.load('/earth/gg (2).jpg'); // And here


    // Create Earth material
    const earthMaterial = new THREE.ShaderMaterial({
      vertexShader: EarthVertex,
      fragmentShader: EarthFragment,
      uniforms: {
        uTime: { value: 0 },
        uDayTexture: { value: earthDayTexture },
        uNightTexture: { value: earthNightTexture },
        uSpecularCloudsTexture: { value: earthSpecularCloudsTexture },
        uDroughtTexture: { value: earthDroughtTexture },
        uForestTexture: { value: earthForestTexture },
        uSeaLevelTexture: { value: earthSeaLevelTexture },
        uAmountOfClouds: { value: (cloudCoverage) },
        uDrought: { value: drought },
        uForest: { value: forest },
        uSeaLevel: { value: seaLevel },
        uCloudColor: { value: new THREE.Color(1, 1, 1) },
        uDroughtColor: { value: new THREE.Color(0.8, 0.5, 0.3) }, // Adjust drought color
        uForestColor: { value: new THREE.Color(0.2, 0.8, 0.2) }, // Adjust forest color
        uSeaLevelColor: { value: new THREE.Color(0.3765, 0.5176, 0.7020) }, // Adjust sea level color
        uSunDirection: { value: new THREE.Vector3(1, 0, 0) },
      },
    });

    earthMaterialRef.current = earthMaterial; // Store reference to material
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Create atmosphere
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: AtmosphereVertex,
      fragmentShader: AtmosphereFragment,
      side: THREE.BackSide,
      transparent: true,
      uniforms: {
        uSunDirection: { value: new THREE.Vector3(0, 0, 1) },
      },
    });
    const atmosphere = new THREE.Mesh(earthGeometry, atmosphereMaterial);
    atmosphere.scale.set(1.04, 1.04, 1.04);
    scene.add(atmosphere);
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      earth.rotation.y = elapsedTime * 0.1; // Rotate the Earth slowly
      earthMaterial.uniforms.uTime.value = elapsedTime; // Update time uniform for shader
      controls.update(); // Update controls
      renderer.render(scene, camera); // Render the scene
      requestAnimationFrame(animate); // Call animate again
    };
    animate();
    // Handle window resizing
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose(); // Clean up on unmount
    };
  }, []); // Run only once on mount

  // Update material uniforms dynamically based on props
  useEffect(() => {
    if (earthMaterialRef.current) {
      earthMaterialRef.current.uniforms.uAmountOfClouds.value = cloudCoverage;
      earthMaterialRef.current.uniforms.uDrought.value = drought;
      earthMaterialRef.current.uniforms.uForest.value = forest;
      earthMaterialRef.current.uniforms.uSeaLevel.value = seaLevel;

      // Update cloud color based on air quality
      earthMaterialRef.current.uniforms.uCloudColor.value = new THREE.Color(1.5 - airQuality, 1.5 - airQuality, 1.5 -airQuality ); // Change cloud color to gray
      // earthMaterialRef.current.uniforms.uDroughtColor.value = new THREE.Color( 0.8, 0.5, temperature); // Change cloud color to gray
    }
  }, [cloudCoverage, drought, forest, seaLevel, airQuality]); // Include air

  return (
    <div className="relative flex z-30">
      <div className="absolute top-0 left-0 m-2 z-30">
        <div className="max-w-md w-[300px]">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white p-3 rounded-lg shadow-2xl font-mono">
            <div className="flex justify-between items-center mb-2">
              <div className="flex w-full justify-between mr-3 space-x-2 text-blue-400">
                <Image src={'/assets/cloudy.png'} alt="Cloud" width={30} height={30} className="w-4 h-4 cursor-pointer" onClick={() => handleIconClick('cloud')} />
                <Image src={'/assets/layers.png'} alt="Layers" width={30} height={30} className="w-4 h-4 cursor-pointer" onClick={() => handleIconClick('layers')} />
                <Image src={'/assets/biosphere.png'} alt="Biosphere" width={30} height={30} className="w-4 h-4 cursor-pointer" onClick={() => handleIconClick('biosphere')} />
                <Image src={'/assets/earth.png'} alt="Earth" width={30} height={30} className="w-4 h-4 cursor-pointer" onClick={() => handleIconClick('earth')} />
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {renderIconData()}
            </div>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="webgl" />
    </div>
  );
};

export default page;
