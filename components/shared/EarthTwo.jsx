'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Slider } from '@/components/ui/slider';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function Earth({ temperature, co2Level }) {
  const earthRef = useRef();
  const cloudsRef = useRef();
  const atmosphereRef = useRef();

  // Load Earth textures using placeholder images
  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    '/assets/1.jpg', // Replace with appropriate textures
    '/assets/2.jpg',
    '/assets/3.jpg',
    '/assets/4.jpg',
  ]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsedTime / 24;
    cloudsRef.current.rotation.y = elapsedTime / 20;
  });

  // Adjust Earth's appearance based on temperature and CO2 levels
  useEffect(() => {
    if (earthRef.current && cloudsRef.current && atmosphereRef.current) {
      // Set Earth to black color with some texture influence
      earthRef.current.material.color.setRGB(0, 0, 0); // Black color
      // Optional: If you still want to apply textures, consider blending or modifying their influence
      earthRef.current.material.map = colorMap; // Ensure the texture is applied if needed

      // Simulate CO2 effect (more opaque atmosphere for higher levels)
      atmosphereRef.current.material.opacity = 0.1 + co2Level / 200;
    }
  }, [temperature, co2Level]);

  return (
    <>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          color={0x000000} // Black color
          normalMap={normalMap}
          specularMap={specularMap}
          shininess={5}
        />
      </mesh>
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshPhongMaterial map={cloudsMap} transparent={true} opacity={0.4} />
      </mesh>
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.02, 64, 64]} />
        <meshPhongMaterial color="#88ccff" transparent={true} opacity={0.1} />
      </mesh>
    </>
  );
}


function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.015, 64, 64]} />
      <shaderMaterial
        vertexShader={`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float intensity;
          varying vec3 vNormal;
          void main() {
            float atmosphere = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
            gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * atmosphere * intensity;
          }
        `}
        uniforms={{
          intensity: { value: 1.0 },
        }}
        transparent={true}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function EarthSimulator() {
  const [temperature, setTemperature] = useState(0);
  const [co2Level, setCo2Level] = useState(0);

  return (
    <div className="w-full h-screen flex flex-col md:flex-row absolute top-0 left-0 z-50">
      <div className="w-full md:w-3/4 h-[400px] md:h-full">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.1} />
          <pointLight position={[5, 3, 5]} intensity={1.5} />
          <Earth temperature={temperature} co2Level={co2Level} />
          <Atmosphere />
          <Stars
            radius={300}
            depth={60}
            count={20000}
            factor={7}
            saturation={0}
            fade={true}
          />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
          />
        </Canvas>
      </div>
      <div className="w-full md:w-1/4 p-4 bg-gray-900 text-white">
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>Earth Simulator Controls</CardTitle>
            <CardDescription className="text-gray-400">
              Adjust parameters to see their effect on Earth
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">
                Temperature Change (°C)
              </label>
              <Slider
                min={-5}
                max={5}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
                className="my-2"
              />
              <span className="text-sm">{temperature.toFixed(1)}°C</span>
            </div>
            <div>
              <label className="text-sm font-medium">CO2 Emissions Level</label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[co2Level]}
                onValueChange={(value) => setCo2Level(value[0])}
                className="my-2"
              />
              <span className="text-sm">{co2Level}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
