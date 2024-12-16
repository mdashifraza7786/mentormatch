import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 md:px-12 flex justify-between items-center font-raleway">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/">MentorMatch</Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6">
        <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
        <Link to="/mentors" className="text-gray-700 hover:text-blue-600">Mentors</Link>
        <Link to="/mentees" className="text-gray-700 hover:text-blue-600">Mentees</Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center border rounded-lg px-3 py-1 w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none w-full text-sm text-gray-700"
        />
        <button className="text-blue-600 font-semibold ml-2">Search</button>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Register
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button
          className="text-gray-700 focus:outline-none focus:text-blue-600"
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
