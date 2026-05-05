const Project = require("../models/Project");

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

module.exports = {
  getProjects,
};
