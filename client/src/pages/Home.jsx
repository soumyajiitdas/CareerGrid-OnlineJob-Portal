import { Link } from 'react-router-dom';
import { Search, Briefcase, Users, TrendingUp, ArrowRight, MapPin, Building2, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';
import API from '../api/axios';

const Home = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFeaturedJobs();
  }, []);

  const fetchFeaturedJobs = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/jobs');
      
      let jobs = [];
      if (Array.isArray(data)) {
        jobs = data;
      } else if (data && Array.isArray(data.jobs)) {
        jobs = data.jobs;
      }
      
      setFeaturedJobs(jobs.slice(0, 6)); // Get first 6 jobs
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/jobs?search=${encodeURIComponent(searchQuery)}`;
    } else {
      window.location.href = '/jobs';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-10">
              Connect with top companies and unlock your career potential
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto" data-testid="hero-search-form">
              <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-xl p-2 shadow-lg">
                <div className="flex-1 flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                  <Search className="h-5 w-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-500"
                    data-testid="hero-search-input"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                  data-testid="hero-search-button"
                >
                  <Search className="h-5 w-5" />
                  <span>Search Jobs</span>
                </button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-primary-200">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-primary-200">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-primary-200">Job Seekers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose JobPortal?</h2>
            <p className="text-xl text-gray-600">Everything you need to find your perfect job</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl border-2 border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all duration-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Job Search</h3>
              <p className="text-gray-600">
                Search and filter through thousands of jobs with our advanced search tools
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border-2 border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all duration-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Top Companies</h3>
              <p className="text-gray-600">
                Connect with leading companies and startups looking for talented professionals
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border-2 border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all duration-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Career Growth</h3>
              <p className="text-gray-600">
                Access opportunities that match your skills and help you grow professionally
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Jobs</h2>
              <p className="text-xl text-gray-600">Discover your next opportunity</p>
            </div>
            <Link 
              to="/jobs" 
              className="btn-primary flex items-center space-x-2"
              data-testid="view-all-jobs-button"
            >
              <span>View All Jobs</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          ) : featuredJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map((job) => (
                <div key={job._id} className="card hover:border-primary-300">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      <Link to={`/jobs/${job._id}`} className="hover:text-primary-600 transition-colors">
                        {job.title}
                      </Link>
                    </h3>
                    <div className="flex items-center space-x-2 text-gray-600 mb-3">
                      <Building2 className="h-4 w-4" />
                      <span className="font-medium">{job.company?.name || 'Company'}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center space-x-1 text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <MapPin className="h-3 w-3" />
                      <span>{job.location}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center space-x-1 text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
                        <DollarSign className="h-3 w-3" />
                        <span>{job.salary}</span>
                      </div>
                    )}
                  </div>

                  <Link 
                    to={`/jobs/${job._id}`} 
                    className="btn-primary w-full text-center"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No jobs available at the moment</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Take the Next Step?</h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Join thousands of job seekers and companies already using JobPortal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-lg">
              Sign Up as Job Seeker
            </Link>
            <Link to="/signup?role=company" className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-800 border-2 border-white transition-colors duration-200 text-lg">
              Post a Job
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;