
import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-12 text-gray-500 text-sm py-4">
      <p className="text-center">© {new Date().getFullYear()} MRI Processing App. All rights reserved.</p>
    </footer>
  );
}

