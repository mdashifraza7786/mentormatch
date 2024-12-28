import React from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import home from "../assets/home.jpg";
import home2 from "../assets/home2.jpg";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <div>
      <Navbar />
      <div className="font-raleway">
        
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-16 bg-gray-900">
          <div className="max-w-lg text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Welcome to <span className="text-purple-600">MentorMatch</span>
            </h1>
            <p className="text-lg text-white mb-8">
              Connect with the best {role === "Mentor" ? "mentees" : "mentors"} to achieve your goals and unlock your potential.
            </p>
            {!isLoggedin && (
              <div className="space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="text-white font-bold py-2 px-4 rounded bg-purple-500 hover:bg-purple-700 transition"
                  aria-label="Get Started with MentorMatch"
                >
                  Get Started
                </button>
                <button
                  onClick={() => navigate("/about")}
                  className="text-purple-600 font-bold py-2 px-6 rounded border border-purple-600 hover:bg-purple-600 hover:text-white transition"
                  aria-label="Learn more about MentorMatch"
                >
                  Learn More
                </button>
              </div>
            )}
          </div>
          <div className="mt-10 md:mt-0">
            <img
              src={home}
              alt="Mentorship illustration"
              className="w-[40vw] mx-auto rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="px-8 md:px-16 py-16 bg-black text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
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
                className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-8 md:px-16 py-16 bg-gray-900 text-center">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Testimonials */}
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
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <p className="text-gray-600 mb-4">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <span className="block text-gray-700 font-semibold">
                      - {testimonial.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Image */}
              <div>
                <img
                  src={home2}
                  alt="Mentorship illustration"
                  className="w-[100%] lg:w-[40vw] mx-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        {!isLoggedin && (
          <section className="px-8 md:px-16 py-16 bg-gray-800 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <button
              onClick={() => navigate("/login")}
              className="text-white bg-gray-600 font-bold py-2 px-6 rounded hover:bg-gray-200 transition"
              aria-label="Join MentorMatch Now"
            >
              Join Now
            </button>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
