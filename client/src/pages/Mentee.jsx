import React, { useState, useEffect } from 'react';

const Mentee = () => {
  const [mentees, setMentees] = useState([]);
  const [filteredMentees, setFilteredMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const response = await fetch('/api/mentees'); // Replace with your API endpoint
        const data = await response.json();
        setMentees(data);
        setFilteredMentees(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching mentee data:', error);
        setLoading(false);
      }
    };

    fetchMentees();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = mentees.filter(
      (mentee) =>
        mentee.name.toLowerCase().includes(term) ||
        mentee.skills.some((skill) => skill.toLowerCase().includes(term))
    );
    setFilteredMentees(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Mentees</h1>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name or skill..."
          className="w-full max-w-md p-4 text-gray-800 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400"
        />
      </div>

      {/* Profile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMentees.length > 0 ? (
          filteredMentees.map((mentee) => (
            <div
              key={mentee._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-200"
            >
              <img
                src={mentee.photo}
                alt={`${mentee.name}'s profile`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">{mentee.name}</h2>
                <p className="text-gray-600 mb-2">
                  <strong>Email:</strong> {mentee.email}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Mobile:</strong> {mentee.mobile}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Bio:</strong> {mentee.bio || 'No bio available'}
                </p>
                <div>
                  <h3 className="text-gray-700 font-medium mb-2">Skills:</h3>
                  <ul className="flex flex-wrap gap-2">
                    {mentee.skills.map((skill, index) => (
                      <li
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm shadow-sm"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No mentees match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Mentee;
