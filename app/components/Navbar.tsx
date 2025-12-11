'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/basics', label: 'Basics' },
  { href: '/work', label: 'Work' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/education', label: 'Education' },
  { href: '/awards', label: 'Awards' },
  { href: '/certificates', label: 'Certificates' },
  { href: '/publications', label: 'Publications' },
  { href: '/skills', label: 'Skills' },
  { href: '/languages', label: 'Languages' },
  { href: '/interests', label: 'Interests' },
  { href: '/references', label: 'References' },
  { href: '/projects', label: 'Projects' },
  { href: '/preview', label: 'Preview' },
  { href: '/export', label: 'Export' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            JSON Resume Builder
          </Link>
          
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
