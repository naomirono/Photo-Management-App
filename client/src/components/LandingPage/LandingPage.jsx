import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Photo App</h1>
        <p className="text-gray-700 mb-6">
          Explore and manage photos, albums, and users with ease in this application.
        </p>
        <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700">
          Login
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
