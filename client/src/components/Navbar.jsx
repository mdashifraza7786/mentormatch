import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("user") || document.cookie.includes("auth");
    setIsLoggedIn(!!token);
    if (token) {
      fetchUserData();
      const intervalId = setInterval(fetchUserData, 10000); // 10000 ms = 10 seconds

      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const email = storedUser.email;

      const response = await fetch("http://localhost:5001/syncdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update localStorage with the new user data (if needed)
        localStorage.setItem("user", JSON.stringify(data.user));
        setUserData(data.user);
        setNotifications(data.user.notifications); // Set notifications from user data
      } else {
        console.error("Error fetching user data:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    window.location.reload();
    window.location.href = "/";
  };

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAccept = async (notificationId) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser._id;
      const isMentor = storedUser.role === "mentor"; // Assuming role exists

      const response = await fetch('http://localhost:5001/acceptMentorshipRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          notificationId,
          isMentor,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== notificationId)
        );
        console.log(data.message); // Log success message
      } else {
        console.error('Error accepting mentorship request:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDecline = async (notificationId) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser._id;
      const isMentor = storedUser.role === "mentor"; // Assuming role exists

      const response = await fetch('http://localhost:5001/declineMentorshipRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          notificationId,
          isMentor,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== notificationId)
        );
        console.log(data.message); // Log success message
      } else {
        console.error('Error declining mentorship request:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <nav className="bg-gray-800 shadow-md py-4 px-4 sm:px-6 md:px-12 font-raleway relative">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-600">
          <Link to="/">MentorMatch®</Link>
        </div>

        <div className="hidden md:flex gap-10">
          <Link to="/about" className="text-white hover:text-blue-600">About</Link>
          {userData && userData.role === "mentor" && (
            <Link to="/mentees" className="text-white hover:text-blue-600">Mentees</Link>
          )}
          {userData && userData.role === "mentee" && (
          <Link to="/mentors" className="text-white hover:text-blue-600">Mentors</Link>
        )}
          {isLoggedIn && (
            <Link to="/mentorship" className="text-white hover:text-blue-600">Mentorship</Link>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4 relative">
          {isLoggedIn ? (
            <>
              <div className="relative">
                <IoMdNotifications
                  onClick={toggleNotifications}
                  className="text-2xl text-blue-700 hover:text-blue-500 cursor-pointer"
                />
                {isOpen && (
                  <div className="absolute top-10 right-0 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
                    <div className="p-4">
                      <h3 className="font-bold text-lg">Notifications</h3>
                      <ul className="mt-2">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <li key={notification.id} className="py-2 cursor-pointer hover:bg-gray-100 text-sm border-b last:border-none">
                              <div>{notification.message}</div>
                            </li>
                          ))
                        ) : (
                          <li className="py-2 text-sm text-gray-600">No new notifications</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <Link to="/profile">
                <CgProfile className="text-2xl text-blue-700 hover:text-blue-500 cursor-pointer" />
              </Link>
              <CiLogout
                onClick={handleLogout}
                className="text-2xl text-red-600 hover:text-red-800 cursor-pointer"
              />
            </>
          ) : (
            <div className="flex gap-4">
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

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4">
          <Link to="/about" className="block py-2 text-white hover:text-blue-600">
            About
          </Link>
          <Link to="/mentors" className="block py-2 text-white hover:text-blue-600">
            Mentors
          </Link>
          <Link to="/mentees" className="block py-2 text-white hover:text-blue-600">
            Mentees
          </Link>
          {isLoggedIn && (
            <Link to="/mentorship" className="block py-2 text-white hover:text-blue-600">
              Mentorship
            </Link>
          )}
          {isLoggedIn ? (
            <>
              <div className="mt-4 border-t border-gray-700 pt-4">
                <Link to="/profile" className="flex items-center py-2 text-white hover:text-blue-600">
                  <CgProfile className="mr-2 text-xl" />
                  Profile
                </Link>
                <button onClick={toggleNotifications} className="w-full flex items-center py-2 text-white hover:text-blue-600">
                  <IoMdNotifications className="mr-2 text-xl" />
                  Notifications
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {notifications.length}
                  </span>
                </button>
                {isOpen && (
                  <div className="bg-gray-700 rounded-lg mt-2 p-4">
                    <h3 className="font-bold text-lg text-white mb-2">Notifications</h3>
                    <ul>
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <li key={notification.id} className="py-2 text-sm text-white border-b border-gray-600 last:border-none">
                            <div>{notification.message}</div>
                          </li>
                        ))
                      ) : (
                        <li className="py-2 text-sm text-gray-400">No new notifications</li>
                      )}
                    </ul>
                  </div>
                )}
                <button onClick={handleLogout} className="w-full flex items-center py-2 text-white hover:text-red-500">
                  <CiLogout className="mr-2 text-xl" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="mt-4 border-t border-gray-700 pt-4">
              <Link
                to="/login"
                className="block px-4 py-2 text-sm text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-700 hover:text-white mb-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
