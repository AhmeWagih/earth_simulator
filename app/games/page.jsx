import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

const page = () => {
  const images = [
    { img: '/assets/game1 (4).png', name: 'choose-our-future', link: 'https://scied.ucar.edu/interactive/choose-our-future' },
    { img: '/assets/game1 (2).png', name: 'sea-ice-extent-maps-compare-arctic', link: 'https://scied.ucar.edu/interactive/sea-ice-extent-maps-compare-arctic' },
    { img: '/assets/game1 (1).png', name: 'sea-ice-extent-maps-compare-antarctic', link: 'https://scied.ucar.edu/interactive/sea-ice-extent-maps-compare-antarctic' },
    { img: '/assets/game1 (3).png', name: 'compare-climates-regional-future-selector', link: 'https://scied.ucar.edu/interactive/compare-climates-regional-future-selector' },
    { img: '/assets/game1 (8).png', name: 'energy-choices-and-climate-change', link: 'https://scied.ucar.edu/interactive/energy-choices-and-climate-change' },
    { img: '/assets/game1 (5).png', name: 'albedo-brightness', link: 'https://scied.ucar.edu/interactive/albedo-brightness' },
    { img: '/assets/game1 (7).png', name: 'ghg-sorting-game', link: 'https://scied.ucar.edu/interactive/ghg-sorting-game' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 px-6 mb-12 relative z-30">
      {images.map((item, index) => (
        <Card
          key={index}
          className="overflow-hidden bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-lg rounded-lg"
        >
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-40 object-cover transition-transform duration-500 transform hover:scale-105"
          />
          <CardHeader className="p-4 cursor-pointer">
            <CardTitle className="text-lg font-semibold text-gray-200">
              <Link href={item.link} target='_blank'  variant="link" className="p-0  text-white text-sm">
                {item.name}
              </Link>
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default page;
