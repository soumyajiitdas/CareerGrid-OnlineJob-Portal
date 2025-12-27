const express = require("express");
const router = express.Router();
const {
  getJobs,
  getJobById,
  applyForJob,
} = require("../controllers/jobSeekerController");
const { protect, user } = require("../middlewares/authMiddleware");

router.route("/").get(getJobs);
router.route("/:id").get(getJobById);
router.route("/:id/apply").post(protect, user, applyForJob);

module.exports = router;
