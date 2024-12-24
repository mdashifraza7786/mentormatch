import React, { useState, useEffect } from "react";
import { FaSearch, FaPhone, FaEnvelope, FaWallet } from "react-icons/fa";

const Mentee = () => {
  const [mentees, setMentees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchMentees = async (query = "") => {
    setLoader(true);
    try {
      const url = `https://mentormatch-ewws.onrender.com/mentee${query}`;
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      setMentees(data);
    } catch (error) {
      console.error("Error fetching mentees:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Fetch mentees based on search term or fetch all mentees if search term is empty
    const query = value ? `?name=${value}` : "";
    fetchMentees(query);
  };

  const handleSkillFilter = (skill) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(updatedSkills);

    // Construct query based on selected skills
    const query = updatedSkills.length ? `?skill=${updatedSkills.join(",")}` : "";
    fetchMentees(query);
  };

  const handleChatClick = (menteeId) => {
    // Redirect to chat page with mentee ID
    window.location.href = `/chat/${menteeId}`;
  };

  useEffect(() => {
    // Initial fetch to load all mentees
    fetchMentees();
  }, []);

  return (
    <div className="py-[5vh] px-[8vw] bg-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Find Your Mentees</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Search for a mentee"
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

      {/* Mentee Cards */}
      {loader ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="w-48 h-48 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
          {mentees.length > 0 ? (
            mentees.map((mentee) => (
              <div
                key={mentee._id}
                className="bg-gray-700 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 m-4">
                  <img
                    src={mentee.photo || "https://via.placeholder.com/150"}
                    alt={mentee.name}
                    className="w-52 h-52 rounded-md object-cover shadow-md"
                  />
                  <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-[#3674c9]">{mentee.name}</h2>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <p className="text-sm text-white flex items-center gap-2">
                        <FaEnvelope className="text-white" /> {mentee.email}
                      </p>
                      <p className="text-sm text-white flex items-center gap-2">
                        <FaPhone className="text-white" /> {mentee.mobile ? `+91-${mentee.mobile}` : ""}
                      </p>
                    </div>
                    {/* bio */}
                    <p className="text-sm text-white">
                      <span className="font-semibold"><span className="font-bold text-blue-600"></span></span> {mentee.bio}
                    </p>
                    {/* <p className="text-sm text-white">
                      <span className="font-semibold">Availability:</span>{" "}
                      {mentee.availability || "N/A"}
                    </p> */}
                    {/* <p className="text-sm text-gray-600">
                      <span className="font-semibold">Experience:</span>
                      <ul className="list-disc pl-5 mt-1">
                        {mentee.experience?.map((exp, index) => (
                          <li key={index}>{exp}</li>
                        ))}
                      </ul>
                    </p> */}
                    {/* <p className="text-sm flex items-center gap-2">
                      <button className="flex items-center gap-2 bg-green-600 text-white font-bold py-1 px-3 rounded-full shadow-md">
                        <FaWallet className="h-[20px]" />
                        {mentee.charges ? `$${mentee.charges} / hour` : "N/A"}
                      </button>
                    </p> */}

                    <div className="mt-3 flex flex-wrap gap-2">
                      {mentee.skills?.slice(0, 3).map((skill, index) => (
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

                <button onClick={() => handleChatClick(mentee._id)} className="mt-auto bg-yellow-500 text-white font-bold shadow-lg py-2 px-4 rounded-lg w-full hover:bg-yellow-600 transition">
                  Chat Now
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No mentees found. Try a different search term.
            </p>
          )}
        </section>
      )}
    </div>
  );
};

export default Mentee;
