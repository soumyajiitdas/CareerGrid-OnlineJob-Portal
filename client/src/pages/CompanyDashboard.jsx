import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import Loading from '../components/Loading';
import { Briefcase, PlusCircle, Users, MapPin, DollarSign, Calendar } from 'lucide-react';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplicants: 0,
  });

  useEffect(() => {
    fetchCompanyJobs();
  }, []);

  const fetchCompanyJobs = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/company/jobs');
      setJobs(data);
      
      // Calculate stats
      const totalApplicants = data.reduce((sum, job) => sum + (job.applicants?.length || 0), 0);
      setStats({
        totalJobs: data.length,
        totalApplicants,
      });
    } catch (error) {
      console.error('Error fetching company jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return <Loading message="Loading your dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2" data-testid="dashboard-title">
            Welcome, {user?.name}
          </h1>
          <p className="text-xl text-gray-600">Manage your job postings and view applicants</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Jobs Posted</p>
                <p className="text-3xl font-bold text-gray-900" data-testid="total-jobs-stat">{stats.totalJobs}</p>
              </div>
              <div className="bg-primary-100 p-3 rounded-lg">
                <Briefcase className="h-8 w-8 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Applicants</p>
                <p className="text-3xl font-bold text-gray-900" data-testid="total-applicants-stat">{stats.totalApplicants}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Link
              to="/company/post-job"
              className="flex items-center justify-between h-full"
              data-testid="post-new-job-card"
            >
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Post New Job</p>
                <p className="text-lg font-semibold text-primary-600">Create Posting</p>
              </div>
              <div className="bg-primary-100 p-3 rounded-lg">
                <PlusCircle className="h-8 w-8 text-primary-600" />
              </div>
            </Link>
          </div>
        </div>

        {/* Jobs List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Job Postings</h2>
            <Link to="/company/post-job" className="btn-primary" data-testid="post-job-button">
              Post New Job
            </Link>
          </div>

          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 hover:shadow-md transition-all duration-200"
                  data-testid={`company-job-${job._id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2" data-testid={`job-title-${job._id}`}>
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        {job.salary && (
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{job.salary}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Posted {formatDate(job.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Users className="h-5 w-5" />
                      <span className="font-medium" data-testid={`job-applicants-${job._id}`}>
                        {job.applicants?.length || 0} applicants
                      </span>
                    </div>
                    <Link
                      to={`/jobs/${job._id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
                    >
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs posted yet</h3>
              <p className="text-gray-600 mb-6">Start by posting your first job opening</p>
              <Link to="/company/post-job" className="btn-primary">
                Post Your First Job
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;