const { nhlLogo } = require('../services/nhlApi.service');

const getTeamLogo = async (req, res, next) => {
  try {
    const encodedPng = await nhlLogo(req.params.teamId);

    return res.json(encodedPng);
  } catch (error) {
    next(error);
  }
}

module.exports = { getTeamLogo }