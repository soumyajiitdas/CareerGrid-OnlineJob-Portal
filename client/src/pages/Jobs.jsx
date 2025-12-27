import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api/axios';
import JobCard from '../components/JobCard';
import JobFilters from '../components/JobFilters';
import Loading from '../components/Loading';
import { Briefcase, Search } from 'lucide-react';

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: '',
    salary: '',
    company: '',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, jobs]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/jobs');
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...jobs];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower) ||
          job.company?.name?.toLowerCase().includes(searchLower)
      );
    }

    // Location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(locationLower)
      );
    }

    // Company filter
    if (filters.company) {
      const companyLower = filters.company.toLowerCase();
      filtered = filtered.filter((job) =>
        job.company?.name?.toLowerCase().includes(companyLower)
      );
    }

    // Salary filter
    if (filters.salary) {
      // This is a simplified salary filter
      // You might want to implement more sophisticated salary filtering
      filtered = filtered.filter((job) => {
        if (!job.salary) return false;
        const salaryStr = job.salary.toLowerCase();
        return salaryStr.includes(filters.salary.toLowerCase());
      });
    }

    setFilteredJobs(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Update URL with search param
    if (newFilters.search) {
      setSearchParams({ search: newFilters.search });
    } else {
      setSearchParams({});
    }
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      location: '',
      salary: '',
      company: '',
    });
    setSearchParams({});
  };

  if (loading) {
    return <Loading message="Loading jobs..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2" data-testid="jobs-page-title">Browse Jobs</h1>
          <p className="text-xl text-gray-600">
            Discover {jobs.length} opportunities waiting for you
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <JobFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <Search className="h-5 w-5" />
                <span className="font-medium" data-testid="jobs-count">
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
                </span>
              </div>
            </div>

            {/* Jobs Grid */}
            {filteredJobs.length > 0 ? (
              <div className="grid gap-6" data-testid="jobs-list">
                {filteredJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
                <Briefcase className="h-20 w-20 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
                <button
                  onClick={handleClearFilters}
                  className="btn-primary"
                  data-testid="clear-filters-empty-state"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;