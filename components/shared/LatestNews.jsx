import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const LatestNews = () => {
  const newsItems = [
    {
      title: 'Cosmic discoveries: New insights into dark matter',
      description:
        'Scientists have made groundbreaking observations that shed new light on the nature of dark matter in the universe.',
      image: '/earth/PIA00122~orig.jpg',
    },
    {
      title: 'Cosmic discoveries: New insights into dark matter',
      description:
        'Scientists have made groundbreaking observations that shed new light on the nature of dark matter in the universe.',
      image: '/earth/PIA00342~orig.jpg',
    },
    {
      title: 'Cosmic discoveries: New insights into dark matter',
      description:
        'Scientists have made groundbreaking observations that shed new light on the nature of dark matter in the universe.',
      image: '/earth/PIA00122~orig.jpg',
    },
  ];

  return (
    <div className="mx-auto px-4 py-8 text-white max-w-screen-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Latest News</h2>
        <Button className="text-black" variant="outline">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item, index) => (
          <Card key={index} className="overflow-hidden bg-gray-900 rounded-lg shadow-lg">
            <img
              src={item.image}
              alt="Space"
              className="w-full h-40 sm:h-48 object-cover"
            />
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-300">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">{item.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="p-0 text-[#ebb644] text-sm hover:underline">
                Read more
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
