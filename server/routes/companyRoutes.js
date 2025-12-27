const express = require("express");
const router = express.Router();
const { createJob, getCompanyJobs } = require("../controllers/companyController");
const { protect, company } = require("../middlewares/authMiddleware");

router.route("/jobs").post(protect, company, createJob).get(protect, company, getCompanyJobs);

module.exports = router;
