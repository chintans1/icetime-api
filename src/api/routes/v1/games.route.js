const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/games.controller');
const { gamesReq, singleGameReq } = require('../../validations/games.validation');

const router = express.Router();

router.route('/')
  .get(validate(gamesReq), controller.getGamesForDate);

router.route('/:gameId')
  .get(validate(singleGameReq), controller.getSingleGameDetails);

module.exports = router;
