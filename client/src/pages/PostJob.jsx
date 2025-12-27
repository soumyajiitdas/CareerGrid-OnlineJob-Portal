import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { Briefcase, AlertCircle, CheckCircle } from 'lucide-react';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.title.trim() || !formData.description.trim() || !formData.location.trim()) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      await API.post('/company/jobs', formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/company/dashboard');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Posted Successfully!</h2>
          <p className="text-gray-600 mb-6">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 text-primary-600 mb-4">
            <Briefcase className="h-10 w-10" />
            <h1 className="text-4xl font-bold text-gray-900" data-testid="post-job-title">Post a New Job</h1>
          </div>
          <p className="text-xl text-gray-600">Fill in the details to create a job posting</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6" data-testid="post-job-form">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <p className="text-red-700 text-sm" data-testid="post-job-error">{error}</p>
              </div>
            )}

            {/* Job Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Senior Software Engineer"
                data-testid="job-title-input"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., San Francisco, CA or Remote"
                data-testid="job-location-input"
              />
            </div>

            {/* Salary */}
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range (Optional)
              </label>
              <input
                id="salary"
                name="salary"
                type="text"
                value={formData.salary}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., $80,000 - $120,000"
                data-testid="job-salary-input"
              />
              <p className="text-sm text-gray-500 mt-1">Leave blank if you prefer not to disclose</p>
            </div>

            {/* Job Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={10}
                className="input-field resize-none"
                placeholder="Describe the role, responsibilities, requirements, and what makes this position exciting..."
                data-testid="job-description-input"
              />
              <p className="text-sm text-gray-500 mt-1">
                Include key responsibilities, qualifications, and benefits
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="post-job-submit-button"
              >
                {loading ? 'Posting Job...' : 'Post Job'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/company/dashboard')}
                className="btn-secondary flex-1"
                data-testid="post-job-cancel-button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Tips for a Great Job Posting</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>Be specific about the role and responsibilities</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>List required skills and qualifications clearly</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>Mention benefits and company culture</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>Use inclusive language to attract diverse candidates</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostJob;