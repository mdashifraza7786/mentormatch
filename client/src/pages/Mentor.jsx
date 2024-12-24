import React, { useState, useEffect } from "react";
import { FaSearch, FaPhone, FaEnvelope, FaWallet } from "react-icons/fa";

const Mentor = () => {
  const [mentors, setMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchMentors = async (query = "") => {
    setLoader(true);
    try {
      const url = `https://mentormatch-ewws.onrender.com/mentor${query}`;
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      setMentors(data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Fetch mentors based on search term or fetch all mentors if search term is empty
    const query = value ? `?name=${value}` : "";
    fetchMentors(query);
  };

  const handleSkillFilter = (skill) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(updatedSkills);

    // Construct query based on selected skills
    const query = updatedSkills.length ? `?skill=${updatedSkills.join(",")}` : "";
    fetchMentors(query);
  };

  const handleChatClick = (mentorId) => {
    // Redirect to chat page with mentor ID
    window.location.href = `/chat/${mentorId}`;
  };

  useEffect(() => {
    // Initial fetch to load all mentors
    fetchMentors();
  }, []);

  return (
    <div className="py-[5vh] px-[8vw]  bg-gray-800  min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Find Your Mentor</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Search for a mentor"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            <FaSearch className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Skills Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {["My Interests","Cricket", "Football", "AI/ML", "Coding", "Data Analyst", "Web Development"].map(
          (skill) => (
            <button
              key={skill}
              onClick={() => handleSkillFilter(skill)}
              className={`${selectedSkills.includes(skill)
                ? "bg-blue-500 text-white"
                : "bg-[#F0EAEB] text-gray-700"
                } border border-gray-300 p-2 px-4 rounded-lg cursor-pointer transition-all duration-300`}
            >
              {skill}
            </button>
          )
        )}
      </div>

      {/* Mentor Cards */}
      {loader ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="w-48 h-48 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
          {mentors.length > 0 ? (
            mentors.map((mentor) => (
              <div
                key={mentor._id}
                className="bg-gray-700 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 m-4">
                  <img
                    src={mentor.photo || "https://via.placeholder.com/150"}
                    alt={mentor.name}
                    className="w-52 h-52 rounded-md object-cover shadow-md"
                  />
                  <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-[#3674c9]">{mentor.name}</h2>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <p className="text-sm text-white flex items-center gap-2">
                        <FaEnvelope className="text-white" /> {mentor.email || "N/A"}
                      </p>
                      <p className="text-sm text-white flex items-center gap-2">
                        <FaPhone className="text-white" /> {mentor.mobile ? `+91-${mentor.mobile}` : "N/A"}
                      </p>
                    </div>
                    {/* bio */}
                    <p className="text-sm text-white">
                      <span className="font-semibold"></span> {mentor.bio}
                    </p>

                    <p className="text-sm text-white">
                      <span className="font-semibold">Availability:</span>{" "}
                      {mentor.availability || "N/A"}
                    </p>
                    <p className="text-sm text-white">
                      <span className="font-semibold">Experience:</span>
                      <ul className="list-disc pl-5 mt-1">
                        {mentor.experience?.map((exp, index) => (
                          <li key={index}>{exp}</li>
                        ))}
                      </ul>
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <button className="flex items-center gap-2 bg-green-600 text-white font-bold py-1 px-3 rounded-full shadow-md">
                        <FaWallet className="h-[20px]" />
                        {mentor.charges ? `$${mentor.charges} / hour` : "N/A"}
                      </button>
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {mentor.skills?.slice(0, 3).map((skill, index) => (
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

                <button onClick={() => handleChatClick(mentor._id)} className="mt-auto bg-yellow-500 text-white font-bold shadow-lg py-2 px-4 rounded-lg w-full hover:bg-yellow-600 transition">
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
      )}
    </div>
  );
};

export default Mentor;
