import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { user, logout, isAuthenticated, isCompany } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700" data-testid="logo-link">
            <Briefcase className="h-8 w-8" />
            <span className="text-2xl font-bold">JobPortal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/jobs" className="text-gray-700 hover:text-primary-600 font-medium transition-colors" data-testid="jobs-link">
              Find Jobs
            </Link>
            
            {isAuthenticated ? (
              <>
                {isCompany ? (
                  <>
                    <Link to="/company/dashboard" className="text-gray-700 hover:text-primary-600 font-medium transition-colors" data-testid="dashboard-link">
                      Dashboard
                    </Link>
                    <Link to="/company/post-job" className="text-gray-700 hover:text-primary-600 font-medium transition-colors" data-testid="post-job-link">
                      Post Job
                    </Link>
                  </>
                ) : (
                  <Link to="/my-applications" className="text-gray-700 hover:text-primary-600 font-medium transition-colors" data-testid="applications-link">
                    My Applications
                  </Link>
                )}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User className="h-5 w-5" />
                    <span className="font-medium">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600 font-medium transition-colors"
                    data-testid="logout-button"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium transition-colors" data-testid="login-link">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary" data-testid="signup-button">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            data-testid="mobile-menu-button"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link
                to="/jobs"
                className="text-gray-700 hover:text-primary-600 font-medium px-2 py-2 rounded-lg hover:bg-[#f9fafb]"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-jobs-link"
              >
                Find Jobs
              </Link>
              
              {isAuthenticated ? (
                <>
                  {isCompany ? (
                    <>
                      <Link
                        to="/company/dashboard"
                        className="text-gray-700 hover:text-primary-600 font-medium px-2 py-2 rounded-lg hover:bg-[#f9fafb]"
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid="mobile-dashboard-link"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/company/post-job"
                        className="text-gray-700 hover:text-primary-600 font-medium px-2 py-2 rounded-lg hover:bg-[#f9fafb]"
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid="mobile-post-job-link"
                      >
                        Post Job
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/my-applications"
                      className="text-gray-700 hover:text-primary-600 font-medium px-2 py-2 rounded-lg hover:bg-[#f9fafb]"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="mobile-applications-link"
                    >
                      My Applications
                    </Link>
                  )}
                  <div className="px-2 py-2 text-gray-700 font-medium">
                    Hi, {user?.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-600 hover:text-red-700 font-medium px-2 py-2 rounded-lg hover:bg-red-50"
                    data-testid="mobile-logout-button"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-primary-600 font-medium px-2 py-2 rounded-lg hover:bg-[#f9fafb]"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-login-link"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary text-center"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-signup-button"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;