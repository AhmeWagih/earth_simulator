import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const Featured = () => {
  const featuredItems = [
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
  ]

  return (
    <div className="mx-6 text-white px-3 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Featured Articles</h2>
        <Button className='text-black' variant="outline">View All</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredItems.map((item, index) => (
          <Card key={index} className="overflow-hidden bg-black w-[370px] h-[350px]">
            <img
              src={item.image}
              alt="Space"
              className="w-full h-32 object-cover"
            />
            <CardHeader>
              <CardTitle className="text-base">{item.title}</CardTitle> {/* Smaller font size */}
            </CardHeader>
            <CardContent>
              <p className="text-xs text-white">{item.description}</p> {/* Smaller text */}
            </CardContent>
            <CardFooter>
              <Button variant="link" className="p-0 text-white text-sm"> {/* Smaller button */}
                Read more
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>

  );

}

export default Featured