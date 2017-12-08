const http = require('http');
const https = require('https');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const { headers, method, url } = req;
    let body = [];
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    });
    res.on('error', (err) => {
        console.error(err);
    });

    getsummonerInfo('dooky18', (statusCode, data) => {
        console.log("onResult: (" + statusCode + ")" + JSON.stringify(data));
        res.statusCode = statusCode;
        res.end(data);
    });

});
// TODO: hacer algo
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function getsummonerInfo(summonerName, callback) {
    console.log('getsummonername')
    const headers = {
        "X-Riot-Token": "RGAPI-fcb90cbb-94da-425d-be0b-7cafb6a3ab53"}
    const options = {
        host: 'na1.api.riotgames.com',
        path: '/lol/summoner/v3/summoners/by-name/dooky18',
        method: 'GET',
        headers: headers
    }
    let req = https.request(options, (response) => {
        console.log('request');
        console.log(response.statusCode);
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            data = JSON.stringify(data);
            callback(response.statusCode, data);
        })
    });
    req.on('error', (err) => {
        console.log(err);
    });
    req.end();
}