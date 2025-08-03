import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="w-full px-3 sm:px-4 lg:px-8">
        <div className="flex flex-row items-center justify-between h-14 sm:h-16 w-full">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-linkedin text-xl sm:text-2xl font-bold hover:text-blue-800 transition-colors flex-shrink-0"
            >
              <span className="flex items-center gap-1 sm:gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-linkedin text-white rounded flex items-center justify-center text-xs sm:text-sm font-bold">
                  in
                </div>
                <span className="hidden xs:block text-base sm:text-lg">MiniLinkedIn</span>
              </span>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {user ? (
              <>
                <Link 
                  to={`/profile/${user._id}`}
                  className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
                >
                  <div className="w-8 h-8 bg-linkedin text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700 font-medium hidden sm:block text-sm truncate max-w-24 lg:max-w-none">
                    {user.name}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center justify-center gap-2 text-linkedin px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors focus:outline-none min-w-[44px] min-h-[44px]"
                >
                  <span className="hidden sm:block">Logout</span>
                  <FiLogOut className="w-6 h-6 sm:w-6 sm:h-6" />
                </button>
              </>
            ) : (
              <>
                {!isLoginPage && (
                  <Link 
                    to="/login"
                    className="flex items-center justify-center gap-2 text-gray-700 hover:text-linkedin font-medium px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-gray-100 transition-colors text-sm focus:outline-none min-w-[44px] min-h-[44px]"
                  >
                    <span className="hidden sm:block">Login</span>
                    <FiUser className="w-6 h-6 sm:w-6 sm:h-6" />
                  </Link>
                )}
                {!isRegisterPage && (
                  <Link 
                    to="/register"
                    className="flex items-center justify-center text-gray-800 px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px]"
                  >
                    <span className="hidden sm:block">Sign Up</span>
                    <svg className="w-6 h-6 sm:w-6 sm:h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
