const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const { saveBase64File } = require('../utils/fileSaver');

// @desc    Get all projects (public)
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({}).sort({ order: 1 });
  res.json(projects);
});

// @desc    Create a new project (admin)
// @route   POST /admin/projects
// @access  Public
const createProject = asyncHandler(async (req, res) => {
  if (req.body.image && req.body.image.startsWith('data:')) {
    req.body.image = saveBase64File(req.body.image, 'project');
  } else if (!req.body.image || req.body.image === "") {
    // Generate placeholder containing the project title
    const projectTitle = req.body.title || "Project Preview";
    const encodedTitle = encodeURIComponent(projectTitle);
    req.body.image = `https://placehold.co/600x400/1e1e2d/22d3ee?text=${encodedTitle}`;
  }
  
  const project = await Project.create(req.body);
  res.status(201).json(project);
});

// @desc    Update a project (admin)
// @route   PUT /admin/projects/:id
// @access  Public
const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const existingProject = await Project.findById(id);
  if (!existingProject) {
    return res.status(404).json({ message: 'Project not found' });
  }

  if (req.body.image) {
    if (req.body.image.startsWith('data:')) {
      // User uploaded a new image file
      req.body.image = saveBase64File(req.body.image, 'project');
    } else {
      // User kept the existing image (relative path or placeholder link)
      // Do nothing, let req.body.image remain as is
    }
  } else {
    // User deleted the image or left it blank
    const projectTitle = req.body.title || existingProject.title || "Project Preview";
    const encodedTitle = encodeURIComponent(projectTitle);
    req.body.image = `https://placehold.co/600x400/1e1e2d/22d3ee?text=${encodedTitle}`;
  }

  const project = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  res.json(project);
});

// @desc    Delete a project (admin)
// @route   DELETE /admin/projects/:id
// @access  Public
const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await Project.findByIdAndDelete(id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  res.json({ message: 'Project removed' });
});

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
