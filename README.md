# Hockey App API
###### NOTE: Work in progress

### Requirements
 - [Node](https://nodejs.org/en/download/current/)
 - [Yarn](https://yarnpkg.com/en/docs/install)

### Getting Started
After cloning the repo, you may install the dependencies using `yarn` and start the server locally.

```bash
yarn install # installs dependencies
cp .env.example .env # sets the environment variables

# use this if you want to run the server in dev mode
yarn dev

# use this if you want to run the server in production mode
yarn start
```

### API Documentation
This API uses the publicly accessible NHL API to grab the latest scores, game and team statistics. You can find more documentation on the NHL API [here](https://gitlab.com/dword4/nhlapi).

All the team logos are local assets in the repo found [here](./src/assets/logos).

#### Endpoints

##### GET `/v1/status`
Returns status of the API. For now, this will just return `OK` to prove that the API is up and running properly. I intend to add better health-check information in the future.

##### GET `/v1/games`
You can include the query param `date` in this request to specify which date you want the game scores for. Otherwise, it will use the current date.

The `date` value must be in this type of format: `YYYY-MM-DD`.

Returns the game scores that were retrieved and parsed from the publicly accessible NHL API.
```json
{
  "date": "2019-06-01",
  "games": [
    {
      "gameId": 2018030413,
      "playoffGame": true,
      "homeTeam": {
        "teamName": "Blues",
        "fullTeamName": "St. Louis Blues",
        "teamLogoName": "logo_19.png"
      },
      "roadTeam": {
        "teamName": "Bruins",
        "fullTeamName": "Boston Bruins",
        "teamLogoName": "logo_6.png"
      },
      "gameInformation": {
        "gameStatus": "Live",
        "gameDate": "2019-06-02T00:00:00Z",
        "periodInfo": {
          "currentPeriod": "3rd",
          "currentPeriodTimeRemaining": "06:04"
        },
        "gameScore": {
          "homeTeam": 2,
          "roadTeam": 5
        }
      },
      "seriesInformation": {
        "gameNumber": "Game 3",
        "seriesStatus": "Series tied 1-1",
        "seriesStatusShort": "Tied 1-1"
      }
    }
  ]
}
```

More endpoints to come...




### Credits
- Adapted [danielfsousa/express-rest-es2017-boilerplate](https://github.com/danielfsousa/express-rest-es2017-boilerplate) for this project
