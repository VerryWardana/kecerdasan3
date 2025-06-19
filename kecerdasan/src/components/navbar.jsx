import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
       <div className="px-4 sm:px-4 lg:px-6"> 
        <div className="flex items-center justify-start h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=teal&shade=500"
              alt="Logo"
              className="h-8 w-8 transition-transform group-hover:scale-105"
            />
            <span className="text-2xl font-bold text-teal-700 group-hover:text-teal-800 transition-colors">
              CekDiabetes
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
