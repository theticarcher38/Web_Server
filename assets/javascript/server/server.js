const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 8000;
/*
Using actual IP Address
const ip = '192.168.1.193';
*/
// Local Host IP Address
const ip = '127.0.0.1';
var filePath;
var d = Date(Date.now()).toString();

function server() {
    http.createServer(function (req, res) {

        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
        res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
        filePath = '.' + req.url;
        if (filePath == './')
            filePath = './pages/home/home.html';

        var extname = path.extname(filePath);
        var contentType = 'text/html';
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
            case '.wav':
                contentType = 'audio/wav';
                break;
            case '.ico':
                contentType = 'image/x-icon';
                break;
            case '.webmanifest':
                contentType = 'application/webmanifest';
                break;
            case '.log':
                contentType = 'text/log';
                break;
        }

        console.log(`[${d}] reqing ${filePath}`);
        fs.appendFile('logs/server_log.log', `[${d}] INFO reqing ${filePath}\n\n`, function (error) {
            if (error) throw error;
        });

        fs.readFile(filePath, function (error, content) {
            if (error) {
                if (error.code == 'ENOENT') {
                    fs.readFile('./pages/error/404.html', function (error, content) {
                        res.writeHead(404, {
                            'Content-Type': contentType
                        });
                        res.end(content, 'utf-8');
                        console.log(`[${d}] the page ${filePath} does not exist`);
                        fs.appendFile('logs/server_log.log', `[${d}] WARN The page ${filePath} does not exist\n\n`, function (error) {
                            if (error) throw error;
                        })
                    });
                } else {
                    res.writeHead(500);
                    res.end(`Sorry, check with the site admin for the error: ${error.code}.. \n`);
                    fs.appendFile('logs/server_log.log', `[${d}] ERROR ${error.code}\n\n`, function (error) {
                        if (error) throw error;
                    })
                    res.end();
                }
            } else {
                res.writeHead(200, {
                    'Content-Type': contentType
                })
                res.end(content, 'utf-8');
            }
        })

    }).listen(port, ip);
    console.log(`[${d}] Server listening on port ${ip}:${port}`);
    fs.appendFile('logs/server_log.log', `[${d}] INFO Server listening on ${ip}:${port}\n\n`, function (error) {
        if (error) throw error;
    });
}

module.exports = server;