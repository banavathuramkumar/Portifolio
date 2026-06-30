const express = require('express');
const router = express.Router();

// Public routes
const { getProjects } = require('../controllers/projectController');
const { getProfile } = require('../controllers/profileController');
const { getExperiences } = require('../controllers/experienceController');
const { getSkills } = require('../controllers/skillController');
const { getCertificates } = require('../controllers/certificateController');
const { getAchievements } = require('../controllers/achievementController');

router.get('/projects', getProjects);
router.get('/profile', getProfile);
router.get('/experience', getExperiences);
router.get('/skills', getSkills);
router.get('/certificates', getCertificates);
router.get('/achievements', getAchievements);

module.exports = router;
