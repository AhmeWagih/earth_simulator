// import Community from '@/components/not-used-yet/Community';
// import Component from '@/components/shared/Earth';
// import EarthSimulator from '@/components/shared/Earth';
// import Featured from '@/components/not-used-yet/Featured';
import Featured from '@/components/shared/Featured';
import Hero from '@/components/shared/Hero';
import HomePage from '@/components/shared/Home';
import LatestNews from '@/components/shared/LatestNews';
import NextNav from '@/components/shared/NextNav';
import Simulator from '@/components/shared/Simulator';
// import LatestNews from '@/components/not-used-yet/LatestNews';
export default function Home() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-2 relative z-20">
        <Hero />
        {/* <HomePage /> */}
        <NextNav />
        <LatestNews />
        <Featured/>
        {/* <HomePage /> */}
        {/* <EarthSimulator /> */}
        {/* <Component /> */}
        {/* <Simulator /> */}
      </div>
    </div>
  );
}
