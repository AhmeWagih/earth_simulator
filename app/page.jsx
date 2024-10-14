
import Featured from '@/components/shared/Featured';
import Hero from '@/components/shared/Hero';
import LatestNews from '@/components/shared/LatestNews';
import NextNav from '@/components/shared/NextNav';

export default function Home() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-2 relative z-20">
        <Hero />
        <NextNav />
        <LatestNews />
        <Featured/>
      </div>
    </div>
  );
}
