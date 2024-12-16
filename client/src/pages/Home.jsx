import React from 'react';

const Home = () => {
  return (
    <div className="font-raleway">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 bg-gray-100">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to MentorMatch</h1>
          <p className="text-lg text-gray-600 mb-6">
            Connect with the best mentors to achieve your goals and unlock your potential.
          </p>
          <div className="space-x-4">
            <button className="bg-secondary text-white px-6 py-2 rounded-md shadow hover:bg-blue-700">
              Get Started
            </button>
            <button className="bg-white text-secondary border border-secondary px-6 py-2 rounded-md shadow hover:bg-blue-100">
              Learn More
            </button>
          </div>
        </div>
        <div className="mt-8 md:mt-0">
          <img
            src="https://via.placeholder.com/500"
            alt="Mentorship illustration"
            className="w-full max-w-sm mx-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-16 py-12 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Expert Mentors</h3>
            <p className="text-gray-600">
              Learn from industry leaders with years of experience.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Personalized Guidance</h3>
            <p className="text-gray-600">
              Get tailored advice to achieve your personal and professional goals.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Community Support</h3>
            <p className="text-gray-600">
              Join a community of like-minded individuals and grow together.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 md:px-16 py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What Our Users Say</h2>
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <p className="text-gray-600 mb-4">
              "MentorMatch helped me find the perfect mentor who guided me through my career
              transition. Highly recommend!"
            </p>
            <span className="block text-gray-700 font-semibold">- Jane Doe</span>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <p className="text-gray-600 mb-4">
              "The personalized mentorship sessions were a game-changer for my startup journey."
            </p>
            <span className="block text-gray-700 font-semibold">- John Smith</span>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-6 md:px-16 py-12 bg-secondary text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <button className="bg-white text-secondary px-8 py-3 rounded-md shadow-md hover:bg-gray-100">
          Join Now
        </button>
      </section>
    </div>
  );
};

export default Home;
