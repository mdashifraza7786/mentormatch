import React from 'react';
import { SiHotelsdotcom } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gray-100 px-8 py-10 font-poppins">
      {/* Brand Section */}
      <div className="flex items-center text-2xl font-semibold mb-8">
        <span className="flex items-center gap-2 text-gray-800">
          MentorMatch <SiHotelsdotcom color="#f13719" />
        </span>
      </div>

      {/* Footer Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-gray-700">
        {/* Info Section */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Infoverse</h3>
          <ul className="space-y-2">
            <li className="hover:text-gray-900 cursor-pointer">About Us</li>
            <li className="hover:text-gray-900 cursor-pointer">Careers</li>
            <li className="hover:text-gray-900 cursor-pointer">Blog</li>
            <li className="hover:text-gray-900 cursor-pointer">Contact Us</li>
            <li className="hover:text-gray-900 cursor-pointer">FAQ</li>
            <li className="hover:text-gray-900 cursor-pointer">Help Center</li>
          </ul>
        </div>

        {/* Partner Section */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Partner</h3>
          <ul className="space-y-2">
            <li className="hover:text-gray-900 cursor-pointer">Become a Partner</li>
            <li className="hover:text-gray-900 cursor-pointer">Partner Login</li>
            <li className="hover:text-gray-900 cursor-pointer">Partner Portal</li>
            <li className="hover:text-gray-900 cursor-pointer">Partner Programs</li>
          </ul>
        </div>

        {/* Learn Section */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Learn</h3>
          <ul className="space-y-2">
            <li className="hover:text-gray-900 cursor-pointer">Courses</li>
            <li className="hover:text-gray-900 cursor-pointer">Tutorials</li>
            <li className="hover:text-gray-900 cursor-pointer">Community</li>
          </ul>
        </div>

        {/* Social Links Section */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
          <div className="flex gap-4 mb-4">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Instagram_svg-512.png" alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn2.iconfinder.com/data/icons/social-media-2421/512/Twitter-256.png" alt="Twitter" className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn3.iconfinder.com/data/icons/picons-social/57/11-linkedin-512.png" alt="LinkedIn" className="w-6 h-6" />
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn1.iconfinder.com/data/icons/picons-social/57/github_rounded-512.png" alt="GitHub" className="w-6 h-6" />
            </a>
          </div>
          <div className="flex gap-4">
            <button className="cursor-pointer">
              <img
                src="https://b.zmtcdn.com/data/webuikit/9f0c85a5e33adb783fa0aef667075f9e1556003622.png"
                alt="App Store"
                className="w-32"
              />
            </button>
            <button className="cursor-pointer">
              <img
                src="https://b.zmtcdn.com/data/webuikit/23e930757c3df49840c482a8638bf5c31556001144.png"
                alt="Google Play"
                className="w-32"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 my-8" />

      {/* Footer Bottom Text */}
      <p className="text-xs text-gray-600 text-center">
        By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy, and Content Policies.
        <br />
        All trademarks are properties of their respective owners. 2008-2024 © MyHotel™ Ltd. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
