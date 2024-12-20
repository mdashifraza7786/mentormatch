import React from 'react';

const Matchmake = () => {
  return (
    <div className="min-h-screen pb-[5vh] bg-gray-100 font-raleway">
      {/* Page Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Find Your Perfect Match</h1>
          <p className="text-center mt-2">Connect mentors and mentees based on skills, goals, and availability.</p>
        </div>
      </header>

      {/* Matchmaking Form */}
      <main className="container mx-auto px-[10vw] py-[5vh]">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Start Matching</h2>
          <form>
            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">I am a:</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="mentor"
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Mentor</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="mentee"
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Mentee</span>
                </label>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">
                Skills You Want to Teach or Learn:
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-3"
                rows="3"
                placeholder="E.g., JavaScript, Public Speaking, Time Management"
              ></textarea>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Your Availability:</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3"
                placeholder="E.g., Weekends, Weekday Evenings"
              />
            </div>

            {/* Goals */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">
                What Are Your Goals?
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-3"
                rows="3"
                placeholder="E.g., Learn full-stack development, improve public speaking, guide someone in career growth"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Find My Match
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* How It Works Section */}
      <section className="bg-blue-50 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-blue-600 text-4xl mb-4">1</div>
              <h3 className="text-lg font-bold mb-2">Sign Up</h3>
              <p>Create a profile as a mentor or mentee and share your details.</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-4xl mb-4">2</div>
              <h3 className="text-lg font-bold mb-2">Match</h3>
              <p>We connect you with the best matches based on your preferences.</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-4xl mb-4">3</div>
              <h3 className="text-lg font-bold mb-2">Grow</h3>
              <p>Collaborate, learn, and achieve your goals together.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Matchmake;
