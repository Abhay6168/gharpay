// Landing page for public-facing lead capture
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-3xl">🏠</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  Gharpay
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Features
              </a>
              <a href="#about" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                About
              </a>
              <a href="#locations" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Locations
              </a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Contact
              </a>
              <Link
                to="/login"
                className="text-green-600 hover:text-green-800 font-semibold transition-colors"
              >
                Staff Login
              </Link>
              <Link
                to="/form"
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-700 hover:text-green-600 font-medium">
                  Features
                </a>
                <a href="#about" className="text-gray-700 hover:text-green-600 font-medium">
                  About
                </a>
                <a href="#locations" className="text-gray-700 hover:text-green-600 font-medium">
                  Locations
                </a>
                <a href="#contact" className="text-gray-700 hover:text-green-600 font-medium">
                  Contact
                </a>
                <Link to="/login" className="text-green-600 font-semibold">
                  Staff Login
                </Link>
                <Link
                  to="/form"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-6">
              Find Your Perfect PG Accommodation
            </h1>
            <p className="text-2xl md:text-3xl text-gray-800 mb-4 font-semibold">
              Comfortable Living for Students & Professionals
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Discover premium PG accommodations with modern amenities, verified safety, and affordable pricing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/form"
                className="bg-green-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Find Your PG Now →
              </Link>
              <a
                href="#features"
                className="border-2 border-green-600 text-green-600 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Residents</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">PG Properties</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">15+</div>
              <div className="text-gray-600">Locations</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Why Choose Gharpay?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make finding and settling into your new PG simple and hassle-free
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Wide Selection</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse through multiple verified PG options across prime locations with various budgets and amenities
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Dedicated Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized assistance from our team to find the perfect PG that matches your requirements and budget
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Verified Properties</h3>
              <p className="text-gray-600 leading-relaxed">
                All properties are thoroughly verified for safety, cleanliness, and quality to ensure your peace of mind
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Affordable Pricing</h3>
              <p className="text-gray-600 leading-relaxed">
                Transparent pricing with no hidden costs. Find PGs that fit your budget without compromising on quality
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-6xl mb-4">🏢</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Modern Amenities</h3>
              <p className="text-gray-600 leading-relaxed">
                WiFi, laundry, meals, parking, and more. Enjoy comfortable living with all essential amenities included
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Quick Process</h3>
              <p className="text-gray-600 leading-relaxed">
                Simple form submission, quick response time, and fast move-in process. Get settled in no time
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Locations Section */}
      <div id="locations" className="py-16 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Popular Locations
            </h2>
            <p className="text-xl text-gray-600">
              PG accommodations in the most sought-after areas
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {['Koramangala', 'HSR Layout', 'Whitefield', 'Electronic City', 'BTM Layout', 'Marathahalli', 'Indiranagar', 'Jayanagar'].map((location, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center border-2 border-transparent hover:border-green-500">
                <div className="text-4xl mb-3">📍</div>
                <h3 className="text-xl font-semibold text-gray-800">{location}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                About Gharpay
              </h2>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white p-10 rounded-2xl shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Gharpay is a trusted PG accommodation service, dedicated to helping students and working professionals find their perfect home away from home. We understand the challenges of relocating to a new city and are committed to making your transition smooth and comfortable.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                With a carefully curated selection of verified PG properties, we ensure that every accommodation meets our high standards of quality, safety, and comfort. Our team personally visits and verifies each property to guarantee the best experience for our residents.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you're a student looking for affordable accommodation near your college or a professional seeking a comfortable PG near your workplace, Gharpay is here to help you find the perfect match.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-green-600 to-green-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Perfect PG?
          </h2>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            Fill out our quick form and let our team help you find the ideal accommodation
          </p>
          <Link
            to="/form"
            className="inline-block bg-white text-green-600 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Submit Your Requirements →
          </Link>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Get in Touch
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl mb-3">📧</div>
                <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                <p className="text-gray-600">support@gharpay.com</p>
              </div>
              <div>
                <div className="text-4xl mb-3">📱</div>
                <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
              <div>
                <div className="text-4xl mb-3">⏰</div>
                <h3 className="font-semibold text-gray-800 mb-2">Hours</h3>
                <p className="text-gray-600">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl mr-2">🏠</span>
            <span className="text-2xl font-bold">Gharpay</span>
          </div>
          <p className="text-gray-400 mb-4">Your trusted partner in finding the perfect PG accommodation</p>
          <p className="text-gray-500 text-sm">© 2026 Gharpay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
