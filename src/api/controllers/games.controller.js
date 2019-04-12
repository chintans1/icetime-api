const { nhlGames, singleNhlGame } = require('../services/nhlApi.service');
const { transformNhlGames } = require('./helpers/games.helper');

// GET: /v1/games
const getGamesForDate = async (req, res, next) => {
  try {
    const rawGames = await nhlGames(req.query);
    const formattedGames = transformNhlGames(rawGames);

    return res.json(formattedGames);
  } catch (error) {
    return next(error);
  }
};

// GET: /v1/games/{gameId}
const getSingleGameDetails = async (req, res, next) => {
  try {
    const rawGameDetails = await singleNhlGame(req.query);

    return res.json(rawGameDetails);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getGamesForDate, getSingleGameDetails };
