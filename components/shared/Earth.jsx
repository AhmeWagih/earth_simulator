'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import Model from '../../public/Earth';

const EarthLayer = ({
  radius,
  color,
  name,
  isVisible,
  setHoveredLayer,
  opacity,
  setSelectedLayer,
}) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  const handleClick = () => {
    setSelectedLayer(name); // Set the clicked layer as selected
  };

  return (
    isVisible && (
      <mesh
        ref={meshRef}
        onPointerOver={() => setHoveredLayer(name)}
        onPointerOut={() => setHoveredLayer(null)}
        onClick={handleClick} // Handle click event
        pointerEvents="auto"
      >
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial color={color} transparent opacity={opacity} />
      </mesh>
    )
  );
};

const EarthModel = ({
  visibleLayers,
  setHoveredLayer,
  layerOpacity,
  setSelectedLayer,
}) => {
  const earthRef = useRef();

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={earthRef}>
      {/* The 3D Earth Model */}
      <Model scale={2.8} />

      {/* Interactive Earth layers */}
      <EarthLayer
        radius={2.5}
        color="#8B4513"
        name="Inner Core"
        isVisible={visibleLayers.innerCore}
        setHoveredLayer={setHoveredLayer}
        opacity={layerOpacity.innerCore}
        setSelectedLayer={setSelectedLayer}
      />
      <EarthLayer
        radius={3.5}
        color="#FFA500"
        name="Outer Core"
        isVisible={visibleLayers.outerCore}
        setHoveredLayer={setHoveredLayer}
        opacity={layerOpacity.outerCore}
        setSelectedLayer={setSelectedLayer}
      />
      <EarthLayer
        radius={4.5}
        color="#A52A2A"
        name="Mantle"
        isVisible={visibleLayers.mantle}
        setHoveredLayer={setHoveredLayer}
        opacity={layerOpacity.mantle}
        setSelectedLayer={setSelectedLayer}
      />
      <EarthLayer
        radius={5}
        color="#1E90FF"
        name="Crust"
        isVisible={visibleLayers.crust}
        setHoveredLayer={setHoveredLayer}
        opacity={layerOpacity.crust}
        setSelectedLayer={setSelectedLayer}
      />
    </group>
  );
};

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 15);
  }, [camera]);
  return (
    <OrbitControls
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      args={[camera, gl.domElement]}
    />
  );
};

const Earth = () => {
  const [visibleLayers, setVisibleLayers] = useState({
    innerCore: true,
    outerCore: true,
    mantle: true,
    crust: true,
  });
  const [layerOpacity, setLayerOpacity] = useState({
    innerCore: 0.7,
    outerCore: 0.7,
    mantle: 0.7,
    crust: 0.7,
  });
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState(null);

  const toggleLayer = (layer) => {
    setVisibleLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const adjustOpacity = (layer, value) => {
    setLayerOpacity((prev) => ({ ...prev, [layer]: value }));
  };

  const layerInfo = {
    'Inner Core': {
      description: 'Solid, mostly iron, about 1,220 km radius',
      temperature: '5,400°C (9,800°F)',
      pressure: '3,600,000 atmospheres',
      composition: 'Iron (85%), Nickel (10%), Light elements (5%)',
    },
    'Outer Core': {
      description: 'Liquid, mostly iron and nickel, about 2,180 km thick',
      temperature: '4,300-5,300°C (7,800-9,500°F)',
      pressure: '1,300,000-3,600,000 atmospheres',
      composition: 'Iron (80%), Nickel (5%), Light elements (15%)',
    },
    Mantle: {
      description:
        'Mostly silicate rocks rich in iron and magnesium, about 2,900 km thick',
      temperature: '1,000°C at the top to 3,700°C at the bottom',
      pressure: '140,000-3,600,000 atmospheres',
      composition: 'Silicates, Oxides, Sulfides, Metals',
    },
    Crust: {
      description: 'Thin layer of solid rocks, 5-70 km thick',
      temperature: '0°C at surface to about 1,000°C at base',
      pressure: '1-35,000 atmospheres',
      composition:
        'Oceanic: Basalt, Gabbro; Continental: Granite, Sedimentary Rocks',
    },
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full z-50">
      <div className="w-full h-screen flex text-white">
        <div className="w-1/3 p-4 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Earth Layers</h2>
          {Object.entries(visibleLayers).map(([layer, isVisible]) => (
            <div key={layer} className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => toggleLayer(layer)}
                  className="form-checkbox"
                />
                <span className="capitalize">
                  {layer.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={layerOpacity[layer]}
                onChange={(e) =>
                  adjustOpacity(layer, parseFloat(e.target.value))
                }
                className="w-full"
              />
            </div>
          ))}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Layer Information</h3>
            <select
              className="w-full p-2 bg-gray-700 rounded"
              value={selectedLayer || ''}
              onChange={(e) => setSelectedLayer(e.target.value)}
            >
              <option value="">Select a layer</option>
              {Object.keys(layerInfo).map((layer) => (
                <option key={layer} value={layer}>
                  {layer}
                </option>
              ))}
            </select>
            {selectedLayer && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold">{selectedLayer}</h4>
                <p className="mt-2">{layerInfo[selectedLayer].description}</p>
                <p className="mt-2">
                  <strong>Temperature:</strong>{' '}
                  {layerInfo[selectedLayer].temperature}
                </p>
                <p className="mt-2">
                  <strong>Pressure:</strong>{' '}
                  {layerInfo[selectedLayer].pressure}
                </p>
                <p className="mt-2">
                  <strong>Composition:</strong>{' '}
                  {layerInfo[selectedLayer].composition}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="w-2/3">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <EarthModel
              visibleLayers={visibleLayers}
              setHoveredLayer={setHoveredLayer}
              layerOpacity={layerOpacity}
              setSelectedLayer={setSelectedLayer}
            />
            <CameraController />
            {hoveredLayer && (
              <Html center>
                <div className="bg-black bg-opacity-75 text-white p-2 rounded">
                  {hoveredLayer}
                </div>
              </Html>
            )}
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Earth;
