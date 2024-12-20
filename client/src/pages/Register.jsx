import React, { useState } from 'react';
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

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
  const [learningMode, setLearningMode] = useState('');
  const [budget, setBudget] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (e) => setRole(e.target.value);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const InputField = ({ label, type, placeholder, value, onChange }) => (
    <div>
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        required
      />
    </div>
  );

  const handleSkillsChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const handleExperienceChange = (index, value) => {
    const newExperience = [...experience];
    newExperience[index] = value;
    setExperience(newExperience);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the loader
    if(!photo || !name || !email || !mobile || !password || !skills) {
      setLoading(false); // Stop the loader
      toast.error('All fields are required, including photo', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        transition: Bounce,
      });
      return;
    }

    const formData = new FormData();
    formData.append('type', role);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('password', password);
    formData.append('photo', photo);
    formData.append('skills', skills.filter(skill => skill.trim() !== '').join(', '));
    if (role === 'mentor') {
      formData.append('experience', experience.filter(exp => exp.trim() !== '').join(', '));
      formData.append('availability', availability);
      formData.append('charges', charges);
    }

    try {
      const response = await fetch('http://localhost:5001/register', {
        method: 'POST',
        body: formData,
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
        toast.error('Registration failed: ' + result.error, {
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

            <InputField label="Full Name" type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
            <InputField label="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField label="Password" type="password" placeholder="Enter a secure password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <InputField label="Mobile Number" type="tel" placeholder="Enter your 10-digit mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} />

            {role === 'mentor' && (
              <>
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
                <InputField label="Expected Charges (per hour in INR)" type="number" placeholder="E.g., 50 USD" value={charges} onChange={(e) => setCharges(e.target.value)} />
              </>
            )}

            {role === 'mentee' && (
              <>
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
                <InputField label="Budget (in INR)" type="number" placeholder="Enter your budget (e.g., 100 USD)" value={budget} onChange={(e) => setBudget(e.target.value)} />
              </>
            )}

            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-3 rounded-md hover:bg-purple-600 transition"
            >
              {loading ? <RingLoader color="#fff" size={24} /> : `Register as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-500 hover:underline">
                  Log in here
                </Link>
              </p>
            </div>
          </form>

        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;
