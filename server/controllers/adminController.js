const Company = require("../models/companyModel");

// @desc    Get all companies
// @route   GET /api/admin/companies
// @access  Private/Admin
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({}).populate("user", "name email");
    res.json(companies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Verify a company
// @route   PUT /api/admin/companies/:id/verify
// @access  Private/Admin
const verifyCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (company) {
      company.isVerified = true;
      const updatedCompany = await company.save();
      res.json(updatedCompany);
    } else {
      res.status(404);
      throw new Error("Company not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getCompanies, verifyCompany };
