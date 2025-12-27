const express = require("express");
const router = express.Router();
const {
  getCompanies,
  verifyCompany,
} = require("../controllers/adminController");
const { protect, admin } = require("../middlewares/authMiddleware");

router.route("/companies").get(protect, admin, getCompanies);
router.route("/companies/:id/verify").put(protect, admin, verifyCompany);

module.exports = router;
