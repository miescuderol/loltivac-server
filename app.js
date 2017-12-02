const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const { headers, method, url } = req;
    let body = [];
    req.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        // add all the data we receive on the body to the body array
        body.push(chunk);
    }).on('end', () => {
        // convert the array of buffers to a string
        body = Buffer.concat(body).toString();
        
        // now that we have all the info about the request, we construct the response
        res.on('error', (err) => {
            console.error(err);
        });

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        const responseBody = { headers, method, url, body };

        res.write(JSON.stringify(responseBody));
        res.end();
        // other way to write the same thin: res.end(JSON.stringify(responseBody))
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});