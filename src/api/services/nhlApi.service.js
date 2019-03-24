/* eslint-disable camelcase */
const axios = require('axios');
const { dateFormatter } = require('../utils/date.util');

const baseLogoUrl = 'https://www-league.nhlstatic.com/images/logos/teams-current-primary-dark';
const baseUrl = 'https://statsapi.web.nhl.com/api/v1';

const nhlLogo = async (teamId) => {
  const fullUrl = `${baseLogoUrl}/${teamId}.svg`

  try {
    const response = await axios.get(fullUrl);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const nhlScores = async (query) => {
  const fullUrl = `${baseUrl}/schedule`;

  const params = {
    date: dateFormatter(query.date),
    expand: 'schedule.linescore'
  };

  try {
    const response = await axios.get(fullUrl, { params });
    const data = response.data;

    return {
      schedule: {
        // Accessing [0] works for now since we only fetch data for one day hence only one date in dates
        date: data.dates[0].date,
        games: data.dates[0].games
      }
    };
  } catch (error) {
    console.error(error);
  }
}

module.exports = { nhlScores, nhlLogo }