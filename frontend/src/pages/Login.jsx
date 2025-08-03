import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showError } from '../utils/api';
import AuthImagePattern from '../components/AuthImagePattern'; // Updated import path

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

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
      await login(formData.email, formData.password);
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      showError(msg);
    }
    setLoading(false);
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: 'demo123@gmail.com',
      password: 'demo123'
    });
  };

  return (
    <div className="min-h-screen bg-white  lg:flex">
      {/* Left side: form container */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Welcome back
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mb-6">
                Sign in to your account to continue
              </p>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-linkedin text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing In...
                    </span>
                  ) : 'Sign in'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  New to LinkedIn?{' '}
                  <Link to="/register" className="text-linkedin hover:underline font-semibold">
                    Join now
                  </Link>
                </p>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-center sm:text-left">
                  <p className="text-sm font-semibold text-gray-800 mb-1">Demo Account</p>
                  <p className="text-xs text-gray-600">Email: demo123@gmail.com</p>
                  <p className="text-xs text-gray-600">Password: demo123</p>
                </div>
                <button
                  onClick={fillDemoCredentials}
                  className="bg-transparent text-linkedin border-2 border-linkedin px-4 py-2 rounded-lg font-semibold text-sm hover:bg-linkedin hover:text-white transition-all duration-200 whitespace-nowrap"
                >
                  Use Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: AuthImagePattern container */}
      <div className="hidden lg:flex w-1/2">
        <AuthImagePattern
          title="Welcome Back!"
          subtitle="Sign in to access your professional network and opportunities."
        />
      </div>
    </div>
  );
};

export default Login;
