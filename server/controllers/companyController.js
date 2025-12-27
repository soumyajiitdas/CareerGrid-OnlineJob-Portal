const Job = require("../models/jobModel");
const Company = require("../models/companyModel");

// @desc    Create a new job
// @route   POST /api/company/jobs
// @access  Private/Company
const createJob = async (req, res) => {
  const { title, description, location, salary } = req.body;

  try {
    const company = await Company.findOne({ user: req.user._id });

    if (!company) {
      res.status(404);
      throw new Error("Company not found");
    }

    const job = new Job({
      title,
      description,
      company: company._id,
      location,
      salary,
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all jobs for a company
// @route   GET /api/company/jobs
// @access  Private/Company
const getCompanyJobs = async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user._id });
    if (!company) {
      res.status(404);
      throw new Error("Company not found");
    }
    const jobs = await Job.find({ company: company._id });
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createJob, getCompanyJobs };
