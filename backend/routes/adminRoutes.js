const express = require('express');
const router = express.Router();

// Import models for stats
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Skill = require('../models/Skill');
const Certificate = require('../models/Certificate');
const Contact = require('../models/Contact');
const Achievement = require('../models/Achievement');

// Dashboard stats endpoint
router.get('/stats', async (req, res, next) => {
  try {
    const projectsCount = await Project.countDocuments();
    const experiencesCount = await Experience.countDocuments();
    const skillsCount = await Skill.countDocuments();
    const certificatesCount = await Certificate.countDocuments();
    const contactsCount = await Contact.countDocuments();
    const achievementsCount = await Achievement.countDocuments();

    res.json({
      projects: projectsCount,
      experiences: experiencesCount,
      skills: skillsCount,
      certificates: certificatesCount,
      contacts: contactsCount,
      achievements: achievementsCount,
    });
  } catch (error) {
    next(error);
  }
});

// Project admin routes
const { createProject, updateProject, deleteProject } = require('../controllers/projectController');
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

// Experience admin routes
const { createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');
router.post('/experience', createExperience);
router.put('/experience/:id', updateExperience);
router.delete('/experience/:id', deleteExperience);

// Skill admin routes
const { getRawSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
router.get('/skills', getRawSkills);
router.post('/skills', createSkill);
router.put('/skills/:id', updateSkill);
router.delete('/skills/:id', deleteSkill);

// Profile admin routes
const { updateProfile } = require('../controllers/profileController');
router.put('/profile/:id', updateProfile);

// Certificate admin routes
const { createCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificateController');
router.post('/certificates', createCertificate);
router.put('/certificates/:id', updateCertificate);
router.delete('/certificates/:id', deleteCertificate);

// Achievement admin routes
const { createAchievement, updateAchievement, deleteAchievement } = require('../controllers/achievementController');
router.post('/achievements', createAchievement);
router.put('/achievements/:id', updateAchievement);
router.delete('/achievements/:id', deleteAchievement);

// Contact admin routes
const { getContacts, markContactRead, deleteContact } = require('../controllers/contactController');
router.get('/contacts', getContacts);
router.put('/contacts/:id/read', markContactRead);
router.delete('/contacts/:id', deleteContact);

module.exports = router;
