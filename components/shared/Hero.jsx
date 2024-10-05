'use client';
import { motion } from 'framer-motion';
import { slideInFromLeft, slideInFromRight } from '@/utils/motion';
import ThreeDEarth from './ThreeDEarth';
import Image from 'next/image';
const Hero = () => {
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
              className="text-6xl font-bold text-[#ebb644]"
            >
              Explore how Earth's systems connect
            </motion.h1>
            <motion.p
              variants={slideInFromLeft(0.8)}
              className="text-lg text-gray-400"
            >
              Discover the Earth like you've never seen it before. Explore the{' '}
              <span className="text-[#ebb644]">interconnectedness</span> of its
              major systems.
            </motion.p>
            <motion.div className="flex flex-row gap-5">
              <motion.a
                href="/explore"
                variants={slideInFromLeft(0.3)}
                className="bg-[#f8e8a6] text-black text-center font-semibold mt-5 py-2 px-4 w-[150px] rounded-lg shadow-md hover:bg-[#f5e08a] transition-colors duration-200 ease-in-out"
              >
                Explore
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
        <motion.div variants={slideInFromRight(0.5)} className="w-[100%]">
          <Image
            src={'/assets/earthh.png'}
            alt="earth image"
            width={500}
            height={500}
          />
          {/* <ThreeDEarth /> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
