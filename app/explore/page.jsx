'use client';
import { motion } from 'framer-motion';
import { slideInFromLeft, slideInFromRight } from '@/utils/motion';
import Image from 'next/image';
const spheres = [
  { name: 'Atmosphere', link: 'atmosphere' },
  { name: 'Hydrosphere', link: 'hydrosphere' },
  { name: 'Biospheres', link: 'biospheres' },
  { name: 'Geosphere', link: 'geosphere' }
];
const page = () => {
  return (
    <div className="relative flex flex-row items-center justify-between h-screen px-20 ">
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-row items-center justify-between px-20 w-full z-[20]"
      >
        <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 max-w-lg w-full"
          >
            <motion.h1
              variants={slideInFromLeft(0.5)}
              className="text-5xl font-bold text-[#fff]"
            >
              Click on each cover to discover it
            </motion.h1>
            <motion.p
              variants={slideInFromLeft(0.8)}
              className="text-lg text-gray-400"
            >
              The Earth is surrounded by four{' '}
              <span className="text-[#ebb644]">major layers</span>, each of
              which plays a crucial role in sustaining life and regulating{' '}
              <span className="text-[#ebb644]">ecosystems</span>. Click on any
              layer to learn more about its role and how it interacts with the
              others.
            </motion.p>
            <motion.div className="grid grid-cols-2 gap-4">
              {spheres.map((sphere, index) => (
                <motion.a
                href={sphere.link}
                  variants={slideInFromLeft(index * 0.3)}
                  key={index}
                  className="bg-[#f8e8a6] text-center cursor-pointer text-black font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#f5e08a] transition-colors duration-200 ease-in-out"
                >
                  {sphere.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
        <motion.div variants={slideInFromRight(0.5)} className="w-[70%]">
          <Image
            src={'/assets/explore.png'}
            alt="earth"
            width={700}
            height={500}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default page;
