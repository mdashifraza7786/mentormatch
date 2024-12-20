import React, { useState } from 'react';

const UserDiscovery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const users = [
    {
      id: 1,
      name: 'Alice Johnson',
      role: 'Mentor',
      skills: ['React', 'Node.js', 'UI/UX Design'],
      bio: 'Passionate software engineer with 5+ years of experience.',
    },
    {
      id: 2,
      name: 'Bob Smith',
      role: 'Mentee',
      skills: ['Python', 'Machine Learning'],
      bio: 'Eager learner aiming to build AI solutions.',
    },
    {
      id: 3,
      name: 'Claire Davis',
      role: 'Mentor',
      skills: ['Data Analytics', 'SQL', 'Power BI'],
      bio: 'Helping others master data-driven decision-making.',
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesRole = filter === 'All' || user.role === filter;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-raleway">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-semibold">User Discovery</h1>
          <p className="text-lg mt-2">Find mentors or mentees that match your skills and interests.</p>
        </div>
      </header>

      {/* Search and Filter Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 space-y-4 lg:space-y-0">
          <input
            type="text"
            className="w-full lg:w-2/5 border border-gray-300 rounded-lg p-4 text-lg"
            placeholder="Search by name or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full lg:w-1/4 border border-gray-300 rounded-lg p-4 text-lg"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Mentor">Mentors</option>
            <option value="Mentee">Mentees</option>
          </select>
        </div>

        {/* User List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-indigo-600 mb-2">{user.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{user.role}</p>
              <p className="text-base text-gray-700 mb-4">{user.bio}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <button
                className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Connect
              </button>
            </div>
          ))}
          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              No users found matching your criteria.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDiscovery;
