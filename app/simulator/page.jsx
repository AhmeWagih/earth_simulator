import Simulator from '@/components/shared/Simulator';
import EarthSimulator from '@/components/shared/ThreeDEarth';
import ThreeEarth from '@/components/shared/ThreeEarth';
import React from 'react';

const Page = () => {
  return (
    <div className='absolute z-30'>
      <ThreeEarth/>
      <Simulator/>
    </div>
  );
};

export default Page;
