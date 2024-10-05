'use client'

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';

const SliderRow = ({ label, value, setValue, max, step, unit = '' }) => (
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
      step={step}
      className="w-full transition-all duration-200 ease-in-out" // Smooth transition for the slider handle
    />
  </div>
);

const Simulator = () => {
  const [temperature, setTemperature] = useState(14.8); // in °C
  const [cloudCoverage, setCloudCoverage] = useState(20); // in percentage
  const [selectedIcon, setSelectedIcon] = useState(null); // Tracks the selected icon
  const [inclination, setInclination] = useState(0.3);
  const [argumentOfPeriapsis, setArgumentOfPeriapsis] = useState(20); // in percentage

  const handleIconClick = (iconType) => {
    setSelectedIcon(iconType); // Set the selected icon
  };
  const renderIconData = () => {
    switch (selectedIcon) {
      case 'cloud':
        return (
          <div className="space-y-2 text-sm">
            <div className="space-y-2 mt-2 bg-gray-800 bg-opacity-80 p-2 rounded-md text-xs">
              <SliderRow
                label="Cloud"
                value={cloudCoverage}
                setValue={setCloudCoverage}
                max={100}
                step={0.01}
              />
              <SliderRow
                label="Temperature"
                value={temperature}
                setValue={setTemperature}
                max={20}
                step={0.01}
                unit="°"
              />
              <SliderRow
                label="Air Quality"
                value={argumentOfPeriapsis}
                setValue={setArgumentOfPeriapsis}
                max={100}
                step={0.01}
                unit="°"
              />
            </div>
          </div>
        );
      case 'layers':
        return (
          <div className="space-y-2 text-sm">
            <div className="space-y-2 mt-2 bg-gray-800 bg-opacity-80 p-2 rounded-md text-xs">
              <SliderRow
                label="Drought"
                value={inclination}
                setValue={setInclination}
                max={100}
                step={0.01}
              />
            </div>
          </div>
        );
      case 'biosphere':
        return (
          <div className="space-y-2 text-sm">
            <div className="space-y-2 mt-2 bg-gray-800 bg-opacity-80 p-2 rounded-md text-xs">
              <SliderRow
                label="Forest"
                value={argumentOfPeriapsis}
                setValue={setArgumentOfPeriapsis}
                max={360}
                step={0.01}
                unit="%"
              />
            </div>
          </div>
        );
      case 'earth':
        return (
          <div className="space-y-2 text-sm">
            <div className="space-y-2 mt-2 bg-gray-800 bg-opacity-80 p-2 rounded-md text-xs">
              <SliderRow
                label="Sea level"
                value={argumentOfPeriapsis}
                setValue={setArgumentOfPeriapsis}
                max={360}
                step={0.01}
                unit="m"
              />
            </div>
          </div>
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
    </div>
  );
};

export default Simulator;
