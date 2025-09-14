// frontend/src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center p-4 mt-8">
      &copy; {new Date().getFullYear()} Weekendly. All rights reserved.
    </footer>
  );
};

export default Footer;
