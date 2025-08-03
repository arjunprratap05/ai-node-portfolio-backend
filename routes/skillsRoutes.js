const express = require('express');
const skillsController = require('../controllers/skillsController');

const router = express.Router();

router.get('/skills', skillsController.getSkills);
router.post('/skills/seed', skillsController.seedSkillsData);

module.exports = router;