const Joi = require('joi');

module.exports = {
  // GET /v1/scores
  scoresReq: {
    query: {
      date: Joi.date().iso().default(() => new Date(), 'current date')
    }
  }
};
