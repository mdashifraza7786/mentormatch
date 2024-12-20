import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4 px-6 md:px-12 font-raleway">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-secondary">
          <Link to="/">MentorMatch</Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-6">
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link to="/mentors" className="text-gray-700 hover:text-blue-600">
            Mentors
          </Link>
          <Link to="/mentees" className="text-gray-700 hover:text-blue-600">
            Mentees
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>
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
        <div className="hidden md:flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 text-sm text-secondary border border-secondary rounded-lg hover:bg-secondary hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-sm bg-secondary text-white rounded-lg hover:bg-primary"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
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
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col mt-4 gap-4">
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link to="/mentors" className="text-gray-700 hover:text-blue-600">
            Mentors
          </Link>
          <Link to="/mentees" className="text-gray-700 hover:text-blue-600">
            Mentees
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white text-center"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
