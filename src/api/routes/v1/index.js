const express = require('express');
const scoresRoutes = require('./scores.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/scores
 */
router.use('/scores', scoresRoutes);

module.exports = router;
