'use client';

import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronDown,
  Smartphone,
  Wind,
  Droplets,
  Zap,
  Sun,
} from 'lucide-react';
import Earth from '../../public/Earth';

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center p-2 rounded-md text-xs">
    <span className="text-gray-300">{label}</span>
    <span className="text-blue-400 font-bold">{value}</span>
  </div>
);

const EarthSimulator = () => {
  
  const [temperature, setTemperature] = useState(14.8); // in °C
  const [cloudCoverage, setCloudCoverage] = useState(20); // in percentage
  const [selectedIcon, setSelectedIcon] = useState(null); // Tracks the selected icon
  const [eccentricity, setEccentricity] = useState(2);
  const [inclination, setInclination] = useState(0.3);
  const [argumentOfPeriapsis, setArgumentOfPeriapsis] = useState(289);
 // in percentage
  const handleIconClick = (iconType) => {
    setSelectedIcon(iconType); // Set the selected icon
  };
  const SliderRow = ({ label, value, setValue, max, step, unit = '' }) => (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-300">{label}</span>
        <span className="text-blue-400 font-bold">
          {value.toFixed(2)}
          {unit}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(newValue) => setValue(newValue[0])}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  );
  const renderIconData = () => {
    switch (selectedIcon) {
      case 'temperature':
        return (
          <div>
            <InfoRow label="Surface Temperature" value={`${temperature.toFixed(1)}°C`} />
            <div className="space-y-2 text-sm">
              <InfoRow label="Total Velocity" value="30.1 km/s" />
              <InfoRow label="Rotational Period" value="1.00 days" />
              <InfoRow label="Surface Gravity" value="9.82 m/s²" />
              <InfoRow label="Escape Velocity" value="11.2 km/s" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-300">Display Mode</span>
                <Select defaultValue="default">
                  <SelectTrigger className="w-[100px] bg-gray-700 text-white border-gray-600 rounded-md text-xs">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-white border-gray-600">
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-gray-700 p-1 rounded-md transition-colors duration-200 text-xs"
                onClick={() => setIsOrbitalElementsExpanded(!isOrbitalElementsExpanded)}
              >
                <span className="text-gray-300">Orbital Elements</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 
                'transform rotate-180' : ''
            `}
                />
              </div>
              <div className="space-y-2 mt-2 bg-gray-800 bg-opacity-80 p-2 rounded-md text-xs">
                <InfoRow label="Semi-Major Axis" value="149,581,352 km" />
                <SliderRow
                  label="Eccentricity"
                  value={eccentricity}
                  setValue={setEccentricity}
                  max={100}
                  step={1}
                />
                <SliderRow
                  label="Inclination"
                  value={inclination}
                  setValue={setInclination}
                  max={100}
                  step={0.1}
                />
                <SliderRow
                  label="Argument of Periapsis"
                  value={argumentOfPeriapsis}
                  setValue={setArgumentOfPeriapsis}
                  max={360}
                  step={1}
                  unit="°"
                />
              </div>
            </div>
          </div>
        );

      case 'clouds':
        return (
          <>
            <InfoRow label="Cloud Coverage" value={`${cloudCoverage}%`} />
            <p>Clouds cover around 60% of the Earth, influencing climate and weather.</p>
          </>
        );
      case 'water':
        return (
          <>
            <InfoRow label="Water Content" value="71%" />
            <p>Water covers 71% of Earth's surface, primarily in oceans.</p>
          </>
        );
      case 'electricity':
        return (
          <>
            <InfoRow label="Electricity Usage" value="25 TWh/day" />
            <p>Earth generates and consumes massive amounts of electricity daily.</p>
          </>
        );
      case 'sun':
        return (
          <>
            <InfoRow label="Sunlight Exposure" value="12 hours/day" />
            <p>The Earth receives sunlight that drives ecosystems and weather patterns.</p>
          </>
        );
      default:
        return <p>Select an icon to see Earth-related data.</p>;
    }
  };

  return (
    <div className="relative flex">
      <div className="absolute top-0 left-0 m-2 z-30">
        <div className="max-w-md w-[300px]">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white p-3 rounded-lg shadow-2xl font-mono">
            <div className="flex justify-between items-center mb-2">
              <div className="flex w-full justify-between mr-3 space-x-2 text-blue-400">
                <Smartphone className="w-4 h-4 cursor-pointer" onClick={() => handleIconClick('temperature')} />
                <Wind className="w-4 h-4 cursor-pointer" onClick={() => handleIconClick('clouds')} />
                <Droplets className="w-4 h-4 cursor-pointer" onClick={() => handleIconClick('water')} />
                <Zap className="w-4 h-4 cursor-pointer" onClick={() => handleIconClick('electricity')} />
                <Sun className="w-4 h-4 cursor-pointer" onClick={() => handleIconClick('sun')} />
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {/* Display selected icon's data */}
              {renderIconData()}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 z-20">
        <Canvas>
          <ambientLight intensity={1.5} />
          <OrbitControls />
          <Suspense fallback={null}>
            <Earth temperature={temperature} cloudCoverage={cloudCoverage} />
            <Environment preset="night" />
          </Suspense>
          <ContactShadows
            resolution={256}
            position={[0, -2.5, 0]}
            opacity={0.4}
            scale={10}
            blur={1}
            far={10}
            color='#000000'
          />
        </Canvas>
      </div>
    </div>
  );
};

export default EarthSimulator;
