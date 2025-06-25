'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md py-4">
      <nav className="max-w-4xl mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          MRI App
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link href="/process_sample" className="text-gray-600 hover:text-blue-600">
            Sample Process
          </Link>
          <Link href="/upload_process" className="text-gray-600 hover:text-blue-600">
            Upload Process
          </Link>
        </div>

        {/* Hamburger Menu Button for Mobile */}
        <button 
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-2 flex flex-col space-y-2">
            <Link 
              href="/process_sample" 
              className="text-gray-600 hover:text-blue-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sample Process
            </Link>
            <Link 
              href="/upload_process" 
              className="text-gray-600 hover:text-blue-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Upload Process
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}