'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ReactPlayer from "react-player";

const page = () => {
  return (
    <div className=" text-white w-full max-w-5xl mx-auto p-6 space-y-6 font-sans relative z-20">
      <div className="flex flex-col lg:flex-row items-start lg:items-center lg:space-x-8">
        {/* Text Section */}
        <div className="lg:w-1/2 space-y-2">
          <h1 className="text-3xl font-bold">Biospheres</h1>
          <p className="text-sm text-gray-300">
            The layer of gas surrounding Earth plays a crucial role in protecting life on the planet. This is where all weather phenomena occur, and it serves as a shield while protecting us from harmful radiation. Discover how changes in the atmosphere impact our daily lives and the rest of Earth's systems.
          </p>

          <h2 className="text-xl font-semibold text-yellow-400">Basic Ingredients</h2>
          <p className="text-sm">
            The atmosphere consists of nitrogen (78%), oxygen (21%), and other gases (1%) including carbon dioxide, argon, and water vapor.
          </p>

          <h2 className="text-xl font-semibold text-yellow-400">Layers</h2>
          <p className="text-sm">
            The atmosphere is divided into layers, extending from the troposphere, which contains most of the weather, to the exosphere, which reaches into outer space.
          </p>
          <ul className="text-sm list-disc list-inside">
            <li>Troposphere</li>
            <li>Stratosphere</li>
            <li>Mesosphere</li>
            <li>Thermosphere</li>
            <li>Exosphere</li>
          </ul>

          <h2 className="text-xl font-semibold text-yellow-400">Effects and Interactions</h2>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>Weather and climate: The atmosphere regulates weather and climate, including wind, precipitation, and temperature.</li>
            <li>Protecting Earth: The atmosphere acts as a natural shield against harmful ultraviolet radiation and small meteoroids.</li>
            <li>Current challenges: Climate change, increased levels of carbon dioxide and greenhouse gases causing global temperatures to rise.</li>
            <li>Air pollution: Air pollution negatively affects the health of humans and other living organisms.</li>
          </ul>
        </div>

        {/* Video Section */}
        <div className="lg:w-1/2 flex justify-end">
          <div className="relative h-64 w-full bg-gray-800 rounded-lg overflow-hidden">
            <ReactPlayer
              url="/videos/3 Piospheres.mp4" // Replace with your video URL
              className="absolute inset-0"
              width="100%"
              height="100%"
              controls
              playing={false} // You can control auto-play, etc.
            />
            
          </div>
        </div>
      </div>

      {/* Explore Button */}
      <div className="w-full flex justify-start lg:justify-end">
        <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
          Explore
        </Button>
      </div>
    </div>
  );
};

export default page;
