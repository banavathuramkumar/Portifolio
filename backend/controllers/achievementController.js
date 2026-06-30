const asyncHandler = require('express-async-handler');
const Achievement = require('../models/Achievement');

// @desc    Get all achievements (public)
// @route   GET /api/achievements
// @access  Public
const getAchievements = asyncHandler(async (req, res) => {
  const achievements = await Achievement.find({}).sort({ order: 1 });
  res.json(achievements);
});

// @desc    Create an achievement (admin)
// @route   POST /admin/achievements
// @access  Private
const createAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.create(req.body);
  res.status(201).json(achievement);
});

// @desc    Update an achievement (admin)
// @route   PUT /admin/achievements/:id
// @access  Private
const updateAchievement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const achievement = await Achievement.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!achievement) {
    return res.status(404).json({ message: 'Achievement not found' });
  }
  res.json(achievement);
});

// @desc    Delete an achievement (admin)
// @route   DELETE /admin/achievements/:id
// @access  Private
const deleteAchievement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const achievement = await Achievement.findByIdAndDelete(id);
  if (!achievement) {
    return res.status(404).json({ message: 'Achievement not found' });
  }
  res.json({ message: 'Achievement removed' });
});

module.exports = {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
};
