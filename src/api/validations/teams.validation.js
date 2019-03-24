const Joi = require('joi');

module.exports = {
  // GET /v1/teams/:teamId/logo
  teamLogoReq: {
    params: {
      teamId: Joi.number().positive().required(),
    },
  },
};
