import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showError } from '../utils/api';
import AuthImagePattern from '../components/AuthImagePattern'; // Updated import path

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.bio
      );
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      showError(msg);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white lg:flex">
      {/* Left side: form container */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Join Mini LinkedIn
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mb-6">
                Make the most of your professional life
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Full name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Password (6 or more characters)</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Bio (Optional)</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    rows="3"
                    maxLength="500"
                    placeholder="Tell us about yourself..."
                  />
                  <div className="flex justify-end text-xs text-gray-500 mt-1">
                    {formData.bio.length}/500
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  By clicking "Join now", you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-linkedin text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </span>
                  ) : 'Join now'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  Already on LinkedIn?{' '}
                  <Link to="/login" className="text-linkedin hover:underline font-semibold">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: AuthImagePattern container */}
      <div className="hidden lg:flex w-1/2">
        <AuthImagePattern
          title="Welcome to LinkedIn!"
          subtitle="Create a profile to connect with your professional network."
        />
      </div>
    </div>
  );
};

export default Register;
