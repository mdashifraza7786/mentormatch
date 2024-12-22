import React, { useState, useEffect } from 'react';
import { FaSearch, FaPhone, FaEnvelope, FaWallet } from 'react-icons/fa';

const Mentor = () => {
  const [mentors, setMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch mentors from API
  useEffect(() => {
    const fetchMentors = async () => {
      const role = localStorage.getItem('role');
      const id = localStorage.getItem('id');

      try {
        const response = await fetch('https://mentormatch-ewws.onrender.com/allmentors'); // backend URL from render
        const data = await response.json();

        // Filter out the current user if they are a mentor
        const filteredMentors =
          role === 'mentor' ? data.filter((mentor) => mentor._id !== id) : data;

        setMentors(filteredMentors);
        console.log('Filtered Mentors:', filteredMentors);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };
    fetchMentors();
  }, []);

  // Filter mentors based on search term
  const filteredMentors = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Find Your Mentor</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          {/* Search Input */}
          <input
            type="search"
            placeholder="Search mentors, experiences, skills, etc."
            className="w-full px-4 py-2 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Search Icon */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            <FaSearch className="w-5 h-5" />
          </div>
        </div>
      </div>



      {/* Skills Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {['Cricket', 'Football', 'Badminton', 'Coding', 'Swimming', 'Mathematics'].map((skill) => (
          <button
            key={skill}
            value={skill}
            className="bg-[#F0EAEB] border border-gray-300 p-[0.5vh] px-[1vw] m-[0.8vh] rounded-lg cursor-pointer transition"
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Mentor Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-[8vw]">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <div
              key={mentor._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col"
            >
              {/* Photo and Details */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 m-4">
                <img
                  src={mentor.photo || 'https://via.placeholder.com/150'}
                  alt={mentor.name}
                  className="w-52 h-52 rounded-md object-cover shadow-md"
                />
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl font-bold text-gray-800">{mentor.name}</h2>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <FaEnvelope className="text-gray-500" /> {mentor.email || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <FaPhone className="text-gray-500" /> {'+91-' + mentor.mobile || 'N/A'}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Availability:</span> {mentor.availability || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Experience:</span>
                    <ul className="list-disc pl-5 mt-1">
                      {mentor.experience.map((exp, index) => (
                        <li key={index}>{exp}</li>
                      ))}
                    </ul>
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <button className="flex items-center gap-2 bg-green-600 text-white font-bold py-1 px-3 rounded-full shadow-md">
                      <FaWallet className="h-[20px]" />
                      {mentor.charges ? `$${mentor.charges} / hour` : 'N/A'}
                    </button>
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {mentor.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Now Button */}
              <button className="mt-auto bg-yellow-500 text-white font-bold shadow-lg py-2 px-4 rounded-lg w-full hover:bg-green-600 transition">
                Chat Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No mentors found. Try a different search term.
          </p>
        )}
      </section>
    </div>
  );
};

export default Mentor;
