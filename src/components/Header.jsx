// frontend/src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Weekendly</Link>
        <nav>
          <Link to="/" className="mr-4 hover:text-gray-200">Home</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
