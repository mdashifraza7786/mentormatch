import React, { useState } from 'react';
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RingLoader } from 'react-spinners';
import { Link, Navigate } from 'react-router-dom';

const Register = () => {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [skills, setSkills] = useState(['', '', '']);
  const [experience, setExperience] = useState(['', '', '']);
  const [availability, setAvailability] = useState('');
  const [charges, setCharges] = useState('');
  const [budget, setBudget] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState(null);

  const [photoPreview, setPhotoPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = Navigate();

  const handleRoleChange = (e) => setRole(e.target.value);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSkillsChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
    // console.warn(skills)
  };

  const handleExperienceChange = (index, value) => {
    const newExperience = [...experience];
    newExperience[index] = value;
    setExperience(newExperience);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the loader

    // Validate required fields
    if (!photo || !name || !email || !mobile || !password || !skills.length) {
      setLoading(false); // Stop the loader
      toast.error('All fields are required, including photo and at least one skill.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        transition: Bounce,
      });
      return;
    }

    try {
      // Prepare FormData for photo upload
      const formData = new FormData();
      formData.append('photo', photo); // Append the file

      // Step 1: Upload the photo
      const photoResponse = await fetch('http://localhost:5001/photo_upload', {
        method: 'POST',
        body: formData, // Use FormData to upload the photo
      });

      const photoResult = await photoResponse.json();

      if (photoResponse.ok && photoResult.photo_url) {
        // Step 2: Prepare the registration data with photo_url
        const registrationData = {
          type: role,
          name: name,
          email: email,
          mobile: mobile,
          password: password,
          bio: bio,
          photo_url: photoResult.photo_url, // Use the photo_url from the photo upload
          skills: skills.filter(skill => skill.trim() !== ""),
        };

        if (role === 'mentor') {
          registrationData.experience = experience.filter(exp => exp.trim() !== "");
          registrationData.availability = availability || '';
          registrationData.charges = charges || 0;
        }

        // Step 3: Register the user
        const response = await fetch('http://localhost:5001/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData), // Send JSON data for registration
        });

        const result = await response.json();
        setLoading(false); // Stop the loader

        if (response.ok) {
          toast.success('Registration successful!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            transition: Bounce,
          });
        } else {
          toast.error(`Registration failed: ${result.error || 'Unknown error'}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            transition: Bounce,
          });
        }
      } else {
        setLoading(false); // Stop the loader if photo upload fails
        toast.error('Photo upload failed. Please try again later.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          transition: Bounce,
        });
      }
    } catch (error) {
      setLoading(false); // Stop the loader in case of an error
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        transition: Bounce,
      });
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-pink-400 to-red-500 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-gray-800">MentorMatch</h2>
          <p className="text-gray-600 mt-2">Connect, Learn, and Grow</p>
        </div>

        {/* Role Selection */}
        <div className="flex justify-center gap-8 mb-8">
          {['mentor', 'mentee'].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`py-2 px-6 rounded-md text-lg font-semibold transition ${role === r
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Conditional Forms */}
        {(role === 'mentor' || role === 'mentee') && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Photo Upload */}
            <div className="text-center mb-4">
              <label className="relative cursor-pointer inline-block">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-lg object-cover mx-auto border-4 border-blue-300 shadow-md"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center mx-auto border-2 border-dashed border-gray-400 shadow-md">
                    <span className="text-gray-500 text-sm">Upload Photo</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">Click to upload your profile photo</p>
            </div>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Mobile Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter your 10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* bio */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Bio</label>
              <textarea
                placeholder="Tell us about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {role === 'mentor' && (
              <>
                {/* Skills */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Skills You Want to Teach (upto 5)</label>
                  {skills.map((skill, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={`Skill ${index + 1}`}
                      value={skill}
                      onChange={(e) => handleSkillsChange(index, e.target.value)}
                      className="w-full p-3 mb-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  ))}
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Experience (upto 5)</label>
                  {experience.map((exp, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={`Experience ${index + 1}`}
                      value={exp}
                      onChange={(e) => handleExperienceChange(index, e.target.value)}
                      className="w-full p-3 mb-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  ))}
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Availability</label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  >
                    <option value="">Select Availability</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Weekends">Weekends</option>
                    <option value="Evenings">Evenings</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                {/* Charges */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Expected Charges (per hour in INR)</label>
                  <input
                    type="number"
                    placeholder="E.g., 50 USD"
                    value={charges}
                    onChange={(e) => setCharges(e.target.value)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </>
            )}

            {role === 'mentee' && (
              <>
                {/* Skills */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Skills You Want to Learn (upto 5)</label>
                  {skills.map((skill, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={`Skill ${index + 1}`}
                      value={skill}
                      onChange={(e) => handleSkillsChange(index, e.target.value)}
                      className="w-full p-3 mb-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  ))}
                </div>

                {/* Budget */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Budget (in INR)</label>
                  <input
                    type="number"
                    placeholder="Enter your budget (e.g., 100 USD)"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-md text-lg font-semibold transition hover:bg-purple-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              {loading ? <RingLoader size={30} color="#fff" /> : 'Register'}
            </button>
          </form>
        )}

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-purple-600">Login here</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
