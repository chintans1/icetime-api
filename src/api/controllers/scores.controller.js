const { nhlScores, nhlLogo } = require('../services/nhlApi.service');

// FIXME: Move these methods into a better place.
// Not sure if controller is the best place for it.

const getTeamName = (fullName) => {
  // FIXME: Better handling of getting team name
  if (fullName.includes("Detroit")) {
    return "Red Wings";
  } else if (fullName.includes("Columbus")) {
    return "Blue Jackets";
  } else if (fullName.includes("Toronto")) {
    return "Maple Leafs";
  } else if (fullName.includes("Vegas")) {
    return "Golden Knights";
  } else {
    return fullName.split(" ").pop();
  }
}

const getTeamLogo = (teamId) => {
  // FIXME: grab NHL logo properly
  return nhlLogo(teamId);
}

const transformSingleGame = (game) => {
  return {
    gameId: game.gamePk,
    homeTeam: {
      teamName: getTeamName(game.teams.home.team.name),
      fullTeamName: game.teams.home.team.name,
      teamLogo: getTeamLogo(game.teams.home.team.id)
    },
    roadTeam: {
      teamName: getTeamName(game.teams.away.team.name),
      fullTeamName: game.teams.away.team.name,
      teamLogo: getTeamLogo(game.teams.away.team.id)
    },
    gameInformation: {
      gameStatus: game.status.abstractGameState, // either "Live", "Preview", "Final"
      gameDate: game.gameDate,
      periodInfo: {
        currentPeriod: game.linescore.currentPeriodOrdinal,
        currentPeriodTimeRemaining: game.linescore.currentPeriodTimeRemaining
      }
    },
    gameScore: {
      homeTeam: game.teams.home.score,
      roadTeam: game.teams.away.score
    }
  }
}

const transformNhlScores = (scores) => {
  const { date, games } = scores.schedule;
  const formattedGames = games.map((game) => transformSingleGame(game));

  return {
    scores: {
      date: date,
      games: formattedGames
    }
  }
}

const getScores = async (req, res, next) => {
  try {
    const rawScores = await nhlScores(req.query);

    return res.json(transformNhlScores(rawScores));
  } catch (error) {
    return next(error);
  }
};

module.exports = { getScores }