import React, { useState } from "react";

const ProfileSetUp = ({ userId }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    skills: "",
    availability: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

    try {
      const response = await fetch(`/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          bio: formData.bio,
          skills: formData.skills,
          availability: formData.availability,
          profileImage, // Include the base64 image if uploaded
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        alert("Profile updated successfully!");
        console.log("Updated User:", updatedUser);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-raleway">
      {/* Page Header */}
      <header className="bg-blue-600 text-white py-8">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold">Set Up Your Profile</h1>
          <p className="text-lg mt-2">Help others understand your expertise and interests.</p>
        </div>
      </header>

      {/* Profile Setup Form */}
      <main className="container mx-auto px-6 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-semibold text-center mb-8">Complete Your Profile</h2>
          <form onSubmit={handleSubmit}>
            {/* Profile Picture */}
            <div className="mb-8 text-center">
              <label className="block text-lg font-medium mb-2">Profile Picture</label>
              <div className="flex flex-col items-center">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-4">
                    No Image
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="block text-sm text-gray-600 file:py-2 file:px-4 file:rounded-md file:bg-blue-600 file:text-white"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            {/* Name */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-3"
                placeholder="Enter your full name"
              />
            </div>

            {/* Bio */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-3"
                rows="4"
                placeholder="Write a short bio about yourself..."
              ></textarea>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Skills</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-3"
                rows="3"
                placeholder="E.g., Python, Public Speaking, Time Management"
              ></textarea>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Availability</label>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-3"
                placeholder="E.g., Weekends, Weekday Evenings"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfileSetUp;
