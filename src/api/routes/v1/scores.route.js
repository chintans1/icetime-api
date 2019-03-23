const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/scores.controller');
const { scoresReq } = require('../../validations/scores.validation');

const router = express.Router();

router.route('/')
  .get(validate(scoresReq), controller.getScores);

module.exports = router;