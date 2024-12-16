import React, { useState } from 'react';

const Register = () => {
  const [role, setRole] = useState('');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-raleway">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        {/* Role Selection */}
        <div className="flex justify-center gap-4 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="mentor"
              checked={role === 'mentor'}
              onChange={handleRoleChange}
              className="accent-blue-500"
            />
            <span className="text-lg">Mentor</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="mentee"
              checked={role === 'mentee'}
              onChange={handleRoleChange}
              className="accent-blue-500"
            />
            <span className="text-lg">Mentee</span>
          </label>
        </div>

        {/* Conditional Forms */}
        {role === 'mentor' && (
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Skills You Want to Teach</label>
              <textarea
                placeholder="E.g., Web Development, Data Science, Public Speaking"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Experience</label>
              <textarea
                placeholder="Briefly describe your professional experience"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Availability</label>
              <input
                type="text"
                placeholder="E.g., Weekends, Evenings"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
            >
              Register as Mentor
            </button>
          </form>
        )}

        {role === 'mentee' && (
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Skills You Want to Learn</label>
              <textarea
                placeholder="E.g., Web Development, Data Science, Public Speaking"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Goals</label>
              <textarea
                placeholder="Briefly describe your learning goals"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Preferred Learning Mode</label>
              <select
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option>Online</option>
                <option>In-Person</option>
                <option>Hybrid</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
            >
              Register as Mentee
            </button>
          </form>
        )}

        {role === '' && (
          <p className="text-center text-gray-500 mt-6">Please select a role to continue.</p>
        )}
      </div>
    </div>
  );
};

export default Register;
