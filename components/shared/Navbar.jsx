'use client'
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname(); // Get the current path

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/simulator', label: 'Simulator' },
    { href: '/community', label: 'Community' },
    { href: '/about', label: 'About Us' },
  ]

  return (
    <div className="flex justify-between items-center pt-4 px-8 relative z-30 w-full">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-600"><Image src={'/assets/logo.png'} alt='logo' width={50} height={50}/></Link>
      {/* Navigation */}
      <nav className="ml-10">
        <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname === item.href ? 'text-[#ebb644] font-semibold' : 'text-gray-500 '}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Login Button */}
      <Link href="/login" className="bg-[#ebb644] text-white px-4 py-2 rounded-md">Login</Link>
    </div>
  )
}

export default Navbar
