import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-400">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Welcome to MentorMatch</h2>
        <p className="text-center text-gray-600 mb-6">
          Connect with mentors to shape your future!
        </p>

        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2 leading-tight" />
              Remember me
            </label>
            <a href="/forgot-password" className="text-sm text-purple-500 hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="my-6 flex items-center justify-between">
          <hr className="w-full border-gray-300" />
          <span className="px-4 text-gray-500">OR</span>
          <hr className="w-full border-gray-300" />
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="flex items-center justify-center w-full bg-gray-100 border py-2 rounded-lg hover:bg-gray-200 transition duration-200"
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
            className="flex items-center justify-center w-full bg-gray-100 border py-2 rounded-lg hover:bg-gray-200 transition duration-200"
          >
            <img
              src="https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Github_svg-512.png"
              alt="GitHub"
              className="w-5 h-5 mr-2"
            />
            Login with GitHub
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          New to MentorMatch?{' '}
          <a href="/register" className="text-purple-500 hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
