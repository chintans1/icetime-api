const getTeamLogoName = teamId => `logo_${teamId}.png`;

const transformSingleGame = (game) => {
  const { linescore, seriesSummary, status } = game;
  const { away, home } = game.teams;

  return {
    gameId: game.gamePk,
    playoffGame: game.gameType === 'P',
    homeTeam: {
      teamName: home.team.teamName,
      fullTeamName: home.team.name,
      teamLogoName: getTeamLogoName(home.team.id),
    },
    roadTeam: {
      teamName: away.team.teamName,
      fullTeamName: away.team.name,
      teamLogoName: getTeamLogoName(away.team.id),
    },
    gameInformation: {
      gameStatus: status.abstractGameState, // either "Live", "Preview", "Final"
      gameDate: game.gameDate,
      periodInfo: {
        currentPeriod: linescore.currentPeriodOrdinal,
        currentPeriodTimeRemaining: linescore.currentPeriodTimeRemaining,
      },
      gameScore: {
        homeTeam: home.score,
        roadTeam: away.score,
      },
    },
    seriesInformation: (seriesSummary ?
      {
        gameNumber: seriesSummary.gameLabel,
        seriesStatus: (seriesSummary.seriesStatus === '' ?
          'Series tied 0-0' :
          seriesSummary.seriesStatus
        ),
        seriesStatusShort: (seriesSummary.seriesStatusShort === '' ?
          'Series tied 0-0' :
          seriesSummary.seriesStatusShort
        ),
      } :
      {}
    ),
  };
};

const transformNhlGames = (nhlResult) => {
  const { date, games } = nhlResult.schedule;
  const formattedGames = games.map(game => transformSingleGame(game));

  return {
    date,
    games: formattedGames,
  };
};

module.exports = { getTeamLogoName, transformNhlGames, transformSingleGame };
