const { nhlGames } = require('../services/nhlApi.service');

// FIXME: Move these methods into a better place.
// Not sure if controller is the best place for it.

const getTeamName = (fullName) => {
  // FIXME: Better handling of getting team name
  if (fullName.includes('Detroit')) {
    return 'Red Wings';
  } else if (fullName.includes('Columbus')) {
    return 'Blue Jackets';
  } else if (fullName.includes('Toronto')) {
    return 'Maple Leafs';
  } else if (fullName.includes('Vegas')) {
    return 'Golden Knights';
  }
  return fullName.split(' ').pop();
};

const getTeamLogoName = teamId => `logo_${teamId}.png`;

const transformSingleGame = game => ({
  gameId: game.gamePk,
  homeTeam: {
    teamName: getTeamName(game.teams.home.team.name),
    fullTeamName: game.teams.home.team.name,
    teamLogoName: getTeamLogoName(game.teams.home.team.id),
  },
  roadTeam: {
    teamName: getTeamName(game.teams.away.team.name),
    fullTeamName: game.teams.away.team.name,
    teamLogoName: getTeamLogoName(game.teams.away.team.id),
  },
  gameInformation: {
    gameStatus: game.status.abstractGameState, // either "Live", "Preview", "Final"
    gameDate: game.gameDate,
    periodInfo: {
      currentPeriod: game.linescore.currentPeriodOrdinal,
      currentPeriodTimeRemaining: game.linescore.currentPeriodTimeRemaining,
    },
    gameScore: {
      homeTeam: game.teams.home.score,
      roadTeam: game.teams.away.score,
    },
  },
});

const transformNhlGames = (nhlResult) => {
  const { date, games } = nhlResult.schedule;
  const formattedGames = games.map(game => transformSingleGame(game));

  return {
    date,
    games: formattedGames,
  };
};

const getGamesForDate = async (req, res, next) => {
  try {
    const rawGames = await nhlGames(req.query);
    const formattedGames = transformNhlGames(rawGames);

    return res.json(formattedGames);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getGamesForDate };
