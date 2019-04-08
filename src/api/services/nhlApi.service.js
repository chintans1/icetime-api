/* eslint-disable camelcase */
const axios = require('axios');
const { dateFormatter } = require('../utils/date.util');

const baseUrl = 'https://statsapi.web.nhl.com/api/v1';

const nhlGames = async (query) => {
  const fullUrl = `${baseUrl}/schedule`;

  const params = {
    date: dateFormatter(query.date),
    expand: 'schedule.linescore',
  };

  try {
    const response = await axios.get(fullUrl, { params });
    const { data } = response;

    // FIXME: Handle no games in response

    return {
      schedule: {
        // Accessing [0] works for now since we only fetch data for one day
        // meaning there is only one date in dates[]
        date: data.dates[0].date,
        games: data.dates[0].games,
      },
    };
  } catch (error) {
    handleError(error);
  }
};

const singleNhlGame = async (query) => {
  // FIXME: Fetch data from NHL API
  return {
    game: {}
  };
};

const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with
    // some sort of error message that we can display
    throw new Error(`${error.response}`);
  } else {
    // Something happened during the request so we
    // just show the message that was recieved
    throw new Error(`${error.message}`);
  }
};

module.exports = { nhlGames, singleNhlGame };
