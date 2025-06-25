
import Link from 'next/link';
export default function Header() {
  return (
    <header className="bg-white shadow-md py-4">
      <nav className="max-w-4xl mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          MRI App
        </Link>
        <div className="space-x-4">
          <Link href="/process_sample" className="text-gray-600 hover:text-blue-600">
            Sample Process
          </Link>
          <Link href="/upload_process" className="text-gray-600 hover:text-blue-600">
            Upload Process
          </Link>
        </div>
      </nav>
    </header>
  );
}