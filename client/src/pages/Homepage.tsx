import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-blue-400 mb-4">Welcome to ASTRA</h1>
        <p className="text-xl text-gray-400 mb-12">
          ASTRA is a platform that connects Investors and Proposers to collaborate, fund, and develop innovative projects that will shape the future.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Investor Section */}
          <div className="p-8 bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
            <h2 className="text-3xl font-semibold text-blue-400 mb-4">For Investors</h2>
            <p className="text-lg text-gray-400 mb-6">
              Discover cutting-edge projects and ideas. As an investor, you can find promising proposers and fund projects that align with your interests.
            </p>
            <Link
              to="/investor-dashboard"
              className="px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition-all"
            >
              Explore Investment Opportunities
            </Link>
          </div>

          {/* Proposer Section */}
          <div className="p-8 bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
            <h2 className="text-3xl font-semibold text-blue-400 mb-4">For Proposers</h2>
            <p className="text-lg text-gray-400 mb-6">
              Got an innovative idea? As a proposer, you can present your projects to investors and receive the funding and support you need to bring your ideas to life.
            </p>
            <Link
              to="/proposer-dashboard"
              className="px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition-all"
            >
              Showcase Your Project
            </Link>
          </div>
        </div>

        {/* Section to highlight benefits of the platform */}
        <div className="mt-16 bg-gray-900 p-12 rounded-lg shadow-lg">
          <h2 className="text-4xl font-semibold text-blue-400 text-center mb-8">
            Why Choose ASTRA?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">Collaboration</h3>
              <p className="text-gray-400">
                Work together to create meaningful change. Investors can guide proposers, while proposers gain the funding and mentorship they need.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">Innovation</h3>
              <p className="text-gray-400">
                Our platform showcases some of the most innovative ideas from talented proposers who are ready to make an impact in their industries.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">Impact</h3>
              <p className="text-gray-400">
                Help make a real-world impact. Whether you're an investor or proposer, you are contributing to creating a better future with each project.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-12 bg-blue-600 p-10 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-200 mb-6">
            Sign up today to start collaborating on innovative projects. Whether you're looking to invest or propose, ASTRA is the place to be!
          </p>
          <Link
            to="/signup"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;