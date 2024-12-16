import React, { useState } from 'react';

const ProfileSetUp = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-raleway">
      {/* Page Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Set Up Your Profile</h1>
          <p className="text-center mt-2">
            Help others understand your expertise and interests.
          </p>
        </div>
      </header>

      {/* Profile Setup Form */}
      <main className="container mx-auto px-4 py-10">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Complete Your Profile</h2>
          <form>
            {/* Profile Picture */}
            <div className="mb-6 text-center">
              <label className="block text-lg font-medium mb-2">Profile Picture:</label>
              <div className="flex flex-col items-center">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-4">
                    No Image
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="block text-sm text-gray-600"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            {/* Name */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Full Name:</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3"
                placeholder="Enter your full name"
              />
            </div>

            {/* Bio */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Bio:</label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-3"
                rows="4"
                placeholder="Write a short bio about yourself..."
              ></textarea>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Skills:</label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-3"
                rows="3"
                placeholder="E.g., Python, Public Speaking, Time Management"
              ></textarea>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Availability:</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3"
                placeholder="E.g., Weekends, Weekday Evenings"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
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
