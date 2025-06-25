'use client'
import Head from 'next/head';
import Link from 'next/link';

const Main = () => {
  return (
    <>
      <Head>
        <title>MRI Processing App</title>
        <meta name="description" content="Process and analyze MRI images easily" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-6">
            MRI Image Processing
          </h1>
          <p className="text-lg text-gray-600 text-center mb-12">
            Choose an option to process MRI images quickly and efficiently
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/process_sample">
              <button className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Process Sample MRI
              </button>
            </Link>
            <Link href="/upload_process">
              <button className="w-full bg-green-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                Upload & Process MRI
              </button>
            </Link>
          </div>
        </div>

       
      </main>
    </>
  );
};

export default Main;