import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import { MapPin, DollarSign, Building2, Clock, Briefcase, ArrowLeft, CheckCircle } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isJobSeeker, user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/jobs/${id}`);
      setJob(data);
      // Check if user already applied
      if (user && data.applicants?.includes(user._id)) {
        setApplied(true);
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }

    if (!isJobSeeker) {
      setError('Only job seekers can apply for jobs');
      return;
    }

    try {
      setApplying(true);
      setError('');
      await API.post(`/jobs/${id}/apply`);
      setApplied(true);
      setSuccess('Application submitted successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to apply for job');
    } finally {
      setApplying(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <Loading message="Loading job details..." />;
  }

  if (error && !job) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
            <p className="text-red-600 text-lg">{error}</p>
            <button onClick={() => navigate('/jobs')} className="btn-primary mt-4">
              Back to Jobs
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-6 transition-colors"
          data-testid="back-to-jobs-button"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Jobs</span>
        </button>

        {/* Job Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4" data-testid="job-details-title">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span className="font-medium" data-testid="job-details-company">{job.company?.name || 'Company Name'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span data-testid="job-details-location">{job.location}</span>
                </div>
                {job.salary && (
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span data-testid="job-details-salary">{job.salary}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="border-t border-gray-200 pt-6">
            {success && (
              <div className="mb-4 bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <p className="text-green-700 font-medium">{success}</p>
              </div>
            )}
            {error && (
              <div className="mb-4 bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}
            {applied ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span className="text-green-700 font-semibold">You have already applied for this job</span>
              </div>
            ) : (
              <button
                onClick={handleApply}
                disabled={applying}
                className="btn-primary w-full sm:w-auto px-12 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="apply-job-button"
              >
                {applying ? 'Applying...' : 'Apply Now'}
              </button>
            )}
          </div>
        </div>

        {/* Job Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap" data-testid="job-details-description">
              {job.description}
            </p>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Posted Date</span>
              </div>
              <p className="text-gray-900 font-semibold ml-7">{formatDate(job.createdAt)}</p>
            </div>
            <div>
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <Briefcase className="h-5 w-5" />
                <span className="font-medium">Total Applicants</span>
              </div>
              <p className="text-gray-900 font-semibold ml-7" data-testid="job-details-applicants">
                {job.applicants?.length || 0} applicants
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;