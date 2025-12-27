const Job = require("../models/jobModel");

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate("company", "name");
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("company", "name");

    if (job) {
      res.json(job);
    } else {
      res.status(404);
      throw new Error("Job not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Apply for a job
// @route   POST /api/jobs/:id/apply
// @access  Private/User
const applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (job) {
      if (job.applicants.includes(req.user._id)) {
        res.status(400);
        throw new Error("You have already applied for this job");
      }
      job.applicants.push(req.user._id);
      await job.save();
      res.json({ message: "Applied successfully" });
    } else {
      res.status(404);
      throw new Error("Job not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getJobs, getJobById, applyForJob };
