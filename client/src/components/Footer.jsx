import React from 'react';
import { SiHotelsdotcom } from "react-icons/si";
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { AiFillApple, AiFillAndroid } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate(); // Use navigation hook

  return (
    <footer className="bg-gray-900 px-8 py-10 shadow-lg font-poppins">

      {/* Brand Section */}
      <div className="flex items-center text-2xl font-semibold mb-8">
        <span className="flex items-center gap-2 text-white">
          MentorMatch <SiHotelsdotcom color="#f13719" />
        </span>
      </div>

      {/* Footer Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-white">
        
        {/* Info Section */}
        <div>
          <h3 className="font-bold text-gray-200 mb-4">Infoverse</h3>
          <ul className="space-y-2">
            <li onClick={() => navigate('/about')} className="hover:text-gray-300 cursor-pointer">
              About Us
            </li>
            <li className="hover:text-gray-300 cursor-pointer">Careers</li>
            <li className="hover:text-gray-300 cursor-pointer">Blog</li>
            <li>
              <a href="mailto:zeeshansayeedindia@gmail.com" className="hover:text-gray-300">
                Contact Us
              </a>
            </li>
            <li className="hover:text-gray-300 cursor-pointer">FAQ</li>
            <li className="hover:text-gray-300 cursor-pointer">Help Center</li>
          </ul>
        </div>

        {/* Partner Section */}
        <div>
          <h3 className="font-bold text-gray-200 mb-4">Partner</h3>
          <ul className="space-y-2">
            <li className="hover:text-gray-300 cursor-pointer">Become a Partner</li>
            <li className="hover:text-gray-300 cursor-pointer">Partner Login</li>
            <li className="hover:text-gray-300 cursor-pointer">Partner Portal</li>
            <li className="hover:text-gray-300 cursor-pointer">Partner Programs</li>
          </ul>
        </div>

        {/* Learn Section */}
        <div>
          <h3 className="font-bold text-gray-200 mb-4">Learn</h3>
          <ul className="space-y-2">
            <li className="hover:text-gray-300 cursor-pointer">Courses</li>
            <li className="hover:text-gray-300 cursor-pointer">Tutorials</li>
            <li className="hover:text-gray-300 cursor-pointer">Community</li>
          </ul>
        </div>

        {/* Social Links Section */}
        <div>
          <h3 className="font-bold text-gray-200 mb-4">Follow Us</h3>
          <div className="flex gap-4 mb-4">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="w-6 h-6 text-white hover:text-gray-300" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="w-6 h-6 text-white hover:text-gray-300" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="w-6 h-6 text-white hover:text-gray-300" />
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <FaGithub className="w-6 h-6 text-white hover:text-gray-300" />
            </a>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 cursor-pointer bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">
              <AiFillApple className="w-6 h-6 text-white" />
              <span className="text-white text-sm">App Store</span>
            </button>
            <button className="flex items-center gap-2 cursor-pointer bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">
              <AiFillAndroid className="w-6 h-6 text-white" />
              <span className="text-white text-sm">Google Play</span>
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 my-8" />

      {/* Footer Bottom Text */}
      <p className="text-xs text-gray-200 text-center">
        By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy, and Content Policies.
        <br />
        All trademarks are properties of their respective owners. 2008-2025 © MentorMatch™ Ltd. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
