const asyncHandler = require('express-async-handler');
const Skill = require('../models/Skill');

// Helper to guess category icons based on keywords
const getIconForCategory = (cat) => {
  const lower = cat.toLowerCase();
  if (lower.includes("program") || lower.includes("framework") || lower.includes("language")) return "LaptopMinimal";
  if (lower.includes("front") || lower.includes("design") || lower.includes("ui") || lower.includes("ux") || lower.includes("client")) return "Layout";
  if (lower.includes("back") || lower.includes("server") || lower.includes("api") || lower.includes("cloud") || lower.includes("system")) return "Server";
  if (lower.includes("data") || lower.includes("db") || lower.includes("sql") || lower.includes("mongo") || lower.includes("storage")) return "Database";
  if (lower.includes("tool") || lower.includes("devops") || lower.includes("git") || lower.includes("config") || lower.includes("utility")) return "Wrench";
  return "Code2";
};

// @desc    Get all skills (public, grouped by category)
// @route   GET /api/skills
// @access  Public
const getSkills = asyncHandler(async (req, res) => {
  const categories = await Skill.find({}).sort({ order: 1 });

  const groupedSkills = categories.map(cat => ({
    title: cat.category,
    icon: getIconForCategory(cat.category),
    skills: (cat.names || []).map((name, index) => ({
      _id: `${cat._id}_${index}`,
      name: name.trim(),
      level: cat.level || 90 // Use stored category proficiency level
    }))
  }));

  res.json(groupedSkills);
});

// @desc    Get raw flat list of skills (admin only)
// @route   GET /admin/skills
// @access  Public
const getRawSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find({}).sort({ order: 1 });
  res.json(skills);
});

// @desc    Create a new skill (admin)
// @route   POST /admin/skills
// @access  Public
const createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body);
  res.status(201).json(skill);
});

// @desc    Update a skill (admin)
// @route   PUT /admin/skills/:id
// @access  Public
const updateSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const skill = await Skill.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!skill) {
    return res.status(404).json({ message: 'Skill not found' });
  }
  res.json(skill);
});

// @desc    Delete a skill (admin)
// @route   DELETE /admin/skills/:id
// @access  Public
const deleteSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const skill = await Skill.findByIdAndDelete(id);
  if (!skill) {
    return res.status(404).json({ message: 'Skill not found' });
  }
  res.json({ message: 'Skill removed' });
});

module.exports = {
  getSkills,
  getRawSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
