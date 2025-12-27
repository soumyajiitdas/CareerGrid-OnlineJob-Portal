import { Search, MapPin, DollarSign, Building2, X } from 'lucide-react';
import { useState } from 'react';

const JobFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...localFilters, [name]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClear = () => {
    const clearedFilters = {
      search: '',
      location: '',
      salary: '',
      company: '',
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <button
          onClick={handleClear}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
          data-testid="clear-filters-button"
        >
          <X className="h-4 w-4" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="space-y-5">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Search Keywords</span>
            </div>
          </label>
          <input
            type="text"
            name="search"
            value={localFilters.search}
            onChange={handleInputChange}
            placeholder="Job title, skills..."
            className="input-field"
            data-testid="filter-search-input"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Location</span>
            </div>
          </label>
          <input
            type="text"
            name="location"
            value={localFilters.location}
            onChange={handleInputChange}
            placeholder="City, state, country..."
            className="input-field"
            data-testid="filter-location-input"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4" />
              <span>Company</span>
            </div>
          </label>
          <input
            type="text"
            name="company"
            value={localFilters.company}
            onChange={handleInputChange}
            placeholder="Company name..."
            className="input-field"
            data-testid="filter-company-input"
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Salary Range</span>
            </div>
          </label>
          <select
            name="salary"
            value={localFilters.salary}
            onChange={handleInputChange}
            className="input-field"
            data-testid="filter-salary-select"
          >
            <option value="">Any Salary</option>
            <option value="0-30000">$0 - $30,000</option>
            <option value="30000-50000">$30,000 - $50,000</option>
            <option value="50000-80000">$50,000 - $80,000</option>
            <option value="80000-120000">$80,000 - $120,000</option>
            <option value="120000+">$120,000+</option>
          </select>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Showing jobs matching your criteria
        </p>
      </div>
    </div>
  );
};

export default JobFilters;