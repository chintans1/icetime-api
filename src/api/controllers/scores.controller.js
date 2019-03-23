const { nhlScores } = require('../services/scores.service');

const getScores = async (req, res, next) => {
  const scores = await nhlScores();

  try {
    return res.json(scores);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getScores }