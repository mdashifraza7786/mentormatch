import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([
    "You have a new message from John.",
    "Your profile was viewed by Sarah.",
    "Reminder: Meeting at 3 PM tomorrow."
  ]);

  // Check login state using localStorage or cookies
  useEffect(() => {
    const token = localStorage.getItem("auth") || document.cookie.includes("auth");
    setIsLoggedIn(!!token);
  }, []);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 shadow-md py-4 px-6 md:px-12 font-raleway relative">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-purple-600">
          <Link to="/">MentorMatch®</Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-6">
          <Link to="/about" className="text-white hover:text-blue-600">
            About
          </Link>
          <Link to="/mentors" className="text-white hover:text-blue-600">
            Mentors
          </Link>
          <Link to="/mentees" className="text-white hover:text-blue-600">
            Mentees
          </Link>
          <Link to="/contact" className="text-white hover:text-blue-600">
            Contact
          </Link>
        </div>

        {/* User Options */}
        <div className="flex items-center gap-4 relative">
          {isLoggedIn ? (
            <>
              <IoMdNotifications
                onClick={toggleNotifications}
                className="text-2xl text-blue-700 hover:text-blue-500 cursor-pointer"
              />
              {isOpen && (
                <div className="absolute top-10 right-0 w-64 text-white bg-gray-900 shadow-lg rounded-lg border border-gray-800">
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-white">Notifications</h3>
                    <ul className="mt-2">
                      {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                          <li
                            key={index}
                            className="py-2 cursor-pointer hover:bg-gray-800 text-sm text-white border-b last:border-none"
                          >
                            {notification}
                          </li>
                        ))
                      ) : (
                        <li className="py-2 text-sm text-gray-600">No new notifications</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
              <Link to="/profile">
                <CgProfile className="text-2xl text-blue-700 hover:text-blue-500 cursor-pointer" />
              </Link>
              <CiLogout
                onClick={() => {
                  localStorage.removeItem("authToken");
                  document.cookie = "authToken=; Max-Age=0; path=/;";
                  setIsLoggedIn(false);
                }}
                className="text-2xl text-red-600 hover:text-red-800 cursor-pointer"
              />
            </>
          ) : (
            <div className="hidden md:flex gap-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-700 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
