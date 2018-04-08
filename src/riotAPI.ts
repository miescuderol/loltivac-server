const http = require('http');
const https = require('https');

export enum endpoints {
    summoner = '/lol/summoner/v3/summoners/by-name/',
    matchesByAccountId = '/lol/match/v3/matchlists/by-account/',
    matchById = '/lol/match/v3/matches/'
}

export function getRankedGamesForSummonerName(req: any, res: any) {
    const { headers, method, url } = req;
    let body = [];
    let partialData;
    req.on('error', (err: any) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    });
    res.on('error', (err: any) => {
        console.error(err);
    });

    callEndpoint(endpoints.summoner + req.params.summonerName, (statusCode: number, data: any) => {
        res.statusCode = statusCode;
        partialData = JSON.parse(data);
        callEndpoint(endpoints.matchesByAccountId + partialData.accountId, (statusCode: number, data: any) => {
            res.statusCode = statusCode;
            console.log(endpoints.matchesByAccountId, 'response:', data);
            res.end(data);
        });
        res.end(data);
    });

};


function callEndpoint(endpoint: string, callback: Function) {
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
    let req = https.request(options, (response: any) => {
        console.log('request');
        console.log(response.statusCode);
        let data = '';
        response.on('data', (chunk: any) => {
            data += chunk;
        });

        response.on('end', () => {
            callback(response.statusCode, data);
        })
    });
    req.on('error', (err: any) => {
        console.log(err);
    });
    req.end();
}