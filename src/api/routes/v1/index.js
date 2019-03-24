const express = require('express');
const scoresRoutes = require('./scores.route');
const teamsRoutes = require('./teams.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/scores
 */
router.use('/scores', scoresRoutes);

/**
 * GET v1/teams
 */
router.use('/teams', teamsRoutes);

module.exports = router;
