import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, Users } from "lucide-react";
import ChatBot from "../components/ChatBot";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Explore Your Career Path
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Get personalized guidance, choose the right stream, and plan your future after Class 10
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          What We Offer
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="w-12 h-12 mb-4 flex items-center justify-center bg-blue-100 rounded-full">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Stream Guidance</h3>
            <p className="text-gray-600">
              Learn which stream suits your interests and career goals after Class 10.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="w-12 h-12 mb-4 flex items-center justify-center bg-green-100 rounded-full">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Course Recommendations</h3>
            <p className="text-gray-600">
              Explore the right courses and subjects that align with your chosen path.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="w-12 h-12 mb-4 flex items-center justify-center bg-purple-100 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Support</h3>
            <p className="text-gray-600">
              Connect with mentors, peers, and career experts for guidance and advice.
            </p>
          </div>
        </div>
      </section>

      <ChatBot />

      {/* Footer */}
      <footer className="bg-gray-100 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600">&copy; 2025 CareerGuide. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition">Contact</Link>
            <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
