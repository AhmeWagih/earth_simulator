'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  '/assets/AD2.png',
  '/assets/AD3.png',
  '/assets/AD4.png',
]

const texts = [
  "Explore how Earth's systems connect! Track climate change impacts on air, water, and nature with interactive tools that deepen our understanding of the planet.",
  "Contribute to a sustainable future! Learn how to use environmental data to make informed decisions that protect Earth's resources and promote sustainability.",
  "See real-time environmental data! Use our interactive platform powered by NASA satellite data to track climate changes and their immediate effects.",
]

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[400px] sm:h-[400px] md:h-[400px] mt-6">
      <Image
        src={images[currentImageIndex]}
        alt={`Earth view ${currentImageIndex + 1}`}
        fill
        className="object-cover transition-opacity duration-1000 ease-in-out opacity-0 animate-fadeIn"
        priority
      />
      <div className="absolute inset-0 flex items-start justify-start bg-black bg-opacity-50">
        <h1 
          className="text-white w-[700px] mx-10 my-20 text-start text-xl sm:text-2xl md:text-2xl font-bold  transition-opacity duration-1000 ease-in-out opacity-0 animate-fadeIn"
          aria-live="polite"
        >
          {texts[currentTextIndex]}
        </h1>
      </div>
    </div>
  )
}

export default HomePage
