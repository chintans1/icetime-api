const Joi = require('joi');

module.exports = {
  // GET /v1/games
  gamesReq: {
    query: {
      date: Joi.date().iso().default(() => new Date(), 'current date'),
    },
  },

  // GET /v1/games/{gameID}
  singleGameReq: {
    params: {
      gameId: Joi.string().min(10).max(10).required(),
    },
  },
};
