import { Book, BarChart2, Trophy, Lightbulb, Users, Gamepad2 } from 'lucide-react'
import Link from 'next/link';

const features = [
  { icon: Book, label: 'Stories', to: '/stories' },
  { icon: BarChart2, label: 'Charts', to: '/charts' },
  { icon: Gamepad2, label: 'Games', to: '/games' },
  { icon: Trophy, label: 'Challenges', to: '/challenges' },
  { icon: Lightbulb, label: 'Awareness', to: '/awareness' },
]

const NextNav = () => {
  return (
    <div className="w-full max-w-4xl mt-5 ml-56  flex justify-center items-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col cursor-pointer items-center justify-center p-4">
            <Link href={feature.to} className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mb-2 bg-gray-900 rounded-full hover:bg-gray-600 transition-colors duration-300 shadow-md">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-medium text-white">{feature.label}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NextNav;
