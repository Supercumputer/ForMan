import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you're looking for doesn't exist. If you think something is broken, please let us know.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
