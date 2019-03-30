const express = require('express');
const gamesRoutes = require('./games.route');
const teamsRoutes = require('./teams.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/games
 */
router.use('/games', gamesRoutes);

/**
 * GET v1/teams
 */
router.use('/teams', teamsRoutes);

module.exports = router;
