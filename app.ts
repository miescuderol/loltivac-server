const http = require('http');
const https = require('https');

const hostname = '127.0.0.1';
const port = 3000;
const summonerEndpoint = '/lol/summoner/v3/summoners/by-name/';
const matchesByAccountId = '/lol/match/v3/matchlists/by-account/';
const matchById = '/lol/match/v3/matches/'

const server = http.createServer((req, res) => {
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


    callEndpoint(summonerEndpoint + 'dooky18', (statusCode, data) => {
        res.statusCode = statusCode;
        partialData = JSON.parse(data);
        console.log(partialData.accountId);
        callEndpoint(matchesByAccountId + partialData.accountId, (statusCode, data) => {
            res.statusCode = statusCode;
            console.log(matchesByAccountId, 'response:', data);
            res.end(data);
        });
        res.end(data);
    });

});

// TODO: hacer algo
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function callEndpoint(endpoint, callback) {
    console.log('getting:', endpoint);
    const headers = {
        "X-Riot-Token": "RGAPI-be5d84d6-0b72-470d-902b-cc51f7197d37"
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
        })
    });
    req.on('error', (err) => {
        console.log(err);
    });
    req.end();
}