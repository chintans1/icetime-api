const express = require('express');
const gamesRoutes = require('./games.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (_, res) => res.json('OK'));

/**
 * GET v1/games
 */
router.use('/games', gamesRoutes);

module.exports = router;
