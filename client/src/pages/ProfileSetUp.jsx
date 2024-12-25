import React, { useState, useEffect } from "react";
import { CgPlayButtonO } from "react-icons/cg";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

const ProfileSetUp = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    skills: ["", "", ""],
    experience: ["", "", ""],
    availability: "",
    bio: "",
    password: "",
    charges: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const currentUserId = localStorage.getItem("user"); // Ensure `user` contains userId string
  const role = localStorage.getItem("role");
  const isMentor = role === "mentor";

  const handleInputChange = (e) => {
    const { name, value, dataset } = e.target;
    const index = dataset.index;

    if (name === "skills" || name === "experience") {
      const updatedArray = [...formData[name]];
      updatedArray[index] = value;
      setFormData((prevData) => ({ ...prevData, [name]: updatedArray }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const endpoint = isMentor
        ? `https://mentormatch-ewws.onrender.com/mentor/${currentUserId._id}`
        : `https://mentormatch-ewws.onrender.com/mentee/${currentUserId._id}`;

      const response = await fetch(endpoint);

      if (response.ok) {
        const user = await response.json();
        setFormData({
          fullName: user.name || "",
          skills: user.skills || ["", "", ""],
          experience: user.experience || ["", "", ""],
          availability: user.availability || "",
          bio: user.bio || "",
          password: user.password || "",
          charges: user.charges || "",
        });
        setProfileImage(user.photo || null);
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("An error occurred. Please try again later.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserId) fetchUserProfile();
  }, [currentUserId]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.password) {
      setErrors({
        fullName: !formData.fullName ? "Full name is required" : "",
        password: !formData.password ? "Password is required" : "",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://mentormatch-ewws.onrender.com/update/${currentUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            profileImage,
          }),
        }
      );

      if (response.ok) {
        toast.success("Profile updated successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          transition: Bounce,
        });
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred. Please try again later.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-600 via-pink-400 to-red-500 font-raleway">
        {/* <header className="bg-blue-600 text-white py-8">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl font-bold">Set Up Your Profile</h1>
            <p className="text-lg mt-2">Help others understand your expertise and interests.</p>
          </div>
        </header> */}

        <main className="container mx-auto px-6 py-12">
          {loading ? (
            <div className="flex justify-center items-center h-[70vh]">
              <div className="w-48 h-48 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 max-w-3xl mx-auto">
              <form onSubmit={handleSubmit}>
                {/* Profile Image Upload */}
                <div className="mb-8 text-center">
                  <label className="block text-lg font-medium mb-2">Profile Picture</label>
                  <div className="flex flex-col items-center">
                    <label
                      htmlFor="profileImageInput"
                      className="w-32 h-32 bg-gray-200 rounded-sm flex items-center justify-center text-gray-500 mb-4 border border-gray-300 shadow-md cursor-pointer hover:bg-gray-300"
                    >
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile Preview"
                          className="w-full h-full object-cover rounded-sm"
                        />
                      ) : (
                        "Click to upload"
                      )}
                    </label>
                    <input
                      id="profileImageInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                {/* Other input fields for Full Name, Skills, etc. */}
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                </div>

                {/* Skills, Experience, etc. */}

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-purple-700 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    {loading ? "Saving..." : "Save Profile"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>

        <ToastContainer />
      </div>
    </div>
  );
};

export default ProfileSetUp;
