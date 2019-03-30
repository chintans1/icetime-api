const Joi = require('joi');

module.exports = {
  // GET /v1/games
  gamesReq: {
    query: {
      date: Joi.date().iso().default(() => new Date(), 'current date'),
    },
  },
};
