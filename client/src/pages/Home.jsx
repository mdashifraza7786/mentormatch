import React from "react";

const Home = () => {
  return (
    <div className="font-raleway">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-16 bg-gray-100">
        <div className="max-w-lg text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
            Welcome to MentorMatch
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Connect with the best mentors to achieve your goals and unlock your potential.
          </p>
          <div className="space-x-4">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="mt-10 md:mt-0">
          <img
            src="https://via.placeholder.com/500"
            alt="Mentorship illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 md:px-16 py-16 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Expert Mentors",
              description: "Learn from industry leaders with years of experience.",
            },
            {
              title: "Personalized Guidance",
              description: "Get tailored advice to achieve your goals.",
            },
            {
              title: "Community Support",
              description:
                "Join a community of like-minded individuals and grow together.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-8 md:px-16 py-16 bg-gray-100 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          What Our Users Say
        </h2>
        <div className="space-y-8">
          {[
            {
              quote:
                "MentorMatch helped me find the perfect mentor who guided me through my career transition. Highly recommend!",
              name: "Jane Doe",
            },
            {
              quote:
                "The personalized mentorship sessions were a game-changer for my startup journey.",
              name: "John Smith",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto"
            >
              <p className="text-gray-600 mb-4">&quot;{testimonial.quote}&quot;</p>
              <span className="block text-gray-700 font-semibold">
                - {testimonial.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-8 md:px-16 py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <button className="btn-secondary bg-white text-blue-600 hover:bg-gray-200">
          Join Now
        </button>
      </section>
    </div>
  );
};

export default Home;
