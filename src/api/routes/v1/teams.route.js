const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/teams.controller');
const { teamLogoReq } = require('../../validations/teams.validation');

const router = express.Router();

router.route('/:teamId/logo')
  .get(validate(teamLogoReq), controller.getTeamLogo);

module.exports = router;