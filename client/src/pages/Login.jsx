import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RingLoader } from 'react-spinners';
import { FaGithub } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate email or mobile
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const mobileRegex = /^[0-9]{10}$/;

      if (!emailRegex.test(identifier) && !mobileRegex.test(identifier)) {
        toast.error('Please enter a valid email or mobile number.');
        setLoading(false);
        return;
      }

      // API call
      const response = await fetch('https://mentormatch-ewws.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to login. Please check your credentials.');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
      toast.success(data.message || 'Login successful!');
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 via-pink-400 to-red-500">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-gray-800">MentorMatch</h2>
          <p className="text-gray-600 mt-2">Connect, Learn, and Grow</p>
        </div>

        {/* login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="emailOrMobile" className="block text-gray-700 font-medium mb-1">
              Email Address or Mobile
            </label>
            <input
              type="text"
              id="emailOrMobile"
              placeholder="you@example.com or 1234567890"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="/forgot-password" className="text-purple-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
            disabled={loading}
          >
            {loading ? <RingLoader color="white" size={24} /> : 'Login'}
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-4 text-gray-500">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="space-y-3">
          <button
            type="button"
            className="flex items-center justify-center w-full bg-gray-100 py-2 border rounded-lg hover:bg-gray-200 transition duration-300"
          >
            <img
              src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Google-256.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Login with Google
          </button>

          <button
            type="button"
            className="flex gap-2 items-center justify-center w-full bg-gray-100 py-2 border rounded-lg hover:bg-gray-200 transition duration-300"
          >
            <FaGithub />
            <span>Login with GitHub</span>
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6 text-sm">
          New to MentorMatch?{' '}
          <a href="/register" className="text-purple-500 hover:underline font-medium">
            Create an account
          </a>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
