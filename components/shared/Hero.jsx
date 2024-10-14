'use client';
import { motion } from 'framer-motion';
import { slideInFromLeft, slideInFromRight } from '@/utils/motion';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between h-screen px-6 md:px-20 ">
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row items-center justify-between w-full z-[20]"
      >
        <div className="h-full w-full flex flex-col gap-5 justify-center text-start md:text-start">
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 max-w-lg w-full mx-auto md:mx-0"
          >
            <motion.h1
              variants={slideInFromLeft(0.5)}
              className="text-4xl md:text-6xl font-bold text-[#ebb644]"
            >
              Explore how Earth's systems connect
            </motion.h1>
            <motion.p
              variants={slideInFromLeft(0.8)}
              className="text-base md:text-lg text-gray-400"
            >
              Discover the Earth like you've never seen it before. Explore the{' '}
              <span className="text-[#ebb644]">interconnectedness</span> of its
              major systems.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-5">
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
        <motion.div
          variants={slideInFromRight(0.5)}
          className="w-full md:w-[100%] flex justify-center mt-8 md:mt-0"
        >
          <Image
            src={'/assets/earthh.png'}
            alt="earth image"
            width={800}
            height={400}
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
