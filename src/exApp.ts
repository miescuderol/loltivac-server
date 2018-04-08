import * as riotApi from './riotAPI';
const express = require('express');
const app = express();

app.get('/:summonerName', riotApi.getRankedGamesForSummonerName);

app.listen(3000, () => console.log('express listening on port 3000'));
