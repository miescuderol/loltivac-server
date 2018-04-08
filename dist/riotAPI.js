"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
const https = require('https');
var endpoints;
(function (endpoints) {
    endpoints["summoner"] = "/lol/summoner/v3/summoners/by-name/";
    endpoints["matchesByAccountId"] = "/lol/match/v3/matchlists/by-account/";
    endpoints["matchById"] = "/lol/match/v3/matches/";
})(endpoints = exports.endpoints || (exports.endpoints = {}));
function getRankedGamesForSummonerName(req, res) {
    const { headers, method, url } = req;
    let body = [];
    let partialData;
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    });
    res.on('error', (err) => {
        console.error(err);
    });
    callEndpoint(endpoints.summoner + req.params.summonerName, (statusCode, data) => {
        res.statusCode = statusCode;
        partialData = JSON.parse(data);
        callEndpoint(endpoints.matchesByAccountId + partialData.accountId, (statusCode, data) => {
            res.statusCode = statusCode;
            console.log(endpoints.matchesByAccountId, 'response:', data);
            res.end(data);
        });
        res.end(data);
    });
}
exports.getRankedGamesForSummonerName = getRankedGamesForSummonerName;
;
function callEndpoint(endpoint, callback) {
    console.log('getting:', endpoint);
    const headers = {
        "X-Riot-Token": "RGAPI-ffd41b99-e152-4aca-bb9d-9ff60df79871"
    };
    const options = {
        host: 'na1.api.riotgames.com',
        path: endpoint,
        method: 'GET',
        headers: headers
    };
    let req = https.request(options, (response) => {
        console.log('request');
        console.log(response.statusCode);
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            callback(response.statusCode, data);
        });
    });
    req.on('error', (err) => {
        console.log(err);
    });
    req.end();
}
//# sourceMappingURL=riotAPI.js.map