import { MapPin, DollarSign, Building2, Clock, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const formatDate = (date) => {
    const now = new Date();
    const jobDate = new Date(date);
    const diffTime = Math.abs(now - jobDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="card hover:border-primary-300 transition-all duration-200" data-testid={`job-card-${job._id}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
            <Link to={`/jobs/${job._id}`} data-testid={`job-title-${job._id}`}>{job.title}</Link>
          </h3>
          <div className="flex items-center space-x-2 text-gray-600 mb-2">
            <Building2 className="h-4 w-4" />
            <span className="font-medium" data-testid={`job-company-${job._id}`}>{job.company?.name || 'Company Name'}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-primary-600 transition-colors" aria-label="Bookmark job">
          <Bookmark className="h-5 w-5" />
        </button>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2" data-testid={`job-description-${job._id}`}>
        {job.description}
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center space-x-1 text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
          <MapPin className="h-4 w-4" />
          <span data-testid={`job-location-${job._id}`}>{job.location}</span>
        </div>
        {job.salary && (
          <div className="flex items-center space-x-1 text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
            <DollarSign className="h-4 w-4" />
            <span data-testid={`job-salary-${job._id}`}>{job.salary}</span>
          </div>
        )}
        <div className="flex items-center space-x-1 text-gray-500 text-sm">
          <Clock className="h-4 w-4" />
          <span>{formatDate(job.createdAt)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-500">
          {job.applicants?.length || 0} applicants
        </span>
        <Link 
          to={`/jobs/${job._id}`} 
          className="btn-primary text-sm py-2 px-4"
          data-testid={`job-view-details-${job._id}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;